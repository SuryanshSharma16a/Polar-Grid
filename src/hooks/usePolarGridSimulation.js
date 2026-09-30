import { useState, useEffect, useCallback, useRef } from 'react';
import { STATIONS } from '../data/stationProfiles';
import {
  calculateWindPower,
  calculateSolarPower,
  calculateBatteryPerformance,
  calculateStationLoad,
  calculateDieselFuelConsumption
} from '../utils/physicsEngine';
import { evaluateDispatchState } from '../utils/dispatchOptimizer';
import { generate72HourForecast, getEquipmentHealthData } from '../data/mockData';

export function usePolarGridSimulation() {
  // Station Profile Selection
  const [stationId, setStationId] = useState('bharati');
  const station = STATIONS[stationId];

  // Manual Environmental Sliders State
  const [tempC, setTempC] = useState(-32);
  const [windSpeedKmH, setWindSpeedKmH] = useState(48);
  const [solarWM2, setSolarWM2] = useState(420);
  const [season, setSeason] = useState('equinox');
  const [crewCount, setCrewCount] = useState(station.winterCrew);

  // BESS State of Charge %
  const [bessSocPercent, setBessSocPercent] = useState(78.5);

  // Manual Override Dispatch Mode (null = automatic AI dispatch)
  const [manualOverrideMode, setManualOverrideMode] = useState(null);

  // Manual Load Shedding Overrides (Station Commander Controls)
  const [shedOverrides, setShedOverrides] = useState({
    nonEssential: false,
    lighting: false,
    research: false
  });

  // Judge Mode Accelerated 60-second Demo state
  const [isJudgeModeActive, setIsJudgeModeActive] = useState(false);
  const [judgeStep, setJudgeStep] = useState(0); // 1, 2, 3, 4
  const [judgeProgress, setJudgeProgress] = useState(0); // 0-100%

  // Real-time Accumulated ROI Metrics
  const [accumulatedStats, setAccumulatedStats] = useState({
    dieselSavedLiters: 14280,
    co2AvoidedKg: 38270,
    costSavedINR: 4569600, // 14280 * 320
    renewableKWh: 51200
  });

  // 1. Calculate Real-Time Physics Outputs
  const windPowerkW = calculateWindPower(windSpeedKmH, station.maxWindkW);
  const solarPowerkW = calculateSolarPower(solarWM2, tempC, station.maxSolarkW, season);
  const bessPerf = calculateBatteryPerformance(bessSocPercent, tempC, station.bessCapacitykWh);
  const stationLoad = calculateStationLoad(tempC, windSpeedKmH, crewCount, station);

  // Check Blizzard Alert flag (>90 km/h wind)
  const isBlizzardAlert = windSpeedKmH >= 90;

  // 2. Evaluate Dispatch Optimization Engine
  const dispatchState = evaluateDispatchState({
    totalLoadkW: stationLoad.totalLoadkW,
    windPowerkW,
    solarPowerkW,
    bessSocPercent,
    bessAvailablekW: bessPerf.maxDischargekW,
    isBlizzardAlert,
    manualOverrideMode
  });

  // Calculate diesel fuel consumption based on DG output
  const dieselConsumption = calculateDieselFuelConsumption(dispatchState.dgOutputkW, station.generatorRatingkW * station.maxGenerators);

  // Equipment Health
  const equipmentHealth = getEquipmentHealthData(tempC);

  // 72-Hour Forecast (Reactively generated based on current temp & season)
  const forecast72h = generate72HourForecast(season, tempC);

  // 3. Live Interval Loop (Updates BESS SoC & Accumulated ROI every 2 seconds)
  useEffect(() => {
    if (isJudgeModeActive) return; // Judge mode handles its own timeline

    const interval = setInterval(() => {
      setBessSocPercent((prevSoc) => {
        let delta = 0;
        if (dispatchState.bessAction === 'CHARGING') {
          delta = 0.15; // Charge up
        } else if (dispatchState.bessAction === 'DISCHARGING' || dispatchState.bessAction === 'SUPPORTING') {
          delta = -0.12; // Discharge
        }
        return Math.min(99.9, Math.max(15.0, +(prevSoc + delta).toFixed(2)));
      });

      // Accumulate ROI savings when running on renewables
      if (dispatchState.mode.id === 1 || dispatchState.mode.id === 2) {
        const renewableSupplykW = windPowerkW + solarPowerkW;
        const litersSavedInstant = (renewableSupplykW * 0.27 * (2 / 3600)); // 2 seconds slice
        const co2KgInstant = litersSavedInstant * 2.68;
        const inrInstant = litersSavedInstant * station.fuelDeliveryCostPerLiterINR;

        setAccumulatedStats((prev) => ({
          dieselSavedLiters: +(prev.dieselSavedLiters + litersSavedInstant).toFixed(2),
          co2AvoidedKg: +(prev.co2AvoidedKg + co2KgInstant).toFixed(2),
          costSavedINR: +(prev.costSavedINR + inrInstant).toFixed(0),
          renewableKWh: +(prev.renewableKWh + (renewableSupplykW * (2 / 3600))).toFixed(2)
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [dispatchState, windPowerkW, solarPowerkW, station, isJudgeModeActive]);

  // 4. Judge Mode Timeline Handler (60-second accelerated sequence)
  useEffect(() => {
    if (!isJudgeModeActive) return;

    let elapsed = 0;
    const totalDurationMs = 60000;
    const intervalMs = 200;

    const judgeTimer = setInterval(() => {
      elapsed += intervalMs;
      const progress = Math.min(100, (elapsed / totalDurationMs) * 100);
      setJudgeProgress(progress);

      // Phase 1: Mode 1 Green Max (0s - 15s)
      if (elapsed < 15000) {
        setJudgeStep(1);
        setSeason('day');
        setTempC(-18);
        setWindSpeedKmH(45);
        setSolarWM2(720);
        setBessSocPercent(85);
      }
      // Phase 2: Mode 2 Buffer Mode (15s - 30s)
      else if (elapsed < 30000) {
        setJudgeStep(2);
        setSeason('equinox');
        setTempC(-28);
        setWindSpeedKmH(18);
        setSolarWM2(40);
        setBessSocPercent(60);
      }
      // Phase 3: Mode 3 Diesel Assist (30s - 45s)
      else if (elapsed < 45000) {
        setJudgeStep(3);
        setSeason('night');
        setTempC(-44);
        setWindSpeedKmH(12);
        setSolarWM2(0);
        setBessSocPercent(24);
      }
      // Phase 4: Mode 4 Emergency Load Shedding (45s - 60s)
      else {
        setJudgeStep(4);
        setSeason('night');
        setTempC(-52);
        setWindSpeedKmH(108); // Blizzard! > 90km/h turbine cutout
        setSolarWM2(0);
        setBessSocPercent(18);
      }

      if (elapsed >= totalDurationMs) {
        clearInterval(judgeTimer);
        setIsJudgeModeActive(false);
      }
    }, intervalMs);

    return () => clearInterval(judgeTimer);
  }, [isJudgeModeActive]);

  const startJudgeMode = useCallback(() => {
    setIsJudgeModeActive(true);
    setJudgeStep(1);
    setJudgeProgress(0);
  }, []);

  const stopJudgeMode = useCallback(() => {
    setIsJudgeModeActive(false);
  }, []);

  const setPreset = useCallback((presetName) => {
    setIsJudgeModeActive(false);
    if (presetName === 'summer_day') {
      setSeason('day');
      setTempC(-15);
      setWindSpeedKmH(42);
      setSolarWM2(750);
    } else if (presetName === 'winter_night') {
      setSeason('night');
      setTempC(-42);
      setWindSpeedKmH(35);
      setSolarWM2(0);
    } else if (presetName === 'blizzard') {
      setSeason('night');
      setTempC(-48);
      setWindSpeedKmH(105);
      setSolarWM2(0);
    } else if (presetName === 'extreme_cold') {
      setSeason('night');
      setTempC(-55);
      setWindSpeedKmH(20);
      setSolarWM2(0);
    }
  }, []);

  return {
    station,
    stationId,
    setStationId,
    // Sliders
    tempC,
    setTempC,
    windSpeedKmH,
    setWindSpeedKmH,
    solarWM2,
    setSolarWM2,
    season,
    setSeason,
    crewCount,
    setCrewCount,
    // BESS & Outputs
    bessSocPercent,
    setBessSocPercent,
    bessPerf,
    windPowerkW,
    solarPowerkW,
    stationLoad,
    dieselConsumption,
    dispatchState,
    isBlizzardAlert,
    equipmentHealth,
    forecast72h,
    accumulatedStats,
    // Overrides
    manualOverrideMode,
    setManualOverrideMode,
    shedOverrides,
    setShedOverrides,
    // Presets & Judge Mode
    setPreset,
    isJudgeModeActive,
    judgeStep,
    judgeProgress,
    startJudgeMode,
    stopJudgeMode
  };
}
