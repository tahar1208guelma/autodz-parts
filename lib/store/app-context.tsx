'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SelectedVehicle,
  CartItem,
  UserRole,
  Language,
  MasterPart,
  StoreOffer,
  Order,
  OrderCustomerInfo,
  DeliveryType,
  PaymentMethod,
  OrderStatus,
} from '../types';
import { ALGERIA_WILAYAS, getWilayaByCode } from '../data/algeria-wilayas';
import { generateTrackingNumber } from '../utils';

interface AppContextType {
  // Vehicle state
  selectedVehicle: SelectedVehicle | null;
  setSelectedVehicle: (vehicle: SelectedVehicle | null) => void;

  // Cart state
  cart: CartItem[];
  addToCart: (part: MasterPart, offer: StoreOffer, quantity?: number) => void;
  removeFromCart: (partId: string, offerId: string) => void;
  updateCartQuantity: (partId: string, offerId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotalDzd: number;

  // Role & UI state
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;

  // Search & Filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategoryId: string | null;
  setSelectedCategoryId: (catId: string | null) => void;

  // Wilaya & Shipping
  selectedWilayaCode: number;
  setSelectedWilayaCode: (code: number) => void;

  // Orders
  orders: Order[];
  createOrder: (
    customer: OrderCustomerInfo,
    deliveryType: DeliveryType,
    paymentMethod: PaymentMethod
  ) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Modal helpers
  isVehicleModalOpen: boolean;
  setIsVehicleModalOpen: (open: boolean) => void;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedVehicle, setSelectedVehicle] = useState<SelectedVehicle | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userRole, setUserRole] = useState<UserRole>('customer');
  const [language, setLanguage] = useState<Language>('ar');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedWilayaCode, setSelectedWilayaCode] = useState<number>(16); // Alger default
  const [orders, setOrders] = useState<Order[]>([]);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedVehicle = localStorage.getItem('autodz_vehicle');
      if (savedVehicle) setSelectedVehicle(JSON.parse(savedVehicle));

      const savedCart = localStorage.getItem('autodz_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedLang = localStorage.getItem('autodz_lang') as Language;
      if (savedLang) setLanguage(savedLang);

      const savedOrders = localStorage.getItem('autodz_orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));
    } catch {
      // ignore
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      if (selectedVehicle) {
        localStorage.setItem('autodz_vehicle', JSON.stringify(selectedVehicle));
      } else {
        localStorage.removeItem('autodz_vehicle');
      }
    } catch {}
  }, [selectedVehicle]);

  useEffect(() => {
    try {
      localStorage.setItem('autodz_cart', JSON.stringify(cart));
    } catch {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('autodz_lang', language);
      document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = language;
    } catch {}
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem('autodz_orders', JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const addToCart = (part: MasterPart, offer: StoreOffer, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.part.id === part.id && item.offer.id === offer.id);
      if (existing) {
        return prev.map((item) =>
          item.part.id === part.id && item.offer.id === offer.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { part, offer, quantity }];
    });
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (partId: string, offerId: string) => {
    setCart((prev) => prev.filter((item) => !(item.part.id === partId && item.offer.id === offerId)));
  };

  const updateCartQuantity = (partId: string, offerId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(partId, offerId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.part.id === partId && item.offer.id === offerId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotalDzd = cart.reduce((acc, item) => acc + item.offer.priceDzd * item.quantity, 0);

  const createOrder = (
    customer: OrderCustomerInfo,
    deliveryType: DeliveryType,
    paymentMethod: PaymentMethod
  ): Order => {
    const wilaya = getWilayaByCode(customer.wilayaCode) || ALGERIA_WILAYAS[15]; // Alger fallback
    const shippingFee = deliveryType === 'STOP_DESK' ? wilaya.stopDeskFeeDzd : wilaya.homeDeliveryFeeDzd;
    const subtotal = cartSubtotalDzd;
    const total = subtotal + shippingFee;

    const newOrder: Order = {
      id: 'ord-' + Date.now(),
      trackingNumber: generateTrackingNumber('YAL'),
      customer,
      items: [...cart],
      deliveryType,
      shippingFeeDzd: shippingFee,
      subtotalDzd: subtotal,
      totalDzd: total,
      paymentMethod,
      status: 'PENDING_CONFIRMATION',
      courier: 'YALIDINE',
      createdAt: new Date().toISOString(),
      vehicleDetails: selectedVehicle
        ? `${selectedVehicle.make.name} ${selectedVehicle.model.name} ${selectedVehicle.year} (${selectedVehicle.engine.name})`
        : undefined,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  return (
    <AppContext.Provider
      value={{
        selectedVehicle,
        setSelectedVehicle,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotalDzd,
        userRole,
        setUserRole,
        language,
        setLanguage,
        searchQuery,
        setSearchQuery,
        selectedCategoryId,
        setSelectedCategoryId,
        selectedWilayaCode,
        setSelectedWilayaCode,
        orders,
        createOrder,
        updateOrderStatus,
        isVehicleModalOpen,
        setIsVehicleModalOpen,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
