import React from 'react';
import { useFreight } from './context/FreightContext';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import DecisionDossierModal from './components/common/DecisionDossierModal';

import DashboardPage from './pages/DashboardPage';
import ProcurementPage from './pages/ProcurementPage';
import ForecastPage from './pages/ForecastPage';
import VesselsPage from './pages/VesselsPage';
import RouteOptimizationPage from './pages/RouteOptimizationPage';
import RiskAnalysisPage from './pages/RiskAnalysisPage';
import FinalRecommendationPage from './pages/FinalRecommendationPage';
import ReportsPage from './pages/ReportsPage';

import { 
  LayoutDashboard, 
  Layers, 
  TrendingUp, 
  Ship, 
  CheckCircle2, 
  MapPin, 
  AlertTriangle 
} from 'lucide-react';

export default function App() {
  const { activeTab, setActiveTab } = useFreight();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage />;
      case 'procurement':
        return <ProcurementPage />;
      case 'forecast':
        return <ForecastPage />;
      case 'vessels':
        return <VesselsPage />;
      case 'routes':
        return <RouteOptimizationPage />;
      case 'risk':
        return <RiskAnalysisPage />;
      case 'recommendation':
        return <FinalRecommendationPage />;
      case 'reports':
        return <ReportsPage />;
      default:
        return <DashboardPage />;
    }
  };

  const mobileBottomTabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'procurement', label: 'Sourcing', icon: Layers },
    { id: 'forecast', label: 'Forecast', icon: TrendingUp },
    { id: 'vessels', label: 'Vessels', icon: Ship },
    { id: 'recommendation', label: 'Strategy', icon: CheckCircle2, highlight: true }
  ];

  return (
    <div className="flex min-h-screen bg-[#060c18] text-slate-100 font-sans pb-16 md:pb-0">
      {/* Navigation Sidebar (Desktop + Mobile Drawer) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        <Header />
        
        <main className="flex-1 p-3.5 sm:p-6 max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>

      {/* Mobile Bottom Tab Bar for Quick Access */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070f20]/95 backdrop-blur-lg border-t border-sail-700/60 px-2 py-1 flex items-center justify-around">
        {mobileBottomTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
                isActive
                  ? tab.highlight
                    ? 'text-cyan-400 font-bold'
                    : 'text-white font-bold bg-sail-900/80'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : ''}`} />
              <span className="text-[10px] mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Modal Dialogs */}
      <DecisionDossierModal />
    </div>
  );
}
