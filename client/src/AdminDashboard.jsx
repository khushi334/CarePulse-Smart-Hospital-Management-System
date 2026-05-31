import { useState, useEffect } from 'react';
import { ShieldAlert, BarChart3, Users, Clock, CheckCircle, RefreshCw, LogOut, LayoutGrid, Megaphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // LIVE EMERGENCY ALERT MANAGEMENT INPUT STATES
  const [alertText, setAlertText] = useState('');
  const [activeAlert, setActiveAlert] = useState('');

  // INTERACTIVE BED MANAGEMENT STATE
  const [beds, setBeds] = useState([
    { id: 'ICU-101', type: 'ICU Ward', occupied: true, patient: 'Alex Mercer' },
    { id: 'ICU-102', type: 'ICU Ward', occupied: false, patient: '' },
    { id: 'ICU-103', type: 'ICU Ward', occupied: false, patient: '' },
    { id: 'GEN-201', type: 'General Ward', occupied: true, patient: 'John Doe' },
    { id: 'GEN-202', type: 'General Ward', occupied: false, patient: '' },
    { id: 'PED-301', type: 'Pediatric Ward', occupied: false, patient: '' },
  ]);

  // COMBINED SEAMLESS BACKEND SYNCHRONIZATION DATA LOOPS
  const fetchGlobalMetrics = async () => {
    setLoading(true);
    try {
      // 1. Fetch cross-department logs
      const response = await fetch('http://localhost:5000/api/hospital/appointments/all');
      if (response.ok) {
        const data = await response.json();
        setAppointments(data);
      }
      
      // 2. Fetch active server broadcast states
      const alertResponse = await fetch('http://localhost:5000/api/hospital/broadcast/current');
      if (alertResponse.ok) {
        const alertData = await alertResponse.json();
        setActiveAlert(alertData.activeAlert || '');
      }
    } catch (err) {
      console.error("System synchronization failed:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalMetrics();
  }, []);

  // TRANSMITS DISPATCH SIGNALS DIRECTLY DOWN SYSTEM DASHBOARD BACKEND WIRES
  const handleBroadcastAlert = async (e) => {
    e.preventDefault();
    if (!alertText.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/hospital/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertText: alertText.trim() })
      });
      
      if (response.ok) {
        const data = await response.json();
        setActiveAlert(data.activeAlert);
        setAlertText('');
        alert("Emergency alert broadcasted globally across all dashboards!");
      } else {
        alert("Server rejected broadcast formatting.");
      }
    } catch (err) {
      console.error("Failed to broadcast alert:", err.message);
      alert("Could not connect to backend server matrix.");
    }
  };

  const handleClearAlert = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/hospital/broadcast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alertText: "" })
      });
      
      if (response.ok) {
        setActiveAlert('');
        alert("Global broadcast clear command dispatched.");
      }
    } catch (err) {
      console.error("Failed to clear alert:", err.message);
    }
  };

  const toggleBedStatus = (bedId) => {
    setBeds(prev => prev.map(b => b.id === bedId ? { ...b, occupied: !b.occupied, patient: !b.occupied ? 'Emergency Admit' : '' } : b));
  };

  const totalConsultations = appointments.length;
  const pendingQueueLoad = appointments.filter(app => app.status === 'Pending').length;
  const completedEncounters = appointments.filter(app => app.status === 'Completed').length;
  const uniqueDoctorsCount = [...new Set(appointments.map(app => app.doctorName))].length;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Admin Header Banner */}
        <div className="bg-slate-900 text-white p-6 rounded-3xl flex justify-between items-center shadow-lg">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest"><ShieldAlert size={14} /> Enterprise Command Hub</div>
            <h1 className="text-2xl font-black tracking-tight">CarePulse Analytics Control Center</h1>
          </div>
          <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl transition flex items-center gap-2 cursor-pointer border border-slate-700"><LogOut size={14} /> Close Session</button>
        </div>

        {/* 🚨 CRISIS DISPATCH TRANSMITTER FORM PANEL */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2"><Megaphone size={18} className="text-red-500" /> Crisis Dispatch Transmitter Dashboard</h3>
          
          <form onSubmit={handleBroadcastAlert} className="flex gap-2">
            <input 
              type="text" 
              required 
              value={alertText} 
              onChange={(e) => setAlertText(e.target.value)}
              placeholder="Type urgent critical notice here... (e.g. Critical Trauma Code Red incoming to ICU Ward room #102)"
              className="flex-1 p-3 border border-slate-200 bg-slate-50 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500 text-slate-800"
            />
            <button 
              type="submit" 
              className="px-5 py-3 bg-red-600 hover:bg-red-700 text-white font-black text-xs rounded-xl transition cursor-pointer shadow-md shadow-red-500/10 shrink-0"
            >
              Broadcast Alert
            </button>
            {activeAlert && (
              <button 
                type="button" 
                onClick={handleClearAlert} 
                className="px-4 py-3 bg-slate-100 text-slate-600 font-bold text-xs rounded-xl hover:bg-slate-200 cursor-pointer shrink-0"
              >
                Clear
              </button>
            )}
          </form>
          
          {activeAlert && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-800 text-xs font-bold rounded-xl truncate">
              Active Server Notice: "{activeAlert}"
            </div>
          )}
        </div>

        {/* Metrics Blocks Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4"><div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><BarChart3 size={20} /></div><div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Bookings</div><div className="text-xl font-black text-slate-900">{totalConsultations}</div></div></div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4"><div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock size={20} /></div><div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Queue</div><div className="text-xl font-black text-slate-900">{pendingQueueLoad}</div></div></div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4"><div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle size={20} /></div><div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Discharged</div><div className="text-xl font-black text-slate-900">{completedEncounters}</div></div></div>
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center gap-4"><div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Users size={20} /></div><div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Active Doctors</div><div className="text-xl font-black text-slate-900">{uniqueDoctorsCount}</div></div></div>
        </div>

        {/* Bed Grid Management */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100"><h3 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2"><LayoutGrid size={18} className="text-indigo-600" /> Live Ward & Bed Management Console</h3></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {beds.map((bed) => (
              <button key={bed.id} onClick={() => toggleBedStatus(bed.id)} className={`p-4 rounded-2xl border text-left space-y-3 transition cursor-pointer hover:scale-[1.02] ${bed.occupied ? 'bg-red-50/40 border-red-200' : 'bg-emerald-50/40 border-emerald-200'}`}>
                <div className="flex justify-between items-center"><span className="text-xs font-black text-slate-900">{bed.id}</span></div>
                <div><div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{bed.type}</div><div className="text-[11px] font-bold truncate mt-0.5 text-slate-800">{bed.occupied ? `👤 ${bed.patient}` : 'Unassigned'}</div></div>
              </button>
            ))}
          </div>
        </div>

        {/* Audit Log Table */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100"><h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">Cross-Department Real-Time Log Audits</h3><button onClick={fetchGlobalMetrics} className="p-1.5 border border-slate-200 text-slate-500 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"><RefreshCw size={12} className={loading ? "animate-spin" : ""} /> Sync Logs</button></div>
          <div className="overflow-hidden border border-slate-200 rounded-2xl">
            <table className="w-full text-left border-collapse bg-white">
              <thead><tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider"><th className="p-4">Target Doctor</th><th className="p-4">Patient Name</th><th className="p-4">Consultation Windows</th><th className="p-4 text-center">Status</th></tr></thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {appointments.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/50 transition">
                    <td className="p-4 font-bold text-slate-900">{log.doctorName}</td>
                    <td className="p-4 text-slate-600">{log.patientName}</td>
                    <td className="p-4 text-slate-400">📅 {log.date} | ⏰ {log.timeSlot}</td>
                    <td className="p-4 text-center"><span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase border ${log.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>{log.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}