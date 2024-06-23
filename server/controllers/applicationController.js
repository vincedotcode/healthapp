import Application from "../Models/Application.js";
import DoctorDocument from "../Models/Document.js";
import Doctor from "../Models/DoctorModel.js";
import User from "../Models/UserModel.js";

// Get applications by user ID
export const getApplicationsByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const applications = await Application.find({ user_id: userId }).populate('user_id', 'name email');
    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applications",
      error: error.message,
    });
  }
};


// Get all applications
export const getAllApplications = async (req, res) => {
  try {
    const applications = await Application.find().populate('user_id', 'name email');
    res.status(200).json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching applications",
      error: error.message,
    });
  }
};

// Create a new application
export const createApplication = async (req, res) => {
  const { user_id, specialty, availability, documents } = req.body;
  
  if (!user_id || !specialty || !availability) {
    return res.status(400).json({
      success: false,
      message: "User ID, specialty, and availability are required",
    });
  }

  if (!documents || !Array.isArray(documents) || documents.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Documents are required",
    });
  }

  try {
    const newApplication = new Application({ user_id, specialty, availability });
    const savedApplication = await newApplication.save();

    const newDoctorDocument = new DoctorDocument({
      application_id: savedApplication._id,
      documents,
    });
    await newDoctorDocument.save();

    res.status(201).json({
      success: true,
      data: savedApplication,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating application",
      error: error.message,
    });
  }
};

// Update an application status
export const updateApplicationStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !["pending", "approved", "rejected"].includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Invalid status",
    });
  }

  try {
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    // Update or create doctor record if the application is approved
    if (status === 'approved') {
      let doctor = await Doctor.findOne({ user_id: application.user_id });
      if (!doctor) {
        doctor = new Doctor({
          user_id: application.user_id,
          specialty: application.specialty,
          availability: application.availability,
          approval_status: status,
        });
      } else {
        doctor.specialty = application.specialty;
        doctor.availability = application.availability;
        doctor.approval_status = status;
      }
      await doctor.save();

      // Update user role to 'doctor'
      const user = await User.findById(application.user_id);
      if (user) {
        user.role = 'doctor';
        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      data: application,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating application",
      error: error.message,
    });
  }
};
// Delete an application
export const deleteApplication = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedApplication = await Application.findByIdAndDelete(id);
    if (!deletedApplication) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting application",
      error: error.message,
    });
  }
};
