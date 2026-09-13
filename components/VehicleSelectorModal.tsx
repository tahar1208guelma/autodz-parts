'use client';

import React, { useState } from 'react';
import { useApp } from '../lib/store/app-context';
import { VEHICLE_MAKES, VEHICLE_MODELS, VEHICLE_ENGINES } from '../lib/data/vehicles-data';
import { VehicleMake, VehicleModel, VehicleEngine, SelectedVehicle } from '../lib/types';
import { X, Car, CheckCircle2, RotateCcw, Sparkles, Fuel, Gauge, Calendar } from 'lucide-react';

export function VehicleSelectorModal() {
  const {
    isVehicleModalOpen,
    setIsVehicleModalOpen,
    selectedVehicle,
    setSelectedVehicle,
    language,
  } = useApp();

  const [stepMake, setStepMake] = useState<VehicleMake | null>(null);
  const [stepModel, setStepModel] = useState<VehicleModel | null>(null);
  const [stepYear, setStepYear] = useState<number | null>(null);
  const [stepEngine, setStepEngine] = useState<VehicleEngine | null>(null);

  if (!isVehicleModalOpen) return null;

  // Filter models for chosen make
  const availableModels = stepMake
    ? VEHICLE_MODELS.filter((m) => m.makeId === stepMake.id)
    : [];

  // Generate years range for chosen model
  const availableYears: number[] = [];
  if (stepModel) {
    const end = stepModel.endYear || new Date().getFullYear();
    for (let y = end; y >= stepModel.startYear; y--) {
      availableYears.push(y);
    }
  }

  // Filter engines for chosen model and year
  const availableEngines = stepModel && stepYear
    ? VEHICLE_ENGINES.filter(
        (e) => e.modelId === stepModel.id && stepYear >= e.startYear && stepYear <= e.endYear
      )
    : [];

  const handleApplyPreset = (makeId: string, modelId: string, engineId: string, year: number) => {
    const make = VEHICLE_MAKES.find((m) => m.id === makeId);
    const model = VEHICLE_MODELS.find((m) => m.id === modelId);
    const engine = VEHICLE_ENGINES.find((e) => e.id === engineId);

    if (make && model && engine) {
      setSelectedVehicle({ make, model, engine, year });
      setIsVehicleModalOpen(false);
    }
  };

  const handleFinishSelection = () => {
    if (stepMake && stepModel && stepYear && stepEngine) {
      setSelectedVehicle({
        make: stepMake,
        model: stepModel,
        year: stepYear,
        engine: stepEngine,
      });
      setIsVehicleModalOpen(false);
    }
  };

  const handleClearVehicle = () => {
    setSelectedVehicle(null);
    setStepMake(null);
    setStepModel(null);
    setStepYear(null);
    setStepEngine(null);
    setIsVehicleModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Car className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                تحديد السيارة وتوافق قطع الغيار
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                اختر سيارتك لعرض القطع المطابقة بدقة 100% لمحركك وسنة الصنع
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsVehicleModalOpen(false)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* Quick Presets for Algerian Best Sellers */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                السيارات الأكثر انتشاراً في الجزائر (اختيار سريع):
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() =>
                  handleApplyPreset('make-renault', 'mod-clio4', 'eng-clio4-15-dci-90', 2017)
                }
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/50 text-right rtl:text-right ltr:text-left transition-all"
              >
                <span className="block text-xs font-black text-slate-900 dark:text-white">
                  Clio 4
                </span>
                <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  1.5 dCi 90ch
                </span>
              </button>

              <button
                onClick={() =>
                  handleApplyPreset('make-renault', 'mod-symbol', 'eng-sym-12-16v', 2018)
                }
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/50 text-right rtl:text-right ltr:text-left transition-all"
              >
                <span className="block text-xs font-black text-slate-900 dark:text-white">
                  Symbol
                </span>
                <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  1.2 16V 75ch
                </span>
              </button>

              <button
                onClick={() =>
                  handleApplyPreset('make-peugeot', 'mod-208', 'eng-p208-16-hdi', 2016)
                }
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/50 text-right rtl:text-right ltr:text-left transition-all"
              >
                <span className="block text-xs font-black text-slate-900 dark:text-white">
                  Peugeot 208
                </span>
                <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  1.6 HDi 92ch
                </span>
              </button>

              <button
                onClick={() =>
                  handleApplyPreset('make-vw', 'mod-golf7', 'eng-golf7-20-tdi', 2016)
                }
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-amber-500 bg-slate-50 dark:bg-slate-800/50 text-right rtl:text-right ltr:text-left transition-all"
              >
                <span className="block text-xs font-black text-slate-900 dark:text-white">
                  Golf 7
                </span>
                <span className="block text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  2.0 TDI 150ch
                </span>
              </button>
            </div>
          </div>

          <div className="relative flex py-1 items-center">
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
            <span className="shrink mx-4 text-xs text-slate-400 font-medium">أو اختر بالتفصيل</span>
            <div className="grow border-t border-slate-200 dark:border-slate-800"></div>
          </div>

          {/* Stepper Inputs */}
          <div className="space-y-4">
            {/* Step 1: Make */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                1. الماركة (Marque):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {VEHICLE_MAKES.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setStepMake(m);
                      setStepModel(null);
                      setStepYear(null);
                      setStepEngine(null);
                    }}
                    className={`p-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      stepMake?.id === m.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400'
                    }`}
                  >
                    <span>{m.logo}</span>
                    <span>{m.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Model */}
            {stepMake && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  2. الموديل (Modèle {stepMake.name}):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableModels.map((mod) => (
                    <button
                      key={mod.id}
                      onClick={() => {
                        setStepModel(mod);
                        setStepYear(null);
                        setStepEngine(null);
                      }}
                      className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                        stepModel?.id === mod.id
                          ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {mod.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Year */}
            {stepModel && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  3. سنة الصنع (Année):
                </label>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                  {availableYears.map((yr) => (
                    <button
                      key={yr}
                      onClick={() => {
                        setStepYear(yr);
                        setStepEngine(null);
                      }}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        stepYear === yr
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {yr}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Engine */}
            {stepModel && stepYear && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  4. المحرك ونوع الوقود (Motorisation & Carburant):
                </label>
                <div className="space-y-2">
                  {availableEngines.map((eng) => (
                    <button
                      key={eng.id}
                      onClick={() => setStepEngine(eng)}
                      className={`w-full p-3 rounded-xl border text-right rtl:text-right ltr:text-left transition-all flex items-center justify-between ${
                        stepEngine?.id === eng.id
                          ? 'bg-blue-50 border-blue-600 dark:bg-blue-950/40 dark:border-blue-500'
                          : 'bg-slate-50 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900 dark:text-white">
                            {eng.name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold">
                            {eng.engineCode}
                          </span>
                          <span
                            className={`text-xs px-2 py-0.5 rounded font-bold ${
                              eng.fuelType === 'Diesel'
                                ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            }`}
                          >
                            {eng.fuelType}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                          <span>{eng.powerHp} حصان ({eng.powerKw} kW)</span>
                          <span>•</span>
                          <span>علبة {eng.transmission}</span>
                        </div>
                      </div>
                      {stepEngine?.id === eng.id && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between gap-3">
          {selectedVehicle ? (
            <button
              onClick={handleClearVehicle}
              className="flex items-center gap-1.5 text-xs text-rose-600 hover:text-rose-700 font-bold px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إلغاء تحديد السيارة</span>
            </button>
          ) : (
            <div></div>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsVehicleModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              إلغاء
            </button>
            <button
              disabled={!stepMake || !stepModel || !stepYear || !stepEngine}
              onClick={handleFinishSelection}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-black shadow-md transition-all"
            >
              حفظ وتطبيق التوافق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
