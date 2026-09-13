'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Home, Phone, Wrench, AlertCircle, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../lib/types';

export default function NotFound() {
  const router = useRouter();

  // Auto redirect to home after 3 seconds if user entered an accidental path
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 text-center space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-600 mx-auto flex items-center justify-center">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
            404
          </span>
          <h1 className="text-lg font-black text-slate-900 dark:text-white">
            عفواً، الرابط الذي دخلت عليه غير صحيح
          </h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            يبدو أنه تم كتابة حروف إضافية في نهاية الرابط بالخطأ. سيتم تحويلك تلقائياً إلى الصفحة الرئيسية لقطع غيار كابتيفا خلال لحظات...
          </p>
        </div>

        <div className="pt-2 space-y-2.5">
          <Link
            href="/"
            className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>الذهاب لصفحة قطع غيار كابتيفا الرئيسية</span>
          </Link>

          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>اتصال بالمدير: {CONTACT_INFO.phoneFormatted}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
