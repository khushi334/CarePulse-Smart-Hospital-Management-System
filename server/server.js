import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import Appointment from './models/Appointment.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CarePulse Smart Hospital Server Core Engine Is Active!');
});

app.use('/api/auth', authRoutes);

// ========================================================
// 1. ENDPOINT: BOOK NEW APPOINTMENT 
// ========================================================
app.post('/api/hospital/book', async (req, res) => {
  try {
    const { patientId, patientName, doctorName, date, timeSlot } = req.body;
    const count = await Appointment.countDocuments({ doctorName, date });
    const tokenNumber = count + 1;

    const newAppointment = await Appointment.create({
      patientId: patientId || "64b0f1a2c3d4e5f6a7b8c9d0",
      patientName,
      doctorName,
      date,
      timeSlot,
      tokenNumber,
      status: 'Pending',
      prescription: '' // Initializes blank
    });

    res.status(201).json({ message: 'Saved successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Booking Failure', error: error.message });
  }
});

// ========================================================
// 2. ENDPOINT: FETCH ALL APPOINTMENTS (FOR DOCTOR LEDGER)
// ========================================================
app.get('/api/hospital/appointments/all', async (req, res) => {
  try {
    const list = await Appointment.find({}).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve storage', error: error.message });
  }
});

// ========================================================
// 🚨 BULLETPROOF EMERGENCY BROADCAST STORAGE IN MODULE MEMORY
// ========================================================

// ========================================================
// 🚨 FIXED GLOBAL EMERGENCY BROADCAST STORAGE 
// ========================================================
let systemGlobalEmergencyBroadcast = "";

// 1. FIXED ADMIN DISPATCH ENDPOINT (Accepts text input seamlessly)
app.post('/api/hospital/broadcast', (req, res) => {
  try {
    const { alertText } = req.body;
    
    // Fallback assignment to ensure strings are never read as undefined objects
    systemGlobalEmergencyBroadcast = typeof alertText === 'string' ? alertText : String(alertText || "");
    
    console.log(`📢 [ALERT BROADCASTED]: ${systemGlobalEmergencyBroadcast || "Cleared"}`);
    
    return res.status(200).json({ 
      message: "Broadcast state updated successfully", 
      activeAlert: systemGlobalEmergencyBroadcast 
    });
  } catch (error) {
    console.error("Broadcast route crash:", error.message);
    return res.status(500).json({ message: "Internal server broadcast processing failure" });
  }
});

// 2. FIXED LIVE DASHBOARD POLLING FETCH ENDPOINT
app.get('/api/hospital/broadcast/current', (req, res) => {
  return res.status(200).json({ activeAlert: systemGlobalEmergencyBroadcast });
});
// ========================================================
// 3. ENDPOINT: GET PATIENT-SPECIFIC APPOINTMENTS & PRESCRIPTIONS
// ========================================================
app.get('/api/hospital/appointments/patient/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // Pulls records linked directly to the patient's unique account ID
    const list = await Appointment.find({ patientId: userId }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Failed to pull history data', error: error.message });
  }
});
// ========================================================
// UPDATED ENDPOINT: BOOK NEW APPOINTMENT WITH SLOT CHECKER
// ========================================================
app.post('/api/hospital/book', async (req, res) => {
  try {
    const { patientId, patientName, doctorName, date, timeSlot } = req.body;

    // 1. CRITICAL CHECK: Does an appointment already exist for this doctor, date, and slot?
    const existingAppointment = await Appointment.findOne({ doctorName, date, timeSlot });
    
    if (existingAppointment) {
      return res.status(400).json({ 
        message: `Scheduling Conflict: ${timeSlot} has already been securely reserved for ${doctorName} on this date. Please select an alternative time window.` 
      });
    }

    // 2. If slot is free, calculate progressive token number
    const count = await Appointment.countDocuments({ doctorName, date });
    const tokenNumber = count + 1;

    const newAppointment = await Appointment.create({
      patientId: patientId || "64b0f1a2c3d4e5f6a7b8c9d0",
      patientName,
      doctorName,
      date,
      timeSlot,
      tokenNumber,
      status: 'Pending',
      prescription: ''
    });

    res.status(201).json({ message: 'Saved successfully', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Booking Failure', error: error.message });
  }
});
// ========================================================
// 4. ACTION ENDPOINT: COMPLETE APPOINTMENT & UPDATE PRESCRIPTION
// PUT URL: http://localhost:5000/api/hospital/complete/:id
// ========================================================
app.put('/api/hospital/complete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { prescriptionText } = req.body;

    const updatedRecord = await Appointment.findByIdAndUpdate(
      id,
      { 
        status: 'Completed', 
        prescription: prescriptionText || 'No specific medication prescribed.' 
      },
      { new: true } // Returns back the freshly modified document record
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Target token allocation not found." });
    }

    res.json({ message: 'Clinical encounter securely finalized!', appointment: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: 'Server action handling failure', error: error.message });
  }
});

// Cloud MongoDB Connectivity Pipeline
const DB_CONNECTION_STRING = process.env.MONGO_URI;
mongoose.connect(DB_CONNECTION_STRING)
  .then(() => console.log('🎨 Database connection stabilized seamlessly on cloud Atlas cluster.'))
  .catch((err) => console.error('🚨 MongoDB Connection Error Grid:', err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on network port: ${PORT}`));