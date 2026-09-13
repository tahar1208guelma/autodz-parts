'use client';

import React, { useState } from 'react';
import { useApp } from '../lib/store/app-context';
import { ALGERIA_WILAYAS } from '../lib/data/algeria-wilayas';
import { CONTACT_INFO } from '../lib/types';
import { isValidAlgerianPhone } from '../lib/utils';
import { 
  X, 
  Wrench, 
  Phone, 
  MessageCircle, 
  CheckCircle2, 
  Send, 
  Car, 
  ShieldCheck, 
  MapPin,
  Mail
} from 'lucide-react';

export function InquiryModal() {
  const {
    selectedPartForInquiry,
    setSelectedPartForInquiry,
    inquiryWithInstallation,
    setInquiryWithInstallation,
    createInquiry,
    openWhatsAppForPart,
    selectedCaptiva,
  } = useApp();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [wilayaCode, setWilayaCode] = useState<number>(16);
  const [commune, setCommune] = useState('');
  const [notes, setNotes] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!selectedPartForInquiry) return null;

  const part = selectedPartForInquiry;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidAlgerianPhone(phone)) {
      setPhoneError('يرجى كتابة رقم هاتف جزائري صحيح (مثال: 0770082742 أو 0550123456)');
      return;
    }
    setPhoneError('');

    createInquiry(
      part,
      customerName,
      phone,
      wilayaCode,
      commune,
      inquiryWithInstallation,
      notes
    );

    setIsSuccess(true);
  };

  const handleClose = () => {
    setSelectedPartForInquiry(null);
    setIsSuccess(false);
    setCustomerName('');
    setPhone('');
    setNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white">
                طلب قطعة غيار كابتيفا / استفسار الصيانة
              </h3>
              <p className="text-[11px] text-slate-500">
                تواصل مباشر مع الإدارة وفريق صيانة كابتيفا
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* Part Summary Card */}
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex items-center gap-3">
            <img
              src={part.images[0]}
              alt={part.nameAr}
              className="w-14 h-14 rounded-lg object-cover bg-slate-200 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[10px] px-2 py-0.5 rounded font-black ${
                    part.condition === 'NEW'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {part.condition === 'NEW' ? 'جديد أصلـي' : 'قديم مستعمل مضمون'}
                </span>
                <span className="text-[10px] font-mono text-slate-400">{part.oemNumber}</span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-xs mt-1 truncate">
                {part.nameAr}
              </h4>
              <p className="text-[11px] text-amber-600 font-bold mt-0.5">
                السعر: عند الطلب (تواصل لمعرفة السعر الفوري)
              </p>
            </div>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Installation Option toggle */}
              {part.installationAvailable && (
                <div
                  onClick={() => setInquiryWithInstallation(!inquiryWithInstallation)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                    inquiryWithInstallation
                      ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40'
                      : 'border-slate-200 dark:border-slate-700 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={inquiryWithInstallation}
                    onChange={() => {}}
                    className="mt-0.5 text-blue-600 rounded"
                  />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">
                      طلب خدمة التركيب من طرف فريق الصيانة للشركة 🛠️
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                      فريق فني متخصص في شيفروليه كابتيفا يتكفل بإسقاط وتركيب القطعة وفحصها بجهاز الـ Scanner لضمان التشغيل المثالي.
                    </p>
                  </div>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  الاسم الكامل *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="مثال: يوسف براكنية"
                  className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  رقم هاتفك للتواصل *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    setPhoneError('');
                  }}
                  placeholder="0770 00 00 00 أو 05 / 06"
                  dir="ltr"
                  className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden text-right rtl:text-right ltr:text-left font-mono"
                />
                {phoneError && <p className="text-[11px] text-rose-600 mt-0.5">{phoneError}</p>}
              </div>

              {/* Wilaya */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    الولاية *
                  </label>
                  <select
                    value={wilayaCode}
                    onChange={(e) => setWilayaCode(Number(e.target.value))}
                    className="w-full h-9 px-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  >
                    {ALGERIA_WILAYAS.map((w) => (
                      <option key={w.code} value={w.code}>
                        {w.code} - {w.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    البلدية *
                  </label>
                  <input
                    type="text"
                    required
                    value={commune}
                    onChange={(e) => setCommune(e.target.value)}
                    placeholder="البلدية أو الحي"
                    className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Notes / Car details */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  سنة ومحرك كابتيفا (أو ملاحظات إضافية)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={
                    selectedCaptiva
                      ? `${selectedCaptiva.generation.generation} - ${selectedCaptiva.engine.name}`
                      : 'مثال: كابتيفا 2013 محرك 2.2 ديزل دفع رباعي 4x4'
                  }
                  className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-2 space-y-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>تأكيد إرسال الطلب لفريق الصيانة</span>
                </button>

                <button
                  type="button"
                  onClick={() => openWhatsAppForPart(part, inquiryWithInstallation)}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>مراسلة المدير عبر WhatsApp مباشرة (0770082742)</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  تم تسجيل طلبك بنجاح!
                </h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  سيتصل بك مسؤول صيانة ومبيعات كابتيفا هاتفياً لإعلامك بالسعر وموعد الاستلام أو التركيب.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 text-right rtl:text-right ltr:text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">هاتف المدير المباشر:</span>
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="font-bold font-mono text-blue-600 underline"
                  >
                    {CONTACT_INFO.phoneFormatted}
                  </a>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">البريد الإلكتروني:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                    {CONTACT_INFO.email}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">خدمة التركيب:</span>
                  <span className="font-bold text-emerald-600">
                    {inquiryWithInstallation ? 'مطلوبة بالورشة' : 'شحن فقط'}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => openWhatsAppForPart(part, inquiryWithInstallation)}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>تأكيد فوري عبر WhatsApp</span>
                </button>
                <button
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
                >
                  إغلاق
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
