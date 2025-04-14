
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import video
from app.core.config import settings
import logging

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://0.0.0.0:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(video.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Welcome to BlowUp AI API"}
