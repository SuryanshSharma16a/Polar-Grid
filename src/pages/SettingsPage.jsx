import React, { useState } from 'react';
import { Settings, Save, Globe, Users, ShieldAlert, Sliders, CheckCircle2 } from 'lucide-react';
import { STATIONS } from '../data/stationProfiles';

export default function SettingsPage({ simProps }) {
  const { stationId, setStationId, crewCount, setCrewCount, station } = simProps;
  
  const [minSocReserve, setMinSocReserve] = useState(20);
  const [dieselReserveWarning, setDieselReserveWarning] = useState(25);
  const [windCutoutThreshold, setWindCutoutThreshold] = useState(90);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-polar-cyan/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-polar-cyan" />
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              STATION CONFIGURATION & SYSTEM PARAMETERS
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Configure SCADA threshold parameters, emergency battery reserves, and crew count multipliers
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-polar-cyan to-emerald-400 text-polar-950 font-extrabold text-xs font-mono flex items-center gap-2 shadow-polar-glow hover:scale-105 active:scale-95 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>SAVE PARAMETERS</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>SCADA configuration parameters successfully saved to station EEPROM vault!</span>
        </div>
      )}

      {/* Station Target Selection */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-polar-cyan" />
          SELECT ACTIVE POLAR RESEARCH STATION
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Object.values(STATIONS).map((st) => (
            <div
              key={st.id}
              onClick={() => setStationId(st.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                stationId === st.id
                  ? 'bg-polar-cyan/15 border-polar-cyan text-white shadow-polar-glow'
                  : 'bg-polar-900/60 border-polar-800 text-slate-400 hover:border-polar-700'
              }`}
            >
              <h3 className="font-extrabold text-sm text-white mb-1">{st.name}</h3>
              <p className="text-xs text-polar-cyan font-mono mb-2">{st.coordinates}</p>
              <div className="text-[11px] text-slate-400 space-y-1 font-mono">
                <div>Established: {st.established}</div>
                <div>Generator Rating: {st.maxGenerators}x {st.generatorRatingkW} kW</div>
                <div>BESS Capacity: {st.bessCapacitykWh} kWh</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threshold Sliders */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 space-y-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sliders className="w-4 h-4 text-polar-cyan" />
          CRITICAL SAFETY & LOAD PARAMETERS
        </h2>

        {/* Crew Count */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-200 font-bold flex items-center gap-1.5">
              <Users className="w-4 h-4 text-polar-cyan" /> CREW OCCUPANCY COUNT
            </span>
            <span className="text-polar-cyan font-bold">{crewCount} Personnel</span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            value={crewCount}
            onChange={(e) => setCrewCount(Number(e.target.value))}
            className="w-full accent-polar-cyan cursor-pointer h-2 bg-polar-950 rounded-lg"
          />
          <span className="text-[10px] text-slate-500 font-mono block">
            Higher crew count increases lab equipment, lighting, and hot water demand baseline.
          </span>
        </div>

        {/* Min BESS SoC Reserve */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-200 font-bold">MINIMUM BESS SOC EMERGENCY RESERVE</span>
            <span className="text-amber-400 font-bold">{minSocReserve}% SoC</span>
          </div>
          <input
            type="range"
            min="10"
            max="40"
            value={minSocReserve}
            onChange={(e) => setMinSocReserve(Number(e.target.value))}
            className="w-full accent-amber-400 cursor-pointer h-2 bg-polar-950 rounded-lg"
          />
          <span className="text-[10px] text-slate-500 font-mono block">
            Threshold below which battery stops supporting buffer load and locks reserve for emergency life support.
          </span>
        </div>

        {/* Wind Turbine Cutout */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-200 font-bold">WIND TURBINE BLIZZARD CUT-OUT SPEED</span>
            <span className="text-rose-400 font-bold">{windCutoutThreshold} km/h</span>
          </div>
          <input
            type="range"
            min="70"
            max="110"
            value={windCutoutThreshold}
            onChange={(e) => setWindCutoutThreshold(Number(e.target.value))}
            className="w-full accent-rose-400 cursor-pointer h-2 bg-polar-950 rounded-lg"
          />
          <span className="text-[10px] text-slate-500 font-mono block">
            Maximum safe wind velocity before turbine mechanical brake engages to prevent structural blade damage.
          </span>
        </div>

      </div>

    </div>
  );
}
