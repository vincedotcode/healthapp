import PhysicalRecord from '../Models/PhysicalRecord.js';
import HistoricalPhysicalRecord from '../Models/historicalPhysicalRecord.js';
import { validationResult } from 'express-validator';

// Get all physical records for a user
export const getAllPhysicalRecords = async (req, res) => {
  try {
    const records = await PhysicalRecord.find({ user_id: req.params.user_id });
    res.status(200).json({
      success: true,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching physical records',
      error: error.message,
    });
  }
};

// Create a new physical record
export const createPhysicalRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { user_id, weight, height, bmi, body_fat_percentage, muscle_mass, water_percentage, waist_circumference, hip_circumference, blood_pressure, heart_rate, notes } = req.body;

  try {
    const newRecord = new PhysicalRecord({
      user_id,
      weight,
      height,
      bmi,
      body_fat_percentage,
      muscle_mass,
      water_percentage,
      waist_circumference,
      hip_circumference,
      blood_pressure,
      heart_rate,
      notes,
    });
    const savedRecord = await newRecord.save();
    res.status(201).json({
      success: true,
      data: savedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating physical record',
      error: error.message,
    });
  }
};

// Update a physical record by ID and save the previous record to history
export const updatePhysicalRecord = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const existingRecord = await PhysicalRecord.findById(req.params.id);
    if (!existingRecord) {
      return res.status(404).json({
        success: false,
        message: 'Physical record not found',
      });
    }

    // Save current record to history
    const historicalRecord = new HistoricalPhysicalRecord({
      user_id: existingRecord.user_id,
      original_record_id: existingRecord._id,
      date: existingRecord.date,
      weight: existingRecord.weight,
      height: existingRecord.height,
      bmi: existingRecord.bmi,
      body_fat_percentage: existingRecord.body_fat_percentage,
      muscle_mass: existingRecord.muscle_mass,
      water_percentage: existingRecord.water_percentage,
      waist_circumference: existingRecord.waist_circumference,
      hip_circumference: existingRecord.hip_circumference,
      blood_pressure: existingRecord.blood_pressure,
      heart_rate: existingRecord.heart_rate,
      notes: existingRecord.notes,
    });
    await historicalRecord.save();

    // Update the existing record
    const updatedRecord = await PhysicalRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating physical record',
      error: error.message,
    });
  }
};

// Delete a physical record by ID
export const deletePhysicalRecord = async (req, res) => {
  try {
    const deletedRecord = await PhysicalRecord.findByIdAndDelete(req.params.id);
    if (!deletedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Physical record not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Physical record deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting physical record',
      error: error.message,
    });
  }
};
