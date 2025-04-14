
from pydantic import BaseModel, Field
from typing import List, Optional

class VideoAnalysisRequest(BaseModel):
    video_url: str
    platform: str
    analysis_type: str = Field(..., description="Type of analysis: quick, standard, or deep")

class VideoAnalysisResponse(BaseModel):
    score: float = Field(..., ge=0, le=100)
    recommendations: List[str]
    insights: str

class VideoOptimizationRequest(BaseModel):
    video_id: str
    target_platform: str

class VideoOptimizationResponse(BaseModel):
    optimized_video_url: str
    format: str
