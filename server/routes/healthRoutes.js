import express from 'express';
import {
  getHealthRecordsByUserId,
  createHealthRecord,
  getHealthRecordsByAppointmentId
} from '../controllers/healthController.js';

const router = express.Router();

// Get health records by user ID
/**
 * @swagger
 * /api/v1/healthrecords/user/{userId}:
 *   get:
 *     summary: Get health records by user ID
 *     tags: [HealthRecords]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of health records by user ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HealthRecord'
 *       500:
 *         description: Error fetching health records
 */
router.get('/user/:userId', getHealthRecordsByUserId);

// Get health records by appointment ID
/**
 * @swagger
 * /api/v1/healthrecords/appointment/{appointmentId}:
 *   get:
 *     summary: Get health records by appointment ID
 *     tags: [HealthRecords]
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: List of health records by appointment ID
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HealthRecord'
 *       500:
 *         description: Error fetching health records
 */
router.get('/appointment/:appointmentId', getHealthRecordsByAppointmentId);

// Create a new health record
/**
 * @swagger
 * /api/v1/healthrecords:
 *   post:
 *     summary: Create a new health record
 *     tags: [HealthRecords]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - doctor_id
 *               - record_type
 *               - description
 *               - record_data
 *               - status
 *             properties:
 *               user_id:
 *                 type: string
 *               doctor_id:
 *                 type: string
 *               record_type:
 *                 type: string
 *                 enum: ["Diagnosis", "Treatment", "Prescription", "Lab Result", "Follow-up"]
 *               description:
 *                 type: string
 *               record_data:
 *                 type: string
 *               attachment_path:
 *                 type: string
 *               follow_up_date:
 *                 type: string
 *                 format: date
 *               symptoms:
 *                 type: string
 *               treatment:
 *                 type: string
 *               medication_prescribed:
 *                 type: string
 *               lab_results:
 *                 type: string
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: ["Pending", "Reviewed", "Completed"]
 *               reviewed_by:
 *                 type: string
 *     responses:
 *       201:
 *         description: Health record created successfully
 *       400:
 *         description: User ID, doctor ID, record type, description, record data, and status are required
 *       500:
 *         description: Error creating health record
 */
router.post('/', createHealthRecord);

export default router;
