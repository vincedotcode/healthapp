import { validationResult } from 'express-validator';
import SymptomAnalysis from "../Models/Symptom.js";

// Get all symptoms for a user
export const getSymptomsByUserId = async (req, res) => {
  try {
    const symptoms = await SymptomAnalysis.find({ user_id: req.params.userId }).populate('appointment_id');
    res.status(200).json({
      success: true,
      data: symptoms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching symptoms',
      error: error.message,
    });
  }
};

// Create a new symptom analysis
export const createSymptomAnalysis = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const newSymptomAnalysis = new SymptomAnalysis(req.body);
    const savedSymptomAnalysis = await newSymptomAnalysis.save();
    res.status(201).json({
      success: true,
      data: savedSymptomAnalysis,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating symptom analysis',
      error: error.message,
    });
  }
};

// Get symptoms by appointment ID
export const getSymptomsByAppointmentId = async (req, res) => {
  try {
    const symptoms = await SymptomAnalysis.find({ appointment_id: req.params.appointmentId }).populate('appointment_id');
    res.status(200).json({
      success: true,
      data: symptoms,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching symptoms',
      error: error.message,
    });
  }
};
