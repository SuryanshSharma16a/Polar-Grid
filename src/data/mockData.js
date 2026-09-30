/**
 * Mock Data Generator & AI Simulation Models for PolarGrid Prototype
 */

// Generate 72-hour forecast dataset for XGBoost (load) and LSTM (renewable power)
export function generate72HourForecast(season = 'equinox', tempC = -35) {
  const forecast = [];
  const now = new Date();

  for (let i = 0; i < 72; i++) {
    const time = new Date(now.getTime() + i * 3600 * 1000);
    const hour = time.getHours();

    // Solar cycle (0 in night, diurnal curve in polar day/equinox)
    let solarWM2 = 0;
    if (season === 'day') {
      solarWM2 = 350 + Math.sin((hour / 24) * Math.PI * 2) * 250 + Math.random() * 40;
    } else if (season === 'equinox') {
      if (hour >= 6 && hour <= 18) {
        solarWM2 = Math.sin(((hour - 6) / 12) * Math.PI) * 600 + (Math.random() * 50 - 25);
      }
    }

    // Wind cycle (Weibull pattern with occasional gust spikes)
    let windSpeedKmH = 35 + Math.sin((i / 8) * Math.PI) * 20 + (Math.random() * 18 - 9);
    
    // Simulate a blizzard event around hour 38 to hour 46 for demonstration!
    if (i >= 36 && i <= 44) {
      windSpeedKmH = 96 + Math.sin(((i - 36) / 8) * Math.PI) * 25; // Exceeds 90km/h cut-out threshold!
    }

    // XGBoost Load prediction model output (kW)
    const baseLoad = 105;
    const tempImpact = Math.abs(tempC + 20) * 0.6; // lower temp = higher heating load
    const occupancyImpact = (hour >= 8 && hour <= 20) ? 12 : 0; // crew lab activity
    const predictedLoadkW = +(baseLoad + tempImpact + occupancyImpact + Math.sin((hour / 24) * Math.PI * 2) * 8).toFixed(1);
    
    // Confidence bounds (95% CI band)
    const confidenceLower = +(predictedLoadkW * 0.94).toFixed(1);
    const confidenceUpper = +(predictedLoadkW * 1.06).toFixed(1);

    // LSTM Wind & Solar predicted generation (kW)
    // Wind cut-out check: if speed > 90km/h, output drops to 0!
    let predictedWindkW = 0;
    if (windSpeedKmH >= 11 && windSpeedKmH < 90) {
      const norm = (windSpeedKmH - 11) / (45 - 11);
      predictedWindkW = +(Math.min(120, 120 * Math.pow(Math.min(1, norm), 2.2))).toFixed(1);
    }

    let predictedSolarkW = 0;
    if (season !== 'night' && solarWM2 > 10) {
      predictedSolarkW = +(Math.min(80, (solarWM2 / 800) * 80 * 1.1)).toFixed(1);
    }

    const predictedTotalRenewablekW = +(predictedWindkW + predictedSolarkW).toFixed(1);
    const netSurplusDeficitkW = +(predictedTotalRenewablekW - predictedLoadkW).toFixed(1);

    forecast.push({
      hourOffset: i,
      timeLabel: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
      timestamp: time.toISOString(),
      temperatureC: +(tempC + Math.sin((hour / 24) * Math.PI * 2) * 3).toFixed(1),
      windSpeedKmH: +windSpeedKmH.toFixed(1),
      solarWM2: +solarWM2.toFixed(0),
      predictedLoadkW,
      confidenceLower,
      confidenceUpper,
      predictedWindkW,
      predictedSolarkW,
      predictedTotalRenewablekW,
      netSurplusDeficitkW,
      isBlizzardCutout: windSpeedKmH >= 90
    });
  }

  return forecast;
}

