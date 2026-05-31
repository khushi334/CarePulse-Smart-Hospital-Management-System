import express from 'express';
import Appointment from '../models/Appointment.js';

const router = express.Router();

// ========================================================
// 1. FIXED ENDPOINT: Just use '/book'
// Combined with server.js, this maps to: /api/hospital/book
// ========================================================
router.post('/book', async (req, res) => {
  try {
    const { patientId, patientName, doctorName, date, timeSlot } = req.body;

    const count = await Appointment.countDocuments({ doctorName, date });
    const tokenNumber = count + 1;

    const newAppointment = await Appointment.create({
      patientId,
      patientName,
      doctorName,
      date,
      timeSlot,
      tokenNumber
    });

    res.status(201).json({
      message: 'Appointment synchronized to database ledger!',
      appointment: newAppointment
    });
  } catch (error) {
    res.status(500).json({ message: 'Booking Transmission Failure', error: error.message });
  }
});

// ========================================================
// 2. FIXED ENDPOINT: Just use '/appointments/:userId'
// Combined with server.js, this maps to: /api/hospital/appointments/:userId
// ========================================================
router.get('/appointments/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const list = await Appointment.find({ patientId: userId }).sort({ createdAt: -1 });
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve metrics storage', error: error.message });
  }
});

export default router;