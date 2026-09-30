import React from 'react';
import { Play, X, Zap, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';

export default function JudgeModeModal({
  isJudgeModeActive,
  judgeStep,
  judgeProgress,
  stopJudgeMode,
  dispatchState
}) {
  if (!isJudgeModeActive) return null;

  const stepsInfo = [
    {
      step: 1,
      title: 'PHASE 1: 🟢 MODE 1 - GREEN MAX',
      time: '0s - 15s',
      weather: 'Summer Day: -18°C, Wind 45 km/h, Solar 720 W/m²',
      desc: 'Solar & Wind turbine output exceed station load (135 kW). Diesel Generators are 100% OFF. Excess renewable energy charges BESS at 45 kW rate.',
      metrics: 'Diesel: 0 L/h • Clean Energy: 100% • DG Set: OFF'
    },
    {
      step: 2,
      title: 'PHASE 2: 🟡 MODE 2 - BUFFER MODE',
      time: '15s - 30s',
      weather: 'Equinox Dusk: -28°C, Wind 18 km/h, Solar 40 W/m²',
      desc: 'Sun sets and wind calm. Renewables fall below load. AI Dispatcher activates BESS discharge to buffer deficit. DG kept on pre-warm standby without firing.',
      metrics: 'Diesel: 0 L/h • BESS Discharge: 75 kW • DG Set: STANDBY'
    },
    {
      step: 3,
      title: 'PHASE 3: 🟠 MODE 3 - DIESEL ASSIST',
      time: '30s - 45s',
      weather: 'Polar Night Cold Wave: -44°C, Wind 12 km/h, Solar 0 W/m²',
      desc: 'Heating demand surges due to -44°C temperatures. BESS SoC drops to 24%. AI auto-starts DG Set #1 to supply deficit while maintaining 20% critical battery reserve.',
      metrics: 'Diesel: 28.5 L/h • DG #1: ACTIVE (95 kW) • Reserve SoC: 24%'
    },
    {
      step: 4,
      title: 'PHASE 4: 🔴 MODE 4 - EMERGENCY LOAD SHEDDING',
      time: '45s - 60s',
      weather: 'Extreme Blizzard: -52°C, Wind 108 km/h (Cut-out active)',
      desc: 'Wind speed exceeds 90 km/h cut-out limit — turbines lock for structural safety! AI Smart Load Shedding sheds non-essential loads. Life Support & Satellite Comms remain 100% operational.',
      metrics: 'Blizzard Active • Non-Essential Load: SHED • Life Support: 100% PROTECTED'
    }
  ];

  const currentInfo = stepsInfo.find(s => s.step === judgeStep) || stepsInfo[0];

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-xl w-full p-4 rounded-2xl glass-panel border-2 border-purple-500/60 shadow-2xl shadow-purple-950/80 animate-bounce-short">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-purple-500/30">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
          </span>
          <h3 className="font-extrabold text-sm text-purple-200 tracking-wide flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-purple-400" />
            SIH 2026 JUDGE DEMO MODE (60s ACCELERATED RUN)
          </h3>
        </div>
        <button
          onClick={stopJudgeMode}
          className="p-1 rounded-lg hover:bg-purple-900/50 text-slate-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-3">
        <div className="flex justify-between text-xs font-mono text-purple-300 mb-1">
          <span>{currentInfo.title}</span>
          <span>{Math.round(judgeProgress)}%</span>
        </div>
        <div className="w-full h-2.5 bg-polar-900 rounded-full overflow-hidden p-0.5 border border-purple-500/30">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-polar-cyan rounded-full transition-all duration-300 shadow-polar-glow"
            style={{ width: `${judgeProgress}%` }}
          />
        </div>
      </div>

      {/* Step Indicators */}
      <div className="grid grid-cols-4 gap-1.5 mb-3">
        {stepsInfo.map(s => (
          <div
            key={s.step}
            className={`px-2 py-1.5 rounded-lg text-[11px] font-bold text-center transition-all ${
              judgeStep === s.step
                ? 'bg-purple-600 text-white shadow-purple-500/50 ring-2 ring-purple-400'
                : judgeStep > s.step
                ? 'bg-purple-950/60 text-purple-300 border border-purple-800/40'
                : 'bg-polar-900/60 text-slate-500 border border-polar-800/20'
            }`}
          >
            P{s.step} {s.step === 1 ? 'Green' : s.step === 2 ? 'Buffer' : s.step === 3 ? 'Diesel' : 'Shed'}
          </div>
        ))}
      </div>

      {/* Live Description Card */}
      <div className="p-3 rounded-xl bg-polar-950/80 border border-purple-500/20 text-xs">
        <div className="text-polar-cyan font-mono font-semibold mb-1 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" />
          <span>{currentInfo.weather}</span>
        </div>
        <p className="text-slate-300 leading-relaxed mb-2">
          {currentInfo.desc}
        </p>
        <div className="p-2 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-200 font-mono font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-purple-400 shrink-0" />
          <span>{currentInfo.metrics}</span>
        </div>
      </div>
    </div>
  );
}
