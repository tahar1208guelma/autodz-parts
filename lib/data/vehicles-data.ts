import { CaptivaModelYear, CaptivaEngine } from '../types';

export const CAPTIVA_GENERATIONS: CaptivaModelYear[] = [
  {
    id: 'gen-c100',
    generation: 'كابتيفا الجيل الأول (Captiva C100)',
    yearsSpan: '2006 - 2011',
    startYear: 2006,
    endYear: 2011,
  },
  {
    id: 'gen-c140',
    generation: 'كابتيفا فيس ليفت (Captiva C140 Facelift)',
    yearsSpan: '2011 - 2018',
    startYear: 2011,
    endYear: 2018,
  },
  {
    id: 'gen-new',
    generation: 'كابتيفا الجيل الجديد (New Captiva Turbo)',
    yearsSpan: '2019 - 2024',
    startYear: 2019,
    endYear: 2024,
  },
];

export const CAPTIVA_ENGINES: CaptivaEngine[] = [
  // C100 (2006-2011)
  {
    id: 'eng-c100-20-vcdi-150',
    generationId: 'gen-c100',
    name: '2.0 VCDi 150ch ديزل (Z20S)',
    engineCode: 'Z20S / Z20DMH',
    fuelType: 'Diesel',
    displacement: '1991 cc',
    powerHp: 150,
    transmission: 'Manuelle / Automatique (4x2 & 4x4)',
  },
  {
    id: 'eng-c100-20-vcdi-127',
    generationId: 'gen-c100',
    name: '2.0 VCDi 127ch ديزل (Z20S)',
    engineCode: 'Z20S',
    fuelType: 'Diesel',
    displacement: '1991 cc',
    powerHp: 127,
    transmission: 'Manuelle 5 vitesses',
  },
  {
    id: 'eng-c100-24-essence',
    generationId: 'gen-c100',
    name: '2.4 DOHC 136ch بنزين (Z24SED)',
    engineCode: 'Z24SED',
    fuelType: 'Essence',
    displacement: '2405 cc',
    powerHp: 136,
    transmission: 'Manuelle / Automatique',
  },
  {
    id: 'eng-c100-32-v6',
    generationId: 'gen-c100',
    name: '3.2 V6 230ch بنزين (Alloytec)',
    engineCode: 'LU1 / 10HM',
    fuelType: 'Essence',
    displacement: '3195 cc',
    powerHp: 230,
    transmission: 'Automatique AWD 4x4',
  },

  // C140 Facelift (2011-2018)
  {
    id: 'eng-c140-22-vcdi-184',
    generationId: 'gen-c140',
    name: '2.2 VCDi 184ch ديزل توربو (A22DMH)',
    engineCode: 'A22DMH / LNQ',
    fuelType: 'Diesel',
    displacement: '2231 cc',
    powerHp: 184,
    transmission: 'Automatique / Manuelle 6V (AWD 4x4)',
  },
  {
    id: 'eng-c140-22-vcdi-163',
    generationId: 'gen-c140',
    name: '2.2 VCDi 163ch ديزل (A22DMS)',
    engineCode: 'A22DMS / LNP',
    fuelType: 'Diesel',
    displacement: '2231 cc',
    powerHp: 163,
    transmission: 'Manuelle 6 vitesses',
  },
  {
    id: 'eng-c140-24-ecotec',
    generationId: 'gen-c140',
    name: '2.4 ECOTEC 167ch بنزين (LE5)',
    engineCode: 'LE5 / LE9',
    fuelType: 'Essence',
    displacement: '2384 cc',
    powerHp: 167,
    transmission: 'Manuelle / Automatique',
  },

  // New Gen (2019-2024)
  {
    id: 'eng-new-15-turbo',
    generationId: 'gen-new',
    name: '1.5 Turbo 147ch بنزين',
    engineCode: 'LJO 1.5T',
    fuelType: 'Essence',
    displacement: '1451 cc',
    powerHp: 147,
    transmission: 'Automatique CVT',
  },
];
