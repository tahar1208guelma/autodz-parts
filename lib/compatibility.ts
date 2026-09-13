import { MasterPart, SelectedVehicle } from './types';

export type CompatibilityStatus = 
  | 'NO_VEHICLE_SELECTED'
  | 'EXACT_MATCH'
  | 'UNIVERSAL_MATCH'
  | 'INCOMPATIBLE';

export interface CompatibilityCheckResult {
  status: CompatibilityStatus;
  badgeTextAr: string;
  badgeTextFr: string;
  badgeTextEn: string;
  explanationAr: string;
  explanationFr: string;
  isCompatible: boolean;
  colorClass: string;
}

export function checkPartCompatibility(
  part: MasterPart,
  selectedVehicle: SelectedVehicle | null
): CompatibilityCheckResult {
  // If part is universal (e.g. oil, fluids, accessories)
  if (part.isUniversal) {
    return {
      status: 'UNIVERSAL_MATCH',
      badgeTextAr: 'قطعة عامة لجميع السيارات',
      badgeTextFr: 'Universel (Tous Véhicules)',
      badgeTextEn: 'Universal Fit',
      explanationAr: 'هذا المنتج ملائم لجميع موديلات ومحركات المركبات ولا يتطلب تطابقاً ميكانيكياً خاصاً.',
      explanationFr: 'Ce produit est compatible avec tous types de véhicules sans restriction mécanique.',
      isCompatible: true,
      colorClass: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
    };
  }

  // If no vehicle is selected by user
  if (!selectedVehicle) {
    return {
      status: 'NO_VEHICLE_SELECTED',
      badgeTextAr: 'اختر سيارتك لتأكيد التوافق',
      badgeTextFr: 'Sélectionnez votre véhicule',
      badgeTextEn: 'Select your vehicle to verify',
      explanationAr: 'حدد ماركة وموديل ومحرك سيارتك للتأكد من أن هذه القطعة تركب بدقة 100% دون مشاكل.',
      explanationFr: 'Indiquez votre véhicule pour garantir la compatibilité mécanique avant commande.',
      isCompatible: false,
      colorClass: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
    };
  }

  // Check if the engine ID is in the part's compatible list
  const isDirectMatch = part.compatibleEngineIds.includes(selectedVehicle.engine.id);

  if (isDirectMatch) {
    const vehicleDesc = `${selectedVehicle.make.name} ${selectedVehicle.model.name} (${selectedVehicle.engine.name})`;
    return {
      status: 'EXACT_MATCH',
      badgeTextAr: 'متوافق 100% مع سيارتك',
      badgeTextFr: 'Compatible à 100%',
      badgeTextEn: '100% Guaranteed Fit',
      explanationAr: `تم التحقق: هذه القطعة متوافقة ميكانيكياً وكهربائياً مع سيارتك (${vehicleDesc}) برمز المحرك ${selectedVehicle.engine.engineCode}.`,
      explanationFr: `Compatibilité vérifiée avec ${vehicleDesc} - Code Moteur ${selectedVehicle.engine.engineCode}.`,
      isCompatible: true,
      colorClass: 'bg-green-50 text-green-700 border-green-300 dark:bg-green-950/50 dark:text-green-400 dark:border-green-800',
    };
  }

  // If not compatible
  const selectedVehicleDesc = `${selectedVehicle.make.name} ${selectedVehicle.model.name} ${selectedVehicle.engine.name}`;
  return {
    status: 'INCOMPATIBLE',
    badgeTextAr: 'غير متوافق مع سيارتك المحددة',
    badgeTextFr: 'Incompatible avec votre véhicule',
    badgeTextEn: 'Not Compatible',
    explanationAr: `تنبيه: هذه القطعة غير مخصصة لسيارتك (${selectedVehicleDesc}). لا نوصي بطلبها لتفادي مشاكل التركيب أو الإرجاع.`,
    explanationFr: `Attention : cette pièce n'est pas adaptée à votre ${selectedVehicleDesc}.`,
    isCompatible: false,
    colorClass: 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800',
  };
}
