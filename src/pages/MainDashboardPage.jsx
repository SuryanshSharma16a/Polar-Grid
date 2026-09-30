import React from 'react';
import BlizzardBanner from '../components/BlizzardBanner';
import PolarSchematic from '../components/PolarSchematic';
import EnvironmentalSliders from '../components/EnvironmentalSliders';
import LoadDistributionDonut from '../components/LoadDistributionDonut';
import { Zap, Wind, Battery, Flame, Activity, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function MainDashboardPage({ simProps, setActiveTab }) {
  const {
    station,
    tempC,
    setTempC,
    windSpeedKmH,
    setWindSpeedKmH,
    solarWM2,
    setSolarWM2,
    season,
    setSeason,
    bessSocPercent,
    bessPerf,
    windPowerkW,
    solarPowerkW,
    stationLoad,
    dieselConsumption,
    dispatchState,
    isBlizzardAlert,
    setPreset,
    shedOverrides
  } = simProps;

  const totalRenewablekW = windPowerkW + solarPowerkW;
  const renewableFraction = Math.min(100, Math.round((totalRenewablekW / (stationLoad.totalLoadkW || 1)) * 100));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Emergency Blizzard Warning Banner */}
      <BlizzardBanner windSpeedKmH={windSpeedKmH} tempC={tempC} dispatchState={dispatchState} />

      {/* Top SCADA Metrics Quick Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Total Load */}
        <div className="p-4 rounded-2xl glass-panel border border-polar-cyan/20">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">STATION DEMAND</span>
            <Zap className="w-4 h-4 text-polar-cyan" />
          </div>
          <div className="font-mono text-2xl font-extrabold text-white">
            {stationLoad.totalLoadkW} <span className="text-xs font-normal text-slate-400">kW</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex justify-between font-mono">
            <span>Life Support: {stationLoad.categories.lifeSupportHeating}kW</span>
            <span className="text-emerald-400">Stable</span>
          </div>
        </div>

        {/* Metric 2: Renewable Supply */}
        <div className="p-4 rounded-2xl glass-panel border border-polar-aurora/20">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">RENEWABLE GENERATION</span>
            <Wind className="w-4 h-4 text-polar-aurora" />
          </div>
          <div className="font-mono text-2xl font-extrabold text-polar-aurora flex items-baseline justify-between">
            <span>{totalRenewablekW.toFixed(1)} <span className="text-xs font-normal text-slate-400">kW</span></span>
            <span className="text-xs font-mono font-bold text-white bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
              {renewableFraction}% Load
            </span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex justify-between font-mono">
            <span>Wind: {windPowerkW}kW</span>
            <span>Solar: {solarPowerkW}kW</span>
          </div>
        </div>

        {/* Metric 3: BESS Reserve */}
        <div className="p-4 rounded-2xl glass-panel border border-polar-cyan/20">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-semibold">BESS STORAGE (500kWh)</span>
            <Battery className="w-4 h-4 text-polar-cyan" />
          </div>
          <div className="font-mono text-2xl font-extrabold text-white flex items-baseline justify-between">
            <span>{bessSocPercent}%</span>
            <span className="text-xs text-polar-cyan font-normal">{bessPerf.availableEnergykWh} kWh</span>
          </div>
          <div className="w-full bg-polar-950 h-1.5 rounded-full overflow-hidden mt-1.5 border border-polar-cyan/20">
            <div className="h-full bg-polar-cyan rounded-full transition-all" style={{ width: `${bessSocPercent}%` }} />
          </div>
        </div>

        {/* Metric 4: Active Mode & Diesel Status */}
        <div className={`p-4 rounded-2xl border ${dispatchState.mode.bgClass} shadow-lg flex flex-col justify-between`}>
          <div className="flex items-center justify-between text-xs font-bold">
            <span>DISPATCH STATUS</span>
            <Activity className="w-4 h-4 animate-pulse" />
          </div>
          <div className="font-mono text-lg font-extrabold tracking-wide">
            {dispatchState.mode.badge}
          </div>
          <div className="text-[11px] font-mono flex justify-between pt-1 border-t border-current/20">
            <span>DG Output: {dispatchState.dgOutputkW} kW</span>
            <span>{dieselConsumption.litersPerHour} L/h</span>
          </div>
        </div>

      </div>

      {/* Main Digital Twin SCADA Schematic */}
      <PolarSchematic
        windPowerkW={windPowerkW}
        solarPowerkW={solarPowerkW}
        bessPerf={bessPerf}
        bessSocPercent={bessSocPercent}
        stationLoad={stationLoad}
        dieselConsumption={dieselConsumption}
        dispatchState={dispatchState}
        station={station}
        isBlizzardAlert={isBlizzardAlert}
      />

      {/* Grid Row: Interactive Sliders & Load Breakdown Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <EnvironmentalSliders
            tempC={tempC}
            setTempC={setTempC}
            windSpeedKmH={windSpeedKmH}
            setWindSpeedKmH={setWindSpeedKmH}
            solarWM2={solarWM2}
            setSolarWM2={setSolarWM2}
            season={season}
            setSeason={setSeason}
            setPreset={setPreset}
            isBlizzardAlert={isBlizzardAlert}
          />
        </div>

        <div className="lg:col-span-5">
          <LoadDistributionDonut
            stationLoad={stationLoad}
            dispatchState={dispatchState}
            shedOverrides={shedOverrides}
          />
        </div>
      </div>

      {/* Quick AI Decision Tree Rule Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-polar-cyan/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-polar-900 text-polar-cyan border border-polar-cyan/30">
            <Activity className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-white">AI DISPATCH DECISION LOGIC JUSTIFICATION</h4>
            <p className="text-xs text-slate-300 font-mono mt-0.5">
              {dispatchState.decisionRules[0]?.text || 'Normal Green Max Generation'}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('dispatcher')}
          className="px-3.5 py-1.5 rounded-xl bg-polar-900 hover:bg-polar-800 border border-polar-cyan/30 text-polar-cyan text-xs font-semibold flex items-center gap-1 transition-all shrink-0"
        >
          <span>View State Machine Logic</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
}
