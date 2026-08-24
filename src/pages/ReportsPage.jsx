import React from 'react';
import { useFreight } from '../context/FreightContext';
import { 
  FileSpreadsheet, 
  Download, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import { PAST_BENCHMARK_RUNS } from '../data/sampleData';

export default function ReportsPage() {
  const { plan, inputs, setIsDossierOpen } = useFreight();

  // Parcel Size Sensitivity Analysis Table
  const sensitivityData = [
    { parcelSize: 35000, vessel: 'Supramax', rateUsd: 31.80, landedInrCr: 14.2, landedPerMt: 4057, risk: 'Low' },
    { parcelSize: 50000, vessel: 'Panamax (MV Ocean Star)', rateUsd: 28.40, landedInrCr: 18.6, landedPerMt: 3720, risk: 'Low', optimal: true },
    { parcelSize: 65000, vessel: 'Large Panamax', rateUsd: 27.20, landedInrCr: 23.4, landedPerMt: 3600, risk: 'Low' },
    { parcelSize: 80000, vessel: 'Post-Panamax', rateUsd: 26.10, landedInrCr: 28.1, landedPerMt: 3512, risk: 'Medium' },
    { parcelSize: 110000, vessel: 'Capesize (MV Pacific Trader)', rateUsd: 23.30, landedInrCr: 36.8, landedPerMt: 3345, risk: 'Medium' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0d1e3d] via-[#09152b] to-[#070f20] border border-sail-700/60 rounded-2xl p-6 shadow-card-dark flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
              Audit & Governance
            </span>
            <span className="text-xs text-slate-400">
              Compliant with CVC & SAIL Central Procurement Policy
            </span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight mt-1.5">
            Audit Trails, Decision Dossiers & Sensitivity Reports
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Complete historical traceability of ML forecasting models, comparative vessel charters, port routing trade-offs, and procurement committee evaluation dossiers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDossierOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-glow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print Current Plan Dossier</span>
          </button>
        </div>
      </div>

      {/* Parcel Size Sensitivity Matrix */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              Parcel Size & Economy of Scale Sensitivity Matrix
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulating impact of shipment volume scaling on charter hire rates, port draft feasibility, and landed cost / MT
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sail-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-sail-800">
              <tr>
                <th className="py-2.5 px-3">Parcel Size (MT)</th>
                <th className="py-2.5 px-3">Vessel Class</th>
                <th className="py-2.5 px-3 font-mono">Freight Rate ($/MT)</th>
                <th className="py-2.5 px-3 font-mono">Total Landed Cost</th>
                <th className="py-2.5 px-3 font-mono">Landed Cost / MT</th>
                <th className="py-2.5 px-3">Draft & Port Risk</th>
                <th className="py-2.5 px-3 text-right">Optimization Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sail-800 text-slate-200">
              {sensitivityData.map((row, idx) => (
                <tr key={idx} className={row.optimal ? 'bg-cyan-950/40 font-bold' : 'hover:bg-sail-900/50'}>
                  <td className="py-3 px-3 font-mono text-white">{row.parcelSize.toLocaleString()} MT</td>
                  <td className="py-3 px-3 text-cyan-300">{row.vessel}</td>
                  <td className="py-3 px-3 font-mono text-cyan-400">${row.rateUsd}</td>
                  <td className="py-3 px-3 font-mono text-white">₹{row.landedInrCr} Cr</td>
                  <td className="py-3 px-3 font-mono text-emerald-400">₹{row.landedPerMt.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${row.risk === 'Low' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/15 text-amber-300'}`}>
                      {row.risk} Risk
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    {row.optimal ? (
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2.5 py-0.5 rounded">
                        ACTIVE OPTIMAL
                      </span>
                    ) : (
                      <span className="text-slate-400 text-[10px]">Alternative Scenario</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Historical Audit Table */}
      <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-sail-800">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              Complete Historical Execution Audit Log
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Archived procurement records with immutable parameter snapshots
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-sail-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-sail-800">
              <tr>
                <th className="py-2.5 px-3">Tender Ref</th>
                <th className="py-2.5 px-3">Timestamp</th>
                <th className="py-2.5 px-3">Cargo Spec</th>
                <th className="py-2.5 px-3">Route</th>
                <th className="py-2.5 px-3">Vessel</th>
                <th className="py-2.5 px-3 font-mono">Freight</th>
                <th className="py-2.5 px-3 font-mono">Total Cost</th>
                <th className="py-2.5 px-3 font-mono">Savings</th>
                <th className="py-2.5 px-3 text-right">Audit Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sail-800 text-slate-200">
              {PAST_BENCHMARK_RUNS.map((run) => (
                <tr key={run.id} className="hover:bg-sail-900/50">
                  <td className="py-3 px-3 font-mono text-cyan-400 font-bold">{run.id}</td>
                  <td className="py-3 px-3 text-slate-400">{run.timestamp}</td>
                  <td className="py-3 px-3 font-semibold text-white">{run.cargo}</td>
                  <td className="py-3 px-3 text-slate-300">{run.origin} ➔ {run.dest}</td>
                  <td className="py-3 px-3">{run.vessel}</td>
                  <td className="py-3 px-3 font-mono text-cyan-300">{run.rate}</td>
                  <td className="py-3 px-3 font-mono text-white">{run.cost}</td>
                  <td className="py-3 px-3 font-mono text-emerald-400 font-bold">{run.savings}</td>
                  <td className="py-3 px-3 text-right">
                    <span className="bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded">
                      Audited & Signed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
