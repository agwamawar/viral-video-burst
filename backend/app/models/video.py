
from pydantic import BaseModel
from typing import Dict, List

class VideoAnalysis(BaseModel):
    fileName: str
    viralityScore: int
    metrics: Dict[str, any]
    insights: List[str]
