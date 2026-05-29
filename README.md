# 🏥 CarePulse: Smart Hospital Management System

CarePulse is an enterprise-grade, full-stack MERN (MongoDB, Express.js, React, Node.js) healthcare application designed to streamline clinical workflows, automate patient queues via progressive token ledgers, manage physical bed infrastructure, and distribute real-time institutional emergency notifications.

---

## 🚀 Core Features & Business Logic Architecture

### 1. 🔐 Multi-Tier Security & Authentication Gateways
* **Role-Based Access Control (RBAC):** Customized workspaces for **Patients**, **Doctors**, and **Administrators** accessible via a unified landing login portal interface.
* **Auto-Credential Seeding:** Integrated interactive toggle mechanism for seamless role navigation testing using demonstration account datasets.
* **Client-Side Route Guards:** Intercepts unauthenticated unauthorized page tree indexing requests to enforce structural system parameters.

### 2. 🎫 Automated Patient Token & Queue Trackers
* **Daily Progression Calculator:** Auto-calculates chronological scheduling tokens based on the specialist's daily load to eliminate queue overlap.
* **Smart Slot-Collision Barrier:** Rejects duplicate doctor/date/time-slot reservations right at the database layer, shifting scheduling warnings into a user feedback module.
* **Live Patient Queue Tracker:** Displays real-time calculations telling patients exactly how many individuals are in line ahead of them alongside an estimated waiting time benchmark.

### 3. 💊 Electronic Health Records (EHR) & Prescription Pipeline
* **Doctor Action Controls:** Empowers medical practitioners to expand consulting forms, input clinical prescriptions, and instantly authorize consultation finales.
* **Digital Prescription Synchronization:** Freshly processed treatment notes are piped directly into the target patient's account interface under an integrated medical records log.
* **Official Medical Slip Printer Engine:** Built-in native print media styling engine enabling patients to download and print formatted pharmacy-ready medicine receipts.

### 4. 🛏️ Infrastructure Management & Crisis Transmitters
* **Live Ward Availability Grid:** Interactive grid matrix tracking ICU, General, and Pediatric bed allocations with instantaneous manual toggle states.
* **Global Server Broadcast System:** Built-in critical emergency announcement transmitter enabling administrators to push prominent flashing warning banners down all connected user panel layouts synchronously.

---

## 🛠️ Technology Stack Ledger

* **Frontend Client Core:** React.js, Vite Compile Engine, React Router DOM v6
* **Styling Framework:** Tailwind CSS
* **Vector Component Typography:** Lucide React
* **Backend Runtime Core:** Node.js, Express.js REST API Architecture
* **Database Ledger Layer:** MongoDB Atlas Cloud Node Grid
* **Object-Relational Modeling Engine:** Mongoose ODM

---

## 📁 System Repository Structure

```text
Smart-Hospital-System/
├── client/                 # React Frontend Layer
│   ├── src/
│   │   ├── App.jsx        # Security Routing Guard Configurations
│   │   ├── Login.jsx      # Portal Role Multi-Toggle Interface
│   │   ├── PatientDashboard.jsx # Vitals, Booking, Queue Tracking & PDF Slip
│   │   ├── DoctorDashboard.jsx  # Active Waiting Room & EHR Upload Module
│   │   └── AdminDashboard.jsx   # Bed Grid Matrix & Emergency Alert Panel
│   └── package.json
└── server/                 # Node.js Backend Framework Layer
    ├── models/
    │   └── Appointment.js  # Mongoose Schema Matrix Blueprint
    ├── routes/
    │   └── auth.js         # Security Sign-in Verification Handlers
    ├── server.js           # Consolidated Core Routing Engine (Port 5000)
    └── package.json
