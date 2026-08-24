import React from 'react';
import { useFreight } from '../../context/FreightContext';
import { 
  Play, 
  RotateCcw, 
  Sliders, 
  Calendar, 
  Package, 
  Compass, 
  Anchor, 
  Ship, 
  Sparkles, 
  Zap 
} from 'lucide-react';

export default function ShipmentPlanForm() {
  const { 
    inputs, 
    handleInputChange, 
    updatePlan, 
    isCalculating, 
    loadPreset,
    cargoTypes,
    originPorts,
    destinationPorts 
  } = useFreight();

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePlan(inputs);
  };

  return (
    <div className="bg-[#0b172e] border border-sail-700/60 rounded-2xl p-5 shadow-card-dark relative overflow-hidden">
      {/* Top Banner with Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 mb-4 border-b border-sail-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Bulk Cargo Procurement & Shipment Parameters
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Configure parcel specifications to generate multi-variable charter optimization
          </p>
        </div>

        {/* Demo Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-400" /> Presets:
          </span>
          <button
            type="button"
            onClick={() => loadPreset('australia-paradip')}
            className="text-[11px] bg-sail-800 hover:bg-sail-700 text-cyan-300 px-2.5 py-1 rounded-md border border-sail-600/60 transition-colors"
          >
            AUS ➔ Paradip (50k MT)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('indonesia-vizag')}
            className="text-[11px] bg-sail-800 hover:bg-sail-700 text-slate-300 px-2.5 py-1 rounded-md border border-sail-600/60 transition-colors"
          >
            IDN ➔ Vizag (65k MT)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('capesize-heavy')}
            className="text-[11px] bg-sail-800 hover:bg-sail-700 text-slate-300 px-2.5 py-1 rounded-md border border-sail-600/60 transition-colors"
          >
            Capesize (110k MT)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('zaf-bhilai')}
            className="text-[11px] bg-sail-800 hover:bg-sail-700 text-slate-300 px-2.5 py-1 rounded-md border border-sail-600/60 transition-colors"
          >
            ZAF ➔ Vizag (45k MT)
          </button>
        </div>
      </div>

      {/* Main Interactive Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Cargo Type */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-cyan-400" />
              Cargo Type
            </label>
            <select
              value={inputs.cargoTypeId}
              onChange={(e) => handleInputChange('cargoTypeId', e.target.value)}
              className="w-full bg-[#070f20] border border-sail-700 text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 font-medium"
            >
              {cargoTypes.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.category})
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Default moisture & ash limits applied
            </span>
          </div>

          {/* 2. Cargo Quantity */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Ship className="w-3.5 h-3.5 text-cyan-400" />
                Cargo Quantity
              </label>
              <span className="text-xs font-bold text-cyan-300 font-mono">
                {Number(inputs.quantity).toLocaleString()} MT
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="20000"
                max="150000"
                step="5000"
                value={inputs.quantity}
                onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                className="w-28 bg-[#070f20] border border-sail-700 text-slate-200 text-xs rounded-lg px-3 py-2 font-mono focus:outline-none focus:border-cyan-500"
              />
              <input
                type="range"
                min="20000"
                max="150000"
                step="5000"
                value={inputs.quantity}
                onChange={(e) => handleInputChange('quantity', Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>20k MT (Supramax)</span>
              <span>75k (Panamax)</span>
              <span>150k (Capesize)</span>
            </div>
          </div>

          {/* 3. Origin Port */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              Origin Country & Port
            </label>
            <select
              value={inputs.originId}
              onChange={(e) => handleInputChange('originId', e.target.value)}
              className="w-full bg-[#070f20] border border-sail-700 text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 font-medium"
            >
              {originPorts.map(o => (
                <option key={o.id} value={o.id}>
                  {o.country} – {o.portName} ({o.distanceToEastCoastNM} NM)
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Auto-fetches bunker index & weather risks
            </span>
          </div>

          {/* 4. Destination Indian Port */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Anchor className="w-3.5 h-3.5 text-cyan-400" />
              Destination Indian Port
            </label>
            <select
              value={inputs.destinationId}
              onChange={(e) => handleInputChange('destinationId', e.target.value)}
              className="w-full bg-[#070f20] border border-sail-700 text-slate-200 text-xs rounded-lg px-3 py-2.5 focus:outline-none focus:border-cyan-500 font-medium"
            >
              {destinationPorts.map(d => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state}) – Max {d.maxDraft}m Draft
                </option>
              ))}
            </select>
            <span className="text-[10px] text-slate-500 mt-1 block">
              Direct railway evacuation corridors to SAIL plants
            </span>
          </div>
        </div>

        {/* Secondary Inputs Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2 border-t border-sail-800/80">
          {/* Expected Shipment Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              Expected Shipment Date
            </label>
            <input
              type="date"
              value={inputs.shipmentDate}
              onChange={(e) => handleInputChange('shipmentDate', e.target.value)}
              className="w-full bg-[#070f20] border border-sail-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Vessel Type Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Ship className="w-3.5 h-3.5 text-cyan-400" />
              Vessel Type Preference
            </label>
            <select
              value={inputs.vesselPreference}
              onChange={(e) => handleInputChange('vesselPreference', e.target.value)}
              className="w-full bg-[#070f20] border border-sail-700 text-slate-200 text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-cyan-500 font-medium"
            >
              <option value="auto">Auto-Select Optimal (AI Recommended)</option>
              <option value="Panamax">Panamax (65k - 78k MT)</option>
              <option value="Capesize">Capesize (100k - 150k MT)</option>
              <option value="Supramax">Supramax (50k - 60k MT)</option>
              <option value="Ultramax">Ultramax (60k - 65k MT)</option>
            </select>
          </div>

          {/* Generate Button */}
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isCalculating}
              className="w-full h-9 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 via-sail-600 to-sail-700 hover:from-cyan-500 hover:to-sail-600 active:from-cyan-700 active:to-sail-800 text-white font-bold text-xs rounded-lg shadow-glow-sm transition-all duration-200 disabled:opacity-50"
            >
              <Sparkles className={`w-4 h-4 text-cyan-200 ${isCalculating ? 'animate-spin' : ''}`} />
              <span>{isCalculating ? 'Computing Optimal Plan...' : 'Generate Optimal Plan'}</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
