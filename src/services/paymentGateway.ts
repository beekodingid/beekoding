import {
  type TransactionRecord,
  updateTransaction,
  getTransactions,
  logAdminActivity,
} from './adminStorage';

export type PaymentChannel =
  | 'qris'
  | 'bca_va'
  | 'mandiri_va'
  | 'bni_va'
  | 'bri_va'
  | 'gopay'
  | 'card';

export interface PaymentGatewayConfig {
  provider: 'midtrans' | 'xendit';
  environment: 'sandbox' | 'production';
  merchantId: string;
  clientKey: string;
  serverKey: string;
  activeChannels: PaymentChannel[];
  autoSettlementDemo: boolean;
  qrisMerchantName: string;
  qrisCity: string;
}

export interface PaymentInstruction {
  title: string;
  steps: string[];
}

export interface PaymentSession {
  sessionId: string;
  transactionId: string;
  invoiceNumber: string;
  studentName: string;
  parentName: string;
  programName: string;
  amount: number;
  channel: PaymentChannel;
  channelName: string;
  status: 'pending' | 'settlement' | 'expire' | 'cancel';
  createdAt: string;
  expiredAt: string; // 15 menit
  vaNumber?: string;
  billCode?: string; // Mandiri Biller Code e.g. 88708
  qrisPayload?: string;
  deeplink?: string;
  instructions: PaymentInstruction[];
}

const STORAGE_KEY_CONFIG = 'beekoding_payment_gateway_config';
const STORAGE_KEY_SESSIONS = 'beekoding_payment_active_sessions';

export const DEFAULT_GATEWAY_CONFIG: PaymentGatewayConfig = {
  provider: 'midtrans',
  environment: 'sandbox',
  merchantId: 'M-BK20268819',
  clientKey: 'SB-Mid-client-beeK0d1nGAcademy2026',
  serverKey: 'SB-Mid-server-xX99beeKodingSecureKey',
  activeChannels: ['qris', 'bca_va', 'mandiri_va', 'bni_va', 'bri_va', 'gopay'],
  autoSettlementDemo: true,
  qrisMerchantName: 'BEEKODING ACADEMY',
  qrisCity: 'JAKARTA SELATAN',
};

export function getPaymentGatewayConfig(): PaymentGatewayConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(DEFAULT_GATEWAY_CONFIG));
      return DEFAULT_GATEWAY_CONFIG;
    }
    return { ...DEFAULT_GATEWAY_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_GATEWAY_CONFIG;
  }
}

export function savePaymentGatewayConfig(config: PaymentGatewayConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.error('Failed to save payment gateway config:', err);
  }
}

// Generate realistic dynamic QRIS EMVCo payload format
export function generateQrisPayload(
  invoiceNumber: string,
  amount: number,
  merchantName = 'BEEKODING ACADEMY'
): string {
  const cleanInv = invoiceNumber.replace(/[^A-Za-z0-9]/g, '');
  return `00020101021226610014ID.LINKAJA.WWW01189360091800000000000215${cleanInv.padEnd(
    15,
    '0'
  )}0303UMI51440014ID.GO-PAY.WWW0215G918273645100010303UMI520482995303360540${amount.toString().length}${amount}5802ID59${merchantName.length.toString().padStart(2, '0')}${merchantName}6015JAKARTA SELATAN61051216062330119${invoiceNumber}0703A016304E8A9`;
}

// Generate standard Indonesian Virtual Account Number
export function generateVaNumber(
  channel: PaymentChannel,
  phone = '081818901737',
  invoiceNumber = '001'
): { vaNumber: string; billCode?: string } {
  const rawDigits = phone.replace(/[^0-9]/g, '');
  const suffix = rawDigits.slice(-8) || invoiceNumber.replace(/[^0-9]/g, '').padEnd(8, '7');

  switch (channel) {
    case 'bca_va':
      return { vaNumber: `12808${suffix}` };
    case 'mandiri_va':
      return { billCode: '88708', vaNumber: `88708${suffix}` };
    case 'bni_va':
      return { vaNumber: `98808${suffix}` };
    case 'bri_va':
      return { vaNumber: `10208${suffix}` };
    default:
      return { vaNumber: `88108${suffix}` };
  }
}

