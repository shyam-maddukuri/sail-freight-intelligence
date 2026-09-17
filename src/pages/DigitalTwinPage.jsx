import React, { useState } from 'react';
import { useFreight } from '../context/FreightContext';
import { 
  Ship, 
  Anchor, 
  Compass, 
  Train, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Clock, 
  Waves, 
  Fuel, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Sliders, 
  RotateCcw,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

export default function DigitalTwinPage() {
  const { 
    plan, 
    inputs, 
    fleetVessels, 
    destinationPorts, 
    digitalTwinSelection, 
    setDigitalTwinSelection, 
    liveDigitalTwin,
    setActiveTab
  } = useFreight();

  const { origin } = plan;
  const { 
    vessel, 
    destination, 
    compatibilityStatus, 
    badgeColor, 
    primaryReason, 
    constraintViolations, 
    constraintWarnings, 
    constraintPasses, 
    draftClearance, 
    loaClearance, 
    capacityUtilizationPct, 
    metrics, 
    journeyStages, 
    timelineMilestones 
  } = liveDigitalTwin;

  const [activeTabSub, setActiveTabSub] = useState('journey'); // 'journey' | 'timeline' | 'specs'

  const handleVesselChange = (vesselId) => {
    setDigitalTwinSelection(prev => ({ ...prev, vesselId }));
  };

  const handlePortChange = (destinationId) => {
    setDigitalTwinSelection(prev => ({ ...prev, destinationId }));
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-400 bg-cyan-500/20 border border-cyan-500/40 px-3 py-0.5 rounded-full flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                Feature 2 • Dynamic Maritime Twin
              </span>
              <span className="text-xs text-slate-400">
                End-to-End Voyage & Vessel-Port Physical Matcher
              </span>
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-white tracking-tight mt-1.5">
              Port & Vessel Digital Twin
            </h1>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Real-time physical simulation modeling vessel hydrodynamics (draft, beam, LOA, DWT) against destination port navigational restrictions, congestion queuing, and multi-stage voyage turnaround timeline.
            </p>
          </div>

          {/* Compatibility Status Pill Banner */}
          <div className={`p-4 rounded-xl border flex items-center gap-3.5 shadow-glow-sm ${
            compatibilityStatus === 'Compatible'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : compatibilityStatus === 'Warning'
              ? 'bg-amber-950/40 border-amber-500/40 text-amber-300'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
          }`}>
            <div className={`p-2.5 rounded-xl ${
              compatibilityStatus === 'Compatible'
                ? 'bg-emerald-500/20 text-emerald-400'
                : compatibilityStatus === 'Warning'
                ? 'bg-amber-500/20 text-amber-400'
                : 'bg-rose-500/20 text-rose-400'
            }`}>
              {compatibilityStatus === 'Compatible' ? (
                <CheckCircle2 className="w-6 h-6" />
              ) : compatibilityStatus === 'Warning' ? (
                <AlertTriangle className="w-6 h-6" />
              ) : (
                <XCircle className="w-6 h-6" />
              )}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider opacity-80 block">
                Compatibility Assessment
              </span>
              <div className="text-lg font-black tracking-tight">
                {compatibilityStatus === 'Compatible' ? '100% COMPATIBLE' : compatibilityStatus === 'Warning' ? 'OPERATIONAL WARNING' : 'NOT COMPATIBLE'}
              </div>
              <span className="text-[11px] font-mono opacity-90">
                Draft Margin: {draftClearance > 0 ? `+${draftClearance}m` : `${draftClearance}m`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Vessel & Port Selection Controls */}
      <div className="bg-[#0b172e] border border-cyan-500/30 rounded-2xl p-5 shadow-card-dark">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 mb-4 border-b border-sail-800">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-cyan-400" />
              Interactive Vessel & Destination Port Selectors
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Switch vessels or Indian East Coast discharge ports to immediately test physical compatibility and operational turnaround
            </p>
          </div>

          <button
            onClick={() => setDigitalTwinSelection({
              vesselId: plan.recommendedVessel.id,
              destinationId: plan.destination.id
            })}
            className="text-xs bg-sail-800 hover:bg-sail-700 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-sail-600 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Optimal Pairing</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 1. Vessel Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Ship className="w-4 h-4 text-cyan-400" />
                Select Bulk Carrier Vessel Class:
              </span>
              <span className="text-cyan-300 font-mono text-[11px]">
                {vessel.vesselType} ({vessel.capacityDwt.toLocaleString()} DWT)
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {fleetVessels.map((v) => {
                const isSelected = v.id === vessel.id;
                return (
                  <button
                    key={v.id}
                    onClick={() => handleVesselChange(v.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-950/40 text-white ring-1 ring-cyan-400/40'
                        : 'border-sail-700/60 bg-sail-900/60 hover:bg-sail-800/80 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{v.vesselName}</div>
                    <div className="text-[10px] text-cyan-300 font-medium truncate">{v.vesselType}</div>
                    <div className="text-[9.5px] font-mono text-slate-400 mt-1">
                      Draft: {v.draftMeters}m | LOA: {v.loaMeters}m
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Port Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Anchor className="w-4 h-4 text-emerald-400" />
                Select East Coast Indian Discharge Port:
              </span>
              <span className="text-emerald-300 font-mono text-[11px]">
                {destination.name} (Max {destination.maxDraft}m Draft)
              </span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {destinationPorts.map((p) => {
                const isSelected = p.id === destination.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handlePortChange(p.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-950/40 text-white ring-1 ring-emerald-400/40'
                        : 'border-sail-700/60 bg-sail-900/60 hover:bg-sail-800/80 text-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold truncate">{p.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-emerald-300 font-medium truncate">{p.state}</div>
                    <div className="text-[9.5px] font-mono text-slate-400 mt-1">
                      Max Draft: {p.maxDraft}m | Queue: {p.avgWaitingDays}d
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* WHY STATEMENT & Constraint Evaluation Breakdown */}
      <div className={`border-2 rounded-2xl p-5 shadow-card-dark transition-all ${
        compatibilityStatus === 'Compatible'
          ? 'bg-emerald-950/20 border-emerald-500/40'
          : compatibilityStatus === 'Warning'
          ? 'bg-amber-950/20 border-amber-500/40'
          : 'bg-rose-950/20 border-rose-500/40'
      }`}>
        <div className="flex items-start gap-3.5">
          <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
            compatibilityStatus === 'Compatible'
              ? 'bg-emerald-500/20 text-emerald-400'
              : compatibilityStatus === 'Warning'
              ? 'bg-amber-500/20 text-amber-400'
              : 'bg-rose-500/20 text-rose-400'
          }`}>
            <Info className="w-5 h-5" />
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-white">
                Vessel-Port Compatibility Rationale:
              </span>
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                compatibilityStatus === 'Compatible'
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : compatibilityStatus === 'Warning'
                  ? 'bg-amber-500/20 text-amber-300'
                  : 'bg-rose-500/20 text-rose-300'
              }`}>
                {compatibilityStatus}
              </span>
            </div>

            <p className="text-sm text-slate-100 leading-relaxed font-medium">
              "{primaryReason}"
            </p>
          </div>
        </div>

        {/* Decomposed Constraints Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 pt-4 border-t border-sail-800/80">
          
          {/* Constraint 1: Draft */}
          <div className="bg-sail-900/80 p-3.5 rounded-xl border border-sail-700/60">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Draft vs Port Limit</span>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {vessel.draftMeters}m <span className="text-slate-400 text-xs font-normal">vs max</span> {destination.maxDraft}m
            </div>
            <div className="text-[11px] font-mono mt-1 font-semibold">
              <span className={draftClearance >= 0.3 ? 'text-emerald-400' : draftClearance >= 0 ? 'text-amber-400' : 'text-rose-400'}>
                Clearance: {draftClearance > 0 ? `+${draftClearance}m` : `${draftClearance}m`}
              </span>
            </div>
          </div>

          {/* Constraint 2: LOA Berth */}
          <div className="bg-sail-900/80 p-3.5 rounded-xl border border-sail-700/60">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">LOA vs Berth Length</span>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {vessel.loaMeters}m <span className="text-slate-400 text-xs font-normal">vs max</span> {destination.maxLoa}m
            </div>
            <div className="text-[11px] font-mono mt-1 font-semibold">
              <span className={loaClearance >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                Berth Margin: {loaClearance > 0 ? `+${loaClearance}m` : `${loaClearance}m`}
              </span>
            </div>
          </div>

          {/* Constraint 3: Capacity Match */}
          <div className="bg-sail-900/80 p-3.5 rounded-xl border border-sail-700/60">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Parcel / DWT Utilization</span>
            <div className="text-sm font-bold font-mono text-white mt-0.5">
              {Number(inputs.quantity).toLocaleString()} <span className="text-slate-400 text-xs font-normal">/ {vessel.capacityDwt.toLocaleString()} MT</span>
            </div>
            <div className="text-[11px] font-mono mt-1 font-semibold">
              <span className={capacityUtilizationPct >= 60 && capacityUtilizationPct <= 100 ? 'text-emerald-400' : 'text-amber-400'}>
                {capacityUtilizationPct}% Stowage Factor
              </span>
            </div>
          </div>

          {/* Constraint 4: Turnaround Duration */}
          <div className="bg-sail-900/80 p-3.5 rounded-xl border border-sail-700/60">
            <span className="text-[10px] uppercase font-semibold text-slate-400 block">Total Voyage Turnaround</span>
            <div className="text-sm font-bold font-mono text-cyan-300 mt-0.5">
              {metrics.totalTurnaroundDays} Days
            </div>
            <div className="text-[11px] font-mono text-slate-400 mt-1">
              {metrics.steamingDays}d sea + {metrics.dischargeDays}d port
            </div>
          </div>

        </div>
      </div>

      {/* Interactive Visual Journey: Loading Port -> Sea Voyage -> Destination Port -> Cargo Unloading */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-5 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Interactive Visual Journey: Origin to SAIL Plant
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sequential 4-phase maritime simulation with throughput rates and weather delays
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 bg-sail-900/90 px-3 py-1 rounded-lg border border-sail-700">
            <Waves className="w-3.5 h-3.5 text-cyan-400" />
            <span>Total Sea Distance: {metrics.distanceNM.toLocaleString()} Nautical Miles</span>
          </div>
        </div>

        {/* 4 Connected Visual Journey Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {journeyStages.map((stage, idx) => {
            const icons = {
              Anchor: Anchor,
              Ship: Ship,
              Compass: Compass,
              Train: Train
            };
            const Icon = icons[stage.icon] || Ship;

            return (
              <div
                key={stage.id}
                className="bg-sail-900/85 border border-sail-700/70 hover:border-cyan-500/40 rounded-xl p-4 flex flex-col justify-between relative shadow-sm transition-all"
              >
                {/* Step number badge */}
                <div className="flex items-center justify-between pb-2.5 border-b border-sail-800">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white">{stage.title}</span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    stage.statusColor === 'emerald'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : stage.statusColor === 'rose'
                      ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                      : 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
                  }`}>
                    {stage.status}
                  </span>
                </div>

                {/* Location */}
                <div className="my-3">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold block">Operation Area:</span>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5 leading-snug">
                    {stage.location}
                  </div>
                  <div className="text-base font-black font-mono text-cyan-300 mt-2">
                    {stage.durationDays} Days <span className="text-xs font-normal text-slate-400">({stage.durationHours} hrs)</span>
                  </div>
                </div>

                {/* Sub details */}
                <div className="space-y-1.5 pt-2.5 border-t border-sail-800/80 text-[11px]">
                  {stage.details.map((d, dIdx) => (
                    <div key={dIdx} className="flex justify-between items-center text-slate-300">
                      <span className="text-slate-400 text-[10.5px]">{d.label}:</span>
                      <span className="font-mono font-semibold text-white">{d.value}</span>
                    </div>
                  ))}
                </div>

                {/* Stage Arrow for Desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-sail-800 border border-sail-600 text-cyan-400 flex items-center justify-center shadow-md">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Turnaround Timeline & Milestone Progress Simulation */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              Voyage & Turnaround Milestone Timeline Simulation
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulated sequence: Loading ➔ Departure ➔ Steaming ➔ Arrival ➔ Port Waiting ➔ Discharge ➔ Idle Contingency
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">Total Turnaround Window</span>
            <div className="text-lg font-black font-mono text-emerald-400">
              {metrics.totalJourneyHours} Hours ({metrics.totalTurnaroundDays} Days)
            </div>
          </div>
        </div>

        {/* Milestone Progression Bar */}
        <div className="w-full h-4 bg-sail-950 rounded-full overflow-hidden flex border border-sail-800 p-0.5">
          {timelineMilestones.map((m, idx) => {
            const widthPct = (m.durationHours / metrics.totalJourneyHours) * 100;
            const colors = [
              'bg-blue-500',
              'bg-indigo-500',
              'bg-cyan-400',
              'bg-teal-400',
              'bg-amber-400',
              'bg-emerald-400',
              'bg-slate-500'
            ];
            return (
              <div
                key={idx}
                className={`${colors[idx % colors.length]} h-full transition-all`}
                style={{ width: `${widthPct}%` }}
                title={`${m.name}: ${m.durationHours} hrs (${Math.round(widthPct)}%)`}
              />
            );
          })}
        </div>

        {/* Milestone Cards Breakdown */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-4">
          {timelineMilestones.map((m, idx) => {
            const dotColors = [
              'bg-blue-400',
              'bg-indigo-400',
              'bg-cyan-400',
              'bg-teal-400',
              'bg-amber-400',
              'bg-emerald-400',
              'bg-slate-400'
            ];

            return (
              <div key={idx} className="bg-sail-900/70 p-3 rounded-xl border border-sail-700/50">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className={`w-2 h-2 rounded-full ${dotColors[idx % dotColors.length]}`}></span>
                  <span className="text-[11px] font-bold text-white truncate">{m.name}</span>
                </div>
                <div className="text-xs font-mono font-black text-cyan-300">
                  {m.durationHours} hrs
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                  {Math.round((m.durationHours / 24) * 10) / 10} days
                </div>
                <div className="text-[9.5px] text-slate-500 mt-1 truncate">
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Telemetry Specs Grid: Vessel vs Port */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left: Vessel Technical Specifications */}
        <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-sail-800">
            <Ship className="w-4 h-4 text-cyan-400" />
            Vessel Digital Twin Telemetry ({vessel.vesselName})
          </h3>

          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Vessel Class</span>
              <div className="font-bold text-white mt-0.5">{vessel.vesselType}</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Total Deadweight (DWT)</span>
              <div className="font-bold font-mono text-cyan-300 mt-0.5">{vessel.capacityDwt.toLocaleString()} MT</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Laden Draft</span>
              <div className="font-bold font-mono text-white mt-0.5">{vessel.draftMeters} meters</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Length Overall (LOA)</span>
              <div className="font-bold font-mono text-white mt-0.5">{vessel.loaMeters} meters</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Molded Beam</span>
              <div className="font-bold font-mono text-white mt-0.5">{vessel.beamMeters} meters</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Daily VLSFO Fuel Burn</span>
              <div className="font-bold font-mono text-amber-300 mt-0.5">{vessel.fuelConsumptionTpd} MT / day</div>
            </div>
          </div>
        </div>

        {/* Right: Port Navigational & Infrastructure Limits */}
        <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-sail-800">
            <Anchor className="w-4 h-4 text-emerald-400" />
            Port Infrastructure Envelope ({destination.name})
          </h3>

          <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Max Permissible Draft</span>
              <div className="font-bold font-mono text-emerald-400 mt-0.5">{destination.maxDraft} meters</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Max Berth LOA</span>
              <div className="font-bold font-mono text-white mt-0.5">{destination.maxLoa} meters</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Discharge Handling Rate</span>
              <div className="font-bold font-mono text-cyan-300 mt-0.5">{destination.dischargeRateTpd.toLocaleString()} TPD</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Average Berth Waiting</span>
              <div className="font-bold font-mono text-slate-200 mt-0.5">{destination.avgWaitingDays} Days</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Congestion Risk Level</span>
              <div className="font-bold text-white mt-0.5">{destination.congestionRisk}</div>
            </div>
            <div className="bg-sail-950/70 p-3 rounded-xl border border-sail-800">
              <span className="text-[10px] text-slate-400 uppercase">Rail Evacuation Connectivity</span>
              <div className="font-bold font-mono text-emerald-400 mt-0.5">{destination.railConnectivityScore}% Score</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
