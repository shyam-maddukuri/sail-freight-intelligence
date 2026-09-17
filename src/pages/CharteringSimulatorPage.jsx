import React, { useState } from 'react';
import { useFreight } from '../context/FreightContext';
import { 
  Sliders, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Award, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  Zap, 
  Calendar, 
  Ship, 
  Anchor, 
  Info,
  Scale,
  Percent,
  Check
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';

export default function CharteringSimulatorPage() {
  const { 
    plan, 
    inputs, 
    updatePlan,
    setActiveTab, 
    whatIfOverrides, 
    updateWhatIf, 
    resetWhatIf, 
    liveCharterStrategies 
  } = useFreight();

  const { origin, destination, cargo, recommendedVessel, metrics } = plan;
  const { 
    strategies, 
    recommendedStrategy, 
    recommendationReason, 
    rejectedReason, 
    effectiveBaseRate, 
    effectiveQuantity 
  } = liveCharterStrategies;

  const [appliedNotification, setAppliedNotification] = useState(false);

  // Apply What-If parameters to main global plan
  const handleApplyToMainPlan = () => {
    updatePlan({
      ...inputs,
      quantity: effectiveQuantity
    });
    setAppliedNotification(true);
    setTimeout(() => setAppliedNotification(false), 3000);
  };

  // Chart comparison data
  const chartData = strategies.map(s => ({
    name: s.name.replace(' / Multiple-Voyage', ''),
    totalCostCr: s.totalCostInrCr,
    freightCostCr: s.freightCostInrCr,
    savingsLakhs: s.estimatedSavingsLakhs,
    riskPct: s.freightRateRiskPct
  }));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 border border-cyan-500/40 px-3 py-0.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Feature 1 • Strategic Simulation
              </span>
              <span className="text-xs text-slate-400">
                Route: <strong className="text-white">{origin.portName.split(' ')[0]} ➔ {destination.name}</strong>
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1.5">
              AI Chartering Strategy Simulator
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Dynamically simulate and compare <strong className="text-cyan-300">Spot Contracts</strong>, <strong className="text-emerald-300">Short-Term Period Charters</strong>, and <strong className="text-indigo-300">Medium-Term Contracts of Affreightment (COA)</strong> across freight volatility, operational flexibility, total landed costs, and risk exposure.
            </p>
          </div>

          {/* Quick Winning Strategy Badge */}
          <div className="bg-sail-900/90 border border-cyan-500/40 rounded-xl p-3.5 flex items-center gap-3 shadow-glow-sm">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-sail-600 text-white rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">AI Recommended Strategy</span>
              <div className="text-sm font-bold text-white font-mono">
                {recommendedStrategy.name}
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold">
                {recommendedStrategy.savingsNote || `Lowest Risk-Cost Tradeoff`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive What-If Simulation Sandbox Controls */}
      <div className="bg-[#0b172e] border border-cyan-500/30 rounded-2xl p-5 shadow-card-dark">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 mb-4 border-b border-sail-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Interactive What-If Sensitivity Controls
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Adjust market freight rates, parcel quantities, or laycan timing to see real-time strategy re-ranking
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Quick Simulation Presets */}
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> What-If Presets:
            </span>
            <button
              onClick={() => {
                updateWhatIf('rateDelta', 0);
                updateWhatIf('laycanDaysOffset', 0);
              }}
              className="text-[10.5px] bg-sail-800 hover:bg-sail-700 text-slate-300 px-2.5 py-1 rounded border border-sail-700 transition-colors"
            >
              Baseline AI Model
            </button>
            <button
              onClick={() => {
                updateWhatIf('rateDelta', 4.5);
                updateWhatIf('laycanDaysOffset', 20);
              }}
              className="text-[10.5px] bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 px-2.5 py-1 rounded border border-rose-500/30 transition-colors"
            >
              Winter Spike (+4.5$/MT)
            </button>
            <button
              onClick={() => {
                updateWhatIf('rateDelta', -3.8);
                updateWhatIf('laycanDaysOffset', -10);
              }}
              className="text-[10.5px] bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 px-2.5 py-1 rounded border border-emerald-500/30 transition-colors"
            >
              Market Softening (-3.8$/MT)
            </button>
            <button
              onClick={() => updateWhatIf('quantity', 110000)}
              className="text-[10.5px] bg-indigo-500/15 hover:bg-indigo-500/25 text-indigo-300 px-2.5 py-1 rounded border border-indigo-500/30 transition-colors"
            >
              Heavy Parcel (110k MT)
            </button>
            <button
              onClick={resetWhatIf}
              className="text-[10.5px] bg-sail-800 hover:bg-sail-700 text-slate-400 hover:text-white px-2 py-1 rounded border border-sail-600 transition-colors flex items-center gap-1"
              title="Reset What-If sliders to original inputs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* 3 Slider Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Slider 1: Simulated Freight Rate Shift */}
          <div className="bg-sail-900/80 p-4 rounded-xl border border-sail-700/60">
            <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                Market Freight Rate Shift
              </span>
              <span className={`font-mono font-bold ${whatIfOverrides.rateDelta > 0 ? 'text-rose-400' : whatIfOverrides.rateDelta < 0 ? 'text-emerald-400' : 'text-slate-200'}`}>
                {whatIfOverrides.rateDelta > 0 ? `+` : ''}{whatIfOverrides.rateDelta} $/MT
              </span>
            </div>
            <input
              type="range"
              min="-8"
              max="12"
              step="0.5"
              value={whatIfOverrides.rateDelta}
              onChange={(e) => updateWhatIf('rateDelta', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
              <span>Softening (-$8)</span>
              <span className="font-mono text-cyan-300 font-bold">Effective: ${effectiveBaseRate}/MT</span>
              <span>Spike (+$12)</span>
            </div>
          </div>

          {/* Slider 2: Cargo Quantity Adjustment */}
          <div className="bg-sail-900/80 p-4 rounded-xl border border-sail-700/60">
            <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-cyan-400" />
                Cargo Parcel Volume
              </span>
              <span className="font-mono font-bold text-cyan-300">
                {effectiveQuantity.toLocaleString()} MT
              </span>
            </div>
            <input
              type="range"
              min="20000"
              max="140000"
              step="5000"
              value={effectiveQuantity}
              onChange={(e) => updateWhatIf('quantity', Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
              <span>20k (Supramax)</span>
              <span>75k (Panamax)</span>
              <span>140k (Capesize)</span>
            </div>
          </div>

          {/* Slider 3: Laycan / Timing Window Offset */}
          <div className="bg-sail-900/80 p-4 rounded-xl border border-sail-700/60">
            <div className="flex items-center justify-between mb-1.5 text-xs font-semibold">
              <span className="text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Laycan Timing Window Shift
              </span>
              <span className="font-mono font-bold text-amber-300">
                {whatIfOverrides.laycanDaysOffset === 0 ? 'Optimal Window' : whatIfOverrides.laycanDaysOffset > 0 ? `+${whatIfOverrides.laycanDaysOffset} Days (Delayed)` : `${whatIfOverrides.laycanDaysOffset} Days (Expedited)`}
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="45"
              step="5"
              value={whatIfOverrides.laycanDaysOffset}
              onChange={(e) => updateWhatIf('laycanDaysOffset', Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
            <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1">
              <span>-15d (Prompt)</span>
              <span>Baseline Laycan</span>
              <span>+45d (Late Q4)</span>
            </div>
          </div>

        </div>

        {/* Action button to sync What-If to baseline */}
        <div className="mt-3.5 pt-3 border-t border-sail-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 text-[11px]">
            * What-If calculations update comparisons instantly without modifying official audited records until applied.
          </span>
          <div className="flex items-center gap-2">
            {appliedNotification && (
              <span className="text-emerald-400 font-semibold text-xs flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Applied to Baseline Plan!
              </span>
            )}
            <button
              onClick={handleApplyToMainPlan}
              className="bg-sail-800 hover:bg-sail-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg border border-sail-600 transition-colors font-semibold flex items-center gap-1.5"
            >
              <span>Apply Quantity to Baseline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Recommendation Section (Based on Actual Calculations) */}
      <div className="bg-gradient-to-br from-[#0c1c38] via-[#09152b] to-[#070f20] border-2 border-cyan-500/50 rounded-2xl p-5 shadow-card-dark">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 pb-4 border-b border-sail-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 px-2.5 py-0.5 rounded border border-cyan-500/40 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> AI STRATEGY RECOMMENDATION
              </span>
              <span className="text-xs font-mono text-slate-400">
                Data-Driven Scenario Fit
              </span>
            </div>
            <h3 className="text-lg font-black text-white">
              Recommended: <span className="text-cyan-300">{recommendedStrategy.name}</span>
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Expected Total Landed Cost</span>
              <div className="text-xl font-black text-emerald-400 font-mono">
                ₹{recommendedStrategy.totalCostInrCr} Cr
              </div>
            </div>
          </div>
        </div>

        {/* Why this strategy & Why alternatives rejected */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          
          <div className="bg-sail-900/90 border border-emerald-500/30 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>Why This Strategy Fits This Scenario:</span>
            </div>
            <p className="text-slate-200 text-[11.5px] leading-relaxed">
              {recommendationReason}
            </p>
          </div>

          <div className="bg-sail-900/90 border border-amber-500/30 rounded-xl p-4 space-y-1.5">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Why Alternative Strategies Were Not Selected:</span>
            </div>
            <p className="text-slate-300 text-[11.5px] leading-relaxed">
              {rejectedReason}
            </p>
          </div>

        </div>
      </div>

      {/* 3 Side-by-Side Comparison Strategy Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Scale className="w-4 h-4 text-cyan-400" />
            Chartering Strategies Multi-Variable Comparison
          </h3>
          <span className="text-xs text-slate-400">
            Comparing Spot vs Short-Term vs Medium-Term COA
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {strategies.map((strategy) => {
            const isWinner = strategy.id === recommendedStrategy.id;

            return (
              <div
                key={strategy.id}
                className={`bg-[#0b172e] border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-card-dark ${
                  isWinner
                    ? 'border-cyan-400 ring-2 ring-cyan-500/40 bg-gradient-to-b from-[#0e2142] to-[#0b172e]'
                    : 'border-sail-700/60 hover:border-sail-500'
                }`}
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between pb-3 border-b border-sail-800">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-black text-white">{strategy.name}</span>
                      </div>
                      <span className="text-[11px] text-cyan-300 font-medium block mt-0.5">
                        {strategy.category}
                      </span>
                    </div>

                    {isWinner ? (
                      <span className="bg-gradient-to-r from-cyan-600 to-sail-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-glow-sm tracking-wider flex items-center gap-1">
                        <Award className="w-3 h-3" /> BEST FIT
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-400 bg-sail-900 px-2 py-0.5 rounded border border-sail-700">
                        ALTERNATIVE
                      </span>
                    )}
                  </div>

                  {/* Pricing Hero Metrics */}
                  <div className="grid grid-cols-2 gap-2.5 my-3.5 text-xs">
                    <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Total Landed Cost</span>
                      <span className="text-base font-black text-white font-mono mt-0.5 block">
                        ₹{strategy.totalCostInrCr} Cr
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ₹{strategy.landedCostPerMtInr.toLocaleString()} / MT
                      </span>
                    </div>

                    <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
                      <span className="text-[10px] text-slate-400 uppercase font-semibold block">Freight Cost</span>
                      <span className="text-base font-black text-cyan-300 font-mono mt-0.5 block">
                        ${strategy.freightRateUsd} / MT
                      </span>
                      <span className="text-[10px] text-slate-400">
                        ₹{strategy.freightCostInrCr} Cr Ocean
                      </span>
                    </div>
                  </div>

                  {/* Parameter Rows */}
                  <div className="space-y-2 text-xs divide-y divide-sail-800/60">
                    
                    {/* Contract Duration */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" /> Contract Duration:
                      </span>
                      <span className="font-semibold text-slate-200 text-right">
                        {strategy.contractDuration}
                      </span>
                    </div>

                    {/* Freight-Rate Risk */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3 text-amber-400" /> Rate Risk:
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded ${
                          strategy.riskLevel === 'High Risk'
                            ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                            : strategy.riskLevel === 'Low Risk'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        }`}>
                          {strategy.riskLevel} ({strategy.freightRateRiskPct}%)
                        </span>
                      </div>
                    </div>

                    {/* Operational Flexibility */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Sliders className="w-3 h-3 text-cyan-400" /> Flexibility:
                      </span>
                      <span className={`font-bold text-xs ${
                        strategy.flexibility === 'High' ? 'text-emerald-400' : strategy.flexibility === 'Medium' ? 'text-amber-400' : 'text-slate-300'
                      }`}>
                        {strategy.flexibility} Flexibility
                      </span>
                    </div>

                    {/* Estimated Savings */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-slate-400 flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-emerald-400" /> Estimated Savings:
                      </span>
                      <span className={`font-mono font-bold ${strategy.estimatedSavingsLakhs > 0 ? 'text-emerald-400' : 'text-slate-400'}`}>
                        {strategy.estimatedSavingsLakhs > 0 ? `₹${strategy.estimatedSavingsLakhs} Lakhs` : 'Baseline (₹0)'}
                      </span>
                    </div>

                    {/* Bunker Exposure */}
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 block">Bunker Exposure:</span>
                      <span className="text-[11px] text-slate-300 leading-tight block mt-0.5">
                        {strategy.bunkerExposure}
                      </span>
                    </div>

                    {/* Demurrage Terms */}
                    <div className="pt-2">
                      <span className="text-[10px] text-slate-400 block">Demurrage Terms:</span>
                      <span className="text-[11px] text-slate-300 leading-tight block mt-0.5">
                        {strategy.demurrageTerms}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Footer Action */}
                <div className="mt-5 pt-3 border-t border-sail-800">
                  {isWinner ? (
                    <button
                      onClick={() => setActiveTab('recommendation')}
                      className="w-full py-2 bg-gradient-to-r from-cyan-600 to-sail-600 hover:from-cyan-500 hover:to-sail-500 text-white rounded-xl text-xs font-bold shadow-glow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Proceed with {strategy.name.split(' ')[0]} Plan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setActiveTab('recommendation')}
                      className="w-full py-2 bg-sail-800 hover:bg-sail-700 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-sail-600 transition-colors"
                    >
                      View in Final Recommendation
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive Comparison Table & Visual Trade-Off Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Detailed Matrix Table */}
        <div className="lg:col-span-7 bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-sail-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Scale className="w-4 h-4 text-cyan-400" />
                Chartering Strategy Parameter Matrix
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Exhaustive side-by-side comparison for procurement board evaluation
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-sail-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-sail-800">
                <tr>
                  <th className="py-2.5 px-3">Dimension</th>
                  <th className="py-2.5 px-3">Spot Contract</th>
                  <th className="py-2.5 px-3 text-cyan-300">Short-Term Charter</th>
                  <th className="py-2.5 px-3 text-indigo-300">Medium-Term COA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sail-800 text-slate-200">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Total Landed Cost</td>
                  <td className="py-2.5 px-3 font-mono">₹{strategies[0].totalCostInrCr} Cr</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">₹{strategies[1].totalCostInrCr} Cr</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">₹{strategies[2].totalCostInrCr} Cr</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Freight Rate / MT</td>
                  <td className="py-2.5 px-3 font-mono">${strategies[0].freightRateUsd}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-cyan-300">${strategies[1].freightRateUsd}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-200">${strategies[2].freightRateUsd}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Rate Volatility Risk</td>
                  <td className="py-2.5 px-3 text-rose-400 font-bold">78% (Unprotected)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">32% (Hedged)</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">16% (Fixed Collar)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Operational Flexibility</td>
                  <td className="py-2.5 px-3 text-emerald-400 font-bold">High (Single Voyage)</td>
                  <td className="py-2.5 px-3 text-amber-400 font-bold">Medium (±5d spread)</td>
                  <td className="py-2.5 px-3 text-slate-400">Low-Medium (Quarterly)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Estimated Savings</td>
                  <td className="py-2.5 px-3 text-slate-400">Baseline (₹0)</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">₹{strategies[1].estimatedSavingsLakhs} Lakhs</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">₹{strategies[2].estimatedSavingsLakhs} Lakhs</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Contract Duration</td>
                  <td className="py-2.5 px-3">{strategies[0].contractDuration}</td>
                  <td className="py-2.5 px-3">{strategies[1].contractDuration}</td>
                  <td className="py-2.5 px-3">{strategies[2].contractDuration}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-400">Demurrage Daily Cap</td>
                  <td className="py-2.5 px-3 font-mono">$22,000 / day</td>
                  <td className="py-2.5 px-3 font-mono text-cyan-300">$18,500 / day</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-300">$16,000 / day</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Visual Cost & Savings Trade-off Chart */}
        <div className="lg:col-span-5 bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-sail-800">
              <BarChart className="w-4 h-4 text-cyan-400" />
              Landed Cost vs Savings Trade-Off (₹ Cr)
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Visualizing the financial alpha captured across chartering structures
            </p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 15, right: 15, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 10 }} tickFormatter={(v) => `₹${v}Cr`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f1d38', borderColor: '#2e66b4', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  formatter={(v, name) => [`₹${v} Cr`, name]}
                />
                <Bar dataKey="totalCostCr" name="Total Landed Cost (Cr)" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                <Bar dataKey="freightCostCr" name="Ocean Freight (Cr)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-sail-950/80 p-3 rounded-xl border border-sail-800 text-center text-xs text-slate-300">
            <span>Winning Recommendation: </span>
            <strong className="text-emerald-400">{recommendedStrategy.name}</strong>
            <span className="text-slate-400 block text-[11px] mt-0.5">
              Captures maximum period discount with minimum operational lock-in risk.
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
