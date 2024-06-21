import express from 'express';
import { body } from 'express-validator';
import {
  getAllPhysicalRecords,
  createPhysicalRecord,
  updatePhysicalRecord,
  deletePhysicalRecord,
} from '../controllers/physicalRecordController.js';

const router = express.Router();

// Get all physical records for a user
/**
 * @swagger
 * /api/v1/physical-records/{user_id}:
 *   get:
 *     summary: Get all physical records for a user
 *     tags: [PhysicalRecords]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of all physical records for a user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   user_id:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date-time
 *                   weight:
 *                     type: number
 *                   height:
 *                     type: number
 *                   bmi:
 *                     type: number
 *                   body_fat_percentage:
 *                     type: number
 *                   muscle_mass:
 *                     type: number
 *                   water_percentage:
 *                     type: number
 *                   waist_circumference:
 *                     type: number
 *                   hip_circumference:
 *                     type: number
 *                   blood_pressure:
 *                     type: object
 *                     properties:
 *                       systolic:
 *                         type: number
 *                       diastolic:
 *                         type: number
 *                   heart_rate:
 *                     type: number
 *                   notes:
 *                     type: string
 *       500:
 *         description: Error fetching physical records
 */
router.get('/:user_id', getAllPhysicalRecords);

// Create a new physical record
/**
 * @swagger
 * /api/v1/physical-records:
 *   post:
 *     summary: Create a new physical record
 *     tags: [PhysicalRecords]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - weight
 *               - height
 *               - record_type
 *               - description
 *               - record_data
 *             properties:
 *               user_id:
 *                 type: string
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               bmi:
 *                 type: number
 *               body_fat_percentage:
 *                 type: number
 *               muscle_mass:
 *                 type: number
 *               water_percentage:
 *                 type: number
 *               waist_circumference:
 *                 type: number
 *               hip_circumference:
 *                 type: number
 *               blood_pressure:
 *                 type: object
 *                 properties:
 *                   systolic:
 *                     type: number
 *                   diastolic:
 *                     type: number
 *               heart_rate:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       201:
 *         description: Physical record created successfully
 *       422:
 *         description: Validation error
 *       500:
 *         description: Error creating physical record
 */
router.post(
  '/',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('weight').notEmpty().withMessage('Weight is required'),
    body('height').notEmpty().withMessage('Height is required'),
  ],
  createPhysicalRecord
);

// Update a physical record by ID
/**
 * @swagger
 * /api/v1/physical-records/{id}:
 *   put:
 *     summary: Update a physical record by ID
 *     tags: [PhysicalRecords]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The physical record ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               weight:
 *                 type: number
 *               height:
 *                 type: number
 *               bmi:
 *                 type: number
 *               body_fat_percentage:
 *                 type: number
 *               muscle_mass:
 *                 type: number
 *               water_percentage:
 *                 type: number
 *               waist_circumference:
 *                 type: number
 *               hip_circumference:
 *                 type: number
 *               blood_pressure:
 *                 type: object
 *                 properties:
 *                   systolic:
 *                     type: number
 *                   diastolic:
 *                     type: number
 *               heart_rate:
 *                 type: number
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Physical record updated successfully
 *       404:
 *         description: Physical record not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Error updating physical record
 */
router.put(
  '/:id',
  [
    body('weight').optional().notEmpty().withMessage('Weight is required'),
    body('height').optional().notEmpty().withMessage('Height is required'),
  ],
  updatePhysicalRecord
);

// Delete a physical record by ID
/**
 * @swagger
 * /api/v1/physical-records/{id}:
 *   delete:
 *     summary: Delete a physical record by ID
 *     tags: [PhysicalRecords]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The physical record ID
 *     responses:
 *       200:
 *         description: Physical record deleted successfully
 *       404:
 *         description: Physical record not found
 *       500:
 *         description: Error deleting physical record
 */
router.delete('/:id', deletePhysicalRecord);

export default router;
