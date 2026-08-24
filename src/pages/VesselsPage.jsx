import React, { useState } from 'react';
import { useFreight } from '../context/FreightContext';
import { 
  Ship, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Compass, 
  Anchor, 
  Sparkles, 
  Fuel, 
  Scale,
  Award,
  ArrowRight,
  Info,
  ShieldCheck
} from 'lucide-react';

export default function VesselsPage() {
  const { plan, inputs, destinationPorts } = useFreight();
  const { vesselOptions, recommendedVessel, destination, cargo } = plan;
  const [selectedVesselId, setSelectedVesselId] = useState(recommendedVessel.id);

  const activeVessel = vesselOptions.find(v => v.id === selectedVesselId) || recommendedVessel;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                Vessel Charter Optimization
              </span>
              <span className="text-xs text-slate-400">
                Destination Port: <strong className="text-white">{destination.name}</strong> (Max Draft: {destination.maxDraft}m)
              </span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight mt-1.5">
              Available Vessel Options & Port Compatibility Matrix
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl">
              Multi-criteria evaluation comparing vessel deadweight tonnage (DWT), laden draft limits, beam/LOA restrictions, daily charter hire rates, and port turnaround speeds.
            </p>
          </div>

          <div className="bg-sail-900/90 border border-cyan-500/30 rounded-xl p-3.5 flex items-center gap-3">
            <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Top Ranked Charter</span>
              <div className="text-sm font-bold text-white font-mono">
                {recommendedVessel.vesselName} ({recommendedVessel.vesselType})
              </div>
              <span className="text-[11px] text-emerald-300">
                Suitability Score: {recommendedVessel.suitabilityScore}/100
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Vessel Comparison Table */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Ship className="w-4 h-4 text-cyan-400" />
              Charter Fleet Evaluation Matrix
            </h3>
            <span className="text-xs text-slate-400">
              Evaluated against {Number(inputs.quantity).toLocaleString()} MT {cargo.name} to {destination.name}
            </span>
          </div>

          <span className="text-xs text-slate-400">
            Click any vessel row to view deep technical specs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sail-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-sail-800">
              <tr>
                <th className="py-3 px-3.5">Vessel Name</th>
                <th className="py-3 px-3">Vessel Type</th>
                <th className="py-3 px-3 font-mono">Capacity (DWT)</th>
                <th className="py-3 px-3 font-mono">Draft (m)</th>
                <th className="py-3 px-3 font-mono">LOA (m)</th>
                <th className="py-3 px-3 font-mono">Charter Cost</th>
                <th className="py-3 px-3">Port Compatibility</th>
                <th className="py-3 px-3">Risk</th>
                <th className="py-3 px-3 text-right">Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sail-800 text-slate-200">
              {vesselOptions.map((vessel) => {
                const isRecommended = vessel.id === recommendedVessel.id;
                const isSelected = vessel.id === activeVessel.id;

                return (
                  <tr
                    key={vessel.id}
                    onClick={() => setSelectedVesselId(vessel.id)}
                    className={`cursor-pointer transition-colors ${
                      isRecommended
                        ? 'bg-cyan-950/40 hover:bg-cyan-900/40'
                        : isSelected
                        ? 'bg-sail-900 hover:bg-sail-800'
                        : 'hover:bg-sail-900/50'
                    }`}
                  >
                    <td className="py-3.5 px-3.5 font-bold text-white flex items-center gap-2">
                      {isRecommended && <Award className="w-4 h-4 text-cyan-400 shrink-0" />}
                      <span>{vessel.vesselName}</span>
                    </td>
                    <td className="py-3.5 px-3 text-cyan-300 font-medium">{vessel.vesselType}</td>
                    <td className="py-3.5 px-3 font-mono">{vessel.capacityDwt.toLocaleString()} MT</td>
                    <td className="py-3.5 px-3 font-mono">
                      <span className={vessel.draftMeters > destination.maxDraft ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                        {vessel.draftMeters} m
                      </span>
                    </td>
                    <td className="py-3.5 px-3 font-mono">{vessel.loaMeters} m</td>
                    <td className="py-3.5 px-3 font-mono font-bold text-white">₹{vessel.estimatedCostInrCr} Cr</td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-sail-950 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              vessel.portCompatibilityPct >= 90 ? 'bg-emerald-400' : vessel.portCompatibilityPct >= 75 ? 'bg-amber-400' : 'bg-rose-400'
                            }`}
                            style={{ width: `${vessel.portCompatibilityPct}%` }}
                          ></div>
                        </div>
                        <span className="font-mono text-[11px]">{vessel.portCompatibilityPct}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          vessel.riskLevel === 'Low'
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            : vessel.riskLevel === 'Medium'
                            ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {vessel.riskLevel}
                      </span>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {isRecommended ? (
                        <span className="bg-gradient-to-r from-cyan-600 to-sail-600 text-white font-extrabold text-[10px] px-3 py-1 rounded-full shadow-glow-sm tracking-wider">
                          RECOMMENDED
                        </span>
                      ) : vessel.recommendationTag === 'VIABLE ALTERNATIVE' ? (
                        <span className="bg-sail-800 text-slate-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-sail-700">
                          VIABLE
                        </span>
                      ) : (
                        <span className="bg-rose-500/15 text-rose-400 text-[10px] font-semibold px-2 py-0.5 rounded border border-rose-500/30">
                          RESTRICTED
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* "Why this vessel?" Explainability & Breakdown Section */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-sail-800">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">
              Why This Vessel? (Detailed Selection Logic)
            </h3>
            <p className="text-xs text-slate-400">
              Explainable multi-objective criteria justifying the recommendation of <strong className="text-cyan-300">{recommendedVessel.vesselName} ({recommendedVessel.vesselType})</strong>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Reason 1 */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Suitable Cargo Capacity</span>
            </div>
            <p className="text-[11.5px] text-slate-300 leading-relaxed">
              DWT of {recommendedVessel.capacityDwt.toLocaleString()} MT delivers optimal parcel stowage for {Number(inputs.quantity).toLocaleString()} MT without costly dead-freight or excess ballast.
            </p>
          </div>

          {/* Reason 2 */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Compatible Draft</span>
            </div>
            <p className="text-[11.5px] text-slate-300 leading-relaxed">
              Laden draft of {recommendedVessel.draftMeters}m offers a safe clearance margin under {destination.name}'s {destination.maxDraft}m limit, requiring no lightering.
            </p>
          </div>

          {/* Reason 3 */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Port Compatibility</span>
            </div>
            <p className="text-[11.5px] text-slate-300 leading-relaxed">
              Rated at {recommendedVessel.portCompatibilityPct}% compatibility. LOA ({recommendedVessel.loaMeters}m) fits mechanized coal discharge berths at {destination.name}.
            </p>
          </div>

          {/* Reason 4 */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Lower Estimated Cost</span>
            </div>
            <p className="text-[11.5px] text-slate-300 leading-relaxed">
              Total voyage charter cost of ₹{recommendedVessel.estimatedCostInrCr} Cr minimizes freight expenditure per tonne compared to larger or smaller alternatives.
            </p>
          </div>

          {/* Reason 5 */}
          <div className="bg-sail-900/80 border border-sail-700/60 rounded-xl p-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Lower Risk Exposure</span>
            </div>
            <p className="text-[11.5px] text-slate-300 leading-relaxed">
              High vessel reliability ({recommendedVessel.reliabilityScore}%) and modern fuel-efficient main engine (age {recommendedVessel.ageYears} yrs) reduce breakdown and delay risk.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
