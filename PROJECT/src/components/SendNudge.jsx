import React from 'react';
import { ChevronRight, CheckSquare, FileText, Users, MessageSquare } from 'lucide-react';

export default function SendNudge({ student, onNavigate }) {
  const targetLabel = student ? student.name : 'Gabriel Lawson';

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wide">
        <button onClick={() => onNavigate('dashboard')} className="hover:text-slate-600">Dashboard</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate('at-risk')} className="hover:text-slate-600">Risk Matrix</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-slate-900 font-black">Messaging Desk</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
          <div>
            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">⚡ Communication Nudge Desk</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Deploying supportive notifications to re-engage student focus parameters</p>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 tracking-wider block uppercase">TARGET OBJECT</label>
            <div className="border border-slate-200 rounded-xl p-2 bg-slate-50 flex items-center">
              <span className="bg-blue-50 text-blue-600 border border-blue-200 text-xs font-bold px-2.5 py-1 rounded-lg">
                👤 {targetLabel} (Target Context Checked)
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 tracking-wider block uppercase">TEMPLATE VECTOR SELECT</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-bold">
              <button className="border-2 border-blue-600 bg-blue-50/20 p-3 rounded-xl text-left space-y-1"><CheckSquare className="w-4 h-4 text-blue-600" /> <div className="text-slate-900 mt-1">Check-In Suite</div></button>
              <button className="border border-slate-200 p-3 rounded-xl text-left space-y-1 text-slate-500 hover:bg-slate-50"><FileText className="w-4 h-4" /> <div className="text-slate-700 mt-1">Task Alert</div></button>
              <button className="border border-slate-200 p-3 rounded-xl text-left space-y-1 text-slate-500 hover:bg-slate-50"><Users className="w-4 h-4" /> <div className="text-slate-700 mt-1">1-on-1 Sync</div></button>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 tracking-wider block uppercase">BODY VALUE</label>
            <textarea rows={5} className="w-full border border-blue-600 rounded-xl p-4 text-xs font-semibold text-slate-700 focus:outline-none ring-4 ring-blue-600/5 leading-relaxed" defaultValue={`Hi ${targetLabel.split(' ')[0]}! 👋\n\nI noticed you haven't logged in to the platform recently. I wanted to reach out and see if you need any support getting back on track. We're here to help you succeed!`} />
          </div>

          <div className="pt-2 border-t border-slate-100 flex justify-end gap-2.5 text-xs font-bold">
            <button onClick={() => onNavigate('at-risk')} className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl">Discard</button>
            <button onClick={() => onNavigate('at-risk')} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow-md shadow-blue-600/10">Dispatch Nudge Vector</button>
          </div>
        </div>

        {/* Live Interface Preview Phone Display */}
        <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm space-y-3">
          <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">📱 Mobile View Preview</h4>
          <div className="bg-slate-950 p-4 rounded-2xl border-4 border-slate-800 shadow-inner h-40 flex items-center justify-center relative">
            <div className="bg-white/95 backdrop-blur p-2.5 rounded-xl border border-slate-100/40 shadow-xl max-w-[200px] text-[10px] space-y-1">
              <div className="flex justify-between text-[8px] font-bold text-slate-400"><span>LearnPulse</span><span>now</span></div>
              <h6 className="font-bold text-slate-900">Your instructor checked in on you 👋</h6>
              <p className="text-slate-500 font-medium truncate">"Hi {targetLabel.split(' ')[0]}! I noticed you haven't..."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}