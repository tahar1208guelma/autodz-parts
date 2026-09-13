import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../lib/store/app-context";
import { Navbar } from "../components/Navbar";
import { VehicleSelectorModal } from "../components/VehicleSelectorModal";
import { CartDrawer } from "../components/CartDrawer";

export const metadata: Metadata = {
  title: "AutoDZ Parts | قطع غيار ومستلزمات السيارات في الجزائر",
  description: "المنصة الجزائرية الأولى المتخصصة في بيع وطلب قطع غيار السيارات مع فحص التوافق الدقيق والتوصيل لـ 58 ولاية والدفع عند الاستلام.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased font-sans">
        <AppProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <VehicleSelectorModal />
          <CartDrawer />
        </AppProvider>
      </body>
    </html>
  );
}
