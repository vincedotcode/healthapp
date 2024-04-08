import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
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

//***** MIDDLEWARE ROUTES *****/
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/doctor", doctorRoutes);

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//******** PORTS AND LISTEN *******/
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} mode on Port ${port}.`
      .bgBrightMagenta.white
  );
});