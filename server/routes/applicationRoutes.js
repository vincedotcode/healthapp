import express from 'express';
import {
  getAllApplications,
  createApplication,
  updateApplicationStatus,
  deleteApplication,
} from '../controllers/applicationController.js';

const router = express.Router();

// Get all applications
/**
 * @swagger
 * /api/v1/applications:
 *   get:
 *     summary: Get all applications
 *     tags: [Applications]
 *     responses:
 *       200:
 *         description: List of all applications
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
 *                     description: User ID who submitted the application
 *                   status:
 *                     type: string
 *                     enum: [pending, approved, rejected]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching applications
 */
router.get('/', getAllApplications);

// Create a new application
/**
 * @swagger
 * /api/v1/applications:
 *   post:
 *     summary: Create a new application
 *     tags: [Applications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - documents
 *             properties:
 *               user_id:
 *                 type: string
 *               documents:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     document_type:
 *                       type: string
 *                       enum:
 *                         - National ID
 *                         - Medical License
 *                         - Proof of Address
 *                         - CV
 *                         - Passport
 *                         - Proof of Qualifications
 *                     document_path:
 *                       type: string
 *     responses:
 *       201:
 *         description: Application created successfully
 *       400:
 *         description: User ID and documents are required
 *       500:
 *         description: Error creating application
 */
router.post('/', createApplication);

// Update an application status
/**
 * @swagger
 * /api/v1/applications/{id}:
 *   put:
 *     summary: Update an application status by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The application ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, approved, rejected]
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Application not found
 *       500:
 *         description: Error updating application status
 */
router.put('/:id', updateApplicationStatus);

// Delete an application by ID
/**
 * @swagger
 * /api/v1/applications/{id}:
 *   delete:
 *     summary: Delete an application by ID
 *     tags: [Applications]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The application ID
 *     responses:
 *       200:
 *         description: Application deleted successfully
 *       404:
 *         description: Application not found
 *       500:
 *         description: Error deleting application
 */
router.delete('/:id', deleteApplication);

export default router;
