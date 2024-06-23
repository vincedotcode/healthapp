import { validationResult } from 'express-validator';
import HealthRecord from '../Models/HealthModel.js';

// Get all health records for a user
export const getHealthRecordsByUserId = async (req, res) => {
  try {
    const records = await HealthRecord.find({ user_id: req.params.userId }).populate('doctor_id');
    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching health records',
      error: error.message,
    });
  }
};

// Create a new health record
export const createHealthRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newRecord = new HealthRecord(req.body);
    const savedRecord = await newRecord.save();
    res.status(201).json({
      success: true,
      data: savedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating health record',
      error: error.message,
    });
  }
};

// Get health records by appointment ID
export const getHealthRecordsByAppointmentId = async (req, res) => {
  try {
    const records = await HealthRecord.find({ appointment_id: req.params.appointmentId }).populate('doctor_id');
    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching health records',
      error: error.message,
    });
  }
};
