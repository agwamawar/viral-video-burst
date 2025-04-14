
from fastapi import APIRouter, UploadFile, File
from app.services import analyzer, optimizer
from app.models.video import VideoAnalysis

router = APIRouter(prefix="/video", tags=["video"])

@router.post("/analyze", response_model=VideoAnalysis)
async def analyze_video(file: UploadFile = File(...)):
    analysis_result = await analyzer.analyze_video(file)
    return analysis_result

@router.post("/optimize")
async def optimize_video(file: UploadFile = File(...)):
    optimized_video = await optimizer.optimize_video(file)
    return optimized_video
