import express from 'express';
import {
  getMedicationsByUserId,
  createMedication,
  getMedicationsByAppointmentId
} from '../controllers/medicationController.js';

const router = express.Router();

// Swagger Schema Definition for Medication
/**
 * @swagger
 * components:
 *   schemas:
 *     Medication:
 *       type: object
 *       required:
 *         - user_id
 *         - appointment_id
 *         - medication_name
 *         - dosage
 *         - frequency
 *         - start_date
 *         - end_date
 *         - reminders
 *         - prescribed_by
 *       properties:
 *         user_id:
 *           type: string
 *         appointment_id:
 *           type: string
 *         medication_name:
 *           type: string
 *         dosage:
 *           type: string
 *         frequency:
 *           type: string
 *         start_date:
 *           type: string
 *           format: date
 *         end_date:
 *           type: string
 *           format: date
 *         reminders:
 *           type: boolean
 *         prescribed_by:
 *           type: string
 *         side_effects:
 *           type: string
 */

// Get medications by user ID
/**
 * @swagger
 * /api/v1/medications/user/{userId}:
 *   get:
 *     summary: Get medications by user ID
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of medications by user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medication'
 *       500:
 *         description: Error fetching medications
 */
router.get('/user/:userId', getMedicationsByUserId);

// Get medications by appointment ID
/**
 * @swagger
 * /api/v1/medications/appointment/{appointmentId}:
 *   get:
 *     summary: Get medications by appointment ID
 *     tags: [Medications]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: List of medications by appointment ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Medication'
 *       500:
 *         description: Error fetching medications
 */
router.get('/appointment/:appointmentId', getMedicationsByAppointmentId);

// Create a new medication
/**
 * @swagger
 * /api/v1/medications:
 *   post:
 *     summary: Create a new medication
 *     tags: [Medications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Medication'
 *     responses:
 *       201:
 *         description: Medication created successfully
 *       400:
 *         description: User ID, medication name, dosage, frequency, start date, end date, and prescribed by are required
 *       500:
 *         description: Error creating medication
 */
router.post('/', createMedication);

export default router;
