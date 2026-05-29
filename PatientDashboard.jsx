import { useState, useEffect } from 'react';
import { Calendar, CheckCircle, RefreshCw, Activity, Heart, Pill, Users, Hourglass, ShieldAlert, HeartPulse, Printer } from 'lucide-react';

export default function PatientDashboard() {
  const userName = localStorage.getItem('userName') || 'Valued Patient';
  const userId = localStorage.getItem('userId') || '64b0f1a2c3d4e5f6a7b8c9d0';

  const [doctorName, setDoctorName] = useState('Dr. A.K. Sharma (Cardiology)');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('09:00 AM - 10:00 AM');
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [message, setMessage] = useState('');
  
  // LIVE EMERGENCY ALERT BROADCAST STATE
  const [globalAlert, setGlobalAlert] = useState('');

  // PATIENT METABOLIC METRICS HEALTH VITALS STATE
  const [vitals] = useState({ bp: '122/81 mmHg', pulse: '74 BPM', spo2: '98%', temp: '98.6 °F' });

  const fetchAppointments = async () => {
    setFetching(true);
    try {
      const response = await fetch(`http://localhost:5000/api/hospital/appointments/patient/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
      // Read administrative live crisis broadcast network wire
      const activeBroadcast = localStorage.getItem('sysEmergencyBroadcast');
      setGlobalAlert(activeBroadcast || '');
    } catch (err) {
      console.error(err.message);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // ========================================================
  // OFFICIAL CLINICAL PRESCRIPTION PDF SLIP GENERATOR ENGINE
  // ========================================================
  const handlePrintPrescription = (ticket) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head><title>CarePulse Official EHR Receipt</title></head>
        <body style="font-family: system-ui, sans-serif; padding: 40px; color: #1e293b; max-width: 600px; margin: auto; border: 1px solid #e2e8f0; border-radius: 24px; margin-top: 40px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #2563eb; padding-bottom: 15px;">
            <div>
              <h2 style="margin: 0; color: #2563eb; font-weight: 900;">CarePulse Healthcare Systems</h2>
              <span style="font-size: 11px; color: #64748b; font-weight: bold; uppercase;">Digital Health Records Audit Ledger</span>
            </div>
            <div style="text-align: right; font-size: 11px; font-weight: bold; color: #64748b;">Receipt Token #${ticket.tokenNumber}</div>
          </div>
          <div style="margin: 25px 0; font-size: 13px; line-height: 1.6;">
            <p><strong>Patient Identifier:</strong> ${userName}</p>
            <p><strong>Consulting Medical Specialist:</strong> ${ticket.doctorName}</p>
            <p><strong>Date of Consultation Encounter:</strong> ${ticket.date} (${ticket.timeSlot})</p>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 16px;">
            <h4 style="margin: 0 0 10px 0; color: #0f172a; text-transform: uppercase; font-size: 11px; tracking-wider;">Rx Prescribed Medication Details & Notes:</h4>
            <p style="margin: 0; font-size: 13px; font-style: italic; color: #334155; line-height: 1.5;">"${ticket.prescription}"</p>
          </div>
          <div style="margin-top: 40px; text-align: center; font-size: 10px; color: #94a3b8; font-weight: 500;">
            This is a cryptographically synchronized clinical health document generated via MERN Cloud Architecture.
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!date) return;
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('http://localhost:5000/api/hospital/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: userId, patientName: userName, doctorName, date, timeSlot })
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(`Success! Token #${data.appointment.tokenNumber} issued permanently.`);
        setDate('');
        fetchAppointments();
      } else {
        setMessage(`⚠️ ${data.message || 'Network synchronization drop error.'}`);
      }
    } catch (err) {
      setMessage('⚠️ Failed to send appointment request.');
    } finally {
      setLoading(false);
    }
  };

  const calculateQueueMetrics = (currentApp) => {
    if (currentApp.status === 'Completed') return null;
    const competingQueue = appointments.filter(app => 
      app.doctorName === currentApp.doctorName && app.date === currentApp.date && app.status === 'Pending' && app.tokenNumber < currentApp.tokenNumber
    );
    const patientsAhead = competingQueue.length;
    const estimatedWait = patientsAhead * 15;
    return { patientsAhead, estimatedWait };
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 🚨 DYNAMIC GLOBAL CRITICAL EMERGENCY BROADCAST ALERTS BAR */}
        {globalAlert && (
          <div className="bg-red-600 border border-red-700 p-4 rounded-2xl text-white text-xs font-black tracking-wide flex items-center gap-3 animate-pulse shadow-md shadow-red-600/20">
            <ShieldAlert size={18} className="shrink-0" />
            <div className="uppercase">CRITICAL EMERGENCY BROADCAST: <span className="font-medium normal-case tracking-normal ml-1">{globalAlert}</span></div>
          </div>
        )}

        {/* Dashboard Header Profile Banner */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Welcome Back, {userName}</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Manage diagnostics requests and medical prescription documentation reports</p>
          </div>
          <div className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold border border-blue-100 flex items-center gap-2">
            <Heart size={14} className="animate-pulse" /> Patient Terminal Active
          </div>
        </div>

        {/* 🩺 DYNAMIC BIOMETRIC HEALTH METRICS VITALS READOUT HUB CARD */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 shadow-sm">
          <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-red-50 text-red-500 rounded-xl"><HeartPulse size={16} /></div>
            <div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Blood Pressure</div><div className="text-xs font-black text-slate-800">{vitals.bp}</div></div>
          </div>
          <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-blue-50 text-blue-500 rounded-xl"><Activity size={16} /></div>
            <div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Heart Rate</div><div className="text-xs font-black text-slate-800">{vitals.pulse}</div></div>
          </div>
          <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-emerald-50 text-emerald-500 rounded-xl"><Pill size={16} /></div>
            <div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">SpO2 Oxygen</div><div className="text-xs font-black text-slate-800">{vitals.spo2}</div></div>
          </div>
          <div className="bg-slate-50 border border-slate-200/50 p-3 rounded-2xl flex items-center gap-3">
            <div className="p-2 bg-amber-50 text-amber-500 rounded-xl"><RefreshCw size={16} /></div>
            <div><div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Body Temp</div><div className="text-xs font-black text-slate-800">{vitals.temp}</div></div>
          </div>
        </div>

        <div className="grid md:grid-cols-12 gap-6">
          
          {/* Booking Request Card Module */}
          <div className="md:col-span-5 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 space-y-5">
            <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2"><Calendar size={18} className="text-blue-600" /> Dispatch Consultation Ticket</h3>
            {message && (
              <div className={`p-3 border font-bold text-xs rounded-xl flex items-center gap-2 ${message.includes('⚠️') ? 'bg-amber-50 border-amber-200 text-amber-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
                {message.includes('⚠️') ? <Activity size={14} className="shrink-0" /> : <CheckCircle size={14} className="shrink-0" />}
                <span>{message}</span>
              </div>
            )}
            <form onSubmit={handleBookAppointment} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Select Professional Specialist</label>
                <select value={doctorName} onChange={(e) => setDoctorName(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800">
                  <option>Dr. A.K. Sharma (Cardiology)</option>
                  <option>Dr. Priya Patel (Pediatrics)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Consultation Date</label>
                <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Target Window Slot</label>
                <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800">
                  <option>09:00 AM - 10:00 AM</option>
                  <option>11:00 AM - 12:00 PM</option>
                  <option>03:00 PM - 04:00 PM</option>
                </select>
              </div>
              <button type="submit" disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-blue-500/10">
                {loading ? <RefreshCw size={14} className="animate-spin" /> : "Authorize Cloud Booking"}
              </button>
            </form>
          </div>

          {/* Records Ledger Panel */}
          <div className="md:col-span-7 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2"><Activity size={18} className="text-emerald-600" /> My Medical Records Ledger</h3>
              <button onClick={fetchAppointments} className="p-1.5 hover:bg-slate-50 border border-slate-200 text-slate-500 rounded-lg transition cursor-pointer">
                <RefreshCw size={12} className={fetching ? "animate-spin" : ""} />
              </button>
            </div>
            {appointments.length === 0 ? (
              <div className="py-16 text-center text-slate-400 text-xs font-medium">No active hospital records tracking this account.</div>
            ) : (
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                {appointments.map((item) => {
                  const metrics = calculateQueueMetrics(item);
                  return (
                    <div key={item._id} className="p-4 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-3 transition hover:border-slate-300">
                      <div className="flex justify-between items-center">
                        <div className="text-left">
                          <h4 className="text-xs font-black text-slate-900">{item.doctorName}</h4>
                          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">📅 {item.date} | ⏰ {item.timeSlot}</p>
                        </div>
                        <div className="text-right">
                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-md border tracking-wide uppercase ${item.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                            {item.status === 'Completed' ? `✓ Treated` : `Token #${item.tokenNumber}`}
                          </span>
                        </div>
                      </div>
                      {metrics && (
                        <div className="grid grid-cols-2 gap-2 pt-1">
                          <div className="bg-blue-50/60 border border-blue-100 p-2 rounded-xl flex items-center gap-2 text-blue-800">
                            <Users size={14} className="shrink-0 text-blue-500" />
                            <div className="text-[11px] font-bold">Ahead of you: <span className="text-xs font-black">{metrics.patientsAhead} patients</span></div>
                          </div>
                          <div className="bg-indigo-50/60 border border-indigo-100 p-2 rounded-xl flex items-center gap-2 text-indigo-800">
                            <Hourglass size={14} className="shrink-0 text-indigo-500 animate-spin" style={{ animationDuration: '3s' }} />
                            <div className="text-[11px] font-bold">Est. Wait Time: <span className="text-xs font-black">~{metrics.estimatedWait} mins</span></div>
          </div>
                        </div>
                      )}
                      {item.status === 'Completed' && item.prescription && (
                        <div className="p-3.5 bg-white border border-slate-200/70 rounded-xl space-y-3 border-l-4 border-l-emerald-500">
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1"><Pill size={11} className="text-emerald-500" /> Digital Prescription Uploaded:</span>
                            
                            {/* DYNAMIC LOCAL PRINT ACTION ICON */}
                            <button 
                              onClick={() => handlePrintPrescription(item)}
                              className="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-600 font-bold text-[10px] rounded-lg transition flex items-center gap-1 cursor-pointer border border-blue-100"
                            >
                              <Printer size={11} /> Print Medical Slip
                            </button>
                          </div>
                          <p className="text-xs font-bold text-slate-800 leading-relaxed italic bg-slate-50 p-2 rounded-lg border border-slate-100">"{item.prescription}"</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}