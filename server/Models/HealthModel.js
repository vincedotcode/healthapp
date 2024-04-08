import mongoose from 'mongoose';

const weightRecordSchema = new mongoose.Schema({
  value: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false }); // Prevents creation of an _id for subdocuments

const healthDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  bloodPressure: {
    systolic: Number,
    diastolic: Number,
    createdAt: Date
  },
  heartRate: {
    value: Number, // beats per minute
    createdAt: Date
  },
  temperature: {
    value: Number, // in degrees Celsius or Fahrenheit
    createdAt: Date
  },
  respiratoryRate: {
    value: Number, // breaths per minute
    createdAt: Date
  },
  bloodOxygenSaturation: {
    value: Number, // percentage
    createdAt: Date
  },
  bloodSugar: {
    value: Number, // mg/dL or mmol/L
    createdAt: Date
  },
  cholesterol: {
    hdl: Number,
    ldl: Number,
    total: Number,
    createdAt: Date
  },
  weight: [weightRecordSchema], // An array of weight records
  height: {
    value: Number, // in centimeters or inches
    createdAt: Date
  },
  allergies: [String],
  medications: [{
    name: String,
    dosage: String,
    frequency: String
  }],
  medicalHistory: [String], // List of past medical conditions or surgeries
  notes: String, // Additional notes by healthcare providers
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const HealthDetail = mongoose.model('HealthDetail', healthDetailSchema);

export default HealthDetail;
