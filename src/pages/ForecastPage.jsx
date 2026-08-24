import React, { useState } from 'react';
import { useFreight } from '../context/FreightContext';
import { 
  TrendingUp, 
  Sparkles, 
  HelpCircle, 
  Fuel, 
  Factory, 
  Anchor, 
  Ship, 
  CloudRain, 
  Compass, 
  AlertCircle,
  BarChart3,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { FORECAST_DRIVERS } from '../data/sampleData';

export default function ForecastPage() {
  const { plan, inputs } = useFreight();
  const { metrics, historicalForecastSeries, origin, destination } = plan;
  const [selectedHorizon, setSelectedHorizon] = useState('90d');

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                AI Time-Series Forecasting
              </span>
              <span className="text-xs text-slate-400">
                Route: <strong className="text-white">{origin.portName} ➔ {destination.name}</strong>
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1.5">
              Intelligent Freight Rate Forecasting Engine
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Multivariate deep time-series neural models trained on Baltic Dry Index (BDI), Singapore VLSFO bunker benchmarks, fleet AIS vessel positions, and Asian steel mill restocking cycles.
            </p>
          </div>

          {/* Quick Rate Metrics Ribbon */}
          <div className="flex items-center gap-3 bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5 shadow-sm">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold block">Current Spot Rate</span>
              <span className="text-lg font-bold font-mono text-slate-200">
                ${metrics.currentFreightRateUsd}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">/ MT</span>
            </div>

            <div className="h-8 w-px bg-sail-700 mx-1"></div>

            <div>
              <span className="text-[10px] text-cyan-400 uppercase font-semibold block">30-Day Forecast</span>
              <span className="text-lg font-black font-mono text-cyan-300">
                ${metrics.forecastFreightRateUsd}
              </span>
              <span className="text-[10px] text-slate-400 ml-1">/ MT</span>
            </div>

            <div className="h-8 w-px bg-sail-700 mx-1"></div>

            <div>
              <span className="text-[10px] text-rose-400 uppercase font-semibold block">Expected Shift</span>
              <span className="text-sm font-bold font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
                +{metrics.expectedFreightChangePct}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chart: Historical vs Forecast Freight Rate with 95% CI Band */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              Freight Rate Trajectory & 95% Confidence Interval Band ($ / MT)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical 6-month actuals combined with 90-day probabilistic predictive trajectory
            </p>
          </div>

          {/* Horizon Selector */}
          <div className="flex items-center bg-sail-900/90 p-1 rounded-lg border border-sail-700/60 text-xs">
            <button
              onClick={() => setSelectedHorizon('30d')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                selectedHorizon === '30d' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              30-Day Horizon
            </button>
            <button
              onClick={() => setSelectedHorizon('60d')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                selectedHorizon === '60d' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              60-Day Horizon
            </button>
            <button
              onClick={() => setSelectedHorizon('90d')}
              className={`px-3 py-1 rounded font-medium transition-all ${
                selectedHorizon === '90d' ? 'bg-cyan-500 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Full Forecast Series
            </button>
          </div>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={historicalForecastSeries} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <defs>
                <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="date" stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} />
              <YAxis domain={['auto', 'auto']} stroke="#94a3b8" tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f1d38', borderColor: '#2e66b4', borderRadius: '8px', color: '#fff', fontSize: '11px' }}
                formatter={(value, name) => [value ? `$${value} / MT` : '—', name]}
              />
              <Legend wrapperStyle={{ fontSize: '12px', color: '#cbd5e1', paddingTop: '10px' }} />
              
              {/* Confidence Interval Area */}
              <Area type="monotone" dataKey="upperBand" stroke="none" fill="url(#confidenceBand)" name="95% Confidence Band (Upper)" />
              <Area type="monotone" dataKey="lowerBand" stroke="none" fill="#0b172e" fillOpacity={1} name="95% Confidence Band (Lower)" />

              {/* Historical Line */}
              <Line
                type="monotone"
                dataKey="historical"
                stroke="#94a3b8"
                strokeWidth={3}
                dot={{ r: 4, fill: '#94a3b8' }}
                activeDot={{ r: 6 }}
                name="Historical Freight Rate"
              />

              {/* AI Forecast Line */}
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="#06b6d4"
                strokeWidth={3.5}
                strokeDasharray="6 4"
                dot={{ r: 5, fill: '#06b6d4' }}
                activeDot={{ r: 7 }}
                name="AI Model Predicted Trajectory"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 pt-3 border-t border-sail-800 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
          <span>* Model incorporates Baltic Panamax Index (BPI) 4TC and historical seasonal cyclone weighting.</span>
          <span className="text-cyan-300 font-mono">Mean Absolute Percentage Error (MAPE): 3.2%</span>
        </div>
      </div>

      {/* "Why is the freight rate expected to change?" Explainable Insights Section */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-sail-800">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Why is the Freight Rate Expected to Change?
            </h3>
            <p className="text-xs text-slate-400">
              Explainable AI (XAI) feature attribution revealing the key macro and maritime drivers pushing rates up +5.97%
            </p>
          </div>
        </div>

        {/* Feature Importance & Drivers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FORECAST_DRIVERS.map((driver, idx) => (
            <div
              key={idx}
              className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4 flex flex-col justify-between hover:border-cyan-500/40 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-white">{driver.factor}</span>
                  <span
                    className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded shrink-0 ${
                      driver.direction === 'up'
                        ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {driver.impact}
                  </span>
                </div>

                <p className="text-[11.5px] text-slate-300 leading-relaxed mb-3">
                  {driver.description}
                </p>
              </div>

              <div className="pt-2 border-t border-sail-800">
                <div className="flex justify-between items-center text-[10px] text-slate-400 mb-1">
                  <span>Model Attribution Weight</span>
                  <span className="font-mono text-cyan-300 font-bold">{driver.weight}%</span>
                </div>
                <div className="w-full h-1.5 bg-sail-950 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      driver.direction === 'up' ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${driver.weight * 2.5}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actionable Executive Advisory */}
        <div className="mt-5 p-4 bg-sail-950/80 rounded-xl border border-cyan-500/30 text-xs text-slate-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-white block mb-0.5">Procurement Timing Recommendation:</strong>
            Because rates are projected to rise into November and December 2026 due to winter coking coal stockpiling and bunker firmness, SAIL is strongly advised to execute forward charter contracts in the <strong>{plan.metrics.charterWindow}</strong> window rather than relying on spot fixtures.
          </div>
        </div>
      </div>

    </div>
  );
}
