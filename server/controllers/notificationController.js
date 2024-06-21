import Notification from "../Models/Notification.js";

// Get notifications by user ID
export const getNotificationsByUserId = async (req, res) => {
  const { user_id } = req.params;
  
  try {
    const notifications = await Notification.find({ user_id });
    res.status(200).json({
      success: true,
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching notifications",
      error: error.message,
    });
  }
};
