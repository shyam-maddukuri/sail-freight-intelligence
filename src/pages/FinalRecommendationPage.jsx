import React, { useState } from 'react';
import { useFreight } from '../context/FreightContext';
import ExplainableAIPanel from '../components/common/ExplainableAIPanel';
import { 
  Award, 
  CheckCircle2, 
  Download, 
  FileText, 
  Ship, 
  MapPin, 
  Calendar, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  AlertTriangle, 
  PiggyBank, 
  Sparkles, 
  Printer, 
  ArrowRight,
  ShieldCheck,
  Package,
  Layers
} from 'lucide-react';

export default function FinalRecommendationPage() {
  const { plan, inputs, setActiveTab, setIsDossierOpen } = useFreight();
  const { metrics, recommendedVessel, origin, destination, cargo, explainability } = plan;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Title Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 border border-cyan-500/40 px-3 py-0.5 rounded-full flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              SIH26006 Flagship Output
            </span>
            <span className="text-xs text-slate-400">
              One Clear Final Decision Support Recommendation
            </span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1.5">
            Optimal Shipping Strategy
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Synthesizing ML freight forecasting, vessel draft compatibility, port queueing models, and landed cost optimization into an auditable executive strategy.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveTab('agent')}
            className="flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-sail-600 hover:from-cyan-500 hover:to-sail-500 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-glow-sm transition-all"
          >
            <Sparkles className="w-4 h-4 text-cyan-200" />
            <span>AI Agent Memo</span>
          </button>
          <button
            onClick={() => setActiveTab('strategy')}
            className="flex items-center gap-2 bg-sail-800 hover:bg-sail-700 text-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl border border-sail-600 transition-colors"
          >
            <span>Charter Simulator</span>
          </button>
          <button
            onClick={() => setActiveTab('digital-twin')}
            className="flex items-center gap-2 bg-sail-800 hover:bg-sail-700 text-slate-200 text-xs font-bold px-3 py-2.5 rounded-xl border border-sail-600 transition-colors"
          >
            <span>Digital Twin</span>
          </button>
          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl shadow-glow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Dossier</span>
          </button>
        </div>
      </div>

      {/* HERO CARD: RECOMMENDED PLAN */}
      <div className="bg-gradient-to-br from-[#0c1c38] via-[#09152b] to-[#070f20] border-2 border-cyan-500/60 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Glow & Badge */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-sail-700/80 gap-4 relative z-10">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-sail-600 flex items-center justify-center text-white shadow-glow-md">
              <Award className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-cyan-400">
                RECOMMENDED CHARTER STRATEGY
              </div>
              <h2 className="text-xl lg:text-2xl font-black text-white tracking-tight mt-0.5">
                {recommendedVessel.vesselName} ({recommendedVessel.vesselType})
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Landed Cost</span>
              <div className="text-2xl lg:text-3xl font-black text-emerald-400 font-mono">
                ₹{metrics.estimatedTotalCostInrCr} Cr
              </div>
            </div>
          </div>
        </div>

        {/* 10-Item Key Operational Plan Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mt-6 relative z-10">
          
          {/* 1. Cargo */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <Package className="w-3 h-3 text-cyan-400" /> Cargo
            </span>
            <div className="text-xs font-bold text-white mt-1 leading-tight">
              {Number(inputs.quantity).toLocaleString()} MT
            </div>
            <div className="text-[11px] text-cyan-300 font-medium truncate mt-0.5">
              {cargo.category}
            </div>
          </div>

          {/* 2. Origin */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" /> Origin
            </span>
            <div className="text-xs font-bold text-white mt-1 leading-tight">
              {origin.portName.split(' ')[0]}
            </div>
            <div className="text-[11px] text-slate-300 mt-0.5">
              {origin.country}
            </div>
          </div>

          {/* 3. Destination */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <MapPin className="w-3 h-3 text-emerald-400" /> Destination
            </span>
            <div className="text-xs font-bold text-white mt-1 leading-tight">
              {destination.name}
            </div>
            <div className="text-[11px] text-emerald-300 mt-0.5">
              East Coast India
            </div>
          </div>

          {/* 4. Recommended Vessel */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <Ship className="w-3 h-3 text-cyan-400" /> Recommended Vessel
            </span>
            <div className="text-xs font-bold text-white mt-1 leading-tight">
              {recommendedVessel.vesselType}
            </div>
            <div className="text-[11px] text-cyan-300 mt-0.5">
              {recommendedVessel.vesselName}
            </div>
          </div>

          {/* 5. Recommended Charter Window */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <Calendar className="w-3 h-3 text-amber-400" /> Charter Window
            </span>
            <div className="text-xs font-bold font-mono text-amber-300 mt-1 leading-tight">
              {metrics.charterWindow}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Before price surge
            </div>
          </div>

          {/* 6. Expected Freight Rate */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-cyan-400" /> Freight Rate
            </span>
            <div className="text-sm font-bold font-mono text-cyan-300 mt-1">
              ${metrics.forecastFreightRateUsd} / MT
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Current: ${metrics.currentFreightRateUsd}
            </div>
          </div>

          {/* 7. Estimated Total Cost */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-emerald-400" /> Total Cost
            </span>
            <div className="text-sm font-bold font-mono text-white mt-1">
              ₹{metrics.estimatedTotalCostInrCr} Cr
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Delivered to plant
            </div>
          </div>

          {/* 8. Expected Transit Time */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" /> Expected Transit
            </span>
            <div className="text-sm font-bold font-mono text-cyan-300 mt-1">
              {metrics.expectedTransitDays} Days
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              {metrics.seaTransitDays}d sea voyage
            </div>
          </div>

          {/* 9. Delay Risk */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-emerald-400" /> Delay Risk
            </span>
            <div className="text-sm font-bold font-mono text-emerald-400 mt-1">
              {metrics.delayRiskPct}%
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Low probability
            </div>
          </div>

          {/* 10. Estimated Savings */}
          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5">
            <span className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
              <PiggyBank className="w-3 h-3 text-emerald-400" /> Estimated Savings
            </span>
            <div className="text-sm font-bold font-mono text-emerald-400 mt-1">
              ₹{metrics.estimatedSavingsLakhs} Lakhs
            </div>
            <div className="text-[10px] text-emerald-300 mt-0.5">
              vs spot market
            </div>
          </div>

        </div>

      </div>

      {/* "Why this plan?" 6-Pillar Justification */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex items-center gap-2 pb-4 mb-4 border-b border-sail-800">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Why This Plan? (6 Comprehensive Strategy Pillars)
            </h3>
            <p className="text-xs text-slate-400">
              Deterministic validation verifying operational safety and commercial superiority
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {explainability.sixPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 flex items-start gap-3 hover:border-cyan-500/40 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 font-bold font-mono text-xs flex items-center justify-center shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-white mb-1">
                  {pillar.title}
                </h4>
                <p className="text-[11.5px] text-slate-300 leading-relaxed">
                  {pillar.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Embedded Explainable AI (XAI) Panel */}
      <ExplainableAIPanel />

      {/* Action Footer Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#09152b] border border-sail-700 rounded-2xl shadow-card-dark">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-white">
            Ready to finalize procurement & vessel chartering?
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Export the official SAIL decision memorandum for the Central Purchase Board sign-off.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-glow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Generate Executive Dossier</span>
          </button>
        </div>
      </div>

    </div>
  );
}
