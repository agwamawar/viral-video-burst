import requests
from typing import Dict, List, Optional
import json
import logging
from fastapi import HTTPException, UploadFile
from app.models.video import VideoAnalysis

logger = logging.getLogger(__name__)

FIREBASE_FUNCTION_URL = "https://your-project-region-your-project-id.cloudfunctions.net/analyzeVideo"

async def analyze_video(file: UploadFile) -> VideoAnalysis:
    try:
        # Prepare the payload for the Firebase function
        payload = {
            "videoUrl": f"gs://your-gcs-bucket/{file.filename}", # Replace with your GCS bucket name
            "analysisType": "standard",  # You can adjust this as needed
            "platforms": ["youtube", "tiktok", "instagram"]
        }

        # Add Authorization header if needed for secure callable functions
        headers = {}
        # Example: headers = {"Authorization": "Bearer YOUR_AUTH_TOKEN"}


        response = requests.post(FIREBASE_FUNCTION_URL, json=payload, headers=headers)
        response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)

        firebase_response = response.json()

        #  Extract relevant information from Firebase response and construct VideoAnalysis object. 
        # This part needs adjustment based on the actual structure of the Firebase response.
        analysis = VideoAnalysis(
            fileName=file.filename,
            viralityScore=firebase_response.get('viralityScore', 0), #Example, adjust as needed
            metrics=firebase_response.get('metrics', {}),
            insights=firebase_response.get('insights', [])
        )

        return analysis
    except requests.exceptions.RequestException as e:
        logger.error(f"Error communicating with Firebase function: {e}")
        raise HTTPException(status_code=500, detail="Error analyzing video")
    except json.JSONDecodeError as e:
        logger.error(f"Error decoding Firebase response: {e}")
        raise HTTPException(status_code=500, detail="Error processing video analysis results")
    except Exception as e:
        logger.exception(f"An unexpected error occurred: {e}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")