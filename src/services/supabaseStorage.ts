import { getSupabaseClient, isSupabaseConfigured } from './supabaseClient';

export interface StorageUploadResult {
  success: boolean;
  url: string;
  isCloudStorage: boolean;
  error?: string;
}

/**
 * Konversi berkas ke Base64 Data URL (digunakan sebagai fallback saat offline atau bucket belum dibuat)
 */
export function readFileAsDataUrl(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

/**
 * Membersihkan nama berkas agar aman dari karakter aneh dan spasi
 */
function sanitizeFileName(fileName: string): string {
  const ext = fileName.split('.').pop() || 'png';
  const base = fileName
    .substring(0, fileName.lastIndexOf('.'))
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .slice(0, 30);
  const randomSuffix = Math.random().toString(36).substring(2, 7);
  return `${base}_${Date.now()}_${randomSuffix}.${ext}`;
}

/**
 * Unggah berkas ke Supabase Storage Bucket dengan fallback otomatis ke Base64
 */
export async function uploadToSupabaseStorage(
  bucket: 'receipts' | 'avatars' | 'documents' | 'showcase',
  file: File,
  customPathPrefix?: string
): Promise<StorageUploadResult> {
  // 1. Jika Supabase terhubung, coba upload ke Cloud Storage Bucket
  const client = getSupabaseClient();
  if (client && isSupabaseConfigured()) {
    try {
      const cleanName = sanitizeFileName(file.name);
      const filePath = customPathPrefix
        ? `${customPathPrefix.replace(/^\/+|\/+$/g, '')}/${cleanName}`
        : cleanName;

      const { data, error } = await client.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type,
        });

      if (!error && data) {
        const { data: publicData } = client.storage
          .from(bucket)
          .getPublicUrl(filePath);

        if (publicData?.publicUrl) {
          return {
            success: true,
            url: publicData.publicUrl,
            isCloudStorage: true,
          };
        }
      }

      console.warn(
        `Supabase Storage upload to bucket "${bucket}" error:`,
        error?.message || 'Gagal mengunggah berkas. Menggunakan fallback Base64.'
      );
    } catch (err: any) {
      console.warn('Supabase Storage exception, using fallback:', err);
    }
  }

  // 2. Fallback aman ke Base64 Data URL (Offline / Bucket Belum Terdaftar)
  try {
    const dataUrl = await readFileAsDataUrl(file);
    return {
      success: true,
      url: dataUrl,
      isCloudStorage: false,
    };
  } catch (err: any) {
    return {
      success: false,
      url: '',
      isCloudStorage: false,
      error: err?.message || 'Gagal membaca berkas.',
    };
  }
}

/**
 * Unggah Bukti Transfer Pembayaran / Resi Bank ke Bucket 'receipts'
 */
export async function uploadTransferProof(
  file: File,
  invoiceNumber?: string
): Promise<StorageUploadResult> {
  const prefix = invoiceNumber
    ? invoiceNumber.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
    : 'invoices';
  return uploadToSupabaseStorage('receipts', file, prefix);
}

/**
 * Unggah Foto Profil / Avatar ke Bucket 'avatars'
 */
export async function uploadAvatar(
  file: File,
  userIdentifier?: string
): Promise<StorageUploadResult> {
  const prefix = userIdentifier
    ? userIdentifier.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()
    : 'profile';
  return uploadToSupabaseStorage('avatars', file, prefix);
}

/**
 * Unggah Dokumen Rapor Belajar / Sertifikat ke Bucket 'documents'
 */
export async function uploadDocument(
  file: File,
  folderPrefix?: string
): Promise<StorageUploadResult> {
  return uploadToSupabaseStorage('documents', file, folderPrefix || 'docs');
}

/**
 * Unggah Screenshot Proyek Koding Siswa ke Bucket 'showcase'
 */
export async function uploadShowcaseAsset(
  file: File,
  projectSlug?: string
): Promise<StorageUploadResult> {
  return uploadToSupabaseStorage('showcase', file, projectSlug || 'projects');
}
