import React, { createContext, useContext, useState, useMemo } from 'react';
import { calculateOptimizationPlan, calculateCharteringStrategies, simulateDigitalTwinJourney } from '../utils/calculationEngine';
import { CARGO_TYPES, ORIGIN_PORTS, DESTINATION_PORTS, FLEET_VESSELS } from '../data/sampleData';

const FreightContext = createContext();

export function FreightProvider({ children }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastCalculatedAt, setLastCalculatedAt] = useState(new Date().toLocaleTimeString());

  // Shipment Inputs State
  const [inputs, setInputs] = useState({
    cargoTypeId: 'coking-coal',
    quantity: 50000,
    originId: 'AUS-NEW',
    destinationId: 'IND-PRT',
    shipmentDate: '2026-10-15',
    vesselPreference: 'auto'
  });

  // Current Optimization Plan Results
  const [plan, setPlan] = useState(() => calculateOptimizationPlan(inputs));

  // Feature 1: What-If Sandbox State for Chartering Strategy Simulator
  const [whatIfOverrides, setWhatIfOverrides] = useState({
    rateDelta: 0,
    quantity: 50000,
    laycanDaysOffset: 0
  });

  // Feature 2: Digital Twin Selected Vessel & Port State
  const [digitalTwinSelection, setDigitalTwinSelection] = useState({
    vesselId: plan.recommendedVessel.id,
    destinationId: plan.destination.id
  });

  // Dynamic live chartering strategies with What-If applied
  const liveCharterStrategies = useMemo(() => {
    return calculateCharteringStrategies({
      inputs,
      baseRatePerMt: plan.metrics.forecastFreightRateUsd,
      totalTransitDays: plan.metrics.expectedTransitDays,
      totalLandedCostInrCr: plan.metrics.estimatedTotalCostInrCr,
      riskAssessment: plan.riskAssessment,
      recommendedVessel: plan.recommendedVessel,
      origin: plan.origin,
      destination: plan.destination,
      pctChange: plan.metrics.expectedFreightChangePct,
      quantity: inputs.quantity,
      whatIfOverrides
    });
  }, [plan, whatIfOverrides, inputs.quantity]);

  // Dynamic live Digital Twin simulation with interactive vessel & port selection
  const liveDigitalTwin = useMemo(() => {
    const activeVessel = FLEET_VESSELS.find(v => v.id === digitalTwinSelection.vesselId) || plan.recommendedVessel;
    const activeDest = DESTINATION_PORTS.find(p => p.id === digitalTwinSelection.destinationId) || plan.destination;
    return simulateDigitalTwinJourney({
      vessel: activeVessel,
      origin: plan.origin,
      destination: activeDest,
      quantity: inputs.quantity,
      shipmentDate: inputs.shipmentDate
    });
  }, [digitalTwinSelection, plan.origin, plan.destination, plan.recommendedVessel, inputs.quantity, inputs.shipmentDate]);

  const updateWhatIf = (key, value) => {
    setWhatIfOverrides(prev => ({ ...prev, [key]: value }));
  };

  const resetWhatIf = () => {
    setWhatIfOverrides({
      rateDelta: 0,
      quantity: inputs.quantity,
      laycanDaysOffset: 0
    });
  };

  // Recalculate plan with realistic loading state for demos
  const updatePlan = (newInputs = inputs) => {
    setIsCalculating(true);
    setTimeout(() => {
      const calculated = calculateOptimizationPlan(newInputs);
      setPlan(calculated);
      setInputs(newInputs);
      setWhatIfOverrides({
        rateDelta: 0,
        quantity: newInputs.quantity,
        laycanDaysOffset: 0
      });
      setDigitalTwinSelection({
        vesselId: calculated.recommendedVessel.id,
        destinationId: calculated.destination.id
      });
      setIsCalculating(false);
      setLastCalculatedAt(new Date().toLocaleTimeString());
    }, 600); // 600ms responsive feedback
  };

  const handleInputChange = (key, value) => {
    const updated = { ...inputs, [key]: value };
    setInputs(updated);
  };

  // Quick Presets for Demo during Hackathon
  const loadPreset = (presetName) => {
    let presetInputs;
    if (presetName === 'australia-paradip') {
      presetInputs = {
        cargoTypeId: 'coking-coal',
        quantity: 50000,
        originId: 'AUS-NEW',
        destinationId: 'IND-PRT',
        shipmentDate: '2026-10-15',
        vesselPreference: 'auto'
      };
    } else if (presetName === 'indonesia-vizag') {
      presetInputs = {
        cargoTypeId: 'thermal-coal',
        quantity: 65000,
        originId: 'IDN-SAM',
        destinationId: 'IND-VZG',
        shipmentDate: '2026-11-05',
        vesselPreference: 'auto'
      };
    } else if (presetName === 'zaf-bhilai') {
      presetInputs = {
        cargoTypeId: 'pci-coal',
        quantity: 45000,
        originId: 'ZAF-RCB',
        destinationId: 'IND-VZG',
        shipmentDate: '2026-10-25',
        vesselPreference: 'auto'
      };
    } else if (presetName === 'capesize-heavy') {
      presetInputs = {
        cargoTypeId: 'coking-coal',
        quantity: 110000,
        originId: 'AUS-HAY',
        destinationId: 'IND-VZG',
        shipmentDate: '2026-11-12',
        vesselPreference: 'Capesize'
      };
    }
    if (presetInputs) {
      updatePlan(presetInputs);
    }
  };

  return (
    <FreightContext.Provider
      value={{
        activeTab,
        setActiveTab,
        inputs,
        setInputs,
        handleInputChange,
        plan,
        updatePlan,
        isCalculating,
        isDossierOpen,
        setIsDossierOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        lastCalculatedAt,
        loadPreset,
        cargoTypes: CARGO_TYPES,
        originPorts: ORIGIN_PORTS,
        destinationPorts: DESTINATION_PORTS,
        fleetVessels: FLEET_VESSELS,
        whatIfOverrides,
        updateWhatIf,
        resetWhatIf,
        liveCharterStrategies,
        digitalTwinSelection,
        setDigitalTwinSelection,
        liveDigitalTwin
      }}
    >
      {children}
    </FreightContext.Provider>
  );
}

export function useFreight() {
  const context = useContext(FreightContext);
  if (!context) {
    throw new Error('useFreight must be used within a FreightProvider');
  }
  return context;
}
