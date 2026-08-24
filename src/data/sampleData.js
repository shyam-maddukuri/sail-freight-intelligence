// Sample and benchmark data for SAIL Freight Intelligence prototype
// Prepared for Smart India Hackathon 2026 (SIH26006)

export const CARGO_TYPES = [
  {
    id: 'coking-coal',
    name: 'Prime Hard Coking Coal (HCC)',
    category: 'Coking Coal',
    description: 'High-grade metallurgical coal required for blast furnace coke making in SAIL plants.',
    typicalParcelMin: 40000,
    typicalParcelMax: 85000,
    stowageFactor: 1.25, // m3/MT
    targetPlants: ['Rourkela Steel Plant (RSP)', 'Bokaro Steel Plant (BSL)', 'Bhilai Steel Plant (BSP)', 'IISCO Burnpur'],
    defaultFobPriceUsd: 245.0,
    currency: 'USD/MT'
  },
  {
    id: 'pci-coal',
    name: 'Pulverized Coal Injection (PCI)',
    category: 'Coking Coal',
    description: 'Supplemental low-volatile coal injected directly into the blast furnace raceway.',
    typicalParcelMin: 35000,
    typicalParcelMax: 75000,
    stowageFactor: 1.22,
    targetPlants: ['Rourkela Steel Plant (RSP)', 'Bokaro Steel Plant (BSL)', 'Durgapur Steel Plant (DSP)'],
    defaultFobPriceUsd: 195.0,
    currency: 'USD/MT'
  },
  {
    id: 'thermal-coal',
    name: 'Non-Coking / Thermal Coal',
    category: 'Thermal Coal',
    description: 'Used for captive thermal power plants (CPP) at SAIL integrated steel facilities.',
    typicalParcelMin: 50000,
    typicalParcelMax: 120000,
    stowageFactor: 1.30,
    targetPlants: ['Bhilai CPP', 'Bokaro CPP', 'Rourkela CPP'],
    defaultFobPriceUsd: 110.0,
    currency: 'USD/MT'
  },
  {
    id: 'limestone',
    name: 'SMS Grade Low-Silica Limestone',
    category: 'Flux & Minerals',
    description: 'Fluxing agent with <1.0% Silica for Steel Melting Shop (SMS) converter operations.',
    typicalParcelMin: 45000,
    typicalParcelMax: 70000,
    stowageFactor: 0.85,
    targetPlants: ['RSP', 'BSL', 'BSP', 'DSP'],
    defaultFobPriceUsd: 42.0,
    currency: 'USD/MT'
  },
  {
    id: 'manganese-ore',
    name: 'High-Grade Manganese Ore (44-48% Mn)',
    category: 'Alloys & Raw Materials',
    description: 'Imported for ferro-manganese alloy production at Chandrapur & plant melt shops.',
    typicalParcelMin: 30000,
    typicalParcelMax: 55000,
    stowageFactor: 0.65,
    targetPlants: ['Chandrapur Ferro Alloy Plant', 'BSP', 'BSL'],
    defaultFobPriceUsd: 185.0,
    currency: 'USD/MT'
  }
];

