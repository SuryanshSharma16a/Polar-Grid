import React from 'react';
import { Thermometer, Wind, Sun, Calendar, Sparkles, AlertTriangle } from 'lucide-react';

export default function EnvironmentalSliders({
  tempC,
  setTempC,
  windSpeedKmH,
  setWindSpeedKmH,
  solarWM2,
  setSolarWM2,
  season,
  setSeason,
  setPreset,
  isBlizzardAlert
}) {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-polar-cyan/20 shadow-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 mb-4 border-b border-polar-cyan/15 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-polar-900 text-polar-cyan border border-polar-cyan/30">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">ENVIRONMENTAL CONDITION SIMULATOR</h3>
            <p className="text-xs text-slate-400">Interactive Antarctic parameters (Judges can manually adjust values)</p>
          </div>
        </div>

        {/* Quick Scenario Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setPreset('summer_day')}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-amber-950/40 text-amber-300 border border-amber-500/30 hover:bg-amber-900/60 transition-all"
          >
            ☀️ Peak Summer
          </button>
          <button
            onClick={() => setPreset('winter_night')}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-sky-950/40 text-cyan-300 border border-polar-cyan/30 hover:bg-sky-900/60 transition-all"
          >
            ❄️ Winter Night
          </button>
          <button
            onClick={() => setPreset('blizzard')}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-rose-950/40 text-rose-300 border border-rose-500/30 hover:bg-rose-900/60 transition-all animate-pulse"
          >
            🌪️ Blizzard (105km/h)
          </button>
          <button
            onClick={() => setPreset('extreme_cold')}
            className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-indigo-950/40 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-900/60 transition-all"
          >
            🥶 Extreme -55°C
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        
        {/* Slider 1: Temperature */}
        <div className="p-3.5 rounded-xl bg-polar-900/70 border border-polar-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Thermometer className="w-4 h-4 text-cyan-400" />
              TEMPERATURE
            </span>
            <span className={`font-mono text-sm font-extrabold ${tempC < -45 ? 'text-rose-400' : 'text-polar-cyan'}`}>
              {tempC}°C
            </span>
          </div>

          <input
            type="range"
            min="-55"
            max="-10"
            step="1"
            value={tempC}
            onChange={(e) => setTempC(Number(e.target.value))}
            className="w-full accent-polar-cyan cursor-pointer h-2 bg-polar-950 rounded-lg"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
            <span>-55°C (Extreme)</span>
            <span>-30°C</span>
            <span>-10°C (Warm)</span>
          </div>
        </div>

        {/* Slider 2: Wind Speed */}
        <div className="p-3.5 rounded-xl bg-polar-900/70 border border-polar-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Wind className={`w-4 h-4 ${isBlizzardAlert ? 'text-rose-400 animate-spin' : 'text-polar-aurora'}`} />
              WIND SPEED
            </span>
            <span className={`font-mono text-sm font-extrabold ${isBlizzardAlert ? 'text-rose-400 animate-pulse' : 'text-polar-aurora'}`}>
              {windSpeedKmH} <span className="text-[10px] text-slate-400">km/h</span>
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="120"
            step="1"
            value={windSpeedKmH}
            onChange={(e) => setWindSpeedKmH(Number(e.target.value))}
            className="w-full accent-polar-aurora cursor-pointer h-2 bg-polar-950 rounded-lg"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
            <span>0 (Calm)</span>
            <span>45 (Rated)</span>
            <span className="text-rose-400 font-bold">&gt;90 (Cutout)</span>
          </div>
        </div>

        {/* Slider 3: Solar Irradiance */}
        <div className="p-3.5 rounded-xl bg-polar-900/70 border border-polar-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Sun className={`w-4 h-4 ${season === 'night' ? 'text-slate-500' : 'text-amber-400'}`} />
              SOLAR FLUX
            </span>
            <span className="font-mono text-sm font-extrabold text-amber-400">
              {season === 'night' ? 0 : solarWM2} <span className="text-[10px] text-slate-400">W/m²</span>
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="800"
            step="10"
            disabled={season === 'night'}
            value={season === 'night' ? 0 : solarWM2}
            onChange={(e) => setSolarWM2(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-2 bg-polar-950 rounded-lg disabled:opacity-30"
          />

          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
            <span>0 W/m²</span>
            <span>400 W/m²</span>
            <span>800 W/m² (Peak)</span>
          </div>
        </div>

        {/* Season Selector */}
        <div className="p-3.5 rounded-xl bg-polar-900/70 border border-polar-800 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-purple-400" />
              POLAR SEASON
            </span>
            <span className="font-mono text-[11px] font-bold text-purple-300 uppercase">
              {season}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => setSeason('day')}
              className={`py-1.5 rounded text-[10px] font-bold transition-all ${
                season === 'day' ? 'bg-amber-500 text-slate-950 shadow-md' : 'bg-polar-950 text-slate-400 hover:text-white'
              }`}
            >
              24h Day
            </button>
            <button
              onClick={() => setSeason('equinox')}
              className={`py-1.5 rounded text-[10px] font-bold transition-all ${
                season === 'equinox' ? 'bg-purple-600 text-white shadow-md' : 'bg-polar-950 text-slate-400 hover:text-white'
              }`}
            >
              Equinox
            </button>
            <button
              onClick={() => setSeason('night')}
              className={`py-1.5 rounded text-[10px] font-bold transition-all ${
                season === 'night' ? 'bg-indigo-900 text-indigo-200 border border-indigo-500/50 shadow-md' : 'bg-polar-950 text-slate-400 hover:text-white'
              }`}
            >
              24h Night
            </button>
          </div>

          <div className="text-[10px] text-slate-500 font-mono text-center mt-2">
            {season === 'night' ? '65 Days of 24hr darkness' : season === 'day' ? '68 Days of 24hr sunlight' : '12h Day / 12h Night cycle'}
          </div>
        </div>

      </div>
    </div>
  );
}
