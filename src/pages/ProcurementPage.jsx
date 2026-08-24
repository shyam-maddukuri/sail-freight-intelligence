import React, { useState } from 'react';
import { useFreight } from '../context/FreightContext';
import { 
  Layers, 
  DollarSign, 
  TrendingDown, 
  Award, 
  AlertCircle, 
  CheckCircle, 
  Sparkles, 
  Info, 
  Flame, 
  Droplet,
  Compass,
  ArrowRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

export default function ProcurementPage() {
  const { plan, inputs, handleInputChange, updatePlan, setActiveTab } = useFreight();
  const { procurementComparison, cargo, destination } = plan;
  const [selectedSourceId, setSelectedSourceId] = useState(inputs.originId);

  const selectedSource = procurementComparison.find(s => s.id === selectedSourceId) || procurementComparison[0];

  // Recharts data for Landed Cost Breakdown across origins
  const chartData = procurementComparison.map(item => ({
    country: item.country,
    port: item.originPort.split(' ')[0],
    fobCostInr: Math.round(item.fobPriceUsd * 83.5),
    oceanFreightInr: Math.round(item.freightEstimateUsd * 83.5),
    portAndRailInr: Math.round(destination.portChargesInrPerMt + destination.railFreightToRourkelaInr),
    landedCostPerMt: item.landedCostPerMtInr,
    totalCostCr: item.totalCostInrCr
  }));

  const handleApplySource = (originId) => {
    handleInputChange('originId', originId);
    updatePlan({ ...inputs, originId });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                Global Sourcing Intelligence
              </span>
              <span className="text-xs text-slate-400">
                Evaluation for: <strong className="text-white">{cargo.name}</strong> ({Number(inputs.quantity).toLocaleString()} MT)
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1.5">
              Multi-Source Bulk Cargo Procurement Matrix
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Evaluating global FOB export prices against ocean freight rates, rail evacuation tariffs, and coal quality penalties (Ash, Moisture, CV) to compute true landed cost at SAIL plants.
            </p>
          </div>

          {/* Key Principle Banner */}
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-3 max-w-md text-xs text-cyan-200">
            <div className="font-bold flex items-center gap-1.5 text-cyan-300 mb-1">
              <Info className="w-4 h-4 text-cyan-400" />
              Core Procurement Principle:
            </div>
            <p className="text-[11.5px] leading-relaxed text-slate-300">
              "The cheapest raw material at mine head/FOB export port is often not the cheapest once ocean freight, distance ton-miles, and calorific value normalization are accounted for."
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Landed Cost Comparison Chart */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              Delivered Landed Cost Breakdown (₹ / MT at SAIL Plant)
            </h3>
            <span className="text-xs text-slate-400">
              Stacked comparison showing FOB Material + Ocean Freight + Port & Rail Tariffs
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-sm bg-sail-600"></span> FOB Cost
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-sm bg-cyan-500"></span> Ocean Freight
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded-sm bg-emerald-500"></span> Port & Rail
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="country" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `₹${v.toLocaleString()}`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f1d38', borderColor: '#2e66b4', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                formatter={(value, name) => [`₹${Number(value).toLocaleString()} / MT`, name]}
              />
              <Bar dataKey="fobCostInr" name="FOB Mine Material" stackId="a" fill="#254e8e" />
              <Bar dataKey="oceanFreightInr" name="Ocean Freight & Surcharges" stackId="a" fill="#06b6d4" />
              <Bar dataKey="portAndRailInr" name="Indian Port & Rake Tariff" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Global Sourcing Comparison Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {procurementComparison.map((source) => {
          const isCurrentOrigin = source.id === inputs.originId;
          const isSelected = source.id === selectedSourceId;

          return (
            <div
              key={source.id}
              onClick={() => setSelectedSourceId(source.id)}
              className={`bg-[#0b172e] border rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-card-dark ${
                isSelected
                  ? 'border-cyan-400 ring-1 ring-cyan-400/40 bg-sail-900/90'
                  : 'border-sail-700/50 hover:border-sail-500'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between pb-3 border-b border-sail-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-white">{source.country}</span>
                    {source.isLowestLandedCost && (
                      <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30 flex items-center gap-1">
                        <Award className="w-3 h-3" /> BEST VALUE
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-cyan-300 font-mono mt-0.5">
                    {source.originPort}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-semibold text-slate-400">Total Landed</div>
                  <div className="text-base font-black text-white font-mono">
                    ₹{source.totalCostInrCr} Cr
                  </div>
                </div>
              </div>

              {/* Cost & Freight Specs */}
              <div className="mt-3.5 space-y-2 text-xs">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">FOB Price:</span>
                  <span className="font-mono font-semibold text-white">${source.fobPriceUsd} / MT</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Ocean Freight Est:</span>
                  <span className="font-mono font-semibold text-cyan-300">${source.freightEstimateUsd} / MT</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Landed Cost / MT:</span>
                  <span className="font-mono font-bold text-emerald-400">₹{source.landedCostPerMtInr.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Ocean Transit ETA:</span>
                  <span className="font-mono text-slate-200">{source.transitDaysApprox} Days</span>
                </div>
              </div>

              {/* Quality Indicators (Ash, Moisture, CV) */}
              <div className="mt-4 pt-3 border-t border-sail-800/80 grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="bg-sail-950/70 p-1.5 rounded-lg border border-sail-800">
                  <div className="text-slate-400 text-[10px] flex items-center justify-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" /> CV
                  </div>
                  <div className="font-bold font-mono text-white mt-0.5">{source.calorificValueKcal}</div>
                  <div className="text-[9px] text-slate-500">kcal/kg</div>
                </div>
                <div className="bg-sail-950/70 p-1.5 rounded-lg border border-sail-800">
                  <div className="text-slate-400 text-[10px]">Ash Content</div>
                  <div className="font-bold font-mono text-slate-200 mt-0.5">{source.ashPercentage}%</div>
                  <div className="text-[9px] text-slate-500">dry basis</div>
                </div>
                <div className="bg-sail-950/70 p-1.5 rounded-lg border border-sail-800">
                  <div className="text-slate-400 text-[10px] flex items-center justify-center gap-1">
                    <Droplet className="w-3 h-3 text-blue-400" /> Moisture
                  </div>
                  <div className="font-bold font-mono text-slate-200 mt-0.5">{source.moisturePercentage}%</div>
                  <div className="text-[9px] text-slate-500">total AR</div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4">
                {isCurrentOrigin ? (
                  <div className="w-full py-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-lg text-center text-xs font-bold flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Currently Active Source
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplySource(source.id);
                    }}
                    className="w-full py-2 bg-sail-800 hover:bg-sail-700 active:bg-sail-900 border border-sail-600 text-slate-200 hover:text-white rounded-lg text-center text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Select for Active Plan</span>
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