export const ORIGIN_PORTS = [
  {
    id: 'AUS-NEW',
    country: 'Australia',
    portName: 'Newcastle (PWCS / NCIG)',
    coordinates: [-32.9283, 151.7817],
    distanceToEastCoastNM: 5420, // Nautical Miles
    avgLoadingRateTpd: 45000, // Tonnes per day
    maxDraft: 15.2, // meters
    fobBenchmarkUsd: 245.0,
    calorificValueKcal: 6900,
    ashPercentage: 8.8,
    moisturePercentage: 9.0,
    geopoliticalRiskScore: 12,
    monsoonSensitivity: 15,
    bunkerIndexUsd: 615,
    description: 'World benchmark port for high-fluidity coking coal. Excellent berth productivity.'
  },
  {
    id: 'AUS-HAY',
    country: 'Australia',
    portName: 'Hay Point / Dalrymple Bay',
    coordinates: [-21.2842, 149.3006],
    distanceToEastCoastNM: 5210,
    avgLoadingRateTpd: 50000,
    maxDraft: 17.5,
    fobBenchmarkUsd: 252.0,
    calorificValueKcal: 7100,
    ashPercentage: 8.5,
    moisturePercentage: 8.5,
    geopoliticalRiskScore: 10,
    monsoonSensitivity: 18,
    bunkerIndexUsd: 618,
    description: 'Capable of loading Capesize vessels directly with very high load rates.'
  },
  {
    id: 'IDN-SAM',
    country: 'Indonesia',
    portName: 'Samarinda / Muara Berau (Anchorage)',
    coordinates: [-0.5021, 117.1536],
    distanceToEastCoastNM: 2850,
    avgLoadingRateTpd: 18000,
    maxDraft: 14.0, // Barge transshipment
    fobBenchmarkUsd: 188.0,
    calorificValueKcal: 6100,
    ashPercentage: 11.5,
    moisturePercentage: 14.5,
    geopoliticalRiskScore: 28,
    monsoonSensitivity: 42,
    bunkerIndexUsd: 640,
    description: 'Short ocean transit distance; offshore transshipment via geared vessels / floating cranes.'
  },
  {
    id: 'ZAF-RCB',
    country: 'South Africa',
    portName: 'Richards Bay Coal Terminal (RBCT)',
    coordinates: [-28.7997, 32.0383],
    distanceToEastCoastNM: 4480,
    avgLoadingRateTpd: 38000,
    maxDraft: 17.5,
    fobBenchmarkUsd: 215.0,
    calorificValueKcal: 6450,
    ashPercentage: 12.0,
    moisturePercentage: 8.0,
    geopoliticalRiskScore: 35,
    monsoonSensitivity: 22,
    bunkerIndexUsd: 605,
    description: 'Major hub for PCI and medium coking coals. Good deep-water Capesize capability.'
  },
  {
    id: 'USA-HRD',
    country: 'United States',
    portName: 'Hampton Roads / Norfolk',
    coordinates: [36.9472, -76.3267],
    distanceToEastCoastNM: 8950,
    avgLoadingRateTpd: 32000,
    maxDraft: 15.0,
    fobBenchmarkUsd: 260.0,
    calorificValueKcal: 7250,
    ashPercentage: 7.2,
    moisturePercentage: 6.5,
    geopoliticalRiskScore: 8,
    monsoonSensitivity: 10,
    bunkerIndexUsd: 590,
    description: 'Ultra-low ash premium coking coal. Long transit via Cape of Good Hope.'
  },
  {
    id: 'MOZ-MAP',
    country: 'Mozambique',
    portName: 'Maputo / Matola Terminal',
    coordinates: [-25.9692, 32.5732],
    distanceToEastCoastNM: 4320,
    avgLoadingRateTpd: 22000,
    maxDraft: 13.8,
    fobBenchmarkUsd: 205.0,
    calorificValueKcal: 6300,
    ashPercentage: 13.0,
    moisturePercentage: 9.5,
    geopoliticalRiskScore: 45,
    monsoonSensitivity: 25,
    bunkerIndexUsd: 625,
    description: 'Growing supply corridor for Moatize coking coal. Rail infrastructure bottlenecks.'
  }
];

