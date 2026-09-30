/**
 * Dispatch Optimizer & Visual State Machine Engine for PolarGrid
 * Evaluates real-time microgrid metrics and determines optimal source dispatch.
 */

export const MODES = {
  MODE_1: {
    id: 1,
    key: 'GREEN_MAX',
    name: 'MODE 1 - GREEN MAX',
    tagline: '100% Renewable Generation — Diesel OFF',
    badge: '🟢 GREEN MAX',
    color: 'aurora',
    bgClass: 'border-polar-aurora/50 bg-emerald-950/30 text-emerald-300',
    description: 'Renewable energy (Wind + Solar) fully powers station loads. Excess power charges BESS.',
  },
  MODE_2: {
    id: 2,
    key: 'BUFFER',
    name: 'MODE 2 - BUFFER MODE',
    tagline: 'Battery Discharging — Diesel Standby',
    badge: '🟡 BUFFER MODE',
    color: 'cyan',
    bgClass: 'border-polar-cyan/50 bg-sky-950/30 text-cyan-300',
    description: 'Renewables are low. Battery Energy Storage System (BESS) discharges to supply deficit. DG sets on warm standby.',
  },
  MODE_3: {
    id: 3,
    key: 'DIESEL_ASSIST',
    name: 'MODE 3 - DIESEL ASSIST',
    tagline: 'Diesel Generator Auto-Started — BESS Reserve Maintained',
    badge: '🟠 DIESEL ASSIST',
    color: 'amber',
    bgClass: 'border-polar-amber/50 bg-amber-950/30 text-amber-300',
    description: 'Renewables & BESS insufficient for total load. Optimized single/dual Diesel Generator auto-starts to supply deficit.',
  },
  MODE_4: {
    id: 4,
    key: 'EMERGENCY',
    name: 'MODE 4 - EMERGENCY LOAD SHEDDING',
    tagline: 'Blizzard / Extreme Cold — Priority Load Shedding Active',
    badge: '🔴 EMERGENCY SHED',
    color: 'red',
    bgClass: 'border-polar-red/50 bg-rose-950/30 text-rose-300',
    description: 'Severe blizzard / equipment constraint. Smart controller sheds non-essential loads to guarantee 100% life support power.',
  }
};

export function evaluateDispatchState({
  totalLoadkW,
  windPowerkW,
  solarPowerkW,
  bessSocPercent,
  bessAvailablekW,
  isBlizzardAlert,
  manualOverrideMode = null
}) {
  if (manualOverrideMode && MODES[manualOverrideMode]) {
    return MODES[manualOverrideMode];
  }

  const totalRenewablekW = windPowerkW + solarPowerkW;
  const netDeficitkW = totalLoadkW - totalRenewablekW;

  // Decision Tree Evaluation Logic
  const decisionRules = [];

  // Rule 1: Check Blizzard / Extreme Storm cut-out condition
  if (isBlizzardAlert || windPowerkW === 0 && totalRenewablekW < 20 && bessSocPercent < 20) {
    decisionRules.push({
      rule: 'R1_CRITICAL_BLIZZARD_DEFICIT',
      pass: true,
      text: 'Turbine cut-out or severe deficit detected (<20% BESS SoC).'
    });
    return {
      mode: MODES.MODE_4,
      netDeficitkW,
      totalRenewablekW,
      decisionRules,
      activeGenerators: 2,
      dgOutputkW: Math.min(250, totalLoadkW - totalRenewablekW),
      bessAction: 'RESERVE_HOLD',
      bessFlowkW: 0,
      sheddingActive: true
    };
  }

  // Rule 2: Check if renewables exceed total demand
  if (totalRenewablekW >= totalLoadkW) {
    const surpluskW = totalRenewablekW - totalLoadkW;
    decisionRules.push({
      rule: 'R2_RENEWABLE_SURPLUS',
      pass: true,
      text: `Renewables (${totalRenewablekW.toFixed(1)} kW) >= Load (${totalLoadkW.toFixed(1)} kW). Surplus: ${surpluskW.toFixed(1)} kW.`
    });
    
    // Battery charging rate limited by BESS max charge rate & SoC cap
    const bessChargekW = bessSocPercent < 99.5 ? Math.min(60, surpluskW) : 0;

    return {
      mode: MODES.MODE_1,
      netDeficitkW: 0,
      totalRenewablekW,
      decisionRules,
      activeGenerators: 0,
      dgOutputkW: 0,
      bessAction: bessChargekW > 0 ? 'CHARGING' : 'IDLE',
      bessFlowkW: bessChargekW,
      sheddingActive: false
    };
  }

  // Rule 3: Check if BESS can buffer net deficit without dropping below min SoC reserve (20%)
  if (netDeficitkW <= bessAvailablekW && bessSocPercent > 20) {
    decisionRules.push({
      rule: 'R3_BESS_BUFFER_CAPABLE',
      pass: true,
      text: `Net deficit (${netDeficitkW.toFixed(1)} kW) <= BESS discharge capacity (${bessAvailablekW.toFixed(1)} kW) and SoC (${bessSocPercent.toFixed(1)}%) > 20%.`
    });

    return {
      mode: MODES.MODE_2,
      netDeficitkW,
      totalRenewablekW,
      decisionRules,
      activeGenerators: 0,
      dgOutputkW: 0,
      bessAction: 'DISCHARGING',
      bessFlowkW: netDeficitkW,
      sheddingActive: false
    };
  }

  // Rule 4: Moderate deficit -> DG Assist required
  decisionRules.push({
    rule: 'R4_DIESEL_ASSIST_NEEDED',
    pass: true,
    text: `Net deficit (${netDeficitkW.toFixed(1)} kW) exceeds BESS buffer or BESS SoC low (${bessSocPercent.toFixed(1)}%). Auto-starting DG 1.`
  });

  const dgNeededkW = Math.max(0, netDeficitkW - (bessSocPercent > 20 ? 15 : 0));
  const activeGenerators = dgNeededkW > 120 ? 2 : 1;

  return {
    mode: MODES.MODE_3,
    netDeficitkW,
    totalRenewablekW,
    decisionRules,
    activeGenerators,
    dgOutputkW: +Math.min(250, dgNeededkW).toFixed(1),
    bessAction: bessSocPercent > 20 ? 'SUPPORTING' : 'HOLD',
    bessFlowkW: bessSocPercent > 20 ? 15 : 0,
    sheddingActive: false
  };
}
