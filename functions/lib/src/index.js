"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeVideo = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const admin = __importStar(require("firebase-admin"));
// Initialize Firebase Admin SDK
admin.initializeApp();
exports.analyzeVideo = (0, https_1.onRequest)(async (request, response) => {
    if (request.method !== 'POST') {
        response.status(405).send({ error: 'Method not allowed' });
        return;
    }
    const { videoUrl, analysisType, platforms } = request.body;
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
    }
    catch (error) {
        logger.error("Error processing video analysis", error);
        response.status(500).send({ error: 'Internal server error' });
        return;
    }
});
//# sourceMappingURL=index.js.map