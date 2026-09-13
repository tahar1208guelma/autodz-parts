import { MasterPart, SelectedCaptiva } from './types';

export interface CompatibilityCheckResult {
  isCompatible: boolean;
  badgeTextAr: string;
  badgeTextFr: string;
  colorClass: string;
  explanationAr: string;
}

export function checkCaptivaPartCompatibility(
  part: MasterPart,
  selected: SelectedCaptiva | null
): CompatibilityCheckResult {
  if (!selected) {
    return {
      isCompatible: false,
      badgeTextAr: 'حدد موديل ومحرك كابتيفا لتأكيد المطابقة',
      badgeTextFr: 'Sélectionnez votre version de Captiva',
      colorClass: 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800',
      explanationAr: 'اختر سنة الصنع ومحرك سيارتك كابتيفا للتأكد من مطابقة هذه القطعة بنسبة 100%.',
    };
  }

  const matchesGeneration = part.compatibleGenerations.includes(selected.generation.id);
  const matchesEngine = part.compatibleEngineIds.length === 0 || part.compatibleEngineIds.includes(selected.engine.id);

  if (matchesGeneration && matchesEngine) {
    return {
      isCompatible: true,
      badgeTextAr: `متوافق 100% مع ${selected.generation.generation} (${selected.engine.name})`,
      badgeTextFr: `Compatible à 100% avec votre Captiva`,
      colorClass: 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800',
      explanationAr: `تم التحقق: هذه القطعة تطابق تماماً سيارتك شيفروليه كابتيفا (${selected.engine.name}) مع إمكانية التركيب في ورشتنا.`,
    };
  }

  return {
    isCompatible: false,
    badgeTextAr: `غير مخصص لـ ${selected.generation.generation}`,
    badgeTextFr: `Non compatible avec cette version`,
    colorClass: 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800',
    explanationAr: `تنبيه: هذه القطعة مخصصة لجيل أو محرك آخر من كابتيفا. تواصل مع المدير 0770082742 لتوفير البديل المناسب لسيارتك.`,
  };
}
