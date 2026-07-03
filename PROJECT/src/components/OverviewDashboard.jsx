import React from 'react';
import { Search, Bell, AlertCircle, ArrowUpRight, ArrowDownRight, Users, BookOpen, UserCheck, AlertTriangle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const trendData = [
  { name: 'Wk1', Active: 30, AtRisk: 15, Dropped: 10 },
  { name: 'Wk2', Active: 33, AtRisk: 14, Dropped: 12 },
  { name: 'Wk3', Active: 35, AtRisk: 16, Dropped: 11 },
  { name: 'Wk4', Active: 38, AtRisk: 15, Dropped: 13 },
  { name: 'Wk5', Active: 41, AtRisk: 14, Dropped: 12 },
  { name: 'Wk6', Active: 43, AtRisk: 15, Dropped: 11 },
];

export default function OverviewDashboard({ onNavigate, onSelectStudent, onNudgeStudent }) {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Main Header Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            Good morning, Ngozi <span className="animate-pulse">👋</span>
          </h1>
          <p className="text-sm text-slate-500 font-medium">Here's your student engagement overview</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search students..." className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-blue-500 shadow-sm transition-all" />
          </div>
          <div className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-sm">
            27 June 2026 • Week 25
          </div>
          <button className="p-2 bg-white border border-slate-200 rounded-xl text-slate-500 relative shadow-sm hover:bg-slate-50 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 bg-amber-500 rounded-full absolute top-2 right-2"></span>
          </button>
        </div>
      </div>

      {/* Critical System Recommendation Banner */}
      <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-500 text-white rounded-xl mt-0.5 shadow-sm shrink-0">
            <AlertCircle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-sm">8 students are at-risk this week — 3 are completely inactive</h4>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              Recommended: Send nudge messages to critical records before they slide into "Dropped" parameters.
            </p>
          </div>
        </div>
        <button onClick={() => onNavigate('at-risk')} className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm shrink-0 whitespace-nowrap">
          Review At-Risk Students →
        </button>
      </div>

      {/* Metric Cards Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: 'TOTAL STUDENTS', val: '5,000', label: 'Across 10 regions', icon: Users, styles: 'text-slate-900 bg-white border-slate-100' },
          { title: 'ACTIVE STATUS', val: '34.1%', label: '↑ 2.3% vs last month', icon: UserCheck, styles: 'text-emerald-600 bg-white border-slate-100' },
          { title: 'AT-RISK RATIO', val: '33.3%', label: 'Requires intervention', icon: AlertTriangle, styles: 'text-amber-500 bg-white border-amber-200 ring-2 ring-amber-500/5' },
          { title: 'DROPPED COHORT', val: '32.7%', label: '↓ 0.8% stabilization', icon: BookOpen, styles: 'text-rose-500 bg-white border-slate-100' }
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className={`border rounded-2xl p-5 shadow-sm flex justify-between items-start ${card.styles}`}>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 tracking-wider block">{card.title}</span>
                <div className="text-2xl font-black">{card.val}</div>
                <span className="text-xs text-slate-500 font-medium block">{card.label}</span>
              </div>
              <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-400"><Icon className="w-4 h-4" /></div>
            </div>
          );
        })}
      </div>

      {/* Analytics Visualization Block */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Engagement Trend</h3>
              <p className="text-xs text-slate-400 font-medium">Activity trends over the past 6 weeks</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-600 rounded-full"></span>Active</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>At-Risk</span>
            </div>
          </div>
          <div className="h-60 w-full text-[11px]">
            <ResponsiveContainer width="100%" h="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="Active" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="AtRisk" stroke="#f59e0b" strokeWidth={2} strokeDasharray="3 3" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Mini Distribution Breakdown */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm flex flex-col justify-between gap-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Status Distribution</h3>
            <p className="text-xs text-slate-400 font-medium">Cohort volume split</p>
          </div>
          <div className="space-y-3 text-xs font-semibold">
            {[
              { label: 'Active Learners', count: '1,704 students', pct: '34.1%', fill: 'bg-emerald-500', bar: 'w-[34.1%]' },
              { label: 'At-Risk Monitoring', count: '1,665 students', pct: '33.3%', fill: 'bg-amber-500', bar: 'w-[33.3%]' },
              { label: 'Dropped Inactive', count: '1,631 students', pct: '32.7%', fill: 'bg-rose-500', bar: 'w-[32.7%]' }
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-700 flex items-center gap-1.5"><span className={`w-1.5 h-1.5 rounded-full ${row.fill}`}></span>{row.label}</span>
                  <span className="text-slate-900 font-bold">{row.pct}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${row.fill} ${row.bar} rounded-full`}></div>
                </div>
                <span className="text-[10px] text-slate-400 block font-medium">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Table Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Students Requiring Immediate Attention</h3>
          <div className="divide-y divide-slate-100">
            {[
              { name: 'Francisca Lawson', code: 'DA26030239', score: '41%', detail: '3 assignments overdue • 0 forum posts', color: 'bg-amber-50 border-amber-100 text-amber-700', text: 'At-Risk' },
              { name: 'Christina Ogbeide', code: 'DA26030329', score: '12%', detail: 'Last login over 34 days ago', color: 'bg-rose-50 border-rose-100 text-rose-700', text: 'Dropped' }
            ].map((st, i) => (
              <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0 gap-4 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-slate-600 flex items-center justify-center text-[11px] shrink-0">
                    {st.name.split(' ').map(n=>n[0]).join('')}
                  </div>
                  <div className="truncate">
                    <span className="font-bold text-slate-900 block hover:underline cursor-pointer" onClick={() => onSelectStudent({ name: st.name, code: st.code, score: st.score })}>{st.name}</span>
                    <span className="text-[11px] text-slate-400 block truncate font-medium">{st.detail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border hidden sm:inline-block ${st.color}`}>{st.text}</span>
                  <button onClick={() => onNudgeStudent({ name: st.name, code: st.code })} className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-[11px] shadow-sm transition-all">
                    ⚡ Nudge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Triggers Grid */}
        <div className="space-y-3">
          <h3 className="font-bold text-slate-900 text-sm px-1">Quick Workspace Modules</h3>
          <button onClick={() => onNudgeStudent({ name: 'Bulk Segment', code: 'Batch' })} className="w-full bg-white border border-slate-100 p-4 rounded-2xl shadow-sm hover:shadow-md text-left flex items-center justify-between group transition-all">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 bg-amber-500/10 text-amber-600 rounded-xl group-hover:bg-amber-500 group-hover:text-white transition-all shrink-0"><AlertTriangle className="w-4 h-4" /></div>
              <div className="truncate">
                <h5 className="font-bold text-slate-900 text-xs">Trigger Bulk Nudge Engine</h5>
                <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">Blast engagement alert to all at-risk units</p>
              </div>
            </div>
            <span className="text-slate-400 group-hover:text-slate-600 font-bold shrink-0 ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}