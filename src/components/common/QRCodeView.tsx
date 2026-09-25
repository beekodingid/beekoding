import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

interface QRCodeViewProps {
  value: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
  margin?: number;
  alt?: string;
  showScanLabel?: boolean;
}

export const QRCodeView: React.FC<QRCodeViewProps> = ({
  value,
  size = 96,
  className = '',
  darkColor = '#0f172a',
  lightColor = '#ffffff',
  margin = 1,
  alt = 'Scan QR Verifikasi',
  showScanLabel = false,
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    let isMounted = true;
    if (!value) {
      setDataUrl('');
      return;
    }

    QRCode.toDataURL(value, {
      width: size * 2, // 2x for high-DPI / retina / print sharpness
      margin,
      color: {
        dark: darkColor,
        light: lightColor,
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        if (isMounted) setDataUrl(url);
      })
      .catch((err) => {
        console.error('Failed to generate QR Code:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [value, size, darkColor, lightColor, margin]);

  if (!dataUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 rounded-lg animate-pulse ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-[10px] text-slate-400">QR</span>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center ${className}`}>
      <img
        src={dataUrl}
        alt={alt}
        width={size}
        height={size}
        className="block rounded-lg shadow-sm border border-slate-200/80 bg-white"
        style={{ width: size, height: size }}
      />
      {showScanLabel && (
        <span className="text-[8px] font-bold uppercase tracking-wider text-slate-500 mt-1">
          Scan Verifikasi
        </span>
      )}
    </div>
  );
};
