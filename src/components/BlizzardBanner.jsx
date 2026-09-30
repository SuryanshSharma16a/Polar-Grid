import React from 'react';
import { ShieldAlert, Wind, Flame, Zap } from 'lucide-react';

export default function BlizzardBanner({ windSpeedKmH, tempC, dispatchState }) {
  if (windSpeedKmH < 90 && tempC > -48 && dispatchState.mode.id !== 4) return null;

  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-rose-950 via-red-950 to-polar-950 border-2 border-rose-500 shadow-red-glow animate-pulse">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-rose-900/80 text-rose-200 border border-rose-400 shrink-0">
            <Wind className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-rose-200 tracking-wider font-mono">
                🚨 CRITICAL BLIZZARD ALERT & TURBINE CUT-OUT ACTIVE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500 text-white">
                WIND: {windSpeedKmH} km/h
              </span>
            </div>
            <p className="text-xs text-rose-300/90 mt-1">
              Wind speed exceeds 90 km/h safety limit! Turbines pitch-locked into brake protection. Diesel Generator pre-warming complete. Autonomous Load Shedding Controller engaged.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-rose-200 bg-rose-900/40 p-2.5 rounded-xl border border-rose-500/30 w-full md:w-auto justify-between">
          <div>
            <span className="block text-[10px] text-rose-400">DG ASSIST</span>
            <span className="font-bold">{dispatchState.dgOutputkW} kW</span>
          </div>
          <div className="h-6 w-px bg-rose-800" />
          <div>
            <span className="block text-[10px] text-rose-400">LIFE SUPPORT</span>
            <span className="font-bold text-emerald-400">100% SECURE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
