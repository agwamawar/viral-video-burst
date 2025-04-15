
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";

// Initialize Firebase Admin SDK
admin.initializeApp();

interface VideoAnalysisRequest {
  videoUrl: string;
  analysisType: string;
  platforms: string[];
}

export const analyzeVideo = onRequest(async (request, response) => {
  if (request.method !== 'POST') {
    response.status(405).send({ error: 'Method not allowed' });
    return;
  }

  const { videoUrl, analysisType, platforms } = request.body as VideoAnalysisRequest;

  // Validate required fields
  if (!videoUrl || !analysisType || !platforms || !Array.isArray(platforms)) {
    logger.error("Missing or invalid required fields", { 
      videoUrl, 
      analysisType, 
      platforms 
    });
    response.status(400).send({ 
      error: 'Missing required fields. Please provide videoUrl, analysisType, and platforms array' 
    });
    return;
  }

  try {
    // For now, just log the request and return success
    logger.info("Processing video analysis request", {
      videoUrl,
      analysisType,
      platforms
    });

    response.status(200).send({
      message: 'Video analysis request received successfully',
      requestId: Date.now().toString(),
      status: 'pending'
    });
    return;
  } catch (error) {
    logger.error("Error processing video analysis", error);
    response.status(500).send({ error: 'Internal server error' });
    return;
  }
});
