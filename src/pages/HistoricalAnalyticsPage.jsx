import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { History, Download, Calendar, Filter } from 'lucide-react';
import { generate30DayAnalytics } from '../data/mockData';

export default function HistoricalAnalyticsPage({ station }) {
  const [timeRange, setTimeRange] = useState('30d');
  const logs = generate30DayAnalytics();

  const handleExportCSV = () => {
    const headers = 'Date,Temp_C,WindSpeed_kmh,Wind_kWh,Solar_kWh,Diesel_kWh,Total_kWh,Renewable_Pct,DieselSaved_Liters,CO2Saved_kg\n';
    const rows = logs.map(l => 
      `${l.date},${l.tempC},${l.windSpeedKmH},${l.windKWh},${l.solarKWh},${l.dieselKWh},${l.totalDailyKWh},${l.renewablePercentage},${l.dieselLitersSaved},${l.co2SavedKg}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PolarGrid_${station.id}_30Day_Analytics.csv`;
    a.click();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-polar-cyan/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-6 h-6 text-polar-cyan" />
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              HISTORICAL ENERGY ANALYTICS & AUDIT LEDGER
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Long-term microgrid performance trends, weather correlation, and official MoES report export
          </p>
        </div>

        {/* CSV Download Button */}
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-polar-cyan to-emerald-400 text-polar-950 font-extrabold text-xs font-mono flex items-center gap-2 shadow-polar-glow hover:scale-105 active:scale-95 transition-all"
        >
          <Download className="w-4 h-4" />
          <span>EXPORT CSV REPORT</span>
        </button>
      </div>

      {/* STACKED AREA CHART: ENERGY MIX OVER TIME */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white">
              30-Day Historical Energy Mix Trends ({station.name})
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Daily generation breakdown: Wind (Green), Solar (Amber), Diesel Backup (Red)
            </p>
          </div>

          <div className="flex items-center gap-2 bg-polar-900 border border-polar-cyan/30 rounded-xl p-1 text-xs font-mono">
            <button
              onClick={() => setTimeRange('7d')}
              className={`px-3 py-1 rounded-lg font-bold ${timeRange === '7d' ? 'bg-polar-cyan text-polar-950' : 'text-slate-400'}`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30d')}
              className={`px-3 py-1 rounded-lg font-bold ${timeRange === '30d' ? 'bg-polar-cyan text-polar-950' : 'text-slate-400'}`}
            >
              30 Days
            </button>
          </div>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={logs}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1b3358" opacity={0.5} />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#0a1628', borderColor: '#00d4ff', borderRadius: '10px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="windKWh" stackId="1" stroke="#00ff88" fill="#00ff88" fillOpacity={0.7} name="Wind Generation (kWh)" />
              <Area type="monotone" dataKey="solarKWh" stackId="1" stroke="#ffaa00" fill="#ffaa00" fillOpacity={0.7} name="Solar Generation (kWh)" />
              <Area type="monotone" dataKey="dieselKWh" stackId="1" stroke="#ff4444" fill="#ff4444" fillOpacity={0.7} name="Diesel Generation (kWh)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