// Get specific step-by-step payment instructions
export function getChannelInstructions(
  channel: PaymentChannel,
  vaNumber?: string,
  billCode?: string
): PaymentInstruction[] {
  switch (channel) {
    case 'qris':
      return [
        {
          title: 'Aplikasi E-Wallet (GoPay / OVO / Dana / ShopeePay / LinkAja)',
          steps: [
            'Buka aplikasi e-wallet pilihan Anda di smartphone.',
            'Pilih menu "Bayar" atau "Scan QR".',
            'Arahkan kamera ke kode QRIS dinamis di layar ini.',
            'Periksa nama penerima (BEEKODING ACADEMY) dan nominal pembayaran.',
            'Masukkan PIN e-wallet Anda. Pembayaran akan terverifikasi otomatis dalam 3 detik!',
          ],
        },
        {
          title: 'Mobile Banking (BCA Mobile / Livin Mandiri / BRImo / BNI Mobile)',
          steps: [
            'Buka aplikasi m-Banking Anda, pilih menu "QRIS" / "Bayar QR".',
            'Pindai QR code di layar ini.',
            'Konfirmasi detail tagihan dan selesaikan dengan PIN/Fingerprint m-Banking Anda.',
          ],
        },
      ];

    case 'bca_va':
      return [
        {
          title: 'BCA Mobile (m-BCA)',
          steps: [
            'Buka m-BCA, pilih menu "m-Transfer" > "BCA Virtual Account".',
            `Masukkan Nomor Virtual Account: ${vaNumber}.`,
            'Pastikan nama siswa & total tagihan sesuai, lalu masukkan PIN m-BCA.',
          ],
        },
        {
          title: 'myBCA / KlikBCA',
          steps: [
            'Login ke KlikBCA atau myBCA, pilih "Transfer Dana" > "Transfer ke BCA Virtual Account".',
            `Ketik ${vaNumber} pada kolom Nomor Rekening Virtual Account.`,
            'Kirim dan masukkan respon KeyBCA / validasi biometrik.',
          ],
        },
        {
          title: 'ATM BCA',
          steps: [
            'Masukkan Kartu ATM dan PIN BCA Anda.',
            'Pilih menu "Transaksi Lainnya" > "Transfer" > "Ke Rek BCA Virtual Account".',
            `Masukkan nomor ${vaNumber}, tekan Benar.`,
            'Periksa rincian pada layar lalu selesaikan transaksi.',
          ],
        },
      ];

    case 'mandiri_va':
      return [
        {
          title: 'Livin\' by Mandiri (Kuning)',
          steps: [
            'Buka aplikasi Livin\' by Mandiri, pilih menu "Bayar" > "Buat Pembayaran Baru".',
            `Pilih "Multi Payment", cari penyedia jasa dengan kode ${billCode} (Beekoding / Sarang Edukasi).`,
            `Masukkan Nomor Virtual Account: ${vaNumber}.`,
            'Konfirmasi pembayaran dengan memasukkan PIN Livin Anda.',
          ],
        },
        {
          title: 'ATM Mandiri',
          steps: [
            'Masukkan kartu ATM dan PIN Mandiri Anda.',
            'Pilih menu "Bayar/Beli" > "Multi Payment".',
            `Ketik kode perusahaan ${billCode}, lalu tekan Benar.`,
            `Masukkan nomor pelanggan/VA: ${vaNumber}, lalu tekan Benar.`,
          ],
        },
      ];

    case 'bni_va':
      return [
        {
          title: 'BNI Mobile Banking',
          steps: [
            'Buka BNI Mobile Banking, pilih menu "Transfer" > "Virtual Account Billing".',
            'Pilih tab "Input Baru", lalu masukkan nomor VA:',
            `${vaNumber}`,
            'Tagihan akan muncul otomatis, masukkan Password Transaksi untuk menyelesaikan.',
          ],
        },
        {
          title: 'ATM BNI',
          steps: [
            'Masukkan kartu ATM dan PIN BNI.',
            'Pilih menu "Menu Lain" > "Transfer" > "Virtual Account Billing".',
            `Ketik nomor ${vaNumber}, lalu konfirmasi pembayaran.`,
          ],
        },
      ];

    case 'bri_va':
      return [
        {
          title: 'BRImo (BRI Mobile)',
          steps: [
            'Buka aplikasi BRImo, pilih menu "BRIVA".',
            'Pilih "Tambah Transaksi Baru", lalu masukkan nomor BRIVA:',
            `${vaNumber}`,
            'Konfirmasi nominal dan masukkan PIN BRImo Anda.',
          ],
        },
        {
          title: 'ATM BRI',
          steps: [
            'Masukkan kartu ATM dan PIN BRI.',
            'Pilih menu "Transaksi Lain" > "Pembayaran" > "Lainnya" > "BRIVA".',
            `Ketik nomor BRIVA ${vaNumber}, lalu pilih Ya.`,
          ],
        },
      ];

    case 'gopay':
      return [
        {
          title: 'Aplikasi Gojek / GoPay Instant',
          steps: [
            'Buka aplikasi Gojek atau GoPay di ponsel Anda.',
            'Pindai QR code atau klik tautan pembayaran GoPay.',
            'Konfirmasi jumlah pembayaran dan masukkan PIN GoPay.',
          ],
        },
      ];

    case 'card':
      return [
        {
          title: 'Kartu Kredit / Debit Online',
          steps: [
            'Masukkan nomor kartu 16 digit, masa berlaku (MM/YY), dan kode CVV (3 digit).',
            'Bank penerbit akan mengirimkan kode OTP via SMS.',
            'Masukkan kode OTP untuk otorisasi pembayaran 3D-Secure.',
          ],
        },
      ];

    default:
      return [];
  }
}

