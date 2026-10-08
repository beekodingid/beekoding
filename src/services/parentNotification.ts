import {
  type StudentCertificate,
  type StudentAcademicReport,
  enqueueMessage,
  type DispatchTriggerType,
} from './adminStorage';
import { CATEGORIES, getTierLabel, type AssessmentResult } from '../data/talentQuestions';

export const PORTAL_BASE_URL = 'https://beekoding.pages.dev/#portal';

export function formatIndoDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function normalizeWhatsAppPhone(phone: string): string {
  if (!phone) return '';
  const clean = phone.replace(/\D/g, '');
  if (clean.startsWith('0')) {
    return '62' + clean.substring(1);
  }
  if (clean.startsWith('62')) {
    return clean;
  }
  return '62' + clean;
}

export function getCertificatePortalUrl(certificateNumber: string): string {
  return `${PORTAL_BASE_URL}?cert=${encodeURIComponent(certificateNumber)}`;
}

export function getReportPortalUrl(reportId: string): string {
  return `${PORTAL_BASE_URL}?report=${encodeURIComponent(reportId)}`;
}

export interface NotificationPayload {
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  portalUrl: string;
  whatsappText: string;
  emailSubject: string;
  emailBody: string;
}

/**
 * Buat payload pesan notifikasi untuk Sertifikat Kelulusan Siswa
 */
export function generateCertificateNotification(cert: StudentCertificate): NotificationPayload {
  const portalUrl = getCertificatePortalUrl(cert.certificateNumber);
  const parentName = cert.parentName || 'Orang Tua / Wali';
  const issueDateFormatted = formatIndoDate(cert.issueDate);

  const whatsappLines = [
    `🎉 *SELAMAT! SERTIFIKAT KELULUSAN BEEKODING* 🎓🐝`,
    `---------------------------------------`,
    `Kepada Yth. *${parentName}*,`,
    ``,
    `Kami segenap tim akademik *Beekoding* mengucapkan selamat atas pencapaian luar biasa ananda:`,
    `⭐ *${cert.studentName.toUpperCase()}* ⭐`,
    ``,
    `Telah resmi dinyatakan *LULUS & MENYELESAIKAN* program:`,
    `📚 *${cert.programName}*`,
    cert.batchName ? `🏷️ *Batch*: ${cert.batchName}` : '',
    `🏅 *Predikat*: *${cert.honorsTitle}*`,
    `📜 *No. Registrasi Sertifikat*: \`${cert.certificateNumber}\``,
    `🔐 *Kode Verifikasi*: \`${cert.verificationCode}\``,
    `📅 *Tanggal Terbit*: ${issueDateFormatted}`,
    ``,
    `🔗 *Buka & Verifikasi E-Sertifikat Digital*:`,
    portalUrl,
    ``,
    `Sertifikat ini dilengkapi kode QR verifikasi resmi dan dapat diunduh / dicetak langsung dalam format A4 landscape beresolusi tinggi melalui tautan di atas.`,
    ``,
    `Semoga prestasi ini memicu semangat ananda untuk terus berkreasi dan berinovasi di era kecerdasan buatan! 🚀`,
    ``,
    `Salam hangat & bangga,`,
    `*Tim Akademik Beekoding*`,
    `_Next Gen Coding & AI Academy for Kids & Teens_`,
    `🌐 https://beekoding.pages.dev`,
  ].filter(Boolean);

  const emailSubject = `[Beekoding] Selamat! Sertifikat Kelulusan Siswa: ${cert.studentName} - ${cert.programName}`;

  const emailBodyLines = [
    `Kepada Yth. Bapak/Ibu ${parentName},`,
    ``,
    `Salam hangat dari Beekoding!`,
    ``,
    `Kami segenap tim pengajar dan manajemen Beekoding dengan bangga menyampaikan ucapan selamat atas kelulusan ananda:`,
    `Nama Siswa: ${cert.studentName}`,
    `Program: ${cert.programName}`,
    cert.batchName ? `Kelas/Batch: ${cert.batchName}` : '',
    `Predikat: ${cert.honorsTitle}`,
    `Nomor Sertifikat: ${cert.certificateNumber}`,
    `Kode Verifikasi: ${cert.verificationCode}`,
    `Tanggal Terbit: ${issueDateFormatted}`,
    ``,
    `Tautan E-Sertifikat & Verifikasi Online:`,
    portalUrl,
    ``,
    `Melalui tautan di atas, Bapak/Ibu dapat melihat piagam digital, memverifikasi keabsahan, dan mengunduh berkas siap cetak standar A4.`,
    ``,
    `Terima kasih telah mempercayakan pembelajaran logika, coding, dan AI ananda bersama Beekoding. Semoga ilmu yang dipelajari menjadi bekal berharga di masa depan.`,
    ``,
    `Hormat kami,`,
    `Tim Akademik Beekoding`,
    `Website: https://beekoding.pages.dev`,
  ].filter(Boolean);

  return {
    recipientName: parentName,
    recipientPhone: cert.parentPhone || '',
    recipientEmail: (cert as { parentEmail?: string }).parentEmail || '',
    portalUrl,
    whatsappText: whatsappLines.join('\n'),
    emailSubject,
    emailBody: emailBodyLines.join('\n'),
  };
}

