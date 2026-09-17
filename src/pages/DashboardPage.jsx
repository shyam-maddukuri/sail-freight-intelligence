import React from 'react';
import { useFreight } from '../context/FreightContext';
import KPICard from '../components/common/KPICard';
import ShipmentPlanForm from '../components/common/ShipmentPlanForm';
import { 
  TrendingUp, 
  DollarSign, 
  Ship, 
  Clock, 
  AlertTriangle, 
  PiggyBank, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  Compass, 
  FileText,
  ChevronRight,
  ExternalLink,
  Sliders,
  Bot
} from 'lucide-react';
import { PAST_BENCHMARK_RUNS } from '../data/sampleData';

export default function DashboardPage() {
  const { plan, setActiveTab, setIsDossierOpen } = useFreight();
  const { metrics, recommendedVessel, destination, origin, cargo, charterStrategies } = plan;

  const workflowSteps = [
    { label: 'Historical Data', id: 'reports', status: 'Ingested' },
    { label: 'Demand Forecast', id: 'procurement', status: `${Number(plan.inputs.quantity).toLocaleString()} MT` },
    { label: 'Freight Forecast', id: 'forecast', status: `+$${(metrics.forecastFreightRateUsd - metrics.currentFreightRateUsd).toFixed(2)}` },
    { label: 'Vessel Match', id: 'vessels', status: recommendedVessel.vesselType },
    { label: 'Cost Optimization', id: 'procurement', status: `₹${metrics.estimatedTotalCostInrCr} Cr` },
    { label: 'Charter Simulator', id: 'strategy', status: charterStrategies?.recommendedStrategy?.name?.split(' ')[0] || 'Period' },
    { label: 'Digital Twin', id: 'digital-twin', status: `${metrics.expectedTransitDays}d Turn` },
    { label: 'Risk / What-If', id: 'risk', status: `${metrics.overallRiskScore}/100` },
    { label: 'AI Agent', id: 'agent', status: '10-Pillar' },
    { label: 'SAIL Decision', id: 'recommendation', status: 'Optimal' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-full bg-cyan-500/5 rounded-l-full pointer-events-none"></div>
        
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                Steel Authority of India Limited • SIH 2026
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Problem: SIH26006
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-extrabold text-white tracking-tight mt-1.5">
              SAIL Freight Intelligence
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              AI-Powered Bulk Cargo Procurement & Vessel Chartering Decision Support System for Overseas Imports to the East Coast of India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('agent')}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-sail-600 hover:from-cyan-500 hover:to-sail-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-glow-sm transition-all"
            >
              <Bot className="w-4 h-4 text-cyan-200" />
              <span>AI Procurement Agent</span>
            </button>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="flex items-center gap-2 bg-sail-800 hover:bg-sail-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl border border-sail-600 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>Formal Dossier</span>
            </button>
          </div>
        </div>

        {/* Dynamic Workflow Stage Stepper (10 Stages) */}
        <div className="mt-6 pt-4 border-t border-sail-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
            <span>Decision Support Pipeline Flow (10 End-to-End Stages)</span>
            <span className="text-cyan-400 font-mono text-[10px]">AI Pipeline: End-to-End Synchronized</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(step.id)}
                className="bg-sail-900/90 hover:bg-sail-800/90 border border-sail-700/50 hover:border-cyan-500/40 rounded-lg p-2 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                  <span className="font-mono">{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}</span>
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-[10.5px] font-bold text-slate-200 group-hover:text-white truncate">
                  {step.label}
                </div>
                <div className="text-[10px] text-cyan-300 font-mono truncate mt-0.5">
                  {step.status}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 6 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* 1. Forecast Freight Rate */}
        <KPICard
          title="Forecast Freight Rate"
          value={`$${metrics.forecastFreightRateUsd}`}
          unit="/ MT"
          subtitle={`Current: $${metrics.currentFreightRateUsd}`}
          change={`+${metrics.expectedFreightChangePct}%`}
          trend="up"
          icon={TrendingUp}
          color="cyan"
          onClick={() => setActiveTab('forecast')}
        />

        {/* 2. Estimated Total Landed Cost */}
        <KPICard
          title="Estimated Total Cost"
          value={`₹${metrics.estimatedTotalCostInrCr}`}
          unit="Cr"
          subtitle={`₹${metrics.landedCostPerMtInr.toLocaleString()}/MT landed`}
          change="Delivered"
          trend="neutral"
          icon={DollarSign}
          color="indigo"
          onClick={() => setActiveTab('procurement')}
        />

        {/* 3. Recommended Vessel */}
        <KPICard
          title="Recommended Vessel"
          value={recommendedVessel.vesselType}
          unit={`(${recommendedVessel.vesselName})`}
          subtitle={`Draft: ${recommendedVessel.draftMeters}m | LOA: ${recommendedVessel.loaMeters}m`}
          change="100% Match"
          trend="down"
          icon={Ship}
          color="blue"
          onClick={() => setActiveTab('vessels')}
        />

        {/* 4. Expected Transit Time */}
        <KPICard
          title="Expected Transit Time"
          value={`${metrics.expectedTransitDays}`}
          unit="Days"
          subtitle={`${metrics.seaTransitDays}d sea + ${metrics.dischargeDays}d port`}
          change={`${metrics.seaDistanceNM.toLocaleString()} NM`}
          trend="neutral"
          icon={Clock}
          color="amber"
          onClick={() => setActiveTab('routes')}
        />

        {/* 5. Overall Risk */}
        <KPICard
          title="Overall Risk"
          value={metrics.overallRiskLevel}
          unit={`(${metrics.overallRiskScore}/100)`}
          subtitle={`Delay Risk: ${metrics.delayRiskPct}%`}
          change="Low Exposure"
          trend="down"
          icon={AlertTriangle}
          color={metrics.overallRiskLevel === 'LOW' ? 'emerald' : metrics.overallRiskLevel === 'MEDIUM' ? 'amber' : 'rose'}
          onClick={() => setActiveTab('risk')}
        />

        {/* 6. Estimated Savings */}
        <KPICard
          title="Estimated Savings"
          value={`₹${metrics.estimatedSavingsLakhs}`}
          unit="Lakhs"
          subtitle="vs Unoptimized Spot Rate"
          change="AI Alpha"
          trend="down"
          icon={PiggyBank}
          color="emerald"
          onClick={() => setActiveTab('recommendation')}
        />
      </div>

      {/* Shipment Planning Input Section */}
      <ShipmentPlanForm />

      {/* 3 Advanced AI Capabilities Showcase Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: AI Chartering Strategy Simulator */}
        <div 
          onClick={() => setActiveTab('strategy')}
          className="bg-gradient-to-br from-[#0a1835] to-[#081224] border border-cyan-500/40 hover:border-cyan-400 rounded-2xl p-5 shadow-card-dark cursor-pointer transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-sail-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40">
                FEATURE 1 • STRATEGY
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold">What-If Enabled</span>
            </div>
            <h3 className="text-base font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Chartering Strategy Simulator
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Compare <strong className="text-white">Spot</strong> vs <strong className="text-white">Short-Term Period</strong> vs <strong className="text-white">COA</strong> contracts. Includes interactive rate and parcel What-If sensitivity sliders.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-sail-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Recommended: <strong className="text-emerald-300">{charterStrategies?.recommendedStrategy?.name || 'Short-Term'}</strong></span>
            <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Simulate</span> <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 2: Port & Vessel Digital Twin */}
        <div 
          onClick={() => setActiveTab('digital-twin')}
          className="bg-gradient-to-br from-[#0a1835] to-[#081224] border border-sail-700/60 hover:border-emerald-500/50 rounded-2xl p-5 shadow-card-dark cursor-pointer transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-sail-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/40">
                FEATURE 2 • DIGITAL TWIN
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">{metrics.expectedTransitDays}d Turnaround</span>
            </div>
            <h3 className="text-base font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-400" />
              Port & Vessel Digital Twin
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Interactive voyage journey: <strong className="text-white">Loading ➔ Sea Steaming ➔ Port Arrival ➔ Discharge</strong>. Evaluates draft clearances, physical limits, and idle delays.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-sail-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Status: <strong className="text-emerald-400">100% Compatible</strong></span>
            <span className="text-emerald-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Launch Twin</span> <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Card 3: Explainable AI Procurement Agent */}
        <div 
          onClick={() => setActiveTab('agent')}
          className="bg-gradient-to-br from-[#0a1835] to-[#081224] border border-cyan-500/40 hover:border-indigo-400 rounded-2xl p-5 shadow-card-dark cursor-pointer transition-all group flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-sail-800">
              <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 px-2 py-0.5 rounded border border-cyan-500/40">
                FEATURE 3 • AGENTIC AI
              </span>
              <span className="text-xs font-mono text-cyan-300 font-bold">10-Point Synthesis</span>
            </div>
            <h3 className="text-base font-bold text-white mt-3 group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              <Bot className="w-4 h-4 text-cyan-400" />
              Explainable Procurement Agent
            </h3>
            <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
              Synthesizes all 7 upstream stages into a structured executive directive with data-grounded rationale and transparent negative alternative validation.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-sail-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-medium">Directive: <strong className="text-cyan-300">Audited & Ready</strong></span>
            <span className="text-cyan-400 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
              <span>Review Memo</span> <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </div>

      {/* Flagship Recommendation Quick Hero Preview */}
      <div className="bg-gradient-to-br from-[#0a1835] via-[#09152b] to-[#070f20] border border-cyan-500/40 rounded-2xl p-5 shadow-card-dark flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 px-2.5 py-0.5 rounded border border-cyan-500/40">
              AI OPTIMIZED CHARTER STRATEGY
            </span>
            <span className="text-xs text-slate-400">
              Generated for {Number(plan.inputs.quantity).toLocaleString()} MT {cargo.name}
            </span>
          </div>

          <h3 className="text-lg font-bold text-white leading-snug">
            Charter <span className="text-cyan-300">{recommendedVessel.vesselName}</span> ({recommendedVessel.vesselType}) from <span className="text-slate-200">{origin.country} ({origin.portName.split(' ')[0]})</span> to <span className="text-emerald-300">{destination.name}</span>.
          </h3>

          <p className="text-xs text-slate-300 leading-relaxed">
            Fix charter within window <strong className="text-cyan-300">{metrics.charterWindow}</strong> to lock freight at <strong className="text-white font-mono">${metrics.forecastFreightRateUsd}/MT</strong> before the anticipated +{metrics.expectedFreightChangePct}% rate increase, capturing an estimated <strong className="text-emerald-400 font-mono">₹{metrics.estimatedSavingsLakhs} Lakhs</strong> in cost savings.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
          <button
            onClick={() => setActiveTab('recommendation')}
            className="flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-xl shadow-glow-sm transition-all"
          >
            <span>Open Strategy Blueprint</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => setActiveTab('forecast')}
            className="flex items-center justify-center gap-2 bg-sail-800 hover:bg-sail-700 text-slate-200 font-semibold text-xs px-4 py-3 rounded-xl border border-sail-600 transition-colors"
          >
            <span>Inspect Forecast</span>
          </button>
        </div>
      </div>

      {/* Recent Benchmark Simulation Runs Table */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              Recent AI Charter Optimization Runs & Benchmarks
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical simulated and executed bulk import plans for SAIL manufacturing plants
            </p>
          </div>
          <button
            onClick={() => setActiveTab('reports')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1"
          >
            <span>View Full Audit Logs</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sail-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-sail-800">
              <tr>
                <th className="py-2.5 px-3">Run ID</th>
                <th className="py-2.5 px-3">Cargo Spec</th>
                <th className="py-2.5 px-3">Route (Origin ➔ Dest)</th>
                <th className="py-2.5 px-3">Vessel Assigned</th>
                <th className="py-2.5 px-3 font-mono">Freight Rate</th>
                <th className="py-2.5 px-3 font-mono">Landed Cost</th>
                <th className="py-2.5 px-3 font-mono">Savings</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sail-800 text-slate-200">
              {PAST_BENCHMARK_RUNS.map((run, idx) => (
                <tr key={run.id} className="hover:bg-sail-900/50 transition-colors">
                  <td className="py-2.5 px-3 font-mono text-cyan-400 font-semibold">{run.id}</td>
                  <td className="py-2.5 px-3 font-medium text-white">{run.cargo}</td>
                  <td className="py-2.5 px-3 text-slate-300">{run.origin} ➔ {run.dest}</td>
                  <td className="py-2.5 px-3">{run.vessel}</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">{run.rate}</td>
                  <td className="py-2.5 px-3 font-mono text-white font-semibold">{run.cost}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-400 font-semibold">{run.savings}</td>
                  <td className="py-2.5 px-3">
                    <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                      {run.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