export function getChannelName(channel: PaymentChannel): string {
  switch (channel) {
    case 'qris':
      return 'QRIS (Semua E-Wallet & Mobile Banking)';
    case 'bca_va':
      return 'BCA Virtual Account';
    case 'mandiri_va':
      return 'Mandiri Virtual Account';
    case 'bni_va':
      return 'BNI Virtual Account';
    case 'bri_va':
      return 'BRI Virtual Account (BRIVA)';
    case 'gopay':
      return 'GoPay / QRIS';
    case 'card':
      return 'Kartu Kredit / Debit Visa / Mastercard';
  }
}

// Create new active payment session
export function createPaymentSession(
  transaction: TransactionRecord,
  channel: PaymentChannel
): PaymentSession {
  const config = getPaymentGatewayConfig();
  const sessionId = `PAY-BK-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .substring(2, 6)
    .toUpperCase()}`;

  const now = new Date();
  const expiredAt = new Date(now.getTime() + 15 * 60 * 1000).toISOString(); // 15 menit

  const amountToPay = transaction.remainingAmount > 0 ? transaction.remainingAmount : transaction.totalAmount;

  const vaInfo = generateVaNumber(channel, transaction.parentPhone, transaction.invoiceNumber);

  const session: PaymentSession = {
    sessionId,
    transactionId: transaction.id,
    invoiceNumber: transaction.invoiceNumber,
    studentName: transaction.studentName,
    parentName: transaction.parentName,
    programName: transaction.programName,
    amount: amountToPay,
    channel,
    channelName: getChannelName(channel),
    status: 'pending',
    createdAt: now.toISOString(),
    expiredAt,
    vaNumber: vaInfo.vaNumber,
    billCode: vaInfo.billCode,
    qrisPayload:
      channel === 'qris' || channel === 'gopay'
        ? generateQrisPayload(transaction.invoiceNumber, amountToPay, config.qrisMerchantName)
        : undefined,
    deeplink: channel === 'gopay' ? `gojek://gopay/merchanttransfer?ref=${sessionId}` : undefined,
    instructions: getChannelInstructions(channel, vaInfo.vaNumber, vaInfo.billCode),
  };

  // Simpan ke active sessions
  try {
    const rawSessions = localStorage.getItem(STORAGE_KEY_SESSIONS);
    const sessions: Record<string, PaymentSession> = rawSessions ? JSON.parse(rawSessions) : {};
    sessions[sessionId] = session;
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
  } catch (err) {
    console.error('Failed to store active payment session:', err);
  }

  return session;
}