// 7-day Historical Validation (Actual vs Predicted XGBoost comparison)
export function generatePastValidationData() {
  const pastData = [];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  for (let i = 0; i < 7; i++) {
    for (let h = 0; h < 24; h += 4) {
      const base = 100 + Math.sin((h / 24) * Math.PI * 2) * 15;
      const actual = +(base + (Math.random() * 8 - 4)).toFixed(1);
      const predicted = +(actual + (Math.random() * 3.5 - 1.75)).toFixed(1);
      
      pastData.push({
        label: `${days[i]} ${h}:00`,
        actualLoadkW: actual,
        predictedLoadkW: predicted,
        errorkW: +Math.abs(actual - predicted).toFixed(2)
      });
    }
  }

  return pastData;
}

// Model metrics summary
export const AI_MODEL_METRICS = {
  xgboostLoadModel: {
    name: 'XGBoost Load Forecaster (SIH-Polar v2.4)',
    rmse: 2.14,
    mae: 1.62,
    r2Score: 0.984,
    trainingDatasetSize: '43,800 hourly records (Bharati + Maitri SCADA 2018-2024)',
    featuresUsed: ['Ambient Temp', 'Wind Chill Index', 'Crew Count', 'Lab Schedule', 'Solar Altitude', 'Historical Load T-1/T-24']
  },
  lstmRenewableModel: {
    name: 'LSTM Spatial-Temporal Weather Predictor',
    rmse: 3.45,
    mae: 2.81,
    r2Score: 0.971,
    trainingDatasetSize: 'ECMWF Antarctic Reanalysis + AWS On-station Telemetry',
    featuresUsed: ['Barometric Pressure', 'Wind Velocity', 'GHI Solar Flux', 'Jet-stream Gradient', 'Turbine Rotor Speed']
  }
};

// Predictive Maintenance Mock Status
export function getEquipmentHealthData(tempC = -35) {
  return [
    {
      id: 'WT-01',
      name: 'Wind Turbine #1 (Polar 60kW Direct Drive)',
      type: 'Wind Turbine',
      healthScore: tempC < -45 ? 88 : 96,
      status: 'OPERATIONAL',
      runtimeHours: 14280,
      vibrationMmS: 1.4,
      bearingTempC: -12.4,
      riskLevel: tempC < -45 ? 'Medium' : 'Low',
      lastMaintenance: '2026-08-15',
      nextService: '2026-11-20',
      anomalyAlert: null
    },
    {
      id: 'WT-02',
      name: 'Wind Turbine #2 (Polar 60kW Direct Drive)',
      type: 'Wind Turbine',
      healthScore: 94,
      status: 'OPERATIONAL',
      runtimeHours: 12150,
      vibrationMmS: 1.1,
      bearingTempC: -14.1,
      riskLevel: 'Low',
      lastMaintenance: '2026-09-02',
      nextService: '2026-12-05',
      anomalyAlert: null
    },
    {
      id: 'SOLAR-01',
      name: 'Solar PV Array (80kW Bifacial Glass-Glass)',
      type: 'Solar Array',
      healthScore: 99,
      status: 'OPERATIONAL',
      runtimeHours: 8500,
      panelTempC: tempC,
      inverterEfficiency: 98.2,
      riskLevel: 'Low',
      lastMaintenance: '2026-07-10',
      nextService: '2027-01-15',
      anomalyAlert: null
    },
    {
      id: 'BESS-500',
      name: 'BESS Unit (500kWh Arctic LTO Battery)',
      type: 'Battery System',
      healthScore: tempC < -40 ? 79 : 91,
      status: tempC < -40 ? 'WARNING' : 'OPTIMAL',
      runtimeHours: 18900,
      internalTempC: -8.2,
      cellVoltageImbalance: tempC < -40 ? '18mV (Elevated)' : '4mV',
      riskLevel: tempC < -40 ? 'High' : 'Low',
      lastMaintenance: '2026-06-20',
      nextService: '2026-10-15',
      anomalyAlert: tempC < -40 ? 'Battery Module #3 showing abnormal voltage drop (-48°C thermal strain). Heating blanket active.' : null
    },
    {
      id: 'DG-01',
      name: 'Diesel Generator #1 (125kW Volvo-Penta Polar)',
      type: 'Diesel Generator',
      healthScore: 92,
      status: 'STANDBY',
      runtimeHours: 6420,
      coolantTempC: 45.0, // Pre-warmed standby
      oilPressureBar: 4.8,
      riskLevel: 'Low',
      lastMaintenance: '2026-09-18',
      nextService: '2026-11-01',
      anomalyAlert: null
    },
    {
      id: 'DG-02',
      name: 'Diesel Generator #2 (125kW Volvo-Penta Polar)',
      type: 'Diesel Generator',
      healthScore: 89,
      status: 'STANDBY',
      runtimeHours: 8910,
      coolantTempC: 42.0,
      oilPressureBar: 4.6,
      riskLevel: 'Low',
      lastMaintenance: '2026-08-30',
      nextService: '2026-10-25',
      anomalyAlert: null
    }
  ];
}

