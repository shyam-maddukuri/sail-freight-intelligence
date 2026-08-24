import React, { useState } from 'react';
import { useFreight } from '../context/FreightContext';
import MaritimeMap from '../components/common/MaritimeMap';
import { 
  MapPin, 
  Compass, 
  Anchor, 
  Ship, 
  Award, 
  ArrowRight, 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle2, 
  Waves,
  Building2,
  Train
} from 'lucide-react';

export default function RouteOptimizationPage() {
  const { plan, inputs, handleInputChange, updatePlan, destinationPorts } = useFreight();
  const { routeOptions, origin, destination } = plan;
  const [selectedRouteId, setSelectedRouteId] = useState('ROUTE-A');

  const handleSelectRoute = (destPortName) => {
    const targetPort = destinationPorts.find(p => p.name.includes(destPortName) || destPortName.includes(p.name));
    if (targetPort) {
      handleInputChange('destinationId', targetPort.id);
      updatePlan({ ...inputs, destinationId: targetPort.id });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                Maritime Route & Port Selection AI
              </span>
              <span className="text-xs text-slate-400">
                Origin: <strong className="text-white">{origin.portName} ({origin.country})</strong>
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1.5">
              East Coast Indian Port Selection & Route Optimization
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Multi-port trade-off modeling comparing sea transit time, port congestion waiting days, draft lightering risk, mechanized discharge rates, and Indian Railways rake tariffs to SAIL plants.
            </p>
          </div>

          <div className="bg-sail-900/90 border border-sail-700/60 rounded-xl p-3.5 flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Recommended Gateway</span>
              <div className="text-sm font-bold text-white font-mono">
                {destination.name}
              </div>
              <span className="text-[11px] text-emerald-300">
                Score: 92/100 (Optimal for {destination.primaryServePlant.split('&')[0]})
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Maritime Map Visualizer */}
      <MaritimeMap />

      {/* Route Options Comparison Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Comparative Route Performance Cards
          </h3>
          <span className="text-xs text-slate-400">
            Click a card to switch active destination port
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {routeOptions.map((route, idx) => {
            const isSelected = destination.name.includes(route.destinationPort) || route.destinationPort.includes(destination.name);
            const isOptimal = idx === 0;

            return (
              <div
                key={route.routeId}
                onClick={() => handleSelectRoute(route.destinationPort)}
                className={`bg-[#0b172e] border rounded-2xl p-5 cursor-pointer transition-all duration-200 shadow-card-dark ${
                  isSelected
                    ? 'border-cyan-400 ring-1 ring-cyan-400/40 bg-sail-900/95'
                    : 'border-sail-700/50 hover:border-sail-500'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-sail-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-cyan-400">{route.routeId}</span>
                      <span className="text-sm font-bold text-white">{route.destinationPort}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {origin.portName.split(' ')[0]} ➔ {route.destinationPort}
                    </div>
                  </div>

                  {isOptimal ? (
                    <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-emerald-500/40 flex items-center gap-1">
                      <Award className="w-3 h-3" /> OPTIMAL
                    </span>
                  ) : (
                    <span className="text-xs font-bold font-mono text-slate-400">
                      Score: {route.score}
                    </span>
                  )}
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 my-3.5 text-xs">
                  <div className="bg-sail-950/60 p-2.5 rounded-lg border border-sail-800">
                    <span className="text-[10px] text-slate-400 block">Total Cost:</span>
                    <span className="text-sm font-bold font-mono text-white">₹{route.estimatedCostInrCr} Cr</span>
                  </div>
                  <div className="bg-sail-950/60 p-2.5 rounded-lg border border-sail-800">
                    <span className="text-[10px] text-slate-400 block">Total Transit:</span>
                    <span className="text-sm font-bold font-mono text-cyan-300">{route.transitDays} Days</span>
                  </div>
                  <div className="bg-sail-950/60 p-2.5 rounded-lg border border-sail-800">
                    <span className="text-[10px] text-slate-400 block">Risk Profile:</span>
                    <span className={`text-xs font-bold ${route.riskLevel === 'Low' ? 'text-emerald-400' : route.riskLevel === 'Medium' ? 'text-amber-400' : 'text-rose-400'}`}>
                      {route.riskLevel} Risk
                    </span>
                  </div>
                  <div className="bg-sail-950/60 p-2.5 rounded-lg border border-sail-800">
                    <span className="text-[10px] text-slate-400 block">Optimization Score:</span>
                    <span className="text-sm font-bold font-mono text-emerald-400">{route.score}/100</span>
                  </div>
                </div>

                {/* Plant Connectivity */}
                <div className="text-[11px] text-slate-300 pt-2 border-t border-sail-800/80 flex items-center justify-between">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Train className="w-3 h-3 text-cyan-400" /> Serves:
                  </span>
                  <span className="font-semibold text-white truncate max-w-[180px]">{route.primaryServePlant}</span>
                </div>

                {/* Apply Button */}
                <div className="mt-3">
                  {isSelected ? (
                    <div className="w-full py-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-lg text-center text-xs font-bold flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Selected Port
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRoute(route.destinationPort);
                      }}
                      className="w-full py-1.5 bg-sail-800 hover:bg-sail-700 text-slate-300 hover:text-white rounded-lg text-center text-xs font-semibold border border-sail-600 transition-colors"
                    >
                      Select Route
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Port Compatibility Factors Deep Dive Table */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Anchor className="w-4 h-4 text-cyan-400" />
              East Coast Indian Port Operational Constraints & Compatibility Factors
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Live operational parameters governing vessel berthing, turnaround velocity, and rail connectivity
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sail-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-sail-800">
              <tr>
                <th className="py-2.5 px-3">Port Name</th>
                <th className="py-2.5 px-3 font-mono">Max Permissible Draft</th>
                <th className="py-2.5 px-3">Berth Availability</th>
                <th className="py-2.5 px-3">Port Congestion</th>
                <th className="py-2.5 px-3 font-mono">Handling Capacity</th>
                <th className="py-2.5 px-3 font-mono">Avg Waiting Time</th>
                <th className="py-2.5 px-3">Rail Connectivity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sail-800 text-slate-200">
              {destinationPorts.map(port => {
                const isSelected = port.id === destination.id;
                return (
                  <tr key={port.id} className={isSelected ? 'bg-cyan-950/30' : 'hover:bg-sail-900/50'}>
                    <td className="py-3 px-3 font-bold text-white flex items-center gap-1.5">
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                      <span>{port.name}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-cyan-300 font-bold">{port.maxDraft} meters</td>
                    <td className="py-3 px-3 text-slate-300">{port.berthAvailability}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${port.congestionRisk.includes('Low') ? 'bg-emerald-500/15 text-emerald-300' : port.congestionRisk.includes('High') ? 'bg-rose-500/15 text-rose-300' : 'bg-amber-500/15 text-amber-300'}`}>
                        {port.congestionRisk}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">{port.dischargeRateTpd.toLocaleString()} TPD</td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-100">{port.avgWaitingDays} Days</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-12 h-1.5 bg-sail-950 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${port.railConnectivityScore}%` }}></div>
                        </div>
                        <span className="font-mono text-[10px] text-emerald-400">{port.railConnectivityScore}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
