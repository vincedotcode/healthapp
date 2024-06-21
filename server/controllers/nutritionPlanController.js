import NutritionPlan from '../Models/Nutrition.js';
import { validationResult } from 'express-validator';

// Get all nutrition plans with optional pagination and filtering
export const getAllNutritionPlans = async (req, res) => {
  try {
    const { page = 1, limit = 10, user_id, goals } = req.query;
    const query = {};
    
    if (user_id) {
      query.user_id = user_id;
    }
    
    if (goals) {
      query.goals = { $regex: goals, $options: 'i' };
    }

    const nutritionPlans = await NutritionPlan.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await NutritionPlan.countDocuments(query);

    res.status(200).json({
      success: true,
      data: nutritionPlans,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching nutrition plans',
      error: error.message,
    });
  }
};

// Create a new nutrition plan
export const createNutritionPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const { user_id, plan_data, dietary_restrictions, goals, progress_tracking } = req.body;

  try {
    const newNutritionPlan = new NutritionPlan({
      user_id,
      plan_data,
      dietary_restrictions,
      goals,
      progress_tracking,
    });
    const savedNutritionPlan = await newNutritionPlan.save();
    res.status(201).json({
      success: true,
      data: savedNutritionPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating nutrition plan',
      error: error.message,
    });
  }
};

// Get a single nutrition plan by ID
export const getNutritionPlanById = async (req, res) => {
  try {
    const nutritionPlan = await NutritionPlan.findById(req.params.id);
    if (!nutritionPlan) {
      return res.status(404).json({
        success: false,
        message: 'Nutrition plan not found',
      });
    }
    res.status(200).json({
      success: true,
      data: nutritionPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching nutrition plan',
      error: error.message,
    });
  }
};

// Update a nutrition plan by ID
export const updateNutritionPlan = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const updatedNutritionPlan = await NutritionPlan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedNutritionPlan) {
      return res.status(404).json({
        success: false,
        message: 'Nutrition plan not found',
      });
    }
    res.status(200).json({
      success: true,
      data: updatedNutritionPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating nutrition plan',
      error: error.message,
    });
  }
};

// Delete a nutrition plan by ID
export const deleteNutritionPlan = async (req, res) => {
  try {
    const deletedNutritionPlan = await NutritionPlan.findByIdAndDelete(req.params.id);
    if (!deletedNutritionPlan) {
      return res.status(404).json({
        success: false,
        message: 'Nutrition plan not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Nutrition plan deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting nutrition plan',
      error: error.message,
    });
  }
};
