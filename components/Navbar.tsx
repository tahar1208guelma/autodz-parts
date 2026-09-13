'use client';

import React from 'react';
import { useApp } from '../lib/store/app-context';
import { TRANSLATIONS } from '../lib/i18n';
import { 
  Car, 
  ShoppingCart, 
  Search, 
  Globe, 
  ShieldCheck, 
  Store, 
  SlidersHorizontal,
  X,
  Truck,
  PhoneCall
} from 'lucide-react';
import { Language, UserRole } from '../lib/types';

export function Navbar() {
  const {
    selectedVehicle,
    cartCount,
    language,
    setLanguage,
    userRole,
    setUserRole,
    searchQuery,
    setSearchQuery,
    setIsVehicleModalOpen,
    setIsCartDrawerOpen,
  } = useApp();

  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-100 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.freeShippingNotice}</span>
          </div>

          <div className="flex items-center gap-4 text-slate-300">
            <div className="flex items-center gap-1.5">
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span dir="ltr" className="font-semibold text-white">0550 00 12 34</span>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 bg-slate-800 rounded px-2 py-0.5">
              <Globe className="w-3 h-3 text-slate-400" />
              {(['ar', 'fr', 'en'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    language === lang
                      ? 'bg-amber-500 text-slate-950'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Switch Mode / Role */}
            <div className="flex items-center gap-1 bg-slate-800 rounded px-1.5 py-0.5">
              <span className="text-[11px] text-slate-400">الوضع:</span>
              {(['customer', 'seller', 'admin'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  onClick={() => setUserRole(r)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                    userRole === r
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {r === 'customer' ? 'المتجر' : r === 'seller' ? 'التاجر' : 'الإدارة'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3 md:gap-6">
          {/* Brand Logo */}
          <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => setUserRole('customer')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-amber-500 flex items-center justify-center text-white shadow-md">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                  Auto<span className="text-amber-600 dark:text-amber-400">DZ</span>
                </span>
                <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded font-bold">
                  PARTS
                </span>
              </div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                قطع غيار أصلية متوافقة 100%
              </p>
            </div>
          </div>

          {/* Vehicle Picker Button (Garage) */}
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className={`hidden md:flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-sm font-medium transition-all ${
              selectedVehicle
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 dark:bg-amber-950/30 dark:border-amber-700 dark:text-amber-300 animate-pulse'
            }`}
          >
            <Car className={`w-5 h-5 ${selectedVehicle ? 'text-emerald-600' : 'text-amber-600'}`} />
            <div className="text-right rtl:text-right ltr:text-left">
              <span className="block text-[11px] font-bold text-slate-500 dark:text-slate-400">
                {selectedVehicle ? t.myGarage : t.selectYourVehicle}
              </span>
              <span className="block font-bold text-xs truncate max-w-[180px]">
                {selectedVehicle
                  ? `${selectedVehicle.make.name} ${selectedVehicle.model.name} (${selectedVehicle.year})`
                  : 'حدد سيارتك للتحقق'}
              </span>
            </div>
            <SlidersHorizontal className="w-3.5 h-3.5 opacity-60 ml-1" />
          </button>

          {/* Search Input */}
          <div className="flex-1 max-w-xl relative">
            <div className="relative">
              <Search className="absolute right-3.5 rtl:right-3.5 ltr:left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full h-10 pr-10 pl-9 rtl:pr-10 rtl:pl-9 ltr:pl-10 ltr:pr-9 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:bg-white dark:focus:bg-slate-900 transition-all placeholder:text-xs placeholder:text-slate-400"
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
          </div>

          {/* Cart & Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-md transition-all active:scale-95"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 rtl:-right-1.5 ltr:-right-1.5 bg-amber-500 text-slate-950 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Vehicle Selector Bar */}
        <div className="mt-2.5 md:hidden">
          <button
            onClick={() => setIsVehicleModalOpen(true)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-semibold ${
              selectedVehicle
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'bg-amber-50 border-amber-300 text-amber-900 dark:bg-amber-950/30 dark:text-amber-300'
            }`}
          >
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-emerald-600" />
              <span>
                {selectedVehicle
                  ? `${selectedVehicle.make.name} ${selectedVehicle.model.name} ${selectedVehicle.engine.name}`
                  : t.selectYourVehicle}
              </span>
            </div>
            <span className="underline text-[11px] font-bold">
              {selectedVehicle ? t.changeVehicle : 'اختيار'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
