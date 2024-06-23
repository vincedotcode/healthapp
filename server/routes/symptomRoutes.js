import express from 'express';
import {
  getSymptomsByUserId,
  createSymptomAnalysis,
  getSymptomsByAppointmentId
} from '../controllers/symptomController.js';

const router = express.Router();

// Swagger Schema Definition for SymptomAnalysis
/**
 * @swagger
 * components:
 *   schemas:
 *     SymptomAnalysis:
 *       type: object
 *       required:
 *         - user_id
 *         - appointment_id
 *         - symptoms
 *         - analysis_date
 *         - result
 *         - severity
 *       properties:
 *         user_id:
 *           type: string
 *         appointment_id:
 *           type: string
 *         symptoms:
 *           type: string
 *         analysis_date:
 *           type: string
 *           format: date
 *         result:
 *           type: string
 *         severity:
 *           type: string
 *         recommendations:
 *           type: string
 *         follow_up_date:
 *           type: string
 *           format: date
 */

// Get symptoms by user ID
/**
 * @swagger
 * /api/v1/symptoms/user/{userId}:
 *   get:
 *     summary: Get symptoms by user ID
 *     tags: [SymptomAnalysis]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of symptoms by user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SymptomAnalysis'
 *       500:
 *         description: Error fetching symptoms
 */
router.get('/user/:userId', getSymptomsByUserId);

// Get symptoms by appointment ID
/**
 * @swagger
 * /api/v1/symptoms/appointment/{appointmentId}:
 *   get:
 *     summary: Get symptoms by appointment ID
 *     tags: [SymptomAnalysis]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: List of symptoms by appointment ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SymptomAnalysis'
 *       500:
 *         description: Error fetching symptoms
 */
router.get('/appointment/:appointmentId', getSymptomsByAppointmentId);

// Create a new symptom analysis
/**
 * @swagger
 * /api/v1/symptoms:
 *   post:
 *     summary: Create a new symptom analysis
 *     tags: [SymptomAnalysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SymptomAnalysis'
 *     responses:
 *       201:
 *         description: Symptom analysis created successfully
 *       400:
 *         description: User ID, appointment ID, symptoms, analysis date, result, and severity are required
 *       500:
 *         description: Error creating symptom analysis
 */
router.post('/', createSymptomAnalysis);

export default router;
