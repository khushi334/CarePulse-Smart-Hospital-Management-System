import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, Heart, Shield, PhoneCall, X, ShieldAlert, 
  Users, Building2, UserCheck, ChevronDown, Sparkles, ArrowRight,
  TrendingUp, Calendar, CheckCircle2, Clipboard
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    { q: "How does the live token queue tracking system work?", a: "When you check in via your Digital ID passport, the platform assigns you a dynamic token sequence number. You can monitor live consultation updates directly from your smartphone dashboard without needing to wait in waiting area crowd groups." },
    { q: "Can I download my historical prescriptions and lab diagnostics?", a: "Yes, absolutely. The digital ledger saves signed medical PDF structures indefinitely. You can click the download action keys directly inside your personal Patient Dashboard at any hour." },
    { q: "Is my medical data securely stored?", a: "Security is our highest priority. All transmission matrices utilize end-to-end encryption protocols, and administrative operations feature role-based auditing access controls to ensure your records remain entirely confidential." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      
      {/* 1. PREMIUM 2-COLUMN HERO SECTION */}
      <header className="bg-white border-b border-slate-200/80 pt-16 pb-24 px-6 relative overflow-hidden">
        {/* Modern Engineering Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Left Column: Deep Content Branding */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1.5 rounded-xl uppercase tracking-wider inline-flex items-center gap-1.5 border border-blue-100 shadow-xs">
              <Sparkles size={12} className="animate-pulse" /> Next-Gen Smart Healthcare Core
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.05]">
              Smart Hospital Management, <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Simplified for Everyone.</span>
            </h1>
            <p className="text-slate-600 text-base md:text-lg max-w-xl leading-relaxed">
              Book consultations, track token live-queues, view active prescriptions, and deploy automated emergency triage routing seamlessly from a single terminal interface.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={() => navigate('/login')}
                className="bg-slate-900 hover:bg-slate-800 text-white px-7 py-4 rounded-xl font-bold shadow-lg shadow-slate-900/10 transition-all duration-200 cursor-pointer text-sm flex items-center gap-2 group"
              >
                Book Appointment <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => setIsSosOpen(true)}
                className="bg-red-50 hover:bg-red-100 text-red-600 px-7 py-4 rounded-xl font-bold border border-red-200/60 flex items-center gap-2 transition-all duration-200 cursor-pointer text-sm shadow-xs shadow-red-500/5"
              >
                <PhoneCall size={16} /> Emergency SOS
              </button>
            </div>
          </div>

          {/* Right Column: High-End UI Dashboard Mock Preview (Fills up the empty void!) */}
          <div className="lg:col-span-5 hidden lg:block relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-purple-600/10 rounded-3xl blur-2xl -z-10 transform scale-95 translate-y-4"></div>
            
            <div className="bg-slate-950 rounded-3xl p-6 shadow-2xl border border-slate-800 text-slate-400 space-y-6 max-w-sm mx-auto transform hover:scale-[1.01] transition-transform duration-300">
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-slate-600">LIVE CORE NODE v4.0</span>
              </div>

              {/* Mini UI Widget 1 */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800/80 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-200 flex items-center gap-1.5"><Activity size={14} className="text-blue-500" /> Room 03 Queue Status</span>
                  <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider animate-pulse">Active</span>
                </div>
                <p className="text-xs text-slate-400 font-semibold">Token #01 • Alex Mercer <span className="text-slate-600 font-normal">(In consultation)</span></p>
              </div>

              {/* Mini UI Widget 2 */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800/80 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">ICU Bed Status</span>
                  <span className="text-xl font-black text-slate-200 tracking-tight">88%</span>
                  <span className="text-[9px] text-emerald-500 font-bold block">✓ Optimized</span>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800/80 text-center space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Avg Wait-time</span>
                  <span className="text-xl font-black text-slate-200 tracking-tight">14 min</span>
                  <span className="text-[9px] text-blue-400 font-bold flex items-center justify-center gap-0.5"><TrendingUp size={10} /> Live Optimal</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* 2. HOVER GLOWING FEATURE CARDS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Unified Modules Built For Operation</h2>
          <p className="text-slate-500 text-sm mt-1">Real-time status synchronizations across three deployment screens</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 group">
            <div className="bg-blue-50 text-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 border border-blue-100">
              <Activity size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">Live Queue Tracking</h3>
            <p className="text-slate-600 mt-2 text-xs md:text-sm leading-relaxed">Monitor your waiting times and active token metrics directly from your browser without standing in physical triage crowds.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-green-300 hover:shadow-xl hover:shadow-green-500/10 group">
            <div className="bg-green-50 text-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 border border-green-100">
              <Heart size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-green-600 transition-colors">Digital Health Records</h3>
            <p className="text-slate-600 mt-2 text-xs md:text-sm leading-relaxed">Instantly access electronic prescriptions, diagnostic logs, and automated lab reports securely at any operational hour.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-purple-300 hover:shadow-xl hover:shadow-purple-500/10 group">
            <div className="bg-purple-50 text-purple-600 w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 border border-purple-100">
              <Shield size={22} />
            </div>
            <h3 className="text-base font-bold text-slate-900 group-hover:text-purple-600 transition-colors">Secure Bed Allocation</h3>
            <p className="text-slate-600 mt-2 text-xs md:text-sm leading-relaxed">Track live hospital metrics showing real-time unit availability of ICU, Emergency, and General Ward beds instantly.</p>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE ACCORDION FAQ SECTION */}
      <section className="bg-white border-t border-slate-200/80 py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Frequently Answered Queries</h2>
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mt-1">Understanding system protocols</p>
          </div>

          <div className="space-y-3 max-w-2xl mx-auto">
            {faqData.map((item, idx) => (
              <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden transition-all duration-200 bg-slate-50/50">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left font-bold text-slate-800 text-sm flex justify-between items-center bg-white cursor-pointer hover:bg-slate-50 transition"
                >
                  <span>{item.q}</span>
                  <ChevronDown size={16} className={`text-slate-400 transition-transform duration-200 ${activeFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="p-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/80 animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. LIVE PLATFORM SYSTEM STATISTICS METRIC STRIP */}
      <section className="bg-slate-900 text-white border-t border-slate-800 py-12 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-3 gap-6 text-center">
          <div className="space-y-1">
            <div className="flex justify-center text-blue-400 mb-1"><Users size={20} /></div>
            <h4 className="text-xl md:text-3xl font-black tracking-tight text-white">1,240+</h4>
            <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">Active Token Checkins</p>
          </div>
          <div className="space-y-1 border-x border-slate-800 px-4">
            <div className="flex justify-center text-emerald-400 mb-1"><Building2 size={20} /></div>
            <h4 className="text-xl md:text-3xl font-black tracking-tight text-white">94%</h4>
            <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">Bed Recovery Matrix</p>
          </div>
          <div className="space-y-1">
            <div className="flex justify-center text-purple-400 mb-1"><UserCheck size={20} /></div>
            <h4 className="text-xl md:text-3xl font-black tracking-tight text-white">18 min</h4>
            <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-wider">Avg Triage Queue Wait</p>
          </div>
        </div>
      </section>

      {/* 5. METRIC FOOTER BRANDING LAYOUT */}
      <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="font-bold text-white text-base">Care<span className="text-blue-500 font-extrabold">Pulse</span></div>
            <p className="max-w-xs leading-relaxed text-slate-500 font-medium">Next-generation clinical administration web suite developed for optimal diagnostic monitoring workflows.</p>
          </div>
          <div className="flex gap-8 font-semibold text-slate-500">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Use</a>
            <a href="#" className="hover:text-white transition">Support Desk</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto border-t border-slate-900 mt-8 pt-6 text-center text-[11px] font-medium text-slate-600">
          © {new Date().getFullYear()} CarePulse System Architecture Core. Built cleanly for academic project evaluation.
        </div>
      </footer>

      {/* EMERGENCY SOS MODAL ACCORD OVERLAY */}
      {isSosOpen && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-red-200 max-w-md w-full overflow-hidden shadow-2xl relative p-6">
            <button onClick={() => setIsSosOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 hover:bg-slate-100 rounded-full transition cursor-pointer"><X size={18} /></button>
            <div className="text-center pb-4 border-b border-slate-100">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-2"><ShieldAlert size={24} /></div>
              <h3 className="text-xl font-bold text-slate-900">Emergency Response Hub</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">Immediate life-support and ambulance dispatcher links</p>
            </div>
            <div className="my-5 space-y-3">
              <div className="p-3.5 bg-red-600 text-white rounded-xl flex items-center justify-between shadow-lg">
                <div><span className="text-[10px] font-bold uppercase opacity-80 block">Trauma & Ambulance Hotline</span><span className="text-lg font-extrabold">+91 9999-XXXXXX</span></div>
                <a href="#" className="bg-white text-red-600 text-xs font-bold px-4 py-2 rounded-lg">Call Now</a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}