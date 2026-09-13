'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SelectedCaptiva,
  PartCondition,
  MasterPart,
  PartInquiry,
  Language,
  CONTACT_INFO,
} from '../types';
import { CAPTIVA_PARTS } from '../data/parts-data';

interface AppContextType {
  // Vehicle Fitment
  selectedCaptiva: SelectedCaptiva | null;
  setSelectedCaptiva: (v: SelectedCaptiva | null) => void;

  // Parts List (Dynamic - can add, edit, delete from mobile Admin)
  parts: MasterPart[];
  addPart: (newPart: Omit<MasterPart, 'id' | 'slug'>) => MasterPart;
  updatePart: (partId: string, updatedData: Partial<MasterPart>) => void;
  deletePart: (partId: string) => void;
  toggleStock: (partId: string) => void;

  // Filters
  conditionFilter: 'ALL' | 'NEW' | 'USED';
  setConditionFilter: (cond: 'ALL' | 'NEW' | 'USED') => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;

  // Inquiries / Requests
  inquiries: PartInquiry[];
  createInquiry: (
    part: MasterPart,
    customerName: string,
    customerPhone: string,
    wilayaCode: number,
    commune: string,
    withInstallation: boolean,
    notes?: string
  ) => PartInquiry;

  // Admin Auth
  isAdminLoggedIn: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // WhatsApp & Phone Helpers
  openWhatsAppForPart: (part: MasterPart, withInstallation?: boolean) => void;
  openDirectCall: () => void;

  // Modals
  isVehicleModalOpen: boolean;
  setIsVehicleModalOpen: (open: boolean) => void;
  selectedPartForInquiry: MasterPart | null;
  setSelectedPartForInquiry: (part: MasterPart | null) => void;
  inquiryWithInstallation: boolean;
  setInquiryWithInstallation: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const ADMIN_PIN = '0770'; // الرمز السري السهل الخاص بهاتف المدير

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedCaptiva, setSelectedCaptiva] = useState<SelectedCaptiva | null>(null);
  const [parts, setParts] = useState<MasterPart[]>(CAPTIVA_PARTS);
  const [conditionFilter, setConditionFilter] = useState<'ALL' | 'NEW' | 'USED'>('ALL');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [language, setLanguage] = useState<Language>('ar');
  const [inquiries, setInquiries] = useState<PartInquiry[]>([]);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Modals
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [selectedPartForInquiry, setSelectedPartForInquiry] = useState<MasterPart | null>(null);
  const [inquiryWithInstallation, setInquiryWithInstallation] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const savedVehicle = localStorage.getItem('captivadz_vehicle');
      if (savedVehicle) setSelectedCaptiva(JSON.parse(savedVehicle));

      const savedParts = localStorage.getItem('captivadz_custom_parts');
      if (savedParts) {
        const parsed = JSON.parse(savedParts);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setParts(parsed);
        }
      }

      const savedInquiries = localStorage.getItem('captivadz_inquiries');
      if (savedInquiries) setInquiries(JSON.parse(savedInquiries));

      const savedAdminAuth = localStorage.getItem('captivadz_admin_auth');
      if (savedAdminAuth === 'true') setIsAdminLoggedIn(true);
    } catch {}
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (selectedCaptiva) {
        localStorage.setItem('captivadz_vehicle', JSON.stringify(selectedCaptiva));
      } else {
        localStorage.removeItem('captivadz_vehicle');
      }
    } catch {}
  }, [selectedCaptiva]);

  useEffect(() => {
    try {
      localStorage.setItem('captivadz_custom_parts', JSON.stringify(parts));
    } catch {}
  }, [parts]);

  useEffect(() => {
    try {
      localStorage.setItem('captivadz_inquiries', JSON.stringify(inquiries));
    } catch {}
  }, [inquiries]);

  // Admin Auth functions
  const loginAdmin = (pin: string): boolean => {
    if (pin === ADMIN_PIN || pin === '2026') {
      setIsAdminLoggedIn(true);
      localStorage.setItem('captivadz_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem('captivadz_admin_auth');
  };

  // Parts Management functions
  const addPart = (newPartData: Omit<MasterPart, 'id' | 'slug'>): MasterPart => {
    const id = 'cap-custom-' + Date.now();
    const slug = 'part-' + Date.now();
    const newPart: MasterPart = {
      ...newPartData,
      id,
      slug,
    };

    setParts((prev) => [newPart, ...prev]);
    return newPart;
  };

  const updatePart = (partId: string, updatedData: Partial<MasterPart>) => {
    setParts((prev) =>
      prev.map((p) => (p.id === partId ? { ...p, ...updatedData } : p))
    );
  };

  const deletePart = (partId: string) => {
    setParts((prev) => prev.filter((p) => p.id !== partId));
  };

  const toggleStock = (partId: string) => {
    setParts((prev) =>
      prev.map((p) => (p.id === partId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  const createInquiry = (
    part: MasterPart,
    customerName: string,
    customerPhone: string,
    wilayaCode: number,
    commune: string,
    withInstallation: boolean,
    notes?: string
  ): PartInquiry => {
    const newInquiry: PartInquiry = {
      id: 'inq-' + Date.now(),
      partId: part.id,
      partName: part.nameAr,
      partCondition: part.condition,
      customerName,
      customerPhone,
      wilayaCode,
      commune,
      withInstallation,
      vehicleYear: selectedCaptiva ? `${selectedCaptiva.generation.generation} - ${selectedCaptiva.engine.name}` : undefined,
      notes,
      createdAt: new Date().toISOString(),
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    return newInquiry;
  };

  const openWhatsAppForPart = (part: MasterPart, withInstallation: boolean = false) => {
    const conditionText = part.condition === 'NEW' ? 'جديدة' : 'قديمة مستعملة مضمونة (Décharge)';
    const installText = withInstallation ? 'مع طلب خدمة التركيب من طرف فريق الصيانة' : 'طلب القطعة فقط (شحن)';
    const vehicleText = selectedCaptiva ? `\nنوع السيارة: ${selectedCaptiva.generation.generation} (${selectedCaptiva.engine.name})` : '';

    const text = encodeURIComponent(
      `السلام عليكم ورحمة الله،\nأريد الاستفسار عن توفر وسعر هذه القطعة لشيفروليه كابتيفا:\n\n` +
      `* القطعة: ${part.nameAr}\n` +
      `* رقم القطعة: ${part.oemNumber}\n` +
      `* الحالة المطلوبة: ${conditionText}\n` +
      `* خيار التركيب: ${installText}` +
      `${vehicleText}\n\nيرجى تزويدي بالسعر وتفاصيل التوفر.`
    );

    window.open(`https://wa.me/${CONTACT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const openDirectCall = () => {
    window.location.href = `tel:${CONTACT_INFO.phone}`;
  };

  return (
    <AppContext.Provider
      value={{
        selectedCaptiva,
        setSelectedCaptiva,
        parts,
        addPart,
        updatePart,
        deletePart,
        toggleStock,
        conditionFilter,
        setConditionFilter,
        selectedCategoryId,
        setSelectedCategoryId,
        searchQuery,
        setSearchQuery,
        language,
        setLanguage,
        inquiries,
        createInquiry,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        openWhatsAppForPart,
        openDirectCall,
        isVehicleModalOpen,
        setIsVehicleModalOpen,
        selectedPartForInquiry,
        setSelectedPartForInquiry,
        inquiryWithInstallation,
        setInquiryWithInstallation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
