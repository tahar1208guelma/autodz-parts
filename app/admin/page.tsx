'use client';

import React, { useState, useRef } from 'react';
import { useApp } from '../../lib/store/app-context';
import { CATEGORIES } from '../../lib/data/parts-data';
import { CAPTIVA_GENERATIONS, CAPTIVA_ENGINES } from '../../lib/data/vehicles-data';
import { MasterPart, PartCondition, CONTACT_INFO } from '../../lib/types';
import Link from 'next/link';
import { 
  Lock, 
  Plus, 
  Trash2, 
  Edit3, 
  Image as ImageIcon, 
  Camera, 
  Check, 
  Wrench, 
  LogOut, 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  Package, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  Eye,
  EyeOff,
  Sliders
} from 'lucide-react';

export default function AdminPage() {
  const {
    parts,
    addPart,
    deletePart,
    toggleStock,
    updatePart,
    inquiries,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
  } = useApp();

  // Pin / Password state
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'parts' | 'inquiries'>('parts');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Part Form State
  const [nameAr, setNameAr] = useState('');
  const [oemNumber, setOemNumber] = useState('');
  const [brand, setBrand] = useState('GENERAL MOTORS');
  const [condition, setCondition] = useState<PartCondition>('NEW');
  const [categoryId, setCategoryId] = useState('cat-engine');
  const [generationId, setGenerationId] = useState('gen-c100');
  const [descriptionAr, setDescriptionAr] = useState('');
  const [warrantyText, setWarrantyText] = useState('ضمان أصلي موثق مع الفحص');
  const [installationAvailable, setInstallationAvailable] = useState(true);
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(pinInput.trim());
    if (!success) {
      setPinError(true);
    } else {
      setPinError(false);
      setPinInput('');
    }
  };

  // Handle Photo upload from Mobile Camera or Gallery
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImagePreview(base64);
        setImageUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Submit New Part
  const handleCreatePart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameAr.trim()) return;

    const finalImage = imageUrl.trim() || imagePreview || 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=60';

    addPart({
      nameAr,
      nameFr: nameAr,
      brand,
      oemNumber: oemNumber || 'GM-CAPTIVA',
      categoryId,
      condition,
      images: [finalImage],
      descriptionAr: descriptionAr || `قطعة ${condition === 'NEW' ? 'جديدة أصلية' : 'مستعملة مضمونة (Décharge)'} لسيارة كابتيفا، متوفرة لدى الإدارة.`,
      descriptionFr: nameAr,
      specifications: {
        'الحالة': condition === 'NEW' ? 'جديد 100%' : 'قديم مستعمل مضمون',
        'الماركة': brand,
        'خدمة التركيب': installationAvailable ? 'متوفرة في ورشتنا' : 'غير متوفرة',
      },
      installationAvailable,
      compatibleGenerations: [generationId],
      compatibleEngineIds: [],
      inStock: true,
      warrantyText,
    });

    // Reset Form
    setNameAr('');
    setOemNumber('');
    setDescriptionAr('');
    setImageUrl('');
    setImagePreview(null);
    setIsAddModalOpen(false);
  };

  // Screen 1: Password Lock Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center shadow-inner">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h1 className="text-xl font-black text-slate-900 dark:text-white">
              لوحة تحكم إدارة كابتيفا
            </h1>
            <p className="text-xs text-slate-500">
              أدخل كلمة المرور الخاصة بالإدارة للمتابعة
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="أدخل كلمة المرور..."
                  dir="ltr"
                  className="w-full text-center text-base font-bold py-3 pr-10 pl-10 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {pinError && (
                <p className="text-xs text-rose-600 font-bold">
                  كلمة المرور غير صحيحة، يرجى المحاولة مجدداً
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg active:scale-95 transition-all"
            >
              دخول إلى لوحة التحكم
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Screen 2: Full Admin Dashboard for Mobile
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 pb-24">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
            ⚡
          </div>
          <div>
            <h1 className="text-base font-black text-slate-900 dark:text-white">
              لوحة تحكم المدير - كابتيفا
            </h1>
            <p className="text-[11px] text-slate-500">
              إدارة السلع المعروضة وطلبات الزبائن مباشرة من هاتفك
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Link
            href="/"
            className="flex-1 sm:flex-none px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>عرض المتجر</span>
          </Link>
          <button
            onClick={logoutAdmin}
            className="flex-1 sm:flex-none px-3 py-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-100 font-bold flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج</span>
          </button>
        </div>
      </div>

      {/* Mobile Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[10px] text-slate-500 block font-bold">إجمالي قطع كابتيفا</span>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-0.5">{parts.length}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[10px] text-emerald-600 block font-bold">قطع جديدة (Neuf)</span>
          <p className="text-xl font-black text-emerald-600 mt-0.5">
            {parts.filter((p) => p.condition === 'NEW').length}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[10px] text-amber-600 block font-bold">قديم مستعمل (Occasion)</span>
          <p className="text-xl font-black text-amber-600 mt-0.5">
            {parts.filter((p) => p.condition === 'USED').length}
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs text-center">
          <span className="text-[10px] text-blue-600 block font-bold">طلبات الزبائن الواردة</span>
          <p className="text-xl font-black text-blue-600 mt-0.5">{inquiries.length}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('parts')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'parts'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>السلع المعروضة ({parts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('inquiries')}
          className={`flex-1 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'inquiries'
              ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-500'
          }`}
        >
          <Phone className="w-4 h-4" />
          <span>طلبات واستفسارات الزبائن ({inquiries.length})</span>
        </button>
      </div>

      {/* TAB 1: PARTS MANAGEMENT */}
      {activeTab === 'parts' && (
        <div className="space-y-4">
          {/* Big Add Button (Prominent for Mobile) */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg active:scale-98 transition-all"
          >
            <Plus className="w-5 h-5 stroke-[3]" />
            <span>+ إضافة قطعة كابتيفا جديدة الآن (من الكاميرا أو الألبوم)</span>
          </button>

          {/* Parts List */}
          <div className="space-y-3">
            {parts.map((part) => (
              <div
                key={part.id}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={part.images[0]}
                    alt={part.nameAr}
                    className="w-16 h-16 rounded-xl object-cover bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-100 dark:border-slate-800"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-black ${
                          part.condition === 'NEW'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        }`}
                      >
                        {part.condition === 'NEW' ? 'جديد أصلـي' : 'قديم مستعمل'}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">{part.oemNumber}</span>
                    </div>

                    <h3 className="font-black text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                      {part.nameAr}
                    </h3>

                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>الماركة: {part.brand}</span>
                      <span>•</span>
                      <span className={part.inStock ? 'text-emerald-600 font-bold' : 'text-rose-600'}>
                        {part.inStock ? 'متوفر بالمخزن' : 'غير متوفر'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions for Mobile */}
                <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
                  {/* Toggle Condition */}
                  <button
                    onClick={() =>
                      updatePart(part.id, {
                        condition: part.condition === 'NEW' ? 'USED' : 'NEW',
                      })
                    }
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-[11px] font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                    title="تحويل بين جديد ومستعمل"
                  >
                    تغيير لـ {part.condition === 'NEW' ? 'مستعمل' : 'جديد'}
                  </button>

                  {/* Toggle Stock */}
                  <button
                    onClick={() => toggleStock(part.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold ${
                      part.inStock
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        : 'bg-emerald-50 text-emerald-600'
                    }`}
                  >
                    {part.inStock ? 'إيقاف التوفر' : 'تفعيل التوفر'}
                  </button>

                  {/* Delete Part */}
                  <button
                    onClick={() => {
                      if (confirm(`هل أنت متأكد من حذف قطعة (${part.nameAr})؟`)) {
                        deletePart(part.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                    title="حذف القطعة"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: INQUIRIES & CUSTOMER LEADS */}
      {activeTab === 'inquiries' && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
            <h3 className="text-sm font-black text-slate-900 dark:text-white">
              طلبات الزبائن الذين اتصلوا أو طلبوا قطعاً من الموقع
            </h3>
            <p className="text-xs text-slate-500">
              يمكنك الاتصال المباشر بالزبون بنقرة زر أو مراسلته على الواتساب فوراً
            </p>
          </div>

          {inquiries.length === 0 ? (
            <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <Phone className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                لا توجد طلبات مسجلة بعد في هذا المتصفح
              </p>
              <p className="text-xs text-slate-500">
                عندما يضغط أي زبون على &quot;طلب القطعة&quot; من الموقع ستظهر معلوماته هنا فوراً.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2.5"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {inq.customerName}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                        <span className="font-mono font-bold text-blue-600">{inq.customerPhone}</span>
                        <span>•</span>
                        <span>البلدية: {inq.commune}</span>
                      </div>
                    </div>

                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-black ${
                        inq.withInstallation
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {inq.withInstallation ? 'طلب تركيب بالورشة 🛠️' : 'طلب قطعة فقط (شحن)'}
                    </span>
                  </div>

                  <div className="text-xs bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 space-y-1">
                    <p className="text-slate-700 dark:text-slate-300">
                      <strong>القطعة المطلوبة:</strong> {inq.partName} ({inq.partCondition === 'NEW' ? 'جديد' : 'مستعمل'})
                    </p>
                    {inq.vehicleYear && (
                      <p className="text-slate-500 text-[11px]">
                        <strong>السيارة:</strong> {inq.vehicleYear}
                      </p>
                    )}
                    {inq.notes && (
                      <p className="text-slate-500 text-[11px]">
                        <strong>ملاحظات الزبون:</strong> {inq.notes}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons: Phone & WhatsApp */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <a
                      href={`tel:${inq.customerPhone}`}
                      className="py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>اتصال هاتفي</span>
                    </a>

                    <a
                      href={`https://wa.me/213${inq.customerPhone.replace(/^0/, '')}?text=${encodeURIComponent(
                        `السلام عليكم ${inq.customerName}، معكم إدارة صيانة وقطع غيار كابتيفا بخصوص طلبكم للقطعة: ${inq.partName}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>مراسلة WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: ADD NEW CAPTIVA PART (Mobile Friendly) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/60">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-500" />
                <h3 className="font-black text-sm text-slate-900 dark:text-white">
                  إضافة قطعة غيار كابتيفا جديدة
                </h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleCreatePart} className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs">
              {/* Photo Upload Area */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  صورة القطعة (التقاط بالكاميرا أو اختيار من الاستوديو) *
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex-1 py-3 px-3 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 font-bold flex items-center justify-center gap-2 hover:bg-amber-100/50"
                  >
                    <Camera className="w-4 h-4 text-amber-600" />
                    <span>التقاط صورة بكاميرا الهاتف</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>

                {imagePreview && (
                  <div className="mt-2 relative w-28 h-28 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700">
                    <img src={imagePreview} alt="معاينة" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview(null);
                        setImageUrl('');
                      }}
                      className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1"
                    >
                      ✕
                    </button>
                  </div>
                )}

                <div className="mt-2">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="أو الصق رابط صورة مباشر (URL)..."
                    className="w-full h-8 px-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              {/* Part Name */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  اسم القطعة بالعربية *
                </label>
                <input
                  type="text"
                  required
                  value={nameAr}
                  onChange={(e) => setNameAr(e.target.value)}
                  placeholder="مثال: مضخة ماء كابتيفا 2.0 ديزل"
                  className="w-full h-9 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              {/* Condition (Buttons for Phone) */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  حالة القطعة *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCondition('NEW')}
                    className={`py-2.5 rounded-xl border font-black text-xs transition-all ${
                      condition === 'NEW'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🟢 قطعة جديدة (Neuf)
                  </button>

                  <button
                    type="button"
                    onClick={() => setCondition('USED')}
                    className={`py-2.5 rounded-xl border font-black text-xs transition-all ${
                      condition === 'USED'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    🟠 قديم مستعمل مضمون (Décharge)
                  </button>
                </div>
              </div>

              {/* OEM Number and Brand */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    رقم القطعة GM / OEM
                  </label>
                  <input
                    type="text"
                    value={oemNumber}
                    onChange={(e) => setOemNumber(e.target.value)}
                    placeholder="GM 96440336"
                    className="w-full h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    الماركة المصنعة
                  </label>
                  <input
                    type="text"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    placeholder="GENERAL MOTORS"
                    className="w-full h-9 px-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                  />
                </div>
              </div>

              {/* Category & Generation */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    القسم / التصنيف *
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nameAr}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    موديل كابتيفا *
                  </label>
                  <select
                    value={generationId}
                    onChange={(e) => setGenerationId(e.target.value)}
                    className="w-full h-9 px-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-bold"
                  >
                    {CAPTIVA_GENERATIONS.map((gen) => (
                      <option key={gen.id} value={gen.id}>
                        {gen.yearsSpan}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Installation Toggle */}
              <div
                onClick={() => setInstallationAvailable(!installationAvailable)}
                className={`p-2.5 rounded-xl border cursor-pointer flex items-center gap-2 ${
                  installationAvailable
                    ? 'bg-blue-50/70 border-blue-500 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <input
                  type="checkbox"
                  checked={installationAvailable}
                  onChange={() => {}}
                  className="rounded text-blue-600"
                />
                <span className="font-bold text-slate-900 dark:text-white">
                  خدمة التركيب متوفرة في الورشة لهذه القطعة 🛠️
                </span>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  وصف وتفاصيل القطعة
                </label>
                <textarea
                  rows={2}
                  value={descriptionAr}
                  onChange={(e) => setDescriptionAr(e.target.value)}
                  placeholder="اكتب ملاحظات حول القطعة، نظافتها، أو الضمان..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-slate-700 dark:text-slate-300"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="flex-2 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg active:scale-98"
                >
                  نشر القطعة فوراً على الموقع 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
