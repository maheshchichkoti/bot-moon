"use client";

const CRYPTO_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || 'your-fallback-key';

export function encrypt(text: string): string {
  if (typeof window === 'undefined') return text;
  
  try {
    const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
    const byteHex = (n: number) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code: number) => textToChars(CRYPTO_KEY).reduce((a, b) => a ^ b, code);

    return text
      .split('')
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join('');
  } catch (error) {
    console.error('Encryption failed:', error);
    return text;
  }
}

export function decrypt(encoded: string): string {
  if (typeof window === 'undefined') return encoded;
  
  try {
    const textToChars = (text: string) => text.split('').map(c => c.charCodeAt(0));
    const applySaltToChar = (code: number) => textToChars(CRYPTO_KEY).reduce((a, b) => a ^ b, code);
    
    return encoded
      .match(/.{1,2}/g)!
      .map(hex => parseInt(hex, 16))
      .map(applySaltToChar)
      .map(charCode => String.fromCharCode(charCode))
      .join('');
  } catch (error) {
    console.error('Decryption failed:', error);
    return encoded;
  }
}