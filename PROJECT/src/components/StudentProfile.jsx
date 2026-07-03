import React from 'react';
import { ChevronRight, Calendar, MessageSquare, Globe, CheckCircle2, FileText } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts';

const historyTrend = [
  { name: 'W1', value: 4 }, { name: 'W2', value: 4.2 }, { name: 'W3', value: 3.8 },
  { name: 'W4', value: 3.9 }, { name: 'W5', value: 2.1 }, { name: 'W6', value: 1.2 }
];

export default function StudentProfile({ student, onNavigate, onNudgeStudent }) {
  const activeRecord = student || { name: 'Gabriel Lawson', code: 'DA26030239', r: 'Region 4', done: '41%', score: 0.68 };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Path Breadcrumbs */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wide">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-slate-600">Dashboard</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate('at-risk')} className="hover:text-slate-600">Risk Matrix</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-black">{activeRecord.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Profile Card Summary Column */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-5 text-center">
          <div className="flex flex-col items-center space-y-2">
            <div className="w-16 h-16 bg-amber-500/10 text-amber-600 border border-amber-200/60 font-black text-xl rounded-full flex items-center justify-center shadow-inner">
              {activeRecord.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900">{activeRecord.name}</h2>
              <p className="text-[11px] text-slate-400 font-bold mt-0.5">ID: {activeRecord.code} • {activeRecord.r || 'Cohort 1'}</p>
            </div>
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md">⚠️ Flagged Risk</span>
          </div>

          <div className="grid grid-cols-3 gap-2 border-y border-slate-100 py-3 text-center">
            <div><span className="block text-lg font-black text-rose-500">11</span><span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Days Out</span></div>
            <div><span className="block text-lg font-black text-amber-500">{activeRecord.done}</span><span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Done</span></div>
            <div><span className="block text-lg font-black text-rose-500">{activeRecord.score || '0.68'}</span><span className="text-[9px] font-bold text-slate-400 tracking-wider uppercase">Score</span></div>
          </div>

          <div className="space-y-2">
            <button onClick={() => onNudgeStudent(activeRecord)} className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs py-3 rounded-xl shadow-sm transition-all">⚡ Instant Nudge Deployment</button>
            <button className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold text-xs py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Schedule Sync</button>
          </div>
        </div>

        {/* Dynamic Activity/Progress Column Cluster */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm">Historical Interaction Logs</h3>
            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
              {[
                { title: 'System-Nudge triggered from desk — "Inactivity monitoring alert"', log: 'Today • 09:14 AM', icon: MessageSquare, styles: 'bg-amber-50 text-amber-600' },
                { title: 'External Portal transaction verified from mobile module', log: '11 days ago', icon: Globe, styles: 'bg-blue-50 text-blue-600' },
                { title: 'Verified Module 3 Core Evaluation Submission', log: '14 days ago • Score: 82/100', icon: CheckCircle2, styles: 'bg-emerald-50 text-emerald-600' }
              ].map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex items-start gap-4 relative z-10 text-xs">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ring-4 ring-white ${act.styles}`}><Icon className="w-3.5 h-3.5" /></div>
                    <div>
                      <h5 className="font-bold text-slate-800 leading-snug">{act.title}</h5>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">{act.log}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">Course Track Values</h3>
              <div className="space-y-3 text-xs font-semibold">
                <div>
                  <div className="flex justify-between mb-1"><span>Data Fundamentals</span><span>45%</span></div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="w-[45%] h-full bg-amber-500 rounded-full"></div></div>
                </div>
                <div>
                  <div className="flex justify-between mb-1"><span>Python Data Science</span><span>22%</span></div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden"><div className="w-[22%] h-full bg-rose-500 rounded-full"></div></div>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-2">
              <h3 className="font-bold text-slate-900 text-sm">Login Curve</h3>
              <div className="h-24 w-full text-xs">
                <ResponsiveContainer width="100%" h="100%">
                  <AreaChart data={historyTrend}>
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#f59e0b" fill="#fef3c7" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <span className="text-[10px] text-slate-400 block font-bold text-center uppercase tracking-wider">Downward vector verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}