export type Language = 'ar' | 'fr' | 'en';

export type PartCondition = 'NEW' | 'USED'; // جديد أو قديم مستعمل

export interface CaptivaModelYear {
  id: string;
  generation: string; // e.g. "Captiva C100 (2006 - 2011)", "Captiva C140 (2011 - 2018)", "Captiva New Gen (2019+)"
  yearsSpan: string;
  startYear: number;
  endYear: number;
}

export interface CaptivaEngine {
  id: string;
  name: string; // e.g., "2.0 VCDi 150ch Diesel"
  engineCode: string; // e.g., "Z20S", "A22DMH", "LD9"
  fuelType: 'Diesel' | 'Essence';
  displacement: string;
  powerHp: number;
  generationId: string;
  transmission: string;
}

export interface SelectedCaptiva {
  generation: CaptivaModelYear;
  engine: CaptivaEngine;
  year?: number;
}

export interface Category {
  id: string;
  nameAr: string;
  nameFr: string;
  slug: string;
  iconName: string;
}

export interface MasterPart {
  id: string;
  slug: string;
  nameAr: string;
  nameFr: string;
  brand: string; // OEM GM / Chevrolet, Valeo, Bosch, Sachs, etc.
  oemNumber: string; // GM Part number
  categoryId: string;
  condition: PartCondition; // جديد أو قديم
  images: string[];
  descriptionAr: string;
  descriptionFr: string;
  specifications: Record<string, string>;
  installationAvailable: boolean; // هل خدمة التركيب متوفرة لهذه القطعة
  compatibleGenerations: string[]; // List of generationIds
  compatibleEngineIds: string[]; // List of engineIds
  inStock: boolean;
  warrantyText: string;
}

export interface PartInquiry {
  id: string;
  partId: string;
  partName: string;
  partCondition: PartCondition;
  customerName: string;
  customerPhone: string;
  wilayaCode: number;
  commune: string;
  withInstallation: boolean;
  vehicleYear?: string;
  notes?: string;
  createdAt: string;
}

export interface Wilaya {
  code: number;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  stopDeskFeeDzd: number;
  homeDeliveryFeeDzd: number;
  estimatedDays: string;
  isAvailable: boolean;
}

export const CONTACT_INFO = {
  managerName: 'إدارة مبيعات وصيانة كابتيفا',
  phone: '0770082742',
  phoneFormatted: '0770 08 27 42',
  whatsappNumber: '213770082742',
  email: 'abraknia@gmail.com',
  workshopLocation: 'الجزائر - متوفر ورشة التركيب والشحن لكافة الـ 58 ولاية',
};
