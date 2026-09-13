'use client';

import React, { useState } from 'react';
import { useApp } from '../lib/store/app-context';
import { ALGERIA_WILAYAS, getWilayaByCode } from '../lib/data/algeria-wilayas';
import { DeliveryType, PaymentMethod, Order } from '../lib/types';
import { formatDZD, isValidAlgerianPhone } from '../lib/utils';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Truck, 
  CheckCircle2, 
  Phone, 
  MapPin, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  ArrowRight,
  Package,
  Clock
} from 'lucide-react';

export function CartDrawer() {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotalDzd,
    clearCart,
    createOrder,
    language,
  } = useApp();

  // Checkout Step
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilayaCode, setWilayaCode] = useState<number>(16); // Alger
  const [commune, setCommune] = useState('');
  const [address, setAddress] = useState('');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('STOP_DESK');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('COD');
  const [phoneError, setPhoneError] = useState('');

  if (!isCartDrawerOpen) return null;

  const currentWilaya = getWilayaByCode(wilayaCode) || ALGERIA_WILAYAS[15];
  const shippingFee = deliveryType === 'STOP_DESK' ? currentWilaya.stopDeskFeeDzd : currentWilaya.homeDeliveryFeeDzd;
  const totalDzd = cartSubtotalDzd + (cart.length > 0 ? shippingFee : 0);

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setStep('checkout');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidAlgerianPhone(phone)) {
      setPhoneError('يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0550123456 أو 0661123456 أو 0770123456)');
      return;
    }
    setPhoneError('');

    const newOrder = createOrder(
      {
        fullName,
        phoneNumber: phone,
        wilayaCode,
        commune,
        address,
      },
      deliveryType,
      paymentMethod
    );

    setCreatedOrder(newOrder);
    setStep('success');
  };

  const handleClose = () => {
    setIsCartDrawerOpen(false);
    if (step === 'success') {
      setStep('cart');
      setCreatedOrder(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 rtl:right-0 rtl:left-auto ltr:left-0 ltr:right-auto max-w-full flex">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l rtl:border-l-0 rtl:border-r border-slate-200 dark:border-slate-800 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {step === 'cart'
                  ? `سلة المشتريات (${cart.length})`
                  : step === 'checkout'
                  ? 'معلومات الشحن وإنهاء الطلب'
                  : 'تأكيد الطلب'}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto flex-1">
            {/* Step 1: Cart Items */}
            {step === 'cart' && (
              <div className="space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
                      <Package className="w-7 h-7" />
                    </div>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      سلة المشتريات فارغة
                    </p>
                    <p className="text-xs text-slate-500">
                      تصفح قطع الغيار المتوافقة وأضف ما تحتاجه لسلتك
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={`${item.part.id}-${item.offer.id}`}
                        className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 space-y-2.5 shadow-xs"
                      >
                        <div className="flex gap-3">
                          <img
                            src={item.part.images[0]}
                            alt={item.part.nameAr}
                            className="w-16 h-16 rounded-lg object-cover bg-slate-100 dark:bg-slate-800 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {item.part.nameAr}
                            </h4>
                            <p className="text-[11px] text-slate-500">
                              المتجر: <strong className="text-slate-700 dark:text-slate-300">{item.offer.storeName}</strong>
                            </p>
                            <span className="inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded font-bold bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                              {item.offer.condition === 'NEW_ORIGINAL' ? 'أصلي' : 'قابل للتكيف'}
                            </span>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.part.id, item.offer.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 self-start"
                            title="حذف من السلة"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.part.id, item.offer.id, item.quantity - 1)
                              }
                              className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-slate-900 dark:text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartQuantity(item.part.id, item.offer.id, item.quantity + 1)
                              }
                              className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="text-right rtl:text-right ltr:text-left">
                            <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                              {formatDZD(item.offer.priceDzd * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Checkout Form */}
            {step === 'checkout' && (
              <form id="checkout-form" onSubmit={handleConfirmOrder} className="space-y-4 text-xs">
                {/* Full name */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    الاسم واللقب الكامل *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="مثال: كريم بن عيسى"
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                {/* Algerian Phone Number */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    رقم الهاتف الجزائري (للتأكيد ومندوب التوصيل) *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        setPhoneError('');
                      }}
                      placeholder="0550 12 34 56 أو 0661 / 0770"
                      dir="ltr"
                      className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-right rtl:text-right ltr:text-left font-mono"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-[11px] text-rose-600 mt-1 font-semibold">{phoneError}</p>
                  )}
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    سيتصل بك مركز التأكيد أو المندوب قبل التسليم
                  </p>
                </div>

                {/* 58 Wilayas Selector */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    الولاية (58 ولاية) *
                  </label>
                  <select
                    value={wilayaCode}
                    onChange={(e) => setWilayaCode(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  >
                    {ALGERIA_WILAYAS.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} - {w.nameAr} ({w.nameFr})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Commune */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    البلدية أو الدائرة *
                  </label>
                  <input
                    type="text"
                    required
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    placeholder="مثال: باب الزوار / بئر الجير / العلمة"
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>

                {/* Delivery Mode Choice */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    طريقة الاستلام والتوصيل *
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setDeliveryType('STOP_DESK')}
                      className={`p-2.5 rounded-xl border text-right rtl:text-right ltr:text-left transition-all ${
                        deliveryType === 'STOP_DESK'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">استلام من المكتب</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-1 py-0.2 rounded font-black">
                          أوفر
                        </span>
                      </div>
                      <span className="block text-[11px] text-slate-500 mt-0.5">
                        وكالة Yalidine / ZR
                      </span>
                      <span className="block font-bold text-blue-600 mt-1">
                        {formatDZD(currentWilaya.stopDeskFeeDzd)}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryType('HOME_DELIVERY')}
                      className={`p-2.5 rounded-xl border text-right rtl:text-right ltr:text-left transition-all ${
                        deliveryType === 'HOME_DELIVERY'
                          ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-950 dark:text-blue-200 shadow-xs'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold">لباب المنزل</span>
                        <Truck className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <span className="block text-[11px] text-slate-500 mt-0.5">
                        تسليم شخصي بالعنوان
                      </span>
                      <span className="block font-bold text-blue-600 mt-1">
                        {formatDZD(currentWilaya.homeDeliveryFeeDzd)}
                      </span>
                    </button>
                  </div>
                </div>

                {deliveryType === 'HOME_DELIVERY' && (
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      عنوان البيت بالتفصيل (الحي، رقم العمارة/المنزل) *
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="حي النخيل عمارة ب رقم 4"
                      className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                )}

                {/* Payment Method */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    طريقة الدفع *
                  </label>
                  <div className="space-y-2">
                    <label
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'COD'
                          ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'COD'}
                        onChange={() => setPaymentMethod('COD')}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                          <Banknote className="w-4 h-4 text-amber-600" />
                          <span>الدفع نقداً عند الاستلام (COD)</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          ادفع ثمن القطعة ومصاريف التوصيل نقداً بعد فحص الطرد مع المندوب.
                        </p>
                      </div>
                    </label>

                    <label
                      className={`flex items-start gap-2.5 p-3 rounded-xl border cursor-pointer transition-all ${
                        paymentMethod === 'EDAHABIA_CIB'
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'EDAHABIA_CIB'}
                        onChange={() => setPaymentMethod('EDAHABIA_CIB')}
                        className="mt-0.5"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                          <span>البطاقة الذهبية / CIB (دفع فوري)</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          بوابة الدفع الإلكتروني بالدينار الجزائري (SATIM).
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </form>
            )}

            {/* Step 3: Success Screen */}
            {step === 'success' && createdOrder && (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    تم تسجيل طلبك بنجاح!
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    شكراً لثقتك في AutoDZ Parts. سيتم تجهيز طلبك وشحنه فوراً.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-right rtl:text-right ltr:text-left space-y-2 text-xs">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="font-bold text-slate-500">رقم التتبع (Tracking):</span>
                    <span className="font-mono font-black text-blue-600 text-sm">
                      {createdOrder.trackingNumber}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">شركة الشحن:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      Yalidine Fast Logistics
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">الولاية والوجهة:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {currentWilaya.nameAr} - {createdOrder.customer.commune}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">المبلغ المطلوب عند الاستلام:</span>
                    <span className="font-black text-emerald-600 text-sm">
                      {formatDZD(createdOrder.totalDzd)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      الوصول المقدر:
                    </span>
                    <span>{currentWilaya.estimatedDays}</span>
                  </div>
                </div>

                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                >
                  متابعة التسوق
                </button>
              </div>
            )}
          </div>

          {/* Footer (Summary and Action buttons) */}
          {step !== 'success' && cart.length > 0 && (
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>المجموع الجزئي ({cart.length} قطع):</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatDZD(cartSubtotalDzd)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>
                    شحن ({currentWilaya.nameAr} - {deliveryType === 'STOP_DESK' ? 'مكتب' : 'منزل'}):
                  </span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    {formatDZD(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 dark:text-white pt-1.5 border-t border-slate-200 dark:border-slate-700">
                  <span>الإجمالي للدفع (DZD):</span>
                  <span className="text-blue-600 dark:text-blue-400 text-base">
                    {formatDZD(totalDzd)}
                  </span>
                </div>
              </div>

              {step === 'cart' ? (
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>متابعة لإنهاء الطلب</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300"
                  >
                    رجوع للسلة
                  </button>
                  <button
                    form="checkout-form"
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <span>تأكيد وشحن الطلب (COD)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
