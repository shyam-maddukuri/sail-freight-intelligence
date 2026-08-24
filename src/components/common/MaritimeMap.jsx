import React, { useState } from 'react';
import { useFreight } from '../../context/FreightContext';
import { 
  Compass, 
  Anchor, 
  Ship, 
  Wind, 
  Clock, 
  Fuel, 
  MapPin, 
  Layers, 
  AlertTriangle,
  CheckCircle2,
  Navigation
} from 'lucide-react';

export default function MaritimeMap() {
  const { plan, inputs, destinationPorts, originPorts } = useFreight();
  const [activeViewMode, setActiveViewMode] = useState('activeRoute'); // 'activeRoute' | 'allPorts' | 'weather'

  const origin = plan.origin;
  const destination = plan.destination;

  // Waypoints for major sea lanes to East Coast of India
  const getRouteWaypoints = (originId, destId) => {
    if (originId.startsWith('AUS')) {
      return [
        { name: origin.portName, coords: [origin.coordinates[0], origin.coordinates[1]] },
        { name: 'Great Australian Bight / Torres Strait', coords: [-10.5, 142.2] },
        { name: 'Sunda Strait / Java Sea', coords: [-5.9, 105.8] },
        { name: 'Malacca Strait Entrance', coords: [5.6, 95.3] },
        { name: 'Bay of Bengal Deepwater Lane', coords: [14.0, 88.0] },
        { name: destination.name, coords: [destination.coordinates[0], destination.coordinates[1]] }
      ];
    } else if (originId.startsWith('IDN')) {
      return [
        { name: origin.portName, coords: [origin.coordinates[0], origin.coordinates[1]] },
        { name: 'Makassar / Java Sea', coords: [-3.5, 116.0] },
        { name: 'Singapore Strait', coords: [1.2, 103.8] },
        { name: 'Andaman Sea', coords: [9.5, 93.0] },
        { name: destination.name, coords: [destination.coordinates[0], destination.coordinates[1]] }
      ];
    } else if (originId.startsWith('ZAF') || originId.startsWith('MOZ')) {
      return [
        { name: origin.portName, coords: [origin.coordinates[0], origin.coordinates[1]] },
        { name: 'Mozambique Channel', coords: [-18.0, 41.0] },
        { name: 'Equatorial Indian Ocean', coords: [-2.0, 68.0] },
        { name: 'Sri Lanka Deepwater Channel', coords: [5.8, 81.0] },
        { name: destination.name, coords: [destination.coordinates[0], destination.coordinates[1]] }
      ];
    } else {
      // USA / Atlantic via Cape of Good Hope
      return [
        { name: origin.portName, coords: [origin.coordinates[0], origin.coordinates[1]] },
        { name: 'Mid-Atlantic Ocean', coords: [15.0, -35.0] },
        { name: 'Cape of Good Hope', coords: [-34.5, 18.5] },
        { name: 'Southern Indian Ocean', coords: [-10.0, 70.0] },
        { name: destination.name, coords: [destination.coordinates[0], destination.coordinates[1]] }
      ];
    }
  };

  const waypoints = getRouteWaypoints(inputs.originId, inputs.destinationId);

  return (
    <div className="relative bg-[#070f20] border border-sail-700/60 rounded-2xl overflow-hidden shadow-card-dark flex flex-col">
      {/* Map Control Header */}
      <div className="p-4 bg-[#0a152d] border-b border-sail-700/50 flex flex-wrap items-center justify-between gap-3 z-10">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Interactive Maritime Route & Port Network Simulator
            </h3>
            <span className="text-[11px] text-slate-400">
              Live Sea Corridor: {origin.portName} ➔ {destination.name}
            </span>
          </div>
        </div>

        {/* View Mode Filters */}
        <div className="flex items-center bg-sail-900/90 p-1 rounded-lg border border-sail-700/60 text-xs">
          <button
            onClick={() => setActiveViewMode('activeRoute')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              activeViewMode === 'activeRoute'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Active Corridor
          </button>
          <button
            onClick={() => setActiveViewMode('allPorts')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              activeViewMode === 'allPorts'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All 5 East Coast Ports
          </button>
          <button
            onClick={() => setActiveViewMode('weather')}
            className={`px-3 py-1 rounded font-medium transition-all ${
              activeViewMode === 'weather'
                ? 'bg-cyan-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Monsoon & Hazard Zones
          </button>
        </div>
      </div>

      {/* Interactive Map Visualizer (SVG Marine Vector Grid with Full Realism) */}
      <div className="relative w-full h-[420px] bg-gradient-to-b from-[#060c18] via-[#09152b] to-[#0a1835] overflow-hidden flex items-center justify-center select-none">
        
        {/* Ocean Grid Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
          <defs>
            <pattern id="marine-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#254e8e" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#marine-grid)" />
        </svg>

        {/* Global Continental Contours (Stylized Vector) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
          {/* Indian Subcontinent */}
          <path
            d="M 520 80 L 560 130 L 590 190 L 570 260 L 545 310 L 525 280 L 500 220 L 485 150 L 520 80 Z"
            fill="#14254b"
            stroke="#2e66b4"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {/* Southeast Asia / Indonesia archipelago */}
          <path
            d="M 640 230 L 720 260 L 750 320 L 700 350 L 650 310 Z"
            fill="#14254b"
            stroke="#2e66b4"
            strokeWidth="1.5"
            opacity="0.75"
          />
          {/* Australia */}
          <path
            d="M 780 340 L 920 350 L 940 440 L 840 470 L 770 420 Z"
            fill="#14254b"
            stroke="#2e66b4"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {/* Africa / South Africa */}
          <path
            d="M 280 180 L 370 240 L 380 360 L 320 440 L 260 380 L 240 220 Z"
            fill="#14254b"
            stroke="#2e66b4"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {/* Sri Lanka */}
          <ellipse cx="555" cy="330" rx="10" ry="16" fill="#14254b" stroke="#2e66b4" strokeWidth="1.2" />

          {/* Monsoon / Wave Height Hazard Overlay */}
          {activeViewMode === 'weather' && (
            <g opacity="0.45">
              <ellipse cx="600" cy="220" rx="80" ry="50" fill="#f59e0b" filter="blur(8px)" />
              <text x="540" y="225" fill="#fde68a" fontSize="12" fontWeight="bold">
                SW Monsoon Active (&lt;2.4m Swell)
              </text>
            </g>
          )}

          {/* Active Maritime Route Line */}
          {inputs.originId.startsWith('AUS') && (
            <g>
              <path
                d="M 850 410 Q 720 320 660 270 T 565 195"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3.5"
                className="animate-marine-route"
              />
              {/* Vessel Icon floating along route */}
              <circle cx="710" cy="300" r="7" fill="#0284c7" stroke="#ffffff" strokeWidth="2">
                <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {inputs.originId.startsWith('IDN') && (
            <g>
              <path
                d="M 680 290 Q 640 260 600 240 T 565 195"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3.5"
                className="animate-marine-route"
              />
            </g>
          )}

          {inputs.originId.startsWith('ZAF') && (
            <g>
              <path
                d="M 360 410 Q 450 330 520 280 T 565 195"
                fill="none"
                stroke="#06b6d4"
                strokeWidth="3.5"
                className="animate-marine-route"
              />
            </g>
          )}
        </svg>

        {/* Origin Port Pin */}
        <div className="absolute top-[68%] right-[14%] flex flex-col items-center group cursor-pointer z-20">
          <div className="px-2 py-1 bg-sail-900/90 text-cyan-300 border border-cyan-400 text-[10px] font-bold rounded shadow-lg backdrop-blur-sm whitespace-nowrap mb-1">
            ORIGIN: {origin.portName.split(' ')[0]}
          </div>
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-glow-sm">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div className="absolute -inset-1 bg-cyan-400 rounded-full animate-ping opacity-30"></div>
          </div>
          <div className="text-[10px] text-slate-300 bg-sail-950/80 px-1.5 py-0.5 rounded mt-1 font-mono">
            {origin.country} • Max {origin.maxDraft}m Draft
          </div>
        </div>

        {/* Destination East Coast Indian Ports Overlay */}
        {destinationPorts.map((port, idx) => {
          const isSelected = port.id === destination.id;
          // Offset positioning on Indian East Coast map projection
          const positions = {
            'IND-HAL': { top: '30%', left: '57%' },
            'IND-PRT': { top: '38%', left: '55.5%' },
            'IND-VZG': { top: '48%', left: '54.5%' },
            'IND-KMR': { top: '58%', left: '53.5%' },
            'IND-MAA': { top: '64%', left: '53%' }
          };

          const pos = positions[port.id] || { top: '45%', left: '55%' };

          if (!isSelected && activeViewMode === 'activeRoute') {
            // Subtle marker
            return (
              <div
                key={port.id}
                style={{ top: pos.top, left: pos.left }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer opacity-60 hover:opacity-100 z-10"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-slate-400 border border-slate-700"></div>
                <span className="text-[9px] text-slate-400 whitespace-nowrap -ml-2">
                  {port.name.replace(' Port', '')}
                </span>
              </div>
            );
          }

          return (
            <div
              key={port.id}
              style={{ top: pos.top, left: pos.left }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group ${
                isSelected ? 'scale-110' : ''
              }`}
            >
              <div
                className={`px-2 py-1 rounded text-[10px] font-bold shadow-lg backdrop-blur-sm whitespace-nowrap mb-1 flex items-center gap-1 ${
                  isSelected
                    ? 'bg-emerald-500 text-white border border-emerald-300'
                    : 'bg-sail-900 text-slate-300 border border-sail-700'
                }`}
              >
                <Anchor className="w-3 h-3" />
                {isSelected ? `OPTIMAL: ${port.name}` : port.name}
              </div>

              <div className="relative flex justify-center">
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    isSelected ? 'bg-emerald-400 text-slate-950 shadow-glow-sm' : 'bg-sail-700 text-cyan-300'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                </div>
                {isSelected && (
                  <div className="absolute -inset-1 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
                )}
              </div>

              {/* Tooltip on hover */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-52 p-2.5 bg-sail-900/95 border border-sail-600 rounded-lg text-[11px] text-slate-200 shadow-xl pointer-events-none z-30">
                <div className="font-bold text-white">{port.name}</div>
                <div className="text-cyan-400 text-[10px]">{port.primaryServePlant}</div>
                <div className="mt-1 space-y-0.5 text-slate-300 text-[10px]">
                  <div>Max Draft: <span className="font-mono text-white">{port.maxDraft} m</span></div>
                  <div>Discharge: <span className="font-mono text-white">{port.dischargeRateTpd.toLocaleString()} TPD</span></div>
                  <div>Waiting: <span className="font-mono text-white">{port.avgWaitingDays} days</span></div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Floating Telemetry & Voyage HUD */}
        <div className="absolute bottom-3 left-3 bg-[#081329]/90 border border-sail-600/60 rounded-xl p-3.5 backdrop-blur-md text-xs shadow-xl max-w-sm z-20">
          <div className="flex items-center justify-between text-slate-300 font-bold border-b border-sail-700/60 pb-1.5 mb-2">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Ship className="w-3.5 h-3.5" />
              Voyage Telemetry ({plan.recommendedVessel.vesselName})
            </span>
            <span className="text-emerald-400 font-mono text-[11px]">13.5 kts</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div>
              <span className="text-slate-400 block text-[10px]">Sea Distance:</span>
              <span className="font-bold font-mono text-white">
                {plan.metrics.seaDistanceNM.toLocaleString()} NM
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Total Transit ETA:</span>
              <span className="font-bold font-mono text-cyan-300">
                {plan.metrics.expectedTransitDays} Days
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">VLSFO Fuel Burn:</span>
              <span className="font-bold font-mono text-slate-200">
                ~{Math.round(plan.recommendedVessel.fuelConsumptionTpd * plan.metrics.seaTransitDays)} MT
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Draft Margin:</span>
              <span className="font-bold font-mono text-emerald-400">
                +{Math.round((destination.maxDraft - plan.recommendedVessel.draftMeters) * 10) / 10} m safe
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
