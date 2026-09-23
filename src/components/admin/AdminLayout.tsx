import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';
import {
  getAdminUser,
  getCurrentSystemUser,
  getSystemUsers,
  switchActiveSystemUser,
  type AdminTab,
} from '../../services/adminStorage';
import { isSupabaseConfigured } from '../../services/supabaseClient';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  LogOut,
  ArrowLeft,
  Menu,
  X,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  CalendarDays,
  MessageSquareText,
  Receipt,
  Award,
  Rocket,
  GraduationCap,
  UserCheck,
  ClipboardCheck,
  FileText,
  Ticket,
  Flame,
  Megaphone,
  Coins,
  FolderDown,
  CalendarCheck,
  HeartHandshake,
  ScrollText,
  HelpCircle,
  Share2,
  Sparkles,
  Smartphone,
} from 'lucide-react';

export type { AdminTab };

interface AdminLayoutProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  onLogout: () => void;
  onBackToHome: () => void;
  children: React.ReactNode;
  newCount?: number;
  newInquiriesCount?: number;
}

const renderAdminAvatar = (
  avatar: string | undefined,
  className = 'w-full h-full object-cover',
  fallbackSize = 'w-4 h-4'
) => {
  if (!avatar) {
    return <ShieldCheck className={`${fallbackSize} text-amber-500`} />;
  }
  if (avatar.startsWith('/') || avatar.startsWith('http') || avatar.startsWith('data:')) {
    return (
      <img
        src={avatar}
        alt="Foto Profil"
        className={className}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (!target.src.includes('febri-hasan.png')) {
            target.src = '/febri-hasan.png';
          } else {
            target.src = '/bee-mascot.png';
          }
        }}
      />
    );
  }
  return <span className="text-base leading-none select-none">{avatar}</span>;
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onTabChange,
  onLogout,
  onBackToHome,
  children,
  newCount = 0,
  newInquiriesCount = 0,
}) => {
  const { isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('beekoding_admin_sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });

  const adminUser = getAdminUser();

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('beekoding_admin_sidebar_collapsed', String(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  interface NavGroup {
    groupTitle: string;
    items: {
      id: AdminTab;
      label: string;
      icon: any;
      description: string;
      badge?: string;
    }[];
  }

  const navGroups: NavGroup[] = [
    {
      groupTitle: 'Utama',
      items: [
        {
          id: 'dashboard' as AdminTab,
          label: 'Dashboard',
          icon: LayoutDashboard,
          description: 'Ringkasan analitik & tren',
        },
      ],
    },
    {
      groupTitle: 'Penerimaan & Konsultasi',
      items: [
        {
          id: 'students' as AdminTab,
          label: 'Data Siswa',
          icon: Users,
          description: 'Hasil tes & rapor bakat',
          badge: newCount > 0 ? `${newCount} Baru` : undefined,
        },
        {
          id: 'inquiries' as AdminTab,
          label: 'Konsultasi & Registrasi',
          icon: MessageSquare,
          description: 'Formulir masuk & follow-up',
          badge: newInquiriesCount > 0 ? `${newInquiriesCount} Baru` : undefined,
        },
        {
          id: 'events' as AdminTab,
          label: 'Event & Trial Class',
          icon: CalendarCheck,
          description: 'Workshop, webinar & uji coba',
        },
        {
          id: 'counseling' as AdminTab,
          label: 'Konseling & Bimbingan',
          icon: HeartHandshake,
          description: 'Sesi 1-on-1, observasi & rencana aksi',
        },
        {
          id: 'templates' as AdminTab,
          label: 'Template Pesan',
          icon: MessageSquareText,
          description: 'Follow-up WA & broadcast otomatis',
        },
        {
          id: 'announcements' as AdminTab,
          label: 'Pengumuman & Siaran',
          icon: Megaphone,
          description: 'Info kelas & broadcast WhatsApp',
        },
        {
          id: 'gateway' as AdminTab,
          label: 'WhatsApp Gateway & Otomasi',
          icon: Smartphone,
          description: 'Mesin antrean & reminder otomatis',
        },
      ],
    },
    {
      groupTitle: 'Akademik & Pengajaran',
      items: [
        {
          id: 'batches' as AdminTab,
          label: 'Jadwal & Batch',
          icon: CalendarDays,
          description: 'Sesi kelas, kuota & link meeting',
        },
        {
          id: 'attendance' as AdminTab,
          label: 'Presensi & Absensi',
          icon: ClipboardCheck,
          description: 'Presensi sesi & laporan WA grup',
        },
        {
          id: 'reports' as AdminTab,
          label: 'Rapor Belajar',
          icon: FileText,
          description: 'Evaluasi kompetensi & lembar A4',
        },
        {
          id: 'curriculum' as AdminTab,
          label: 'Silabus Kurikulum',
          icon: GraduationCap,
          description: 'Roadmap materi 12 sesi per jenjang',
        },
        {
          id: 'resources' as AdminTab,
          label: 'Bahan Ajar & Modul',
          icon: FolderDown,
          description: 'Worksheet PDF & starter code',
        },
        {
          id: 'instructors' as AdminTab,
          label: 'Tim Instruktur',
          icon: UserCheck,
          description: 'Profil mentor & jam mengajar',
        },
      ],
    },
    {
      groupTitle: 'Gamifikasi & Prestasi',
      items: [
        {
          id: 'quests' as AdminTab,
          label: 'Tantangan & Quest',
          icon: Flame,
          description: 'Misi mingguan, Bee-XP & lencana',
        },
        {
          id: 'quizzes' as AdminTab,
          label: 'Kuis & Evaluasi Belajar',
          icon: HelpCircle,
          description: 'Evaluasi berkala, passing grade & XP',
        },
        {
          id: 'certificates' as AdminTab,
          label: 'Sertifikat Siswa',
          icon: Award,
          description: 'Piagam kelulusan & verifikasi QR',
        },
        {
          id: 'showcase' as AdminTab,
          label: 'Karya & Portofolio',
          icon: Rocket,
          description: 'Showcase proyek & review wali',
        },
      ],
    },
    {
      groupTitle: 'Keuangan & Pemasaran',
      items: [
        {
          id: 'transactions' as AdminTab,
          label: 'Transaksi & Biaya',
          icon: Receipt,
          description: 'Invoice, kwitansi & arus kas',
        },
        {
          id: 'vouchers' as AdminTab,
          label: 'Kupon & Promo',
          icon: Ticket,
          description: 'Voucher diskon & beasiswa',
        },
        {
          id: 'payroll' as AdminTab,
          label: 'Penggajian Instruktur',
          icon: Coins,
          description: 'Honor mengajar & slip A4',
        },
        {
          id: 'referrals' as AdminTab,
          label: 'Duta & Referral',
          icon: Share2,
          description: 'Kode referral & komisi duta',
        },
      ],
    },
    {
      groupTitle: 'Sistem & Evaluasi',
      items: [
        {
          id: 'questions' as AdminTab,
          label: 'Bank Soal',
          icon: BookOpen,
          description: 'Berdasarkan jenjang & usia',
        },
        {
          id: 'users' as AdminTab,
          label: 'Manajemen User & Akses',
          icon: UserCheck,
          description: 'Kelola akun staf & hak akses role',
        },
        {
          id: 'audit' as AdminTab,
          label: 'Log Aktivitas & Audit',
          icon: ScrollText,
          description: 'Riwayat mutasi & audit trail keamanan',
        },
        {
          id: 'settings' as AdminTab,
          label: 'Pengaturan',
          icon: Settings,
          description: 'Profil, keamanan & data sistem',
        },
      ],
    },
  ];

  const currentSystemUser = getCurrentSystemUser();
  const allSystemUsers = getSystemUsers();
  const allowedTabs = currentSystemUser.role === 'administrator' ? null : currentSystemUser.allowedTabs;

  // Filter groups according to user role / permissions
  const activeNavGroups = navGroups
    .map((group) => {
      const allowedItems = allowedTabs
        ? group.items.filter((item) => allowedTabs.includes(item.id))
        : group.items;
      return {
        ...group,
        items: allowedItems,
      };
    })
    .filter((group) => group.items.length > 0);

  const allNavItems = navGroups.flatMap((g) => g.items);
  const currentNavItem = allNavItems.find((item) => item.id === currentTab) || allNavItems[0];
  const isCurrentTabAllowed = !allowedTabs || allowedTabs.includes(currentTab);

  // Track open/collapsed state for each navGroup accordion/dropdown
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('beekoding_admin_open_nav_groups');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    // Default: open the group with active tab and 'Utama'
    const initial: Record<string, boolean> = {
      'Utama': true,
    };
    activeNavGroups.forEach((g) => {
      if (g.items.some((item) => item.id === currentTab)) {
        initial[g.groupTitle] = true;
      }
    });
    return initial;
  });

  // Automatically ensure the group containing the active tab is open
  useEffect(() => {
    setOpenGroups((prev) => {
      const activeGroup = activeNavGroups.find((g) => g.items.some((item) => item.id === currentTab));
      if (!activeGroup || prev[activeGroup.groupTitle]) {
        return prev;
      }
      const next = { ...prev, [activeGroup.groupTitle]: true };
      try {
        localStorage.setItem('beekoding_admin_open_nav_groups', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, [currentTab, activeNavGroups]);

  const toggleGroup = (groupTitle: string) => {
    setOpenGroups((prev) => {
      const next = { ...prev, [groupTitle]: !prev[groupTitle] };
      try {
        localStorage.setItem('beekoding_admin_open_nav_groups', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const allGroupsOpen = activeNavGroups.every((g) => !!openGroups[g.groupTitle]);

  const toggleAllGroups = () => {
    setOpenGroups(() => {
      const next: Record<string, boolean> = {};
      const targetState = !allGroupsOpen;
      activeNavGroups.forEach((g) => {
        next[g.groupTitle] = targetState;
      });
      try {
        localStorage.setItem('beekoding_admin_open_nav_groups', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const handleNavClick = (tab: AdminTab) => {
    onTabChange(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div
      className={`min-h-screen flex flex-col md:flex-row transition-colors duration-300 ${
        isDark ? 'bg-[#0d0f15] text-slate-100' : 'bg-[#fbf9f3] text-slate-800'
      }`}
    >
      {/* ========================================================= */}
      {/* 1. DESKTOP LEFT SIDEBAR (Collapsible: Expand / Collapse)  */}
      {/* ========================================================= */}
      <aside
        className={`hidden md:flex flex-col justify-between shrink-0 border-r sticky top-0 h-screen overflow-y-auto overflow-x-hidden transition-all duration-300 z-30 ${
          sidebarCollapsed ? 'w-20' : 'w-68 lg:w-72'
        } ${
          isDark
            ? 'bg-[#111420]/95 border-amber-500/15'
            : 'bg-white/95 border-amber-200/80 shadow-sm'
        }`}
      >
        {/* ================= TOP SECTION ================= */}
        {sidebarCollapsed ? (
          /* COLLAPSED TOP */
          <div className="p-3 flex flex-col items-center space-y-3 border-b border-dashed border-slate-200 dark:border-slate-800/80">
            {/* Mascot Icon */}
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 p-[2px] shadow-md shadow-amber-500/30 shrink-0">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                  isDark ? 'bg-[#121520]' : 'bg-white'
                }`}
              >
                <img
                  src="/bee-mascot.png"
                  alt="Beekoding Mascot"
                  className="w-8 h-8 object-contain"
                />
              </div>
            </div>

            {/* Toggle Button to Expand */}
            <button
              type="button"
              onClick={toggleSidebar}
              className={`w-10 h-10 rounded-xl border text-xs transition-all flex items-center justify-center cursor-pointer ${
                isDark
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400 hover:bg-amber-500/25 hover:text-amber-300'
                  : 'bg-amber-50 border-amber-300 text-amber-600 hover:bg-amber-100 hover:text-amber-700'
              }`}
              title="Buka Menu Sidebar"
              aria-label="Buka Menu Sidebar"
            >
              <PanelLeftOpen className="w-5 h-5" />
            </button>

            {/* Icon Back to Home */}
            <button
              type="button"
              onClick={onBackToHome}
              className={`w-10 h-10 rounded-xl border transition-all flex items-center justify-center cursor-pointer ${
                isDark
                  ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
              title="Ke Website Utama"
            >
              <ArrowLeft className="w-4 h-4 text-amber-500" />
            </button>
          </div>
        ) : (
          /* EXPANDED TOP */
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 p-[2px] shadow-md shadow-amber-500/30 shrink-0">
                  <div
                    className={`w-full h-full rounded-[10px] flex items-center justify-center ${
                      isDark ? 'bg-[#121520]' : 'bg-white'
                    }`}
                  >
                    <img
                      src="/bee-mascot.png"
                      alt="Beekoding Mascot"
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-lg font-black tracking-tight flex items-center">
                      bee<span className="text-amber-500">koding</span>
                    </span>
                    <span className="text-[10px] font-extrabold text-amber-500 bg-amber-500/10 border border-amber-500/25 px-1.5 py-0.2 rounded-full uppercase tracking-wider">
                      Admin
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate">Portal Pengelolaan</p>
                </div>
              </div>

              {/* Toggle Button to Collapse */}
              <button
                type="button"
                onClick={toggleSidebar}
                className={`p-1.5 rounded-xl border text-xs transition-all flex items-center justify-center cursor-pointer shrink-0 ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                    : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Tutup Menu Sidebar"
                aria-label="Tutup Menu Sidebar"
              >
                <PanelLeftClose className="w-4 h-4 text-slate-400 hover:text-amber-500" />
              </button>
            </div>

            <button
              type="button"
              onClick={onBackToHome}
              className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isDark
                  ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-100 shadow-xs'
              }`}
              title="Kembali ke Halaman Web Utama"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-500" />
              <span>Ke Website Utama</span>
            </button>
          </div>
        )}

        {/* ================= MIDDLE: NAVIGATION ITEMS ================= */}
        <div className="flex-1 py-3 px-3 overflow-y-auto space-y-3">
          {!sidebarCollapsed && (
            <div className="flex items-center justify-between px-2 pb-1 text-[11px] text-slate-400 dark:text-slate-500 font-semibold select-none">
              <span className="uppercase tracking-wider text-[10px] font-black">Menu Navigasi</span>
              <button
                type="button"
                onClick={toggleAllGroups}
                className="text-[10px] font-bold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 hover:underline cursor-pointer transition-colors"
              >
                {allGroupsOpen ? 'Tutup Semua' : 'Buka Semua'}
              </button>
            </div>
          )}

          <nav className="space-y-2.5">
            {activeNavGroups.map((group, groupIdx) => {
              const isOpen = !!openGroups[group.groupTitle];
              const groupHasActiveItem = group.items.some((item) => item.id === currentTab);
              const groupBadgeCount = group.items.reduce((acc, curr) => acc + (curr.badge ? 1 : 0), 0);

              return (
                <div key={group.groupTitle} className="space-y-1">
                  {!sidebarCollapsed ? (
                    <button
                      type="button"
                      onClick={() => toggleGroup(group.groupTitle)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all cursor-pointer group text-left select-none ${
                        groupHasActiveItem
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                          : isDark
                          ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
                      }`}
                      title={isOpen ? `Tutup kategori ${group.groupTitle}` : `Buka kategori ${group.groupTitle}`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${groupHasActiveItem ? 'bg-amber-500 ring-2 ring-amber-500/30' : 'bg-slate-300 dark:bg-slate-700'}`} />
                        <span className="text-[11px] font-bold uppercase tracking-wider truncate">
                          {group.groupTitle}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-slate-200/80 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                          {group.items.length}
                        </span>
                        {!isOpen && groupBadgeCount > 0 && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" title={`${groupBadgeCount} pemberitahuan baru`} />
                        )}
                      </div>

                      <div className="flex items-center pl-1">
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 ${
                            isOpen ? 'rotate-0' : '-rotate-90'
                          }`}
                        />
                      </div>
                    </button>
                  ) : (
                    groupIdx > 0 && (
                      <div className="w-6 h-px mx-auto my-2 bg-slate-200 dark:bg-slate-800/80" />
                    )
                  )}

                  {(sidebarCollapsed || isOpen) && (
                    <div className={!sidebarCollapsed ? 'space-y-1 ml-2 pl-1.5 border-l-2 border-amber-500/20' : 'space-y-1'}>
                      {group.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = currentTab === item.id;

                        if (sidebarCollapsed) {
                          /* COLLAPSED NAV ITEM (ICON ONLY WITH TOOLTIP & BADGE DOT) */
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleNavClick(item.id)}
                              className={`w-11 h-11 mx-auto rounded-2xl transition-all flex items-center justify-center cursor-pointer group relative ${
                                isActive
                                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/25'
                                  : isDark
                                  ? 'text-slate-400 hover:bg-slate-800/80 hover:text-white'
                                  : 'text-slate-600 hover:bg-amber-50 hover:text-slate-900'
                              }`}
                              title={`${item.label} — ${item.description}`}
                            >
                              <Icon className="w-5 h-5" />
                              {item.badge && (
                                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 border-2 border-slate-900 text-[8px] text-white flex items-center justify-center font-bold animate-pulse" />
                              )}
                            </button>
                          );
                        }

                        /* EXPANDED NAV ITEM (FULL DETAILS) */
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavClick(item.id)}
                            className={`w-full p-2.5 rounded-2xl text-left transition-all flex items-center gap-3 cursor-pointer group relative ${
                              isActive
                                ? 'bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/20'
                                : isDark
                                ? 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                                : 'text-slate-600 hover:bg-amber-50/70 hover:text-slate-900'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                                isActive
                                  ? 'bg-slate-950/15 text-slate-950'
                                  : isDark
                                  ? 'bg-slate-800/80 text-amber-400 group-hover:bg-slate-700'
                                  : 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <span className="text-xs font-bold truncate">{item.label}</span>
                                {item.badge && (
                                  <span
                                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-black shrink-0 ${
                                      isActive
                                        ? 'bg-slate-950 text-amber-400'
                                        : 'bg-rose-500 text-white animate-pulse'
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p
                                className={`text-[10px] truncate mt-0.5 ${
                                  isActive
                                    ? 'text-slate-950/80 font-medium'
                                    : isDark
                                    ? 'text-slate-400'
                                    : 'text-slate-500'
                                }`}
                              >
                                {item.description}
                              </p>
                            </div>

                            {isActive && (
                              <ChevronRight className="w-4 h-4 shrink-0 text-slate-950/60" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* ================= BOTTOM: USER & LOGOUT ================= */}
        <div className="p-3 border-t border-dashed border-slate-200 dark:border-slate-800/80 space-y-2">
          {sidebarCollapsed ? (
            /* COLLAPSED BOTTOM (ICONS ONLY) */
            <div className="flex flex-col items-center space-y-2">
              <button
                type="button"
                onClick={() => onTabChange('settings')}
                className={`w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center font-bold text-xs transition-all cursor-pointer ${
                  currentTab === 'settings'
                    ? 'bg-amber-500 text-slate-950 shadow-md ring-2 ring-amber-400/50'
                    : 'bg-amber-500/15 text-amber-500 hover:bg-amber-500/25'
                }`}
                title={`Pengaturan Akun: ${adminUser?.name || 'Administrator'}`}
                aria-label="Pengaturan Akun"
              >
                {renderAdminAvatar(adminUser?.avatar, 'w-full h-full object-cover', 'w-5 h-5')}
              </button>

              <button
                type="button"
                onClick={onLogout}
                className={`w-10 h-10 rounded-xl border text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-rose-400 hover:bg-rose-500/15 hover:border-rose-500/30'
                    : 'bg-white border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-200 shadow-xs'
                }`}
                title="Logout dari Portal Admin"
                aria-label="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* EXPANDED BOTTOM (FULL DETAILS) */
            <>
              {/* Admin User Card (Click to Settings) */}
              <button
                type="button"
                onClick={() => onTabChange('settings')}
                className={`w-full p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all group cursor-pointer ${
                  currentTab === 'settings'
                    ? 'bg-amber-500/10 border-amber-500/40 ring-1 ring-amber-500/40'
                    : isDark
                    ? 'bg-slate-900/90 border-slate-800 hover:border-amber-500/30'
                    : 'bg-slate-50/80 border-slate-200 hover:border-amber-300 shadow-xs'
                }`}
                title="Buka Pengaturan Akun & Profil"
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-amber-500/20 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
                  {renderAdminAvatar(currentSystemUser.avatar || adminUser?.avatar, 'w-full h-full object-cover', 'w-4 h-4')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-[11px] leading-tight truncate text-slate-900 dark:text-slate-100 group-hover:text-amber-500 transition-colors">
                    {currentSystemUser.name}
                  </div>
                  <div className="text-[9px] text-amber-500 font-bold truncate">
                    {currentSystemUser.roleTitle || currentSystemUser.role}
                  </div>
                </div>
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={onLogout}
                className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30'
                    : 'bg-white border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-200 shadow-xs'
                }`}
                title="Keluar dari Portal Admin"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. MOBILE TOP HEADER & DRAWER                             */}
      {/* ========================================================= */}
      <header
        className={`md:hidden sticky top-0 z-40 border-b backdrop-blur-xl transition-colors py-3 px-4 flex items-center justify-between ${
          isDark
            ? 'bg-[#0d0f15]/90 border-amber-500/20'
            : 'bg-white/90 border-amber-200 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`p-2 rounded-xl border ${
              isDark
                ? 'bg-slate-900 border-slate-800 text-slate-300'
                : 'bg-slate-50 border-slate-200 text-slate-700'
            }`}
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-500 p-[2px]">
              <div
                className={`w-full h-full rounded-[6px] flex items-center justify-center ${
                  isDark ? 'bg-[#121520]' : 'bg-white'
                }`}
              >
                <img
                  src="/bee-mascot.png"
                  alt="Beekoding Mascot"
                  className="w-6 h-6 object-contain"
                />
              </div>
            </div>
            <span className="text-base font-black tracking-tight flex items-center">
              bee<span className="text-amber-500">koding</span>
              <span className="text-[9px] font-extrabold text-amber-500 ml-1 px-1.5 py-0.2 rounded-full bg-amber-500/10 border border-amber-500/25 uppercase">
                Admin
              </span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSupabaseConfigured() && (
            <div
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              title="Cloud PostgreSQL Terhubung & Real-Time Sync Aktif"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cloud</span>
            </div>
          )}
          <ThemeToggle />
          <button
            type="button"
            onClick={onLogout}
            className={`p-2 rounded-xl border text-rose-500 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Menu Sliding From Left */}
          <div
            className={`relative w-72 max-w-[85vw] h-full flex flex-col justify-between border-r shadow-2xl p-5 z-50 transition-transform ${
              isDark
                ? 'bg-[#111420] border-amber-500/20 text-slate-100'
                : 'bg-white border-amber-200 text-slate-800'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500 p-[2px]">
                    <div
                      className={`w-full h-full rounded-[6px] flex items-center justify-center ${
                        isDark ? 'bg-[#121520]' : 'bg-white'
                      }`}
                    >
                      <img
                        src="/bee-mascot.png"
                        alt="Beekoding Mascot"
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  </div>
                  <span className="font-black text-sm">Menu Administrator</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  onBackToHome();
                  setMobileMenuOpen(false);
                }}
                className={`w-full py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isDark
                    ? 'bg-slate-900 border-slate-800 text-slate-300'
                    : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-500" />
                <span>Ke Website Utama</span>
              </button>

              <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-slate-400 dark:text-slate-500 font-semibold select-none">
                <span className="uppercase tracking-wider text-[10px] font-black">Menu Navigasi</span>
                <button
                  type="button"
                  onClick={toggleAllGroups}
                  className="text-[10px] font-bold text-amber-500 hover:text-amber-600 dark:hover:text-amber-400 hover:underline cursor-pointer"
                >
                  {allGroupsOpen ? 'Tutup Semua' : 'Buka Semua'}
                </button>
              </div>

              <nav className="space-y-2.5 pt-1 overflow-y-auto max-h-[calc(100vh-210px)] pr-1">
                {activeNavGroups.map((group) => {
                  const isOpen = !!openGroups[group.groupTitle];
                  const groupHasActiveItem = group.items.some((item) => item.id === currentTab);
                  const groupBadgeCount = group.items.reduce((acc, curr) => acc + (curr.badge ? 1 : 0), 0);

                  return (
                    <div key={group.groupTitle} className="space-y-1">
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.groupTitle)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all cursor-pointer group text-left select-none ${
                          groupHasActiveItem
                            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold'
                            : isDark
                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 font-semibold'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-semibold'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${groupHasActiveItem ? 'bg-amber-500 ring-2 ring-amber-500/30' : 'bg-slate-300 dark:bg-slate-700'}`} />
                          <span className="text-[11px] font-bold uppercase tracking-wider truncate">
                            {group.groupTitle}
                          </span>
                          <span className="text-[9px] px-1.5 py-0.2 rounded-full font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 shrink-0">
                            {group.items.length}
                          </span>
                          {!isOpen && groupBadgeCount > 0 && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shrink-0" />
                          )}
                        </div>

                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-200 shrink-0 text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 ${
                            isOpen ? 'rotate-0' : '-rotate-90'
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="space-y-1 ml-2 pl-1.5 border-l-2 border-amber-500/20">
                          {group.items.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentTab === item.id;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleNavClick(item.id)}
                                className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center justify-between ${
                                  isActive
                                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                                    : isDark
                                    ? 'text-slate-300 hover:bg-slate-800'
                                    : 'text-slate-700 hover:bg-slate-100'
                                }`}
                              >
                                <div className="flex items-center gap-2.5">
                                  <Icon className="w-4 h-4" />
                                  <span className="text-xs font-semibold">{item.label}</span>
                                </div>
                                {item.badge && (
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-500 text-white font-black">
                                    {item.badge}
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <button
                type="button"
                onClick={() => {
                  onTabChange('settings');
                  setMobileMenuOpen(false);
                }}
                className={`w-full p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                  currentTab === 'settings'
                    ? 'bg-amber-500/10 border-amber-500/40'
                    : isDark
                    ? 'bg-slate-900 border-slate-800'
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="w-9 h-9 rounded-xl overflow-hidden bg-amber-500/20 border border-amber-500/30 text-amber-500 flex items-center justify-center font-bold text-xs shrink-0">
                  {renderAdminAvatar(adminUser?.avatar, 'w-full h-full object-cover', 'w-4 h-4')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-xs text-slate-800 dark:text-slate-100 truncate">
                    {adminUser?.name || 'Administrator'}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    {adminUser?.email || 'admin@beekoding.id'}
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={onLogout}
                className="w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 text-rose-500 border-rose-500/20 bg-rose-500/10"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 3. MAIN CONTENT CONTAINER (Sebelah Kanan Sidebar)          */}
      {/* ========================================================= */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Desktop Top Sub-Header: Breadcrumb & Contextual Status */}
        <header
          className={`hidden md:flex sticky top-0 z-20 border-b backdrop-blur-xl transition-colors py-3.5 px-6 lg:px-8 items-center justify-between ${
            isDark
              ? 'bg-[#0d0f15]/85 border-amber-500/15'
              : 'bg-[#fbf9f3]/85 border-amber-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold ${
                isDark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-100 text-amber-700'
              }`}
            >
              <currentNavItem.icon className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-400">Portal Admin</span>
                <span className="text-xs text-slate-400">/</span>
                <h1 className="text-sm lg:text-base font-black tracking-tight text-slate-900 dark:text-white">
                  {currentNavItem.label}
                </h1>
                {currentNavItem.badge && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-rose-500 text-white animate-pulse">
                    {currentNavItem.badge}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                {currentNavItem.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Role Switcher Pill for Demo & Testing */}
            <div
              className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl border text-xs ${
                isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200 shadow-xs'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Uji Peran:</span>
              </span>
              <select
                value={currentSystemUser.id}
                onChange={(e) => {
                  switchActiveSystemUser(e.target.value);
                  window.location.reload();
                }}
                className="bg-transparent font-extrabold text-xs text-amber-600 dark:text-amber-400 focus:outline-none cursor-pointer"
                title="Beralih peran secara cepat untuk menguji tampilan menu"
              >
                {allSystemUsers.map((u) => (
                  <option
                    key={u.id}
                    value={u.id}
                    className={isDark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'}
                  >
                    {u.name} ({u.role === 'administrator' ? 'Admin' : u.role === 'instructor' ? 'Mentor' : 'Konselor'})
                  </option>
                ))}
              </select>
            </div>
 
            {isSupabaseConfigured() && (
              <div
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-xs"
                title="Cloud PostgreSQL Terhubung & Real-Time Sync Aktif"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Cloud Live Sync</span>
              </div>
            )}

            <ThemeToggle />
          </div>
        </header>

        {/* Main Content Body */}
        <main className="flex-1 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 min-w-0">
          {isCurrentTabAllowed ? (
            children
          ) : (
            <div
              className={`p-8 rounded-3xl border text-center max-w-lg mx-auto my-16 space-y-4 shadow-xl ${
                isDark ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
              }`}
            >
              <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto text-2xl">
                🛡️
              </div>
              <h2 className="text-xl font-black">Akses Dibatasi (Restricted Access)</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Akun Anda dengan peran <strong>{currentSystemUser.roleTitle || currentSystemUser.role}</strong> tidak memiliki wewenang untuk membuka menu ini. Silakan hubungi Administrator jika membutuhkan akses tambahan.
              </p>
              <button
                type="button"
                onClick={() => onTabChange(activeNavGroups[0]?.items[0]?.id || 'dashboard')}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all cursor-pointer shadow-md shadow-amber-500/20"
              >
                Kembali ke {activeNavGroups[0]?.items[0]?.label || 'Dashboard'}
              </button>
            </div>
          )}
        </main>

        {/* Footer with centered copyright and profile badge on right */}
        <footer
          className={`border-t py-3.5 px-6 text-xs transition-colors relative flex flex-col sm:flex-row items-center justify-center gap-3 ${
            isDark
              ? 'bg-[#0d0f15] border-slate-900 text-slate-500'
              : 'bg-white border-slate-200 text-slate-500'
          }`}
        >
          <div className="text-center font-medium text-slate-400">
            Beekoding Assessment Management System • Hak Akses Administrator © 2026
          </div>
        </footer>
      </div>
    </div>
  );
};
