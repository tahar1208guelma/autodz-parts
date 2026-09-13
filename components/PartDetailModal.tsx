'use client';

import React, { useState } from 'react';
import { MasterPart, StoreOffer, Review } from '../lib/types';
import { STORE_OFFERS, REVIEWS } from '../lib/data/parts-data';
import { ALGERIA_WILAYAS, getWilayaByCode } from '../lib/data/algeria-wilayas';
import { useApp } from '../lib/store/app-context';
import { CompatibilityBadge } from './CompatibilityBadge';
import { formatDZD } from '../lib/utils';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  Store, 
  Check, 
  Star, 
  MapPin, 
  Layers, 
  Clock, 
  ShoppingCart,
  CheckCircle2
} from 'lucide-react';

interface PartDetailModalProps {
  part: MasterPart | null;
  onClose: () => void;
}

export function PartDetailModal({ part, onClose }: PartDetailModalProps) {
  const { addToCart, selectedWilayaCode, language } = useApp();
  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'offers' | 'specs' | 'reviews'>('offers');

  if (!part) return null;

  const offers = STORE_OFFERS.filter((o) => o.partId === part.id);
  const reviews = REVIEWS.filter((r) => r.partId === part.id);
  const wilaya = getWilayaByCode(selectedWilayaCode) || ALGERIA_WILAYAS[15];

  const currentSelectedOffer = selectedOfferId 
    ? offers.find(o => o.id === selectedOfferId) || offers[0]
    : offers[0];

  const handleAddToCart = (offer: StoreOffer) => {
    addToCart(part, offer, 1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 font-extrabold">
              {part.brand}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Réf: {part.mainPartNumber}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Part Top Profile */}
          <div className="flex flex-col sm:flex-row gap-5">
            <div className="w-full sm:w-56 h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
              <img
                src={part.images[0]}
                alt={part.nameAr}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 space-y-3">
              <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-snug">
                {language === 'ar' ? part.nameAr : part.nameFr}
              </h1>

              {/* Compatibility Badge with detailed notice */}
              <CompatibilityBadge part={part} detailed={true} />

              {/* OEM and Cross References */}
              <div className="space-y-1.5 pt-2">
                {part.oemReferences.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="font-bold text-slate-500 dark:text-slate-400">
                      أرقام OEM الأصلية:
                    </span>
                    {part.oemReferences.map((oem, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded font-mono font-bold text-slate-800 dark:text-slate-200 text-[11px]"
                      >
                        {oem.carMaker}: {oem.oemCode}
                      </span>
                    ))}
                  </div>
                )}

                {part.crossReferences.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    <span className="font-bold text-slate-500 dark:text-slate-400">
                      البدائل المعادلة:
                    </span>
                    {part.crossReferences.map((cross, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded font-mono text-slate-600 dark:text-slate-400 text-[11px]"
                      >
                        {cross.brand}: {cross.code}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Shipping estimation */}
              <div className="flex items-center gap-2 text-xs bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg border border-slate-200 dark:border-slate-800">
                <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="text-slate-600 dark:text-slate-300">
                  توصيل سريع إلى <strong className="text-slate-900 dark:text-white">{wilaya.nameAr}</strong>: {wilaya.stopDeskFeeDzd} د.ج (المكتب) / {wilaya.homeDeliveryFeeDzd} د.ج (المنزل)
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 text-xs font-bold">
            <button
              onClick={() => setActiveTab('offers')}
              className={`pb-2.5 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'offers'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Store className="w-4 h-4" />
              <span>متاجر توفر القطعة ({offers.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-2.5 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'specs'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>المواصفات الفنية</span>
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2.5 px-4 border-b-2 transition-colors flex items-center gap-1.5 ${
                activeTab === 'reviews'
                  ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Star className="w-4 h-4 text-amber-500" />
              <span>آراء المشترين ({reviews.length})</span>
            </button>
          </div>

          {/* Tab 1: Competing Store Offers */}
          {activeTab === 'offers' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500">
                اختر المتجر الأنسب لك من حيث السعر، موقع المحل، والضمان:
              </p>
              <div className="space-y-2.5">
                {offers.map((off) => (
                  <div
                    key={off.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-700 bg-white dark:bg-slate-800/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Store className="w-4 h-4 text-slate-400" />
                        <span className="font-bold text-sm text-slate-900 dark:text-white">
                          {off.storeName}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 px-1.5 py-0.2 rounded font-bold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {off.storeRating}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          {off.storeWilaya}
                        </span>
                        <span>•</span>
                        <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                          {off.condition === 'NEW_ORIGINAL' ? 'أصلي جديد 100%' : 'قابل للتكيف معتمد'}
                        </span>
                        <span>•</span>
                        <span>المخزون: {off.stockQuantity} قطعة</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                      <div className="text-right rtl:text-right ltr:text-left">
                        <span className="block text-base font-black text-blue-600 dark:text-blue-400">
                          {formatDZD(off.priceDzd)}
                        </span>
                        {off.compareAtPriceDzd && (
                          <span className="block text-[11px] line-through text-slate-400">
                            {formatDZD(off.compareAtPriceDzd)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => handleAddToCart(off)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold shadow-md transition-all"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>طلب من هذا المتجر</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Technical Specifications */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'ar' ? part.descriptionAr : part.descriptionFr}
              </p>

              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                <table className="w-full text-right rtl:text-right ltr:text-left">
                  <tbody>
                    {Object.entries(part.specifications).map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? 'bg-slate-50 dark:bg-slate-800/40' : 'bg-white dark:bg-slate-900'}
                      >
                        <td className="p-2.5 font-bold text-slate-700 dark:text-slate-300 w-1/3 border-b border-slate-100 dark:border-slate-800">
                          {key}
                        </td>
                        <td className="p-2.5 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">
                          {val}
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-slate-50 dark:bg-slate-800/40">
                      <td className="p-2.5 font-bold text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">
                        الوزن الصافي للشحن
                      </td>
                      <td className="p-2.5 text-slate-600 dark:text-slate-300 border-b border-slate-100 dark:border-slate-800">
                        {part.weightKg} كغ
                      </td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-700 dark:text-slate-300">
                        مدة الضمان التجاري
                      </td>
                      <td className="p-2.5 text-emerald-600 font-bold">
                        {part.warrantyMonths} شهراً
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Reviews */}
          {activeTab === 'reviews' && (
            <div className="space-y-3">
              {reviews.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">
                  لا توجد تقييمات منشورة لهذه القطعة بعد. كن أول من يشارك تجربته!
                </p>
              ) : (
                reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">
                          {rev.authorName}
                        </span>
                        <span className="text-[11px] text-slate-400">({rev.wilaya})</span>
                        {rev.isVerifiedPurchase && (
                          <span className="flex items-center gap-0.5 text-[10px] text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-1.5 py-0.5 rounded font-bold">
                            <Check className="w-2.5 h-2.5" />
                            شراء مؤكد
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300">
                      {rev.comment}
                    </p>
                    <span className="text-[10px] text-slate-400 block">{rev.date}</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          <div>
            <span className="block text-[11px] text-slate-500">أفضل سعر متوفر:</span>
            <span className="font-black text-lg text-slate-900 dark:text-white">
              {offers.length > 0
                ? formatDZD(Math.min(...offers.map((o) => o.priceDzd)))
                : 'غير متوفر'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              إغلاق
            </button>
            {offers.length > 0 && (
              <button
                onClick={() => {
                  handleAddToCart(currentSelectedOffer);
                  onClose();
                }}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-black shadow-md transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>إضافة للسلة وتحديد الطلب</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
