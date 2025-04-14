
# BlowUp AI Backend

FastAPI backend for the BlowUp AI video analysis platform.

## API Endpoints

- `POST /api/v1/video/analyze`: Analyze video virality potential
- `POST /api/v1/video/optimize`: Optimize video for better performance

## Development

Run the development server:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 5000 --reload
```
