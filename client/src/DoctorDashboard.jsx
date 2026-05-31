import { useState, useEffect } from 'react';
import { ClipboardList, CheckCircle, RefreshCw, LogOut, FileText, Pill, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const doctorName = localStorage.getItem('userName') || 'Dr. A.K. Sharma';
  
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeFormId, setActiveFormId] = useState(null);
  const [rxNotes, setRxNotes] = useState('');
  
  // LIVE EMERGENCY ALERT STATE FOR CLINICAL CONSOLE
  const [globalAlert, setGlobalAlert] = useState('');

  const fetchDoctorRoster = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/hospital/appointments/all');
      if (response.ok) {
        const data = await response.json();
        const pendingQueue = data.filter(app => app.status === 'Pending');
        setAppointments(pendingQueue);
      }
      
      // 🚨 LIVE ALERTS SERVER LOOKUP
      const alertResponse = await fetch('http://localhost:5000/api/hospital/broadcast/current');
      if (alertResponse.ok) {
        const alertData = await alertResponse.json();
        setGlobalAlert(alertData.activeAlert);
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ========================================================
  // LIVE CROSS-WINDOW CRITICAL BROADCAST STREAM LISTENER
  // ========================================================
  useEffect(() => {
    fetchDoctorRoster();

    const handleLiveSystemAlerts = (e) => {
      // Instantly catch emergency alerts the millisecond admin hits send
      if (e.key === 'sysEmergencyBroadcast') {
        setGlobalAlert(e.newValue || '');
      }
    };

    window.addEventListener('storage', handleLiveSystemAlerts);
    return () => window.removeEventListener('storage', handleLiveSystemAlerts);
  }, []);

  const handleFinalizeTreatment = async (appointmentId) => {
    if (!rxNotes.trim()) return alert("Please enter prescription details before finalizing.");
    try {
      const response = await fetch(`http://localhost:5000/api/hospital/complete/${appointmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prescriptionText: rxNotes })
      });
      if (response.ok) {
        alert("Encounter updated successfully! Prescription uploaded to cloud ledger.");
        setRxNotes('');
        setActiveFormId(null);
        fetchDoctorRoster();
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* CRITICAL INCIDENT BANNER SYSTEM DISCOVERY */}
        {globalAlert && (
          <div className="bg-red-600 border border-red-700 p-4 rounded-2xl text-white text-xs font-black tracking-wide flex items-center gap-3 animate-pulse shadow-md">
            <ShieldAlert size={18} className="shrink-0" />
            <div className="uppercase">CRITICAL WARD CRISIS BANNER: <span className="font-medium normal-case tracking-normal ml-1">{globalAlert}</span></div>
          </div>
        )}

        <div className="bg-white p-6 rounded-3xl border border-slate-200 flex justify-between items-center shadow-xs">
          <div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">Clinical Workspace: {doctorName}</h1>
            <p className="text-xs text-slate-500 font-medium">Manage current daily active consultations pipeline</p>
          </div>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="px-4 py-2 bg-red-50 text-red-600 font-bold text-xs rounded-xl border border-red-100 transition flex items-center gap-2 cursor-pointer">
            <LogOut size={14} /> Leave Console
          </button>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2"><ClipboardList size={16} className="text-blue-600" /> Active Waiting Room Patients</h3>
            <button onClick={fetchDoctorRoster} className="p-1.5 border border-slate-200 text-slate-500 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"><RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Sync Queue</button>
          </div>
          {appointments.length === 0 ? (
            <div className="py-16 text-center text-slate-400 text-xs font-medium">No patients currently waiting in your queue grid folder.</div>
          ) : (
            <div className="space-y-4">
              {appointments.map((ticket) => (
                <div key={ticket._id} className="p-5 border border-slate-200/80 rounded-2xl bg-slate-50/50 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <span className="text-[10px] bg-blue-50 text-blue-600 border border-blue-100 px-2.5 py-0.5 rounded-md font-black">TOKEN #{ticket.tokenNumber}</span>
                      <h4 className="text-sm font-black text-slate-900 mt-1">{ticket.patientName}</h4>
                      <p className="text-slate-500 text-[11px] font-medium">📅 Scheduled for {ticket.date} | ⏰ Time window: {ticket.timeSlot}</p>
                    </div>
                    {activeFormId !== ticket._id && (
                      <button onClick={() => { setActiveFormId(ticket._id); setRxNotes(''); }} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow-sm cursor-pointer"><FileText size={13} /> Begin Treatment Diagnosis</button>
                    )}
                  </div>
                  {activeFormId === ticket._id && (
                    <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1"><Pill size={12} className="text-emerald-500" /> Digital Prescription Formulary & Medical Instructions</label>
                      <textarea rows={3} value={rxNotes} onChange={(e) => setRxNotes(e.target.value)} placeholder="Write medicine dosage plan here... (e.g. Paracetamol 500mg - 1-0-1 after food for 3 days)" className="w-full p-3 border border-slate-200 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <div className="flex justify-end gap-2">
                        <button onClick={() => setActiveFormId(null)} className="px-3 py-1.5 bg-slate-100 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-200 transition cursor-pointer">Cancel</button>
                        <button onClick={() => handleFinalizeTreatment(ticket._id)} className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"><CheckCircle size={13} /> Finalize Treatment Ticket</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}