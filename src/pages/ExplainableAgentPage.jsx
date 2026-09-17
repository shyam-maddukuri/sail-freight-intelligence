import React, { useState } from 'react';
import { useFreight } from '../context/FreightContext';
import { 
  Bot, 
  Sparkles, 
  BrainCircuit, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Award, 
  ShieldCheck, 
  Ship, 
  MapPin, 
  Calendar, 
  DollarSign, 
  PiggyBank, 
  Clock, 
  FileText, 
  Printer, 
  ArrowRight,
  ChevronRight,
  Activity,
  Layers,
  Scale,
  Compass,
  Anchor
} from 'lucide-react';

export default function ExplainableAgentPage() {
  const { plan, inputs, setActiveTab, setIsDossierOpen } = useFreight();
  const { 
    agentDossier, 
    recommendedVessel, 
    destination, 
    origin, 
    cargo, 
    metrics, 
    riskAssessment, 
    charterStrategies 
  } = plan;

  const { tenPointDossier, pipelineLog } = agentDossier;
  const [activeAlternativeTab, setActiveAlternativeTab] = useState('vessels'); // 'vessels' | 'routes' | 'strategies'

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 border border-cyan-500/40 px-3 py-0.5 rounded-full flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-cyan-300" />
                Feature 3 • Explainable Autonomous Agent
              </span>
              <span className="text-xs text-slate-400">
                End-to-End Decision Synthesis
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1.5">
              Explainable AI Procurement Agent
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Synthesizing demand forecasting, predictive freight modeling, hydrodynamic vessel-port compatibility, chartering simulator outputs, digital twin turnaround, and multi-factor risk into an auditable executive recommendation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsDossierOpen(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-glow-sm transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Generate Audit Memo</span>
            </button>
          </div>
        </div>
      </div>

      {/* HERO EXECUTIVE CARD: Structured Business Language Memorandum */}
      <div className="bg-gradient-to-br from-[#0c1c38] via-[#09152b] to-[#070f20] border-2 border-cyan-500/60 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-5 border-b border-sail-700/80 gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-sail-600 flex items-center justify-center text-white shadow-glow-md">
              <Bot className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                EXPLAINABLE AI PROCUREMENT AGENT MEMORANDUM
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight mt-0.5">
                Executive Procurement & Chartering Directive
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-sail-900/90 border border-emerald-500/40 text-emerald-300 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Compliance: GFR 2017 & CVC Audited</span>
          </div>
        </div>

        {/* Formatted Natural Business Language Statement */}
        <div className="space-y-4 mt-6 relative z-10 text-xs sm:text-sm">
          
          {/* 1. Recommendation Statement */}
          <div className="bg-sail-900/90 border border-cyan-500/40 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-1.5 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-300" />
              Final Procurement Recommendation:
            </div>
            <p className="text-base sm:text-lg font-extrabold text-white leading-snug">
              Choose <span className="text-cyan-300">{tenPointDossier.point1RecommendedVessel}</span> for <span className="text-slate-200">{tenPointDossier.point2RecommendedRoute}</span> under a <span className="text-emerald-300">{tenPointDossier.point3RecommendedStrategy}</span>.
            </p>
          </div>

          {/* 2. Reason Statement */}
          <div className="bg-sail-900/90 border border-emerald-500/30 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              Reason for Selection:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {tenPointDossier.point9WhyChosen}
            </p>
          </div>

          {/* 3. Rejected Alternatives Statement */}
          <div className="bg-sail-900/90 border border-amber-500/30 rounded-2xl p-5 shadow-sm">
            <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-300" />
              Rejected Alternatives Summary:
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Alternative vessel options (Capesize/Post-Panamax) were rejected due to draft/port compatibility constraints at {destination.name} and excessive dead-freight costs. The open spot charter market was rejected due to high rate volatility (+{metrics.expectedFreightChangePct}% predicted surge), which would forego ₹{tenPointDossier.point6EstimatedSavings} in period charter savings.
            </p>
          </div>

        </div>
      </div>

      {/* 10-Point Structured Executive Dossier Grid */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex items-center justify-between pb-4 mb-5 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-cyan-400" />
              10-Point Structured Procurement Advisory
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Synthesized directly from live calculations across all system layers
            </p>
          </div>
          <span className="text-xs font-mono text-cyan-400">10 / 10 Pillars Grounded in Data</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Point 1: Recommended Vessel */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">01 • Recommended Vessel</span>
              <Ship className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm font-black text-white">{tenPointDossier.point1RecommendedVessel}</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Draft: {recommendedVessel.draftMeters}m | LOA: {recommendedVessel.loaMeters}m | DWT: {recommendedVessel.capacityDwt.toLocaleString()} MT
            </p>
          </div>

          {/* Point 2: Recommended Route */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">02 • Recommended Route</span>
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-black text-white">{origin.country} ➔ {destination.name}</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              {metrics.seaDistanceNM.toLocaleString()} NM via Bay of Bengal; connects directly to {destination.primaryServePlant.split('&')[0]}.
            </p>
          </div>

          {/* Point 3: Recommended Strategy */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">03 • Chartering Strategy</span>
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm font-black text-white">{tenPointDossier.point3RecommendedStrategy}</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              60-90 days duration (2-3 consecutive voyages) with ±5 days laycan spread.
            </p>
          </div>

          {/* Point 4: Market-Entry Timing */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">04 • Market-Entry Timing</span>
              <Calendar className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm font-black font-mono text-amber-300">{tenPointDossier.point4RecommendedTiming}</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Locks freight before the anticipated +{metrics.expectedFreightChangePct}% Q4 restocking rate surge.
            </p>
          </div>

          {/* Point 5: Expected Cost */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">05 • Expected Cost</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-black font-mono text-emerald-400">₹{metrics.estimatedTotalCostInrCr} Cr Landed</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              ₹{metrics.landedCostPerMtInr.toLocaleString()}/MT delivered (Ocean Freight: ${metrics.forecastFreightRateUsd}/MT).
            </p>
          </div>

          {/* Point 6: Estimated Savings */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">06 • Estimated Savings</span>
              <PiggyBank className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-black font-mono text-emerald-400">₹{metrics.estimatedSavingsLakhs} Lakhs</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Captured via optimal period charter discount vs unoptimized prompt spot market.
            </p>
          </div>

          {/* Point 7: Key Operational Risks */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">07 • Key Operational Risks</span>
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-sm font-black text-amber-300">Composite: {riskAssessment.overallScore}/100 ({riskAssessment.riskLevel})</div>
            <div className="space-y-0.5 text-[10.5px] text-slate-300">
              {tenPointDossier.point7KeyOperationalRisks.map((r, i) => (
                <div key={i}>• {r.name}: {r.text}</div>
              ))}
            </div>
          </div>

          {/* Point 8: Port/Vessel Compatibility */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">08 • Vessel-Port Safety</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-black text-emerald-400">100% Draft & LOA Compliant</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              {tenPointDossier.point8PortVesselCompatibility}
            </p>
          </div>

          {/* Point 9: Why Option Was Chosen */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">09 • Why Option Chosen</span>
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-sm font-black text-white">Dominant Multi-Objective Frontier</div>
            <p className="text-[11px] text-slate-300 leading-tight">
              Lowest landed cost + safe draft + timely charter execution before forecast rate surge.
            </p>
          </div>

        </div>

        {/* Point 10 Deep Dive: Why Alternatives Were Rejected */}
        <div className="mt-6 pt-5 border-t border-sail-800">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">10 • Transparent Negative Validation</span>
              <h4 className="text-sm font-bold text-white flex items-center gap-2 mt-0.5">
                <XCircle className="w-4 h-4 text-rose-400" />
                Why Alternative Options Were Rejected
              </h4>
            </div>

            {/* Tabs for Alternatives */}
            <div className="flex items-center bg-sail-900 p-1 rounded-lg border border-sail-700 text-xs">
              <button
                onClick={() => setActiveAlternativeTab('vessels')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  activeAlternativeTab === 'vessels' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alternative Vessels ({tenPointDossier.point10WhyAlternativesRejected.vessels.length})
              </button>
              <button
                onClick={() => setActiveAlternativeTab('routes')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  activeAlternativeTab === 'routes' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alternative Ports ({tenPointDossier.point10WhyAlternativesRejected.routes.length})
              </button>
              <button
                onClick={() => setActiveAlternativeTab('strategies')}
                className={`px-3 py-1 rounded font-medium transition-all ${
                  activeAlternativeTab === 'strategies' ? 'bg-cyan-500 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Alternative Strategies ({tenPointDossier.point10WhyAlternativesRejected.strategies.length})
              </button>
            </div>
          </div>

          {/* Tab 1: Alternative Vessels Rejected */}
          {activeAlternativeTab === 'vessels' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tenPointDossier.point10WhyAlternativesRejected.vessels.map((v, i) => (
                <div key={i} className="bg-sail-900/90 border border-rose-500/30 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{v.vesselName}</span>
                    <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      REJECTED
                    </span>
                  </div>
                  <span className="text-[11px] text-cyan-300 font-medium block">{v.vesselType}</span>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed mt-1">
                    {v.reason}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Alternative Ports Rejected */}
          {activeAlternativeTab === 'routes' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {tenPointDossier.point10WhyAlternativesRejected.routes.map((r, i) => (
                <div key={i} className="bg-sail-900/90 border border-rose-500/30 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{r.portName}</span>
                    <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      REJECTED
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed mt-1">
                    {r.reason}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Alternative Strategies Rejected */}
          {activeAlternativeTab === 'strategies' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tenPointDossier.point10WhyAlternativesRejected.strategies.map((s, i) => (
                <div key={i} className="bg-sail-900/90 border border-rose-500/30 rounded-xl p-3.5 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white text-xs">{s.strategyName}</span>
                    <span className="text-[10px] text-rose-400 font-mono font-bold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                      REJECTED
                    </span>
                  </div>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed mt-1">
                    {s.reason}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 10-Stage Decision Pipeline Execution Trace */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              10-Stage Decision Support Pipeline Execution Trace
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live computational sequence from Historical Data to Final SAIL Recommendation
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400">100% Deterministic & Auditable</span>
        </div>

        <div className="space-y-2.5">
          {pipelineLog.map((log, idx) => (
            <div
              key={idx}
              className="bg-sail-900/70 border border-sail-700/50 hover:border-cyan-500/40 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="w-6 h-6 rounded-md bg-cyan-500/20 text-cyan-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <div className="truncate">
                  <span className="text-xs font-bold text-white block">{log.stage}</span>
                  <span className="text-[11.5px] text-slate-300 leading-tight">{log.detail}</span>
                </div>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                  {log.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
