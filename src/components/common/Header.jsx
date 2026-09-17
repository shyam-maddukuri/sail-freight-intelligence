import React from 'react';
import { useFreight } from '../../context/FreightContext';
import { 
  Anchor, 
  FileText, 
  RefreshCw, 
  ShieldCheck, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';

export default function Header() {
  const { 
    activeTab, 
    setActiveTab, 
    plan, 
    isCalculating, 
    updatePlan, 
    setIsDossierOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    lastCalculatedAt 
  } = useFreight();

  const tabTitles = {
    dashboard: 'Dashboard',
    procurement: 'Cargo Procurement',
    forecast: 'Freight Forecast',
    vessels: 'Vessel Selection',
    routes: 'Port & Route Optimizer',
    strategy: 'AI Chartering Strategy Simulator',
    'digital-twin': 'Port & Vessel Digital Twin',
    risk: 'Risk Analysis',
    agent: 'Explainable AI Procurement Agent',
    recommendation: 'Optimal Strategy',
    reports: 'Reports & Audits'
  };

  return (
    <header className="sticky top-0 z-30 bg-[#070f20]/95 backdrop-blur-md border-b border-sail-700/40 px-4 sm:px-6 py-3 shadow-md">
      <div className="flex items-center justify-between gap-2">
        
        {/* Left: Mobile Menu Button & Title */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-sail-900 border border-sail-700 text-slate-200 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-sail-600 to-sail-800 border border-sail-400/40 text-white shadow-glow-sm shrink-0">
            <Anchor className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-sail-900/90 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                SAIL • SIH26006
              </span>
              <span className="hidden sm:flex text-slate-400 text-xs items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" /> {lastCalculatedAt}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5 min-w-0">
              <h1 className="text-sm sm:text-base font-bold tracking-tight text-white truncate">
                SAIL Freight Intelligence
              </h1>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500 shrink-0 hidden sm:block" />
              <span className="text-xs font-medium text-slate-300 truncate hidden sm:block">
                {tabTitles[activeTab] || 'Dashboard'}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Active Strategy Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 bg-sail-900/80 border border-sail-700/60 rounded-lg px-3 py-1.5 text-xs">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-slate-400">Optimal:</span>
            <span className="font-semibold text-white">{plan.recommendedVessel.vesselName}</span>
            <span className="text-slate-500">|</span>
            <span className="text-cyan-300 font-mono">${plan.metrics.forecastFreightRateUsd}/MT</span>
          </div>

          {/* Recalculate Button */}
          <button
            onClick={() => updatePlan()}
            disabled={isCalculating}
            className="flex items-center gap-1 bg-sail-800 hover:bg-sail-700 active:bg-sail-900 text-slate-200 text-xs font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg border border-sail-600/50 transition-colors shadow-sm disabled:opacity-50"
            title="Recalculate AI Optimization Model"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isCalculating ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{isCalculating ? 'Computing...' : 'Recalculate'}</span>
          </button>

          {/* View Recommendation Action */}
          {activeTab !== 'recommendation' && (
            <button
              onClick={() => setActiveTab('recommendation')}
              className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-cyan-600 to-sail-600 hover:from-cyan-500 hover:to-sail-500 text-white text-xs font-semibold px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg shadow-glow-sm transition-all"
            >
              <TrendingUp className="w-3.5 h-3.5 text-cyan-200" />
              <span className="hidden xs:inline">Strategy</span>
            </button>
          )}

          {/* Formal Decision Dossier Modal Trigger */}
          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-1 sm:gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xs:inline">Dossier</span>
          </button>
        </div>
      </div>
    </header>
  );
}
