import express from 'express';
import { healthChatController } from '../controllers/aiController.js';

const router = express.Router();

// Swagger schema definition for the chat request and response
/**
 * @swagger
 * components:
 *   schemas:
 *     ChatRequest:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: The user's message to the AI assistant
 *     ChatResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: string
 *           description: The AI assistant's response
 */

// Health Chat Route
/**
 * @swagger
 * /api/v1/health-chat:
 *   post:
 *     summary: Interact with the health assistant AI
 *     tags: [HealthChat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: AI assistant's response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *       500:
 *         description: Error interacting with the AI assistant
 */
router.post('/health-chat', healthChatController);

export default router;
