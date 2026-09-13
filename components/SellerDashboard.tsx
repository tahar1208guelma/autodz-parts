'use client';

import React, { useState } from 'react';
import { useApp } from '../lib/store/app-context';
import { MASTER_PARTS, STORE_OFFERS } from '../lib/data/parts-data';
import { formatDZD } from '../lib/utils';
import { 
  Store, 
  Package, 
  TrendingUp, 
  CheckCircle, 
  Printer, 
  Truck, 
  Plus, 
  DollarSign,
  AlertCircle,
  FileText,
  Boxes
} from 'lucide-react';

export function SellerDashboard() {
  const { orders, updateOrderStatus, userRole } = useApp();
  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'payouts'>('orders');
  const [selectedOrderForWaybill, setSelectedOrderForWaybill] = useState<string | null>(null);

  // Store profile for demo: "SARL Auto Pièces Alger"
  const storeName = 'SARL Auto Pièces Alger';
  const storeWilaya = 'الجزائر العاصمة (باب الزوار)';
  const ccpAccount = '0019284739 Clé 45';

  const myOffers = STORE_OFFERS.filter((o) => o.storeName === storeName);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner / Store Profile */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Store className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold">{storeName}</h1>
              <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                متجر معتمد (RC / NIF ساري)
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              مقر الاستلام: {storeWilaya} • الحساب البريدي الجاري: {ccpAccount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-colors ${
              activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            طلبات الشحن والتسليم
          </button>
          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-colors ${
              activeTab === 'inventory' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            المخزون والأسعار ({myOffers.length})
          </button>
          <button
            onClick={() => setActiveTab('payouts')}
            className={`px-3.5 py-2 rounded-xl font-bold transition-colors ${
              activeTab === 'payouts' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            مستحقات الـ COD والمحفظة
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold">مبيعات هذا الأسبوع</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">
            {formatDZD(184500)}
          </p>
          <span className="text-[10px] text-emerald-600 font-bold">+18% مقارنة بالأسبوع الماضي</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold">طلبات جديدة للتجهيز</span>
            <Package className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-lg font-black text-slate-900 dark:text-white">
            {orders.length > 0 ? orders.length : 3} طلبات
          </p>
          <span className="text-[10px] text-amber-600 font-bold">جاهزة لإصدار بوليصات الشحن</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold">رصيد COD المحصل</span>
            <TrendingUp className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-lg font-black text-blue-600 dark:text-blue-400">
            {formatDZD(142000)}
          </p>
          <span className="text-[10px] text-slate-400">تحويل دوري كل يوم خميس</span>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-bold">نسبة التسليم الناجح</span>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-lg font-black text-emerald-600">
            94.2%
          </p>
          <span className="text-[10px] text-slate-400">منخفض المرتجعات (Faible Retour)</span>
        </div>
      </div>

      {/* Tab 1: Orders Dispatch */}
      {activeTab === 'orders' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                طلبات الزبائن الصادرة لمتجرك
              </h2>
              <p className="text-xs text-slate-500">
                قم بتجهيز الطرد وطباعة بوليصة الشحن مع الباركود لتسليمها لمندوب Yalidine
              </p>
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {orders.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <Boxes className="w-10 h-10 text-slate-400 mx-auto" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  لا توجد طلبات جديدة في الانتظار حالياً
                </p>
                <p className="text-xs text-slate-500">
                  يمكنك التبديل إلى وضع الزبون وتقديم طلب تجريبي لتراه يظهر هنا فوراً!
                </p>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="py-4 space-y-3">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-black text-blue-600 text-sm">
                          {ord.trackingNumber}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          {ord.status}
                        </span>
                        {ord.vehicleDetails && (
                          <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                            {ord.vehicleDetails}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        الزبون: <strong>{ord.customer.fullName}</strong> ({ord.customer.phoneNumber}) • البلدية: {ord.customer.commune}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOrderForWaybill(ord.id)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5"
                      >
                        <Printer className="w-3.5 h-3.5 text-slate-600" />
                        <span>طباعة بوليصة الشحن (Bordereau)</span>
                      </button>

                      <button
                        onClick={() => updateOrderStatus(ord.id, 'PROCESSING')}
                        className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>تأكيد جاهزية الطرد</span>
                      </button>
                    </div>
                  </div>

                  {/* Waybill preview if selected */}
                  {selectedOrderForWaybill === ord.id && (
                    <div className="p-4 rounded-xl border-2 border-dashed border-blue-400 bg-blue-50/50 dark:bg-blue-950/20 text-xs space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-blue-200 dark:border-blue-800">
                        <span className="font-bold text-blue-900 dark:text-blue-300">
                          بوليصة الشحن الرسمية - Yalidine Fast Logistics
                        </span>
                        <span className="font-mono text-xs">BARCODE: ||||| | |||| ||| |||||</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300">
                        <div>
                          <strong>المرسل:</strong> {storeName} ({storeWilaya})
                        </div>
                        <div>
                          <strong>المرسل إليه:</strong> {ord.customer.fullName}
                        </div>
                        <div>
                          <strong>الهاتف:</strong> {ord.customer.phoneNumber}
                        </div>
                        <div>
                          <strong>المبلغ للتحصيل نقداً:</strong> {formatDZD(ord.totalDzd)}
                        </div>
                      </div>
                      <div className="text-right pt-2">
                        <button
                          onClick={() => window.print()}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-[11px] font-bold"
                        >
                          إرسال للطابعة
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: Inventory */}
      {activeTab === 'inventory' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                عروض متجرك في الكتالوج
              </h2>
              <p className="text-xs text-slate-500">
                القطع التي تعرضها وتنافس عليها مع المتاجر الأخرى
              </p>
            </div>
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-xs">
              <Plus className="w-4 h-4" />
              <span>إضافة عرض جديد من الكتالوج</span>
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {myOffers.map((off) => {
              const part = MASTER_PARTS.find((p) => p.id === off.partId);
              if (!part) return null;
              return (
                <div key={off.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={part.images[0]}
                      alt={part.nameAr}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-100 shrink-0"
                    />
                    <div>
                      <h4 className="text-xs font-black text-slate-900 dark:text-white">
                        {part.nameAr}
                      </h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {part.brand} • Réf: {part.mainPartNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-400">سعر البيع:</span>
                      <span className="font-bold text-blue-600">{formatDZD(off.priceDzd)}</span>
                    </div>

                    <div>
                      <span className="block text-[10px] text-slate-400">الكمية بالمخزن:</span>
                      <span className="font-bold text-emerald-600">{off.stockQuantity} قطعة</span>
                    </div>

                    <button className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800">
                      تعديل السعر
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Payouts */}
      {activeTab === 'payouts' && (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            دفتر تسوية أموال الدفع عند الاستلام (COD Reconciliation)
          </h2>
          <p className="text-xs text-slate-500">
            يتم تحصيل المبالغ من شركات التوصيل وخصم عمولة المنصة (5%) ثم تحويل الصافي لحسابك
          </p>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-xs space-y-2">
            <div className="flex justify-between">
              <span>إجمالي المبالغ المحصلة من Yalidine هذا الأسبوع:</span>
              <strong className="font-mono">152,000 د.ج</strong>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>عمولة المنصة (5%):</span>
              <strong className="font-mono">- 7,600 د.ج</strong>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>رسوم شحنات المرتجعات (Retour):</span>
              <strong className="font-mono">- 2,400 د.ج</strong>
            </div>
            <div className="flex justify-between text-base font-black text-emerald-600 pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>الصافي المحول لحساب CCP:</span>
              <span className="font-mono">142,000 د.ج</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
