/**
 * Beekoding Print Engine Utility
 * Provides dynamic @page orientation injection and clean print triggers
 * for A4 Landscape (Certificates) and A4 Portrait (Academic Reports, Invoices, Notes).
 */

export type PrintOrientation = 'landscape' | 'portrait';

export function triggerPrintWithOrientation(orientation: PrintOrientation = 'portrait'): void {
  if (typeof window === 'undefined') return;

  const styleId = 'beekoding-print-orientation-style';
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  // Exact A4 page dimensions and margins
  // Landscape: 297mm x 210mm, minimal margin for certificate border frame
  // Portrait: 210mm x 297mm, balanced margin for official documents
  const marginRule = orientation === 'landscape' ? '5mm 6mm 5mm 6mm' : '8mm 10mm 8mm 10mm';
  
  styleEl.innerHTML = `
    @media print {
      @page {
        size: A4 ${orientation} !important;
        margin: ${marginRule} !important;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  `;

  const cleanup = () => {
    if (styleEl && styleEl.parentNode) {
      styleEl.parentNode.removeChild(styleEl);
    }
    window.removeEventListener('afterprint', cleanup);
  };

  window.addEventListener('afterprint', cleanup);

  // Small timeout to allow the browser styling engine to apply the dynamic @page orientation rule
  setTimeout(() => {
    window.print();
  }, 50);
}