export const DESTINATION_PORTS = [
  {
    id: 'IND-PRT',
    name: 'Paradip Port',
    state: 'Odisha',
    coordinates: [20.2644, 86.6713],
    maxDraft: 14.5, // meters
    maxLoa: 230, // meters
    berthAvailability: '88% (Dedicated Mechanized Coal Berth)',
    avgWaitingDays: 2.1,
    congestionRisk: 'Low-Medium',
    dischargeRateTpd: 35000,
    portChargesInrPerMt: 320,
    railFreightToRourkelaInr: 680,
    railFreightToBokaroInr: 790,
    railFreightToBhilaiInr: 1020,
    railConnectivityScore: 95,
    primaryServePlant: 'Rourkela & Bokaro Steel Plants',
    description: 'Deepwater major port with mechanized conveyor systems directly linked to Indian Railways for SAIL Bengal-Odisha-Jharkhand steel belt.'
  },
  {
    id: 'IND-VZG',
    name: 'Visakhapatnam Port (VPA)',
    state: 'Andhra Pradesh',
    coordinates: [17.6868, 83.2185],
    maxDraft: 16.5, // Inner/Outer harbor
    maxLoa: 290,
    berthAvailability: '82%',
    avgWaitingDays: 3.4,
    congestionRisk: 'Medium',
    dischargeRateTpd: 30000,
    portChargesInrPerMt: 345,
    railFreightToRourkelaInr: 890,
    railFreightToBokaroInr: 960,
    railFreightToBhilaiInr: 780,
    railConnectivityScore: 90,
    primaryServePlant: 'Bhilai Steel Plant & RINL Vizag',
    description: 'Deep natural harbor capable of accommodating Capesize vessels; optimal evacuation corridor for Bhilai Steel Plant.'
  },
  {
    id: 'IND-HAL',
    name: 'Haldia Dock Complex (KOPT)',
    state: 'West Bengal',
    coordinates: [22.0287, 88.0641],
    maxDraft: 8.5, // Riverine tidal draft limitation
    maxLoa: 190,
    berthAvailability: '65%',
    avgWaitingDays: 5.2,
    congestionRisk: 'High',
    dischargeRateTpd: 16000,
    portChargesInrPerMt: 390,
    railFreightToRourkelaInr: 540,
    railFreightToBokaroInr: 610,
    railFreightToBhilaiInr: 1150,
    railConnectivityScore: 78,
    primaryServePlant: 'Durgapur & IISCO Burnpur',
    description: 'Close proximity to Durgapur and Burnpur but severely draft-restricted (requires tidal windows or daughter vessels).'
  },
  {
    id: 'IND-MAA',
    name: 'Chennai Port (ChPA)',
    state: 'Tamil Nadu',
    coordinates: [13.0827, 80.2707],
    maxDraft: 14.0,
    maxLoa: 240,
    berthAvailability: '78%',
    avgWaitingDays: 2.8,
    congestionRisk: 'Medium',
    dischargeRateTpd: 22000,
    portChargesInrPerMt: 360,
    railFreightToRourkelaInr: 1250,
    railFreightToBokaroInr: 1320,
    railFreightToBhilaiInr: 1100,
    railConnectivityScore: 82,
    primaryServePlant: 'Salem Steel Plant & South Units',
    description: 'All-weather port with dedicated bulk berths; higher rail freight to central/eastern plants.'
  },
  {
    id: 'IND-KMR',
    name: 'Kamarajar Port (Ennore)',
    state: 'Tamil Nadu',
    coordinates: [13.2625, 80.3347],
    maxDraft: 15.5,
    maxLoa: 260,
    berthAvailability: '91%',
    avgWaitingDays: 1.8,
    congestionRisk: 'Low',
    dischargeRateTpd: 28000,
    portChargesInrPerMt: 330,
    railFreightToRourkelaInr: 1220,
    railFreightToBokaroInr: 1290,
    railFreightToBhilaiInr: 1080,
    railConnectivityScore: 84,
    primaryServePlant: 'Salem Steel Plant / Southern units',
    description: 'Modern corporate major port with low turnaround times and deep drafts.'
  }
];

