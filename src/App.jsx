import React, { useState } from 'react';
import { usePolarGridSimulation } from './hooks/usePolarGridSimulation';
import Navbar from './components/Navbar';
import JudgeModeModal from './components/JudgeModeModal';

// Pages
import LandingPage from './pages/LandingPage';
import MainDashboardPage from './pages/MainDashboardPage';
import ForecastingPage from './pages/ForecastingPage';
import DispatcherPage from './pages/DispatcherPage';
import RoiPage from './pages/RoiPage';
import PredictiveMaintenancePage from './pages/PredictiveMaintenancePage';
import EdgeCommsPage from './pages/EdgeCommsPage';
import HistoricalAnalyticsPage from './pages/HistoricalAnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('landing');
  const simProps = usePolarGridSimulation();

  return (
    <div className="min-h-screen bg-polar-950 text-slate-100 flex flex-col font-sans selection:bg-polar-cyan selection:text-polar-950">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        stationId={simProps.stationId}
        setStationId={simProps.setStationId}
        dispatchState={simProps.dispatchState}
        startJudgeMode={simProps.startJudgeMode}
        isJudgeModeActive={simProps.isJudgeModeActive}
        isBlizzardAlert={simProps.isBlizzardAlert}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 pt-6">
        {activeTab === 'landing' && (
          <LandingPage
            setActiveTab={setActiveTab}
            startJudgeMode={simProps.startJudgeMode}
          />
        )}

        {activeTab === 'dashboard' && (
          <MainDashboardPage
            simProps={simProps}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'forecasting' && (
          <ForecastingPage
            forecast72h={simProps.forecast72h}
            tempC={simProps.tempC}
            season={simProps.season}
          />
        )}

        {activeTab === 'dispatcher' && (
          <DispatcherPage
            simProps={simProps}
          />
        )}

        {activeTab === 'roi' && (
          <RoiPage
            accumulatedStats={simProps.accumulatedStats}
            station={simProps.station}
          />
        )}

        {activeTab === 'maintenance' && (
          <PredictiveMaintenancePage
            equipmentHealth={simProps.equipmentHealth}
            tempC={simProps.tempC}
          />
        )}

        {activeTab === 'comms' && (
          <EdgeCommsPage />
        )}

        {activeTab === 'analytics' && (
          <HistoricalAnalyticsPage
            station={simProps.station}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsPage
            simProps={simProps}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage />
        )}
      </main>

      {/* Judge Mode Modal Overlay */}
      <JudgeModeModal
        isJudgeModeActive={simProps.isJudgeModeActive}
        judgeStep={simProps.judgeStep}
        judgeProgress={simProps.judgeProgress}
        stopJudgeMode={simProps.stopJudgeMode}
        dispatchState={simProps.dispatchState}
      />

      {/* Footer */}
      <footer className="border-t border-polar-cyan/10 bg-polar-950 py-6 px-4 mt-auto text-center text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <span className="text-slate-300 font-bold">PolarGrid v1.0</span> • Smart India Hackathon 2026 (SIH26061)
          </div>
          <div>
            Submitted to Ministry of Earth Sciences (MoES) • Team DRISHTI
          </div>
          <div>
            Antarctic Stations: Maitri (70°S 11°E) & Bharati (70°S 76°E)
          </div>
        </div>
      </footer>

    </div>
  );
}
