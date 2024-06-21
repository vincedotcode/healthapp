import express from 'express';
import {
  getAllNutritionPlans,
  createNutritionPlan,
  getNutritionPlanById,
  updateNutritionPlan,
  deleteNutritionPlan,
} from '../controllers/nutritionPlanController.js';
import { body } from 'express-validator';

const router = express.Router();

// Get all nutrition plans
/**
 * @swagger
 * /api/v1/nutrition-plans:
 *   get:
 *     summary: Get all nutrition plans
 *     tags: [NutritionPlans]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: user_id
 *         schema:
 *           type: string
 *         description: User ID to filter nutrition plans
 *       - in: query
 *         name: goals
 *         schema:
 *           type: string
 *         description: Goals to filter nutrition plans
 *     responses:
 *       200:
 *         description: List of all nutrition plans
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
 *                     description: User ID who owns the nutrition plan
 *                   plan_data:
 *                     type: string
 *                   dietary_restrictions:
 *                     type: string
 *                   goals:
 *                     type: string
 *                   progress_tracking:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching nutrition plans
 */
router.get('/', getAllNutritionPlans);

// Create a new nutrition plan
/**
 * @swagger
 * /api/v1/nutrition-plans:
 *   post:
 *     summary: Create a new nutrition plan
 *     tags: [NutritionPlans]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - plan_data
 *             properties:
 *               user_id:
 *                 type: string
 *               plan_data:
 *                 type: string
 *               dietary_restrictions:
 *                 type: string
 *               goals:
 *                 type: string
 *               progress_tracking:
 *                 type: string
 *     responses:
 *       201:
 *         description: Nutrition plan created successfully
 *       422:
 *         description: Validation error
 *       500:
 *         description: Error creating nutrition plan
 */
router.post(
  '/',
  [
    body('user_id').notEmpty().withMessage('User ID is required'),
    body('plan_data').notEmpty().withMessage('Plan data is required'),
  ],
  createNutritionPlan
);

// Get a single nutrition plan by ID
/**
 * @swagger
 * /api/v1/nutrition-plans/{id}:
 *   get:
 *     summary: Get a nutrition plan by ID
 *     tags: [NutritionPlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The nutrition plan ID
 *     responses:
 *       200:
 *         description: Nutrition plan details
 *       404:
 *         description: Nutrition plan not found
 *       500:
 *         description: Error fetching nutrition plan
 */
router.get('/:id', getNutritionPlanById);

// Update a nutrition plan by ID
/**
 * @swagger
 * /api/v1/nutrition-plans/{id}:
 *   put:
 *     summary: Update a nutrition plan by ID
 *     tags: [NutritionPlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The nutrition plan ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               plan_data:
 *                 type: string
 *               dietary_restrictions:
 *                 type: string
 *               goals:
 *                 type: string
 *               progress_tracking:
 *                 type: string
 *     responses:
 *       200:
 *         description: Nutrition plan updated successfully
 *       404:
 *         description: Nutrition plan not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Error updating nutrition plan
 */
router.put(
  '/:id',
  [
    body('plan_data').optional().notEmpty().withMessage('Plan data is required'),
  ],
  updateNutritionPlan
);

// Delete a nutrition plan by ID
/**
 * @swagger
 * /api/v1/nutrition-plans/{id}:
 *   delete:
 *     summary: Delete a nutrition plan by ID
 *     tags: [NutritionPlans]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The nutrition plan ID
 *     responses:
 *       200:
 *         description: Nutrition plan deleted successfully
 *       404:
 *         description: Nutrition plan not found
 *       500:
 *         description: Error deleting nutrition plan
 */
router.delete('/:id', deleteNutritionPlan);

export default router;
