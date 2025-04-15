
import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { google } from "googleapis";

// Initialize Firebase Admin SDK
admin.initializeApp();

interface VideoAnalysisRequest {
  videoUrl: string;
  analysisType: string;
  platforms: string[];
}

async function getVertexPrediction(videoUrl: string): Promise<any> {
  try {
    const auth = await google.auth.getApplicationDefault();
    const projectId = process.env.GOOGLE_CLOUD_PROJECT;
    const location = 'us-central1';
    const modelId = 'YOUR_MODEL_ID'; // Replace with your model ID
    
    const aiplatform = google.aiplatform('v1');
    const endpoint = `projects/${projectId}/locations/${location}/endpoints/${modelId}`;

    const request = {
      name: endpoint,
      instances: [{
        content: videoUrl
      }]
    };

    const prediction = await aiplatform.projects.locations.endpoints.predict(request);
    return prediction.data;
  } catch (error) {
    logger.error("Error calling Vertex AI:", error);
    throw error;
  }
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
    // Call Vertex AI for video analysis
    const prediction = await getVertexPrediction(videoUrl);

    logger.info("Video analysis completed", {
      videoUrl,
      analysisType,
      platforms
    });

    response.status(200).send({
      message: 'Video analysis completed successfully',
      requestId: Date.now().toString(),
      status: 'completed',
      prediction: prediction
    });
    return;
  } catch (error) {
    logger.error("Error processing video analysis", error);
    response.status(500).send({ error: 'Internal server error during video analysis' });
    return;
  }
});
