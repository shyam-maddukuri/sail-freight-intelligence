import React from 'react';
import { useFreight } from '../../context/FreightContext';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Anchor, 
  Ship, 
  FileText, 
  CheckCircle2,
  Calendar,
  Building2
} from 'lucide-react';

export default function DecisionDossierModal() {
  const { isDossierOpen, setIsDossierOpen, plan, inputs, lastCalculatedAt } = useFreight();

  if (!isDossierOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const csvRows = [
      ['SAIL FREIGHT INTELLIGENCE - EXECUTIVE CHARTER DECISION DOSSIER'],
      ['Generated Date', new Date().toLocaleDateString(), 'Timestamp', lastCalculatedAt],
      ['Problem Statement', 'SIH26006 - Bulk Cargo Procurement & Charter Optimization'],
      [''],
      ['SHIPMENT SPECIFICATIONS'],
      ['Cargo Type', plan.cargo.name],
      ['Quantity (MT)', inputs.quantity],
      ['Origin Country / Port', `${plan.origin.country} - ${plan.origin.portName}`],
      ['Destination Port', plan.destination.name],
      ['Shipment Date', inputs.shipmentDate],
      [''],
      ['RECOMMENDED CHARTER STRATEGY'],
      ['Recommended Vessel', plan.recommendedVessel.vesselName],
      ['Vessel Class', plan.recommendedVessel.vesselType],
      ['Vessel DWT', plan.recommendedVessel.capacityDwt],
      ['Vessel Draft (m)', plan.recommendedVessel.draftMeters],
      ['Port Draft Limit (m)', plan.destination.maxDraft],
      ['Draft Clearance Margin (m)', Math.round((plan.destination.maxDraft - plan.recommendedVessel.draftMeters) * 10) / 10],
      ['Forecast Freight Rate ($/MT)', plan.metrics.forecastFreightRateUsd],
      ['Ocean Freight Total (₹ Cr)', plan.metrics.oceanFreightTotalInrCr],
      ['Estimated Total Landed Cost (₹ Cr)', plan.metrics.estimatedTotalCostInrCr],
      ['Landed Cost Per MT (₹)', plan.metrics.landedCostPerMtInr],
      ['Expected Transit Days', plan.metrics.expectedTransitDays],
      ['Overall Risk Score', `${plan.metrics.overallRiskScore}/100 (${plan.metrics.overallRiskLevel})`],
      ['Estimated Projected Savings (₹ Lakhs)', plan.metrics.estimatedSavingsLakhs],
      [''],
      ['EXPLAINABLE AI JUSTIFICATION'],
      ['Vessel Justification', plan.explainability.vesselReason],
      ['Port Routing Justification', plan.explainability.portRouteReason],
      ['Timing & Market Justification', plan.explainability.freightTimingReason]
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvRows.map(e => e.map(cell => `"${cell || ''}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SAIL_Charter_Dossier_${inputs.originId}_${inputs.destinationId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-[#0b172e] border border-sail-600 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="p-4 bg-[#081124] border-b border-sail-700/80 flex items-center justify-between no-print">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                SAIL Executive Charter Decision Dossier
              </h3>
              <span className="text-[11px] text-slate-400">
                Official Recommendation Brief for High-Power Procurement Committee
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-sail-800 hover:bg-sail-700 text-cyan-300 text-xs font-semibold px-3 py-1.5 rounded-lg border border-sail-600 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors shadow-glow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Dossier</span>
            </button>
            <button
              onClick={() => setIsDossierOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-sail-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Content Sheet (Printable Document) */}
        <div className="p-8 overflow-y-auto space-y-6 bg-[#070f20] text-slate-100 text-xs leading-relaxed font-sans">
          
          {/* Document Header */}
          <div className="border-b-2 border-sail-600 pb-4 flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Building2 className="w-6 h-6 text-cyan-400" />
                <span className="text-lg font-black tracking-tight text-white uppercase">
                  STEEL AUTHORITY OF INDIA LIMITED
                </span>
              </div>
              <div className="text-xs text-slate-400 mt-0.5">
                Central Bulk Raw Material Procurement & Shipping Logistics Division (CO-RM/LOG)
              </div>
              <div className="text-[11px] text-cyan-400 font-mono mt-1">
                Ref No: SAIL/HQ/CHARTER/2026/SIH-0825 • Confidential
              </div>
            </div>

            <div className="text-right text-[11px] text-slate-400 space-y-0.5">
              <div>Date: <span className="font-semibold text-white">{new Date().toLocaleDateString('en-GB')}</span></div>
              <div>System: <span className="text-emerald-400 font-mono">AI Optimizer v2.6</span></div>
              <div className="inline-block bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/30 text-[10px] mt-1">
                RECOMMENDATION APPROVED
              </div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-2 border-l-2 border-cyan-400 pl-2">
              1. EXECUTIVE DECISION SUMMARY
            </h4>
            <div className="bg-sail-900/80 rounded-xl p-4 border border-sail-700/60 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Recommended Vessel</span>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  {plan.recommendedVessel.vesselName}
                </div>
                <div className="text-[11px] text-cyan-400">{plan.recommendedVessel.vesselType} Class</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Forecast Freight Rate</span>
                <div className="text-sm font-bold text-cyan-300 font-mono mt-0.5">
                  ${plan.metrics.forecastFreightRateUsd} / MT
                </div>
                <div className="text-[11px] text-rose-400">Projected +{plan.metrics.expectedFreightChangePct}% Surge</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Total Landed Cost</span>
                <div className="text-sm font-bold text-white font-mono mt-0.5">
                  ₹{plan.metrics.estimatedTotalCostInrCr} Cr
                </div>
                <div className="text-[11px] text-slate-300">₹{plan.metrics.landedCostPerMtInr.toLocaleString()}/MT Delivered</div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Projected Net Savings</span>
                <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                  ₹{plan.metrics.estimatedSavingsLakhs} Lakhs
                </div>
                <div className="text-[11px] text-emerald-300">vs Unoptimized Spot Rate</div>
              </div>
            </div>
          </div>

          {/* Section 2: Detailed Shipment & Port Parameters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-sail-900/60 rounded-xl p-4 border border-sail-700/60">
              <h5 className="text-[11px] font-bold text-white uppercase mb-2">
                Cargo & Origin Logistics
              </h5>
              <table className="w-full text-[11px]">
                <tbody className="divide-y divide-sail-800">
                  <tr>
                    <td className="py-1 text-slate-400">Cargo Type:</td>
                    <td className="py-1 font-semibold text-white text-right">{plan.cargo.name}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-400">Parcel Quantity:</td>
                    <td className="py-1 font-mono text-cyan-300 text-right">{Number(inputs.quantity).toLocaleString()} MT</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-400">Origin Port:</td>
                    <td className="py-1 font-semibold text-white text-right">{plan.origin.country} – {plan.origin.portName}</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-400">Sea Distance:</td>
                    <td className="py-1 font-mono text-white text-right">{plan.metrics.seaDistanceNM.toLocaleString()} NM</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-sail-900/60 rounded-xl p-4 border border-sail-700/60">
              <h5 className="text-[11px] font-bold text-white uppercase mb-2">
                Destination Port & Plant Connectivity
              </h5>
              <table className="w-full text-[11px]">
                <tbody className="divide-y divide-sail-800">
                  <tr>
                    <td className="py-1 text-slate-400">Discharge Port:</td>
                    <td className="py-1 font-semibold text-white text-right">{plan.destination.name} ({plan.destination.state})</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-400">Max Port Draft:</td>
                    <td className="py-1 font-mono text-emerald-400 text-right">{plan.destination.maxDraft} m (Clearance: +{Math.round((plan.destination.maxDraft - plan.recommendedVessel.draftMeters) * 10) / 10}m)</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-400">Berth Waiting Average:</td>
                    <td className="py-1 font-mono text-white text-right">{plan.destination.avgWaitingDays} Days</td>
                  </tr>
                  <tr>
                    <td className="py-1 text-slate-400">Target Steel Plant:</td>
                    <td className="py-1 font-semibold text-cyan-300 text-right">{plan.destination.primaryServePlant}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Cost Breakdown Structure */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-2 border-l-2 border-cyan-400 pl-2">
              2. LANDED COST DECOMPOSITION (DELIVERED TO PLANT)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-[11px] bg-sail-900/40 rounded-xl border border-sail-700/60">
                <thead className="bg-sail-950 text-slate-400 border-b border-sail-700">
                  <tr>
                    <th className="py-2 px-3 text-left">Cost Component</th>
                    <th className="py-2 px-3 text-left">Unit Rate</th>
                    <th className="py-2 px-3 text-right">Amount (USD)</th>
                    <th className="py-2 px-3 text-right">Amount (₹ Crores)</th>
                    <th className="py-2 px-3 text-right">% of Landed Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sail-800 text-slate-200">
                  <tr>
                    <td className="py-2 px-3 font-semibold">1. FOB Material Procurement</td>
                    <td className="py-2 px-3 font-mono">${plan.origin.fobBenchmarkUsd} / MT</td>
                    <td className="py-2 px-3 text-right font-mono">${(inputs.quantity * plan.origin.fobBenchmarkUsd).toLocaleString()}</td>
                    <td className="py-2 px-3 text-right font-mono text-white">₹{Math.round(((inputs.quantity * plan.origin.fobBenchmarkUsd * 83.5) / 10000000) * 100) / 100} Cr</td>
                    <td className="py-2 px-3 text-right">62.8%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">2. Ocean Freight & Chartering</td>
                    <td className="py-2 px-3 font-mono">${plan.metrics.forecastFreightRateUsd} / MT</td>
                    <td className="py-2 px-3 text-right font-mono">${(inputs.quantity * plan.metrics.forecastFreightRateUsd).toLocaleString()}</td>
                    <td className="py-2 px-3 text-right font-mono text-cyan-300">₹{plan.metrics.oceanFreightTotalInrCr} Cr</td>
                    <td className="py-2 px-3 text-right">24.5%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">3. Port Handling & Stevedoring</td>
                    <td className="py-2 px-3 font-mono">₹{plan.destination.portChargesInrPerMt} / MT</td>
                    <td className="py-2 px-3 text-right font-mono">—</td>
                    <td className="py-2 px-3 text-right font-mono text-white">₹{Math.round(((inputs.quantity * plan.destination.portChargesInrPerMt) / 10000000) * 100) / 100} Cr</td>
                    <td className="py-2 px-3 text-right">4.8%</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-semibold">4. Indian Railways Rake Freight to Plant</td>
                    <td className="py-2 px-3 font-mono">₹{plan.destination.railFreightToRourkelaInr} / MT</td>
                    <td className="py-2 px-3 text-right font-mono">—</td>
                    <td className="py-2 px-3 text-right font-mono text-white">₹{Math.round(((inputs.quantity * plan.destination.railFreightToRourkelaInr) / 10000000) * 100) / 100} Cr</td>
                    <td className="py-2 px-3 text-right">6.5%</td>
                  </tr>
                  <tr className="bg-sail-950/80 font-bold text-white border-t-2 border-sail-600">
                    <td className="py-2.5 px-3">TOTAL ESTIMATED LANDED COST</td>
                    <td className="py-2.5 px-3 font-mono">₹{plan.metrics.landedCostPerMtInr.toLocaleString()} / MT</td>
                    <td className="py-2.5 px-3 text-right font-mono">—</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-400 text-sm">₹{plan.metrics.estimatedTotalCostInrCr} Cr</td>
                    <td className="py-2.5 px-3 text-right">100.0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Explainable AI Rationale */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300 mb-2 border-l-2 border-cyan-400 pl-2">
              3. AUDITABLE EXPLAINABLE AI (XAI) JUSTIFICATION
            </h4>
            <div className="bg-sail-900/60 rounded-xl p-4 border border-sail-700/60 space-y-2 text-slate-300 text-[11.5px]">
              <p>• <strong>Vessel Choice:</strong> {plan.explainability.vesselReason}</p>
              <p>• <strong>Gateway Port:</strong> {plan.explainability.portRouteReason}</p>
              <p>• <strong>Timing & Cost:</strong> {plan.explainability.freightTimingReason}</p>
            </div>
          </div>

          {/* Signoff Footer */}
          <div className="pt-6 border-t border-sail-700 flex items-center justify-between text-[11px] text-slate-400">
            <div>
              <div>Evaluated by: <strong>SAIL AI Freight Decision Engine</strong></div>
              <div>Compliance: <strong>GFR 2017 & SAIL CPO Guidelines</strong></div>
            </div>
            <div className="text-right">
              <div className="font-bold text-white">Chief General Manager (Procurement & Shipping)</div>
              <div>Steel Authority of India Limited, New Delhi</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