/**
 * Buat payload pesan notifikasi untuk Rapor Kemajuan Belajar Siswa
 */
export function generateReportNotification(report: StudentAcademicReport): NotificationPayload {
  const portalUrl = getReportPortalUrl(report.id);
  const periodLabel =
    report.reportPeriod === 'final_term' ? 'Akhir Sesi (Final-Term)' : 'Tengah Sesi (Mid-Term)';
  const issueDateFormatted = formatIndoDate(report.issueDate);
  const parentName = report.parentName || 'Orang Tua / Wali';

  const whatsappLines = [
    `🐝 *RAPOR HASIL BELAJAR SISWA BEEKODING* 📊`,
    `---------------------------------------`,
    `Yth. Bapak/Ibu *${parentName}*,`,
    ``,
    `Berikut adalah rangkuman evaluasi kemajuan belajar ananda:`,
    `⭐ *${report.studentName.toUpperCase()}*`,
    `📚 *Kelas*: ${report.batchName} (${report.tier.toUpperCase()})`,
    `🗓️ *Periode*: ${periodLabel}`,
    `📅 *Tanggal Terbit*: ${issueDateFormatted}`,
    `✅ *Kehadiran*: ${report.attendanceRate}%`,
    ``,
    `*PENCAPAIAN KOMPETENSI CODING:*`,
    `• Nilai Rata-rata: *${report.averageScore} / 100*`,
    `• Predikat: *${report.gradeLetter}* (${report.predicateTitle})`,
    ``,
    `*DETAIL 5 ASPEK KOMPETENSI:*`,
    `1. Logika & Algoritma: ${report.scores.computationalThinking}/100`,
    `2. Kreativitas & Desain: ${report.scores.creativityDesign}/100`,
    `3. Problem Solving & Debugging: ${report.scores.problemSolving}/100`,
    `4. Penguasaan Sintaks & Alat: ${report.scores.codeMastery}/100`,
    `5. Sikap Belajar & Kolaborasi: ${report.scores.teamworkAttitude}/100`,
    ``,
    `🚀 *Karya Capstone Project*:`,
    `"${report.capstoneProjectTitle}"`,
    report.capstoneProjectDesc ? `_${report.capstoneProjectDesc}_` : '',
    ``,
    `📝 *Catatan Mentor (${report.instructorName})*:`,
    `"${report.instructorNotes}"`,
    ``,
    `💡 *Rekomendasi Tingkat Lanjut*:`,
    `"${report.nextStepRecommendation}"`,
    ``,
    `🔗 *Buka Rapor Interaktif & Unduh PDF Resmi*:`,
    portalUrl,
    ``,
    `Terima kasih atas dukungan penuh Bapak/Ibu mendampingi ananda belajar coding & AI bersama Beekoding. Lembar resmi A4 dapat dicetak langsung via tautan portal di atas.`,
    ``,
    `_Beekoding - Next Gen Coding & AI Academy for Kids & Teens_`,
    `🌐 https://beekoding.pages.dev`,
  ].filter(Boolean);

  const emailSubject = `[Beekoding] Rapor Hasil Belajar Siswa: ${report.studentName} - ${report.batchName}`;

  const emailBodyLines = [
    `Kepada Yth. Bapak/Ibu ${parentName},`,
    ``,
    `Salam hormat dari Beekoding,`,
    ``,
    `Berikut kami sampaikan lembar evaluasi hasil belajar ananda:`,
    `Nama Siswa: ${report.studentName}`,
    `Kelas: ${report.batchName} (${report.tier.toUpperCase()})`,
    `Periode Evaluasi: ${periodLabel}`,
    `Tingkat Kehadiran: ${report.attendanceRate}%`,
    `Nilai Rata-rata: ${report.averageScore} / 100`,
    `Predikat: ${report.gradeLetter} (${report.predicateTitle})`,
    ``,
    `Rincian Nilai 5 Aspek Kompetensi:`,
    `- Logika & Algoritma: ${report.scores.computationalThinking}/100`,
    `- Kreativitas & Desain: ${report.scores.creativityDesign}/100`,
    `- Problem Solving: ${report.scores.problemSolving}/100`,
    `- Penguasaan Alat & Sintaks: ${report.scores.codeMastery}/100`,
    `- Sikap & Kolaborasi: ${report.scores.teamworkAttitude}/100`,
    ``,
    `Proyek Capstone: ${report.capstoneProjectTitle}`,
    `Catatan Mentor: "${report.instructorNotes}"`,
    `Rekomendasi Level: "${report.nextStepRecommendation}"`,
    ``,
    `Tautan Rapor Digital & Unduh PDF A4:`,
    portalUrl,
    ``,
    `Silakan klik tautan di atas untuk melihat lembar rapor digital lengkap beserta sertifikasi kompetensi ananda.`,
    ``,
    `Salam hormat,`,
    `Mentor: ${report.instructorName}`,
    `Tim Akademik Beekoding`,
    `Website: https://beekoding.pages.dev`,
  ].filter(Boolean);

  return {
    recipientName: parentName,
    recipientPhone: report.parentPhone || '',
    recipientEmail: (report as { parentEmail?: string }).parentEmail || '',
    portalUrl,
    whatsappText: whatsappLines.join('\n'),
    emailSubject,
    emailBody: emailBodyLines.join('\n'),
  };
}

