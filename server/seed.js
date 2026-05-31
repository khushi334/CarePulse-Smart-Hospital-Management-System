import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from './models/User.js';

// Load variables from our .env file
dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to your live cluster database
    await mongoose.connect(process.env.MONGO_URI);
    console.log("⏳ Syncing to MongoDB Atlas cluster for data seeding...");

    // Wipe out old testing entries from this collection
    await User.deleteMany({});
    console.log("🧹 Previous placeholder users cleared.");

    // Generate secure hashed password values
    const salt = await bcrypt.genSalt(10);
    const patientPass = await bcrypt.hash("alex123", salt);
    const doctorPass = await bcrypt.hash("sharma123", salt);
    const adminPass = await bcrypt.hash("admin123", salt);

    // Seed the accounts matching our dashboard profiles
    await User.create([
      { name: "Alex Mercer", email: "alex@patient.com", password: patientPass, role: "patient" },
      { name: "Dr. A.K. Sharma", email: "sharma@doctor.com", password: doctorPass, role: "doctor" },
      { name: "Super Admin", email: "admin@admin.com", password: adminPass, role: "admin" }
    ]);

    console.log("🚀 Database seeded with real user accounts successfully!");
    process.exit(0);
    
  } catch (error) {
    console.error("🚨 Seeding failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();