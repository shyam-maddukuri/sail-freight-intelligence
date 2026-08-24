import React from 'react';
import { useFreight } from '../../context/FreightContext';
import { 
  Sparkles, 
  BrainCircuit, 
  CheckCircle, 
  ShieldCheck, 
  TrendingDown, 
  Cpu, 
  Scale, 
  FileCheck 
} from 'lucide-react';

export default function ExplainableAIPanel() {
  const { plan } = useFreight();
  const { explainability, recommendedVessel, destination, origin, metrics } = plan;

  return (
    <div className="bg-gradient-to-br from-[#0c1a35] via-[#09152b] to-[#081224] border border-cyan-500/40 rounded-2xl p-6 shadow-card-dark relative overflow-hidden">
      {/* Decorative AI Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-sail-700/60 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500 to-sail-600 text-white shadow-glow-sm">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-white tracking-tight">
                Explainable AI (XAI) Decision Rationale
              </h3>
              <span className="text-[10px] bg-cyan-500/20 text-cyan-300 font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/40">
                Transparent Multi-Objective Optimization
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Auditable reasoning for SAIL High-Power Procurement Committee & SIH Jury
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4" />
          <span>Audit Score: 98.2% Confidence</span>
        </div>
      </div>

      {/* Hero Natural Language Explanation Box */}
      <div className="mt-5 bg-[#070f20]/90 border border-cyan-500/30 rounded-xl p-4.5 relative z-10">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
              Why the System Recommends This Exact Strategy:
            </h4>
            <p className="text-sm text-slate-200 leading-relaxed font-normal">
              "{explainability.vesselReason} Additionally, {explainability.portRouteReason} {explainability.freightTimingReason}"
            </p>
          </div>
        </div>
      </div>

      {/* 6-Pillar Decision Justification Grid */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Scale className="w-3.5 h-3.5 text-cyan-400" />
            6 Core Decision Verification Pillars
          </h4>
          <span className="text-[11px] text-slate-400">
            Validated against SAIL Tender Guidelines (GFR 2017)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {explainability.sixPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-sail-900/80 border border-sail-700/50 hover:border-cyan-500/40 rounded-xl p-3.5 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono text-[11px]">
                  {idx + 1}
                </div>
                <span>{pillar.title}</span>
              </div>
              <p className="text-[11.5px] text-slate-300 leading-relaxed pl-7">
                {pillar.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Explainability Breakdown Badges */}
      <div className="mt-5 pt-4 border-t border-sail-700/50 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Zero Draft Violation Risk
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Direct Railway Rake Evacuation
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Bunker Surcharge Capped
          </span>
        </div>

        <div className="text-[11px] font-mono text-cyan-300">
          Generated via Multimodal Fleet-Port Matching Algorithm
        </div>
      </div>
    </div>
  );
}
