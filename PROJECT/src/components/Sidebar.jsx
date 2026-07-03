import React from 'react';
import { LayoutDashboard, Users, AlertTriangle, MessageSquare, BarChart3, Settings, LogOut } from 'lucide-react';

export default function Sidebar({ currentView, setCurrentView }) {
  const menus = [
    { id: 'dashboard', text: 'Dashboard', icon: LayoutDashboard },
    { id: 'at-risk', text: 'Risk Desk', icon: AlertTriangle, badge: 8 },
    { id: 'nudge', text: 'Messaging', icon: MessageSquare },
    { id: 'regional', text: 'Analytics', icon: BarChart3 }
  ];

  return (
    <div className="w-64 bg-[#0f172a] text-slate-400 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800 hidden md:flex">
      <div>
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md">◎</div>
          <span className="text-white font-black text-lg tracking-tight">LearnPulse</span>
        </div>
        <div className="p-3 space-y-1">
          <span className="text-[9px] font-bold text-slate-600 tracking-wider block px-3 mb-2 uppercase">MAIN APPLICATION</span>
          {menus.map((m) => {
            const Icon = m.icon;
            const isMatch = currentView === m.id || (m.id === 'at-risk' && currentView === 'students');
            return (
              <button key={m.id} onClick={() => setCurrentView(m.id)} className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${isMatch ? 'bg-blue-600 text-white shadow-md shadow-blue-600/10' : 'hover:bg-slate-800/60 hover:text-slate-200'}`}>
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{m.text}</span>
                </div>
                {m.badge && <span className="bg-red-500 text-white font-extrabold text-[9px] px-1.5 py-0.5 rounded-full">{m.badge}</span>}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-slate-800 space-y-3 bg-slate-950/20">
        <div className="flex items-center gap-3 p-2 bg-slate-900/50 rounded-xl border border-slate-800/40">
          <div className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20 flex items-center justify-center text-xs">NL</div>
          <div className="min-w-0 text-left">
            <div className="text-xs font-bold text-white truncate">Ngozi Lawson</div>
            <div className="text-[10px] text-slate-500 font-medium truncate">Educator Track</div>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-bold hover:text-slate-200"><Settings className="w-3.5 h-3.5" /> Settings</button>
        <button className="w-full flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-red-400 hover:text-red-300"><LogOut className="w-3.5 h-3.5" /> Logout</button>
      </div>
    </div>
  );
}