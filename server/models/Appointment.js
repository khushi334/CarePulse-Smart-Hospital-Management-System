import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  patientId: { 
    type: String, // <-- CHANGED FROM OBJECTID TO STRING FOR FLEXIBILITY
    required: true 
  },
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Completed'], default: 'Pending' },
  tokenNumber: { type: Number, required: true },
  prescription: { type: String, default: '' }
}, { timestamps: true });

// Prevent mongoose from compiling duplicate models if it reloads
const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
export default Appointment;