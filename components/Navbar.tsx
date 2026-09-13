'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '../lib/store/app-context';
import { CONTACT_INFO } from '../lib/types';
import { 
  Car, 
  Search, 
  Phone, 
  MessageCircle, 
  Mail, 
  Wrench, 
  SlidersHorizontal,
  X,
  ShieldCheck,
  MapPin,
  Lock
} from 'lucide-react';

export function Navbar() {
  const {
    selectedCaptiva,
    setIsVehicleModalOpen,
    searchQuery,
    setSearchQuery,
    conditionFilter,
    setConditionFilter,
  } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs">
      {/* Top Contact Bar */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-3">
          {/* Manager & Workshop Badges */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Wrench className="w-3.5 h-3.5" />
              <span>خدمة التركيب والصيانة متوفرة لجميع قطع كابتيفا</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>شحن لـ 58 ولاية + ورشة التركيب والفحص</span>
            </div>
          </div>

          {/* Direct Phone, WhatsApp & Email */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Phone */}
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-slate-400">هاتف المدير:</span>
              <span dir="ltr" className="font-bold text-white font-mono">{CONTACT_INFO.phoneFormatted}</span>
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${CONTACT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 text-white px-2.5 py-0.5 rounded-md font-bold text-[11px] transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${CONTACT_INFO.email}`}
              className="hidden md:flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Mail className="w-3 h-3 text-blue-400" />
              <span className="font-mono text-[11px]">{CONTACT_INFO.email}</span>
            </a>

            {/* Admin Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-amber-400 px-2.5 py-0.5 rounded-md text-[11px] font-bold transition-colors"
              title="لوحة التحكم من الهاتف"
            >
              <Lock className="w-3 h-3" />
              <span>الإدارة</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-500 to-yellow-400 flex items-center justify-center text-slate-950 font-black shadow-md">
              <span className="text-xl tracking-tighter">⚡</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                  Captiva<span className="text-amber-500">DZ</span>
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 px-2 py-0.5 rounded font-black">
                  CHEVROLET
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium hidden sm:block">
                قطع غيار (جديد وقديم) مع خدمة التركيب المعتمدة
              </p>
            </div>
          </div>

          {/* Model Fitment Picker */}
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
              selectedCaptiva
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300'
                : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 dark:bg-amber-950/30 dark:border-amber-700 dark:text-amber-300'
            }`}
          >
            <Car className={`w-4 h-4 ${selectedCaptiva ? 'text-emerald-600' : 'text-amber-600'}`} />
            <div className="text-right rtl:text-right ltr:text-left">
              <span className="block text-[10px] text-slate-500">
                {selectedCaptiva ? 'كابتيفا المحددة:' : 'حدد فئة كابتيفا:'}
              </span>
              <span className="block truncate max-w-[170px]">
                {selectedCaptiva
                  ? `${selectedCaptiva.generation.yearsSpan} (${selectedCaptiva.engine.name})`
                  : 'جميع موديلات كابتيفا'}
              </span>
            </div>
            <SlidersHorizontal className="w-3.5 h-3.5 opacity-60 ml-1" />
          </button>

          {/* Search bar */}
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute right-3.5 rtl:right-3.5 ltr:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن قطعة كابتيفا (تيربو، محرك، دبرياج، بونت، كمبروسر، فرامل)..."
              className="w-full h-10 pr-10 pl-8 rtl:pr-10 rtl:pl-8 ltr:pl-10 ltr:pr-8 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 rtl:left-3 ltr:right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Direct Call to Manager */}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-sm transition-all"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">اتصال بالمدير</span>
            <span className="sm:hidden">اتصال</span>
          </a>
        </div>

        {/* Mobile Fitment Selector */}
        <div className="mt-2 md:hidden">
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className="w-full py-1.5 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold flex items-center justify-between text-slate-800 dark:text-slate-200"
          >
            <div className="flex items-center gap-2">
              <Car className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {selectedCaptiva
                  ? `${selectedCaptiva.generation.generation} - ${selectedCaptiva.engine.name}`
                  : 'تحديد جيل ومحرك كابتيفا بدقة'}
              </span>
            </div>
            <span className="text-[11px] text-blue-600 underline">تغيير</span>
          </button>
        </div>
      </div>
    </header>
  );
}
