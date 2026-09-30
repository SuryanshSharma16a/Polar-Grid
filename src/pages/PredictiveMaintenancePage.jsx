import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Wrench, Calendar, Activity, Cpu } from 'lucide-react';

export default function PredictiveMaintenancePage({ equipmentHealth, tempC }) {
  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-polar-cyan/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-purple-400" />
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              PREDICTIVE MAINTENANCE & ANOMALY DIAGNOSTICS
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time equipment health monitoring, vibration analysis, and extreme sub-zero thermal strain alerts
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-polar-900 border border-purple-500/30 text-xs font-mono text-purple-300 font-bold flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
          <span>6/6 SENSOR NODES TELEMETRY ACTIVE</span>
        </div>
      </div>

      {/* ANOMALY ALERT CALLOUT (If any active) */}
      {tempC < -40 && (
        <div className="p-4 rounded-2xl bg-amber-950/80 border-2 border-amber-500 text-amber-200 flex items-center justify-between gap-4 shadow-2xl animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
            <div>
              <span className="font-extrabold text-sm font-mono block">
                ⚠️ ANOMALY DETECTED: BESS MODULE #3 CELL VOLTAGE DROP
              </span>
              <p className="text-xs text-amber-300">
                Extremely cold ambient temperature ({tempC}°C) causing thermal strain. Battery internal heating blanket engaged at 3.5 kW. Schedule cell impedance audit.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-amber-900 text-amber-200 font-mono text-xs font-bold shrink-0">
            RISK: ELEVATED
          </span>
        </div>
      )}

      {/* EQUIPMENT HEALTH CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipmentHealth.map((eq) => {
          const isWarning = eq.status === 'WARNING' || eq.riskLevel === 'High';
          
          return (
            <div
              key={eq.id}
              className={`p-5 rounded-2xl glass-panel border transition-all flex flex-col justify-between ${
                isWarning
                  ? 'border-amber-500/50 bg-amber-950/20 shadow-amber-950/50'
                  : 'border-polar-cyan/20 hover:border-polar-cyan/40'
              }`}
            >
              <div>
                {/* Top Title Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-polar-900 text-polar-cyan border border-polar-cyan/30">
                    {eq.id}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isWarning ? 'bg-amber-900 text-amber-300 border border-amber-500/40' : 'bg-emerald-900 text-emerald-300 border border-emerald-500/40'
                  }`}>
                    {eq.status}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-white mb-2">{eq.name}</h3>

                {/* Health Score Gauge */}
                <div className="p-3 rounded-xl bg-polar-950/80 border border-polar-800 mb-3">
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>EQUIPMENT HEALTH</span>
                    <span className={`font-bold ${eq.healthScore > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {eq.healthScore}%
                    </span>
                  </div>
                  <div className="w-full bg-polar-900 h-2 rounded-full overflow-hidden p-0.5 border border-polar-800">
                    <div
                      className={`h-full rounded-full transition-all ${
                        eq.healthScore > 90 ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                      style={{ width: `${eq.healthScore}%` }}
                    />
                  </div>
                </div>

                {/* Telemetry Metrics */}
                <div className="space-y-1.5 font-mono text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Runtime:</span>
                    <span>{eq.runtimeHours.toLocaleString()} Hours</span>
                  </div>
                  {eq.vibrationMmS && (
                    <div className="flex justify-between">
                      <span className="text-slate-400">Vibration:</span>
                      <span>{eq.vibrationMmS} mm/s</span>
                    </div>
                  )}
                  {eq.cellVoltageImbalance && (
                    <div className="flex justify-between text-amber-300">
                      <span className="text-slate-400">Cell Imbalance:</span>
                      <span className="font-bold">{eq.cellVoltageImbalance}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-slate-400">Failure Risk Score:</span>
                    <span className={`font-bold ${eq.riskLevel === 'High' ? 'text-rose-400' : eq.riskLevel === 'Medium' ? 'text-amber-400' : 'text-emerald-400'}`}>
                      {eq.riskLevel}
                    </span>
                  </div>
                </div>

                {/* Anomaly Alert Callout */}
                {eq.anomalyAlert && (
                  <div className="mt-3 p-2.5 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-200 text-[11px] font-mono leading-tight">
                    {eq.anomalyAlert}
                  </div>
                )}
              </div>

              {/* Bottom Maintenance Dates */}
              <div className="mt-4 pt-3 border-t border-polar-800 text-[10px] font-mono text-slate-400 flex justify-between">
                <span>Last Service: {eq.lastMaintenance}</span>
                <span className="text-polar-cyan font-bold">Next: {eq.nextService}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
