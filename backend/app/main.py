
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import video
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(video.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {"message": "Welcome to BlowUp AI API"}
