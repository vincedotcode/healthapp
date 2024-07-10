import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import nutritionRoutes from "./routes/nutritionRoutes.js";
import physicalRecordRoutes from "./routes/physicalRecordRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import medicationRoutes from "./routes/medicationRoutes.js";
import symptomRoutes from "./routes/symptomRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import aiRoutes from "./routes/aiRoutes.js"; // Import the AI routes
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// DOTENV CONFIGURATION
dotenv.config();

// DATABASE CONFIGURATION
connectDB();

// REST OBJ
const app = express();

//******** MIDDLEWARE *******/
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//***** SWAGGER INITIATION *****/
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Health API with Swagger',
      version: '1.0.0',
      description: 'A Health APP API with Swagger documentation',
    },
    components: {
      securitySchemes: {
        BearerAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//***** MIDDLEWARE ROUTES *****/
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/applications", applicationRoutes);
app.use("/api/v1/nutrition-plans", nutritionRoutes);
app.use("/api/v1/physical-records", physicalRecordRoutes); 
app.use("/api/v1/doctors", doctorRoutes);
app.use("/api/v1/appointments", appointmentRoutes);
app.use("/api/v1/notifications", notificationRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/medications", medicationRoutes);
app.use("/api/v1/symptoms", symptomRoutes);
app.use("/api/v1/healthrecords", healthRoutes);
app.use("/api/v1", aiRoutes); // Add AI routes

//******** PORTS AND LISTEN *******/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightMagenta.white
  );
});
