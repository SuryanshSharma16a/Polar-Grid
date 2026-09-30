import React from 'react';
import { 
  Zap, 
  Wind, 
  Sun, 
  Battery, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Radio, 
  Play, 
  ArrowRight, 
  Globe, 
  Award,
  Layers,
  Sparkles
} from 'lucide-react';

export default function LandingPage({ setActiveTab, startJudgeMode }) {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 overflow-hidden rounded-3xl aurora-bg border border-polar-cyan/20 p-8 my-4 shadow-2xl">
        
        {/* Background Decorative Aurora Light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-polar-aurora/15 via-polar-cyan/10 to-transparent blur-3xl pointer-events-none" />

        {/* SIH Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-polar-900/90 border border-polar-cyan/30 text-polar-cyan text-xs font-mono mb-4 shadow-polar-glow">
          <Award className="w-4 h-4 text-polar-aurora" />
          <span>SMART INDIA HACKATHON 2025 • PROBLEM STATEMENT SIH26061</span>
        </div>

        {/* Official PolarGrid Logo */}
        <div className="mb-4 flex items-center justify-center">
          <img
            src="/logo.png"
            alt="PolarGrid Logo"
            className="w-28 h-28 sm:w-36 sm:h-36 object-contain drop-shadow-[0_0_25px_rgba(0,212,255,0.4)] animate-float"
          />
        </div>

        {/* Main Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl leading-tight mb-4">
          AI-Powered Energy Intelligence for <span className="text-transparent bg-clip-text bg-gradient-to-r from-polar-cyan via-polar-ice to-polar-aurora">Earth’s Last Frontier</span>
        </h1>

        <p className="text-slate-300 text-base sm:text-xl max-w-3xl leading-relaxed mb-8">
          Autonomous microgrid optimization and AI forecasting for India’s Antarctic research stations — <span className="text-polar-cyan font-semibold">Maitri</span> and <span className="text-polar-cyan font-semibold">Bharati</span>. Minimizing diesel logistics in extreme polar conditions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 z-10">
          <button
            onClick={() => setActiveTab('dashboard')}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-polar-cyan via-sky-500 to-emerald-400 text-polar-950 font-extrabold text-base tracking-wide flex items-center justify-center gap-2 shadow-polar-glow hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>LAUNCH DIGITAL TWIN DASHBOARD</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={startJudgeMode}
            className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-purple-950/80 border border-purple-500/50 text-purple-200 font-bold text-base flex items-center justify-center gap-2 hover:bg-purple-900 transition-all shadow-purple-950/50"
          >
            <Play className="w-5 h-5 text-purple-400 fill-current" />
            <span>RUN 60-SEC JUDGE DEMO</span>
          </button>
        </div>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-5xl">
          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-polar-aurora font-mono">Up to 40%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Diesel Logistics Reduction</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-polar-cyan font-mono">24/7 Auto</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Sub-second SCADA Dispatch</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">98.4% R²</div>
            <div className="text-xs text-slate-400 font-medium mt-1">XGBoost Load Forecast Acc.</div>
          </div>
          <div className="p-4 rounded-2xl glass-panel text-center">
            <div className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-mono">100%</div>
            <div className="text-xs text-slate-400 font-medium mt-1">Life Support Security</div>
          </div>
        </div>

      </section>

      {/* About The Problem Section */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wide">
            THE POLAR ENERGY CHALLENGE IN ANTARCTICA
          </h2>
          <p className="text-slate-400 text-sm mt-2">
            Why energy management at Maitri and Bharati requires specialized AI intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl glass-panel border border-polar-cyan/20">
            <div className="w-12 h-12 rounded-xl bg-polar-900 border border-polar-cyan/30 flex items-center justify-center text-polar-cyan mb-4">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Extreme Logistics Cost</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Fuel delivered to Antarctica costs ~₹300 - ₹350 per Liter due to specialized icebreaker polar vessels and helicopter airlifts. Every liter saved directly preserves mission budget and safety.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-polar-cyan/20">
            <div className="w-12 h-12 rounded-xl bg-polar-900 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-4">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Blizzards & 24h Darkness</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Antarctic winters bring 65 consecutive days of 24-hour polar darkness (zero solar output) and hurricane-force blizzards (&gt;120 km/h) causing turbine cut-outs and battery degradation at -55°C.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-polar-cyan/20">
            <div className="w-12 h-12 rounded-xl bg-polar-900 border border-polar-aurora/30 flex items-center justify-center text-polar-aurora mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Zero-Failure Life Support</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Power failure in Antarctica is life-threatening. PolarGrid uses autonomous state machine dispatch to guarantee 100% uninterrupted power to station HVAC heating and satellite telemetry.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Feature Architecture Grid */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-8 rounded-3xl glass-panel border border-polar-cyan/25">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-3 py-1 rounded-full bg-polar-cyan/10 border border-polar-cyan/30 text-polar-cyan text-xs font-mono font-bold">
              POLARGRID ARCHITECTURE
            </span>
            <h3 className="text-2xl font-extrabold text-white mt-3">6 Core AI & Engineering Modules</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div onClick={() => setActiveTab('forecasting')} className="p-5 rounded-xl bg-polar-900/80 border border-polar-800 hover:border-polar-cyan/40 cursor-pointer transition-all">
              <Cpu className="w-6 h-6 text-polar-cyan mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">1. Hybrid Load Forecasting</h4>
              <p className="text-xs text-slate-400">XGBoost model predicting 72h load demand using temp, crew count, & experiment schedules.</p>
            </div>

            <div onClick={() => setActiveTab('forecasting')} className="p-5 rounded-xl bg-polar-900/80 border border-polar-800 hover:border-polar-cyan/40 cursor-pointer transition-all">
              <Sun className="w-6 h-6 text-amber-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">2. LSTM Renewable Forecast</h4>
              <p className="text-xs text-slate-400">Spatial-temporal LSTM weather model predicting solar & wind power plus blizzard warnings.</p>
            </div>

            <div onClick={() => setActiveTab('dispatcher')} className="p-5 rounded-xl bg-polar-900/80 border border-polar-800 hover:border-polar-cyan/40 cursor-pointer transition-all">
              <Zap className="w-6 h-6 text-polar-aurora mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">3. Autonomous Dispatcher</h4>
              <p className="text-xs text-slate-400">4-State Machine decision engine routing power between Wind, Solar, BESS, and DG sets.</p>
            </div>

            <div onClick={() => setActiveTab('roi')} className="p-5 rounded-xl bg-polar-900/80 border border-polar-800 hover:border-polar-cyan/40 cursor-pointer transition-all">
              <TrendingUp className="w-6 h-6 text-emerald-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">4. ROI & Carbon Tracker</h4>
              <p className="text-xs text-slate-400">Real-time counter for liters saved, CO2 avoided, and Antarctic Treaty environmental reporting.</p>
            </div>

            <div onClick={() => setActiveTab('maintenance')} className="p-5 rounded-xl bg-polar-900/80 border border-polar-800 hover:border-polar-cyan/40 cursor-pointer transition-all">
              <ShieldCheck className="w-6 h-6 text-purple-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">5. Predictive Maintenance</h4>
              <p className="text-xs text-slate-400">Equipment health diagnostics detecting cell voltage drops and turbine bearing vibration.</p>
            </div>

            <div onClick={() => setActiveTab('comms')} className="p-5 rounded-xl bg-polar-900/80 border border-polar-800 hover:border-polar-cyan/40 cursor-pointer transition-all">
              <Radio className="w-6 h-6 text-sky-400 mb-3" />
              <h4 className="font-bold text-sm text-white mb-1">6. Edge Offline Computing</h4>
              <p className="text-xs text-slate-400">30-day offline SQLite vault syncing over INSAT satellite link to NCPOR Goa HQ.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team DRISHTI Section */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-6 rounded-2xl bg-polar-900/90 border border-polar-cyan/20">
          <div className="flex items-center justify-center gap-2 text-polar-cyan font-mono text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>DEVELOPED FOR SMART INDIA HACKATHON 2025</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">SUBMITTED BY TEAM DRISHTI</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xl mx-auto">
            Nodal Agency: Ministry of Earth Sciences (MoES) • Station Targets: Maitri & Bharati Antarctic Research Bases
          </p>
        </div>
      </section>

    </div>
  );
}
