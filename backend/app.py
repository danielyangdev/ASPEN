from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from fastapi.responses import JSONResponse, RedirectResponse
from typing import Optional
from pydantic import BaseModel
import json
import datetime
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# OAuth2 Configuration
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
CLIENT_ID = "197114320406-ov395pf2pqth0np3446erf54e008b4bh.apps.googleusercontent.com"
IOS_BUNDLE_ID = "com.aspenhacksc.aspen"

# OAuth2 settings for iOS
OAUTH2_SETTINGS = {
    'installed': {  # Changed from 'web' to 'installed' for iOS
        'client_id': CLIENT_ID,
        'project_id': 'your-project-id',  # Add your Google Cloud project ID
        'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
        'token_uri': 'https://oauth2.googleapis.com/token',
        'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
        'redirect_uris': [
            'com.googleusercontent.apps.197114320406-ov395pf2pqth0np3446erf54e008b4bh:/oauth2callback'
        ],
        'client_type': 'ios',
        'ios_bundle_id': IOS_BUNDLE_ID
    }
}

# Store credentials in memory (use a proper database in production)
credentials_store = {}
state_store = {}

def create_flow():
    flow = Flow.from_client_config(
        client_config=OAUTH2_SETTINGS,
        scopes=SCOPES
    )
    flow.redirect_uri = 'com.googleusercontent.apps.197114320406-ov395pf2pqth0np3446erf54e008b4bh:/oauth2callback'
    return flow

@app.post("/auth/google/signin")
async def google_signin():
    flow = create_flow()
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true',
        prompt='consent'
    )
    
    # Store state for verification
    state_store[state] = True
    
    return JSONResponse({
        "authorization_url": authorization_url,
        "state": state
    })

@app.get("/auth/google/callback")
async def google_auth_callback(request: Request, code: str, state: Optional[str] = None):
    if state not in state_store:
        raise HTTPException(status_code=400, detail="Invalid state parameter")
    
    try:
        flow = create_flow()
        flow.fetch_token(code=code)
        credentials = flow.credentials
        
        # Store credentials
        user_id = "user"
        credentials_store[user_id] = {
            'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'scopes': credentials.scopes
        }
        
        # Clean up state
        del state_store[state]
        
        # Redirect back to app
        success_url = f"com.aspenhacksc.aspen://oauth2success?token={credentials.token}"
        return RedirectResponse(url=success_url)
        
    except Exception as e:
        error_url = f"com.aspenhacksc.aspen://oauth2error?error={str(e)}"
        return RedirectResponse(url=error_url)


@app.get("/calendar/events")
async def get_calendar_events(user_id: str = "user"):
    if user_id not in credentials_store:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        creds = Credentials.from_authorized_user_info(credentials_store[user_id])
        service = build('calendar', 'v3', credentials=creds)
        
        events_result = service.events().list(
            calendarId='primary',
            timeMin=datetime.datetime.utcnow().isoformat() + 'Z',
            maxResults=10,
            singleEvents=True,
            orderBy='startTime'
        ).execute()
        
        events = events_result.get('items', [])
        return JSONResponse({"events": events})
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/auth/google/signout")
async def signout(user_id: str = "user"):
    if user_id in credentials_store:
        del credentials_store[user_id]
    return JSONResponse({"message": "Successfully signed out"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)