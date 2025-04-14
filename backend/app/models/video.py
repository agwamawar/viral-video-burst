
from pydantic import BaseModel
from typing import Dict, List, Optional

class VideoRequest(BaseModel):
    video_id: str
    platform: str
    duration: int
    title: Optional[str] = None

class VideoAnalysis(BaseModel):
    video_id: str
    virality_score: int
    metrics: Dict[str, any]
    insights: List[str]
    recommendations: List[str]
