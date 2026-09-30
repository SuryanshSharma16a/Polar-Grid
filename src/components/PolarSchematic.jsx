import React from 'react';
import { Wind, Sun, Battery, Flame, Zap, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function PolarSchematic({
  windPowerkW,
  solarPowerkW,
  bessPerf,
  bessSocPercent,
  stationLoad,
  dieselConsumption,
  dispatchState,
  station,
  isBlizzardAlert
}) {
  const isWindActive = windPowerkW > 1;
  const isSolarActive = solarPowerkW > 1;
  const isBessDischarging = dispatchState.bessAction === 'DISCHARGING' || dispatchState.bessAction === 'SUPPORTING';
  const isBessCharging = dispatchState.bessAction === 'CHARGING';
  const isDgActive = dispatchState.activeGenerators > 0;

  return (
    <div className="glass-panel rounded-2xl p-5 border border-polar-cyan/20 shadow-2xl relative overflow-hidden">
      
      {/* Title & Central Bus Specs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-5 border-b border-polar-cyan/15 gap-2">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-polar-cyan animate-ping" />
            <h2 className="text-base font-bold text-white tracking-wide">
              REAL-TIME POLAR MICROGRID DIGITAL TWIN (SCADA SCHEMATIC)
            </h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Synchronous 400V 50Hz AC Bus • {station.name} Energy Hub
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="px-3 py-1 rounded-lg bg-polar-900 border border-polar-cyan/30 text-polar-cyan">
            BUS VOLTAGE: <span className="text-white font-bold">400.2 V</span>
          </div>
          <div className="px-3 py-1 rounded-lg bg-polar-900 border border-polar-aurora/30 text-polar-aurora">
            FREQ: <span className="text-white font-bold">50.01 Hz</span>
          </div>
        </div>
      </div>

      {/* SVG Microgrid Schematic & Flow Lines */}
      <div className="relative w-full overflow-x-auto">
        <div className="min-w-[700px] py-4">
          
          {/* Top Sources Row */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            
            {/* 1. Wind Turbines */}
            <div className={`p-4 rounded-xl transition-all border ${
              isBlizzardAlert
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                : isWindActive
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : 'bg-polar-900/60 border-polar-800 text-slate-400'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wind className={`w-5 h-5 ${isWindActive ? 'text-polar-aurora animate-spin-slow' : 'text-slate-400'}`} />
                  <span className="font-bold text-xs">WIND TURBINES (2x)</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isBlizzardAlert
                    ? 'bg-rose-900 text-rose-300'
                    : isWindActive
                    ? 'bg-emerald-900 text-emerald-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {isBlizzardAlert ? 'CUT-OUT' : isWindActive ? 'GENERATING' : 'CALM'}
                </span>
              </div>
              <div className="font-mono text-2xl font-extrabold text-white mb-1">
                {windPowerkW} <span className="text-xs font-normal text-slate-400">kW</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono flex justify-between">
                <span>Cap: {station.maxWindkW} kW</span>
                <span>Eff: {isWindActive ? '94%' : '0%'}</span>
              </div>
            </div>

            {/* 2. Solar PV Array */}
            <div className={`p-4 rounded-xl transition-all border ${
              isSolarActive
                ? 'bg-amber-950/30 border-amber-500/40 text-amber-200'
                : 'bg-polar-900/60 border-polar-800 text-slate-400'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Sun className={`w-5 h-5 ${isSolarActive ? 'text-amber-400 animate-pulse' : 'text-slate-400'}`} />
                  <span className="font-bold text-xs">SOLAR PV ARRAY</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isSolarActive ? 'bg-amber-900 text-amber-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isSolarActive ? 'ACTIVE' : 'DARK'}
                </span>
              </div>
              <div className="font-mono text-2xl font-extrabold text-white mb-1">
                {solarPowerkW} <span className="text-xs font-normal text-slate-400">kW</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono flex justify-between">
                <span>Cap: {station.maxSolarkW} kW</span>
                <span>Eff: {isSolarActive ? '96%' : '0%'}</span>
              </div>
            </div>

            {/* 3. BESS Battery Bank */}
            <div className={`p-4 rounded-xl transition-all border ${
              isBessCharging
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                : isBessDischarging
                ? 'bg-sky-950/30 border-polar-cyan/40 text-cyan-200'
                : 'bg-polar-900/60 border-polar-800 text-slate-400'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Battery className="w-5 h-5 text-polar-cyan" />
                  <span className="font-bold text-xs">BESS (500 kWh)</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isBessCharging
                    ? 'bg-emerald-900 text-emerald-300'
                    : isBessDischarging
                    ? 'bg-sky-900 text-cyan-300'
                    : 'bg-slate-800 text-slate-400'
                }`}>
                  {dispatchState.bessAction}
                </span>
              </div>
              <div className="font-mono text-2xl font-extrabold text-white mb-1 flex items-baseline justify-between">
                <span>{bessSocPercent}% <span className="text-xs font-normal text-slate-400">SoC</span></span>
                <span className="text-xs font-mono text-polar-cyan">{bessPerf.availableEnergykWh} kWh</span>
              </div>
              <div className="w-full bg-polar-950 h-2 rounded-full overflow-hidden p-0.5 border border-polar-cyan/20">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    bessSocPercent > 40 ? 'bg-polar-cyan' : bessSocPercent > 20 ? 'bg-amber-400' : 'bg-red-500'
                  }`}
                  style={{ width: `${bessSocPercent}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-400 font-mono mt-1 flex justify-between">
                <span>Cold Degr: -{bessPerf.degradationPercent}%</span>
                <span>Heat Load: {bessPerf.internalHeatingLoadkW} kW</span>
              </div>
            </div>

            {/* 4. Diesel Generator Set */}
            <div className={`p-4 rounded-xl transition-all border ${
              isDgActive
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-200 shadow-red-glow'
                : 'bg-polar-900/60 border-polar-800 text-slate-400'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Flame className={`w-5 h-5 ${isDgActive ? 'text-rose-500 animate-pulse' : 'text-slate-400'}`} />
                  <span className="font-bold text-xs">DIESEL GEN (2x 125kW)</span>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  isDgActive ? 'bg-rose-900 text-rose-300' : 'bg-slate-800 text-slate-400'
                }`}>
                  {isDgActive ? `${dispatchState.activeGenerators} RUNNING` : 'STANDBY'}
                </span>
              </div>
              <div className="font-mono text-2xl font-extrabold text-white mb-1">
                {dispatchState.dgOutputkW} <span className="text-xs font-normal text-slate-400">kW</span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono flex justify-between">
                <span>Rate: {dieselConsumption.litersPerHour} L/h</span>
                <span>SFC: {dieselConsumption.sfcLitersPerkWh} L/kWh</span>
              </div>
            </div>

          </div>

          {/* Animated Central Power Bus Line SVG */}
          <div className="relative py-4 my-2">
            <svg className="w-full h-16 overflow-visible">
              {/* Main horizontal bus line */}
              <line x1="10%" y1="32" x2="90%" y2="32" stroke="#1b3358" strokeWidth="8" strokeLinecap="round" />
              <line x1="10%" y1="32" x2="90%" y2="32" stroke="#00d4ff" strokeWidth="2" strokeDasharray="4 4" />

              {/* Vertical feed lines from sources */}
              {/* Wind */}
              <line x1="12.5%" y1="0" x2="12.5%" y2="32" stroke={isWindActive ? '#00ff88' : '#1b3358'} strokeWidth="3" className={isWindActive ? 'power-flow-line' : ''} />
              {/* Solar */}
              <line x1="37.5%" y1="0" x2="37.5%" y2="32" stroke={isSolarActive ? '#ffaa00' : '#1b3358'} strokeWidth="3" className={isSolarActive ? 'power-flow-line' : ''} />
              {/* BESS */}
              <line x1="62.5%" y1="0" x2="62.5%" y2="32" stroke={isBessDischarging || isBessCharging ? '#00d4ff' : '#1b3358'} strokeWidth="3" className={isBessCharging ? 'power-flow-line-reverse' : isBessDischarging ? 'power-flow-line' : ''} />
              {/* DG */}
              <line x1="87.5%" y1="0" x2="87.5%" y2="32" stroke={isDgActive ? '#ff4444' : '#1b3358'} strokeWidth="3" className={isDgActive ? 'power-flow-line' : ''} />

              {/* Output feed to load bus */}
              <line x1="50%" y1="32" x2="50%" y2="70" stroke="#00d4ff" strokeWidth="4" className="power-flow-line" />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-polar-950 px-4 py-1 rounded-full border border-polar-cyan/40 text-[11px] font-mono font-bold text-polar-cyan shadow-polar-glow">
              SYNCHRONOUS CENTRAL BUS (TOTAL INFLOW: {(windPowerkW + solarPowerkW + dispatchState.dgOutputkW + (isBessDischarging ? dispatchState.bessFlowkW : 0)).toFixed(1)} kW)
            </div>
          </div>

          {/* Bottom Station Load Destination Box */}
          <div className="p-4 rounded-xl bg-polar-900/90 border border-polar-cyan/30 flex flex-col md:flex-row items-center justify-between gap-4 mt-2">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-polar-800 text-polar-cyan border border-polar-cyan/30">
                <Zap className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">TOTAL STATION DEMAND LOAD</h3>
                <p className="text-xs text-slate-400 font-mono">
                  Maitri / Bharati Primary Habitat & Research Load Bus
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 font-mono">
              <div className="text-right">
                <div className="text-2xl font-extrabold text-white">
                  {stationLoad.totalLoadkW} <span className="text-xs font-normal text-slate-400">kW</span>
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1">
                  <span>▲ +1.4% vs last hr</span>
                </div>
              </div>

              <div className="h-8 w-px bg-polar-800" />

              <div className="flex items-center gap-2">
                <div className="text-center px-3 py-1 rounded bg-polar-950 border border-emerald-500/30 text-emerald-300 text-xs">
                  <span className="block text-[10px] text-slate-400">Life Support</span>
                  <span className="font-bold">{stationLoad.categories.lifeSupportHeating} kW</span>
                </div>
                <div className="text-center px-3 py-1 rounded bg-polar-950 border border-polar-cyan/30 text-polar-cyan text-xs">
                  <span className="block text-[10px] text-slate-400">Labs & Comms</span>
                  <span className="font-bold">{(stationLoad.categories.researchEquipment + stationLoad.categories.communication).toFixed(1)} kW</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
