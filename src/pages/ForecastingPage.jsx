import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { Cpu, Wind, Sun, AlertTriangle, CheckCircle2, TrendingUp, Sliders, Layers } from 'lucide-react';
import { AI_MODEL_METRICS, generatePastValidationData } from '../data/mockData';

export default function ForecastingPage({ forecast72h, tempC, season }) {
  const [showValidation, setShowValidation] = useState(false);
  const pastValidationData = generatePastValidationData();

  // Find if any blizzard cut-out is forecasted in the next 72 hours
  const blizzardForecast = forecast72h.find(f => f.isBlizzardCutout);

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-polar-cyan/20 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-polar-cyan" />
            <h1 className="text-2xl font-extrabold text-white tracking-wide">
              AI PREDICTIVE FORECASTING MODULE
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Hybrid XGBoost (Load Demand) & Spatial-Temporal LSTM (Solar & Wind Generation) Models
          </p>
        </div>

        {/* Model Accuracy Badges */}
        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-polar-900 border border-polar-cyan/30 text-xs font-mono">
            <span className="text-slate-400">XGBoost R²: </span>
            <span className="text-polar-cyan font-extrabold">{AI_MODEL_METRICS.xgboostLoadModel.r2Score}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-polar-900 border border-polar-aurora/30 text-xs font-mono">
            <span className="text-slate-400">LSTM R²: </span>
            <span className="text-polar-aurora font-extrabold">{AI_MODEL_METRICS.lstmRenewableModel.r2Score}</span>
          </div>
        </div>
      </div>

      {/* Blizzard Forecast Early Warning Banner */}
      {blizzardForecast && (
        <div className="p-4 rounded-2xl bg-rose-950/80 border-2 border-rose-500 text-rose-200 flex items-center justify-between gap-4 shadow-red-glow animate-pulse">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-rose-400 shrink-0" />
            <div>
              <span className="font-extrabold text-sm font-mono block">
                🚨 LSTM PREDICTIVE BLIZZARD ALERT (IN +{blizzardForecast.hourOffset} HOURS)
              </span>
              <p className="text-xs text-rose-300">
                Forecasted wind speed: <span className="font-bold">{blizzardForecast.windSpeedKmH} km/h</span>. Wind turbines will enter cut-out protection. Pre-warming Diesel Generator #1.
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded bg-rose-900 text-white font-mono text-xs font-bold shrink-0">
            AUTO-DISPATCH PREPARED
          </span>
        </div>
      )}

      {/* SECTION 3A: HYBRID LOAD FORECASTING (XGBoost) */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-polar-cyan/20 text-polar-cyan border border-polar-cyan/40">
                MODEL 1
              </span>
              <h2 className="text-lg font-bold text-white">
                XGBoost 72-Hour Load Demand Forecast
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Predicting thermal heating surge, laboratory schedules, and crew activity cycles with 95% Confidence Intervals
            </p>
          </div>

          {/* Validation Toggle Button */}
          <button
            onClick={() => setShowValidation(!showValidation)}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
              showValidation
                ? 'bg-polar-cyan text-polar-950 border-polar-cyan shadow-polar-glow'
                : 'bg-polar-900 text-polar-cyan border border-polar-cyan/30 hover:bg-polar-800'
            }`}
          >
            {showValidation ? '← View 72h Forecast' : '📊 View 7-Day Actual vs Predicted Validation'}
          </button>
        </div>

        {/* Accuracy Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-polar-950/80 border border-polar-800">
          <div>
            <span className="block text-[10px] font-mono text-slate-400">RMSE ERROR</span>
            <span className="text-lg font-extrabold text-white font-mono">{AI_MODEL_METRICS.xgboostLoadModel.rmse} kW</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-slate-400">MAE ACCURACY</span>
            <span className="text-lg font-extrabold text-white font-mono">{AI_MODEL_METRICS.xgboostLoadModel.mae} kW</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-slate-400">R² CONFIDENCE SCORE</span>
            <span className="text-lg font-extrabold text-polar-cyan font-mono">{AI_MODEL_METRICS.xgboostLoadModel.r2Score}</span>
          </div>
          <div>
            <span className="block text-[10px] font-mono text-slate-400">TRAINING DATASET</span>
            <span className="text-xs font-semibold text-slate-300 font-mono">43,800 Hrs SCADA</span>
          </div>
        </div>

        {/* Recharts Chart */}
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            {!showValidation ? (
              <ComposedChart data={forecast72h}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b3358" opacity={0.5} />
                <XAxis dataKey="timeLabel" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={6} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={[60, 180]} />
                <Tooltip
                  contentStyle={{ background: '#0a1628', borderColor: '#00d4ff', borderRadius: '10px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                
                {/* Confidence Interval Band */}
                <Area type="monotone" dataKey="confidenceUpper" stroke="none" fill="#00d4ff" fillOpacity={0.12} name="95% Confidence Upper" />
                <Area type="monotone" dataKey="confidenceLower" stroke="none" fill="#060d19" fillOpacity={0.8} name="95% Confidence Lower" />
                
                {/* Predicted Load Line */}
                <Line type="monotone" dataKey="predictedLoadkW" stroke="#00d4ff" strokeWidth={3} dot={false} name="Predicted Load (kW)" />
              </ComposedChart>
            ) : (
              <ComposedChart data={pastValidationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1b3358" opacity={0.5} />
                <XAxis dataKey="label" stroke="#94a3b8" tick={{ fontSize: 10 }} interval={3} />
                <YAxis stroke="#94a3b8" tick={{ fontSize: 11 }} domain={[80, 150]} />
                <Tooltip
                  contentStyle={{ background: '#0a1628', borderColor: '#00d4ff', borderRadius: '10px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="actualLoadkW" stroke="#00ff88" strokeWidth={2.5} name="Actual Load SCADA (kW)" />
                <Line type="monotone" dataKey="predictedLoadkW" stroke="#00d4ff" strokeWidth={2.5} strokeDasharray="4 4" name="XGBoost Predicted (kW)" />
              </ComposedChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 3B: RENEWABLE GENERATION FORECAST (LSTM) */}
      <div className="glass-panel rounded-2xl p-6 border border-polar-cyan/20 shadow-2xl space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-polar-aurora/20 text-polar-aurora border border-polar-aurora/40">
              MODEL 2
            </span>
            <h2 className="text-lg font-bold text-white">
              Spatial-Temporal LSTM Renewable Generation & Net Surplus Forecast
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Predicting Wind & Solar power generation vs load demand for autonomous dispatch planning
          </p>
        </div>

        {/* Dual Axis Recharts Chart */}
        <div className="h-80 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={forecast72h}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1b3358" opacity={0.5} />
              <XAxis dataKey="timeLabel" stroke="#94a3b8" tick={{ fontSize: 11 }} interval={6} />
              <YAxis yAxisId="power" stroke="#00ff88" tick={{ fontSize: 11 }} domain={[0, 200]} />
              <YAxis yAxisId="wind" orientation="right" stroke="#ffaa00" tick={{ fontSize: 11 }} domain={[0, 120]} />
              <Tooltip
                contentStyle={{ background: '#0a1628', borderColor: '#00ff88', borderRadius: '10px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

              <Bar yAxisId="power" dataKey="predictedWindkW" fill="#00ff88" radius={[4, 4, 0, 0]} opacity={0.7} name="Wind Power (kW)" />
              <Bar yAxisId="power" dataKey="predictedSolarkW" fill="#ffaa00" radius={[4, 4, 0, 0]} opacity={0.7} name="Solar Power (kW)" />
              <Line yAxisId="power" type="monotone" dataKey="predictedLoadkW" stroke="#ffffff" strokeWidth={2.5} strokeDasharray="3 3" name="Load Demand (kW)" />
              <Line yAxisId="power" type="monotone" dataKey="netSurplusDeficitkW" stroke="#00d4ff" strokeWidth={2} name="Net Surplus/Deficit (kW)" />
              <Line yAxisId="wind" type="monotone" dataKey="windSpeedKmH" stroke="#ff4444" strokeWidth={1.5} dot={false} name="Wind Speed (km/h)" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Net Surplus / Deficit Insights Card */}
        <div className="p-4 rounded-xl bg-polar-950/80 border border-polar-cyan/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-5 h-5 text-polar-cyan shrink-0" />
            <div>
              <span className="text-white font-bold block">AUTONOMOUS DISPATCH PREDICTION SUMMARY</span>
              <span className="text-slate-400 text-[11px]">
                System predicts <span className="text-polar-aurora font-bold">48.5 hours of 100% renewable operation</span> over the next 72 hours.
              </span>
            </div>
          </div>
          <div className="px-4 py-2 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-center font-bold">
            EST. DIESEL SAVINGS: ~1,240 LITERS
          </div>
        </div>
      </div>

    </div>
  );
}
