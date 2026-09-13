'use client';

import React, { useState } from 'react';
import { useApp } from '../lib/store/app-context';
import { VEHICLE_MAKES, VEHICLE_MODELS, VEHICLE_ENGINES } from '../lib/data/vehicles-data';
import { MASTER_PARTS, CATEGORIES } from '../lib/data/parts-data';
import { ALGERIA_WILAYAS } from '../lib/data/algeria-wilayas';
import { formatDZD } from '../lib/utils';
import { 
  ShieldCheck, 
  Car, 
  Layers, 
  MapPin, 
  Users, 
  BarChart3, 
  Check, 
  X, 
  Search,
  Plus,
  Sliders,
  Settings
} from 'lucide-react';

export function AdminDashboard() {
  const { orders } = useApp();
  const [adminTab, setAdminTab] = useState<'overview' | 'vehicles' | 'catalog' | 'logistics' | 'sellers'>('overview');
  const [searchFilter, setSearchFilter] = useState('');

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
              لوحة تحكم الإدارة العامة (AutoDZ Admin)
            </h1>
            <p className="text-xs text-slate-500">
              إدارة قاعدة بيانات أسطول السيارات الجزائري، الكتالوج والتوافق، المتاجر والشحن
            </p>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-bold">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'overview' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            نظرة عامة
          </button>
          <button
            onClick={() => setAdminTab('vehicles')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'vehicles' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            أسطول السيارات ({VEHICLE_MODELS.length})
          </button>
          <button
            onClick={() => setAdminTab('catalog')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'catalog' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            الكتالوج والتوافق ({MASTER_PARTS.length})
          </button>
          <button
            onClick={() => setAdminTab('sellers')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'sellers' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            المتاجر والاعتمادات
          </button>
          <button
            onClick={() => setAdminTab('logistics')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              adminTab === 'logistics' ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            شحن الـ 58 ولاية
          </button>
        </div>
      </div>

      {/* Tab 1: Overview */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">إجمالي حجم المعاملات (GMV)</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">
                {formatDZD(14280000)}
              </p>
              <span className="text-[10px] text-emerald-600 font-bold">+24% هذا الشهر</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">المتاجر النشطة</span>
              <p className="text-xl font-black text-blue-600">48 متجراً</p>
              <span className="text-[10px] text-slate-400">عبر 14 ولاية جزائرية</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">محركات وموديلات مسجلة</span>
              <p className="text-xl font-black text-slate-900 dark:text-white">
                {VEHICLE_ENGINES.length} محرك
              </p>
              <span className="text-[10px] text-emerald-600 font-bold">تغطي 92% من سيارات الجزائر</span>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
              <span className="text-xs font-bold text-slate-500 block mb-1">روابط التوافقية المفحوصة</span>
              <p className="text-xl font-black text-emerald-600">8,450 رابط</p>
              <span className="text-[10px] text-slate-400">بدقة توافق 100%</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              آخر طلبات الزبائن المسجلة في المنصة
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
              {orders.map((ord) => (
                <div key={ord.id} className="py-2.5 flex justify-between items-center">
                  <div>
                    <span className="font-mono font-bold text-blue-600">{ord.trackingNumber}</span>
                    <span className="text-slate-500 mx-2">•</span>
                    <span>الزبون: {ord.customer.fullName} ({ord.customer.phoneNumber})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-black">{formatDZD(ord.totalDzd)}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                      {ord.paymentMethod}
                    </span>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="py-4 text-slate-400 text-center">لا توجد طلبات جديدة اليوم</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Vehicles Master DB */}
      {adminTab === 'vehicles' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                شجرة السيارات والمحركات (Vehicle Fleet Architecture)
              </h2>
              <p className="text-xs text-slate-500">
                قاعدة بيانات متوافقة مع معايير K-Type / TecDoc مخصصة للسوق الجزائري
              </p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold">
              <Plus className="w-4 h-4" />
              <span>إضافة موديل أو محرك جديد</span>
            </button>
          </div>

          <div className="space-y-3">
            {VEHICLE_MAKES.map((make) => {
              const models = VEHICLE_MODELS.filter((m) => m.makeId === make.id);
              return (
                <div key={make.id} className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white mb-2">
                    <span className="text-base">{make.logo}</span>
                    <span>{make.name}</span>
                    <span className="text-xs text-slate-400">({models.length} موديلات مسجلة)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {models.map((mod) => {
                      const engines = VEHICLE_ENGINES.filter((e) => e.modelId === mod.id);
                      return (
                        <div key={mod.id} className="p-2.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
                          <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                            <span>{mod.name}</span>
                            <span className="text-slate-400 font-mono text-[10px]">{mod.startYear}-{mod.endYear}</span>
                          </div>
                          <div className="mt-1 space-y-0.5 text-[11px] text-slate-500">
                            {engines.map((e) => (
                              <div key={e.id} className="flex justify-between items-center">
                                <span>{e.name}</span>
                                <span className="font-mono text-blue-600 dark:text-blue-400">{e.engineCode}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Catalog & Compatibility */}
      {adminTab === 'catalog' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                الكتالوج المرجعي (Master Parts & Compatibility Engine)
              </h2>
              <p className="text-xs text-slate-500">
                ربط الأرقام الأصلية OEM بالأرقام البديلة ومحركات المركبات
              </p>
            </div>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold">
              <Plus className="w-4 h-4" />
              <span>إضافة قطعة للكتالوج المرجعي</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {MASTER_PARTS.map((part) => (
              <div key={part.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white">{part.nameAr}</span>
                    <span className="px-2 py-0.2 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">
                      {part.brand} - {part.mainPartNumber}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-[11px] text-slate-400 mt-1">
                    <span>OEM: {part.oemReferences.map(o => `${o.carMaker}:${o.oemCode}`).join(', ') || 'عام'}</span>
                    <span>•</span>
                    <span>المحركات المتوافقة: {part.isUniversal ? 'عالمي لجميع السيارات' : `${part.compatibleEngineIds.length} محركات`}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded text-[11px]">
                    موثق ومعتمد
                  </span>
                  <button className="px-2.5 py-1 rounded border border-slate-300 dark:border-slate-700 text-[11px]">
                    تعديل التوافق
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Sellers Management */}
      {adminTab === 'sellers' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs text-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            المتاجر والبائعين المعتمدين (KYC & Registre de Commerce)
          </h2>
          <p className="text-slate-500">
            تدقيق السجلات التجارية، الحسابات البريدية CCP، وضمان جودة قطع الغيار المعروضة
          </p>

          <div className="space-y-3">
            {[
              { name: 'SARL Auto Pièces Alger', wilaya: 'الجزائر العاصمة', rc: '16/00-4829182B19', nif: '001916004829182', rating: 4.9, status: 'معتمد' },
              { name: 'Oran Pièces d\'Origine', wilaya: 'وهران', rc: '31/00-1938271B20', nif: '002031001938271', rating: 4.8, status: 'معتمد' },
              { name: 'Constantine Turbo Express', wilaya: 'قسنطينة', rc: '25/00-8472910B18', nif: '001825008472910', rating: 4.9, status: 'معتمد' },
              { name: 'Sétif Auto Distribution', wilaya: 'سطيف', rc: '19/00-7382910B21', nif: '002119007382910', rating: 4.7, status: 'معتمد' },
            ].map((st, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex justify-between items-center">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white text-sm block">{st.name}</span>
                  <span className="text-slate-500">الولاية: {st.wilaya} • السجل: {st.rc} • النيف: {st.nif}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                    {st.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Logistics & 58 Wilayas */}
      {adminTab === 'logistics' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                تسعير الشحن والتوصيل للـ 58 ولاية (Yalidine & ZR Express)
              </h2>
              <p className="text-xs text-slate-500">
                ضبط أسعار التوصيل للمكتب (Stop Desk) وللمنزل (À Domicile) مع المدة المقدرة
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right rtl:text-right ltr:text-left">
              <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 font-bold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="p-2.5">الرمز</th>
                  <th className="p-2.5">اسم الولاية</th>
                  <th className="p-2.5">سعر المكتب (Stop Desk)</th>
                  <th className="p-2.5">سعر المنزل (Domicile)</th>
                  <th className="p-2.5">المدة المتوقعة</th>
                  <th className="p-2.5">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {ALGERIA_WILAYAS.slice(0, 15).map((w) => (
                  <tr key={w.code} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                    <td className="p-2.5 font-mono font-bold text-slate-500">{w.code.toString().padStart(2, '0')}</td>
                    <td className="p-2.5 font-bold text-slate-900 dark:text-white">{w.nameAr} ({w.nameFr})</td>
                    <td className="p-2.5 font-bold text-blue-600">{formatDZD(w.stopDeskFeeDzd)}</td>
                    <td className="p-2.5 font-bold text-slate-700 dark:text-slate-300">{formatDZD(w.homeDeliveryFeeDzd)}</td>
                    <td className="p-2.5 text-slate-500">{w.estimatedDays}</td>
                    <td className="p-2.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        نشط ومتاح
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
