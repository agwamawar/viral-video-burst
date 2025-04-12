
import os
import json
from datetime import datetime
import ffmpeg
from typing import Dict, List, Union

class VideoAnalysisError(Exception):
    """Custom exception for video analysis errors."""
    pass

def format_file_size(bytes: int) -> str:
    """Format file size in bytes to human readable format."""
    if bytes < 1024:
        return f"{bytes} bytes"
    elif bytes < 1048576:
        return f"{(bytes / 1024):.1f} KB"
    return f"{(bytes / 1048576):.1f} MB"

def analyze_video(file_path: str) -> Dict:
    """
    Analyze video file and return metrics about its viral potential.
    Uses ffmpeg to extract video metadata and frame samples.
    """
    try:
        # Validate file exists
        if not os.path.exists(file_path):
            raise VideoAnalysisError("Video file not found")

        # Get video metadata using ffmpeg
        probe = ffmpeg.probe(file_path)
        video_info = next(s for s in probe['streams'] if s['codec_type'] == 'video')
        
        # Extract basic metrics
        duration = float(probe['format']['duration'])
        frame_rate = eval(video_info['r_frame_rate'])
        resolution = int(video_info['width']) * int(video_info['height'])
        filesize = os.path.getsize(file_path)

        # Calculate base metrics
        quality_score = min(resolution / (1920 * 1080), 1.0) * 10
        duration_score = min((180 - duration) / 180, 1.0) * 10 if duration > 0 else 0
        
        # Generate aggregate scores
        engagement = round(quality_score * 0.7 + duration_score * 0.3)
        retention = round(min(duration_score * 8 + quality_score * 2, 100))
        shareability = round(quality_score)
        trend_alignment = round((engagement + retention/10) / 2)
        
        # Calculate overall virality score
        virality_score = round(
            engagement * 0.3 +
            (retention * 0.3) +
            (shareability * 0.2) +
            (trend_alignment * 0.2)
        )

        return {
            "fileName": os.path.basename(file_path),
            "fileSize": filesize,
            "fileSizeFormatted": format_file_size(filesize),
            "viralityScore": virality_score,
            "metrics": {
                "engagement": engagement,
                "retention": f"{retention}%",
                "shareability": shareability,
                "trendAlignment": trend_alignment
            },
            "insights": generate_insights(virality_score),
            "recommendations": generate_recommendations({
                "engagement": engagement,
                "retention": retention,
                "shareability": shareability,
                "trendAlignment": trend_alignment
            }),
            "timestamp": datetime.now().isoformat()
        }

    except Exception as e:
        raise VideoAnalysisError(f"Failed to analyze video: {str(e)}")

def generate_insights(score: int) -> List[str]:
    """Generate insights based on virality score."""
    if score < 40:
        return [
            "Your video has limited viral potential at this time.",
            "The content may be too niche for broad appeal.",
            "The pacing is slower than most viral content.",
            "The video lacks a strong hook in the first 3 seconds."
        ]
    elif score < 70:
        return [
            "Your video shows moderate viral potential.",
            "The content has some engaging elements that could drive shares.",
            "The first 10 seconds have good retention potential.",
            "The subject matter aligns with some current trends."
        ]
    else:
        return [
            "Your video has strong viral potential!",
            "The content includes elements common to viral videos.",
            "The pacing and editing are optimized for short attention spans.",
            "The hook in the first 3 seconds is likely to capture audience attention."
        ]

def generate_recommendations(metrics: Dict) -> List[str]:
    """Generate recommendations based on metrics."""
    recommendations = []
    
    if metrics["engagement"] < 5:
        recommendations.extend([
            "Add more interactive elements or questions to increase engagement.",
            "Include a clear call-to-action to encourage viewer participation."
        ])
    
    if metrics["retention"] < 70:
        recommendations.extend([
            "Shorten the video to keep viewers' attention throughout.",
            "Add visual elements every 2-3 seconds to maintain interest."
        ])
    
    if metrics["shareability"] < 5:
        recommendations.extend([
            "Add an element of surprise or emotional appeal to increase shareability.",
            "Include content that viewers would share to express their identity."
        ])
    
    if metrics["trendAlignment"] < 5:
        recommendations.extend([
            "Incorporate current trending topics or sounds in your content.",
            "Use popular hashtags relevant to your content."
        ])
    
    if len(recommendations) < 3:
        recommendations.extend([
            "Post your video when your audience is most active.",
            "Create a compelling thumbnail that sparks curiosity."
        ])
    
    return recommendations[:5]
