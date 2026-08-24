import React, { createContext, useContext, useState } from 'react';
import { calculateOptimizationPlan } from '../utils/calculationEngine';
import { CARGO_TYPES, ORIGIN_PORTS, DESTINATION_PORTS } from '../data/sampleData';

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

  // Recalculate plan with realistic loading state for demos
  const updatePlan = (newInputs = inputs) => {
    setIsCalculating(true);
    setTimeout(() => {
      const calculated = calculateOptimizationPlan(newInputs);
      setPlan(calculated);
      setInputs(newInputs);
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
        destinationPorts: DESTINATION_PORTS
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
