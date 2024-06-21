import express from 'express';
import {
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} from '../controllers/doctorController.js';

const router = express.Router();

// Get all doctors
/**
 * @swagger
 * /api/v1/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of all doctors
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
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone_number:
 *                         type: string
 *                       address:
 *                         type: string
 *                       date_of_birth:
 *                         type: string
 *                         format: date
 *                       gender:
 *                         type: string
 *                   specialty:
 *                     type: string
 *                   availability:
 *                     type: string
 *                   approval_status:
 *                     type: string
 *                     enum: [pending, approved, rejected]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching doctors
 */
router.get('/', getAllDoctors);

// Update a doctor
/**
 * @swagger
 * /api/v1/doctors/{id}:
 *   put:
 *     summary: Update a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               specialty:
 *                 type: string
 *               availability:
 *                 type: string
 *               approval_status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: Doctor updated successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Error updating doctor
 */
router.put('/:id', updateDoctor);

// Delete a doctor
/**
 * @swagger
 * /api/v1/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor ID
 *     responses:
 *       200:
 *         description: Doctor deleted successfully
 *       404:
 *         description: Doctor not found
 *       500:
 *         description: Error deleting doctor
 */
router.delete('/:id', deleteDoctor);

export default router;
