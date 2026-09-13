'use client';

import React from 'react';
import { MasterPart } from '../lib/types';
import { useApp } from '../lib/store/app-context';
import { checkCaptivaPartCompatibility } from '../lib/compatibility';
import { 
  Wrench, 
  MessageCircle, 
  PhoneCall, 
  ShieldCheck, 
  Sparkles, 
  Check, 
  AlertTriangle,
  Send
} from 'lucide-react';

interface PartCardProps {
  part: MasterPart;
}

export function PartCard({ part }: PartCardProps) {
  const {
    selectedCaptiva,
    setSelectedPartForInquiry,
    setInquiryWithInstallation,
    openWhatsAppForPart,
  } = useApp();

  const compatResult = checkCaptivaPartCompatibility(part, selectedCaptiva);

  const handleRequestPart = (withInstallation: boolean = false) => {
    setInquiryWithInstallation(withInstallation);
    setSelectedPartForInquiry(part);
  };

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between">
      {/* Top Image & Condition Pill */}
      <div>
        <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <img
            src={part.images[0]}
            alt={part.nameAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Condition Badge (جديد / قديم مستعمل) */}
          <div className="absolute top-2.5 right-2.5 rtl:right-2.5 ltr:left-2.5 flex flex-col gap-1 items-start">
            <span
              className={`px-2.5 py-1 rounded-lg text-[11px] font-black tracking-wide shadow-sm ${
                part.condition === 'NEW'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-amber-600 text-white'
              }`}
            >
              {part.condition === 'NEW' ? 'قطعـة جديدة (Neuf)' : 'قديم مستعمل مضمون (Occasion)'}
            </span>

            {part.installationAvailable && (
              <span className="px-2 py-0.5 rounded-md bg-blue-600/95 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
                <Wrench className="w-3 h-3" />
                <span>تركيب متوفر</span>
              </span>
            )}
          </div>

          {/* Brand and OEM code */}
          <div className="absolute bottom-2 left-2 rtl:left-2 ltr:right-2">
            <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono">
              {part.oemNumber}
            </span>
          </div>
        </div>

        {/* Content Info */}
        <div className="p-4 space-y-3">
          {/* Compatibility Pill */}
          <div className="flex items-center gap-1 text-[11px] font-bold">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border ${compatResult.colorClass}`}
            >
              {compatResult.isCompatible ? (
                <Check className="w-3 h-3" />
              ) : (
                <AlertTriangle className="w-3 h-3" />
              )}
              <span>{compatResult.badgeTextAr}</span>
            </span>
          </div>

          <h3 className="text-sm font-black text-slate-900 dark:text-white leading-snug line-clamp-2">
            {part.nameAr}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {part.descriptionAr}
          </p>

          {/* Guarantee & Features */}
          <div className="text-[11px] text-slate-500 bg-slate-50 dark:bg-slate-800/60 p-2 rounded-lg border border-slate-100 dark:border-slate-800 space-y-0.5">
            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>{part.warrantyText}</span>
            </div>
            <div className="text-slate-400">
              الماركة: <strong className="text-slate-700 dark:text-slate-300">{part.brand}</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Footer & Actions without Price */}
      <div className="p-4 pt-0 space-y-2.5">
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div>
            <span className="block text-[10px] text-slate-400">سعر القطعة:</span>
            <span className="text-xs font-black text-amber-600 dark:text-amber-400">
              السعر عند الطلب (Sur Devis)
            </span>
          </div>

          <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
            متوفر وجاهز
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs font-bold">
          {/* Order Part Button */}
          <button
            onClick={() => handleRequestPart(false)}
            className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>طلب القطعة</span>
          </button>

          {/* WhatsApp Direct */}
          <button
            onClick={() => openWhatsAppForPart(part, false)}
            className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white flex items-center justify-center gap-1 shadow-sm transition-all"
            title="مراسلة عبر واتساب"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>واتساب</span>
          </button>
        </div>

        {/* Installation Option Button */}
        {part.installationAvailable && (
          <button
            onClick={() => handleRequestPart(true)}
            className="w-full py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition-colors"
          >
            <Wrench className="w-3 h-3 text-blue-600" />
            <span>طلب القطعة + خدمة التركيب في الورشة</span>
          </button>
        )}
      </div>
    </div>
  );
}
