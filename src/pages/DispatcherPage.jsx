import React from 'react';
import { MODES } from '../utils/dispatchOptimizer';
import { Activity, ShieldCheck, Flame, Zap, CheckCircle2, Lock, Radio, Lightbulb, Coffee, RefreshCw } from 'lucide-react';

export default function DispatcherPage({ simProps }) {
  const {
    dispatchState,
    manualOverrideMode,
    setManualOverrideMode,
    shedOverrides,
    setShedOverrides,
    stationLoad,
    bessSocPercent,
    windPowerkW,
    solarPowerkW,
    isBlizzardAlert
  } = simProps;

  const currentMode = dispatchState.mode;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-polar-cyan/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-6 h-6 text-polar-cyan" />
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              AUTONOMOUS MULTI-SOURCE ENERGY DISPATCH ENGINE
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Finite State Machine (FSM) microgrid controller & smart load shedding priority queue
          </p>
        </div>

        {/* Manual Override Reset Button */}
        {manualOverrideMode && (
          <button
            onClick={() => setManualOverrideMode(null)}
            className="px-3.5 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-300 text-xs font-mono font-bold flex items-center gap-1.5 animate-pulse"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESET TO AUTOMATIC AI DISPATCH</span>
          </button>
        )}
      </div>

      {/* 4A. VISUAL STATE MACHINE GRID */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
          <span>MICROGRID DISPATCH STATE MACHINE (SELECT MODE TO MANUALLY TEST OVERRIDE)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.keys(MODES).map((modeKey) => {
            const m = MODES[modeKey];
            const isCurrentActive = currentMode.id === m.id;
            
            return (
              <div
                key={modeKey}
                onClick={() => setManualOverrideMode(isCurrentActive ? null : modeKey)}
                className={`p-5 rounded-2xl transition-all cursor-pointer border flex flex-col justify-between relative overflow-hidden ${
                  isCurrentActive
                    ? `${m.bgClass} shadow-2xl ring-2 ring-current scale-105 z-10`
                    : 'bg-polar-900/60 border-polar-800 text-slate-400 hover:border-polar-cyan/40 hover:bg-polar-900'
                }`}
              >
                {isCurrentActive && (
                  <div className="absolute top-0 right-0 bg-current text-polar-950 font-bold font-mono text-[9px] px-2 py-0.5 rounded-bl">
                    ACTIVE NOW
                  </div>
                )}

                <div>
                  <div className="font-extrabold text-sm mb-1">{m.badge}</div>
                  <div className="text-xs font-bold text-white mb-2">{m.tagline}</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed mb-4">
                    {m.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-current/20 text-[10px] font-mono flex items-center justify-between">
                  <span>{m.id === 1 ? 'DG: 0kW' : m.id === 2 ? 'BESS: Discharging' : m.id === 3 ? 'DG: Active' : 'Shedding Active'}</span>
                  <span className="underline font-bold">{isCurrentActive ? 'Override Active' : 'Click to Force'}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DECISION TREE REASONING BREAKDOWN */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-4">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-polar-cyan" />
          AI DISPATCH DECISION LOGIC TREE (EXPLANATION & PROOF)
        </h3>

        <div className="space-y-2 font-mono text-xs">
          <div className="p-3 rounded-xl bg-polar-950/80 border border-polar-800 flex items-center justify-between">
            <span className="text-slate-400">Total Station Load Demand:</span>
            <span className="text-white font-bold">{stationLoad.totalLoadkW} kW</span>
          </div>

          <div className="p-3 rounded-xl bg-polar-950/80 border border-polar-800 flex items-center justify-between">
            <span className="text-slate-400">Total Available Renewable Power (Wind + Solar):</span>
            <span className="text-polar-aurora font-bold">{(windPowerkW + solarPowerkW).toFixed(1)} kW</span>
          </div>

          <div className="p-3 rounded-xl bg-polar-950/80 border border-polar-800 flex items-center justify-between">
            <span className="text-slate-400">BESS Battery State of Charge (SoC):</span>
            <span className="text-polar-cyan font-bold">{bessSocPercent}% (Min Reserve: 20%)</span>
          </div>

          <div className="p-3.5 rounded-xl bg-polar-900 border border-polar-cyan/40 text-polar-cyan font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-polar-aurora shrink-0" />
            <span>
              EVALUATION RESULT: {dispatchState.decisionRules[0]?.text} → TRANSITIONED TO {currentMode.name}
            </span>
          </div>
        </div>
      </div>

      {/* 4B. SMART LOAD SHEDDING PRIORITY CONTROLLER */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-polar-aurora" />
              SMART LOAD SHEDDING PRIORITY QUEUE CONTROLLER
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Station Commander override panel & automated non-critical load shedding logic
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-polar-900 border border-polar-cyan/30 text-xs font-mono text-polar-cyan font-bold">
            COMMANDER OVERRIDE: {manualOverrideMode ? 'MANUAL' : 'AUTONOMOUS AI'}
          </div>
        </div>

        <div className="space-y-3">
          
          {/* Priority 1: Life Support */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-900 text-emerald-300 font-extrabold font-mono">
                P1
              </div>
              <div>
                <span className="font-bold text-white text-sm block flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  Life Support Heating & HVAC ({stationLoad.categories.lifeSupportHeating} kW)
                </span>
                <span className="text-[11px] text-slate-300">Space heating, oxygenators, water pipes thermal trace.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <span className="px-2.5 py-1 rounded bg-emerald-900 text-emerald-300 font-bold border border-emerald-500/40 flex items-center gap-1">
                <Lock className="w-3 h-3" /> LOCKED (100% PROTECTED)
              </span>
            </div>
          </div>

          {/* Priority 2: Satellite Comms */}
          <div className="p-4 rounded-xl bg-sky-950/30 border border-polar-cyan/40 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-sky-900 text-cyan-300 font-extrabold font-mono">
                P2
              </div>
              <div>
                <span className="font-bold text-white text-sm block flex items-center gap-1.5">
                  <Radio className="w-4 h-4 text-polar-cyan" />
                  Satellite & Radio Communications ({stationLoad.categories.communication} kW)
                </span>
                <span className="text-[11px] text-slate-300">INSAT-4CR downlink, distress beacon, weather telemetry.</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono">
              <span className="px-2.5 py-1 rounded bg-sky-900 text-cyan-300 font-bold border border-polar-cyan/40 flex items-center gap-1">
                <Lock className="w-3 h-3" /> LOCKED (100% PROTECTED)
              </span>
            </div>
          </div>

          {/* Priority 3: Lab Research Equipment */}
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs transition-all ${
            shedOverrides.research
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
              : 'bg-polar-900/80 border-polar-800 text-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-polar-800 text-slate-300 font-extrabold font-mono">
                P3
              </div>
              <div>
                <span className="font-bold text-white text-sm block">
                  Research Equipment & Experiments ({stationLoad.categories.researchEquipment} kW)
                </span>
                <span className="text-[11px] text-slate-400">Ionosphere radar, ice core freezers, seismographs.</span>
              </div>
            </div>

            <button
              onClick={() => setShedOverrides(prev => ({ ...prev, research: !prev.research }))}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                shedOverrides.research
                  ? 'bg-rose-900 text-rose-200 border border-rose-400'
                  : 'bg-polar-800 text-polar-cyan border border-polar-cyan/30 hover:bg-polar-700'
              }`}
            >
              {shedOverrides.research ? 'PAUSED / SHED' : 'ACTIVE (CLICK TO PAUSE)'}
            </button>
          </div>

          {/* Priority 4: Habitat Lighting */}
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs transition-all ${
            (currentMode.id === 4 || shedOverrides.lighting)
              ? 'bg-amber-950/40 border-amber-500/50 text-amber-300'
              : 'bg-polar-900/80 border-polar-800 text-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-polar-800 text-slate-300 font-extrabold font-mono">
                P4
              </div>
              <div>
                <span className="font-bold text-white text-sm block flex items-center gap-1">
                  <Lightbulb className="w-4 h-4 text-amber-400" />
                  Habitat General Lighting ({stationLoad.categories.lighting} kW)
                </span>
                <span className="text-[11px] text-slate-400">Dimmed to 50% in Emergency Mode to preserve fuel.</span>
              </div>
            </div>

            <button
              onClick={() => setShedOverrides(prev => ({ ...prev, lighting: !prev.lighting }))}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                (currentMode.id === 4 || shedOverrides.lighting)
                  ? 'bg-amber-900 text-amber-200 border border-amber-400'
                  : 'bg-polar-800 text-amber-400 border border-amber-500/30 hover:bg-polar-700'
              }`}
            >
              {(currentMode.id === 4 || shedOverrides.lighting) ? 'DIMMED (-50%)' : 'NORMAL (100%)'}
            </button>
          </div>

          {/* Priority 5: Non-essential Hot Water / Sauna */}
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs transition-all ${
            (currentMode.id === 4 || shedOverrides.nonEssential)
              ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
              : 'bg-polar-900/80 border-polar-800 text-slate-200'
          }`}>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-polar-800 text-slate-300 font-extrabold font-mono">
                P5
              </div>
              <div>
                <span className="font-bold text-white text-sm block flex items-center gap-1">
                  <Coffee className="w-4 h-4 text-rose-400" />
                  Non-essential Hot Water & Sauna ({stationLoad.categories.nonEssential} kW)
                </span>
                <span className="text-[11px] text-slate-400">First load automatically shed when DG assist or deficit active.</span>
              </div>
            </div>

            <button
              onClick={() => setShedOverrides(prev => ({ ...prev, nonEssential: !prev.nonEssential }))}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all ${
                (currentMode.id === 4 || shedOverrides.nonEssential)
                  ? 'bg-rose-900 text-rose-200 border border-rose-400'
                  : 'bg-polar-800 text-rose-400 border border-rose-500/30 hover:bg-polar-700'
              }`}
            >
              {(currentMode.id === 4 || shedOverrides.nonEssential) ? 'AUTOMATICALLY SHED (0 kW)' : 'ACTIVE'}
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