export const FLEET_VESSELS = [
  {
    id: 'VES-001',
    vesselName: 'MV Ocean Star',
    vesselType: 'Panamax',
    capacityDwt: 75000,
    optParcelMin: 45000,
    optParcelMax: 75000,
    draftMeters: 14.2,
    loaMeters: 225,
    beamMeters: 32.2,
    fuelConsumptionTpd: 24.5,
    dailyCharterRateUsd: 16800,
    speedKnots: 13.5,
    ageYears: 6,
    flag: 'Singapore',
    reliabilityScore: 98,
    status: 'Available in Pacific Window'
  },
  {
    id: 'VES-002',
    vesselName: 'MV Pacific Trader',
    vesselType: 'Capesize',
    capacityDwt: 120000,
    optParcelMin: 90000,
    optParcelMax: 125000,
    draftMeters: 17.0,
    loaMeters: 270,
    beamMeters: 45.0,
    fuelConsumptionTpd: 38.0,
    dailyCharterRateUsd: 24500,
    speedKnots: 13.0,
    ageYears: 8,
    flag: 'Panama',
    reliabilityScore: 92,
    status: 'Ballasting towards Newcastle'
  },
  {
    id: 'VES-003',
    vesselName: 'MV Eastern Wind',
    vesselType: 'Supramax (Geared)',
    capacityDwt: 55000,
    optParcelMin: 30000,
    optParcelMax: 55000,
    draftMeters: 11.8,
    loaMeters: 190,
    beamMeters: 32.0,
    fuelConsumptionTpd: 21.0,
    dailyCharterRateUsd: 14200,
    speedKnots: 13.8,
    ageYears: 5,
    flag: 'Liberia',
    reliabilityScore: 96,
    status: 'Ready in Singapore Anchorage'
  },
  {
    id: 'VES-004',
    vesselName: 'MV Bengal Pioneer',
    vesselType: 'Ultramax',
    capacityDwt: 64000,
    optParcelMin: 40000,
    optParcelMax: 64000,
    draftMeters: 12.8,
    loaMeters: 199.9,
    beamMeters: 32.2,
    fuelConsumptionTpd: 22.5,
    dailyCharterRateUsd: 15400,
    speedKnots: 13.6,
    ageYears: 4,
    flag: 'Marshall Islands',
    reliabilityScore: 97,
    status: 'Discharging in Colombo'
  },
  {
    id: 'VES-005',
    vesselName: 'MV Atlantic Carrier',
    vesselType: 'Post-Panamax',
    capacityDwt: 88000,
    optParcelMin: 65000,
    optParcelMax: 88000,
    draftMeters: 14.8,
    loaMeters: 229,
    beamMeters: 38.0,
    fuelConsumptionTpd: 27.0,
    dailyCharterRateUsd: 18900,
    speedKnots: 13.2,
    ageYears: 7,
    flag: 'Hong Kong',
    reliabilityScore: 94,
    status: 'Positioned in Indian Ocean'
  }
];

export const HISTORICAL_FORECAST_RATES = [
  // 6 months historical data (monthly/weekly snapshots)
  { date: 'Apr 2026', historical: 23.40, forecast: null, upperBand: null, lowerBand: null, bdi: 1620, fuel: 580 },
  { date: 'May 2026', historical: 24.10, forecast: null, upperBand: null, lowerBand: null, bdi: 1690, fuel: 592 },
  { date: 'Jun 2026', historical: 25.80, forecast: null, upperBand: null, lowerBand: null, bdi: 1810, fuel: 605 },
  { date: 'Jul 2026', historical: 26.20, forecast: null, upperBand: null, lowerBand: null, bdi: 1850, fuel: 612 },
  { date: 'Aug 2026', historical: 26.80, forecast: 26.80, upperBand: 26.80, lowerBand: 26.80, bdi: 1895, fuel: 615 },
  // AI/ML Model 90-day projections
  { date: 'Sep 2026', historical: null, forecast: 27.50, upperBand: 28.40, lowerBand: 26.60, bdi: 1940, fuel: 622 },
  { date: 'Oct 2026', historical: null, forecast: 28.40, upperBand: 29.80, lowerBand: 27.10, bdi: 2010, fuel: 635 },
  { date: 'Nov 2026', historical: null, forecast: 29.60, upperBand: 31.20, lowerBand: 27.90, bdi: 2120, fuel: 648 },
  { date: 'Dec 2026', historical: null, forecast: 30.10, upperBand: 32.30, lowerBand: 28.20, bdi: 2180, fuel: 655 },
  { date: 'Jan 2027', historical: null, forecast: 28.90, upperBand: 31.40, lowerBand: 26.80, bdi: 2050, fuel: 640 },
  { date: 'Feb 2027', historical: null, forecast: 27.20, upperBand: 29.90, lowerBand: 24.90, bdi: 1910, fuel: 620 }
];

