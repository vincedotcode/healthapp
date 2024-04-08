import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUser,
  getAllDoctor,
  changeAccountStatus,
} from "../controllers/adminController.js";

//Router Obj
const router = express.Router();

//Get all user
/**
 * @swagger
 * /api/v1/admin/getAllUser:
 *   get:
 *     summary: Retrieve all users
 *     description: Fetches a list of all users without their password information.
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of users fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal server error
 */
router.get("/getAllUser", authMiddleware, getAllUser);

//Get all Doctors
/**
 * @swagger
 * /api/v1/admin/getAllDoctors:
 *   get:
 *     summary: Retrieve all doctors
 *     description: Fetches a list of all doctors.
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of doctors fetched successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *       500:
 *         description: Internal server error
 */
router.get("/getAllDoctors", authMiddleware, getAllDoctor);

//Account Status Change
/**
 * @swagger
 * /api/v1/admin/changeAccountStatus:
 *   post:
 *     summary: Change the status of a doctor's account
 *     description: Updates the status of a doctor's account and notifies the user.
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: The unique identifier of the doctor's account to update.
 *               status:
 *                 type: string
 *                 description: The new status to set for the doctor's account.
 *     responses:
 *       201:
 *         description: Account status updated successfully.
 *       404:
 *         description: Doctor or user not found.
 *       500:
 *         description: Internal server error
 */
router.post("/changeAccountStatus", authMiddleware, changeAccountStatus);

//Export
export default router;
