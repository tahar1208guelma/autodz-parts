import { VehicleMake, VehicleModel, VehicleEngine } from '../types';

export const VEHICLE_MAKES: VehicleMake[] = [
  { id: 'make-renault', name: 'Renault', logo: '🚗', country: 'فرنسا', popularInAlgeria: true },
  { id: 'make-dacia', name: 'Dacia', logo: '🚙', country: 'رومانيا / فرنسا', popularInAlgeria: true },
  { id: 'make-peugeot', name: 'Peugeot', logo: '🦁', country: 'فرنسا', popularInAlgeria: true },
  { id: 'make-vw', name: 'Volkswagen', logo: '🇩🇪', country: 'ألمانيا', popularInAlgeria: true },
  { id: 'make-hyundai', name: 'Hyundai', logo: '🇰🇷', country: 'كوريا الجنوبية', popularInAlgeria: true },
  { id: 'make-toyota', name: 'Toyota', logo: '🇯🇵', country: 'اليابان', popularInAlgeria: true },
  { id: 'make-kia', name: 'Kia', logo: '🇰🇷', country: 'كوريا الجنوبية', popularInAlgeria: true },
  { id: 'make-seat', name: 'Seat', logo: '🇪🇸', country: 'إسبانيا', popularInAlgeria: true },
  { id: 'make-fiat', name: 'Fiat', logo: '🇮🇹', country: 'إيطاليا', popularInAlgeria: true },
  { id: 'make-chery', name: 'Chery', logo: '🇨🇳', country: 'الصين', popularInAlgeria: true },
];

export const VEHICLE_MODELS: VehicleModel[] = [
  // Renault
  { id: 'mod-symbol', makeId: 'make-renault', name: 'Symbol', startYear: 2008, endYear: 2022 },
  { id: 'mod-clio4', makeId: 'make-renault', name: 'Clio 4', startYear: 2012, endYear: 2020 },
  { id: 'mod-megane3', makeId: 'make-renault', name: 'Megane 3', startYear: 2008, endYear: 2016 },
  { id: 'mod-kangoo', makeId: 'make-renault', name: 'Kangoo 2', startYear: 2008, endYear: 2021 },

  // Dacia
  { id: 'mod-logan', makeId: 'make-dacia', name: 'Logan', startYear: 2005, endYear: 2022 },
  { id: 'mod-sandero', makeId: 'make-dacia', name: 'Sandero Stepway', startYear: 2012, endYear: 2022 },
  { id: 'mod-duster', makeId: 'make-dacia', name: 'Duster', startYear: 2010, endYear: 2024 },

  // Peugeot
  { id: 'mod-208', makeId: 'make-peugeot', name: '208', startYear: 2012, endYear: 2024 },
  { id: 'mod-301', makeId: 'make-peugeot', name: '301', startYear: 2012, endYear: 2022 },
  { id: 'mod-207', makeId: 'make-peugeot', name: '207', startYear: 2006, endYear: 2014 },
  { id: 'mod-partner', makeId: 'make-peugeot', name: 'Partner Tepee', startYear: 2008, endYear: 2019 },

  // Volkswagen
  { id: 'mod-golf7', makeId: 'make-vw', name: 'Golf 7', startYear: 2012, endYear: 2020 },
  { id: 'mod-polo', makeId: 'make-vw', name: 'Polo 5 (6R/6C)', startYear: 2009, endYear: 2018 },
  { id: 'mod-caddy', makeId: 'make-vw', name: 'Caddy 3/4', startYear: 2004, endYear: 2020 },

  // Hyundai
  { id: 'mod-accent', makeId: 'make-hyundai', name: 'Accent (RB/HC)', startYear: 2011, endYear: 2023 },
  { id: 'mod-tucson', makeId: 'make-hyundai', name: 'Tucson (TL)', startYear: 2015, endYear: 2021 },
  { id: 'mod-i10', makeId: 'make-hyundai', name: 'Grand i10', startYear: 2014, endYear: 2022 },

  // Toyota
  { id: 'mod-hilux', makeId: 'make-toyota', name: 'Hilux', startYear: 2005, endYear: 2024 },
  { id: 'mod-yaris', makeId: 'make-toyota', name: 'Yaris', startYear: 2011, endYear: 2021 },

  // Kia
  { id: 'mod-picanto', makeId: 'make-kia', name: 'Picanto', startYear: 2011, endYear: 2023 },

  // Seat
  { id: 'mod-ibiza', makeId: 'make-seat', name: 'Ibiza 4/5', startYear: 2008, endYear: 2022 },
];

