'use client';

import React, { useState } from 'react';
import { useApp } from '../lib/store/app-context';
import { CAPTIVA_GENERATIONS, CAPTIVA_ENGINES } from '../lib/data/vehicles-data';
import { CaptivaModelYear, CaptivaEngine } from '../lib/types';
import { X, Car, CheckCircle2, RotateCcw, Wrench, ShieldCheck } from 'lucide-react';

export function VehicleSelectorModal() {
  const {
    isVehicleModalOpen,
    setIsVehicleModalOpen,
    selectedCaptiva,
    setSelectedCaptiva,
  } = useApp();

  const [chosenGen, setChosenGen] = useState<CaptivaModelYear | null>(
    selectedCaptiva ? selectedCaptiva.generation : null
  );
  const [chosenEng, setChosenEng] = useState<CaptivaEngine | null>(
    selectedCaptiva ? selectedCaptiva.engine : null
  );

  if (!isVehicleModalOpen) return null;

  const availableEngines = chosenGen
    ? CAPTIVA_ENGINES.filter((e) => e.generationId === chosenGen.id)
    : [];

  const handleSave = () => {
    if (chosenGen && chosenEng) {
      setSelectedCaptiva({
        generation: chosenGen,
        engine: chosenEng,
      });
      setIsVehicleModalOpen(false);
    }
  };

  const handleReset = () => {
    setSelectedCaptiva(null);
    setChosenGen(null);
    setChosenEng(null);
    setIsVehicleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-600 flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">
                تحديد جيل ومحرك Chevrolet Captiva
              </h2>
              <p className="text-xs text-slate-500">
                اختر سيارتك لعرض القطع المطابقة بدقة 100% لمحركك وسنة الصنع
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVehicleModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* Step 1: Generation */}
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
              1. اختر جيل وسنة صنع كابتيفا:
            </label>
            <div className="space-y-2">
              {CAPTIVA_GENERATIONS.map((gen) => (
                <button
                  key={gen.id}
                  onClick={() => {
                    setChosenGen(gen);
                    setChosenEng(null);
                  }}
                  className={`w-full p-3 rounded-xl border text-right rtl:text-right ltr:text-left transition-all flex items-center justify-between ${
                    chosenGen?.id === gen.id
                      ? 'bg-blue-50 border-blue-600 text-blue-950 dark:bg-blue-950/40 dark:text-blue-200 shadow-xs'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-800/40'
                  }`}
                >
                  <div>
                    <span className="font-bold text-sm block">{gen.generation}</span>
                    <span className="text-slate-500 text-[11px] font-mono mt-0.5 block">
                      سنوات الصنع: {gen.yearsSpan}
                    </span>
                  </div>
                  {chosenGen?.id === gen.id && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Engine */}
          {chosenGen && (
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-2">
                2. اختر نوع المحرك والتجهيز:
              </label>
              <div className="space-y-2">
                {availableEngines.map((eng) => (
                  <button
                    key={eng.id}
                    onClick={() => setChosenEng(eng)}
                    className={`w-full p-3 rounded-xl border text-right rtl:text-right ltr:text-left transition-all flex items-center justify-between ${
                      chosenEng?.id === eng.id
                        ? 'bg-amber-50 border-amber-500 text-amber-950 dark:bg-amber-950/40 dark:text-amber-200 shadow-xs'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-xs">{eng.name}</span>
                        <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-[10px] font-mono font-bold">
                          {eng.engineCode}
                        </span>
                      </div>
                      <span className="text-slate-500 text-[11px] mt-1 block">
                        ناقل الحركة والدفع: {eng.transmission} • القوة: {eng.powerHp} حصان
                      </span>
                    </div>
                    {chosenEng?.id === eng.id && (
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between">
          {selectedCaptiva ? (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs text-rose-600 font-bold hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إلغاء التحديد</span>
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVehicleModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
            >
              إلغاء
            </button>
            <button
              disabled={!chosenGen || !chosenEng}
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white font-bold text-xs shadow-md"
            >
              تأكيد وتطبيق التوافق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
