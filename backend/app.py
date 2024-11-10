from fastapi import FastAPI, HTTPException, Depends, Request, Body
from fastapi.middleware.cors import CORSMiddleware
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from fastapi.responses import JSONResponse, RedirectResponse
from typing import List, Optional
from pydantic import BaseModel
import logging
import json
import datetime
import os
import ssl
import certifi
import aiohttp
from aiohttp import TCPConnector

app = FastAPI()

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

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
    'installed': {
        'client_id': CLIENT_ID,
        'project_id': 'hacksc-1',
        'auth_uri': 'https://accounts.google.com/o/oauth2/auth',
        'token_uri': 'https://oauth2.googleapis.com/token',
        'auth_provider_x509_cert_url': 'https://www.googleapis.com/oauth2/v1/certs',
        'redirect_uris': [f'{IOS_BUNDLE_ID}:/oauth2callback'],
        'client_type': 'ios'
    }
}

def create_flow():
    flow = Flow.from_client_config(
        client_config=OAUTH2_SETTINGS,
        scopes=SCOPES
    )
    # Use single slash for iOS URL scheme
    flow.redirect_uri = f'{IOS_BUNDLE_ID}:/oauth2callback'
    return flow

# Store credentials in memory (use a proper database in production)
credentials_store = {}
state_store = {}

class CalendarItem(BaseModel):
    id: str

class FreeBusyRequest(BaseModel):
    timeMin: str
    timeMax: str
    items: List[CalendarItem]

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

@app.post("/calendar/freebusy")
async def get_freebusy(request: FreeBusyRequest, user_id: str = "user"):
    if user_id not in credentials_store:
        raise HTTPException(status_code=401, detail="Not authenticated")
    
    try:
        creds = Credentials.from_authorized_user_info(credentials_store[user_id])
        service = build('calendar', 'v3', credentials=creds)
        
        body = {
            "timeMin": request.timeMin,
            "timeMax": request.timeMax,
            "items": [{"id": item.id} for item in request.items]
        }
        
        freebusy_response = service.freebusy().query(body=body).execute()
        
        return JSONResponse(freebusy_response)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/auth/google/callback")
async def google_auth_callback(request: Request, code: str, state: Optional[str] = None):
    logger.debug(f"Received callback with code: {code[:10]}... and state: {state}")
    
    try:
        # Create SSL context with certifi certificates
        ssl_context = ssl.create_default_context(cafile=certifi.where())
        
        # Fetch token using custom function
        token_response = await fetch_token_for_ios(code)
        
        # Create credentials from token response
        credentials = Credentials(
            token=token_response.get('access_token'),
            refresh_token=token_response.get('refresh_token'),
            token_uri=OAUTH2_SETTINGS['installed']['token_uri'],
            client_id=CLIENT_ID,
            scopes=SCOPES
        )
        
        logger.debug("Successfully obtained credentials")
        
        # Store credentials
        user_id = "user"
        credentials_store[user_id] = {
            'token': credentials.token,
            'refresh_token': credentials.refresh_token,
            'token_uri': credentials.token_uri,
            'client_id': credentials.client_id,
            'scopes': credentials.scopes
        }
        
        logger.debug("Stored credentials in credentials_store")
        
        # Clean up state if it exists
        if state and state in state_store:
            del state_store[state]
            logger.debug(f"Cleaned up state: {state}")
        
        # Return success response
        success_url = f"{IOS_BUNDLE_ID}://oauth2success?token={credentials.token}"
        logger.debug(f"Redirecting to success URL: {success_url}")
        
        return RedirectResponse(url=success_url)
        
    except Exception as e:
        logger.error(f"Error in callback: {str(e)}", exc_info=True)
        error_message = f"Authentication error: {str(e)}"
        error_url = f"{IOS_BUNDLE_ID}://oauth2error?error={error_message}"
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

async def fetch_token_for_ios(code: str):
    """Fetch token for iOS with proper SSL configuration."""
    token_uri = OAUTH2_SETTINGS['installed']['token_uri']
    params = {
        'client_id': CLIENT_ID,
        'code': code,
        'grant_type': 'authorization_code',
        'redirect_uri': f'{IOS_BUNDLE_ID}:/oauth2callback'
    }
    
    # Create SSL context with certifi certificates
    ssl_context = ssl.create_default_context(cafile=certifi.where())
    
    # Create connector with SSL context
    connector = TCPConnector(ssl=ssl_context)
    
    try:
        async with aiohttp.ClientSession(connector=connector) as session:
            async with session.post(token_uri, data=params) as response:
                if response.status != 200:
                    error_text = await response.text()
                    logger.error(f"Token fetch failed: {error_text}")
                    raise HTTPException(status_code=response.status, detail=error_text)
                
                return await response.json()
    except Exception as e:
        logger.error(f"Error fetching token: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
async def root():
    """Test endpoint to verify server is running"""
    return {"message": "Server is running"}

if __name__ == "__main__":
    import uvicorn
    logger.info("Starting server...")
    try:
        uvicorn.run(
            app,
            host="0.0.0.0",
            port=8000,
            log_level="debug"
        )
    except Exception as e:
        logger.error(f"Failed to start server: {e}")
        raise