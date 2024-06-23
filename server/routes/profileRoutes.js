import express from 'express';
import { getUserProfile } from '../controllers/profileController.js';

const router = express.Router();

// Route to get user profile
/**
 * @swagger
 * /api/v1/profile/{userId}:
 *   get:
 *     summary: Get user profile
 *     tags: [Profile]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         name:
 *                           type: string
 *                         email:
 *                           type: string
 *                         phone_number:
 *                           type: string
 *                         address:
 *                           type: string
 *                         date_of_birth:
 *                           type: string
 *                         gender:
 *                           type: string
 *                         role:
 *                           type: string
 *                     doctorProfile:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         user_id:
 *                           type: string
 *                         specialty:
 *                           type: string
 *                         availability:
 *                           type: string
 *                         approval_status:
 *                           type: string
 *                     applicationStatus:
 *                       type: string
 *       500:
 *         description: Error fetching user profile
 */
router.get('/:userId', getUserProfile);

export default router;
