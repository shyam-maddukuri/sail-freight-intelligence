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
  ExternalLink
} from 'lucide-react';
import { PAST_BENCHMARK_RUNS } from '../data/sampleData';

export default function DashboardPage() {
  const { plan, setActiveTab, setIsDossierOpen } = useFreight();
  const { metrics, recommendedVessel, destination, origin, cargo } = plan;

  const workflowSteps = [
    { label: 'Cargo Procurement', id: 'procurement', status: 'Optimal' },
    { label: 'Freight Forecasting', id: 'forecast', status: `+$${(metrics.forecastFreightRateUsd - metrics.currentFreightRateUsd).toFixed(2)}` },
    { label: 'Shipment Planning', id: 'dashboard', status: `${Number(plan.inputs.quantity).toLocaleString()} MT` },
    { label: 'Vessel Selection', id: 'vessels', status: recommendedVessel.vesselType },
    { label: 'Port & Route', id: 'routes', status: destination.name.split(' ')[0] },
    { label: 'Cost Estimation', id: 'recommendation', status: `₹${metrics.estimatedTotalCostInrCr} Cr` },
    { label: 'Risk Prediction', id: 'risk', status: `${metrics.overallRiskScore}/100` },
    { label: 'Final Recommendation', id: 'recommendation', status: 'Ready' }
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
              onClick={() => setActiveTab('recommendation')}
              className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-sail-600 hover:from-cyan-500 hover:to-sail-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-glow-sm transition-all"
            >
              <Sparkles className="w-4 h-4 text-cyan-200" />
              <span>View Optimal Strategy</span>
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

        {/* Dynamic Workflow Stage Stepper */}
        <div className="mt-6 pt-4 border-t border-sail-800/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center justify-between">
            <span>Decision Support Pipeline Flow</span>
            <span className="text-cyan-400 font-mono text-[10px]">AI Pipeline: End-to-End Synchronized</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {workflowSteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(step.id)}
                className="bg-sail-900/90 hover:bg-sail-800/90 border border-sail-700/50 hover:border-cyan-500/40 rounded-lg p-2 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                  <span className="font-mono">0{idx + 1}</span>
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                </div>
                <div className="text-[11px] font-bold text-slate-200 group-hover:text-white truncate">
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
