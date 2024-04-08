import BookingModel from "../Models/BookingModel.js";
import DoctorModel from "../Models/DoctorModel.js";
import UserModel from "../Models/UserModel.js";
import HealthModel from "../Models/HealthModel.js";



///************** GET HEALTH INFO ***********/ 

export const getHealthInfo = async (req, res) => {
    try {
        const health = await HealthModel.findOne({
            userId
                : req.body.userId
        });
        if (!health) {
            return res.status(404).json({
                success: false,
                message: `Health details for user ${userId} not found.`,
            });
        }
        else {
            return res.status(200).json({
                success: true,
                message: "Health data fetched successfully!",
                data: health,
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err.message,
        });
    }
};