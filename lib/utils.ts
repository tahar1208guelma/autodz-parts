import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDZD(amount: number): string {
  return new Intl.NumberFormat('fr-DZ', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount) + ' د.ج';
}

export function isValidAlgerianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/[\s\-\.]/g, '');
  // Matches: 05xxxxxxxx, 06xxxxxxxx, 07xxxxxxxx, or +2135..., +2136..., +2137...
  const dzRegex = /^(?:(?:\+213|00213)|0)(5|6|7)[0-9]{8}$/;
  return dzRegex.test(cleanPhone);
}

export function formatAlgerianPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10 && cleaned.startsWith('0')) {
    return `${cleaned.substring(0, 2)} ${cleaned.substring(2, 4)} ${cleaned.substring(4, 6)} ${cleaned.substring(6, 8)} ${cleaned.substring(8, 10)}`;
  }
  return phone;
}

export function generateTrackingNumber(courier: string = 'YAL'): string {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  const year = new Date().getFullYear();
  return `DZ-${courier}-${year}-${randomNum}`;
}
