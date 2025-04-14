
from pydantic import BaseModel, Field, HttpUrl
from typing import List
from enum import Enum

class Platform(str, Enum):
    TIKTOK = "tiktok"
    REEL = "reel"
    YOUTUBE = "youtube"
    FACEBOOK = "facebook"

class AnalysisType(str, Enum):
    QUICK = "quick"
    STANDARD = "standard"
    DEEP = "deep"

class VideoAnalysisRequest(BaseModel):
    video_url: HttpUrl = Field(..., description="URL of the video to analyze")
    platform: Platform = Field(..., description="Social media platform")
    analysis_type: AnalysisType = Field(..., description="Type of analysis to perform")

class VideoAnalysisResponse(BaseModel):
    score: float = Field(..., ge=0, le=100)
    recommendations: List[str] = Field(..., min_items=1)
    insights: str = Field(..., min_length=1)

class VideoOptimizationRequest(BaseModel):
    video_id: str = Field(..., min_length=1)
    target_platform: Platform

class VideoOptimizationResponse(BaseModel):
    optimized_video_url: HttpUrl
    format: str = Field(..., pattern="^[a-zA-Z0-9]+$")
