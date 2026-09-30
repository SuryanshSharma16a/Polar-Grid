import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, Flame, TreePine, DollarSign, Award, ShieldCheck, Zap } from 'lucide-react';

export default function RoiPage({ accumulatedStats, station }) {
  const liters = Math.round(accumulatedStats.dieselSavedLiters);
  const co2Kg = Math.round(accumulatedStats.co2AvoidedKg);
  const costINR = Math.round(accumulatedStats.costSavedINR);
  const treesEquiv = Math.round(co2Kg / 20); // ~20kg CO2 per tree per year

  // Comparative Annual Data (100% Diesel vs PolarGrid Optimized)
  const comparisonData = [
    { category: 'Diesel Fuel (Liters)', traditional: 220000, polarGrid: 132000, savings: 88000 },
    { category: 'CO2 Emissions (Tons)', traditional: 589, polarGrid: 353, savings: 236 },
    { category: 'Logistics Cost (₹ Lakhs)', traditional: 704, polarGrid: 422, savings: 282 },
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-polar-cyan/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-polar-aurora" />
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              FUEL, EMISSIONS & FINANCIAL ROI TRACKER
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time savings counter & environmental compliance under the Antarctic Treaty System
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-polar-900 border border-polar-aurora/30 text-xs font-mono text-polar-aurora font-bold">
          POLAR DIESEL LOGISTICS RATE: ₹{station.fuelDeliveryCostPerLiterINR}/LITER
        </div>
      </div>

      {/* 5A. REAL-TIME SAVINGS COUNTER CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Liters Saved */}
        <div className="p-5 rounded-2xl glass-panel border border-polar-aurora/30 shadow-aurora-glow relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-bold text-slate-200">DIESEL SAVED</span>
            <Flame className="w-5 h-5 text-polar-aurora" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-polar-aurora text-glow-aurora">
            {liters.toLocaleString()} <span className="text-sm font-normal text-slate-400">Liters</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            ▲ +0.27 L saved per kWh clean energy
          </div>
        </div>

        {/* Card 2: CO2 Avoided */}
        <div className="p-5 rounded-2xl glass-panel border border-emerald-500/30 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-bold text-slate-200">CO2 AVOIDED</span>
            <TreePine className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-emerald-400">
            {co2Kg.toLocaleString()} <span className="text-sm font-normal text-slate-400">kg</span>
          </div>
          <div className="text-[11px] text-emerald-300/80 mt-2 font-mono flex items-center gap-1">
            <span>🌳 Equiv. to {treesEquiv.toLocaleString()} mature trees planted</span>
          </div>
        </div>

        {/* Card 3: Financial Cost Saved */}
        <div className="p-5 rounded-2xl glass-panel border border-polar-cyan/30 shadow-polar-glow">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-bold text-slate-200">LOGISTICS COST SAVED</span>
            <DollarSign className="w-5 h-5 text-polar-cyan" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-polar-cyan text-glow-cyan">
            ₹{(costINR / 100000).toFixed(2)} <span className="text-sm font-normal text-slate-400">Lakhs</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            Calculated @ ₹{station.fuelDeliveryCostPerLiterINR}/L polar airlift cost
          </div>
        </div>

        {/* Card 4: Clean Renewable Energy */}
        <div className="p-5 rounded-2xl glass-panel border border-amber-500/30">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-bold text-slate-200">RENEWABLE GENERATED</span>
            <Zap className="w-5 h-5 text-amber-400" />
          </div>
          <div className="font-mono text-3xl font-extrabold text-amber-400">
            {Math.round(accumulatedStats.renewableKWh).toLocaleString()} <span className="text-sm font-normal text-slate-400">kWh</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-2 font-mono">
            Wind & Solar microgrid total yield
          </div>
        </div>

      </div>

      {/* 5B. COMPARATIVE ANALYSIS CHART */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white">
            Comparative Annual Analysis: Traditional (100% Diesel) vs PolarGrid Optimized
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Projected annual reduction in fuel consumption, carbon emissions, and logistics expenditure
          </p>
        </div>

        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1b3358" opacity={0.5} />
              <XAxis dataKey="category" stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ background: '#0a1628', borderColor: '#00d4ff', borderRadius: '10px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Bar dataKey="traditional" fill="#ff4444" radius={[6, 6, 0, 0]} name="Traditional (100% Diesel)" />
              <Bar dataKey="polarGrid" fill="#00ff88" radius={[6, 6, 0, 0]} name="PolarGrid Optimized" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 5C. CARBON FOOTPRINT & ANTARCTIC TREATY COMPLIANCE */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-polar-cyan" />
          <h3 className="font-bold text-base text-white">
            ANTARCTIC TREATY ENVIRONMENTAL PROTOCOL ALIGNMENT
          </h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The Protocol on Environmental Protection to the Antarctic Treaty (Madrid Protocol) mandates strict minimization of environmental impact in Antarctic Specially Protected Areas (ASPAs). PolarGrid directly supports India’s climate commitments by preventing fuel spill risks during polar tanker vessel ship-to-shore transfers and reducing particulate soot deposition on Antarctic glaciers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-cyan/20 font-mono text-xs">
            <span className="text-polar-cyan font-bold block mb-1">ANNEX IV COMPLIANCE</span>
            <span className="text-slate-400">Prevention of marine diesel pollution during icebreaker refueling operations.</span>
          </div>

          <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-aurora/20 font-mono text-xs">
            <span className="text-polar-aurora font-bold block mb-1">BLACK CARBON REDUCTION</span>
            <span className="text-slate-400">40% reduction in diesel exhaust particulate soot settling on polar ice sheets.</span>
          </div>

          <div className="p-4 rounded-xl bg-polar-950/80 border border-amber-500/20 font-mono text-xs">
            <span className="text-amber-400 font-bold block mb-1">NCPOR GOA AUDIT TRAIL</span>
            <span className="text-slate-400">Automated carbon ledger reports exported for MoES environmental audits.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
