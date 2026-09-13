import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "../lib/store/app-context";
import { Navbar } from "../components/Navbar";
import { VehicleSelectorModal } from "../components/VehicleSelectorModal";
import { InquiryModal } from "../components/InquiryModal";

export const metadata: Metadata = {
  title: "CaptivaDZ Parts | قطع غيار وصيانة شيفروليه كابتيفا في الجزائر (جديد وقديم)",
  description: "المركز المتخصص لقطع غيار Chevrolet Captiva (جديد ومستعمل مضمون Décharge) مع خدمة التركيب من طرف فريق الصيانة. هاتف المدير: 0770082742 - إيميل: abraknia@gmail.com",
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
          <InquiryModal />
        </AppProvider>
      </body>
    </html>
  );
}
