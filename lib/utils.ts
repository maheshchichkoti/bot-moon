import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { encrypt, decrypt } from './crypto';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(number: number, options: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat('en-US', options).format(number);
}

export function formatCurrency(amount: number, currency: string = 'USD') {
  return formatNumber(amount, {
    style: 'currency',
    currency,
  });
}

export function formatPercent(number: number) {
  return formatNumber(number, {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

export function setSecureItem(key: string, value: any) {
  const encrypted = encrypt(JSON.stringify(value));
  localStorage.setItem(key, encrypted);
}

export function getSecureItem<T>(key: string): T | null {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  
  try {
    const decrypted = decrypt(encrypted);
    return JSON.parse(decrypted) as T;
  } catch {
    return null;
  }
}

export function removeSecureItem(key: string) {
  localStorage.removeItem(key);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function sanitizeInput(input: string) {
  return input.replace(/[<>]/g, '');
}

export function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text);
}

export const isBrowser = typeof window !== 'undefined';

export function getWindowDimensions() {
  if (!isBrowser) return { width: 0, height: 0 };
  
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
}