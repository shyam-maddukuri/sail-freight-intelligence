import React from 'react';
import { useFreight } from '../context/FreightContext';
import { 
  AlertTriangle, 
  ShieldCheck, 
  CloudRain, 
  Anchor, 
  Ship, 
  TrendingUp, 
  Clock, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  Activity,
  Zap,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip 
} from 'recharts';

export default function RiskAnalysisPage() {
  const { plan, inputs } = useFreight();
  const { riskAssessment, metrics, origin, destination, recommendedVessel } = plan;

  // Radar chart data for 5 risk dimensions
  const radarData = riskAssessment.categories.map(cat => ({
    category: cat.name,
    score: cat.percentage,
    fullMark: 100
  }));

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                Multi-Factor Risk Prediction
              </span>
              <span className="text-xs text-slate-400">
                Evaluation for: <strong className="text-white">{plan.cargo.name}</strong> ({origin.portName} ➔ {destination.name})
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1.5">
              Comprehensive Maritime & Operational Risk Dashboard
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Probabilistic Monte Carlo evaluation of meteorological wave heights, cyclone seasonality, berth queueing bottlenecks, bunker price volatility, and charter default risks.
            </p>
          </div>

          {/* Overall Composite Score Badge */}
          <div className="bg-sail-900/90 border border-emerald-500/30 rounded-2xl p-4 flex items-center gap-4 shadow-card-dark">
            <div className="w-14 h-14 rounded-xl bg-emerald-500/20 text-emerald-400 flex flex-col items-center justify-center border border-emerald-500/40">
              <span className="text-lg font-black font-mono leading-none">{riskAssessment.overallScore}</span>
              <span className="text-[9px] uppercase font-bold text-emerald-300 mt-0.5">/ 100</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Composite Risk Level</span>
              <div className="text-base font-black text-emerald-400">
                {riskAssessment.riskLevel} RISK EXPOSURE
              </div>
              <span className="text-[11px] text-slate-300">
                Within SAIL Approved Risk Thresholds
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Metrics & Radar Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 5 Decomposed Risk Categories */}
        <div className="lg:col-span-7 bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sail-800">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Decomposed Risk Category Breakdown
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Individual category probabilities weighted into composite risk index
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {riskAssessment.categories.map((cat, idx) => {
              const icons = {
                weather: CloudRain,
                congestion: Anchor,
                vessel: Ship,
                price: TrendingUp,
                transitDelay: Clock
              };
              const Icon = icons[cat.key] || AlertTriangle;

              return (
                <div key={idx} className="bg-sail-900/80 p-3.5 rounded-xl border border-sail-700/60">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-md bg-sail-800 text-cyan-400">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-white">{cat.name}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        cat.severity === 'Low' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'
                      }`}>
                        {cat.severity}
                      </span>
                      <span className="font-mono font-black text-white text-sm">
                        {cat.percentage}%
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-sail-950 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        cat.percentage <= 20 ? 'bg-emerald-400' : cat.percentage <= 35 ? 'bg-amber-400' : 'bg-rose-400'
                      }`}
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: 5-Axis Radar Chart */}
        <div className="lg:col-span-5 bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-sail-800">
              <Zap className="w-4 h-4 text-cyan-400" />
              Risk Multi-Dimensional Radar
            </h3>
            <p className="text-xs text-slate-400 mt-2">
              Visualizing the relative exposure across all 5 operational pillars
            </p>
          </div>

          <div className="h-64 w-full flex items-center justify-center my-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="#1e3a6e" />
                <PolarAngleAxis dataKey="category" stroke="#94a3b8" tick={{ fill: '#cbd5e1', fontSize: 10 }} />
                <PolarRadiusAxis angle={30} domain={[0, 50]} stroke="#475569" />
                <Radar name="Risk Index (%)" dataKey="score" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.4} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f1d38', borderColor: '#2e66b4', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                  formatter={(v) => [`${v}%`, 'Probability Score']}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-sail-950/80 p-3 rounded-xl border border-sail-800 text-center text-xs">
            <span className="text-slate-400">Largest Risk Vector: </span>
            <strong className="text-amber-400">Freight Price Volatility (31%)</strong>
          </div>
        </div>

      </div>

      {/* Potential Additional Cost Exposure (Value at Risk / Demurrage Simulation) */}
      <div className="bg-gradient-to-br from-[#12182b] via-[#0b172e] to-[#070f20] border border-amber-500/40 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b border-sail-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Potential Additional Cost & Demurrage Exposure Simulation
              </h3>
              <p className="text-xs text-slate-400">
                Financial Value-at-Risk (VaR) quantifying potential demurrage and bunker escalations
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Risk Cost Exposure</span>
            <div className="text-xl font-black font-mono text-amber-400">
              ₹{riskAssessment.potentialExtraCostLakhs} Lakhs
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-sail-900/80 p-4 rounded-xl border border-sail-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Demurrage Sensitivity (3 Days Delay)</span>
            <div className="text-base font-bold font-mono text-slate-200 mt-1">₹18.4 Lakhs</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Based on standard charterparty demurrage clause of $22,000 / day.
            </p>
          </div>

          <div className="bg-sail-900/80 p-4 rounded-xl border border-sail-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Bunker Price Escalation Surcharge</span>
            <div className="text-base font-bold font-mono text-slate-200 mt-1">₹15.2 Lakhs</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Potential variance if VLSFO spikes above $640/MT before laycan.
            </p>
          </div>

          <div className="bg-sail-900/80 p-4 rounded-xl border border-sail-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Weather Route Diversion Buffer</span>
            <div className="text-base font-bold font-mono text-slate-200 mt-1">₹8.6 Lakhs</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Additional 0.8 steaming days around Bay of Bengal depression.
            </p>
          </div>
        </div>
      </div>

      {/* Potential Risk Factors & Prescriptive Mitigation Playbook */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-sail-800">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Potential Risk Factors & Active Mitigation Playbook
            </h3>
            <p className="text-xs text-slate-400">
              Why the current shipment has the calculated risk profile and recommended actions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {riskAssessment.riskFactors.map((factor, idx) => (
            <div key={idx} className="bg-sail-900/70 p-4 rounded-xl border border-sail-700/60 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{factor.title}</span>
              </div>
              <p className="text-[11.5px] text-slate-300 leading-relaxed">
                {factor.impact}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
