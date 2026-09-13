export type Language = 'ar' | 'fr' | 'en';

export type UserRole = 'customer' | 'seller' | 'admin';

export type FuelType = 'Essence' | 'Diesel' | 'GPL' | 'Hybride' | 'Electrique';

export type TransmissionType = 'Manuelle' | 'Automatique';

export interface VehicleMake {
  id: string;
  name: string;
  logo: string;
  country: string;
  popularInAlgeria?: boolean;
}

export interface VehicleModel {
  id: string;
  makeId: string;
  name: string;
  startYear: number;
  endYear?: number;
}

export interface VehicleEngine {
  id: string;
  modelId: string;
  name: string; // e.g., "1.5 dCi 90ch"
  engineCode: string; // e.g., "K9K 608"
  fuelType: FuelType;
  displacementCc: number; // e.g. 1461
  powerHp: number; // 90
  powerKw: number; // 66
  transmission: TransmissionType;
  yearsSpan: string; // "2012-2020"
  startYear: number;
  endYear: number;
}

export interface SelectedVehicle {
  make: VehicleMake;
  model: VehicleModel;
  engine: VehicleEngine;
  year: number;
}

export interface Category {
  id: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  slug: string;
  iconName: string;
  parentId?: string;
  itemCount?: number;
}

export interface OEMReference {
  carMaker: string; // Renault, Peugeot, VW
  oemCode: string; // "410602192R"
}

export interface CrossReference {
  brand: string; // Bosch, Valeo, Brembo
  code: string; // "0 986 494 675"
}

export interface MasterPart {
  id: string;
  slug: string;
  nameAr: string;
  nameFr: string;
  nameEn: string;
  brand: string; // OEM or Aftermarket brand
  mainPartNumber: string; // Reference code
  categoryId: string;
  isUniversal: boolean;
  images: string[];
  descriptionAr: string;
  descriptionFr: string;
  specifications: Record<string, string>;
  oemReferences: OEMReference[];
  crossReferences: CrossReference[];
  compatibleEngineIds: string[]; // List of VehicleEngine ids
  weightKg: number;
  warrantyMonths: number;
}

export type PartCondition = 'NEW_ORIGINAL' | 'NEW_ADAPTABLE' | 'REMANUFACTURED' | 'USED_ORIGINAL';

export interface StoreOffer {
  id: string;
  partId: string;
  storeId: string;
  storeName: string;
  storeWilaya: string;
  storeRating: number;
  priceDzd: number;
  compareAtPriceDzd?: number;
  stockQuantity: number;
  condition: PartCondition;
  isOriginBox: boolean;
  preparationDays: number;
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

export interface CartItem {
  part: MasterPart;
  offer: StoreOffer;
  quantity: number;
}

export type DeliveryType = 'STOP_DESK' | 'HOME_DELIVERY';

export type PaymentMethod = 'COD' | 'EDAHABIA_CIB';

export type OrderStatus = 
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED_PAID'
  | 'CANCELLED'
  | 'RETURNED';

export interface OrderCustomerInfo {
  fullName: string;
  phoneNumber: string;
  wilayaCode: number;
  commune: string;
  address?: string;
  notes?: string;
}

export interface Order {
  id: string;
  trackingNumber: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  deliveryType: DeliveryType;
  shippingFeeDzd: number;
  subtotalDzd: number;
  totalDzd: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  courier: 'YALIDINE' | 'ZR_EXPRESS' | 'PROCOLIS';
  createdAt: string;
  vehicleDetails?: string;
}

export interface Review {
  id: string;
  partId: string;
  authorName: string;
  wilaya: string;
  carModel: string;
  rating: number;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
}
