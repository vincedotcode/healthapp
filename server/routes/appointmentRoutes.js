import express from 'express';
import {
  getAllAppointments,
  createAppointment,
  updateAppointmentStatus,
  deleteAppointment,
  getAppointmentsByUserId,
  getAppointmentsByDoctorId,
} from '../controllers/appointmentsController.js';

const router = express.Router();

// Get all appointments
/**
 * @swagger
 * /api/v1/appointments:
 *   get:
 *     summary: Get all appointments
 *     tags: [Appointments]
 *     responses:
 *       200:
 *         description: List of all appointments
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
 *                   doctor_id:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       user_id:
 *                         type: string
 *                       specialty:
 *                         type: string
 *                       availability:
 *                         type: string
 *                   appointment_date:
 *                     type: string
 *                     format: date
 *                   appointment_time:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [Sent, Scheduled, Completed, Cancelled]
 *                   reason:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Error fetching appointments
 */
router.get('/', getAllAppointments);

// Create a new appointment
/**
 * @swagger
 * /api/v1/appointments:
 *   post:
 *     summary: Create a new appointment
 *     tags: [Appointments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - doctor_id
 *               - appointment_date
 *               - appointment_time
 *               - reason
 *             properties:
 *               user_id:
 *                 type: string
 *               doctor_id:
 *                 type: string
 *               appointment_date:
 *                 type: string
 *                 format: date
 *               appointment_time:
 *                 type: string
 *               reason:
 *                 type: string
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Error creating appointment
 */
router.post('/', createAppointment);

// Update appointment status
/**
 * @swagger
 * /api/v1/appointments/{id}:
 *   put:
 *     summary: Update an appointment status by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [Sent, Scheduled, Completed, Cancelled]
 *     responses:
 *       200:
 *         description: Appointment status updated successfully
 *       400:
 *         description: Invalid status
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Error updating appointment status
 */
router.put('/:id', updateAppointmentStatus);

// Delete an appointment by ID
/**
 * @swagger
 * /api/v1/appointments/{id}:
 *   delete:
 *     summary: Delete an appointment by ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *       404:
 *         description: Appointment not found
 *       500:
 *         description: Error deleting appointment
 */
router.delete('/:id', deleteAppointment);

// Get appointments by user ID
/**
 * @swagger
 * /api/v1/appointments/user/{userId}:
 *   get:
 *     summary: Get appointments by user ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of appointments for the user
 *       500:
 *         description: Error fetching appointments
 */
router.get('/user/:userId', getAppointmentsByUserId);

// Get appointments by doctor ID
/**
 * @swagger
 * /api/v1/appointments/doctor/{doctorId}:
 *   get:
 *     summary: Get appointments by doctor ID
 *     tags: [Appointments]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         schema:
 *           type: string
 *         required: true
 *         description: The doctor ID
 *     responses:
 *       200:
 *         description: List of appointments for the doctor
 *       500:
 *         description: Error fetching appointments
 */
router.get('/doctor/:doctorId', getAppointmentsByDoctorId);


export default router;