// 30-day Historical Analytics generator
export function generate30DayAnalytics() {
  const logs = [];
  const now = new Date();
  
  for (let d = 29; d >= 0; d--) {
    const date = new Date(now.getTime() - d * 24 * 3600 * 1000);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    // Weather trend
    const tempC = -28 - Math.sin((d / 30) * Math.PI * 2) * 12 + (Math.random() * 4 - 2);
    const windSpeedKmH = 42 + Math.cos((d / 15) * Math.PI) * 22 + (Math.random() * 10 - 5);

    // Energy mix
    const totalDailyKWh = 2400 + Math.abs(tempC + 20) * 18;
    const renewableFraction = Math.min(0.85, Math.max(0.25, 0.55 + (windSpeedKmH / 100) * 0.35));
    
    const windKWh = +(totalDailyKWh * renewableFraction * 0.75).toFixed(0);
    const solarKWh = +(totalDailyKWh * renewableFraction * 0.25).toFixed(0);
    const dieselKWh = +(totalDailyKWh * (1 - renewableFraction)).toFixed(0);
    
    const dieselLitersSaved = +((totalDailyKWh * renewableFraction) * 0.28).toFixed(0);
    const co2SavedKg = +(dieselLitersSaved * 2.68).toFixed(0);
    const costSavedINR = +(dieselLitersSaved * 320).toFixed(0);

    logs.push({
      date: dateStr,
      tempC: +tempC.toFixed(1),
      windSpeedKmH: +windSpeedKmH.toFixed(1),
      windKWh,
      solarKWh,
      dieselKWh,
      totalDailyKWh,
      renewablePercentage: +((renewableFraction * 100).toFixed(1)),
      dieselLitersSaved,
      co2SavedKg,
      costSavedINR
    });
  }

  return logs;
}

// Communication & Edge Sync Status
export const EDGE_COMMS_DATA = {
  satelliteProvider: 'INSAT-4CR & Iridium Certus Dual-Band',
  signalStrength: '94% (Strong Orbital Alignment)',
  latencyMs: 640,
  bandwidthKbps: 256,
  edgeModeActive: true,
  offlineBufferCapacity: '30 Days Local SQLite Vault',
  pendingPacketsToSync: 142,
  lastSyncTimestamp: '2 minutes ago',
  hqEndpoint: 'NCPOR Operations Room (Goa, India)',
  activeAlertsDispatched: [
    { id: 'ALT-104', time: '10:14 AM', severity: 'INFO', msg: 'Mode 1 Green Max dispatch initiated. 100% renewable supply.' },
    { id: 'ALT-103', time: '06:30 AM', severity: 'WARNING', msg: 'Wind speed reached 82 km/h. Pre-warning threshold active.' },
    { id: 'ALT-102', time: 'Yesterday', severity: 'SUCCESS', msg: 'BESS thermal heating blanket successfully equalized cell temps.' }
  ]
};
