import Appointment from "../Models/Appointment.js";
import Notification from "../Models/Notification.js";
import Doctor from "../Models/DoctorModel.js";
import { validationResult } from "express-validator";

// Get all appointments
export const getAllAppointments = async (req, res) => {
    try {
      const appointments = await Appointment.find()
        .populate('user_id', 'name email')
        .populate('doctor_id', 'user_id specialty availability');
      res.status(200).json({
        success: true,
        data: appointments,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching appointments',
        error: error.message,
      });
    }
  };

// Get appointment by ID
export const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findById(id)
      .populate({
        path: 'user_id',
        select: 'name email',
      })
      .populate({
        path: 'doctor_id',
        select: 'specialty availability',
        populate: {
          path: 'user_id',
          select: 'name',
        },
      });
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }
    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment',
      error: error.message,
    });
  }
};
// Get appointments by user ID
export const getAppointmentsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const appointments = await Appointment.find({ user_id: userId })
      .populate({
        path: 'user_id',
        select: 'name email',
      })
      .populate({
        path: 'doctor_id',
        select: 'specialty availability',
        populate: {
          path: 'user_id',
          select: 'name',
        },
      });
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message,
    });
  }
};

// Get appointments by doctor ID
export const getAppointmentsByDoctorId = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const appointments = await Appointment.find({ doctor_id: doctorId })
      .populate({
        path: 'user_id',
        select: 'name email',
      })
      .populate({
        path: 'doctor_id',
        select: 'specialty availability',
        populate: {
          path: 'user_id',
          select: 'name',
        },
      });
    res.status(200).json({
      success: true,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message,
    });
  }
};




export const createAppointment = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
  
    const { user_id, doctor_id, appointment_date, appointment_time, reason } = req.body;
  
    if (!doctor_id) {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }
  
    try {
      const doctorExists = await Doctor.findById(doctor_id);
      if (!doctorExists) {
        return res.status(404).json({
          success: false,
          message: 'Doctor not found',
        });
      }
  
      const newAppointment = new Appointment({
        user_id,
        doctor_id,
        appointment_date,
        appointment_time,
        status: "Sent",
        reason,
      });
      const savedAppointment = await newAppointment.save();
  
      // Create notification
      const newNotification = new Notification({
        user_id,
        message: `Your appointment request has been sent to the doctor.`,
        notification_type: "Appointment",
        sent_at: new Date(),
        link: `/appointments/${savedAppointment._id}`,
      });
      await newNotification.save();
  
      res.status(201).json({
        success: true,
        data: savedAppointment,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating appointment',
        error: error.message,
      });
    }
  };
// Update appointment status
export const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["Sent", "Scheduled", "Completed", "Cancelled"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).populate('user_id', 'name email').populate('doctor_id', 'user_id specialty availability');

    if (!updatedAppointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    // Create notification for status update
    const newNotification = new Notification({
      user_id: updatedAppointment.user_id,
      message: `Your appointment status has been updated to ${status}.`,
      notification_type: "Appointment",
      sent_at: new Date(),
      link: `/appointments/${updatedAppointment._id}`,
    });
    await newNotification.save();

    res.status(200).json({
      success: true,
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating appointment',
      error: error.message,
    });
  }
};

// Delete an appointment by ID
export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedAppointment = await Appointment.findByIdAndDelete(id);
      if (!deletedAppointment) {
        return res.status(404).json({
          success: false,
          message: 'Appointment not found',
        });
      }
  
      // Create notification for deleted appointment
      const newNotification = new Notification({
        user_id: deletedAppointment.user_id,
        message: `Your appointment scheduled on ${deletedAppointment.appointment_date} has been cancelled.`,
        notification_type: "Appointment",
        sent_at: new Date(),
        link: `/appointments/${deletedAppointment._id}`,
      });
      await newNotification.save();
  
      res.status(200).json({
        success: true,
        message: 'Appointment deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting appointment',
        error: error.message,
      });
    }
  };
