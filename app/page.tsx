'use client';

import React, { useState } from 'react';
import { useApp } from '../lib/store/app-context';
import { CAPTIVA_PARTS, CATEGORIES } from '../lib/data/parts-data';
import { PartCard } from '../components/PartCard';
import { InquiryModal } from '../components/InquiryModal';
import { VehicleSelectorModal } from '../components/VehicleSelectorModal';
import { CONTACT_INFO } from '../lib/types';
import { 
  Car, 
  Wrench, 
  Phone, 
  MessageCircle, 
  Mail, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  Layers, 
  Filter, 
  Check, 
  CheckCircle2, 
  Clock,
  X
} from 'lucide-react';

export default function CaptivaHomePage() {
  const {
    conditionFilter,
    setConditionFilter,
    selectedCategoryId,
    setSelectedCategoryId,
    searchQuery,
    setSearchQuery,
    selectedCaptiva,
    setIsVehicleModalOpen,
  } = useApp();

  const [onlyCompatible, setOnlyCompatible] = useState(false);

  // Filter parts
  const filteredParts = CAPTIVA_PARTS.filter((part) => {
    // Condition filter (All, NEW, USED)
    if (conditionFilter !== 'ALL' && part.condition !== conditionFilter) {
      return false;
    }

    // Category filter
    if (selectedCategoryId && part.categoryId !== selectedCategoryId) {
      return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().replace(/[\s\-\.]/g, '');
      const name = part.nameAr.toLowerCase();
      const oem = part.oemNumber.toLowerCase().replace(/[\s\-\.]/g, '');
      const brand = part.brand.toLowerCase();
      const desc = part.descriptionAr.toLowerCase();

      const matches = name.includes(searchQuery.toLowerCase()) || oem.includes(q) || brand.includes(q) || desc.includes(searchQuery.toLowerCase());
      if (!matches) return false;
    }

    // Compatibility filter if user selected a Captiva
    if (onlyCompatible && selectedCaptiva) {
      const matchesGen = part.compatibleGenerations.includes(selectedCaptiva.generation.id);
      const matchesEng = part.compatibleEngineIds.length === 0 || part.compatibleEngineIds.includes(selectedCaptiva.engine.id);
      if (!matchesGen || !matchesEng) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-950 text-white py-12 px-4 border-b border-slate-800">
        <div className="absolute inset-0 bg-radial from-amber-600/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>المركز المعتمد لقطع غيار وصيانة Chevrolet Captiva في الجزائر</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              قطع غيار <span className="text-amber-400">شيفروليه كابتيفا</span> (جديد وقديم)
              <br />
              <span className="text-xl sm:text-3xl text-slate-200 font-bold">
                مع خدمة التركيب من طرف فريق الصيانة
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              نوفر جميع قطع غيار كابتيفا (محركات، تيربو، علب سرعات، دفرنسيال 4x4، ممتصات صدمات، كمبروسر، وحواسيب ECU). قطع جديدة أصلية ومستعملة مضمونة (Décharge)، مع فريق فني متخصص يتكفل بعملية الإسقاط والتركيب والفحص الشامل.
            </p>
          </div>

          {/* Quick Contact & Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <Phone className="w-4 h-4" />
              <span>اتصال مباشر بالمدير: {CONTACT_INFO.phoneFormatted}</span>
            </a>

            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، أتواصل معكم بخصوص قطع غيار وصيانة شيفروليه كابتيفا.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center gap-2 shadow-lg transition-all active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>مراسلة فورية عبر WhatsApp</span>
            </a>

            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              <span>{CONTACT_INFO.email}</span>
            </a>
          </div>

          {/* Active Vehicle Bar */}
          <div className="bg-white/10 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 max-w-3xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">فئة كابتيفا المحددة للبحث:</span>
                <h4 className="text-sm font-bold text-white">
                  {selectedCaptiva
                    ? `${selectedCaptiva.generation.generation} - ${selectedCaptiva.engine.name}`
                    : 'عرض قطع جميع موديلات وأجيال كابتيفا'}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setIsVehicleModalOpen(true)}
                className="flex-1 sm:flex-none px-4 py-1.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100"
              >
                {selectedCaptiva ? 'تغيير الموديل' : 'تحديد موديل سيارتك'}
              </button>
              {selectedCaptiva && (
                <button
                  onClick={() => setOnlyCompatible(!onlyCompatible)}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    onlyCompatible
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  {onlyCompatible ? 'عرض الكل' : 'المطابق لسيارتي فقط'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Services Highlights */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">خدمة التركيب بالورشة</h4>
              <p className="text-[11px] text-slate-500">فريق صيانة متخصص في كابتيفا</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">قطع جديدة وقديمة</h4>
              <p className="text-[11px] text-slate-500">أصلي في العلبة ومستعمل Décharge</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">ضمان وفحص بالكمبيوتر</h4>
              <p className="text-[11px] text-slate-500">فحص Scanner لجميع القطع الكهربائية</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">توصيل لكافة الـ 58 ولاية</h4>
              <p className="text-[11px] text-slate-500">شحن سريع مع الدفع عند الاستلام</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Condition Filter (الكل / جديد / قديم مستعمل) */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              حالة قطع غيار كابتيفا:
            </span>
            <p className="text-[11px] text-slate-400">
              اختر بين القطع الجديدة في العلبة أو القطع القديمة المستعملة والمضمونة
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setConditionFilter('ALL')}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                conditionFilter === 'ALL'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              الكل ({CAPTIVA_PARTS.length})
            </button>
            <button
              onClick={() => setConditionFilter('NEW')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                conditionFilter === 'NEW'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-emerald-600'
              }`}
            >
              <span>قطع جديدة (Neuf)</span>
            </button>
            <button
              onClick={() => setConditionFilter('USED')}
              className={`px-3.5 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                conditionFilter === 'USED'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-amber-600'
              }`}
            >
              <span>قديم مستعمل (Occasion)</span>
            </button>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              أقسام قطع غيار كابتيفا
            </h3>
            {selectedCategoryId && (
              <button
                onClick={() => setSelectedCategoryId(null)}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                عرض كل الأقسام
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategoryId(null)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategoryId === null
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              كافة القطع
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategoryId === cat.id
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                }`}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter Bar */}
        <div className="flex items-center justify-between text-xs text-slate-500 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
          <div>
            القطع المعروضة: <strong className="text-slate-900 dark:text-white">{filteredParts.length}</strong> قطعة متوفرة لكابتيفا
            {searchQuery && <span> • بحث عن: &quot;{searchQuery}&quot;</span>}
          </div>

          <div className="text-[11px] text-amber-600 font-bold">
            * للحصول على الأسعار الفورية، يرجى الضغط على زر &quot;طلب القطعة&quot; أو زر WhatsApp
          </div>
        </div>

        {/* Parts Grid */}
        {filteredParts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Filter className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
              لم يتم العثور على قطع تطابق بحثك
            </h4>
            <p className="text-xs text-slate-500">
              تواصل مباشرة مع المدير على 0770082742 لتوفير أي قطعة غير مدرجة في الموقع.
            </p>
            <button
              onClick={() => {
                setConditionFilter('ALL');
                setSelectedCategoryId(null);
                setSearchQuery('');
                setOnlyCompatible(false);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
            >
              إعادة تعيين الفلاتر
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredParts.map((part) => (
              <PartCard key={part.id} part={part} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
