import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getDoctorInfo,
  updateDoctorProfile,
  getDoctorById,
  getDoctorAppointments,
  updateAppointmentStatus,
} from "../controllers/doctorController.js";

//Router obj
const router = express.Router();

//Get doctor info by doctor ID
/**
 * @swagger
 * /api/v1/doctor/get-doctor-info:
 *   post:
 *     summary: Retrieve information of a specific doctor
 *     tags: [Doctor]
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
 *                 description: The user ID of the doctor.
 *     responses:
 *       200:
 *         description: Doctor data fetched successfully.
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/get-doctor-info", authMiddleware, getDoctorInfo);

//Update doctor pofile
/**
 * @swagger
 * /api/v1/doctor/update-profile:
 *   post:
 *     summary: Update the profile of a doctor
 *     tags: [Doctor]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Doctor'
 *     responses:
 *       201:
 *         description: Doctor Profile Updated.
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/update-profile", authMiddleware, updateDoctorProfile);

//Get Doctor By Id
/**
 * @swagger
 * /api/v1/doctor/getDoctorById:
 *   post:
 *     summary: Retrieve a doctor by their ID
 *     tags: [Doctor]
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
 *                 description: The unique identifier of the doctor.
 *     responses:
 *       200:
 *         description: Doctor get by id successfully.
 *       404:
 *         description: Doctor not found.
 *       500:
 *         description: Internal server error.
 */
router.post("/getDoctorById", authMiddleware, getDoctorById);

//Get Appointments of Doctor
/**
 * @swagger
 * /api/v1/doctor/doctor-appointments:
 *   get:
 *     summary: Get appointments associated with a doctor
 *     tags: [Doctor]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Doctor Appointments Fetched Successfully.
 *       404:
 *         description: No appointments found.
 *       500:
 *         description: Internal server error.
 */
router.get("/doctor-appointments", authMiddleware, getDoctorAppointments);

//Appointment status update
/**
 * @swagger
 * /api/v1/doctor/updateAppointmentStatus:
 *   post:
 *     summary: Update the status of an appointment
 *     tags: [Doctor]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentsId
 *               - status
 *             properties:
 *               appointmentsId:
 *                 type: string
 *                 description: The unique identifier of the appointment.
 *               status:
 *                 type: string
 *                 description: The new status for the appointment.
 *     responses:
 *       200:
 *         description: Appointment status updated.
 *       404:
 *         description: Appointment not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/updateAppointmentStatus",
  authMiddleware,
  updateAppointmentStatus
);

//Export
export default router;
