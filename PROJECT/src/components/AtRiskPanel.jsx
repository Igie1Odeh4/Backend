import React, { useState } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, ShieldAlert, Download, X } from 'lucide-react';

const dataset = [
  { id: '1', name: 'Ivie Ogbeide', code: 'DA26030329', r: 'Region 2', status: 'Dropped', active: '34 days ago', done: '12%', score: 0.87, nudge: 'Pending' },
  { id: '2', name: 'Emmanuel Ukoje', code: 'DA26031030', r: 'Region 7', status: 'Dropped', active: '21 days ago', done: '18%', score: 0.79, nudge: 'Pending' },
  { id: '3', name: 'Gabriel Lawson', code: 'DA26030239', r: 'Region 4', status: 'At-Risk', active: '11 days ago', done: '41%', score: 0.68, nudge: 'Pending' },
  { id: '4', name: 'Emmanuel Ayuba', code: 'DA26030732', r: 'Region 3', status: 'At-Risk', active: '8 days ago', done: '53%', score: 0.55, nudge: 'Sent' },
  { id: '5', name: 'Blessing Ahwe', code: 'DA26030481', r: 'Region 5', status: 'At-Risk', active: '6 days ago', done: '62%', score: 0.43, nudge: 'Sent' }
];

export default function AtRiskPanel({ onNavigate, onSelectStudent, onNudgeStudent }) {
  const [selected, setSelected] = useState(['1', '2', '3']);

  const toggleSelectRow = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      {/* Red Alert Banner Block */}
      <div className="bg-gradient-to-r from-red-950 to-red-800 text-white p-5 flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div className="space-y-1">
          <h1 className="text-lg font-black flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-400" /> At-Risk Cohort Validation Matrix
          </h1>
          <p className="text-xs text-red-200/80 font-medium">Real-time indicators showing users falling outside baseline platform activities</p>
        </div>
        <div className="flex items-center gap-3 text-center self-start md:self-auto text-xs font-bold">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
            <span className="block text-base font-black">8</span>
            <span className="text-[10px] font-medium text-red-300">Monitored</span>
          </div>
          <div className="bg-white/10 px-3 py-1.5 rounded-xl border border-white/5">
            <span className="block text-base font-black">3</span>
            <span className="text-[10px] font-medium text-red-300">Critical</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Dynamic Toolbar Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200/60">
          <div className="flex flex-wrap items-center gap-2 flex-1">
            <div className="relative w-full sm:w-auto sm:flex-1 sm:max-w-xs">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Filter index parameters..." className="pl-10 pr-4 py-1.5 w-full bg-white border border-slate-200 rounded-xl text-xs focus:outline-none shadow-sm" />
            </div>
            <div className="flex gap-1 bg-slate-200/60 p-1 rounded-xl text-[11px] font-bold text-slate-600">
              <button className="bg-white text-slate-900 px-3 py-1 rounded-lg shadow-sm">All (8)</button>
              <button className="px-3 py-1 rounded-lg hidden sm:inline-block">Critical (3)</button>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm"><ArrowUpDown className="w-3.5 h-3.5" /> Sort: Urgency</button>
            <button onClick={() => onNudgeStudent({ name: 'Bulk Selection Group', code: 'Batch' })} className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-1.5 rounded-xl shadow-md shadow-blue-600/10 transition-all">
              + Action Batch ({selected.length})
            </button>
          </div>
        </div>

        {/* Selected Rows Indicator */}
        {selected.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2 flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="text-amber-800 font-semibold">{selected.length} unique row identifiers checked</span>
            <button onClick={() => setSelected([])} className="text-slate-400 hover:text-slate-600"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Responsive Table Container */}
        <div className="overflow-x-auto border border-slate-100 rounded-xl shadow-sm">
          <table className="w-full text-left border-collapse text-xs whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold text-[10px] tracking-wider">
                <th className="p-4 w-6"><input type="checkbox" checked={selected.length === dataset.length} onChange={() => setSelected(selected.length === dataset.length ? [] : dataset.map(d=>d.id))} className="rounded border-slate-300 text-blue-600 focus:ring-0" /></th>
                <th className="p-4">STUDENT BASE INFORMATION</th>
                <th className="p-4">RISK PROFILE</th>
                <th className="p-4">LAST PORTAL TRANSACTION</th>
                <th className="p-4">COMPLETION VALUE</th>
                <th className="p-4">WEIGHTED RISK</th>
                <th className="p-4 text-center">CONTEXT DIRECTIVES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {dataset.map((row) => {
                const isSelected = selected.includes(row.id);
                const isDrop = row.status === 'Dropped';
                return (
                  <tr key={row.id} className={`hover:bg-slate-50/50 transition-colors ${isSelected ? 'bg-blue-50/20' : ''}`}>
                    <td className="p-4"><input type="checkbox" checked={isSelected} onChange={() => toggleSelectRow(row.id)} className="rounded border-slate-300 text-blue-600 focus:ring-0" /></td>
                    <td className="p-4">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-full font-bold flex items-center justify-center text-[10px] ${isDrop ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>{row.name.split(' ').map(n=>n[0]).join('')}</div>
                        <div>
                          <span className="font-bold text-slate-900 block cursor-pointer hover:underline" onClick={() => onSelectStudent(row)}>{row.name}</span>
                          <span className="text-[10px] text-slate-400 block font-medium">{row.code} • {row.r}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4"><span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${isDrop ? 'bg-rose-50 border-rose-100 text-rose-600':'bg-amber-50 border-amber-100 text-amber-600'}`}>{row.status}</span></td>
                    <td className="p-4 text-slate-500 font-medium">{row.active}</td>
                    <td className="p-4 text-slate-900 font-bold">{row.done}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2 max-w-[120px]">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full ${isDrop ? 'bg-rose-500':'bg-amber-500'}`} style={{ width: `${row.score * 100}%` }}></div>
                        </div>
                        <span className="font-black text-slate-900">{row.score}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-1.5">
                        <button onClick={() => onNudgeStudent(row)} className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-2.5 py-1 rounded-lg font-bold shadow-sm transition-all text-[11px]">⚡ Nudge</button>
                        <button onClick={() => onSelectStudent(row)} className="bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg font-bold shadow-sm transition-all text-[11px]">View</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}