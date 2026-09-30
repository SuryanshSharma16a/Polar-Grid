import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Wind, 
  Sun, 
  Battery, 
  Radio, 
  Cpu, 
  Activity, 
  Sliders, 
  TrendingUp, 
  ShieldAlert, 
  History, 
  Settings, 
  HelpCircle, 
  Play, 
  CheckCircle2,
  Globe
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  stationId, 
  setStationId, 
  dispatchState, 
  startJudgeMode, 
  isJudgeModeActive,
  isBlizzardAlert
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Digital Twin', icon: Zap },
    { id: 'forecasting', label: 'AI Forecast', icon: Cpu },
    { id: 'dispatcher', label: 'Dispatch Engine', icon: Activity },
    { id: 'roi', label: 'Fuel & ROI', icon: TrendingUp },
    { id: 'maintenance', label: 'Maintenance', icon: ShieldAlert },
    { id: 'comms', label: 'Edge & Comms', icon: Radio },
    { id: 'analytics', label: 'Analytics', icon: History },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'Architecture', icon: HelpCircle },
  ];

  return (
    <header className="sticky top-0 z-40 bg-polar-950/90 backdrop-blur-md border-b border-polar-cyan/20 px-4 py-2.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Brand & MoES SIH Badge */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-polar-cyan via-polar-700 to-polar-aurora p-0.5 shadow-polar-glow">
              <div className="w-full h-full bg-polar-950 rounded-[10px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-polar-cyan animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-polar-ice to-polar-cyan">
                  POLAR<span className="text-polar-cyan">GRID</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold bg-polar-cyan/15 text-polar-cyan border border-polar-cyan/30 rounded">
                  SIH26061
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-tight">
                MoES • Ministry of Earth Sciences • Team DRISHTI
              </p>
            </div>
          </div>

          {/* Station Switcher Dropdown */}
          <div className="flex items-center gap-2 bg-polar-900/80 border border-polar-cyan/20 rounded-lg px-2.5 py-1 text-xs">
            <Globe className="w-3.5 h-3.5 text-polar-cyan" />
            <select
              value={stationId}
              onChange={(e) => setStationId(e.target.value)}
              className="bg-transparent text-slate-200 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="bharati" className="bg-polar-900 text-slate-200">BHARATI STATION (70°S)</option>
              <option value="maitri" className="bg-polar-900 text-slate-200">MAITRI STATION (70°S)</option>
            </select>
          </div>
        </div>

        {/* Live Operating Status & Judge Demo Button */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Dispatch Mode Pill */}
          <div className={`px-3 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${dispatchState.mode.bgClass} shadow-md`}>
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            <span>{dispatchState.mode.badge}</span>
          </div>

          {/* Blizzard Warning Tag */}
          {isBlizzardAlert && (
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-950/80 border border-red-500/50 text-red-400 text-xs font-mono animate-pulse">
              <Wind className="w-3.5 h-3.5" />
              <span>BLIZZARD CUTOUT</span>
            </div>
          )}

          {/* JUDGE MODE ACCELERATED DEMO BUTTON */}
          <button
            onClick={startJudgeMode}
            disabled={isJudgeModeActive}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold text-xs tracking-wide transition-all shadow-lg ${
              isJudgeModeActive
                ? 'bg-purple-950/80 text-purple-300 border border-purple-500/50 animate-pulse'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-polar-cyan text-white hover:opacity-90 hover:scale-105 active:scale-95 shadow-purple-500/25'
            }`}
            title="Run 60-Second Accelerated Interactive Demo showcasing all 4 AI Dispatch Modes"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isJudgeModeActive ? 'DEMO RUNNING...' : '⚡ JUDGE DEMO MODE'}</span>
          </button>

          {/* Time & Connectivity */}
          <div className="hidden sm:flex flex-col text-right font-mono text-[11px] text-slate-400">
            <span className="text-slate-200 font-semibold">
              {currentTime.toLocaleTimeString('en-US', { hour12: false })} UTC
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 justify-end">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> INSAT-4CR Live
            </span>
          </div>
        </div>

      </div>

      {/* Navigation Sub-bar */}
      <nav className="max-w-7xl mx-auto mt-2 pt-2 border-t border-polar-cyan/10 flex items-center justify-between overflow-x-auto no-scrollbar gap-1">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab('landing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'landing'
                ? 'bg-polar-cyan/20 text-polar-cyan border border-polar-cyan/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-polar-800/50'
            }`}
          >
            <span>Home</span>
          </button>
          
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-polar-cyan/20 text-polar-cyan border border-polar-cyan/40 font-semibold shadow-polar-glow'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-polar-800/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-polar-cyan' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