// Ambil session aktif
export function getPaymentSession(sessionId: string): PaymentSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    if (!raw) return null;
    const sessions: Record<string, PaymentSession> = JSON.parse(raw);
    return sessions[sessionId] || null;
  } catch {
    return null;
  }
}

// Simulasi / Eksekusi Pembayaran Sukses (Real-Time Settlement)
export function settlePaymentSuccess(
  sessionId: string
): { success: boolean; transaction: TransactionRecord | null; error?: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SESSIONS);
    const sessions: Record<string, PaymentSession> = raw ? JSON.parse(raw) : {};
    const session = sessions[sessionId];

    if (!session) {
      return { success: false, transaction: null, error: 'Sesi pembayaran tidak ditemukan' };
    }

    const transactions = getTransactions();
    const targetTx = transactions.find((t) => t.id === session.transactionId);

    if (!targetTx) {
      return { success: false, transaction: null, error: 'Transaksi tidak ditemukan' };
    }

    const nowIso = new Date().toISOString();

    // Map session channel ke PaymentMethod yang valid
    const mappedPaymentMethod = (
      session.channel === 'qris'
        ? 'qris'
        : session.channel === 'bca_va'
        ? 'bca_va'
        : session.channel === 'mandiri_va'
        ? 'mandiri_va'
        : session.channel === 'bni_va'
        ? 'bni_va'
        : session.channel === 'bri_va'
        ? 'bri_va'
        : session.channel === 'gopay'
        ? 'gopay'
        : 'midtrans'
    ) as TransactionRecord['paymentMethod'];

    // Update transaksi menjadi LUNAS
    const updated = updateTransaction(targetTx.id, {
      status: 'paid',
      paidAmount: targetTx.totalAmount,
      remainingAmount: 0,
      paidAt: nowIso,
      paymentMethod: mappedPaymentMethod,
      paymentGatewayRef: sessionId,
      paymentGatewayChannel: session.channelName,
      paymentGatewayStatus: 'settlement',
      notes: targetTx.notes
        ? `${targetTx.notes} | Lunas via ${session.channelName} (${sessionId})`
        : `Lunas via ${session.channelName} (${sessionId})`,
    });

    // Update status session
    session.status = 'settlement';
    sessions[sessionId] = session;
    localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));

    // Audit log
    logAdminActivity({
      module: 'gateway',
      actionType: 'update',
      title: 'Pembayaran Gateway Terverifikasi',
      description: `Invoice ${targetTx.invoiceNumber} (${targetTx.studentName}) sebesar Rp ${session.amount.toLocaleString(
        'id-ID'
      )} berhasil dibayar via ${session.channelName}. Ref: ${sessionId}`,
      severity: 'success',
      metadata: {
        sessionId,
        transactionId: targetTx.id,
        invoiceNumber: targetTx.invoiceNumber,
        channel: session.channel,
        amount: session.amount,
      },
    });

    // Broadcast event agar UI lain mendeteksi otomatis tanpa reload
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('beekoding:payment-settled', {
          detail: {
            sessionId,
            transactionId: targetTx.id,
            invoiceNumber: targetTx.invoiceNumber,
            amount: session.amount,
            channel: session.channel,
          },
        })
      );
    }

    return { success: true, transaction: updated };
  } catch (err) {
    console.error('Failed to settle payment:', err);
    return { success: false, transaction: null, error: String(err) };
  }
}
