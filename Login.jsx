import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Mail, Lock, AlertCircle, RefreshCw, User, Stethoscope, ShieldAlert } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  
  // Active selected role tracking state
  const [activeRole, setActiveRole] = useState('patient');
  
  // Form input field hook states
  const [email, setEmail] = useState('alex@patient.com');
  const [password, setPassword] = useState('alex123');
  
  // UI response feedback handlers
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-fill configuration helper for smooth testing
  const handleRoleToggle = (role) => {
    setActiveRole(role);
    setError('');
    
    if (role === 'patient') {
      setEmail('alex@patient.com');
      setPassword('alex123');
    } else if (role === 'doctor') {
      setEmail('sharma@doctor.com');
      setPassword('sharma123');
    } else if (role === 'admin') {
      setEmail('admin@admin.com');
      setPassword('admin123');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 🟢 MOCK BYPASS FOR GITHUB PAGES SHOWCASE
      // Instead of hitting a non-existent live server, we auto-populate mock details
      // to let evaluators inspect your UI modules instantly!
      
      localStorage.setItem('userRole', activeRole);
      localStorage.setItem('userName', activeRole === 'patient' ? 'Alex Patient' : activeRole === 'doctor' ? 'Dr. Sharma' : 'System Admin');
      localStorage.setItem('userId', 'mock-id-12345');

      // Instantly route to your dashboard targets smoothly
      if (activeRole === 'patient') navigate('/patient-dashboard');
      else if (activeRole === 'doctor') navigate('/doctor-dashboard');
      else if (activeRole === 'admin') navigate('/admin-dashboard');

    } catch (err) {
      console.error("Login verification crash event:", err.message);
      setError('Failed to establish connection with server terminal.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center bg-slate-50 px-6 py-6">
      <div className="max-w-md w-full bg-white border border-slate-200 p-8 rounded-3xl shadow-xl shadow-slate-200/50 space-y-5">
        
        {/* Branding Title Header Section */}
        <div className="text-center space-y-1">
          <div className="w-11 h-11 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto border border-blue-100">
            <ShieldCheck size={22} />
          </div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Access Gate Portal</h2>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Smart Hospital Gateway Validation</p>
        </div>

        {/* 🔘 ROLE SELECT TOGGLE BUTTONS GRID CONTAINER */}
        <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200/40">
          <button
            type="button"
            onClick={() => handleRoleToggle('patient')}
            className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-tight flex flex-col items-center gap-1 transition cursor-pointer ${
              activeRole === 'patient' 
                ? 'bg-white text-blue-600 shadow-sm border border-slate-200/60' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User size={14} /> Patient
          </button>
          
          <button
            type="button"
            onClick={() => handleRoleToggle('doctor')}
            className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-tight flex flex-col items-center gap-1 transition cursor-pointer ${
              activeRole === 'doctor' 
                ? 'bg-white text-emerald-600 shadow-sm border border-slate-200/60' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Stethoscope size={14} /> Doctor
          </button>
          
          <button
            type="button"
            onClick={() => handleRoleToggle('admin')}
            className={`py-2 px-1 rounded-xl text-[11px] font-black tracking-tight flex flex-col items-center gap-1 transition cursor-pointer ${
              activeRole === 'admin' 
                ? 'bg-white text-indigo-600 shadow-sm border border-slate-200/60' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldAlert size={14} /> Admin
          </button>
        </div>

        {/* Database Feedback Alert Indicator */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl font-semibold flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Dynamic Credentials Input Fields Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Target Account Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 text-slate-400" size={15} />
              <input 
                type="email" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="identity@domain.com"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">Passkey Validation Code</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 text-slate-400" size={15} />
              <input 
                type="password" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl text-xs bg-slate-50/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 font-bold"
              />
            </div>
          </div>

          <button
            type="submit" disabled={loading}
            className={`w-full py-3 text-white font-black text-xs rounded-xl transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
              activeRole === 'patient' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/10' :
              activeRole === 'doctor' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/10' :
              'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/10'
            }`}
          >
            {loading ? <RefreshCw size={13} className="animate-spin" /> : `Enter Workspace as ${activeRole}`}
          </button>
        </form>

      </div>
    </div>
  );
}
