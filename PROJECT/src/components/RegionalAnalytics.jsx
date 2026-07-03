import React from 'react';
import { Download, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const analyticsDataset = [
  { name: 'Reg 04', Active: 45, AtRisk: 25, Dropped: 30, rate: '41.2%' },
  { name: 'Reg 02', Active: 40, AtRisk: 30, Dropped: 30, rate: '38.1%' },
  { name: 'Reg 08', Active: 35, AtRisk: 35, Dropped: 30, rate: '35.0%' },
  { name: 'Reg 06', Active: 42, AtRisk: 28, Dropped: 30, rate: '33.0%' }
];

export default function RegionalAnalytics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Regional Performance Metrics Console</h1>
          <p className="text-sm text-slate-500 font-medium">Platform deployment indicators split by geography</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-1.5 self-start sm:self-auto transition-colors"><Download className="w-3.5 h-3.5" /> Export Data Set</button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Engagement Split By Regional Parameters</h3>
            <p className="text-xs text-slate-400 font-medium">Stacked representation: Active | At-Risk | Dropped</p>
          </div>

          <div className="space-y-3 text-xs font-bold text-slate-700">
            {analyticsDataset.map((rg, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-14 text-slate-500 shrink-0">{rg.name}</span>
                <div className="flex-1 h-4 rounded bg-slate-100 overflow-hidden flex shadow-inner">
                  <div className="bg-emerald-500 h-full" style={{ width: `${rg.Active}%` }}></div>
                  <div className="bg-amber-500 h-full" style={{ width: `${rg.AtRisk}%` }}></div>
                  <div className="bg-rose-500 h-full" style={{ width: `${rg.Dropped}%` }}></div>
                </div>
                <span className="w-10 text-right font-black text-slate-900">{rg.rate}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-red-950 text-red-100 p-5 rounded-2xl border border-red-900 shadow-xl space-y-3">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-red-400 tracking-wider block uppercase flex items-center gap-1"><AlertCircle className="w-3.5 h-3.5" /> High Urgency Core Target</span>
            <h4 className="text-xl font-black text-white">Region 04 Audit Alert</h4>
            <p className="text-xs text-red-300 leading-normal font-medium">Displays a 41.2% threshold breakdown vector. Immediate institutional contact protocols suggested.</p>
          </div>
        </div>
      </div>
    </div>
  );
}