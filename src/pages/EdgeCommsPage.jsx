import React from 'react';
import { Radio, Wifi, Database, CheckCircle2, Shield, Send, Cpu } from 'lucide-react';
import { EDGE_COMMS_DATA } from '../data/mockData';

export default function EdgeCommsPage() {
  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-polar-cyan/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-sky-400" />
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              POLAR SATELLITE COMMUNICATIONS & EDGE COMPUTING
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Dual-Band INSAT/Iridium telemetry link & zero-internet autonomous edge processing architecture
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-polar-900 border border-emerald-500/30 text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
          <Wifi className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>SATELLITE LINK ONLINE (640ms)</span>
        </div>
      </div>

      {/* TOP METRICS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl glass-panel border border-polar-cyan/20">
          <span className="block text-xs text-slate-400 font-semibold mb-1">SATELLITE PROVIDER</span>
          <span className="font-mono text-sm font-extrabold text-white">{EDGE_COMMS_DATA.satelliteProvider}</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-emerald-500/20">
          <span className="block text-xs text-slate-400 font-semibold mb-1">SIGNAL STRENGTH</span>
          <span className="font-mono text-sm font-extrabold text-emerald-400">{EDGE_COMMS_DATA.signalStrength}</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-polar-cyan/20">
          <span className="block text-xs text-slate-400 font-semibold mb-1">EDGE OFFLINE VAULT</span>
          <span className="font-mono text-sm font-extrabold text-polar-cyan">{EDGE_COMMS_DATA.offlineBufferCapacity}</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-amber-500/20">
          <span className="block text-xs text-slate-400 font-semibold mb-1">PENDING SYNC PACKETS</span>
          <span className="font-mono text-sm font-extrabold text-amber-400">{EDGE_COMMS_DATA.pendingPacketsToSync} Packets</span>
        </div>

      </div>

      {/* OFFLINE ARCHITECTURE BREAKDOWN */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Database className="w-5 h-5 text-polar-cyan" />
          AUTONOMOUS EDGE COMPUTING GUARANTEE
        </h2>

        <p className="text-xs text-slate-300 leading-relaxed">
          Antarctic blizzards frequently disrupt satellite line-of-sight. PolarGrid is engineered with a zero-cloud dependency model. All XGBoost and LSTM predictions execute locally on the station’s edge micro-server (NVIDIA Jetson / Rugged Industrial PC). Even during 14-day total satellite blackouts, the autonomous microgrid dispatcher functions with 100% precision.
        </p>

        <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-cyan/30 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-2 text-polar-aurora">
            <CheckCircle2 className="w-4 h-4" />
            <span>OFFLINE COMPUTING MODE ACTIVE (100% LOCAL SCADA PROCESSING)</span>
          </div>
          <span className="text-slate-400">HQ Sync: {EDGE_COMMS_DATA.lastSyncTimestamp}</span>
        </div>
      </div>

      {/* NCPOR GOA ALERT DISPATCH LOG */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-4">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Send className="w-5 h-5 text-sky-400" />
          NCPOR OPERATIONS ROOM (GOA) DISPATCH LOG
        </h2>

        <div className="space-y-3 font-mono text-xs">
          {EDGE_COMMS_DATA.activeAlertsDispatched.map((alt) => (
            <div
              key={alt.id}
              className="p-3.5 rounded-xl bg-polar-950/80 border border-polar-800 flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                  alt.severity === 'SUCCESS' ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : alt.severity === 'WARNING' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' : 'bg-sky-950 text-cyan-300 border border-polar-cyan/40'
                }`}>
                  {alt.severity}
                </span>
                <span className="text-slate-200">{alt.msg}</span>
              </div>
              <span className="text-slate-500">{alt.time}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
