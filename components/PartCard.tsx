'use client';

import React from 'react';
import { MasterPart } from '../lib/types';
import { STORE_OFFERS } from '../lib/data/parts-data';
import { useApp } from '../lib/store/app-context';
import { CompatibilityBadge } from './CompatibilityBadge';
import { formatDZD } from '../lib/utils';
import { ShoppingCart, Eye, ShieldCheck, Store } from 'lucide-react';

interface PartCardProps {
  part: MasterPart;
  onOpenDetail: (part: MasterPart) => void;
}

export function PartCard({ part, onOpenDetail }: PartCardProps) {
  const { addToCart } = useApp();
  const offers = STORE_OFFERS.filter((o) => o.partId === part.id);
  const bestOffer = offers.length > 0
    ? offers.reduce((min, o) => (o.priceDzd < min.priceDzd ? o : min), offers[0])
    : null;

  return (
    <div className="group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col">
      {/* Top Image & Badges */}
      <div className="relative h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden cursor-pointer" onClick={() => onOpenDetail(part)}>
        <img
          src={part.images[0]}
          alt={part.nameAr}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2.5 right-2.5 rtl:right-2.5 ltr:left-2.5 flex flex-col gap-1 items-start">
          <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-xs text-white text-[10px] font-black tracking-wider">
            {part.brand}
          </span>
          {part.isUniversal && (
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-600/90 text-white text-[9px] font-bold">
              عالمي
            </span>
          )}
        </div>

        <div className="absolute bottom-2 left-2 rtl:left-2 ltr:right-2">
          <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono">
            {part.mainPartNumber}
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-2">
          {/* Compatibility Pill */}
          <CompatibilityBadge part={part} />

          <h3
            onClick={() => onOpenDetail(part)}
            className="text-sm font-black text-slate-900 dark:text-white line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
          >
            {part.nameAr}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2">
            {part.descriptionAr}
          </p>
        </div>

        {/* Price & Offers summary */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-[10px] text-slate-400">يبدأ من:</span>
              <span className="text-base font-black text-blue-600 dark:text-blue-400">
                {bestOffer ? formatDZD(bestOffer.priceDzd) : 'غير متوفر'}
              </span>
            </div>

            {offers.length > 0 && (
              <span className="flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-lg">
                <Store className="w-3 h-3 text-slate-400" />
                {offers.length} متاجر
              </span>
            )}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDetail(part)}
              className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>التفاصيل</span>
            </button>

            <button
              disabled={!bestOffer}
              onClick={() => bestOffer && addToCart(part, bestOffer, 1)}
              className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 disabled:opacity-50 text-white text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>أضف للسلة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