export const FORECAST_DRIVERS = [
  {
    factor: 'VLSFO Bunker Fuel Cost',
    impact: '+2.40 $/MT',
    weight: 34,
    direction: 'up',
    trend: 'Rising (+4.2% MoM)',
    description: 'Crude tightness and IMO compliance premiums in Singapore & Fujairah bunker hubs pushing ton-mile voyage costs up.'
  },
  {
    factor: 'China Steel Production & Restocking',
    impact: '+1.65 $/MT',
    weight: 26,
    direction: 'up',
    trend: 'High Demand Peak',
    description: 'Pre-winter industrial raw material restocking in Hebei/Jiangsu consuming Pacific Panamax tonnage.'
  },
  {
    factor: 'East Coast India Port Waiting Days',
    impact: '+0.85 $/MT',
    weight: 18,
    direction: 'up',
    trend: 'Moderate Congestion',
    description: 'Monsoon discharge slowdowns at Haldia & Vizag tying up bulk carriers, reducing regional vessel turnover.'
  },
  {
    factor: 'Australian Port Weather & Cyclones',
    impact: '+0.60 $/MT',
    weight: 12,
    direction: 'up',
    trend: 'Early Season Alert',
    description: 'Queensland Queensland storm alerts creating minor loading delays in Hay Point / Gladstone.'
  },
  {
    factor: 'Atlantic Ballaster Inflow',
    impact: '-0.70 $/MT',
    weight: 10,
    direction: 'down',
    trend: 'Mitigating Factor',
    description: 'Inflow of grain-discharging vessels from South America ballasting towards Indian Ocean provides partial supply buffer.'
  }
];

export const PAST_BENCHMARK_RUNS = [
  {
    id: 'RUN-2026-0812',
    timestamp: '2026-08-12 14:30',
    cargo: '50,000 MT Coking Coal',
    origin: 'Newcastle (AUS)',
    dest: 'Paradip (IND)',
    vessel: 'Panamax (MV Ocean Star)',
    rate: '$28.40 / MT',
    cost: '₹18.6 Cr',
    status: 'Finalized',
    savings: '₹42.5 L'
  },
  {
    id: 'RUN-2026-0728',
    timestamp: '2026-07-28 09:15',
    cargo: '70,000 MT Coking Coal',
    origin: 'Hay Point (AUS)',
    dest: 'Visakhapatnam (IND)',
    vessel: 'Panamax (MV Pacific Trader)',
    rate: '$26.10 / MT',
    cost: '₹24.8 Cr',
    status: 'Executed',
    savings: '₹58.0 L'
  },
  {
    id: 'RUN-2026-0710',
    timestamp: '2026-07-10 16:45',
    cargo: '45,000 MT PCI Coal',
    origin: 'Richards Bay (ZAF)',
    dest: 'Paradip (IND)',
    vessel: 'Supramax (MV Eastern Wind)',
    rate: '$24.80 / MT',
    cost: '₹16.2 Cr',
    status: 'Executed',
    savings: '₹31.2 L'
  },
  {
    id: 'RUN-2026-0619',
    timestamp: '2026-06-19 11:20',
    cargo: '60,000 MT Thermal Coal',
    origin: 'Samarinda (IDN)',
    dest: 'Kamarajar (IND)',
    vessel: 'Ultramax (MV Bengal Pioneer)',
    rate: '$14.90 / MT',
    cost: '₹11.4 Cr',
    status: 'Executed',
    savings: '₹22.0 L'
  }
];
