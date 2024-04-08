import express from "express";
import {
  register,
  login,
  getUserInfo,
  applyDoctor,
  markAllNotificationsAsSeen,
  deleteAllSeenNotifications,
  getAllApprovedDoctors,
  bookingAppointment,
  bookingAvailability,
  userAppointments,
} from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

//router obj
const router = express.Router();

//***** Create routes ******/
//Register user

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       422:
 *         description: Validation error
 *       400:
 *         description: User already exists
 */
router.post("/register", register);

//Login user
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       422:
 *         description: Validation error
 *       404:
 *         description: Invalid credentials
 */
router.post("/login", login);

//Get user info (for protected routes)
/**
 * @swagger
 * /api/v1/auth/get-user-info:
 *   post:
 *     summary: Get user information (Protected Route)
 *     description: Retrieves the information of the authenticated user. Requires a valid JWT token.
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The unique identifier of the user.
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
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
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     isAdmin:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                     updatedAt:
 *                       type: string
 *       404:
 *         description: User does not exist.
 *       500:
 *         description: Internal server error.
 */
router.post("/get-user-info", authMiddleware, getUserInfo);

//Apply Doctor (Doctor is now a user so the routes added in user routes)
/**
 * @swagger
 * /api/v1/auth/apply-doctor:
 *   post:
 *     summary: Apply for a doctor account (Protected Route)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - firstName
 *               - lastName
 *               - phoneNumber
 *               - website
 *               - address
 *               - department
 *               - specialization
 *               - experience
 *               - feePerConsultation
 *               - timings
 *             properties:
 *               userId:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               website:
 *                 type: string
 *               address:
 *                 type: string
 *               department:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: string
 *               feePerConsultation:
 *                 type: number
 *               timings:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Doctor account application submitted successfully
 *       500:
 *         description: Internal server error
 */

router.post("/apply-doctor", authMiddleware, applyDoctor);

//Mark all notifications as seen
/**
 * @swagger
 * /api/v1/auth/mark-all-notifications-as-seen:
 *   post:
 *     summary: Mark all notifications as seen (Protected Route)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: All notifications marked as seen successfully
 *       500:
 *         description: Internal server error
 */
router.post("/mark-all-notifications-as-seen", markAllNotificationsAsSeen);

//Delete all seen notifications
/**
 * @swagger
 * /api/v1/auth/delete-all-seen-notifications:
 *   post:
 *     summary: Delete all seen notifications (Protected Route)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: All seen notifications deleted successfully
 *       500:
 *         description: Internal server error
 */
router.post("/delete-all-seen-notifications", deleteAllSeenNotifications);

//Get all approved doctors
/**
 * @swagger
 * /api/v1/auth/getAllApprovedDoctors:
 *   get:
 *     summary: Get all approved doctors
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of all approved doctors
 *       404:
 *         description: No doctors found
 *       500:
 *         description: Internal server error
 */
router.get("/getAllApprovedDoctors", getAllApprovedDoctors);

//Book Appointment
/**
 * @swagger
 * /api/v1/auth/book-appointment:
 *   post:
 *     summary: Book an appointment (Protected Route)
 *     tags: [User]
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
 *               userId:
 *                 type: string
 *               doctorInfo:
 *                 type: object
 *               userInfo:
 *                 type: object
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Appointment booked successfully
 *       422:
 *         description: Validation error (missing date/time)
 *       500:
 *         description: Internal server error
 */
router.post("/book-appointment", authMiddleware, bookingAppointment);

//Booking availability
/**
 * @swagger
 * /api/v1/auth/booking-availability:
 *   post:
 *     summary: Check booking availability (Protected Route)
 *     tags: [User]
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
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *     responses:
 *       200:
 *         description: Availability status returned
 *       500:
 *         description: Internal server error
 */
router.post("/booking-availability", authMiddleware, bookingAvailability);

//Get appointments
/**
 * @swagger
 * /api/v1/auth/user-appointments:
 *   get:
 *     summary: Get user appointments (Protected Route)
 *     tags: [User]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User appointments fetched successfully
 *       404:
 *         description: No appointments found
 *       500:
 *         description: Internal server error
 */
router.get("/user-appointments", authMiddleware, userAppointments);

//export
export default router;
