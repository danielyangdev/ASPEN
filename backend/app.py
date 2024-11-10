from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from fastapi.responses import JSONResponse
import os
from typing import Optional
from pydantic import BaseModel
import json

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure Google OAuth2
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']
CLIENT_SECRETS_FILE = "path/to/your/client_secrets.json"  # Download from Google Cloud Console

# Store credentials in memory (use a proper database in production)
credentials_store = {}

def create_flow():
    return Flow.from_client_secrets_file(
        CLIENT_SECRETS_FILE,
        scopes=SCOPES,
        redirect_uri="http://localhost:8000/auth/google/callback"
    )

@app.post("/auth/google/signin")
async def google_signin():
    flow = create_flow()
    authorization_url, state = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true'
    )
    return JSONResponse({
        "authorization_url": authorization_url,
        "state": state
    })

@app.get("/auth/google/callback")
async def google_auth_callback(code: str, state: str):
    flow = create_flow()
    flow.fetch_token(code=code)
    credentials = flow.credentials
    
    # Store credentials (use a proper database in production)
    credentials_store['user'] = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes
    }
    
    return JSONResponse({"message": "Successfully authenticated"})

@app.get("/calendar/events")
async def get_calendar_events():
    if 'user' not in credentials_store:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        creds = Credentials.from_authorized_user_info(credentials_store['user'])
        service = build('calendar', 'v3', credentials=creds)
        
        # Get upcoming events
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
async def signout():
    if 'user' in credentials_store:
        del credentials_store['user']
    return JSONResponse({"message": "Successfully signed out"})

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)