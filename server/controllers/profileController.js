import User from "../Models/UserModel.js";
import Doctor from "../Models/DoctorModel.js";
import Application from "../Models/Application.js";

// Controller to get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find user by ID
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Initialize userProfile
    const userProfile = { user };

    // Check if the user is a doctor
    if (user.role === 'doctor') {
      // Find doctor profile
      const doctorProfile = await Doctor.findOne({ user_id: userId }).lean();
      if (doctorProfile) {
        userProfile.doctorProfile = doctorProfile;

        // Find application status
        const application = await Application.findOne({ user_id: userId }).lean();
        if (application) {
          userProfile.applicationStatus = application.status;
        }
      }
    }

    return res.status(200).json({
      success: true,
      data: userProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: error.message,
    });
  }
};
