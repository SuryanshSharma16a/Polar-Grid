/**
 * Physics engine for Antarctic Microgrid Simulation
 * Implements real-world thermal, aerodynamic, and battery electro-chemical models.
 */

/**
 * Wind Turbine Power Calculation (Weibull / Real Turbine Power Curve)
 * Cut-in: 11 km/h (3 m/s)
 * Rated power: 45 km/h (12.5 m/s)
 * Cut-out (Blizzard Protection): 90 km/h (25 m/s)
 */
export function calculateWindPower(windSpeedKmH, maxCapacitykW = 120) {
  if (windSpeedKmH < 11) return 0;
  if (windSpeedKmH >= 90) {
    // Cut-out active to prevent structural damage in blizzards
    return 0;
  }
  if (windSpeedKmH >= 45) {
    return maxCapacitykW;
  }
  // Cubic power curve between cut-in and rated
  const normalizedSpeed = (windSpeedKmH - 11) / (45 - 11);
  const powerFraction = Math.pow(normalizedSpeed, 2.4); // Realistic curve
  return Math.min(maxCapacitykW, +(maxCapacitykW * powerFraction).toFixed(1));
}

/**
 * Solar PV Output Calculation
 * Factor in Irradiance (W/m²), Cold Temp Coefficient, and Season
 */
export function calculateSolarPower(irradianceWM2, tempC, maxCapacitykW = 80, season = 'equinox') {
  if (season === 'night' || irradianceWM2 <= 5) return 0;

  // Base efficiency ratio
  const irradianceRatio = Math.min(1.0, irradianceWM2 / 800);
  
  // Temperature coefficient: PV efficiency improves in cold temperatures (~0.4% gain per °C below STC 25°C)
  // Max gain capped at +15% due to frost accumulation
  const tempDelta = 25 - tempC;
  const tempGainMultiplier = Math.min(1.18, 1 + (tempDelta * 0.0035));

  const output = maxCapacitykW * irradianceRatio * tempGainMultiplier;
  return Math.min(maxCapacitykW, +output.toFixed(1));
}

/**
 * Battery Energy Storage System (BESS) Cold Performance Model
 * Lithium-iron-phosphate (LFP) / Arctic Grade Lithium Titanate (LTO)
 * Capacity drops in extreme sub-zero conditions due to reduced ion mobility.
 */
export function calculateBatteryPerformance(socPercent, tempC, maxCapacitykWh = 500) {
  // Effective capacity factor drops as temp drops below -10°C
  let coldDegradationFactor = 1.0;
  if (tempC < -10) {
    const dropPerDegree = 0.006; // 0.6% per °C
    coldDegradationFactor = Math.max(0.65, 1.0 - ((-10 - tempC) * dropPerDegree));
  }

  const effectiveCapacitykWh = maxCapacitykWh * coldDegradationFactor;
  const availableEnergykWh = (effectiveCapacitykWh * socPercent) / 100;
  const internalHeatingLoadkW = tempC < -25 ? 3.5 : (tempC < -15 ? 1.8 : 0);

  return {
    effectiveCapacitykWh: +effectiveCapacitykWh.toFixed(1),
    availableEnergykWh: +availableEnergykWh.toFixed(1),
    degradationPercent: +((1 - coldDegradationFactor) * 100).toFixed(1),
    internalHeatingLoadkW,
    maxDischargekW: +(effectiveCapacitykWh * 0.4).toFixed(1), // Max 0.4C discharge rate in extreme cold
    maxChargekW: +(effectiveCapacitykWh * 0.3).toFixed(1)
  };
}

/**
 * Station Thermal & Load Model
 * Heating load surges exponentially with temperature drop and wind chill.
 */
export function calculateStationLoad(tempC, windSpeedKmH, crewCount, stationProfile) {
  // Base non-heating load
  const baseEquip = stationProfile.baseEquipkW + (crewCount > stationProfile.winterCrew ? 5 : 0);
  const baseComms = stationProfile.baseCommskW;
  const baseLight = stationProfile.baseLightkW;
  const baseNonEssential = stationProfile.baseNonEssentialkW;

  // Temperature delta relative to comfortable indoor baseline (18°C)
  const tempDelta = 18 - tempC; // e.g. at -40°C, delta is 58°C
  
  // Wind chill factor increases thermal loss across station insulation
  const windChillMultiplier = 1 + (windSpeedKmH * 0.004);

  // Life support HVAC & electric space heating load
  const lifeSupportHeatingkW = Math.min(
    95, 
    +(stationProfile.baseHeatingkW + (tempDelta * 0.45 * windChillMultiplier)).toFixed(1)
  );

  const totalLoadkW = +(lifeSupportHeatingkW + baseEquip + baseComms + baseLight + baseNonEssential).toFixed(1);

  return {
    totalLoadkW,
    categories: {
      lifeSupportHeating: lifeSupportHeatingkW,
      researchEquipment: baseEquip,
      communication: baseComms,
      lighting: baseLight,
      nonEssential: baseNonEssential
    }
  };
}

/**
 * Polar Diesel Generator (DG Set) Fuel Consumption Model
 * Specific Fuel Consumption (SFC): ~0.26 - 0.35 Liters per kWh depending on load factor
 */
export function calculateDieselFuelConsumption(outputkW, maxRatingkW = 250) {
  if (outputkW <= 0) return { litersPerHour: 0, sfc: 0, efficiencyPercent: 0 };

  const loadFactor = Math.min(1.0, outputkW / maxRatingkW);
  
  // Optimal efficiency is at 75-80% load factor
  // Light load (<30%) causes wet stacking and inefficient burn
  let sfcLitersPerkWh = 0.27; // Baseline ~0.27 L/kWh
  if (loadFactor < 0.3) {
    sfcLitersPerkWh = 0.38;
  } else if (loadFactor < 0.5) {
    sfcLitersPerkWh = 0.31;
  } else if (loadFactor > 0.9) {
    sfcLitersPerkWh = 0.29;
  }

  const litersPerHour = +(outputkW * sfcLitersPerkWh).toFixed(2);
  const efficiencyPercent = +(Math.min(38, Math.max(22, 38 - Math.abs(0.8 - loadFactor) * 25))).toFixed(1);

  return {
    litersPerHour,
    sfcLitersPerkWh: +sfcLitersPerkWh.toFixed(3),
    efficiencyPercent
  };
}
