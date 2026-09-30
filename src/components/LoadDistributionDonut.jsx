import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ShieldCheck, Flame, Radio, Lightbulb, Coffee, AlertOctagon } from 'lucide-react';

export default function LoadDistributionDonut({ stationLoad, dispatchState, shedOverrides }) {
  const isEmergencyShed = dispatchState.mode.id === 4;

  const data = [
    { name: 'Life Support HVAC', value: stationLoad.categories.lifeSupportHeating, color: '#00ff88', priority: 'CRITICAL', status: 'PROTECTED', icon: Flame },
    { name: 'Lab Equipment', value: stationLoad.categories.researchEquipment, color: '#00d4ff', priority: 'HIGH', status: shedOverrides.research ? 'SHED' : 'ACTIVE', icon: ShieldCheck },
    { name: 'Satellite Comms', value: stationLoad.categories.communication, color: '#a8d8ea', priority: 'HIGH', status: 'PROTECTED', icon: Radio },
    { name: 'Lighting & Gen', value: stationLoad.categories.lighting, color: '#ffaa00', priority: 'MEDIUM', status: (isEmergencyShed || shedOverrides.lighting) ? 'DIMMED (-50%)' : 'ACTIVE', icon: Lightbulb },
    { name: 'Non-essential', value: stationLoad.categories.nonEssential, color: '#ff4444', priority: 'LOW', status: (isEmergencyShed || shedOverrides.nonEssential) ? 'SHED (0 kW)' : 'ACTIVE', icon: Coffee }
  ];

  return (
    <div className="glass-panel rounded-2xl p-5 border border-polar-cyan/20 shadow-2xl flex flex-col justify-between">
      <div className="flex items-center justify-between pb-3 mb-2 border-b border-polar-cyan/15">
        <div>
          <h3 className="font-bold text-sm text-white flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-polar-cyan" />
            STATION LOAD DISTRIBUTION & PRIORITY QUEUE
          </h3>
          <p className="text-xs text-slate-400">Total Active Load: <span className="font-mono text-polar-cyan font-bold">{stationLoad.totalLoadkW} kW</span></p>
        </div>
        {isEmergencyShed && (
          <span className="px-2.5 py-1 rounded-md bg-rose-950 border border-rose-500 text-rose-300 text-xs font-mono font-bold animate-pulse">
            SHEDDING ACTIVE
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        
        {/* Donut Chart */}
        <div className="h-56 relative flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#0a1628" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#0a1628', borderColor: '#00d4ff', borderRadius: '8px', fontSize: '12px' }}
                itemStyle={{ color: '#fff' }}
              />
            </PieChart>
          </ResponsiveContainer>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-white font-mono">{stationLoad.totalLoadkW}</span>
            <span className="text-[10px] font-mono text-slate-400">kW LOAD</span>
          </div>
        </div>

        {/* Priority Queue Breakdown */}
        <div className="space-y-2">
          {data.map((item) => {
            const Icon = item.icon;
            const isShed = item.status.includes('SHED') || item.status.includes('DIMMED');
            
            return (
              <div
                key={item.name}
                className={`p-2 rounded-lg border text-xs flex items-center justify-between transition-all ${
                  isShed
                    ? 'bg-rose-950/30 border-rose-500/30 text-rose-300 line-through opacity-75'
                    : 'bg-polar-900/60 border-polar-800 text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-medium">{item.name}</span>
                </div>

                <div className="flex items-center gap-2 font-mono">
                  <span className="font-bold">{item.value} kW</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    item.priority === 'CRITICAL'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : isShed
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
                      : 'bg-polar-800 text-slate-400'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
