/**
 * Utilitas Kriptografi Web Crypto API (Browser native & SSR/Node compatible)
 * Bebas dependensi eksternal untuk mencegah circular dependency.
 */

export async function hashPasswordSha256(password: string): Promise<string> {
  const trimmed = password.trim();
  try {
    const subtle = typeof window !== 'undefined' ? window.crypto?.subtle : (globalThis as any).crypto?.subtle;
    if (subtle) {
      const msgBuffer = new TextEncoder().encode(trimmed);
      const hashBuffer = await subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
    }
  } catch (err) {
    console.warn('Web Crypto digest failed:', err);
  }
  // Fallback sederhana jika Web Crypto tidak tersedia
  let hash = 0;
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return `sha256_fallback_${Math.abs(hash)}_${trimmed}`;
}

export async function verifyPasswordHash(
  inputPassword: string,
  storedHash: string | null | undefined
): Promise<boolean> {
  if (!storedHash) return false;
  const trimmedInput = inputPassword.trim();
  const inputSha256 = await hashPasswordSha256(trimmedInput);

  // 1. Cocok dengan SHA-256 (64 karakter hex)
  if (storedHash.toLowerCase() === inputSha256.toLowerCase()) {
    return true;
  }

  // 2. Cocok dengan format legacy scrypt_custom_
  if (storedHash === `scrypt_custom_${trimmedInput}`) {
    return true;
  }

  // 3. Cocok dengan teks telanjang (legacy plaintext)
  if (storedHash === trimmedInput) {
    return true;
  }

  return false;
}
