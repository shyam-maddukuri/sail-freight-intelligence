import React from 'react';
import { useFreight } from '../../context/FreightContext';
import { 
  LayoutDashboard, 
  Layers, 
  TrendingUp, 
  Ship, 
  MapPin, 
  AlertTriangle, 
  CheckCircle2, 
  FileSpreadsheet,
  Sparkles,
  X
} from 'lucide-react';

export default function Sidebar() {
  const { activeTab, setActiveTab, plan, isMobileMenuOpen, setIsMobileMenuOpen } = useFreight();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      subtitle: 'Overview & Quick Planner',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'procurement',
      label: 'Cargo Procurement',
      subtitle: 'Multi-Source Landed Cost',
      icon: Layers,
      badge: '5 Sources'
    },
    {
      id: 'forecast',
      label: 'Freight Forecast',
      subtitle: 'AI/ML Market Model',
      icon: TrendingUp,
      badge: `+${plan.metrics.expectedFreightChangePct}%`
    },
    {
      id: 'vessels',
      label: 'Vessel Selection',
      subtitle: 'Chartering & Compatibility',
      icon: Ship,
      badge: plan.recommendedVessel.vesselType
    },
    {
      id: 'routes',
      label: 'Port & Route Optimization',
      subtitle: 'Maritime Lanes & Ports',
      icon: MapPin,
      badge: 'Map'
    },
    {
      id: 'risk',
      label: 'Risk Analysis',
      subtitle: 'Multi-Factor & VaR Score',
      icon: AlertTriangle,
      badge: `${plan.riskAssessment.overallScore}/100`
    },
    {
      id: 'recommendation',
      label: 'Final Recommendation',
      subtitle: 'Optimal Strategy Dossier',
      icon: CheckCircle2,
      badge: 'AI Flagship',
      highlight: true
    },
    {
      id: 'reports',
      label: 'Reports & Audits',
      subtitle: 'Exportable Committee Logs',
      icon: FileSpreadsheet,
      badge: null
    }
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false);
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full">
      {/* Brand Header */}
      <div>
        <div className="p-4 sm:p-5 border-b border-sail-800/80">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-sail-700 flex items-center justify-center text-white shadow-glow-sm font-bold text-lg">
                S
              </div>
              <div>
                <div className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  SAIL LOGISTICS
                  <span className="text-[9px] bg-cyan-500/20 text-cyan-400 font-mono px-1.5 py-0.5 rounded border border-cyan-500/30">
                    v2.6
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 leading-tight">
                  Steel Authority of India Ltd.
                </div>
              </div>
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white bg-sail-900 border border-sail-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3.5 bg-sail-900/90 rounded-lg p-2.5 border border-sail-700/40 text-[11px] text-slate-300">
            <div className="flex items-center justify-between text-slate-400 font-semibold mb-1">
              <span>SIH PROBLEM CODE</span>
              <span className="text-cyan-400 font-mono">SIH26006</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              Bulk Cargo Procurement & Vessel Chartering Support
            </p>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="p-3 space-y-1">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all group ${
                  isActive
                    ? item.highlight 
                      ? 'bg-gradient-to-r from-cyan-600/30 to-sail-600/30 border border-cyan-500/50 text-white shadow-glow-sm font-semibold'
                      : 'bg-sail-800/90 border border-sail-600/50 text-white font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-sail-900/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`p-1.5 rounded-md transition-colors ${
                      isActive
                        ? item.highlight ? 'bg-cyan-500 text-white' : 'bg-sail-600 text-cyan-300'
                        : 'bg-sail-900/80 text-slate-400 group-hover:text-cyan-400 group-hover:bg-sail-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="text-xs tracking-tight truncate">{item.label}</div>
                    <div className="text-[10px] text-slate-500 group-hover:text-slate-400 truncate">
                      {item.subtitle}
                    </div>
                  </div>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9.5px] font-mono font-medium px-2 py-0.5 rounded-full shrink-0 ml-1 ${
                      isActive
                        ? 'bg-cyan-400/20 text-cyan-300 border border-cyan-400/30'
                        : 'bg-sail-900 text-slate-400 border border-sail-700/50'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-sail-800/80 bg-sail-950/60">
        <div className="bg-sail-900/70 rounded-xl p-3 border border-sail-700/40">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              AI Status
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>

          <div className="space-y-1 text-[10.5px] text-slate-400">
            <div className="flex justify-between">
              <span>Savings:</span>
              <span className="text-emerald-400 font-mono font-semibold">₹{plan.metrics.estimatedSavingsLakhs} L</span>
            </div>
            <div className="flex justify-between">
              <span>Rate Shift:</span>
              <span className="text-rose-400 font-mono font-semibold">+{plan.metrics.expectedFreightChangePct}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Static Sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-[#081224] border-r border-sail-700/30 flex-col justify-between shrink-0 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Visible when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
          />

          {/* Drawer Sheet */}
          <div className="relative w-72 max-w-[80vw] bg-[#081224] border-r border-sail-700/50 h-full shadow-2xl z-10 flex flex-col overflow-y-auto">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
