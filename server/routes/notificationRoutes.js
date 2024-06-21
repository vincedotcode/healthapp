import express from 'express';
import { getNotificationsByUserId } from '../controllers/notificationController.js';

const router = express.Router();

// Get notifications by user ID
/**
 * @swagger
 * /api/v1/notifications/user/{user_id}:
 *   get:
 *     summary: Get notifications by user ID
 *     tags: [Notifications]
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of notifications
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
 *                   message:
 *                     type: string
 *                   notification_type:
 *                     type: string
 *                   sent_at:
 *                     type: string
 *                     format: date-time
 *                   read_at:
 *                     type: string
 *                     format: date-time
 *                   link:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching notifications
 */
router.get('/user/:user_id', getNotificationsByUserId);

export default router;
