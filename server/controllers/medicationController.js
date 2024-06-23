import { validationResult } from 'express-validator';
import Medication from "../Models/Medication.js";

// Get all medications for a user
export const getMedicationsByUserId = async (req, res) => {
  try {
    const medications = await Medication.find({ user_id: req.params.userId }).populate('prescribed_by');
    res.status(200).json({
      success: true,
      data: medications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching medications',
      error: error.message,
    });
  }
};

// Create a new medication
export const createMedication = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newMedication = new Medication(req.body);
    const savedMedication = await newMedication.save();
    res.status(201).json({
      success: true,
      data: savedMedication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating medication',
      error: error.message,
    });
  }
};

// Get medications by appointment ID
export const getMedicationsByAppointmentId = async (req, res) => {
  try {
    const medications = await Medication.find({ appointment_id: req.params.appointmentId }).populate('prescribed_by');
    res.status(200).json({
      success: true,
      data: medications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching medications',
      error: error.message,
    });
  }
};
