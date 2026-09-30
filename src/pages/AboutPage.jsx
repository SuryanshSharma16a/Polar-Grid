import React from 'react';
import { Cpu, Zap, Layers, Award, ShieldCheck, Activity, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="space-y-8 pb-16 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-polar-cyan/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-polar-cyan" />
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              SYSTEM ARCHITECTURE & METHODOLOGY
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Technical blueprint of PolarGrid for Smart India Hackathon 2025 (SIH26061) • MoES
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-polar-900 border border-polar-cyan/30 text-xs font-mono text-polar-cyan font-bold">
          TEAM DRISHTI • SIH2025
        </div>
      </div>

      {/* HOW IT WORKS DIAGRAM */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Layers className="w-5 h-5 text-polar-cyan" />
          5-STAGE AUTONOMOUS SCADA PIPELINE
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center font-mono text-xs">
          
          <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-cyan/30 flex flex-col items-center justify-center">
            <span className="font-extrabold text-polar-cyan text-sm mb-1">STAGE 1</span>
            <span className="text-white font-bold mb-1">Sensors & Telemetry</span>
            <span className="text-[10px] text-slate-400">AWS Temp, Wind, Solar Flux, Cell Voltages</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-polar-cyan">
            <ArrowRight className="w-5 h-5" />
          </div>

          <div className="p-4 rounded-xl bg-polar-950/80 border border-purple-500/30 flex flex-col items-center justify-center">
            <span className="font-extrabold text-purple-400 text-sm mb-1">STAGE 2</span>
            <span className="text-white font-bold mb-1">AI Models</span>
            <span className="text-[10px] text-slate-400">XGBoost (Load) + LSTM (Renewables)</span>
          </div>

          <div className="hidden md:flex items-center justify-center text-polar-cyan">
            <ArrowRight className="w-5 h-5" />
          </div>

          <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-aurora/30 flex flex-col items-center justify-center">
            <span className="font-extrabold text-polar-aurora text-sm mb-1">STAGE 3</span>
            <span className="text-white font-bold mb-1">FSM Dispatcher</span>
            <span className="text-[10px] text-slate-400">4-State Machine Mode Engine</span>
          </div>

        </div>
      </div>

      {/* AI MODEL SPECIFICATIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Model 1: XGBoost */}
        <div className="p-6 rounded-2xl glass-panel border border-polar-cyan/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-polar-cyan font-mono">MODEL 1: HYBRID XGBOOST</span>
            <span className="text-xs font-mono font-bold text-emerald-400">R² = 0.984</span>
          </div>
          <h3 className="font-bold text-lg text-white">Station Load Forecasting Model</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Gradient boosted decision tree algorithm trained on historical SCADA logs from Maitri & Bharati (2018-2024). Predicts 72-hour heating load spikes driven by sub-zero wind chill and crew laboratory usage.
          </p>
          <div className="p-3 rounded-xl bg-polar-950/80 border border-polar-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div>• Features: Temp Delta, Wind Velocity, Occupancy Count, Time-of-Day</div>
            <div>• Hyperparameters: n_estimators=500, max_depth=6, learning_rate=0.03</div>
          </div>
        </div>

        {/* Model 2: LSTM */}
        <div className="p-6 rounded-2xl glass-panel border border-polar-aurora/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-extrabold text-sm text-polar-aurora font-mono">MODEL 2: SPATIAL-TEMPORAL LSTM</span>
            <span className="text-xs font-mono font-bold text-emerald-400">R² = 0.971</span>
          </div>
          <h3 className="font-bold text-lg text-white">Renewable & Weather Generation Forecast</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Recurrent Neural Network with 2 LSTM layers (128 units) capturing diurnal solar radiation curves and atmospheric pressure gradients to predict wind turbine cut-out events up to 12 hours before blizzards strike.
          </p>
          <div className="p-3 rounded-xl bg-polar-950/80 border border-polar-800 text-[11px] font-mono text-slate-400 space-y-1">
            <div>• Features: Barometric Pressure, Wind Speed, GHI Solar Flux, Jet Stream</div>
            <div>• Output: 72h Wind kW + Solar kW forecast with Blizzard Cut-out Flags</div>
          </div>
        </div>

      </div>

    </div>
  );
}
