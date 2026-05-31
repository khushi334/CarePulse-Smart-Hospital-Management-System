import { Link, useLocation } from 'react-router-dom';
import { Activity, Shield, User, LayoutDashboard, Home } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  
  const linkStyle = (path) => `
    flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
    ${isActive(path) 
      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
  `;

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-6 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900 text-lg tracking-tight">
          <div className="bg-blue-600 text-white p-2 rounded-xl shadow-md shadow-blue-500/20">
            <Activity size={18} />
          </div>
          <span>Care<span className="text-blue-600 font-extrabold">Pulse</span></span>
        </Link>

        {/* Premium Navigation Pills */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/50">
          <Link to="/" className={linkStyle('/')}><Home size={16} /> Home</Link>
          <Link to="/patient-dashboard" className={linkStyle('/patient-dashboard')}><User size={16} /> Patient</Link>
          <Link to="/doctor-dashboard" className={linkStyle('/doctor-dashboard')}><Activity size={16} /> Doctor</Link>
          <Link to="/admin-dashboard" className={linkStyle('/admin-dashboard')}><Shield size={16} /> Admin</Link>
        </nav>

        {/* Right Side Action Action */}
        <div>
          <Link to="/login" className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-all duration-200 block">
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}