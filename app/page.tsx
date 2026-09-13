'use client';

import React, { useState } from 'react';
import { useApp } from '../lib/store/app-context';
import { MASTER_PARTS, CATEGORIES } from '../lib/data/parts-data';
import { MasterPart } from '../lib/types';
import { PartCard } from '../components/PartCard';
import { PartDetailModal } from '../components/PartDetailModal';
import { SellerDashboard } from '../components/SellerDashboard';
import { AdminDashboard } from '../components/AdminDashboard';
import { checkPartCompatibility } from '../lib/compatibility';
import { 
  Car, 
  ShieldCheck, 
  Truck, 
  Banknote, 
  Headphones, 
  Sparkles, 
  Filter, 
  CheckCircle2, 
  X, 
  SlidersHorizontal,
  Layers
} from 'lucide-react';

export default function HomePage() {
  const {
    userRole,
    selectedVehicle,
    searchQuery,
    setSearchQuery,
    selectedCategoryId,
    setSelectedCategoryId,
    setIsVehicleModalOpen,
    language,
  } = useApp();

  const [selectedPartForDetail, setSelectedPartForDetail] = useState<MasterPart | null>(null);
  const [onlyCompatible, setOnlyCompatible] = useState(false);

  // If user switched to Seller or Admin views
  if (userRole === 'seller') {
    return <SellerDashboard />;
  }
  if (userRole === 'admin') {
    return <AdminDashboard />;
  }

  // Filter parts based on search, category, and compatibility
  const filteredParts = MASTER_PARTS.filter((part) => {
    // Category filter
    if (selectedCategoryId && part.categoryId !== selectedCategoryId) {
      return false;
    }

    // Search query filter (search by name Ar/Fr, brand, partNumber, OEM code, or cross-ref code)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().replace(/[\s\-\.]/g, '');
      const nameAr = part.nameAr.toLowerCase();
      const nameFr = part.nameFr.toLowerCase();
      const brand = part.brand.toLowerCase();
      const partNum = part.mainPartNumber.toLowerCase().replace(/[\s\-\.]/g, '');
      const oemMatches = part.oemReferences.some((o) =>
        o.oemCode.toLowerCase().replace(/[\s\-\.]/g, '').includes(q)
      );
      const crossMatches = part.crossReferences.some((c) =>
        c.code.toLowerCase().replace(/[\s\-\.]/g, '').includes(q)
      );

      const matches =
        nameAr.includes(searchQuery.toLowerCase()) ||
        nameFr.includes(searchQuery.toLowerCase()) ||
        brand.includes(searchQuery.toLowerCase()) ||
        partNum.includes(q) ||
        oemMatches ||
        crossMatches;

      if (!matches) return false;
    }

    // Compatibility filter
    if (onlyCompatible && selectedVehicle) {
      const result = checkPartCompatibility(part, selectedVehicle);
      if (!result.isCompatible) return false;
    }

    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="absolute inset-0 bg-radial from-blue-900/40 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>المنصة الأولى المخصصة لقطع غيار السيارات في الجزائر</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              ابحث عن قطع الغيار <span className="text-amber-400">المتوافقة بدقة 100%</span> مع سيارتك
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              تصفح آلاف قطع الغيار والمستلزمات الأصلية من أفضل المتاجر الجزائرية، مع التحقق التلقائي من نوع المحرك وسنة الصنع وتوصيل سريع لباب منزلك أو أقرب مكتب في 58 ولاية.
            </p>
          </div>

          {/* Interactive Vehicle Banner / Picker */}
          <div className="bg-white/10 dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 shadow-xl max-w-4xl">
            {selectedVehicle ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    <Car className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs text-emerald-400 font-bold block">
                      سيارتك المحددة حالياً في المرآب:
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white">
                      {selectedVehicle.make.name} {selectedVehicle.model.name} ({selectedVehicle.year})
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                      <span className="font-bold text-amber-400">{selectedVehicle.engine.name}</span>
                      <span>•</span>
                      <span>كود المحرك: {selectedVehicle.engine.engineCode}</span>
                      <span>•</span>
                      <span>{selectedVehicle.engine.fuelType}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => setIsVehicleModalOpen(true)}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 text-xs font-black shadow-sm transition-all"
                  >
                    تغيير السيارة
                  </button>
                  <button
                    onClick={() => setOnlyCompatible(!onlyCompatible)}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black border transition-all ${
                      onlyCompatible
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                    }`}
                  >
                    {onlyCompatible ? 'عرض كل القطع' : 'تصفية المتوافق فقط'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
                    <Car className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-white">
                      هل ترغب في التأكد من مطابقة القطعة لسيارتك؟
                    </h3>
                    <p className="text-xs text-slate-300">
                      حدد الماركة والموديل وسنة الصنع والمحرك وسيقوم نظامنا بعزل القطع المتوافقة بنسبة 100%
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsVehicleModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black shadow-lg transition-all active:scale-95"
                >
                  اختر سيارتك الآن
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust Badges for Algerian Market */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">شحن للـ 58 ولاية</h4>
              <p className="text-[11px] text-slate-500">للمنزل أو استلام من المكتب</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">الدفع عند الاستلام</h4>
              <p className="text-[11px] text-slate-500">افحص طردك ثم ادفع نقداً</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">توافق مضمون 100%</h4>
              <p className="text-[11px] text-slate-500">مطابقة رقم OEM والمحرك</p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center shrink-0">
              <Headphones className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">دعم واستشارة ميكانيكية</h4>
              <p className="text-[11px] text-slate-500">مساعدتك في اختيار القطعة</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog Section */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Categories Bar */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              أقسام وتصنيفات قطع الغيار
            </h2>
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
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategoryId === null
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
              }`}
            >
              الكل ({MASTER_PARTS.length})
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
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

        {/* Filter / Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              نتائج البحث: <strong className="text-blue-600">{filteredParts.length}</strong> قطعة متوفرة
            </span>
            {searchQuery && (
              <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-600 dark:text-slate-300">
                كلمة البحث: &quot;{searchQuery}&quot;
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery('')} />
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {selectedVehicle && (
              <label className="flex items-center gap-2 cursor-pointer font-bold select-none">
                <input
                  type="checkbox"
                  checked={onlyCompatible}
                  onChange={(e) => setOnlyCompatible(e.target.checked)}
                  className="rounded text-blue-600"
                />
                <span className="text-emerald-600">القطع المتوافقة مع سيارتي فقط</span>
              </label>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredParts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Filter className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
              لم يتم العثور على قطع تطابق معايير البحث
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              جرب البحث برقم OEM مختلف أو إزالة الفلاتر أو تغيير نوع السيارة لعرض قطع أخرى.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryId(null);
                setOnlyCompatible(false);
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs"
            >
              إعادة ضبط البحث
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredParts.map((part) => (
              <PartCard
                key={part.id}
                part={part}
                onOpenDetail={(p) => setSelectedPartForDetail(p)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Detail Modal */}
      <PartDetailModal
        part={selectedPartForDetail}
        onClose={() => setSelectedPartForDetail(null)}
      />
    </div>
  );
}