/**
 * Buat payload pesan notifikasi untuk Hasil Diagnostic Bakat Digital Anak
 */
export function generateTalentAssessmentNotification(result: AssessmentResult): NotificationPayload {
  const parentName = result.profile.parentName || 'Bapak/Ibu Orang Tua';
  const childName = result.profile.childName;
  const childAge = result.profile.childAge;
  const gradeLevel = result.profile.gradeLevel || 'Siswa';
  const tier = getTierLabel(result.profile.tier);
  const portalUrl = `https://beekoding.pages.dev/#portal?child=${encodeURIComponent(childName)}`;

  const top3 = result.topStrengths
    .slice(0, 3)
    .map((k, i) => `${i + 1}. *${CATEGORIES[k]?.name || k}* (${result.scores[k]}%)`)
    .join('\n');

  const paceInfo = result.paceAnalysis
    ? `⏱️ *Waktu Pengerjaan*: ${result.durationFormatted || '22 Menit'} (${result.paceAnalysis.speedLabel})\n`
    : '';

  const whatsappLines = [
    `🐝 *HASIL DIAGNOSTIC BAKAT DIGITAL ANAK - BEEKODING* 📊✨`,
    `--------------------------------------------------`,
    `Kepada Yth. *${parentName}*,`,
    ``,
    `Terima kasih telah mendampingi ananda:`,
    `⭐ *${childName.toUpperCase()}* (${childAge} Tahun • ${gradeLevel} • ${tier})`,
    `mengikuti sesi *80 Soal Diagnostic Pemetaan Bakat Digital & Computational Thinking* di Beekoding Academy.`,
    ``,
    `📊 *RANGKUMAN HASIL EVALUASI:*`,
    `• Nilai Rata-rata: *${result.totalScore} / 100*`,
    paceInfo ? paceInfo.trim() : '',
    ``,
    `🌟 *TOP 3 PILAR KEUNGGULAN ANANDA:*`,
    top3,
    ``,
    `🚀 *REKOMENDASI PROGRAM KELAS:*`,
    `*${result.recommendedProgram.title}*`,
    `_${result.recommendedProgram.whyFit}_`,
    ``,
    `🎁 *KLAIM TIKET FREE TRIAL CODING INTERAKTIF:*`,
    `Sebagai apresiasi atas semangat ananda, kami mengundang ananda untuk mengikuti *1x Sesi Trial Coding Interaktif (Online/Offline) GRATIS* bersama Lead Mentor Beekoding!`,
    ``,
    `🔗 *Buka Laporan Interaktif & Unduh Dokumen Resmi A4*:`,
    portalUrl,
    ``,
    `📲 Untuk konsultasi jadwal kelas trial atau diskusi kurikulum langsung dengan Lead Instructor, silakan balas pesan ini atau hubungi Hotline WhatsApp Beekoding di *+62 818-1890-1737*.`,
    ``,
    `Salam hangat & sukses selalu,`,
    `*Tim Akademik & Konsultan Bakat Beekoding*`,
    `_Next-Gen Coding & AI Academy for Kids & Teens_`,
    `🌐 https://beekoding.pages.dev`,
  ].filter(Boolean);

  const emailSubject = `[Beekoding] Laporan Hasil Diagnostic Bakat Digital Ananda ${childName} (${result.totalScore}/100)`;

  const emailBodyLines = [
    `Kepada Yth. Bapak/Ibu ${parentName},`,
    ``,
    `Salam hangat dari Beekoding Academy!`,
    ``,
    `Berikut kami sampaikan rangkuman hasil asesmen diagnostic pemetaan bakat digital ananda:`,
    `Nama Siswa: ${childName} (${childAge} Tahun)`,
    `Jenjang / Usia: ${tier}`,
    `Rata-rata Skor: ${result.totalScore} / 100`,
    `Rekomendasi Program: ${result.recommendedProgram.title}`,
    ``,
    `Bapak/Ibu juga berhak mengklaim 1x Sesi Free Trial Class Coding interaktif untuk ananda.`,
    ``,
    `Tautan Laporan Lengkap & Unduh Berkas PDF A4:`,
    portalUrl,
    ``,
    `Hormat kami,`,
    `Tim Akademik Beekoding`,
    `Hotline WA: +62 818-1890-1737`,
    `Website: https://beekoding.pages.dev`,
  ];

  return {
    recipientName: parentName,
    recipientPhone: result.profile.parentPhone || '',
    recipientEmail: '',
    portalUrl,
    whatsappText: whatsappLines.join('\n'),
    emailSubject,
    emailBody: emailBodyLines.join('\n'),
  };
}

/**
 * Buka WhatsApp Web / App secara langsung dengan pesan terisi
 */
export function openWhatsAppDirect(phone: string, text: string): boolean {
  const normalized = normalizeWhatsAppPhone(phone);
  if (!normalized) return false;
  const url = `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
  return true;
}

/**
 * Buka default email client (mailto) dengan subjek dan isi terisi
 */
export function openEmailClient(email: string, subject: string, body: string): boolean {
  if (!email || !email.includes('@')) return false;
  const url = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;
  window.location.href = url;
  return true;
}

/**
 * Masukkan pesan ke sistem antrean otomatis WhatsApp Gateway Beekoding
 */
export function queueToWhatsAppGateway(
  phone: string,
  recipientName: string,
  triggerType: DispatchTriggerType,
  content: string
) {
  const normalized = normalizeWhatsAppPhone(phone);
  return enqueueMessage({
    recipientPhone: normalized || phone,
    recipientName: recipientName || 'Orang Tua Siswa',
    recipientRole: 'parent',
    triggerType,
    content,
    status: 'pending',
    scheduledAt: new Date().toISOString(),
  });
}
