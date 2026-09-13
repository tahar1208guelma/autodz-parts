'use client';

import React from 'react';
import { MasterPart } from '../lib/types';
import { useApp } from '../lib/store/app-context';
import { checkPartCompatibility } from '../lib/compatibility';
import { CheckCircle, AlertTriangle, XCircle, Sparkles } from 'lucide-react';

interface CompatibilityBadgeProps {
  part: MasterPart;
  detailed?: boolean;
}

export function CompatibilityBadge({ part, detailed = false }: CompatibilityBadgeProps) {
  const { selectedVehicle, setIsVehicleModalOpen, language } = useApp();
  const result = checkPartCompatibility(part, selectedVehicle);

  const getIcon = () => {
    switch (result.status) {
      case 'EXACT_MATCH':
        return <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0" />;
      case 'UNIVERSAL_MATCH':
        return <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />;
      case 'INCOMPATIBLE':
        return <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />;
      case 'NO_VEHICLE_SELECTED':
      default:
        return <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />;
    }
  };

  const badgeText = language === 'ar' ? result.badgeTextAr : language === 'fr' ? result.badgeTextFr : result.badgeTextEn;
  const explanation = language === 'ar' ? result.explanationAr : result.explanationFr;

  return (
    <div className="space-y-1.5">
      <button
        onClick={() => {
          if (result.status === 'NO_VEHICLE_SELECTED' || result.status === 'INCOMPATIBLE') {
            setIsVehicleModalOpen(true);
          }
        }}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-bold transition-all ${result.colorClass} ${
          !result.isCompatible && result.status !== 'UNIVERSAL_MATCH' ? 'hover:scale-102 cursor-pointer' : ''
        }`}
      >
        {getIcon()}
        <span>{badgeText}</span>
      </button>

      {detailed && (
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
          {explanation}
        </p>
      )}
    </div>
  );
}
