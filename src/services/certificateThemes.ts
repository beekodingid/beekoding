export type CertificateThemeId =
  | 'royal_gold'
  | 'cyber_dark'
  | 'modern_minimal'
  | 'kids_creative';

export interface CertificateThemeConfig {
  id: CertificateThemeId;
  name: string;
  badge: string;
  description: string;
  fontFamily: string;
  qrColor: string;
  previewBg: string;
}

export const CERTIFICATE_THEMES: Record<CertificateThemeId, CertificateThemeConfig> = {
  royal_gold: {
    id: 'royal_gold',
    name: 'Royal Gold & Parchment',
    badge: 'Klasik & Prestisius',
    description: 'Nuansa piagam klasik Eropa, kertas perkamen gading, ornamen emas berukir dan segel wax seal resmi.',
    fontFamily: '"Cinzel", "Playfair Display", "Times New Roman", serif',
    qrColor: '#78350f',
    previewBg: 'from-amber-100 to-amber-200 text-amber-900',
  },
  cyber_dark: {
    id: 'cyber_dark',
    name: 'Cyberpunk & Neon Tech',
    badge: 'Futuristik & Dark Mode',
    description: 'Nuansa obsidian gelap dengan aksen neon cyan & emerald, sirkuit futuristik, dan hologram digital modern.',
    fontFamily: '"Space Grotesk", "JetBrains Mono", monospace, sans-serif',
    qrColor: '#0891b2',
    previewBg: 'from-slate-900 to-cyan-950 text-cyan-300',
  },
  modern_minimal: {
    id: 'modern_minimal',
    name: 'Modern Minimalist & Slate',
    badge: 'Elegan & Kontemporer',
    description: 'Desain bersih ala Silicon Valley Tech Academy, tipografi geometris tajam, dan aksen sapphire navy berkelas.',
    fontFamily: '"DM Sans", "Inter", "Helvetica Neue", sans-serif',
    qrColor: '#0f172a',
    previewBg: 'from-slate-100 to-blue-100 text-slate-800',
  },
  kids_creative: {
    id: 'kids_creative',
    name: 'Kids Wonderland & Creative',
    badge: 'Ceria & Playful',
    description: 'Warna cerah ceria penuh energi positif, honeycomb lebah playful, bintang prestasi, dan visual ramah anak.',
    fontFamily: '"Space Grotesk", "Quicksand", sans-serif',
    qrColor: '#b45309',
    previewBg: 'from-yellow-100 to-emerald-100 text-amber-800',
  },
};

export const CERTIFICATE_THEME_LIST: CertificateThemeConfig[] = Object.values(CERTIFICATE_THEMES);

export function getCertificateTheme(id?: CertificateThemeId | string): CertificateThemeConfig {
  if (id && id in CERTIFICATE_THEMES) {
    return CERTIFICATE_THEMES[id as CertificateThemeId];
  }
  return CERTIFICATE_THEMES.royal_gold;
}
