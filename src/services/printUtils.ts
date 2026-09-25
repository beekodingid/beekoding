/**
 * Beekoding Print Engine Utility
 * Provides isolated element printing and dynamic @page orientation injection
 * for A4 Landscape (Certificates) and A4 Portrait (Academic Reports, Invoices, Notes).
 */

export type PrintOrientation = 'landscape' | 'portrait';

export interface PrintElementOptions {
  orientation?: PrintOrientation;
  title?: string;
  isCertificate?: boolean;
}

/**
 * Prints an isolated DOM element inside an off-screen iframe.
 * Completely eliminates background page bleeding, extra pages, and viewport-dependent styling issues.
 */
export function printIsolatedElement(
  element: HTMLElement | null,
  options: PrintElementOptions = {}
): void {
  const { orientation = 'portrait', title = 'Beekoding Document', isCertificate = false } = options;

  if (!element || typeof window === 'undefined') {
    triggerPrintWithOrientation(orientation);
    return;
  }

  try {
    // 1. Create hidden iframe
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.visibility = 'hidden';
    iframe.title = 'BeekodingPrintFrame';

    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      triggerPrintWithOrientation(orientation);
      return;
    }

    // 2. Gather parent stylesheets, styles, and font links
    let headStyles = '';
    document.querySelectorAll('link[rel="stylesheet"], style').forEach((node) => {
      headStyles += node.outerHTML;
    });

    // Explicit Google Fonts link to ensure Cinzel / Playfair Display / Space Grotesk render crisply
    const googleFonts = `
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Playfair+Display:ital,wght@0,600;0,700;0,800;1,600&family=Space+Grotesk:wght@500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    `;

    const marginRule =
      orientation === 'landscape' ? '4mm 5mm 4mm 5mm' : '8mm 10mm 8mm 10mm';

    // 3. Print-specific layout rules
    const printCss = `
      <style>
        @page {
          size: A4 ${orientation} !important;
          margin: ${marginRule} !important;
        }
        *, *::before, *::after {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          box-sizing: border-box !important;
        }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          background: #ffffff !important;
          color: #0f172a !important;
          width: 100% !important;
          height: auto !important;
        }
        .no-print, .print\\:hidden {
          display: none !important;
        }
        ${
          isCertificate
            ? `
          /* Certificate Specific: strictly 1 page A4 Landscape */
          body {
            overflow: hidden !important;
          }
          #print-wrapper {
            width: 287mm !important;
            height: 200mm !important;
            max-width: 287mm !important;
            max-height: 200mm !important;
            margin: 0 auto !important;
            padding: 0 !important;
            overflow: hidden !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          #print-wrapper > div {
            width: 100% !important;
            height: 100% !important;
            max-width: 100% !important;
            max-height: 100% !important;
            min-width: 0 !important;
            min-height: 0 !important;
            margin: 0 !important;
            border-radius: 0 !important;
            box-shadow: none !important;
          }
        `
            : `
          /* Report / Invoice Specific: A4 Portrait centered */
          #print-wrapper {
            width: 100% !important;
            max-width: 190mm !important;
            margin: 0 auto !important;
            padding: 0 !important;
          }
          #print-wrapper > div {
            width: 100% !important;
            max-width: 100% !important;
            min-height: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
        `
        }
      </style>
    `;

    // 4. Clone element node
    const clone = element.cloneNode(true) as HTMLElement;

    // Build iframe HTML
    iframeDoc.open();
    iframeDoc.write(`
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${title}</title>
          ${googleFonts}
          ${headStyles}
          ${printCss}
        </head>
        <body>
          <div id="print-wrapper">
            ${clone.outerHTML}
          </div>
        </body>
      </html>
    `);
    iframeDoc.close();

    // 5. Trigger print after styles and fonts parse
    const trigger = () => {
      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch (err) {
          console.warn('Iframe print error, falling back to window.print', err);
          triggerPrintWithOrientation(orientation);
        } finally {
          // Cleanup iframe after printing
          setTimeout(() => {
            if (iframe.parentNode) {
              iframe.parentNode.removeChild(iframe);
            }
          }, 1500);
        }
      }, 350);
    };

    if (iframeDoc.readyState === 'complete') {
      trigger();
    } else {
      iframe.onload = trigger;
    }
  } catch (err) {
    console.error('printIsolatedElement failed, falling back:', err);
    triggerPrintWithOrientation(orientation);
  }
}

/**
 * Fallback print orientation utility using dynamic style injection on parent window.
 */
export function triggerPrintWithOrientation(orientation: PrintOrientation = 'portrait'): void {
  if (typeof window === 'undefined') return;

  const styleId = 'beekoding-print-orientation-style';
  let styleEl = document.getElementById(styleId) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = styleId;
    document.head.appendChild(styleEl);
  }

  const marginRule = orientation === 'landscape' ? '5mm 6mm 5mm 6mm' : '8mm 10mm 8mm 10mm';

  styleEl.innerHTML = `
    @media print {
      @page {
        size: A4 ${orientation} !important;
        margin: ${marginRule} !important;
      }
      *, *::before, *::after {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      body {
        background: #ffffff !important;
        color: #0f172a !important;
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

  setTimeout(() => {
    window.print();
  }, 100);
}