export const VEHICLE_ENGINES: VehicleEngine[] = [
  // Renault Symbol
  { id: 'eng-sym-12-16v', modelId: 'mod-symbol', name: '1.2 16V 75ch', engineCode: 'D4F 732', fuelType: 'Essence', displacementCc: 1149, powerHp: 75, powerKw: 55, transmission: 'Manuelle', yearsSpan: '2008-2021', startYear: 2008, endYear: 2021 },
  { id: 'eng-sym-16-mpi', modelId: 'mod-symbol', name: '1.6 MPI 85ch', engineCode: 'K7M 710', fuelType: 'Essence', displacementCc: 1598, powerHp: 85, powerKw: 62, transmission: 'Manuelle', yearsSpan: '2008-2020', startYear: 2008, endYear: 2020 },
  { id: 'eng-sym-15-dci', modelId: 'mod-symbol', name: '1.5 dCi 85ch', engineCode: 'K9K 700', fuelType: 'Diesel', displacementCc: 1461, powerHp: 85, powerKw: 63, transmission: 'Manuelle', yearsSpan: '2010-2021', startYear: 2010, endYear: 2021 },

  // Renault Clio 4
  { id: 'eng-clio4-15-dci-90', modelId: 'mod-clio4', name: '1.5 dCi 90ch Energy', engineCode: 'K9K 608', fuelType: 'Diesel', displacementCc: 1461, powerHp: 90, powerKw: 66, transmission: 'Manuelle', yearsSpan: '2012-2020', startYear: 2012, endYear: 2020 },
  { id: 'eng-clio4-09-tce', modelId: 'mod-clio4', name: '0.9 TCe 90ch', engineCode: 'H4B 400', fuelType: 'Essence', displacementCc: 898, powerHp: 90, powerKw: 66, transmission: 'Manuelle', yearsSpan: '2012-2020', startYear: 2012, endYear: 2020 },
  { id: 'eng-clio4-12-16v', modelId: 'mod-clio4', name: '1.2 16V 75ch', engineCode: 'D4F 740', fuelType: 'Essence', displacementCc: 1149, powerHp: 75, powerKw: 55, transmission: 'Manuelle', yearsSpan: '2012-2018', startYear: 2012, endYear: 2018 },

  // Dacia Sandero Stepway / Logan
  { id: 'eng-sandero-15-dci', modelId: 'mod-sandero', name: '1.5 dCi 85ch/90ch', engineCode: 'K9K 830', fuelType: 'Diesel', displacementCc: 1461, powerHp: 90, powerKw: 66, transmission: 'Manuelle', yearsSpan: '2013-2021', startYear: 2013, endYear: 2021 },
  { id: 'eng-logan-12-16v', modelId: 'mod-logan', name: '1.2 16V 75ch', engineCode: 'D4F 732', fuelType: 'Essence', displacementCc: 1149, powerHp: 75, powerKw: 55, transmission: 'Manuelle', yearsSpan: '2013-2021', startYear: 2013, endYear: 2021 },

  // Peugeot 208 & 301
  { id: 'eng-p208-16-hdi', modelId: 'mod-208', name: '1.6 HDi 92ch', engineCode: 'DV6DTED', fuelType: 'Diesel', displacementCc: 1560, powerHp: 92, powerKw: 68, transmission: 'Manuelle', yearsSpan: '2012-2019', startYear: 2012, endYear: 2019 },
  { id: 'eng-p208-12-vti', modelId: 'mod-208', name: '1.2 PureTech/VTi 82ch', engineCode: 'EB2 (HMZ)', fuelType: 'Essence', displacementCc: 1199, powerHp: 82, powerKw: 60, transmission: 'Manuelle', yearsSpan: '2012-2020', startYear: 2012, endYear: 2020 },
  { id: 'eng-p301-16-hdi', modelId: 'mod-301', name: '1.6 HDi 92ch', engineCode: 'DV6DTED', fuelType: 'Diesel', displacementCc: 1560, powerHp: 92, powerKw: 68, transmission: 'Manuelle', yearsSpan: '2012-2022', startYear: 2012, endYear: 2022 },

  // VW Golf 7 & Polo
  { id: 'eng-golf7-20-tdi', modelId: 'mod-golf7', name: '2.0 TDI 150ch BlueMotion', engineCode: 'CRBC / CRLB', fuelType: 'Diesel', displacementCc: 1968, powerHp: 150, powerKw: 110, transmission: 'Manuelle', yearsSpan: '2012-2020', startYear: 2012, endYear: 2020 },
  { id: 'eng-golf7-16-tdi', modelId: 'mod-golf7', name: '1.6 TDI 110ch', engineCode: 'CRKB / CXXB', fuelType: 'Diesel', displacementCc: 1598, powerHp: 110, powerKw: 81, transmission: 'Manuelle', yearsSpan: '2013-2020', startYear: 2013, endYear: 2020 },
  { id: 'eng-polo-14-tdi', modelId: 'mod-polo', name: '1.4 TDI 90ch', engineCode: 'CUSA', fuelType: 'Diesel', displacementCc: 1422, powerHp: 90, powerKw: 66, transmission: 'Manuelle', yearsSpan: '2014-2018', startYear: 2014, endYear: 2018 },

  // Hyundai Accent
  { id: 'eng-accent-14-gl', modelId: 'mod-accent', name: '1.4 GL 107ch', engineCode: 'G4FA', fuelType: 'Essence', displacementCc: 1396, powerHp: 107, powerKw: 79, transmission: 'Manuelle', yearsSpan: '2011-2020', startYear: 2011, endYear: 2020 },
  { id: 'eng-accent-16-crdi', modelId: 'mod-accent', name: '1.6 CRDi 128ch', engineCode: 'D4FB', fuelType: 'Diesel', displacementCc: 1582, powerHp: 128, powerKw: 94, transmission: 'Manuelle', yearsSpan: '2011-2021', startYear: 2011, endYear: 2021 },

  // Kia Picanto
  { id: 'eng-picanto-12-mpi', modelId: 'mod-picanto', name: '1.2 MPI 84ch', engineCode: 'G4LA', fuelType: 'Essence', displacementCc: 1248, powerHp: 84, powerKw: 62, transmission: 'Manuelle', yearsSpan: '2011-2022', startYear: 2011, endYear: 2022 },

  // Toyota Hilux
  { id: 'eng-hilux-25-d4d', modelId: 'mod-hilux', name: '2.5 D-4D 144ch 4WD', engineCode: '2KD-FTV', fuelType: 'Diesel', displacementCc: 2494, powerHp: 144, powerKw: 106, transmission: 'Manuelle', yearsSpan: '2006-2016', startYear: 2006, endYear: 2016 },
  { id: 'eng-hilux-24-d4d', modelId: 'mod-hilux', name: '2.4 D-4D 150ch 4WD', engineCode: '2GD-FTV', fuelType: 'Diesel', displacementCc: 2393, powerHp: 150, powerKw: 110, transmission: 'Manuelle', yearsSpan: '2015-2024', startYear: 2015, endYear: 2024 },

  // Seat Ibiza
  { id: 'eng-ibiza-16-mpi', modelId: 'mod-ibiza', name: '1.6 MPI 90ch/110ch', engineCode: 'CWVA', fuelType: 'Essence', displacementCc: 1598, powerHp: 90, powerKw: 66, transmission: 'Manuelle', yearsSpan: '2015-2021', startYear: 2015, endYear: 2021 },
];
