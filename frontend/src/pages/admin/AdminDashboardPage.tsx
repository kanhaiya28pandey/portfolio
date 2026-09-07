import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Layers,
  Cpu,
  Mail,
  Send,
  FileText,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  AlertCircle,
  Clock,
  Award,
  GraduationCap,
  Briefcase,
  Upload,
  Settings,
  Globe,
  Save,
  Sparkles,
  Brain,
  Terminal,
  BarChart3,
  Cog,
  ShieldCheck,
  BookOpen,
  Cloud,
  Database,
  Trophy,
  Medal,
  Crown,
  Star,
  Flame,
  Target,
  Rocket,
  Code2,
  Menu,
  X,
  Sun,
  Moon,
  FileDown,
  Filter,
  Calendar,
  Search,
  Users,
  Eye,
  TrendingUp,
  Activity,
  CheckSquare,
  Square,
  RefreshCw,
  Monitor,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { getCourseMeta } from '../../utils/certMeta';
import { getAchievementMeta } from '../../utils/achievementMeta';
import { GlassCard } from '../../components/common/GlassCard';
import { FuturisticButton } from '../../components/common/FuturisticButton';
import { NeonBadge } from '../../components/common/NeonBadge';
import { TechLogo } from '../../components/common/TechIcons';
import {
  checkAdminAuth,
  adminLogout,
  fetchAdminSummary,
  fetchAdminProjects,
  createAdminProject,
  updateAdminProject,
  deleteAdminProject,
  fetchAdminSkills,
  createAdminSkill,
  updateAdminSkill,
  deleteAdminSkill,
  fetchAdminExperiences,
  createAdminExperience,
  updateAdminExperience,
  deleteAdminExperience,
  fetchAdminEducations,
  createAdminEducation,
  updateAdminEducation,
  deleteAdminEducation,
  fetchAdminCertificates,
  createAdminCertificate,
  updateAdminCertificate,
  deleteAdminCertificate,
  fetchAdminAchievements,
  createAdminAchievement,
  updateAdminAchievement,
  deleteAdminAchievement,
  fetchAdminMessages,
  updateAdminMessageStatus,
  deleteAdminMessage,
  batchDeleteAdminMessages,
  clearOldAdminMessages,
  fetchAdminAuditLogs,
  deleteAdminAuditLog,
  batchDeleteAdminAuditLogs,
  clearOldAdminAuditLogs,
  clearAllAdminAuditLogs,
  uploadAdminFile,
  fetchAdminSettings,
  updateAdminSettings,
  fetchAdminProfile,
  updateAdminProfile,
  fetchAdminAnalyticsSummary,
  deleteAdminVisitor,
  batchDeleteAdminVisitors,
  clearOldAdminVisitors,
  clearAllAdminVisitors,
  testAdminEmailDispatch,
  type EmailDispatchReport,
} from '../../services/api';
import type {
  AdminUser,
  DashboardSummary,
  Project,
  Skill,
  Experience,
  ExperienceCertificate,
  Education,
  Certificate,
  Achievement,
  ContactMessage,
  AuditLog,
  ContentStatus,
  MessageStatus,
  Profile,
  AnalyticsSummary,
} from '../../types/portfolio';
import { resolveAssetUrl } from '../../utils/assetUrl';

type ActiveTab =
  | 'overview'
  | 'analytics'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'certificates'
  | 'achievements'
  | 'messages'
  | 'audit'
  | 'settings';

export const CERT_ICON_PRESETS = [
  { key: 'brain', label: 'AI & GenAI', icon: Brain, color: 'text-purple-400 border-purple-500/30 hover:border-purple-400 bg-purple-500/10' },
  { key: 'layers', label: 'Full Stack', icon: Layers, color: 'text-emerald-400 border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/10' },
  { key: 'globe', label: 'Web Dev', icon: Globe, color: 'text-cyan-400 border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/10' },
  { key: 'terminal', label: 'Python / Code', icon: Terminal, color: 'text-blue-400 border-blue-500/30 hover:border-blue-400 bg-blue-500/10' },
  { key: 'cpu', label: 'Advanced Tech', icon: Cpu, color: 'text-indigo-400 border-indigo-500/30 hover:border-indigo-400 bg-indigo-500/10' },
  { key: 'chart', label: 'Data Analytics', icon: BarChart3, color: 'text-teal-400 border-teal-500/30 hover:border-teal-400 bg-teal-500/10' },
  { key: 'cog', label: 'Automation', icon: Cog, color: 'text-rose-400 border-rose-500/30 hover:border-rose-400 bg-rose-500/10' },
  { key: 'book', label: 'Fundamentals', icon: BookOpen, color: 'text-amber-400 border-amber-500/30 hover:border-amber-400 bg-amber-500/10' },
  { key: 'shield', label: 'Cybersecurity', icon: ShieldCheck, color: 'text-red-400 border-red-500/30 hover:border-red-400 bg-red-500/10' },
  { key: 'cloud', label: 'Cloud Systems', icon: Cloud, color: 'text-sky-400 border-sky-500/30 hover:border-sky-400 bg-sky-500/10' },
  { key: 'database', label: 'Database', icon: Database, color: 'text-yellow-400 border-yellow-500/30 hover:border-yellow-400 bg-yellow-500/10' },
  { key: 'award', label: 'Specialization', icon: Award, color: 'text-violet-400 border-violet-500/30 hover:border-violet-400 bg-violet-500/10' },
];

export const ACHIEVEMENT_ICON_PRESETS = [
  { key: 'trophy', label: 'Trophy / Winner', icon: Trophy, color: 'text-amber-400 border-amber-500/30 hover:border-amber-400 bg-amber-500/10' },
  { key: 'crown', label: 'Crown / 1st Rank', icon: Crown, color: 'text-purple-400 border-purple-500/30 hover:border-purple-400 bg-purple-500/10' },
  { key: 'flame', label: 'Flame / Streak', icon: Flame, color: 'text-orange-400 border-orange-500/30 hover:border-orange-400 bg-orange-500/10' },
  { key: 'medal', label: 'Medal / Podium', icon: Medal, color: 'text-rose-400 border-rose-500/30 hover:border-rose-400 bg-rose-500/10' },
  { key: 'star', label: 'Star / Percentile', icon: Star, color: 'text-emerald-400 border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/10' },
  { key: 'target', label: 'Target / Solved', icon: Target, color: 'text-cyan-400 border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/10' },
  { key: 'rocket', label: 'Rocket / Launch', icon: Rocket, color: 'text-blue-400 border-blue-500/30 hover:border-blue-400 bg-blue-500/10' },
  { key: 'code', label: 'Code / Dev Merit', icon: Code2, color: 'text-teal-400 border-teal-500/30 hover:border-teal-400 bg-teal-500/10' },
];

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [loading, setLoading] = useState(true);
  const [actionNotice, setActionNotice] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [adminTheme, setAdminTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kp_admin_theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    return 'dark';
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);

  const toggleAdminTheme = () => {
    const nextTheme = adminTheme === 'dark' ? 'light' : 'dark';
    setAdminTheme(nextTheme);
    localStorage.setItem('kp_admin_theme', nextTheme);
  };

  const [_summary, setSummary] = useState<DashboardSummary | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({
    site_title: 'Kanhaiya | techwithkanhaiya',
    meta_description: 'Official portfolio of Kanhaiya Pandey - Full-Stack Developer & Software Engineer.',
    support_coffee_url: 'pandey123@okhdfcbank',
    availability_badge: 'Available for Full-Stack & AI Roles',
    dsa_solved_count: '150+',
    github_url: 'https://github.com/kanhaiya28pandey/',
    linkedin_url: 'https://www.linkedin.com/in/kanhaiya-pandey-3856743a7/',
    email: 'kanhaiya542112@gmail.com',
    phone_number: '+91 9801573326',
    whatsapp_number: '+91 9801573326',
    about_avatar_url: '/assets/kanhaiya_real.jpg',
    about_stream_badge: 'Software Engineer',
    about_text:
      'I am a passionate Software Engineer focused on building robust full-stack applications and solving real-world problems. With strong foundations in Data Structures & Algorithms, Java, Spring Boot, and modern React, I enjoy crafting seamless user experiences backed by reliable database architectures.',
    about_location: 'Chengalpattu, Chennai, Tamil Nadu',
    leetcode_url: '',
    gfg_url: '',
    codeforces_url: '',
    instagram_url: '',
    resume_url: '',
  });
  const [profile, setProfile] = useState<Profile | null>(null);
  const [savingSettings, setSavingSettings] = useState(false);
  const [customSocialList, setCustomSocialList] = useState<Array<{ platform: string; url: string }>>([]);

  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [visitorFilterDate, setVisitorFilterDate] = useState<string>('all');
  const [visitorFilterDevice, setVisitorFilterDevice] = useState<string>('all');
  const [visitorSearchQuery, setVisitorSearchQuery] = useState<string>('');
  const [selectedVisitorIds, setSelectedVisitorIds] = useState<number[]>([]);

  const [messageFilterStatus, setMessageFilterStatus] = useState<string>('ALL');
  const [messageFilterDate, setMessageFilterDate] = useState<string>('all');
  const [messageSearchQuery, setMessageSearchQuery] = useState<string>('');
  const [messageCustomStartDate, setMessageCustomStartDate] = useState<string>('');
  const [messageCustomEndDate, setMessageCustomEndDate] = useState<string>('');
  const [selectedMessageIds, setSelectedMessageIds] = useState<number[]>([]);

  const [auditFilterAction, setAuditFilterAction] = useState<string>('ALL');
  const [auditFilterDate, setAuditFilterDate] = useState<string>('all');
  const [auditSearchQuery, setAuditSearchQuery] = useState<string>('');
  const [auditCustomStartDate, setAuditCustomStartDate] = useState<string>('');
  const [auditCustomEndDate, setAuditCustomEndDate] = useState<string>('');
  const [selectedAuditLogIds, setSelectedAuditLogIds] = useState<number[]>([]);

  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [editingSkill, setEditingSkill] = useState<Partial<Skill> | null>(null);
  const [editingExperience, setEditingExperience] = useState<Partial<Experience> | null>(null);
  const [editingEducation, setEditingEducation] = useState<Partial<Education> | null>(null);
  const [editingCertificate, setEditingCertificate] = useState<Partial<Certificate> | null>(null);
  const [editingAchievement, setEditingAchievement] = useState<Partial<Achievement> | null>(null);
  const [uploadingAchievementProof, setUploadingAchievementProof] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [expCertTitle, setExpCertTitle] = useState("");
  const [expCertUrl, setExpCertUrl] = useState("");
  const [expCertType, setExpCertType] = useState("CERTIFICATE");
  const [uploadingExpCert, setUploadingExpCert] = useState(false);

  const [eduCertTitle, setEduCertTitle] = useState("");
  const [eduCertUrl, setEduCertUrl] = useState("");
  const [eduCertType, setEduCertType] = useState("MARKSHEET");
  const [uploadingEduCert, setUploadingEduCert] = useState(false);

  const [testingEmail, setTestingEmail] = useState(false);
  const [emailDiagnosticReport, setEmailDiagnosticReport] = useState<EmailDispatchReport | null>(null);

  const handleTestEmailDispatch = async () => {
    setTestingEmail(true);
    setEmailDiagnosticReport(null);
    try {
      const report = await testAdminEmailDispatch();
      setEmailDiagnosticReport(report);
      if (report.success) {
        showNotice('success', `Test email dispatched successfully via ${report.channel || 'Active Channel'}!`);
      } else {
        showNotice('error', `Email dispatch failed: ${report.message || 'Check diagnostics'}`);
      }
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Test email failed');
    } finally {
      setTestingEmail(false);
    }
  };

  useEffect(() => {
    const verifyAuth = async () => {
      const isSessionActive = sessionStorage.getItem('admin_session_active') === 'true';
      const token = localStorage.getItem('admin_jwt');

      if (!isSessionActive || !token) {
        navigate('/admin/login');
        return;
      }

      const user = await checkAdminAuth();
      if (!user) {
        sessionStorage.removeItem('admin_session_active');
        localStorage.removeItem('admin_jwt');
        navigate('/admin/login');
      } else {
        setCurrentUser(user);
        await loadDashboardData();
      }
      setLoading(false);
    };
    verifyAuth();
  }, [navigate]);

  const showNotice = (type: 'success' | 'error', text: string) => {
    setActionNotice({ type, text });
    setTimeout(() => setActionNotice(null), 4000);
  };

  const loadDashboardData = async () => {
    try {
      const [sum, proj, skl, exp, edu, cert, ach, msg, logs, sets, prof, an] = await Promise.all([
        fetchAdminSummary().catch(() => null),
        fetchAdminProjects().catch(() => []),
        fetchAdminSkills().catch(() => []),
        fetchAdminExperiences().catch(() => []),
        fetchAdminEducations().catch(() => []),
        fetchAdminCertificates().catch(() => []),
        fetchAdminAchievements().catch(() => []),
        fetchAdminMessages().catch(() => []),
        fetchAdminAuditLogs().catch(() => []),
        fetchAdminSettings().catch(() => null),
        fetchAdminProfile().catch(() => null),
        fetchAdminAnalyticsSummary().catch(() => null),
      ]);

      if (sum) setSummary(sum);
      setProjects(proj);
      setSkills(skl);
      setExperiences(exp);
      setEducations(edu);
      setCertificates(cert);
      setAchievements(ach);
      setMessages(msg);
      setAuditLogs(logs);
      if (an) setAnalytics(an);
      if (sets) {
        setSettings((prev) => ({ ...prev, ...sets }));
        if (sets.custom_social_links) {
          try {
            setCustomSocialList(JSON.parse(sets.custom_social_links));
          } catch {
            setCustomSocialList([]);
          }
        }
      }
      if (prof) {
        setProfile(prof);
        setSettings((prev) => ({
          ...prev,
          resume_url: prev.resume_url || prof.resumeUrl || '',
          hero_avatar_url: prev.hero_avatar_url || prof.portrait3dUrl || '',
          about_avatar_url: prev.about_avatar_url || prof.avatarUrl || '',
        }));
      }
    } catch {
      showNotice('error', 'Error refreshing dashboard data');
    }
  };

  const loadAnalyticsData = async () => {
    try {
      setLoadingAnalytics(true);
      const data = await fetchAdminAnalyticsSummary();
      setAnalytics(data);
    } catch {
      // silent fail safe
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const isWithinDatePreset = (
    dateStr: string,
    preset: string,
    customStart?: string,
    customEnd?: string
  ): boolean => {
    if (!dateStr) return false;
    if (preset === 'all') return true;
    const itemDate = new Date(dateStr);
    if (isNaN(itemDate.getTime())) return true;
    const now = new Date();

    if (preset === 'today') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      return itemDate >= today;
    }
    if (preset === '7days') {
      const cutoff = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return itemDate >= cutoff;
    }
    if (preset === '30days') {
      const cutoff = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      return itemDate >= cutoff;
    }
    if (preset === 'custom') {
      if (customStart && itemDate < new Date(customStart)) return false;
      if (customEnd) {
        const end = new Date(customEnd);
        end.setHours(23, 59, 59, 999);
        if (itemDate > end) return false;
      }
      return true;
    }
    return true;
  };

  const handleDeleteMessage = async (id: number) => {
    if (!window.confirm('Are you sure you want to permanently delete this inquiry?')) return;
    try {
      await deleteAdminMessage(id);
      setSelectedMessageIds((prev) => prev.filter((item) => item !== id));
      showNotice('success', 'Inquiry deleted successfully');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete inquiry');
    }
  };

  const handleBatchDeleteMessages = async () => {
    if (selectedMessageIds.length === 0) return;
    if (!window.confirm(`Are you sure you want to delete ${selectedMessageIds.length} selected inquiries?`)) return;
    try {
      await batchDeleteAdminMessages(selectedMessageIds);
      setSelectedMessageIds([]);
      showNotice('success', `${selectedMessageIds.length} inquiries deleted`);
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete selected inquiries');
    }
  };

  const handleClearOldMessages = async (days: number) => {
    if (!window.confirm(`Are you sure you want to clear all inquiries older than ${days} days?`)) return;
    try {
      await clearOldAdminMessages(days);
      showNotice('success', `Cleared inquiries older than ${days} days`);
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to clear old inquiries');
    }
  };

  const handleDeleteAuditLog = async (id: number) => {
    if (!window.confirm('Delete this audit log entry?')) return;
    try {
      await deleteAdminAuditLog(id);
      setSelectedAuditLogIds((prev) => prev.filter((item) => item !== id));
      showNotice('success', 'Audit log deleted');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete audit log');
    }
  };

  const handleBatchDeleteAuditLogs = async () => {
    if (selectedAuditLogIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedAuditLogIds.length} selected audit logs?`)) return;
    try {
      await batchDeleteAdminAuditLogs(selectedAuditLogIds);
      setSelectedAuditLogIds([]);
      showNotice('success', 'Selected audit logs deleted');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete audit logs');
    }
  };

  const handleClearOldAuditLogs = async (days: number) => {
    if (!window.confirm(`Delete all audit logs older than ${days} days?`)) return;
    try {
      await clearOldAdminAuditLogs(days);
      showNotice('success', `Cleared audit logs older than ${days} days`);
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to clear old audit logs');
    }
  };

  const handleClearAllAuditLogs = async () => {
    if (!window.confirm('CAUTION: Are you sure you want to clear ALL audit logs?')) return;
    try {
      await clearAllAdminAuditLogs();
      setSelectedAuditLogIds([]);
      showNotice('success', 'All audit logs cleared');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to clear audit logs');
    }
  };

  const handleDeleteVisitor = async (id: number) => {
    if (!window.confirm('Delete this visitor log?')) return;
    try {
      await deleteAdminVisitor(id);
      setSelectedVisitorIds((prev) => prev.filter((item) => item !== id));
      showNotice('success', 'Visitor log deleted');
      await loadAnalyticsData();
    } catch {
      showNotice('error', 'Failed to delete visitor log');
    }
  };

  const handleBatchDeleteVisitors = async () => {
    if (selectedVisitorIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedVisitorIds.length} selected visitor records?`)) return;
    try {
      await batchDeleteAdminVisitors(selectedVisitorIds);
      setSelectedVisitorIds([]);
      showNotice('success', 'Selected visitor logs deleted');
      await loadAnalyticsData();
    } catch {
      showNotice('error', 'Failed to delete visitor logs');
    }
  };

  const handleClearOldVisitors = async (days: number) => {
    if (!window.confirm(`Clear visitor logs older than ${days} days?`)) return;
    try {
      await clearOldAdminVisitors(days);
      showNotice('success', `Cleared visitor logs older than ${days} days`);
      await loadAnalyticsData();
    } catch {
      showNotice('error', 'Failed to clear old visitor logs');
    }
  };

  const handleClearAllVisitors = async () => {
    if (!window.confirm('CAUTION: Are you sure you want to clear ALL visitor analytics logs?')) return;
    try {
      await clearAllAdminVisitors();
      setSelectedVisitorIds([]);
      showNotice('success', 'All visitor analytics logs cleared');
      await loadAnalyticsData();
    } catch {
      showNotice('error', 'Failed to clear visitor logs');
    }
  };

  useEffect(() => {
    const root = document.documentElement;
    if (adminTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    return () => {
      const userTheme = localStorage.getItem('kp_portfolio_theme') || 'dark';
      if (userTheme === 'light') {
        root.classList.add('light');
        root.classList.remove('dark');
      } else {
        root.classList.add('dark');
        root.classList.remove('light');
      }
    };
  }, [adminTheme]);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingResume(true);
    try {
      const res = await uploadAdminFile(file, true);
      setSettings((prev) => ({
        ...prev,
        resume_url: res.fileUrl,
      }));
      if (profile) {
        setProfile((prev) => (prev ? { ...prev, resumeUrl: res.fileUrl } : null));
        await updateAdminProfile({
          ...profile,
          resumeUrl: res.fileUrl,
        }).catch(() => null);
      }
      showNotice('success', 'Resume uploaded & linked successfully! Remember to save settings.');
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Resume upload failed');
    } finally {
      setUploadingResume(false);
      e.target.value = '';
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      const payload = {
        ...settings,
        custom_social_links: JSON.stringify(
          customSocialList.filter((item) => item.platform.trim() || item.url.trim())
        ),
      };
      const updated = await updateAdminSettings(payload);
      setSettings(updated);

      if (profile) {
        await updateAdminProfile({
          ...profile,
          availabilityStatus: settings.availability_badge || profile.availabilityStatus,
          githubUrl: settings.github_url || profile.githubUrl,
          linkedinUrl: settings.linkedin_url || profile.linkedinUrl,
          email: settings.email || profile.email,
          portrait3dUrl: settings.hero_avatar_url || profile.portrait3dUrl,
          avatarUrl: settings.about_avatar_url || profile.avatarUrl,
          location: settings.about_location || profile.location,
          aboutMarkdown: settings.about_text || profile.aboutMarkdown,
          resumeUrl: settings.resume_url || profile.resumeUrl,
        }).catch(() => null);
      }

      showNotice('success', 'Site settings & metrics updated successfully!');
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleLogout = async () => {
    sessionStorage.removeItem('admin_session_active');
    localStorage.removeItem('admin_jwt');
    await adminLogout();
    navigate('/admin/login');
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject || !editingProject.title || !editingProject.summary) return;

    try {
      if (editingProject.id) {
        await updateAdminProject(editingProject.id, editingProject);
        showNotice('success', 'Project updated successfully');
      } else {
        await createAdminProject(editingProject);
        showNotice('success', 'Project created successfully');
      }
      setEditingProject(null);
      await loadDashboardData();
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Failed to save project');
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteAdminProject(id);
      showNotice('success', 'Project deleted');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete project');
    }
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill || !editingSkill.name || !editingSkill.category) return;

    try {
      if (editingSkill.id) {
        await updateAdminSkill(editingSkill.id, editingSkill);
        showNotice('success', 'Skill updated successfully');
      } else {
        await createAdminSkill(editingSkill);
        showNotice('success', 'Skill created successfully');
      }
      setEditingSkill(null);
      await loadDashboardData();
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Failed to save skill');
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      await deleteAdminSkill(id);
      showNotice('success', 'Skill deleted');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete skill');
    }
  };

  const handleUploadExpCert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingExpCert(true);
    try {
      const res = await uploadAdminFile(file, true);
      const url = res.fileUrl;
      setExpCertUrl(url);

      const derivedTitle = expCertTitle.trim() || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setExpCertTitle(derivedTitle);

      showNotice("success", `Uploaded ${file.name}! Certificate ready to attach.`);
    } catch (err: unknown) {
      showNotice("error", err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingExpCert(false);
      e.target.value = "";
    }
  };

  const handleAddCertToExperience = () => {
    const title = expCertTitle.trim();
    const url = expCertUrl.trim();
    if (!url) {
      showNotice("error", "Please upload a file or paste a certificate URL first");
      return;
    }

    let list: ExperienceCertificate[] = [];
    if (editingExperience?.certificatesJson) {
      try {
        list = JSON.parse(editingExperience.certificatesJson);
      } catch {
        list = [];
      }
    }

    list.push({
      title: title || "Certificate",
      fileUrl: url,
      type: expCertType || "CERTIFICATE",
    });

    setEditingExperience({
      ...editingExperience,
      certificatesJson: JSON.stringify(list),
    });

    setExpCertTitle("");
    setExpCertUrl("");
    showNotice("success", "Certificate attached to internship");
  };

  const handleRemoveCertFromExperience = (index: number) => {
    let list: ExperienceCertificate[] = [];
    if (editingExperience?.certificatesJson) {
      try {
        list = JSON.parse(editingExperience.certificatesJson);
      } catch {
        list = [];
      }
    }

    list.splice(index, 1);
    setEditingExperience({
      ...editingExperience,
      certificatesJson: JSON.stringify(list),
    });
  };

  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExperience || !editingExperience.organization || !editingExperience.role) {
      showNotice("error", "Organization and Role Title are required");
      return;
    }

    try {
      let list: ExperienceCertificate[] = [];
      if (editingExperience.certificatesJson) {
        try {
          list = JSON.parse(editingExperience.certificatesJson);
        } catch {
          list = [];
        }
      }

      if (expCertUrl.trim()) {
        list.push({
          title: expCertTitle.trim() || "Certificate",
          fileUrl: expCertUrl.trim(),
          type: expCertType || "CERTIFICATE",
        });
        setExpCertTitle("");
        setExpCertUrl("");
      }

      const payload: Partial<Experience> = {
        ...editingExperience,
        organization: (editingExperience.organization || "").trim(),
        role: (editingExperience.role || "").trim(),
        duration: (editingExperience.duration || "Ongoing").trim(),
        descriptionMarkdown: (editingExperience.descriptionMarkdown || "Key responsibilities and achievements").trim(),
        location: (editingExperience.location || "").trim(),
        employmentType: editingExperience.employmentType || "Fully Remote",
        assignedProjectName: (editingExperience.assignedProjectName || "").trim(),
        assignedProjectSlug: (editingExperience.assignedProjectSlug || "").trim(),
        technologies: (editingExperience.technologies || "").trim(),
        certificatesJson: JSON.stringify(list),
        displayOrder: typeof editingExperience.displayOrder === "number" ? editingExperience.displayOrder : 0,
        status: editingExperience.status || "PUBLISHED",
        isCurrent: Boolean(editingExperience.isCurrent),
      };

      if (editingExperience.id) {
        await updateAdminExperience(editingExperience.id, payload);
        showNotice("success", "Experience updated successfully");
      } else {
        await createAdminExperience(payload);
        showNotice("success", "Experience created successfully");
      }
      setEditingExperience(null);
      await loadDashboardData();
    } catch (err: unknown) {
      showNotice("error", err instanceof Error ? err.message : "Failed to save experience");
    }
  };

  const handleDeleteExperience = async (id: number) => {
    if (!window.confirm('Delete this experience entry?')) return;
    try {
      await deleteAdminExperience(id);
      showNotice('success', 'Experience deleted');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete experience');
    }
  };

  const handleUploadEduCert = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingEduCert(true);
    try {
      const res = await uploadAdminFile(file, true);
      const url = res.fileUrl;
      setEduCertUrl(url);

      const derivedTitle = eduCertTitle.trim() || file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      setEduCertTitle(derivedTitle);

      showNotice("success", `Uploaded ${file.name}! Document ready to attach.`);
    } catch (err: unknown) {
      showNotice("error", err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingEduCert(false);
      e.target.value = "";
    }
  };

  const handleAddCertToEducation = () => {
    const title = eduCertTitle.trim();
    const url = eduCertUrl.trim();
    if (!url) {
      showNotice("error", "Please upload a file or paste a document URL first");
      return;
    }

    let list: ExperienceCertificate[] = [];
    if (editingEducation?.certificatesJson) {
      try {
        list = JSON.parse(editingEducation.certificatesJson);
      } catch {
        list = [];
      }
    }

    list.push({
      title: title || "Academic Document",
      fileUrl: url,
      type: eduCertType || "MARKSHEET",
    });

    setEditingEducation({
      ...editingEducation,
      certificatesJson: JSON.stringify(list),
    });

    setEduCertTitle("");
    setEduCertUrl("");
    showNotice("success", "Document attached to education milestone");
  };

  const handleRemoveCertFromEducation = (index: number) => {
    let list: ExperienceCertificate[] = [];
    if (editingEducation?.certificatesJson) {
      try {
        list = JSON.parse(editingEducation.certificatesJson);
      } catch {
        list = [];
      }
    }

    list.splice(index, 1);
    setEditingEducation({
      ...editingEducation,
      certificatesJson: JSON.stringify(list),
    });
  };

  const handleSaveEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEducation || !editingEducation.institution || !editingEducation.degree) {
      showNotice("error", "Institution and Degree are required");
      return;
    }

    try {
      let list: ExperienceCertificate[] = [];
      if (editingEducation.certificatesJson) {
        try {
          list = JSON.parse(editingEducation.certificatesJson);
        } catch {
          list = [];
        }
      }

      if (eduCertUrl.trim()) {
        list.push({
          title: eduCertTitle.trim() || "Academic Document",
          fileUrl: eduCertUrl.trim(),
          type: eduCertType || "MARKSHEET",
        });
        setEduCertTitle("");
        setEduCertUrl("");
      }

      const payload: Partial<Education> = {
        ...editingEducation,
        institution: (editingEducation.institution || "").trim(),
        degree: (editingEducation.degree || "").trim(),
        fieldOfStudy: (editingEducation.fieldOfStudy || "").trim(),
        duration: (editingEducation.duration || "").trim(),
        gradeOrPercentage: (editingEducation.gradeOrPercentage || "").trim(),
        description: (editingEducation.description || "").trim(),
        certificatesJson: JSON.stringify(list),
        displayOrder: typeof editingEducation.displayOrder === "number" ? editingEducation.displayOrder : 0,
        status: editingEducation.status || "PUBLISHED",
      };

      if (editingEducation.id) {
        await updateAdminEducation(editingEducation.id, payload);
        showNotice('success', 'Education entry updated');
      } else {
        await createAdminEducation(payload);
        showNotice('success', 'Education entry created');
      }
      setEditingEducation(null);
      await loadDashboardData();
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Failed to save education');
    }
  };

  const handleDeleteEducation = async (id: number) => {
    if (!window.confirm('Delete this education entry?')) return;
    try {
      await deleteAdminEducation(id);
      showNotice('success', 'Education deleted');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete education');
    }
  };

  const handleSaveCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCertificate || !editingCertificate.title || !editingCertificate.issuingOrg) return;

    try {
      if (editingCertificate.id) {
        await updateAdminCertificate(editingCertificate.id, editingCertificate);
        showNotice('success', 'Certificate updated');
      } else {
        await createAdminCertificate(editingCertificate);
        showNotice('success', 'Certificate created');
      }
      setEditingCertificate(null);
      await loadDashboardData();
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Failed to save certificate');
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    if (!window.confirm('Delete this certificate?')) return;
    try {
      await deleteAdminCertificate(id);
      showNotice('success', 'Certificate deleted');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete certificate');
    }
  };

  const handleSaveAchievement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAchievement || !editingAchievement.title) {
      showNotice('error', 'Achievement title is required');
      return;
    }

    try {
      const payload: Partial<Achievement> = {
        ...editingAchievement,
        title: (editingAchievement.title || '').trim(),
        metricValue: (editingAchievement.metricValue || '').trim(),
        organization: (editingAchievement.organization || '').trim(),
        issueDate: (editingAchievement.issueDate || '').trim(),
        proofUrl: (editingAchievement.proofUrl || '').trim(),
        description: (editingAchievement.description || editingAchievement.descriptionMarkdown || '').trim(),
        descriptionMarkdown: (editingAchievement.descriptionMarkdown || editingAchievement.description || '').trim(),
        iconKey: (editingAchievement.iconKey || 'trophy').trim(),
        displayOrder: typeof editingAchievement.displayOrder === 'number' ? editingAchievement.displayOrder : achievements.length + 1,
        status: editingAchievement.status || 'PUBLISHED',
      };

      if (editingAchievement.id) {
        await updateAdminAchievement(editingAchievement.id, payload);
        showNotice('success', 'Achievement updated');
      } else {
        await createAdminAchievement(payload);
        showNotice('success', 'Achievement created');
      }
      setEditingAchievement(null);
      await loadDashboardData();
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Failed to save achievement');
    }
  };

  const handleDeleteAchievement = async (id: number) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await deleteAdminAchievement(id);
      showNotice('success', 'Achievement deleted');
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to delete achievement');
    }
  };

  const handleAchievementProofUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAchievementProof(true);
    try {
      const res = await uploadAdminFile(file, true);
      setEditingAchievement((prev) => (prev ? { ...prev, proofUrl: res.fileUrl } : null));
      showNotice('success', 'Proof document uploaded successfully!');
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'Failed to upload proof document');
    } finally {
      setUploadingAchievementProof(false);
      e.target.value = '';
    }
  };

  const handleUpdateMessageStatus = async (id: number, status: MessageStatus) => {
    try {
      await updateAdminMessageStatus(id, status);
      showNotice('success', `Message status set to ${status}`);
      await loadDashboardData();
    } catch {
      showNotice('error', 'Failed to update message status');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'thumbnailUrl' | 'bannerUrl' | 'credentialUrl') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await uploadAdminFile(file, true);
      if (editingProject) {
        setEditingProject({ ...editingProject, [targetField]: res.fileUrl });
      } else if (editingCertificate) {
        setEditingCertificate({ ...editingCertificate, [targetField]: res.fileUrl });
      }
      showNotice('success', 'File uploaded successfully');
    } catch (err: unknown) {
      showNotice('error', err instanceof Error ? err.message : 'File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const NAV_GROUPS: Array<{
    title: string;
    items: Array<{
      id: ActiveTab;
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      count: number | null;
      isNewBadge?: boolean;
    }>;
  }> = [
    {
      title: 'DASHBOARD',
      items: [
        { id: 'overview', label: 'Overview', icon: Clock, count: null },
        {
          id: 'analytics',
          label: 'Visitor Analytics',
          icon: BarChart3,
          count: analytics ? analytics.totalVisits : null,
        },
        {
          id: 'messages',
          label: 'Inquiries',
          icon: Mail,
          count: messages.filter((m) => m.status === 'NEW').length || (messages.length > 0 ? messages.length : null),
          isNewBadge: messages.some((m) => m.status === 'NEW'),
        },
      ],
    },
    {
      title: 'PORTFOLIO CONTENT',
      items: [
        { id: 'projects', label: 'Projects', icon: Layers, count: projects.length },
        { id: 'skills', label: 'Skills', icon: Cpu, count: skills.length },
        { id: 'experience', label: 'Experience', icon: Briefcase, count: experiences.length },
        { id: 'education', label: 'Education & Docs', icon: GraduationCap, count: educations.length },
        { id: 'certificates', label: 'Certificates', icon: Award, count: certificates.length },
        { id: 'achievements', label: 'Achievements', icon: Trophy, count: achievements.length },
      ],
    },
    {
      title: 'SYSTEM & CONFIG',
      items: [
        { id: 'settings', label: 'Settings & Resume', icon: Settings, count: null },
        { id: 'audit', label: 'Audit Logs', icon: FileText, count: auditLogs.length },
      ],
    },
  ];

  const renderNavList = () => (
    <nav className="space-y-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.title} className="space-y-1">
          <div className="px-3 pb-1.5 text-[10px] font-mono font-bold tracking-wider uppercase text-slate-500 select-none">
            {group.title}
          </div>
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all group text-left ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white shadow-[0_4px_16px_rgba(59,130,246,0.35)] font-semibold'
                      : adminTheme === 'light'
                      ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                        isActive
                          ? 'text-white'
                          : adminTheme === 'light'
                          ? 'text-slate-500 group-hover:text-blue-600'
                          : 'text-slate-400 group-hover:text-cyan-400'
                      }`}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.count !== null && (
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold flex-shrink-0 ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : item.isNewBadge
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 animate-pulse'
                          : adminTheme === 'light'
                          ? 'bg-slate-200/80 text-slate-600'
                          : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        adminTheme === 'light' ? 'bg-[#f8fafc] text-slate-900' : 'bg-[#06080e] text-white'
      }`}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="font-mono text-xs text-slate-400">Loading Management System...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        adminTheme === 'light'
          ? 'admin-theme-light bg-gradient-to-br from-[#edf2fc] via-[#f4f7fd] to-[#e8eefa] text-slate-900'
          : 'admin-theme-dark bg-[#06080e] text-slate-100'
      }`}
    >
      {/* Background Multi-Layered Cyber & Aurora Styling */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {adminTheme === 'dark' ? (
          <>
            <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-transparent rounded-full blur-[110px] animate-pulse-glow" />
            <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-bl from-purple-600/20 via-violet-600/15 to-pink-500/10 rounded-full blur-[130px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
            <div className="absolute -bottom-20 left-1/4 w-[600px] h-[600px] bg-gradient-to-tl from-emerald-500/15 via-teal-600/12 to-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80f_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80f_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,transparent_40%,#06080e_90%)]" />
          </>
        ) : (
          <>
            <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-gradient-to-br from-sky-400/30 via-blue-300/25 to-indigo-300/20 rounded-full blur-[100px] animate-pulse-glow" />
            <div className="absolute top-1/4 -right-32 w-[550px] h-[550px] bg-gradient-to-bl from-violet-400/25 via-purple-300/20 to-pink-300/20 rounded-full blur-[110px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
            <div className="absolute -bottom-24 left-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-300/30 via-teal-200/25 to-sky-200/20 rounded-full blur-[100px]" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f618_1px,transparent_1px),linear-gradient(to_bottom,#3b82f618_1px,transparent_1px)] bg-[size:36px_36px]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,transparent_50%,rgba(237,242,252,0.6)_95%)]" />
          </>
        )}
      </div>

      <aside
        className={`hidden lg:flex flex-col fixed inset-y-0 left-0 w-64 xl:w-72 z-40 border-r backdrop-blur-2xl transition-colors duration-300 ${
          adminTheme === 'light'
            ? 'bg-white/90 border-slate-200/90 shadow-[4px_0_24px_rgba(0,0,0,0.03)]'
            : 'bg-[#090d16]/95 border-white/10 shadow-[4px_0_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        <div
          className={`p-5 flex items-center justify-between border-b ${
            adminTheme === 'light' ? 'border-slate-200/80 bg-slate-50/50' : 'border-white/10 bg-black/20'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-[0_0_20px_rgba(59,130,246,0.35)] flex-shrink-0">
              <div
                className={`w-full h-full rounded-[10px] flex items-center justify-center font-black text-base ${
                  adminTheme === 'light' ? 'bg-white' : 'bg-[#090d16]'
                }`}
              >
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">K</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span
                  className={`font-bold text-sm tracking-tight ${
                    adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  Admin Console
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  v2.0
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="truncate max-w-[120px]">{currentUser?.username || 'Admin'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {renderNavList()}
        </div>

        <div
          className={`p-4 border-t space-y-2 ${
            adminTheme === 'light' ? 'border-slate-200/80 bg-slate-50/70' : 'border-white/10 bg-black/30'
          }`}
        >
          <button
            type="button"
            onClick={toggleAdminTheme}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
              adminTheme === 'light'
                ? 'bg-slate-200/70 hover:bg-slate-200 text-slate-800 border border-slate-300/60'
                : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
            }`}
          >
            <div className="flex items-center gap-2">
              {adminTheme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600" />
              )}
              <span>{adminTheme === 'dark' ? 'Light Theme' : 'Dark Cyber'}</span>
            </div>
            <span className="text-[10px] uppercase font-bold opacity-60">
              {adminTheme}
            </span>
          </button>

          <Link
            to="/"
            target="_blank"
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
              adminTheme === 'light'
                ? 'bg-blue-50 hover:bg-blue-100/70 text-blue-700 border border-blue-200/60'
                : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>Live Portfolio</span>
            </div>
            <span className="text-[10px] opacity-75">↗</span>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono font-medium transition-all ${
              adminTheme === 'light'
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20'
            }`}
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              <span>Terminate Session</span>
            </div>
          </button>
        </div>
      </aside>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div
            className={`relative w-72 max-w-[82vw] h-full flex flex-col z-10 shadow-2xl transition-colors duration-300 ${
              adminTheme === 'light' ? 'bg-white text-slate-900' : 'bg-[#090d16] text-white'
            }`}
          >
            <div
              className={`p-4 flex items-center justify-between border-b ${
                adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-sm">
                  K
                </div>
                <div>
                  <span className="font-bold text-sm block">Portfolio Admin</span>
                  <span className="text-[10px] font-mono text-slate-400">Console v2.0</span>
                </div>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className={`p-1.5 rounded-lg border ${
                  adminTheme === 'light'
                    ? 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    : 'border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3.5 space-y-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              {renderNavList()}
            </div>

            <div
              className={`p-4 border-t space-y-2 ${
                adminTheme === 'light' ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-black/20'
              }`}
            >
              <button
                type="button"
                onClick={toggleAdminTheme}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono ${
                  adminTheme === 'light'
                    ? 'bg-slate-200 text-slate-800'
                    : 'bg-white/5 text-slate-300 border border-white/10'
                }`}
              >
                <div className="flex items-center gap-2">
                  {adminTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
                  <span>{adminTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                </div>
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/20"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="lg:pl-64 xl:pl-72 flex flex-col min-h-screen relative z-10">
        <header
          className={`lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 border-b backdrop-blur-xl transition-colors duration-300 ${
            adminTheme === 'light'
              ? 'bg-white/90 border-slate-200 shadow-sm'
              : 'bg-[#090d16]/90 border-white/10'
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className={`p-2 rounded-xl border transition-all ${
                adminTheme === 'light'
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-white/5 border-white/10 text-white'
              }`}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <span className="font-bold text-sm block">Portfolio Admin</span>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wide">
                {activeTab}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAdminTheme}
              className={`p-2 rounded-xl border transition-all ${
                adminTheme === 'light'
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : 'bg-white/5 border-white/10 text-slate-300'
              }`}
            >
              {adminTheme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>
            <Link
              to="/"
              target="_blank"
              className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <header
          className={`hidden lg:flex items-center justify-between px-8 py-4 border-b backdrop-blur-xl sticky top-0 z-30 transition-colors duration-300 ${
            adminTheme === 'light'
              ? 'bg-white/80 border-slate-200/90 text-slate-800'
              : 'bg-[#070a12]/80 border-white/10 text-white'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Admin Console</span>
            <span className="text-slate-400">/</span>
            <span
              className={`font-bold capitalize ${
                adminTheme === 'light' ? 'text-blue-600' : 'text-cyan-400'
              }`}
            >
              {activeTab === 'settings' ? 'Settings & Dynamic Resume' : activeTab}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>System Operational</span>
            </div>
            <Link
              to="/"
              target="_blank"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                adminTheme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
              <span>Preview Site</span>
            </Link>
          </div>
        </header>

        {actionNotice && (
          <div className="fixed top-20 right-6 z-50 animate-bounce">
            <div
              className={`px-4 py-2.5 rounded-xl border flex items-center gap-2 text-xs font-mono shadow-2xl backdrop-blur-xl ${
                actionNotice.type === 'success'
                  ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/90 border-rose-500/50 text-rose-300'
              }`}
            >
              {actionNotice.type === 'success' ? (
                <CheckCircle className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400" />
              )}
              <span>{actionNotice.text}</span>
            </div>
          </div>
        )}

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8 text-left">
            {/* Mission Control Welcome Banner */}
            <GlassCard className="p-6 sm:p-7 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-lg flex-shrink-0">
                    <div
                      className={`w-full h-full rounded-[14px] flex items-center justify-center font-black text-xl ${
                        adminTheme === 'light' ? 'bg-white text-blue-600' : 'bg-[#0a0f1d] text-cyan-400'
                      }`}
                    >
                      <span>KP</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2
                        className={`text-xl sm:text-2xl font-black tracking-tight ${
                          adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}
                      >
                        Welcome, {currentUser?.username || 'Kanhaiya Pandey'}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        SUPER ADMIN
                      </span>
                    </div>
                    <p
                      className={`text-xs font-mono mt-1 ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Portfolio Command Center • Full-Stack AI & Engineering Showcase Control Hub
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold ${
                      adminTheme === 'light'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200 shadow-sm'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span>System Online & Serving</span>
                  </div>

                  <Link
                    to="/"
                    target="_blank"
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border shadow-sm ${
                      adminTheme === 'light'
                        ? 'bg-white hover:bg-slate-100 text-blue-600 border-slate-300'
                        : 'bg-blue-500/10 hover:bg-blue-500/20 text-cyan-300 border-blue-500/30'
                    }`}
                  >
                    <span>View Public Portfolio</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </GlassCard>

            {/* Comprehensive 8-Metric Grid */}
            <div>
              <div className="flex items-center justify-between mb-3 px-1">
                <span
                  className={`text-xs font-mono uppercase tracking-wider font-bold ${
                    adminTheme === 'light' ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  Portfolio Telemetry & Live Asset Metrics
                </span>
                <span
                  className={`text-[11px] font-mono ${
                    adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                  }`}
                >
                  Instant Synchronized Data
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Projects */}
                <GlassCard
                  onClick={() => setActiveTab('projects')}
                  className="p-5 flex items-center justify-between cursor-pointer group hover:border-blue-400/50 transition-all"
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Projects Showcase
                    </span>
                    <div
                      className={`text-2xl font-black font-mono ${
                        adminTheme === 'light' ? 'text-blue-600' : 'text-blue-400'
                      }`}
                    >
                      {projects.length}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      {projects.filter((p) => p.isFeatured).length} featured showcases
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <Layers className="w-5 h-5" />
                  </div>
                </GlassCard>

                {/* 2. Technical Skills */}
                <GlassCard
                  onClick={() => setActiveTab('skills')}
                  className="p-5 flex items-center justify-between cursor-pointer group hover:border-cyan-400/50 transition-all"
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Technical Skills
                    </span>
                    <div
                      className={`text-2xl font-black font-mono ${
                        adminTheme === 'light' ? 'text-cyan-700' : 'text-cyan-400'
                      }`}
                    >
                      {skills.length}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      Across {Array.from(new Set(skills.map((s) => s.category))).length} domain categories
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500 group-hover:scale-110 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                </GlassCard>

                {/* 3. Solved DSA Problems */}
                <GlassCard
                  onClick={() => setActiveTab('settings')}
                  className="p-5 flex items-center justify-between cursor-pointer group hover:border-amber-400/50 transition-all"
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      DSA Solved
                    </span>
                    <div
                      className={`text-2xl font-black font-mono ${
                        adminTheme === 'light' ? 'text-amber-600' : 'text-amber-400'
                      }`}
                    >
                      {settings.dsa_solved_count || '150+'}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      LeetCode & GFG Benchmark
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                    <Target className="w-5 h-5" />
                  </div>
                </GlassCard>

                {/* 4. Experience & Roles */}
                <GlassCard
                  onClick={() => setActiveTab('experience')}
                  className="p-5 flex items-center justify-between cursor-pointer group hover:border-emerald-400/50 transition-all"
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Experience Timeline
                    </span>
                    <div
                      className={`text-2xl font-black font-mono ${
                        adminTheme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                      }`}
                    >
                      {experiences.length}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      {experiences.filter((e) => e.isCurrent).length > 0 ? 'Active roles present' : 'Completed milestones'}
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5" />
                  </div>
                </GlassCard>

                {/* 5. Education & Documents */}
                <GlassCard
                  onClick={() => setActiveTab('education')}
                  className="p-5 flex items-center justify-between cursor-pointer group hover:border-indigo-400/50 transition-all"
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Education & Degrees
                    </span>
                    <div
                      className={`text-2xl font-black font-mono ${
                        adminTheme === 'light' ? 'text-indigo-700' : 'text-indigo-400'
                      }`}
                    >
                      {educations.length}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      Official marksheets & degrees
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </GlassCard>

                {/* 6. Certifications */}
                <GlassCard
                  onClick={() => setActiveTab('certificates')}
                  className="p-5 flex items-center justify-between cursor-pointer group hover:border-rose-400/50 transition-all"
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Certifications
                    </span>
                    <div
                      className={`text-2xl font-black font-mono ${
                        adminTheme === 'light' ? 'text-rose-600' : 'text-rose-400'
                      }`}
                    >
                      {certificates.length}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      Published verified credentials
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                </GlassCard>

                {/* 7. Inquiries */}
                <GlassCard
                  onClick={() => setActiveTab('messages')}
                  className="p-5 flex items-center justify-between cursor-pointer group hover:border-purple-400/50 transition-all"
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Inquiries
                    </span>
                    <div
                      className={`text-2xl font-black font-mono flex items-center gap-2 ${
                        adminTheme === 'light' ? 'text-purple-700' : 'text-purple-400'
                      }`}
                    >
                      <span>{messages.length}</span>
                      {messages.some((m) => m.status === 'NEW') && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500 text-white animate-pulse">
                          {messages.filter((m) => m.status === 'NEW').length} NEW
                        </span>
                      )}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      User & recruiter messages
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                </GlassCard>

                {/* 8. Total Visits */}
                <GlassCard
                  onClick={() => setActiveTab('analytics')}
                  className="p-5 flex items-center justify-between cursor-pointer group hover:border-teal-400/50 transition-all"
                >
                  <div className="space-y-1">
                    <span
                      className={`text-xs font-mono uppercase tracking-wider font-semibold block ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}
                    >
                      Total Visits
                    </span>
                    <div
                      className={`text-2xl font-black font-mono ${
                        adminTheme === 'light' ? 'text-teal-700' : 'text-teal-400'
                      }`}
                    >
                      {analytics ? analytics.totalVisits.toLocaleString() : 0}
                    </div>
                    <div
                      className={`text-[10px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                      }`}
                    >
                      {analytics ? `${analytics.todayVisits} hits today` : 'Traffic telemetry'}
                    </div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Quick Action Launcher Grid */}
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-blue-500" />
                  <h3
                    className={`text-sm font-bold font-mono uppercase tracking-wider ${
                      adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Quick Action Launchpad
                  </h3>
                </div>
                <span
                  className={`text-[11px] font-mono ${
                    adminTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  Immediate Content Creation Shortcuts
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject({
                      title: '',
                      summary: '',
                      category: 'FULLSTACK',
                      status: 'PUBLISHED',
                      isFeatured: false,
                      displayOrder: projects.length + 1,
                    });
                    setActiveTab('projects');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm ${
                    adminTheme === 'light'
                      ? 'bg-blue-50/70 hover:bg-blue-100/70 border-blue-200 text-blue-900'
                      : 'bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/20 text-blue-300'
                  }`}
                >
                  <Plus className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-mono font-bold">+ Project</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingSkill({
                      name: '',
                      category: 'BACKEND',
                      proficiencyLevel: 'ADVANCED',
                      status: 'PUBLISHED',
                      displayOrder: skills.length + 1,
                    });
                    setActiveTab('skills');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm ${
                    adminTheme === 'light'
                      ? 'bg-cyan-50/70 hover:bg-cyan-100/70 border-cyan-200 text-cyan-900'
                      : 'bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/20 text-cyan-300'
                  }`}
                >
                  <Plus className="w-4 h-4 text-cyan-500" />
                  <span className="text-xs font-mono font-bold">+ Skill</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingExperience({
                      organization: '',
                      role: '',
                      duration: '',
                      employmentType: 'Fully Remote',
                      assignedProjectName: '',
                      assignedProjectSlug: '',
                      technologies: '',
                      certificatesJson: '[]',
                      descriptionMarkdown: '',
                      isCurrent: false,
                      displayOrder: experiences.length + 1,
                      status: 'PUBLISHED',
                    });
                    setActiveTab('experience');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm ${
                    adminTheme === 'light'
                      ? 'bg-emerald-50/70 hover:bg-emerald-100/70 border-emerald-200 text-emerald-900'
                      : 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/20 text-emerald-300'
                  }`}
                >
                  <Plus className="w-4 h-4 text-emerald-500" />
                  <span className="text-xs font-mono font-bold">+ Experience</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingEducation({
                      institution: '',
                      degree: '',
                      fieldOfStudy: '',
                      duration: '',
                      gradeOrPercentage: '',
                      description: '',
                      displayOrder: educations.length + 1,
                      status: 'PUBLISHED',
                      certificatesJson: '[]',
                    });
                    setEduCertTitle('');
                    setEduCertUrl('');
                    setActiveTab('education');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm ${
                    adminTheme === 'light'
                      ? 'bg-indigo-50/70 hover:bg-indigo-100/70 border-indigo-200 text-indigo-900'
                      : 'bg-indigo-500/10 hover:bg-indigo-500/20 border-indigo-500/20 text-indigo-300'
                  }`}
                >
                  <Plus className="w-4 h-4 text-indigo-500" />
                  <span className="text-xs font-mono font-bold">+ Education</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingCertificate({
                      title: '',
                      issuingOrg: '',
                      issueDate: new Date().getFullYear().toString(),
                      iconKey: 'award',
                      displayOrder: certificates.length + 1,
                      status: 'PUBLISHED',
                    });
                    setActiveTab('certificates');
                  }}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm ${
                    adminTheme === 'light'
                      ? 'bg-rose-50/70 hover:bg-rose-100/70 border-rose-200 text-rose-900'
                      : 'bg-rose-500/10 hover:bg-rose-500/20 border-rose-500/20 text-rose-300'
                  }`}
                >
                  <Plus className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-mono font-bold">+ Certificate</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-2 transition-all hover:scale-[1.02] shadow-sm ${
                    adminTheme === 'light'
                      ? 'bg-teal-50/70 hover:bg-teal-100/70 border-teal-200 text-teal-900'
                      : 'bg-teal-500/10 hover:bg-teal-500/20 border-teal-500/20 text-teal-300'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-teal-500" />
                  <span className="text-xs font-mono font-bold">Analytics</span>
                </button>
              </div>
            </GlassCard>

            {/* Operations Hub: Recent Inquiries & Recent Audit Trail */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Inquiries Preview */}
              <GlassCard className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-500" />
                    <h3
                      className={`text-sm font-bold font-mono uppercase tracking-wider ${
                        adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Recent Inquiries
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('messages')}
                    className={`text-[11px] font-mono hover:underline ${
                      adminTheme === 'light' ? 'text-purple-700 font-bold' : 'text-purple-400'
                    }`}
                  >
                    View All ({messages.length}) →
                  </button>
                </div>

                <div className="space-y-2.5">
                  {messages.slice(0, 4).map((msg) => (
                    <div
                      key={msg.id}
                      onClick={() => setActiveTab('messages')}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        adminTheme === 'light'
                          ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-sm'
                          : 'bg-white/5 hover:bg-white/10 border-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                            }`}
                          >
                            {msg.name}
                          </span>
                          <span
                            className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                              msg.status === 'NEW'
                                ? 'bg-purple-500/10 text-purple-500 border-purple-500/30 font-bold'
                                : msg.status === 'REPLIED'
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'
                                : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                            }`}
                          >
                            {msg.status}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono ${
                            adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                          }`}
                        >
                          {new Date(msg.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div
                        className={`text-xs line-clamp-1 ${
                          adminTheme === 'light' ? 'text-slate-600' : 'text-slate-300'
                        }`}
                      >
                        {msg.subject ? `${msg.subject} — ` : ''}{msg.message}
                      </div>
                    </div>
                  ))}

                  {messages.length === 0 && (
                    <div
                      className={`p-6 text-center text-xs font-mono rounded-xl border border-dashed ${
                        adminTheme === 'light'
                          ? 'border-slate-300 text-slate-500 bg-slate-50'
                          : 'border-white/10 text-slate-500 bg-white/[0.02]'
                      }`}
                    >
                      No contact inquiries received yet.
                    </div>
                  )}
                </div>
              </GlassCard>

              {/* Latest Audit Activities */}
              <GlassCard className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h3
                      className={`text-sm font-bold font-mono uppercase tracking-wider ${
                        adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      Latest Audit Activities
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('audit')}
                    className={`text-[11px] font-mono hover:underline ${
                      adminTheme === 'light' ? 'text-blue-700 font-bold' : 'text-blue-400'
                    }`}
                  >
                    View Full Trail ({auditLogs.length}) →
                  </button>
                </div>

                <div className="space-y-2.5 max-h-[290px] overflow-y-auto pr-1">
                  {auditLogs.slice(0, 5).map((log) => (
                    <div
                      key={log.id}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
                        adminTheme === 'light'
                          ? 'bg-white border-slate-200 shadow-sm'
                          : 'bg-white/5 border-white/5'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono font-bold text-[11px] ${
                              adminTheme === 'light' ? 'text-blue-700' : 'text-blue-400'
                            }`}
                          >
                            {log.action}
                          </span>
                          <span
                            className={`text-[10px] font-mono ${
                              adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                            }`}
                          >
                            by {log.adminUsername || 'admin'}
                          </span>
                        </div>
                        <div
                          className={`truncate text-xs ${
                            adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                          }`}
                        >
                          {log.details}
                        </div>
                      </div>
                      <span
                        className={`text-[10px] font-mono whitespace-nowrap flex-shrink-0 ${
                          adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                        }`}
                      >
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  ))}

                  {auditLogs.length === 0 && (
                    <div
                      className={`p-6 text-center text-xs font-mono rounded-xl border border-dashed ${
                        adminTheme === 'light'
                          ? 'border-slate-300 text-slate-500 bg-slate-50'
                          : 'border-white/10 text-slate-500 bg-white/[0.02]'
                      }`}
                    >
                      No recent audit logs found.
                    </div>
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Project Showcase Management
                </h2>
                <p className={`text-xs mt-0.5 ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Manage portfolio flagship projects, live demos, repositories, tech architectures, and ordering.
                </p>
              </div>
              <FuturisticButton
                variant="primary"
                size="sm"
                onClick={() =>
                  setEditingProject({
                    title: '',
                    summary: '',
                    category: 'FULLSTACK',
                    status: 'PUBLISHED',
                    isFeatured: false,
                    displayOrder: projects.length + 1,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Project
              </FuturisticButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {projects.map((proj) => (
                <GlassCard
                  key={proj.id}
                  className={`admin-card p-5 flex flex-col justify-between space-y-4 text-left border ${
                    adminTheme === 'light' ? 'border-slate-200 shadow-sm' : 'border-white/10'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <NeonBadge
                        variant={
                          (proj.category || '').includes('SECURITY') || (proj.category || '').includes('CYBER')
                            ? 'green'
                            : (proj.category || '').includes('DATA')
                            ? 'amber'
                            : (proj.category || '').includes('CLOUD') || (proj.category || '').includes('BACK')
                            ? 'cyan'
                            : (proj.category || '').includes('AI') || (proj.category || '').includes('ML') || (proj.category || '').includes('DATABASE')
                            ? 'purple'
                            : 'blue'
                        }
                        size="sm"
                      >
                        {proj.category}
                      </NeonBadge>
                      <div className="flex items-center gap-1.5">
                        {proj.isFeatured && <NeonBadge variant="amber" size="sm">Featured</NeonBadge>}
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                            proj.status === 'PUBLISHED'
                              ? adminTheme === 'light'
                                ? 'bg-emerald-100 border-emerald-300 text-emerald-800 font-bold'
                                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                              : adminTheme === 'light'
                              ? 'bg-amber-100 border-amber-300 text-amber-800 font-bold'
                              : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          }`}
                        >
                          {proj.status}
                        </span>
                      </div>
                    </div>

                    <h3 className={`text-base font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {proj.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                      {proj.summary}
                    </p>
                    <div className={`text-[11px] font-mono ${adminTheme === 'light' ? 'text-slate-500 font-bold' : 'text-slate-500'}`}>
                      Order: {proj.displayOrder}
                    </div>
                  </div>

                  <div className={`pt-3 border-t flex items-center justify-between ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditingProject(proj)}
                        className={`p-1.5 rounded-lg transition-colors border ${
                          adminTheme === 'light'
                            ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 shadow-sm'
                            : 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border-blue-500/20'
                        }`}
                        title="Edit Project"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className={`p-1.5 rounded-lg transition-colors border ${
                          adminTheme === 'light'
                            ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200 shadow-sm'
                            : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/20'
                        }`}
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={`text-xs font-mono hover:underline flex items-center gap-1 ${
                          adminTheme === 'light' ? 'text-cyan-700 font-bold' : 'text-cyan-400'
                        }`}
                      >
                        Repo <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>

            {editingProject && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                <GlassCard className={`admin-modal-card w-full max-w-2xl p-6 sm:p-7 space-y-4 max-h-[90vh] overflow-y-auto ${
                  adminTheme === 'light' ? 'bg-white border-slate-200 text-slate-900 shadow-2xl' : 'bg-[#0a0f1d] border-white/10 text-white'
                }`}>
                  <div className={`flex items-center justify-between pb-3 border-b ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}>
                    <div>
                      <h3 className={`text-lg font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {editingProject.id ? 'Edit Project' : 'Create New Project'}
                      </h3>
                      <p className={`text-xs ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        Configure project title, category, description, and repository links.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingProject(null)}
                      className={`text-xs font-mono px-3 py-1 rounded-full transition-all ${
                        adminTheme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                          : 'text-slate-400 hover:text-white bg-white/10'
                      }`}
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveProject} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Title *
                        </label>
                        <input
                          type="text"
                          required
                          value={editingProject.title || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs transition-all border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Category
                        </label>
                        <select
                          value={
                            [
                              'FULLSTACK',
                              'BACKEND',
                              'FRONTEND',
                              'AI_ML',
                              'DATA_ANALYSIS',
                              'DATABASE',
                              'CYBER_SECURITY',
                              'CLOUD_DEVOPS',
                            ].includes(editingProject.category || '')
                              ? editingProject.category
                              : 'CUSTOM'
                          }
                          onChange={(e) => {
                            if (e.target.value === 'CUSTOM') {
                              setEditingProject({ ...editingProject, category: '' });
                            } else {
                              setEditingProject({ ...editingProject, category: e.target.value });
                            }
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                              : 'bg-[#121824] border-white/10 text-white'
                          }`}
                        >
                          <option value="FULLSTACK">FULLSTACK</option>
                          <option value="BACKEND">BACKEND</option>
                          <option value="FRONTEND">FRONTEND</option>
                          <option value="AI_ML">AI / ML</option>
                          <option value="DATA_ANALYSIS">DATA ANALYSIS</option>
                          <option value="DATABASE">DATABASE</option>
                          <option value="CYBER_SECURITY">CYBER SECURITY</option>
                          <option value="CLOUD_DEVOPS">CLOUD & DEVOPS</option>
                          <option value="CUSTOM">Custom Domain / Category...</option>
                        </select>
                        {![
                          'FULLSTACK',
                          'BACKEND',
                          'FRONTEND',
                          'AI_ML',
                          'DATA_ANALYSIS',
                          'DATABASE',
                          'CYBER_SECURITY',
                          'CLOUD_DEVOPS',
                        ].includes(editingProject.category || '') && (
                          <input
                            type="text"
                            required
                            placeholder="Type custom category (e.g. CYBER FORENSICS, MOBILE APP)"
                            value={editingProject.category || ''}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                category: e.target.value.toUpperCase(),
                              })
                            }
                            className={`w-full mt-2 px-3 py-1.5 rounded-lg text-xs font-mono border ${
                              adminTheme === 'light'
                                ? 'bg-cyan-50 border-cyan-300 text-cyan-900 font-bold'
                                : 'bg-white/5 border-cyan-500/40 text-cyan-300'
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Tag / Period Badge
                        </label>
                        <input
                          type="text"
                          value={editingProject.tag || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, tag: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                          placeholder="e.g. 2026"
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Slug (URL friendly)
                        </label>
                        <input
                          type="text"
                          value={editingProject.slug || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                          placeholder="e.g. resumeiq"
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Summary (1-2 sentences) *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={editingProject.summary || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, summary: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white'
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Full Markdown Details
                        </label>
                        <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-cyan-700 font-semibold' : 'text-cyan-400'}`}>
                          Supports ### Titles, #### Subheadings & - **Feature**: Details
                        </span>
                      </div>
                      <textarea
                        rows={5}
                        value={editingProject.descriptionMarkdown || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, descriptionMarkdown: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs font-mono border outline-none ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white'
                        }`}
                        placeholder="### Architecture Overview&#10;System summary...&#10;&#10;#### Core Architectural Capabilities&#10;- **Feature 1**: Description&#10;- **Feature 2**: Description"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          GitHub URL
                        </label>
                        <input
                          type="url"
                          value={editingProject.githubUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Live Demo URL
                        </label>
                        <input
                          type="url"
                          value={editingProject.liveUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={editingProject.displayOrder ?? 0}
                          onChange={(e) => setEditingProject({ ...editingProject, displayOrder: parseInt(e.target.value) || 0 })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                        />
                      </div>

                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Lifecycle Status
                        </label>
                        <select
                          value={editingProject.status || 'PUBLISHED'}
                          onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as ContentStatus })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                              : 'bg-[#121824] border-white/10 text-white'
                          }`}
                        >
                          <option value="DRAFT">DRAFT</option>
                          <option value="PUBLISHED">PUBLISHED</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </div>

                      <div className="flex items-center gap-2 pt-5">
                        <input
                          type="checkbox"
                          id="isFeatured"
                          checked={editingProject.isFeatured || false}
                          onChange={(e) => setEditingProject({ ...editingProject, isFeatured: e.target.checked })}
                          className="rounded bg-white/10 border-white/20 text-blue-500 focus:ring-0"
                        />
                        <label htmlFor="isFeatured" className={`text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Featured on Home
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Upload Project Banner / Image
                      </label>
                      <div className="flex items-center gap-3">
                        <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all border ${
                          adminTheme === 'light'
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 shadow-sm'
                            : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'
                        }`}>
                          <Upload className="w-3.5 h-3.5 text-blue-500" />
                          <span>{uploading ? 'Uploading...' : 'Choose File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(e, 'bannerUrl')}
                            className="hidden"
                            disabled={uploading}
                          />
                        </label>
                        {editingProject.bannerUrl && (
                          <span className="text-[11px] font-mono text-emerald-600 font-semibold truncate max-w-xs">
                            {editingProject.bannerUrl}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={`pt-4 border-t flex justify-end gap-3 ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <button
                        type="button"
                        onClick={() => setEditingProject(null)}
                        className={`px-4 py-2 rounded-lg text-xs font-mono transition-all border ${
                          adminTheme === 'light'
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-semibold'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
                        }`}
                      >
                        Cancel
                      </button>
                      <FuturisticButton type="submit" variant="primary" size="sm">
                        Save Project
                      </FuturisticButton>
                    </div>
                  </form>
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Skills Matrix Management
                </h2>
                <p className={`text-xs mt-0.5 ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Manage technical capabilities, categories, proficiency ratings, and constellation icon keys.
                </p>
              </div>
              <FuturisticButton
                variant="primary"
                size="sm"
                onClick={() =>
                  setEditingSkill({
                    name: '',
                    category: 'BACKEND',
                    proficiencyLevel: 'ADVANCED',
                    status: 'PUBLISHED',
                    displayOrder: skills.length + 1,
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Skill
              </FuturisticButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {skills.map((skill) => (
                <GlassCard
                  key={skill.id}
                  className={`admin-card p-4 flex flex-col justify-between space-y-3 text-left border ${
                    adminTheme === 'light' ? 'border-slate-200 shadow-sm' : 'border-white/10'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <NeonBadge variant="cyan" size="sm">
                        {skill.category}
                      </NeonBadge>
                      <span className={`text-[10px] font-mono font-bold ${
                        adminTheme === 'light' ? 'text-purple-700' : 'text-purple-400'
                      }`}>
                        {skill.proficiencyLevel}
                      </span>
                    </div>
                    <h4 className={`text-sm font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                      {skill.name}
                    </h4>
                    {skill.description && (
                      <p className={`text-xs line-clamp-2 ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        {skill.description}
                      </p>
                    )}
                  </div>

                  <div className={`pt-2 border-t flex items-center justify-between text-xs ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}>
                    <span className={`font-mono text-[11px] ${adminTheme === 'light' ? 'text-slate-500 font-bold' : 'text-slate-500'}`}>
                      Order: {skill.displayOrder}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setEditingSkill(skill)}
                        className={`p-1.5 rounded-lg transition-colors border ${
                          adminTheme === 'light'
                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-sm'
                            : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-transparent'
                        }`}
                        title="Edit Skill"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        className={`p-1.5 rounded-lg transition-colors border ${
                          adminTheme === 'light'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200 shadow-sm'
                            : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-transparent'
                        }`}
                        title="Delete Skill"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>

            {editingSkill && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                <GlassCard className={`admin-modal-card w-full max-w-md p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
                  adminTheme === 'light' ? 'bg-white border-slate-200 text-slate-900 shadow-2xl' : 'bg-[#0a0f1d] border-white/10 text-white'
                }`}>
                  <div className={`flex items-center justify-between pb-3 border-b ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}>
                    <div>
                      <h3 className={`text-base font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {editingSkill.id ? 'Edit Skill' : 'Create New Skill'}
                      </h3>
                      <p className={`text-xs ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        Configure skill details, proficiency, and 3D constellation icon.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingSkill(null)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-full transition-all ${
                        adminTheme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                          : 'text-slate-400 hover:text-white bg-white/10'
                      }`}
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveSkill} className="space-y-4 text-left">
                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={editingSkill.name || ''}
                        onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Domain / Category *
                      </label>
                      <div className="space-y-2">
                        <select
                          value={
                            [
                              'BACKEND',
                              'FRONTEND',
                              'DATABASE',
                              'TOOLS',
                              'CORE',
                              'AI / ML',
                              'CYBER SECURITY',
                              'DATA SCIENCE',
                              'CLOUD / DEVOPS',
                            ].includes(editingSkill.category || '')
                              ? editingSkill.category
                              : 'CUSTOM'
                          }
                          onChange={(e) => {
                            if (e.target.value === 'CUSTOM') {
                              setEditingSkill({ ...editingSkill, category: '' });
                            } else {
                              setEditingSkill({ ...editingSkill, category: e.target.value });
                            }
                          }}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                              : 'bg-[#121824] border-white/10 text-white'
                          }`}
                        >
                          <option value="BACKEND">BACKEND</option>
                          <option value="FRONTEND">FRONTEND</option>
                          <option value="DATABASE">DATABASE</option>
                          <option value="TOOLS">TOOLS</option>
                          <option value="CORE">CORE</option>
                          <option value="AI / ML">AI / ML (Machine Learning / Deep Learning)</option>
                          <option value="CYBER SECURITY">CYBER SECURITY (Security / Forensics)</option>
                          <option value="DATA SCIENCE">DATA SCIENCE</option>
                          <option value="CLOUD / DEVOPS">CLOUD / DEVOPS</option>
                          <option value="CUSTOM">+ Custom Domain (Type below)...</option>
                        </select>

                        {(![
                          'BACKEND',
                          'FRONTEND',
                          'DATABASE',
                          'TOOLS',
                          'CORE',
                          'AI / ML',
                          'CYBER SECURITY',
                          'DATA SCIENCE',
                          'CLOUD / DEVOPS',
                        ].includes(editingSkill.category || '') ||
                          editingSkill.category === '') && (
                          <input
                            type="text"
                            placeholder="Type custom domain (e.g. CYBER FORENSICS, BLOCKCHAIN)..."
                            value={editingSkill.category || ''}
                            onChange={(e) =>
                              setEditingSkill({
                                ...editingSkill,
                                category: e.target.value.toUpperCase(),
                              })
                            }
                            className={`w-full px-3 py-2 rounded-lg text-xs font-mono border outline-none ${
                              adminTheme === 'light'
                                ? 'bg-cyan-50 border-cyan-300 text-cyan-900 font-bold'
                                : 'bg-cyan-950/20 border-cyan-500/30 text-cyan-300'
                            }`}
                          />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Proficiency
                        </label>
                        <select
                          value={editingSkill.proficiencyLevel || 'ADVANCED'}
                          onChange={(e) => setEditingSkill({ ...editingSkill, proficiencyLevel: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                              : 'bg-[#121824] border-white/10 text-white'
                          }`}
                        >
                          <option value="BEGINNER">BEGINNER (20-40%)</option>
                          <option value="LEARNING">LEARNING (40-60%)</option>
                          <option value="INTERMEDIATE">INTERMEDIATE (60-75%)</option>
                          <option value="ADVANCED">ADVANCED (75-90%)</option>
                          <option value="STRONG">STRONG / EXPERT (90-100%)</option>
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className={`text-xs font-mono ${
                            adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                          }`}>
                            Icon Key
                          </label>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-500">Live:</span>
                            <div className={`w-5 h-5 flex items-center justify-center rounded border ${
                              adminTheme === 'light' ? 'bg-slate-100 border-slate-300' : 'bg-slate-950 border-white/10'
                            }`}>
                              <TechLogo
                                name={editingSkill.name || ''}
                                iconKey={editingSkill.iconKey}
                                className="w-3.5 h-3.5"
                              />
                            </div>
                          </div>
                        </div>
                        <input
                          type="text"
                          placeholder="e.g. brain, shield, terminal..."
                          value={editingSkill.iconKey || ''}
                          onChange={(e) => setEditingSkill({ ...editingSkill, iconKey: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1 text-[10px] font-mono">
                      <span className={`mr-1 ${adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-500'}`}>Quick Icons:</span>
                      {[
                        { key: 'brain', label: 'AI/Brain' },
                        { key: 'shield', label: 'Security' },
                        { key: 'terminal', label: 'Terminal' },
                        { key: 'database', label: 'Database' },
                        { key: 'code', label: 'Code' },
                        { key: 'python', label: 'Python' },
                        { key: 'docker', label: 'Docker' },
                      ].map((item) => (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => setEditingSkill({ ...editingSkill, iconKey: item.key })}
                          className={`px-1.5 py-0.5 rounded border transition-colors ${
                            editingSkill.iconKey === item.key
                              ? adminTheme === 'light'
                                ? 'bg-cyan-100 text-cyan-900 border-cyan-400 font-bold shadow-sm'
                                : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                              : adminTheme === 'light'
                              ? 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                              : 'bg-white/5 text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Architecture Role / Description
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Describe architectural role, key concepts, or projects where this technology is used..."
                        value={editingSkill.description || ''}
                        onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none resize-none ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={editingSkill.displayOrder ?? 0}
                          onChange={(e) => setEditingSkill({ ...editingSkill, displayOrder: parseInt(e.target.value) || 0 })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Status
                        </label>
                        <select
                          value={editingSkill.status || 'PUBLISHED'}
                          onChange={(e) => setEditingSkill({ ...editingSkill, status: e.target.value as ContentStatus })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                              : 'bg-[#121824] border-white/10 text-white'
                          }`}
                        >
                          <option value="PUBLISHED">PUBLISHED</option>
                          <option value="DRAFT">DRAFT</option>
                        </select>
                      </div>
                    </div>

                    <div className={`pt-3 border-t flex justify-end gap-2 ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <button
                        type="button"
                        onClick={() => setEditingSkill(null)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all border ${
                          adminTheme === 'light'
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-semibold'
                            : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
                        }`}
                      >
                        Cancel
                      </button>
                      <FuturisticButton type="submit" variant="primary" size="sm">
                        Save Skill
                      </FuturisticButton>
                    </div>
                  </form>
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {activeTab === "experience" && (
          <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Experience Timeline Management
                </h2>
                <p className={`text-xs mt-0.5 ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Manage internships, employment type, assigned project folders, and attached certificates.
                </p>
              </div>
              <FuturisticButton
                variant="primary"
                size="sm"
                onClick={() =>
                  setEditingExperience({
                    organization: "",
                    role: "",
                    duration: "",
                    employmentType: "Fully Remote",
                    assignedProjectName: "",
                    assignedProjectSlug: "",
                    technologies: "",
                    certificatesJson: "[]",
                    descriptionMarkdown: "",
                    isCurrent: false,
                    displayOrder: experiences.length + 1,
                    status: "PUBLISHED",
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Experience
              </FuturisticButton>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => {
                let certCount = 0;
                try {
                  if (exp.certificatesJson) {
                    const parsed = JSON.parse(exp.certificatesJson);
                    if (Array.isArray(parsed)) certCount = parsed.length;
                  }
                } catch {
                  certCount = 0;
                }

                return (
                  <GlassCard key={exp.id} className="p-5 flex items-start justify-between gap-4 text-left">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-base font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                          {exp.role}
                        </h3>
                        <span className={`text-sm font-semibold ${adminTheme === 'light' ? 'text-cyan-700 font-bold' : 'text-cyan-400'}`}>
                          @{exp.organization}
                        </span>
                        {exp.employmentType && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                            adminTheme === 'light'
                              ? 'border-cyan-200 bg-cyan-50 text-cyan-800 font-medium shadow-sm'
                              : 'border-cyan-500/30 bg-cyan-950/40 text-cyan-300'
                          }`}>
                            {exp.employmentType}
                          </span>
                        )}
                        {exp.isCurrent ? (
                          <NeonBadge variant="green" size="sm">Currently Working</NeonBadge>
                        ) : (
                          <NeonBadge variant="blue" size="sm">Completed</NeonBadge>
                        )}
                        {exp.assignedProjectName && (
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border flex items-center gap-1 ${
                            adminTheme === 'light'
                              ? 'border-amber-200 bg-amber-50 text-amber-800 font-medium shadow-sm'
                              : 'border-amber-500/30 bg-amber-950/30 text-amber-300'
                          }`}>
                            📁 {exp.assignedProjectName}
                          </span>
                        )}
                        {certCount > 0 && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono border ${
                            adminTheme === 'light'
                              ? 'bg-purple-50 border-purple-200 text-purple-800 font-medium shadow-sm'
                              : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
                          }`}>
                            📜 {certCount} Document{certCount > 1 ? "s" : ""} Attached
                          </span>
                        )}
                      </div>

                      <div className={`text-xs font-mono flex items-center gap-2 ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        <Clock className={`w-3.5 h-3.5 ${adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'}`} />
                        <span>{exp.duration}</span>
                        {exp.location && <span>• {exp.location}</span>}
                      </div>

                      {exp.technologies && (
                        <div className={`text-[11px] font-mono ${adminTheme === 'light' ? 'text-cyan-800 font-medium' : 'text-cyan-300/80'}`}>
                          <span className={`font-bold ${adminTheme === 'light' ? 'text-slate-700' : 'text-slate-400'}`}>Tech:</span> {exp.technologies}
                        </div>
                      )}

                      <p className={`text-xs whitespace-pre-line pt-1 line-clamp-3 leading-relaxed ${
                        adminTheme === 'light' ? 'text-slate-700' : 'text-slate-300'
                      }`}>
                        {exp.descriptionMarkdown}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => setEditingExperience(exp)}
                        className={`p-2 rounded-lg transition-colors ${
                          adminTheme === 'light'
                            ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200'
                            : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20'
                        }`}
                        title="Edit Experience"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteExperience(exp.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          adminTheme === 'light'
                            ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                            : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20'
                        }`}
                        title="Delete Experience"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {editingExperience && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                <GlassCard className={`w-full max-w-3xl p-6 sm:p-7 space-y-5 my-8 max-h-[90vh] overflow-y-auto admin-modal-card ${
                  adminTheme === 'light' ? 'bg-white border-slate-200 text-slate-900 shadow-2xl' : 'bg-[#0a0f1d] border-white/10 text-white'
                }`}>
                  <div className={`flex items-center justify-between pb-3 border-b ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}>
                    <div>
                      <h3 className={`text-lg font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {editingExperience.id ? "Edit Experience & Certificates" : "New Experience Entry"}
                      </h3>
                      <p className={`text-xs ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        Configure internship details, project links, and upload official certificates.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingExperience(null)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                        adminTheme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                          : 'bg-white/10 hover:bg-white/20 text-slate-300'
                      }`}
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveExperience} className="space-y-4 text-left">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. ElevanceSkill, Cruvels, Google AI-ML"
                          value={editingExperience.organization || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, organization: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs outline-none transition-all border ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>
                          Internship / Role Title *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. AI Engineering Intern, Full-Stack Web Development Intern"
                          value={editingExperience.role || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, role: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs outline-none transition-all border ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>
                          Employment Type
                        </label>
                        <select
                          value={editingExperience.employmentType || "Fully Remote"}
                          onChange={(e) => setEditingExperience({ ...editingExperience, employmentType: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs outline-none transition-all border ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm [&>option]:bg-white [&>option]:text-slate-900'
                              : 'bg-[#121824] border-white/10 text-white [&>option]:bg-[#121824] [&>option]:text-white'
                          }`}
                        >
                          <option value="Fully Remote">Fully Remote</option>
                          <option value="Virtual Internship">Virtual Internship</option>
                          <option value="Full Time">Full Time</option>
                          <option value="Hybrid">Hybrid</option>
                          <option value="Part Time">Part Time</option>
                          <option value="Contract">Contract</option>
                        </select>
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>
                          Duration *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. August 2026 – November 2026"
                          value={editingExperience.duration || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, duration: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs outline-none transition-all border ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>
                          Location
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. Remote, India"
                          value={editingExperience.location || ""}
                          onChange={(e) => setEditingExperience({ ...editingExperience, location: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs outline-none transition-all border ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <input
                        type="checkbox"
                        id="isCurrentExp"
                        checked={editingExperience.isCurrent || false}
                        onChange={(e) => setEditingExperience({ ...editingExperience, isCurrent: e.target.checked })}
                        className="rounded bg-white/10 border-white/20 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                      />
                      <label htmlFor="isCurrentExp" className={`text-xs font-mono cursor-pointer ${adminTheme === 'light' ? 'text-slate-800 font-medium' : 'text-slate-300'}`}>
                        Currently Working / Ongoing Role (Displays "Currently Working" badge & "Started – Present")
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>
                          Display Order (Sort Index)
                        </label>
                        <input
                          type="number"
                          value={editingExperience.displayOrder ?? 0}
                          onChange={(e) => setEditingExperience({ ...editingExperience, displayOrder: parseInt(e.target.value, 10) || 0 })}
                          className={`w-full px-3 py-2 rounded-lg text-xs font-mono outline-none border ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>
                          Visibility Status
                        </label>
                        <select
                          value={editingExperience.status || "PUBLISHED"}
                          onChange={(e) => setEditingExperience({ ...editingExperience, status: e.target.value as ContentStatus })}
                          className={`w-full px-3 py-2 rounded-lg text-xs outline-none transition-all border ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm [&>option]:bg-white [&>option]:text-slate-900'
                              : 'bg-[#121824] border-white/10 text-white [&>option]:bg-[#121824] [&>option]:text-white'
                          }`}
                        >
                          <option value="PUBLISHED">PUBLISHED (Visible on Portfolio)</option>
                          <option value="DRAFT">DRAFT (Hidden from Public)</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </div>
                    </div>

                    <div className={`p-3.5 rounded-xl border space-y-2 ${
                      adminTheme === 'light'
                        ? 'bg-amber-50/60 border-amber-200 text-slate-800 shadow-sm'
                        : 'border-white/10 bg-white/[0.02]'
                    }`}>
                      <label className={`block text-xs font-mono font-bold ${adminTheme === 'light' ? 'text-amber-800' : 'text-amber-400'}`}>
                        📁 Assigned Project Folder (Optional)
                      </label>
                      <p className={`text-[11px] ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        Select a project from your showcase to display the folder banner that users can click to view.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className={`block text-[10px] font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                            Select from Projects
                          </label>
                          <select
                            value={editingExperience.assignedProjectSlug || ""}
                            onChange={(e) => {
                              const slug = e.target.value;
                              const matched = projects.find((p) => p.slug === slug);
                              setEditingExperience({
                                ...editingExperience,
                                assignedProjectSlug: slug,
                                assignedProjectName: matched ? matched.title : "",
                              });
                            }}
                            className={`w-full px-3 py-2 rounded-lg text-xs outline-none border ${
                              adminTheme === 'light'
                                ? 'bg-white border-slate-300 text-slate-900 shadow-sm [&>option]:bg-white [&>option]:text-slate-900'
                                : 'bg-[#121824] border-white/10 text-white [&>option]:bg-[#121824] [&>option]:text-white'
                            }`}
                          >
                            <option value="">-- None (No Linked Project) --</option>
                            {projects.map((p) => (
                              <option key={p.id} value={p.slug}>
                                {p.title}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className={`block text-[10px] font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                            Or Custom Project Title
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. AI Engineering & Intelligent Technology"
                            value={editingExperience.assignedProjectName || ""}
                            onChange={(e) =>
                              setEditingExperience({
                                ...editingExperience,
                                assignedProjectName: e.target.value,
                              })
                            }
                            className={`w-full px-3 py-2 rounded-lg text-xs outline-none border ${
                              adminTheme === 'light'
                                ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm'
                                : 'bg-white/5 border-white/10 text-white'
                            }`}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <label className={`block text-xs font-mono font-bold ${adminTheme === 'light' ? 'text-slate-800' : 'text-slate-300'}`}>
                          Key Responsibilities (5 to 6 lines) *
                        </label>
                        <span className={`text-[10px] font-mono font-semibold ${adminTheme === 'light' ? 'text-amber-700' : 'text-amber-400'}`}>
                          ⚡ Each line renders with a glowing lightning bolt
                        </span>
                      </div>
                      <textarea
                        rows={6}
                        required
                        placeholder="Joined as an AI Engineering Intern for a three-month fully remote internship.&#10;Gaining practical exposure to artificial intelligence, machine learning, generative AI, and automation.&#10;Working on assigned technical tasks, experimentation, testing, and documentation.&#10;Participating in technical discussions, reviews, and collaborative engineering activities.&#10;Applying engineering concepts while following company security and documentation practices.&#10;Maintaining accurate records of progress and completing deliverables within agreed timelines."
                        value={editingExperience.descriptionMarkdown || ""}
                        onChange={(e) =>
                          setEditingExperience({ ...editingExperience, descriptionMarkdown: e.target.value })
                        }
                        className={`w-full px-3 py-2 rounded-lg text-xs font-sans leading-relaxed outline-none border ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'}`}>
                        Skills & Technologies Used (Comma Separated)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. AI Engineering, Machine Learning, Python, Backend/API Development, Scikit-Learn"
                        value={editingExperience.technologies || ""}
                        onChange={(e) =>
                          setEditingExperience({ ...editingExperience, technologies: e.target.value })
                        }
                        className={`w-full px-3 py-2 rounded-lg text-xs font-mono outline-none border ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-cyan-800 placeholder:text-slate-400 focus:border-blue-500 shadow-sm font-semibold'
                            : 'bg-white/5 border-white/10 text-cyan-300'
                        }`}
                      />
                    </div>

                    <div className={`p-4 rounded-2xl border space-y-4 ${
                      adminTheme === 'light'
                        ? 'border-purple-200 bg-purple-50/50 shadow-sm'
                        : 'border-purple-500/30 bg-purple-950/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className={`w-4 h-4 ${adminTheme === 'light' ? 'text-purple-600' : 'text-purple-400'}`} />
                          <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${
                            adminTheme === 'light' ? 'text-purple-950' : 'text-white'
                          }`}>
                            Attached Official Certificates & Documents
                          </h4>
                        </div>
                        <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-purple-700 font-medium' : 'text-purple-300'}`}>
                          Upload multiple certificates with custom names
                        </span>
                      </div>

                      {(() => {
                        let certList: ExperienceCertificate[] = [];
                        try {
                          if (editingExperience.certificatesJson) {
                            certList = JSON.parse(editingExperience.certificatesJson);
                          }
                        } catch {
                          certList = [];
                        }

                        if (!certList || certList.length === 0) {
                          return (
                            <div className={`p-3 rounded-xl border text-xs font-mono text-center ${
                              adminTheme === 'light'
                                ? 'border-slate-200 bg-white/80 text-slate-500 shadow-sm'
                                : 'border-white/5 bg-white/[0.02] text-slate-400'
                            }`}>
                              No certificates attached yet. Upload certificates below.
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-2">
                            {certList.map((c, cIdx) => (
                              <div
                                key={cIdx}
                                className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs ${
                                  adminTheme === 'light'
                                    ? 'border-slate-200 bg-white shadow-sm text-slate-800'
                                    : 'border-white/10 bg-white/5 text-white'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
                                    adminTheme === 'light'
                                      ? 'bg-purple-100 text-purple-900 border-purple-200 font-semibold'
                                      : 'bg-purple-900/60 text-purple-300 border-purple-500/30'
                                  }`}>
                                    {c.type || "CERT"}
                                  </span>
                                  <span className={`font-bold truncate ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                                    {c.title}
                                  </span>
                                  <span className={`text-[11px] font-mono truncate hidden sm:inline ${adminTheme === 'light' ? 'text-slate-500' : 'text-slate-400'}`}>
                                    ({c.fileUrl})
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <a
                                    href={resolveAssetUrl(c.fileUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1 transition-colors cursor-pointer ${
                                      adminTheme === 'light' ? 'text-blue-600 hover:text-blue-800' : 'text-cyan-400 hover:text-cyan-300'
                                    }`}
                                    title="Preview"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveCertFromExperience(cIdx)}
                                    className="p-1 text-rose-500 hover:text-rose-600"
                                    title="Remove"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      <div className={`pt-3 border-t space-y-3 ${adminTheme === 'light' ? 'border-purple-200' : 'border-purple-500/20'}`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-mono font-semibold ${adminTheme === 'light' ? 'text-slate-800' : 'text-slate-300'}`}>
                            Add & Upload New Certificate
                          </span>
                          <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-purple-700' : 'text-cyan-400'}`}>
                            PDF documents & Images (.png, .jpg, .webp) up to 10MB
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-[10px] font-mono mr-1 ${adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                            Quick Presets:
                          </span>
                          {[
                            { label: "Completion Certificate", type: "CERTIFICATE" },
                            { label: "Experience Letter", type: "LETTER" },
                            { label: "LOR (Recommendation)", type: "LOR" },
                            { label: "Offer Letter", type: "OFFER_LETTER" },
                            { label: "NDA Document", type: "NDA" },
                            { label: "Cybersecurity Certificate", type: "CERTIFICATE" },
                            { label: "Network Security Certificate", type: "CERTIFICATE" },
                          ].map((preset) => (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => {
                                setExpCertTitle(preset.label);
                                setExpCertType(preset.type);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors cursor-pointer ${
                                adminTheme === 'light'
                                  ? 'bg-white hover:bg-purple-100 text-purple-900 border-purple-200 shadow-sm'
                                  : 'bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border-purple-500/30'
                              }`}
                            >
                              + {preset.label}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-[10px] font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                              Certificate / Document Title *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Completion Certificate, Offer Letter, NDA, LOR"
                              value={expCertTitle}
                              onChange={(e) => setExpCertTitle(e.target.value)}
                              className={`w-full px-3 py-1.5 rounded-lg text-xs font-sans outline-none border ${
                                adminTheme === 'light'
                                  ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm'
                                  : 'bg-white/5 border-white/10 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-[10px] font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                              Document Type
                            </label>
                            <select
                              value={expCertType}
                              onChange={(e) => setExpCertType(e.target.value)}
                              className={`w-full px-3 py-1.5 rounded-lg text-xs outline-none border ${
                                adminTheme === 'light'
                                  ? 'bg-white border-slate-300 text-slate-900 shadow-sm [&>option]:bg-white [&>option]:text-slate-900'
                                  : 'bg-[#121824] border-white/10 text-white [&>option]:bg-[#121824] [&>option]:text-white'
                              }`}
                            >
                              <option value="CERTIFICATE">Certificate</option>
                              <option value="OFFER_LETTER">Offer Letter</option>
                              <option value="NDA">NDA</option>
                              <option value="LETTER">Experience Letter</option>
                              <option value="LOR">Letter of Recommendation (LOR)</option>
                              <option value="OTHER">Other Credential</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                          <div className="sm:col-span-2">
                            <label className={`block text-[10px] font-mono mb-1 ${adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'}`}>
                              Upload File (.pdf, .png, .jpg) or Paste Direct URL
                            </label>
                            <div className="flex items-center gap-2">
                              <label className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border shadow-sm ${
                                adminTheme === 'light'
                                  ? 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-900'
                                  : 'bg-indigo-600/30 hover:bg-indigo-600/50 border-indigo-400/40 text-indigo-200'
                              }`}>
                                <Upload className="w-3.5 h-3.5 text-indigo-500" />
                                <span>{uploadingExpCert ? "Uploading..." : "Upload File"}</span>
                                <input
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={handleUploadExpCert}
                                  className="hidden"
                                  disabled={uploadingExpCert}
                                />
                              </label>

                              <input
                                type="text"
                                placeholder="/uploads/... or /assets/certificates/..."
                                value={expCertUrl}
                                onChange={(e) => setExpCertUrl(e.target.value)}
                                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-mono outline-none border ${
                                  adminTheme === 'light'
                                    ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm'
                                    : 'bg-white/5 border-white/10 text-white'
                                }`}
                              />
                            </div>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={handleAddCertToExperience}
                              className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-mono font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>+ Attach Certificate</span>
                            </button>
                          </div>
                        </div>

                        {expCertUrl && (
                          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono ${
                            adminTheme === 'light'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-sm'
                              : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                          }`}>
                            <div className="flex items-center gap-2 truncate">
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span className="truncate">Ready to attach: <strong className={adminTheme === 'light' ? 'text-emerald-950' : 'text-white'}>{expCertTitle || "Certificate"}</strong> ({expCertUrl})</span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <a
                                href={resolveAssetUrl(expCertUrl)}
                                target="_blank"
                                rel="noreferrer"
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 ${
                                  adminTheme === 'light'
                                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200'
                                }`}
                              >
                                Document Overview ↗
                              </a>
                              <button
                                type="button"
                                onClick={handleAddCertToExperience}
                                className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] shadow transition-colors cursor-pointer"
                              >
                                Attach Now ✓
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`pt-4 border-t flex items-center justify-between ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <span className={`text-[11px] font-mono ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        Changes will instantly reflect on your live portfolio
                      </span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingExperience(null)}
                          className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors ${
                            adminTheme === 'light'
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300'
                          }`}
                        >
                          Cancel
                        </button>
                        <FuturisticButton type="submit" variant="primary" size="sm">
                          <Save className="w-3.5 h-3.5 mr-1.5" /> Save Experience
                        </FuturisticButton>
                      </div>
                    </div>
                  </form>
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {activeTab === 'education' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xl font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                  Education & Academic Credentials
                </h2>
                <p className={`text-xs mt-0.5 ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Manage degrees, high school milestones, CGPAs, coursework, and attach official marksheets/certificates.
                </p>
              </div>
              <FuturisticButton
                variant="primary"
                size="sm"
                onClick={() => {
                  setEditingEducation({
                    institution: '',
                    degree: '',
                    fieldOfStudy: '',
                    duration: '',
                    gradeOrPercentage: '',
                    description: '',
                    displayOrder: educations.length + 1,
                    status: 'PUBLISHED',
                    certificatesJson: '[]',
                  });
                  setEduCertTitle('');
                  setEduCertUrl('');
                }}
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Education
              </FuturisticButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {educations.map((edu) => {
                let certCount = 0;
                try {
                  if (edu.certificatesJson) {
                    const parsed = JSON.parse(edu.certificatesJson);
                    if (Array.isArray(parsed)) certCount = parsed.length;
                  }
                } catch {
                  certCount = 0;
                }

                return (
                  <GlassCard
                    key={edu.id}
                    className={`admin-card p-5 flex flex-col justify-between space-y-4 text-left border ${
                      adminTheme === 'light' ? 'border-slate-200 shadow-sm' : 'border-white/10'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <h3 className={`text-base font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                          {edu.degree}
                        </h3>
                        {edu.gradeOrPercentage && (
                          adminTheme === 'light' ? (
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cyan-50 border border-cyan-300 text-cyan-800 shadow-sm">
                              {edu.gradeOrPercentage}
                            </span>
                          ) : (
                            <NeonBadge variant="cyan" size="sm">
                              {edu.gradeOrPercentage}
                            </NeonBadge>
                          )
                        )}
                      </div>

                      <div className={`text-xs font-semibold ${adminTheme === 'light' ? 'text-cyan-700' : 'text-cyan-400'}`}>
                        {edu.fieldOfStudy}
                      </div>
                      <div className={`text-xs font-mono flex items-center gap-1.5 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        <span>🏛️</span>
                        <span>{edu.institution}</span>
                      </div>
                      <div className={`text-[11px] font-mono flex items-center gap-2 ${
                        adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                      }`}>
                        <Clock className="w-3.5 h-3.5 text-slate-500" />
                        <span>{edu.duration}</span>
                        {edu.status === 'PUBLISHED' ? (
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${
                            adminTheme === 'light'
                              ? 'text-emerald-700 bg-emerald-50 border-emerald-300 font-bold'
                              : 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30'
                          }`}>
                            PUBLISHED
                          </span>
                        ) : (
                          <span className={`text-[10px] px-2 py-0.5 rounded border ${
                            adminTheme === 'light'
                              ? 'text-amber-800 bg-amber-50 border-amber-300 font-bold'
                              : 'text-amber-400 bg-amber-950/40 border-amber-500/30'
                          }`}>
                            DRAFT
                          </span>
                        )}
                      </div>

                      {certCount > 0 && (
                        <div className="pt-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono inline-flex items-center gap-1 border ${
                            adminTheme === 'light'
                              ? 'bg-purple-50 border-purple-200 text-purple-800 font-medium shadow-sm'
                              : 'bg-purple-950/60 border-purple-500/30 text-purple-300'
                          }`}>
                            📜 {certCount} Official Document{certCount > 1 ? 's' : ''} Attached
                          </span>
                        </div>
                      )}

                      {edu.description && (
                        <p className={`text-xs line-clamp-2 pt-1 font-sans ${
                          adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          {edu.description}
                        </p>
                      )}
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-slate-500 font-bold' : 'text-slate-500'}`}>
                        Order: #{edu.displayOrder}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingEducation(edu);
                            setEduCertTitle('');
                            setEduCertUrl('');
                          }}
                          className={`p-1.5 rounded-lg transition-colors border ${
                            adminTheme === 'light'
                              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-sm'
                              : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-transparent'
                          }`}
                          title="Edit Education"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEducation(edu.id)}
                          className={`p-1.5 rounded-lg transition-colors border ${
                            adminTheme === 'light'
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200 shadow-sm'
                              : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-transparent'
                          }`}
                          title="Delete Education"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {editingEducation && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                <GlassCard className={`admin-modal-card w-full max-w-3xl p-6 sm:p-7 space-y-5 my-8 max-h-[90vh] overflow-y-auto ${
                  adminTheme === 'light' ? 'bg-white border-slate-200 text-slate-900 shadow-2xl' : 'bg-[#0a0f1d] border-white/10 text-white'
                }`}>
                  <div className={`flex items-center justify-between pb-3 border-b ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}>
                    <div>
                      <h3 className={`text-lg font-bold flex items-center gap-2 ${
                        adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        <GraduationCap className="w-5 h-5 text-cyan-500" />
                        <span>{editingEducation.id ? 'Edit Education & Marksheets' : 'New Education Entry'}</span>
                      </h3>
                      <p className={`text-xs ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                        Configure academic degree, grade, coursework, and attach marksheets/certificates.
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingEducation(null)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
                        adminTheme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                          : 'bg-white/10 hover:bg-white/20 text-slate-300'
                      }`}
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveEducation} className="space-y-4 text-left">
                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Institution / University / Board *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SRM Institute of Science and Technology, Chennai"
                        value={editingEducation.institution || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, institution: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>Degree / Standard *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Master of Computer Applications (MCA), Class X"
                          value={editingEducation.degree || ''}
                          onChange={(e) => setEditingEducation({ ...editingEducation, degree: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>Field of Study / Stream</label>
                        <input
                          type="text"
                          placeholder="e.g. Computer Science & Applications, Science (PCM)"
                          value={editingEducation.fieldOfStudy || ''}
                          onChange={(e) => setEditingEducation({ ...editingEducation, fieldOfStudy: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>Duration *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2024 – 2026, 2021 – 2024, 2018 – 2019"
                          value={editingEducation.duration || ''}
                          onChange={(e) => setEditingEducation({ ...editingEducation, duration: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>Grade / CGPA / Score</label>
                        <input
                          type="text"
                          placeholder="e.g. CGPA: 9.885 / 10.0, 74.52% First Class, 71%"
                          value={editingEducation.gradeOrPercentage || ''}
                          onChange={(e) =>
                            setEditingEducation({ ...editingEducation, gradeOrPercentage: e.target.value })
                          }
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Key Coursework & Academic Foundations (Comma Separated)
                        </label>
                        <span className={`text-[10px] font-mono ${
                          adminTheme === 'light' ? 'text-cyan-700 font-semibold' : 'text-cyan-400'
                        }`}>
                          Renders as interactive tags on cards
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        placeholder="e.g. Data Structures & Algorithms, Operating Systems, Database Management Systems, Computer Networks, Software Engineering, Cloud Computing"
                        value={editingEducation.description || ''}
                        onChange={(e) => setEditingEducation({ ...editingEducation, description: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs font-mono border outline-none ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white'
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>Display Order (Sort Index)</label>
                        <input
                          type="number"
                          value={editingEducation.displayOrder ?? 0}
                          onChange={(e) =>
                            setEditingEducation({
                              ...editingEducation,
                              displayOrder: parseInt(e.target.value, 10) || 0,
                            })
                          }
                          className={`w-full px-3 py-2 rounded-lg text-xs font-mono border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white'
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>Visibility Status</label>
                        <select
                          value={editingEducation.status || 'PUBLISHED'}
                          onChange={(e) =>
                            setEditingEducation({
                              ...editingEducation,
                              status: e.target.value as ContentStatus,
                            })
                          }
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                              : 'bg-[#121824] border-white/10 text-white'
                          }`}
                        >
                          <option value="PUBLISHED">PUBLISHED (Visible on Portfolio)</option>
                          <option value="DRAFT">DRAFT (Hidden from Public)</option>
                          <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                      </div>
                    </div>

                    <div className={`p-4 rounded-2xl space-y-4 border ${
                      adminTheme === 'light' ? 'border-cyan-200 bg-cyan-50/70' : 'border-cyan-500/30 bg-cyan-950/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-cyan-500" />
                          <h4 className={`text-xs font-mono font-bold uppercase tracking-wider ${
                            adminTheme === 'light' ? 'text-cyan-900' : 'text-white'
                          }`}>
                            Attached Official Marksheets & Academic Documents
                          </h4>
                        </div>
                        <span className={`text-[10px] font-mono ${
                          adminTheme === 'light' ? 'text-cyan-800' : 'text-cyan-300'
                        }`}>
                          Upload marksheets, degree, and board certificates
                        </span>
                      </div>

                      {(() => {
                        let certList: ExperienceCertificate[] = [];
                        try {
                          if (editingEducation.certificatesJson) {
                            certList = JSON.parse(editingEducation.certificatesJson);
                          }
                        } catch {
                          certList = [];
                        }

                        if (!certList || certList.length === 0) {
                          return (
                            <div className={`p-3 rounded-xl border text-xs font-mono text-center ${
                              adminTheme === 'light'
                                ? 'border-slate-200 bg-white/80 text-slate-600'
                                : 'border-white/5 bg-white/[0.02] text-slate-400'
                            }`}>
                              No marksheets or certificates attached yet. Upload documents below.
                            </div>
                          );
                        }

                        return (
                          <div className="space-y-2">
                            {certList.map((c, cIdx) => (
                              <div
                                key={cIdx}
                                className={`p-2.5 rounded-xl flex items-center justify-between gap-3 text-xs border ${
                                  adminTheme === 'light'
                                    ? 'border-slate-200 bg-white shadow-sm'
                                    : 'border-white/10 bg-white/5'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border ${
                                    adminTheme === 'light'
                                      ? 'bg-cyan-100 text-cyan-800 border-cyan-300 font-bold'
                                      : 'bg-cyan-900/60 text-cyan-300 border-cyan-500/30'
                                  }`}>
                                    {c.type || 'DOCUMENT'}
                                  </span>
                                  <span className={`font-bold truncate ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                                    {c.title}
                                  </span>
                                  <span className={`text-[11px] font-mono truncate hidden sm:inline ${
                                    adminTheme === 'light' ? 'text-slate-500' : 'text-slate-400'
                                  }`}>
                                    ({c.fileUrl})
                                  </span>
                                </div>

                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <a
                                    href={resolveAssetUrl(c.fileUrl)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-1 cursor-pointer transition-colors ${
                                      adminTheme === 'light' ? 'text-cyan-700 hover:text-cyan-800' : 'text-cyan-400 hover:text-cyan-300'
                                    }`}
                                    title="Document Overview"
                                  >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveCertFromEducation(cIdx)}
                                    className="p-1 text-rose-500 hover:text-rose-600"
                                    title="Remove"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      <div className={`pt-3 border-t space-y-3 ${
                        adminTheme === 'light' ? 'border-cyan-200' : 'border-cyan-500/20'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-mono font-semibold ${
                            adminTheme === 'light' ? 'text-slate-800' : 'text-slate-300'
                          }`}>
                            Add & Upload New Academic Document
                          </span>
                          <span className={`text-[10px] font-mono ${
                            adminTheme === 'light' ? 'text-cyan-800 font-semibold' : 'text-cyan-400'
                          }`}>
                            PDF documents & Images (.png, .jpg, .webp) up to 10MB
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className={`text-[10px] font-mono mr-1 ${
                            adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'
                          }`}>
                            Quick Presets:
                          </span>
                          {[
                            { label: 'Semester Marksheet', type: 'MARKSHEET' },
                            { label: 'Consolidated Marksheet', type: 'MARKSHEET' },
                            { label: 'Degree Certificate', type: 'DEGREE' },
                            { label: 'Provisional Certificate', type: 'PROVISIONAL' },
                            { label: 'Class 12th Marksheet', type: 'BOARD_CERTIFICATE' },
                            { label: 'Class 10th Marksheet', type: 'BOARD_CERTIFICATE' },
                            { label: 'Passing Certificate', type: 'PASSING_CERT' },
                            { label: 'Migration Certificate', type: 'OTHER' },
                          ].map((preset) => (
                            <button
                              key={preset.label}
                              type="button"
                              onClick={() => {
                                setEduCertTitle(preset.label);
                                setEduCertType(preset.type);
                              }}
                              className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-colors cursor-pointer ${
                                adminTheme === 'light'
                                  ? 'bg-cyan-100 hover:bg-cyan-200 text-cyan-800 border-cyan-300 font-semibold'
                                  : 'bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
                              }`}
                            >
                              + {preset.label}
                            </button>
                          ))}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className={`block text-[10px] font-mono mb-1 ${
                              adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-400'
                            }`}>
                              Document Title *
                            </label>
                            <input
                              type="text"
                              placeholder="e.g. Semester 1 Marksheet, Degree Certificate, 10th Board"
                              value={eduCertTitle}
                              onChange={(e) => setEduCertTitle(e.target.value)}
                              className={`w-full px-3 py-1.5 rounded-lg text-xs font-sans border outline-none ${
                                adminTheme === 'light'
                                  ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm'
                                  : 'bg-white/5 border-white/10 text-white'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-[10px] font-mono mb-1 ${
                              adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-400'
                            }`}>
                              Document Type
                            </label>
                            <select
                              value={eduCertType}
                              onChange={(e) => setEduCertType(e.target.value)}
                              className={`w-full px-3 py-1.5 rounded-lg text-xs border outline-none ${
                                adminTheme === 'light'
                                  ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                                  : 'bg-[#121824] border-white/10 text-white'
                              }`}
                            >
                              <option value="MARKSHEET">Marksheet / Grade Card</option>
                              <option value="DEGREE">Degree Certificate</option>
                              <option value="BOARD_CERTIFICATE">Board Certificate / Marksheet</option>
                              <option value="PROVISIONAL">Provisional Certificate</option>
                              <option value="PASSING_CERT">Passing Certificate</option>
                              <option value="OTHER">Other Credential</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
                          <div className="sm:col-span-2">
                            <label className={`block text-[10px] font-mono mb-1 ${
                              adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-400'
                            }`}>
                              Upload Document (.pdf, .png, .jpg) or Paste Direct URL
                            </label>
                            <div className="flex items-center gap-2">
                              <label className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                                adminTheme === 'light'
                                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white border-cyan-700 shadow-sm'
                                  : 'bg-cyan-600/30 hover:bg-cyan-600/50 border-cyan-400/40 text-cyan-200'
                              }`}>
                                <Upload className="w-3.5 h-3.5" />
                                <span>{uploadingEduCert ? 'Uploading...' : 'Upload File'}</span>
                                <input
                                  type="file"
                                  accept="image/*,.pdf"
                                  onChange={handleUploadEduCert}
                                  className="hidden"
                                  disabled={uploadingEduCert}
                                />
                              </label>

                              <input
                                type="text"
                                placeholder="/uploads/... or /assets/certificates/..."
                                value={eduCertUrl}
                                onChange={(e) => setEduCertUrl(e.target.value)}
                                className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-mono border outline-none ${
                                  adminTheme === 'light'
                                    ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 shadow-sm'
                                    : 'bg-white/5 border-white/10 text-white'
                                }`}
                              />
                            </div>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={handleAddCertToEducation}
                              className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-mono font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                            >
                              <Award className="w-3.5 h-3.5" />
                              <span>+ Attach Document</span>
                            </button>
                          </div>
                        </div>

                        {eduCertUrl && (
                          <div className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 text-xs font-mono ${
                            adminTheme === 'light'
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
                              : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                          }`}>
                            <div className="flex items-center gap-2 truncate">
                              <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                              <span className="truncate">
                                Ready to attach: <strong className={adminTheme === 'light' ? 'text-slate-900' : 'text-white'}>{eduCertTitle || 'Document'}</strong> ({eduCertUrl})
                              </span>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <a
                                href={resolveAssetUrl(eduCertUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
                                  adminTheme === 'light'
                                    ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                                    : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200'
                                }`}
                              >
                                Document Overview ↗
                              </a>
                              <button
                                type="button"
                                onClick={handleAddCertToEducation}
                                className="px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-[11px] shadow transition-colors cursor-pointer"
                              >
                                Attach Now ✓
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className={`pt-4 border-t flex items-center justify-between ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <span className={`text-[11px] font-mono ${
                        adminTheme === 'light' ? 'text-slate-500 font-semibold' : 'text-slate-400'
                      }`}>
                        Changes will instantly reflect on your live portfolio
                      </span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingEducation(null)}
                          className={`px-4 py-2 rounded-lg text-xs font-mono transition-colors border ${
                            adminTheme === 'light'
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-semibold'
                              : 'bg-white/5 hover:bg-white/10 text-slate-300 border-white/5'
                          }`}
                        >
                          Cancel
                        </button>
                        <FuturisticButton type="submit" variant="primary" size="sm">
                          <Save className="w-3.5 h-3.5 mr-1.5" /> Save Education
                        </FuturisticButton>
                      </div>
                    </div>
                  </form>
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="space-y-6">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
              adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
            }`}>
              <div>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  <span>📜</span> Certifications & Credentials
                </h2>
                <p className={`text-xs font-mono mt-0.5 ${
                  adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  Manage professional certifications, issuing organizations, dates, and official document attachments.
                </p>
              </div>
              <FuturisticButton
                variant="primary"
                size="sm"
                onClick={() =>
                  setEditingCertificate({
                    title: '',
                    issuingOrg: '',
                    issueDate: new Date().getFullYear().toString(),
                    iconKey: 'award',
                    displayOrder: certificates.length + 1,
                    status: 'PUBLISHED',
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Certificate
              </FuturisticButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {certificates.map((cert) => {
                const meta = getCourseMeta(cert);
                const IconComp = meta.icon;
                return (
                  <GlassCard
                    key={cert.id}
                    className={`admin-card p-4 flex flex-col justify-between space-y-3 text-left border ${
                      adminTheme === 'light' ? 'border-slate-200 shadow-sm' : 'border-white/10'
                    } hover:border-blue-400/50 transition-all ${meta.glowHover}`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className={`w-9 h-9 rounded-xl ${meta.iconBg} border flex items-center justify-center shadow-sm`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${meta.badgeBg} ${meta.brandColor}`}>
                            {meta.coursePill}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                            adminTheme === 'light'
                              ? 'bg-slate-100 text-slate-700 border-slate-200 font-semibold'
                              : 'bg-white/5 text-slate-400 border-white/5'
                          }`}>
                            #{cert.displayOrder}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                            cert.status === 'PUBLISHED'
                              ? adminTheme === 'light'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : adminTheme === 'light'
                              ? 'bg-amber-50 text-amber-800 border-amber-300 font-bold'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {cert.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-bold line-clamp-2 min-h-[2.5rem] leading-snug ${
                          adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>
                          {cert.title}
                        </h3>
                        <p className={`text-xs font-semibold truncate mt-1 ${
                          adminTheme === 'light' ? 'text-rose-600 font-bold' : 'text-rose-400'
                        }`}>
                          {cert.issuingOrg}
                        </p>
                        <div className={`flex items-center justify-between text-[11px] font-mono mt-0.5 ${
                          adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          <span>Year: {cert.issueDate}</span>
                          {cert.iconKey && (
                            <span className={`text-[10px] font-mono ${
                              adminTheme === 'light' ? 'text-cyan-700 font-bold' : 'text-cyan-400/80'
                            }`}>
                              key: {cert.iconKey}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className={`pt-2.5 border-t flex items-center justify-between text-xs ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      {cert.credentialUrl ? (
                        <a
                          href={resolveAssetUrl(cert.credentialUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-[11px] font-mono hover:underline flex items-center gap-1 truncate max-w-[120px] cursor-pointer ${
                            adminTheme === 'light' ? 'text-blue-700 font-bold' : 'text-cyan-400 font-semibold'
                          }`}
                          title="Document Overview"
                        >
                          Overview <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      ) : (
                        <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          adminTheme === 'light'
                            ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                            : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                        }`} title="Digital Credential Verification Pending • Record Verified">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>Record Verified</span>
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingCertificate(cert)}
                          className={`p-1.5 rounded-lg transition-colors border ${
                            adminTheme === 'light'
                              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-sm'
                              : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-transparent'
                          }`}
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteCertificate(cert.id)}
                          className={`p-1.5 rounded-lg transition-colors border ${
                            adminTheme === 'light'
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200 shadow-sm'
                              : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-transparent'
                          }`}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {editingCertificate && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                <GlassCard className={`admin-modal-card w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
                  adminTheme === 'light' ? 'bg-white border-slate-200 text-slate-900 shadow-2xl' : 'bg-[#0a0f1d] border-white/10 text-white'
                }`}>
                  <div className={`flex items-center justify-between pb-3 border-b ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">📜</span>
                      <h3 className={`text-base font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {editingCertificate.id ? 'Edit Certificate' : 'New Certificate'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setEditingCertificate(null)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-full transition-all ${
                        adminTheme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                          : 'text-slate-400 hover:text-white bg-white/10'
                      }`}
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveCertificate} className="space-y-3.5 text-left">
                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. OpenAI & Generative AI, Microsoft Python"
                        value={editingCertificate.title || ''}
                        onChange={(e) => setEditingCertificate({ ...editingCertificate, title: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Issuing Organization *
                        </label>
                        <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-slate-500 font-semibold' : 'text-slate-500'}`}>
                          Quick presets
                        </span>
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. SRM University, Microsoft, Oasis Technologies Pvt. Ltd."
                        value={editingCertificate.issuingOrg || ''}
                        onChange={(e) => setEditingCertificate({ ...editingCertificate, issuingOrg: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all mb-1.5 ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                        }`}
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {['Microsoft', 'SRM University', 'Oasis Technologies Pvt. Ltd.', 'EduSkills', 'Palo Alto Networks'].map((org) => (
                          <button
                            key={org}
                            type="button"
                            onClick={() => setEditingCertificate({ ...editingCertificate, issuingOrg: org })}
                            className={`px-2 py-0.5 rounded border text-[10px] font-mono transition-colors ${
                              adminTheme === 'light'
                                ? 'bg-rose-50 hover:bg-rose-100 border-rose-200 text-rose-700 font-semibold'
                                : 'bg-white/5 hover:bg-white/10 border-white/5 text-rose-400'
                            }`}
                          >
                            + {org}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Course Icon & Category *
                        </label>
                        <span className={`text-[10px] font-mono ${
                          adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'
                        }`}>
                          Select matching icon for this course
                        </span>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2.5">
                        {CERT_ICON_PRESETS.map((preset) => {
                          const isSelected = (editingCertificate.iconKey || '').toLowerCase() === preset.key;
                          const PresetIcon = preset.icon;
                          return (
                            <button
                              key={preset.key}
                              type="button"
                              onClick={() => setEditingCertificate({ ...editingCertificate, iconKey: preset.key })}
                              className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                                isSelected
                                  ? `${preset.color} ring-2 ring-blue-500/60 shadow-md font-bold scale-[1.02]`
                                  : adminTheme === 'light'
                                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <PresetIcon className={`w-4 h-4 flex-shrink-0 ${
                                isSelected ? '' : adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                              }`} />
                              <span className="text-[11px] truncate">{preset.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {(() => {
                        const previewMeta = getCourseMeta(editingCertificate);
                        const PreviewIcon = previewMeta.icon;
                        return (
                          <div className={`flex items-center justify-between p-2.5 rounded-xl border ${
                            adminTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'
                          }`}>
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-lg ${previewMeta.iconBg} border flex items-center justify-center shadow-sm`}>
                                <PreviewIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className={`text-[11px] font-semibold flex items-center gap-1.5 ${
                                  adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                                }`}>
                                  <span>Preview:</span>
                                  <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${previewMeta.badgeBg} ${previewMeta.brandColor}`}>
                                    {previewMeta.coursePill}
                                  </span>
                                </div>
                                <div className={`text-[10px] ${adminTheme === 'light' ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                                  Track: {previewMeta.categoryTag}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                                Assigned Key: <span className={`${adminTheme === 'light' ? 'text-cyan-800 font-bold' : 'text-cyan-400 font-bold'}`}>
                                  {editingCertificate.iconKey || '(auto)'}
                                </span>
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Issue Date / Year *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2025, 2024"
                          value={editingCertificate.issueDate || ''}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, issueDate: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all mb-1 ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                          }`}
                        />
                        <div className="flex gap-1">
                          {['2025', '2024', '2023'].map((yr) => (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => setEditingCertificate({ ...editingCertificate, issueDate: yr })}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors border ${
                                adminTheme === 'light'
                                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border-transparent'
                              }`}
                            >
                              {yr}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={editingCertificate.displayOrder ?? 1}
                          onChange={(e) => setEditingCertificate({ ...editingCertificate, displayOrder: parseInt(e.target.value) || 1 })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Credential Link or Document URL
                      </label>
                      <input
                        type="text"
                        placeholder="https://... or /assets/certificates/... or /uploads/..."
                        value={editingCertificate.credentialUrl || ''}
                        onChange={(e) => setEditingCertificate({ ...editingCertificate, credentialUrl: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div className={`p-3 rounded-xl space-y-2 border ${
                      adminTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'
                    }`}>
                      <div className="flex items-center justify-between">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Upload Certificate File (PDF / Image)
                        </label>
                        <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-slate-500 font-semibold' : 'text-slate-500'}`}>
                          Auto-sets URL
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors border ${
                          adminTheme === 'light'
                            ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 shadow-sm'
                            : 'bg-blue-600/20 hover:bg-blue-600/30 border-blue-500/30 text-blue-300'
                        }`}>
                          <Upload className="w-3.5 h-3.5 text-blue-500" />
                          <span>{uploading ? 'Uploading...' : 'Choose File to Upload'}</span>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => handleFileUpload(e, 'credentialUrl')}
                            className="hidden"
                            disabled={uploading}
                          />
                        </label>
                        {editingCertificate.credentialUrl && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono text-emerald-600 font-semibold truncate max-w-[140px]" title={editingCertificate.credentialUrl}>
                              ✓ Attached
                            </span>
                            <a
                              href={resolveAssetUrl(editingCertificate.credentialUrl)}
                              target="_blank"
                              rel="noreferrer"
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-colors inline-flex items-center gap-1 ${
                                adminTheme === 'light'
                                  ? 'bg-blue-100 hover:bg-blue-200 text-blue-800'
                                  : 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200'
                              }`}
                              title="Document Overview"
                            >
                              <span>Document Overview</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Publish Status
                      </label>
                      <select
                        value={editingCertificate.status || 'PUBLISHED'}
                        onChange={(e) => setEditingCertificate({ ...editingCertificate, status: e.target.value as 'PUBLISHED' | 'DRAFT' })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                            : 'bg-slate-900 border-white/10 text-white focus:border-blue-500'
                        }`}
                      >
                        <option value="PUBLISHED">PUBLISHED (Visible in Portfolio)</option>
                        <option value="DRAFT">DRAFT (Hidden from Public)</option>
                      </select>
                    </div>

                    <div className={`pt-3 border-t flex justify-end gap-2 ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <button
                        type="button"
                        onClick={() => setEditingCertificate(null)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                          adminTheme === 'light'
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-semibold'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border-transparent'
                        }`}
                      >
                        Cancel
                      </button>
                      <FuturisticButton type="submit" variant="primary" size="sm">
                        Save Certificate
                      </FuturisticButton>
                    </div>
                  </form>
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
              adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
            }`}>
              <div>
                <h2 className={`text-xl font-bold flex items-center gap-2 ${
                  adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                }`}>
                  <span>🏆</span> Honors & Milestones (Achievements)
                </h2>
                <p className={`text-xs font-mono mt-0.5 ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                  Showcase competitive coding benchmarks, hackathon podiums, awards, and recognitions.
                  <span className={`ml-1 ${adminTheme === 'light' ? 'text-cyan-700 font-bold' : 'text-cyan-400'}`}>
                    (Section & Navbar tab stay hidden from the public portfolio when 0 achievements exist).
                  </span>
                </p>
              </div>
              <FuturisticButton
                variant="primary"
                size="sm"
                onClick={() =>
                  setEditingAchievement({
                    title: '',
                    metricValue: '#1 Winner',
                    organization: '',
                    issueDate: new Date().getFullYear().toString(),
                    iconKey: 'trophy',
                    descriptionMarkdown: '',
                    proofUrl: '',
                    displayOrder: achievements.length + 1,
                    status: 'PUBLISHED',
                  })
                }
              >
                <Plus className="w-4 h-4 mr-1.5" /> Add Achievement
              </FuturisticButton>
            </div>

            {achievements.length === 0 && (
              <GlassCard className={`p-8 text-center max-w-2xl mx-auto space-y-4 border border-dashed ${
                adminTheme === 'light' ? 'border-amber-300 bg-amber-50/60 shadow-sm' : 'border-amber-500/30'
              }`}>
                <div className={`w-14 h-14 mx-auto rounded-2xl border flex items-center justify-center ${
                  adminTheme === 'light'
                    ? 'bg-amber-100 border-amber-300 text-amber-700 shadow-md'
                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.2)]'
                }`}>
                  <Trophy className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <h3 className={`text-base font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                    No Achievements Added Yet
                  </h3>
                  <p className={`text-xs max-w-md mx-auto leading-relaxed ${
                    adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                  }`}>
                    Your public portfolio currently has <strong className={adminTheme === 'light' ? 'text-slate-900' : 'text-slate-200'}>zero footprint</strong> for achievements (the section and Navbar link remain completely invisible until you publish one).
                  </p>
                  <p className={`text-xs font-mono ${
                    adminTheme === 'light' ? 'text-cyan-800 font-bold' : 'text-cyan-400'
                  }`}>
                    Click "Add Achievement" above to add hackathons, contest ratings, or ranks anytime!
                  </p>
                </div>
                <div className="pt-2">
                  <FuturisticButton
                    variant="primary"
                    size="sm"
                    onClick={() =>
                      setEditingAchievement({
                        title: '',
                        metricValue: '#1 Winner',
                        organization: '',
                        issueDate: new Date().getFullYear().toString(),
                        iconKey: 'trophy',
                        descriptionMarkdown: '',
                        proofUrl: '',
                        displayOrder: 1,
                        status: 'PUBLISHED',
                      })
                    }
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Create First Achievement
                  </FuturisticButton>
                </div>
              </GlassCard>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {achievements.map((ach) => {
                const meta = getAchievementMeta(ach);
                const IconComp = meta.icon;
                return (
                  <GlassCard
                    key={ach.id}
                    className={`admin-card p-5 flex flex-col justify-between space-y-4 text-left border ${
                      adminTheme === 'light' ? 'border-slate-200 shadow-sm' : 'border-white/10'
                    } hover:border-blue-400/50 transition-all ${meta.glowHover}`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-10 h-10 rounded-xl ${meta.iconBg} border flex items-center justify-center shadow-md`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1.5">
                          {ach.metricValue && (
                            <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${meta.badgeBg} ${meta.brandColor} shadow-sm`}>
                              {ach.metricValue}
                            </span>
                          )}
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                            adminTheme === 'light'
                              ? 'bg-slate-100 text-slate-700 border-slate-200 font-semibold'
                              : 'bg-white/5 text-slate-400 border-white/5'
                          }`}>
                            #{ach.displayOrder}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                            ach.status === 'PUBLISHED'
                              ? adminTheme === 'light'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : adminTheme === 'light'
                              ? 'bg-amber-50 text-amber-800 border-amber-300 font-bold'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                          }`}>
                            {ach.status}
                          </span>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-sm font-bold line-clamp-2 leading-snug ${
                          adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                        }`}>
                          {ach.title}
                        </h3>
                        {ach.organization && (
                          <p className={`text-xs font-semibold mt-1 truncate ${
                            adminTheme === 'light' ? 'text-cyan-700 font-bold' : 'text-cyan-400'
                          }`}>
                            @{ach.organization}
                          </p>
                        )}
                        <div className={`flex items-center justify-between text-[11px] font-mono mt-1 ${
                          adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                        }`}>
                          <span>Year: {ach.issueDate || '—'}</span>
                          <span className={`text-[10px] font-mono ${
                            adminTheme === 'light' ? 'text-slate-500 font-medium' : 'text-slate-400/80'
                          }`}>
                            {meta.category}
                          </span>
                        </div>
                        {ach.descriptionMarkdown && (
                          <p className={`text-xs line-clamp-2 mt-2 leading-relaxed ${
                            adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                          }`}>
                            {ach.descriptionMarkdown}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className={`pt-3 border-t flex items-center justify-between text-xs ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      {ach.proofUrl ? (
                        <a
                          href={resolveAssetUrl(ach.proofUrl)}
                          target="_blank"
                          rel="noreferrer"
                          className={`text-[11px] font-mono hover:underline flex items-center gap-1 truncate max-w-[130px] ${
                            adminTheme === 'light' ? 'text-blue-700 font-bold' : 'text-cyan-400 font-semibold'
                          }`}
                          title="Document Overview"
                        >
                          Overview <ExternalLink className="w-3 h-3 flex-shrink-0" />
                        </a>
                      ) : (
                        <span className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          adminTheme === 'light'
                            ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                            : 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30'
                        }`} title="Digital Credential Verification Pending • Record Verified">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          <span>Record Verified</span>
                        </span>
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => setEditingAchievement(ach)}
                          className={`p-1.5 rounded-lg transition-colors border ${
                            adminTheme === 'light'
                              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200 shadow-sm'
                              : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border-transparent'
                          }`}
                          title="Edit"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteAchievement(ach.id)}
                          className={`p-1.5 rounded-lg transition-colors border ${
                            adminTheme === 'light'
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border-rose-200 shadow-sm'
                              : 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border-transparent'
                          }`}
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>

            {editingAchievement && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md overflow-y-auto">
                <GlassCard className={`admin-modal-card w-full max-w-xl p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
                  adminTheme === 'light' ? 'bg-white border-slate-200 text-slate-900 shadow-2xl' : 'bg-[#0a0f1d] border-white/10 text-white'
                }`}>
                  <div className={`flex items-center justify-between pb-3 border-b ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🏆</span>
                      <h3 className={`text-base font-bold ${adminTheme === 'light' ? 'text-slate-900' : 'text-white'}`}>
                        {editingAchievement.id ? 'Edit Achievement' : 'New Achievement'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setEditingAchievement(null)}
                      className={`text-xs font-mono px-2.5 py-1 rounded-full transition-all ${
                        adminTheme === 'light'
                          ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300'
                          : 'text-slate-400 hover:text-white bg-white/10'
                      }`}
                    >
                      ✕ Close
                    </button>
                  </div>

                  <form onSubmit={handleSaveAchievement} className="space-y-3.5 text-left">
                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 1st Place - Smart India Hackathon, Top 5% Global LeetCode Contest"
                        value={editingAchievement.title || ''}
                        onChange={(e) => setEditingAchievement({ ...editingAchievement, title: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Highlight Metric / Rank Badge
                        </label>
                        <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-slate-500 font-semibold' : 'text-slate-500'}`}>
                          Quick suggestions
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. #1 Winner, Top 1%, Finalist, 500+ Solved, 5-Star Coder"
                        value={editingAchievement.metricValue || ''}
                        onChange={(e) => setEditingAchievement({ ...editingAchievement, metricValue: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all mb-1.5 ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                        }`}
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {['#1 Winner', 'Top 1%', 'Grand Finalist', '500+ Solved', '5-Star Coder', 'Gold Medalist'].map((metric) => (
                          <button
                            key={metric}
                            type="button"
                            onClick={() => setEditingAchievement({ ...editingAchievement, metricValue: metric })}
                            className={`px-2 py-0.5 rounded border text-[10px] font-mono transition-colors ${
                              adminTheme === 'light'
                                ? 'bg-amber-50 hover:bg-amber-100 border-amber-200 text-amber-800 font-semibold'
                                : 'bg-white/5 hover:bg-white/10 border-white/5 text-amber-400'
                            }`}
                          >
                            + {metric}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Issuing Organization / Host Platform
                        </label>
                        <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-slate-500 font-semibold' : 'text-slate-500'}`}>
                          Quick presets
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder="e.g. LeetCode, SRM University, Smart India Hackathon, HackerRank"
                        value={editingAchievement.organization || ''}
                        onChange={(e) => setEditingAchievement({ ...editingAchievement, organization: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all mb-1.5 ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                        }`}
                      />
                      <div className="flex flex-wrap gap-1.5">
                        {['LeetCode', 'HackerRank', 'CodeChef', 'SRM University', 'Smart India Hackathon', 'Google Cloud'].map((org) => (
                          <button
                            key={org}
                            type="button"
                            onClick={() => setEditingAchievement({ ...editingAchievement, organization: org })}
                            className={`px-2 py-0.5 rounded border text-[10px] font-mono transition-colors ${
                              adminTheme === 'light'
                                ? 'bg-cyan-50 hover:bg-cyan-100 border-cyan-200 text-cyan-800 font-semibold'
                                : 'bg-white/5 hover:bg-white/10 border-white/5 text-cyan-400'
                            }`}
                          >
                            + {org}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Milestone Icon & Cyber Theme *
                        </label>
                        <span className={`text-[10px] font-mono ${
                          adminTheme === 'light' ? 'text-slate-600 font-semibold' : 'text-slate-400'
                        }`}>
                          Select visual archetype
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-2.5">
                        {ACHIEVEMENT_ICON_PRESETS.map((preset) => {
                          const isSelected = (editingAchievement.iconKey || '').toLowerCase() === preset.key;
                          const PresetIcon = preset.icon;
                          return (
                            <button
                              key={preset.key}
                              type="button"
                              onClick={() => setEditingAchievement({ ...editingAchievement, iconKey: preset.key })}
                              className={`flex items-center gap-2 p-2 rounded-lg border text-left transition-all ${
                                isSelected
                                  ? `${preset.color} ring-2 ring-blue-500/60 shadow-md font-bold scale-[1.02]`
                                  : adminTheme === 'light'
                                  ? 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                                  : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white hover:bg-white/5 hover:border-white/20'
                              }`}
                            >
                              <PresetIcon className={`w-4 h-4 flex-shrink-0 ${
                                isSelected ? '' : adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                              }`} />
                              <span className="text-[11px] truncate">{preset.label}</span>
                            </button>
                          );
                        })}
                      </div>

                      {(() => {
                        const previewMeta = getAchievementMeta(editingAchievement);
                        const PreviewIcon = previewMeta.icon;
                        return (
                          <div className={`flex items-center justify-between p-2.5 rounded-xl border ${
                            adminTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'
                          }`}>
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-lg ${previewMeta.iconBg} border flex items-center justify-center shadow-sm`}>
                                <PreviewIcon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className={`text-[11px] font-semibold flex items-center gap-1.5 ${
                                  adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                                }`}>
                                  <span>Preview:</span>
                                  <span className={`px-1.5 py-0.5 rounded border text-[10px] font-mono ${previewMeta.badgeBg} ${previewMeta.brandColor}`}>
                                    {editingAchievement.metricValue || '#1 Milestone'}
                                  </span>
                                </div>
                                <div className={`text-[10px] ${adminTheme === 'light' ? 'text-slate-600 font-medium' : 'text-slate-400'}`}>
                                  Theme: {previewMeta.category}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'}`}>
                                Assigned Key: <span className={`${adminTheme === 'light' ? 'text-cyan-800 font-bold' : 'text-cyan-400 font-bold'}`}>
                                  {editingAchievement.iconKey || 'trophy'}
                                </span>
                              </span>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Issue Date / Year *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2025, Dec 2024"
                          value={editingAchievement.issueDate || ''}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, issueDate: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all mb-1 ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                          }`}
                        />
                        <div className="flex gap-1">
                          {['2026', '2025', '2024', '2023'].map((yr) => (
                            <button
                              key={yr}
                              type="button"
                              onClick={() => setEditingAchievement({ ...editingAchievement, issueDate: yr })}
                              className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors border ${
                                adminTheme === 'light'
                                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                                  : 'bg-white/5 hover:bg-white/10 text-slate-400 border-transparent'
                              }`}
                            >
                              {yr}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className={`block text-xs font-mono mb-1 ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Display Order
                        </label>
                        <input
                          type="number"
                          value={editingAchievement.displayOrder ?? 1}
                          onChange={(e) => setEditingAchievement({ ...editingAchievement, displayOrder: parseInt(e.target.value) || 1 })}
                          className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                            adminTheme === 'light'
                              ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                              : 'bg-white/5 border-white/10 text-white focus:border-blue-500'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Description / Key Highlights (Markdown)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Brief summary of the achievement, competition size, impact, or problems solved..."
                        value={editingAchievement.descriptionMarkdown || ''}
                        onChange={(e) => setEditingAchievement({ ...editingAchievement, descriptionMarkdown: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none resize-none transition-all ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Proof URL / Live Link
                      </label>
                      <input
                        type="text"
                        placeholder="https://... or /assets/... or /uploads/..."
                        value={editingAchievement.proofUrl || ''}
                        onChange={(e) => setEditingAchievement({ ...editingAchievement, proofUrl: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none transition-all ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 shadow-sm'
                            : 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-blue-500'
                        }`}
                      />
                    </div>

                    <div className={`p-3 rounded-xl space-y-2 border ${
                      adminTheme === 'light' ? 'bg-slate-50 border-slate-200' : 'bg-white/[0.03] border-white/10'
                    }`}>
                      <div className="flex items-center justify-between">
                        <label className={`block text-xs font-mono ${
                          adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                        }`}>
                          Upload Proof / Certificate / Scorecard (PDF / Image)
                        </label>
                        <span className={`text-[10px] font-mono ${adminTheme === 'light' ? 'text-slate-500 font-semibold' : 'text-slate-500'}`}>
                          Auto-sets URL
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <label className={`cursor-pointer inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-colors border ${
                          adminTheme === 'light'
                            ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                            : 'bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/30 text-amber-300'
                        }`}>
                          <Upload className="w-3.5 h-3.5 text-amber-500" />
                          <span>{uploadingAchievementProof ? 'Uploading...' : 'Choose File to Upload'}</span>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={handleAchievementProofUpload}
                            className="hidden"
                            disabled={uploadingAchievementProof}
                          />
                        </label>
                        {editingAchievement.proofUrl && (
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-mono text-emerald-600 font-semibold truncate max-w-[140px]" title={editingAchievement.proofUrl}>
                              ✓ Attached
                            </span>
                            <a
                              href={resolveAssetUrl(editingAchievement.proofUrl)}
                              target="_blank"
                              rel="noreferrer"
                              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-semibold transition-colors inline-flex items-center gap-1 ${
                                adminTheme === 'light'
                                  ? 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                                  : 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-200'
                              }`}
                              title="Document Overview"
                            >
                              <span>Document Overview</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className={`block text-xs font-mono mb-1 ${
                        adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-300'
                      }`}>
                        Publish Status
                      </label>
                      <select
                        value={editingAchievement.status || 'PUBLISHED'}
                        onChange={(e) => setEditingAchievement({ ...editingAchievement, status: e.target.value as 'PUBLISHED' | 'DRAFT' })}
                        className={`w-full px-3 py-2 rounded-lg text-xs border outline-none ${
                          adminTheme === 'light'
                            ? 'bg-white border-slate-300 text-slate-900 shadow-sm'
                            : 'bg-slate-900 border-white/10 text-white focus:border-blue-500'
                        }`}
                      >
                        <option value="PUBLISHED">PUBLISHED (Visible in Portfolio)</option>
                        <option value="DRAFT">DRAFT (Hidden from Public)</option>
                      </select>
                    </div>

                    <div className={`pt-3 border-t flex justify-end gap-2 ${
                      adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <button
                        type="button"
                        onClick={() => setEditingAchievement(null)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors border ${
                          adminTheme === 'light'
                            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300 font-semibold'
                            : 'bg-white/5 text-slate-300 hover:bg-white/10 border-transparent'
                        }`}
                      >
                        Cancel
                      </button>
                      <FuturisticButton type="submit" variant="primary" size="sm">
                        Save Achievement
                      </FuturisticButton>
                    </div>
                  </form>
                </GlassCard>
              </div>
            )}
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8 text-left">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2.5">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                  <span>Visitor Analytics & Traffic Intelligence</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Live real-time telemetry of visitors, device distribution, geographic/page paths, and conversion metrics.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={loadAnalyticsData}
                  disabled={loadingAnalytics}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    adminTheme === 'light'
                      ? 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300 shadow-sm'
                      : 'bg-[#080d1a] hover:bg-[#0c1326] text-slate-200 border-white/20'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loadingAnalytics ? 'animate-spin text-blue-500' : 'text-blue-400'}`} />
                  <span>Refresh</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleClearOldVisitors(30)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    adminTheme === 'light'
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Clear &gt; 30 Days</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearAllVisitors}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    adminTheme === 'light'
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300 shadow-sm'
                      : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <GlassCard className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider block font-semibold ${
                      adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    Total Site Visits
                  </span>
                  <div
                    className={`text-2xl font-black font-mono ${
                      adminTheme === 'light' ? 'text-cyan-700' : 'text-cyan-400'
                    }`}
                  >
                    {analytics ? analytics.totalVisits.toLocaleString() : 0}
                  </div>
                  <div
                    className={`text-[10px] font-mono ${
                      adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    All-time lifetime hits
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                    adminTheme === 'light'
                      ? 'bg-cyan-50 border-cyan-200 text-cyan-700 shadow-sm'
                      : 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                  }`}
                >
                  <Eye className="w-6 h-6" />
                </div>
              </GlassCard>

              <GlassCard className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider block font-semibold ${
                      adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    Unique Visitors
                  </span>
                  <div
                    className={`text-2xl font-black font-mono ${
                      adminTheme === 'light' ? 'text-purple-700' : 'text-purple-400'
                    }`}
                  >
                    {analytics ? analytics.uniqueVisitors.toLocaleString() : 0}
                  </div>
                  <div
                    className={`text-[10px] font-mono ${
                      adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    Distinct IP addresses
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                    adminTheme === 'light'
                      ? 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm'
                      : 'bg-purple-500/10 border-purple-500/20 text-purple-400'
                  }`}
                >
                  <Users className="w-6 h-6" />
                </div>
              </GlassCard>

              <GlassCard className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider block font-semibold ${
                      adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    Today's Visits
                  </span>
                  <div
                    className={`text-2xl font-black font-mono ${
                      adminTheme === 'light' ? 'text-emerald-700' : 'text-emerald-400'
                    }`}
                  >
                    {analytics ? analytics.todayVisits.toLocaleString() : 0}
                  </div>
                  <div
                    className={`text-[10px] font-mono flex items-center gap-1 font-semibold ${
                      adminTheme === 'light' ? 'text-emerald-700' : 'text-emerald-400/80'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span>Past 24 hours</span>
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                    adminTheme === 'light'
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700 shadow-sm'
                      : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                  }`}
                >
                  <Activity className="w-6 h-6" />
                </div>
              </GlassCard>

              <GlassCard className="p-5 flex items-center justify-between">
                <div className="space-y-1">
                  <span
                    className={`text-[11px] font-mono uppercase tracking-wider block font-semibold ${
                      adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    Inquiry Conversion
                  </span>
                  <div
                    className={`text-2xl font-black font-mono ${
                      adminTheme === 'light' ? 'text-amber-700' : 'text-amber-400'
                    }`}
                  >
                    {analytics ? `${analytics.conversionRate}%` : '0%'}
                  </div>
                  <div
                    className={`text-[10px] font-mono ${
                      adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                    }`}
                  >
                    {analytics ? `${analytics.totalInquiries} submissions` : '0 inquiries'}
                  </div>
                </div>
                <div
                  className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                    adminTheme === 'light'
                      ? 'bg-amber-50 border-amber-200 text-amber-700 shadow-sm'
                      : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                  }`}
                >
                  <TrendingUp className="w-6 h-6" />
                </div>
              </GlassCard>
            </div>

            {/* Visual Charts: 7-Day Trend & Device Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 7-Day Trend Bar Chart */}
              <GlassCard className="lg:col-span-2 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-500" />
                    <h3
                      className={`text-sm font-bold font-mono uppercase tracking-wider ${
                        adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      7-Day Traffic Timeline
                    </h3>
                  </div>
                  <span
                    className={`text-[11px] font-mono ${
                      adminTheme === 'light' ? 'text-slate-600 font-medium' : 'text-slate-400'
                    }`}
                  >
                    Last 7 calendar days
                  </span>
                </div>

                {/* Bars Container */}
                <div className="pt-4 pb-2">
                  <div
                    className={`h-44 flex items-end justify-between gap-2 sm:gap-4 px-2 border-b ${
                      adminTheme === 'light' ? 'border-slate-300' : 'border-white/10'
                    }`}
                  >
                    {(() => {
                      const daily = analytics?.dailyVisits || [];
                      const maxVal = Math.max(...daily.map((d) => d.count), 5);
                      return daily.map((day, idx) => {
                        const heightPct = Math.max(Math.round((day.count / maxVal) * 100), 8);
                        return (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                            <span
                              className={`text-[11px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                                adminTheme === 'light' ? 'text-blue-600' : 'text-cyan-400'
                              }`}
                            >
                              {day.count}
                            </span>
                            <div
                              className={`w-full max-w-[48px] rounded-t-lg h-32 flex items-end p-1 overflow-hidden transition-all ${
                                adminTheme === 'light'
                                  ? 'bg-slate-200/90 border border-slate-300/80 shadow-inner'
                                  : 'bg-slate-800/40 border border-white/5'
                              }`}
                            >
                              <div
                                style={{ height: `${heightPct}%` }}
                                className={`w-full bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-t-md transition-all duration-500 ${
                                  adminTheme === 'light'
                                    ? 'shadow-md shadow-blue-500/20'
                                    : 'shadow-[0_0_12px_rgba(6,182,212,0.4)]'
                                }`}
                              />
                            </div>
                            <span
                              className={`text-[10px] font-mono truncate w-full text-center ${
                                adminTheme === 'light' ? 'text-slate-700 font-semibold' : 'text-slate-400'
                              }`}
                            >
                              {day.date}
                            </span>
                          </div>
                        );
                      });
                    })()}
                  </div>
                </div>
              </GlassCard>

              {/* Device & Browser Breakdown */}
              <GlassCard className="p-6 space-y-5">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-purple-500" />
                  <h3
                    className={`text-sm font-bold font-mono uppercase tracking-wider ${
                      adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Platform & Devices
                  </h3>
                </div>

                {/* Device Bars */}
                <div className="space-y-3 pt-2">
                  {(() => {
                    const dev = analytics?.deviceBreakdown || {};
                    const totalDevVisits = Object.values(dev).reduce((a, b) => a + b, 0) || 1;
                    const devices = [
                      { key: 'Desktop', label: 'Desktop / PC', icon: Laptop, color: 'bg-cyan-500' },
                      { key: 'Mobile', label: 'Mobile Phones', icon: Smartphone, color: 'bg-purple-500' },
                      { key: 'Tablet', label: 'Tablets / iPads', icon: Monitor, color: 'bg-emerald-500' },
                    ];
                    return devices.map((d) => {
                      const count = dev[d.key] || 0;
                      const pct = Math.round((count / totalDevVisits) * 100);
                      const Icon = d.icon;
                      return (
                        <div key={d.key} className="space-y-1.5">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <div className="flex items-center gap-2">
                              <Icon
                                className={`w-3.5 h-3.5 ${
                                  adminTheme === 'light' ? 'text-slate-600' : 'text-slate-400'
                                }`}
                              />
                              <span
                                className={`font-semibold ${
                                  adminTheme === 'light' ? 'text-slate-800' : 'text-slate-300'
                                }`}
                              >
                                {d.label}
                              </span>
                            </div>
                            <span
                              className={`font-bold font-mono ${
                                adminTheme === 'light' ? 'text-slate-900' : 'text-slate-200'
                              }`}
                            >
                              {count} ({pct}%)
                            </span>
                          </div>
                          <div
                            className={`w-full h-2.5 rounded-full overflow-hidden border ${
                              adminTheme === 'light'
                                ? 'bg-slate-200/90 border-slate-300/80 shadow-inner'
                                : 'bg-black/30 border-white/5'
                            }`}
                          >
                            <div
                              style={{ width: `${pct}%` }}
                              className={`h-full ${d.color} rounded-full transition-all duration-500`}
                            />
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>

                {/* Browser Breakdown Pills */}
                <div
                  className={`pt-3 border-t space-y-2 ${
                    adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
                  }`}
                >
                  <span
                    className={`text-[11px] font-mono block font-semibold ${
                      adminTheme === 'light' ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    Top Browsers
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {(() => {
                      const browsers = analytics?.browserBreakdown || {};
                      const entries = Object.entries(browsers);
                      if (entries.length === 0) {
                        return (
                          <span
                            className={`text-xs font-mono ${
                              adminTheme === 'light' ? 'text-slate-500' : 'text-slate-500'
                            }`}
                          >
                            No telemetry recorded yet
                          </span>
                        );
                      }
                      return entries.map(([name, count]) => (
                        <span
                          key={name}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center gap-1.5 border transition-all ${
                            adminTheme === 'light'
                              ? 'bg-blue-50 border-blue-200 text-blue-800 font-medium shadow-sm'
                              : 'bg-blue-500/10 border-blue-500/20 text-blue-300'
                          }`}
                        >
                          <span>{name}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded font-bold text-[10px] ${
                              adminTheme === 'light'
                                ? 'bg-blue-200/60 text-blue-950'
                                : 'bg-blue-500/20 text-blue-200'
                            }`}
                          >
                            {count}
                          </span>
                        </span>
                      ));
                    })()}
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Visitor History Table with Filtering & Bulk Deletion */}
            <GlassCard className="p-6 space-y-4">
              <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4 border-b ${
                adminTheme === 'light' ? 'border-slate-200' : 'border-white/10'
              }`}>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-cyan-500" />
                  <h3 className={`text-sm font-bold font-mono uppercase tracking-wider ${
                    adminTheme === 'light' ? 'text-slate-900' : 'text-white'
                  }`}>
                    Visitor Logs & Geo-Telemetry
                  </h3>
                </div>

                {/* Filter and Search Controls */}
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative min-w-[200px] sm:w-60">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search IP, path, browser, OS..."
                      value={visitorSearchQuery}
                      onChange={(e) => setVisitorSearchQuery(e.target.value)}
                      className={`w-full pl-9 pr-8 py-2 rounded-xl text-xs font-mono transition-all outline-none border ${
                        adminTheme === 'light'
                          ? 'bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                          : 'bg-[#080d1a] text-white border-white/20 placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 shadow-inner'
                      }`}
                    />
                    {visitorSearchQuery && (
                      <button
                        type="button"
                        onClick={() => setVisitorSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                        title="Clear search"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                      adminTheme === 'light'
                        ? 'bg-white text-slate-800 border-slate-300 shadow-sm hover:border-slate-400'
                        : 'bg-[#080d1a] text-slate-200 border-white/20 hover:border-white/30 shadow-inner'
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <select
                      value={visitorFilterDate}
                      onChange={(e) => setVisitorFilterDate(e.target.value)}
                      className={`bg-transparent border-none text-xs font-mono focus:ring-0 cursor-pointer outline-none font-medium ${
                        adminTheme === 'light' ? 'text-slate-800' : 'text-slate-200 [&>option]:bg-[#0c1222] [&>option]:text-white'
                      }`}
                    >
                      <option value="all">All Dates</option>
                      <option value="today">Today</option>
                      <option value="7days">Last 7 Days</option>
                      <option value="30days">Last 30 Days</option>
                    </select>
                  </div>

                  <div
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                      adminTheme === 'light'
                        ? 'bg-white text-slate-800 border-slate-300 shadow-sm hover:border-slate-400'
                        : 'bg-[#080d1a] text-slate-200 border-white/20 hover:border-white/30 shadow-inner'
                    }`}
                  >
                    <Filter className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                    <select
                      value={visitorFilterDevice}
                      onChange={(e) => setVisitorFilterDevice(e.target.value)}
                      className={`bg-transparent border-none text-xs font-mono focus:ring-0 cursor-pointer outline-none font-medium ${
                        adminTheme === 'light' ? 'text-slate-800' : 'text-slate-200 [&>option]:bg-[#0c1222] [&>option]:text-white'
                      }`}
                    >
                      <option value="all">All Devices</option>
                      <option value="Desktop">Desktop</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Tablet">Tablet</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Bulk Actions Bar */}
              {(() => {
                const logs = (analytics?.recentVisitors || []).filter((v) => {
                  if (!isWithinDatePreset(v.visitedAt, visitorFilterDate)) return false;
                  if (visitorFilterDevice !== 'all' && v.deviceType !== visitorFilterDevice) return false;
                  if (visitorSearchQuery.trim()) {
                    const q = visitorSearchQuery.toLowerCase();
                    const matchIp = v.ipAddress?.toLowerCase().includes(q);
                    const matchPath = v.pagePath?.toLowerCase().includes(q);
                    const matchBrowser = v.browser?.toLowerCase().includes(q);
                    const matchOs = v.operatingSystem?.toLowerCase().includes(q);
                    const matchRef = v.referrer?.toLowerCase().includes(q);
                    if (!matchIp && !matchPath && !matchBrowser && !matchOs && !matchRef) return false;
                  }
                  return true;
                });
                const allSelected = logs.length > 0 && logs.every((l) => selectedVisitorIds.includes(l.id));

                return (
                  <div
                    className={`flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-xl border text-xs font-mono transition-all ${
                      adminTheme === 'light'
                        ? 'bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                        : 'bg-[#080d1a]/80 border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          if (allSelected) {
                            setSelectedVisitorIds([]);
                          } else {
                            setSelectedVisitorIds(logs.map((l) => l.id));
                          }
                        }}
                        className={`flex items-center gap-1.5 transition-colors ${
                          adminTheme === 'light' ? 'text-slate-700 hover:text-blue-600' : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {allSelected ? (
                          <CheckSquare className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Square className={`w-4 h-4 ${adminTheme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
                        )}
                        <span>{allSelected ? 'Deselect All' : 'Select All Filtered'}</span>
                      </button>

                      <span className="text-slate-400">|</span>
                      <span className="text-slate-400">
                        Showing <strong className="text-cyan-500 font-bold">{logs.length}</strong> records
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {selectedVisitorIds.length > 0 && (
                        <button
                          type="button"
                          onClick={handleBatchDeleteVisitors}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/40 text-xs font-mono transition-all font-semibold"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Selected ({selectedVisitorIds.length})</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      className={`border-b text-[11px] font-mono uppercase tracking-wider ${
                        adminTheme === 'light'
                          ? 'border-slate-200 text-slate-600 bg-slate-100/60'
                          : 'border-white/10 text-slate-400 bg-black/20'
                      }`}
                    >
                      <th className="py-3 px-3 w-10">Select</th>
                      <th className="py-3 px-4">Visited At</th>
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-4">Device</th>
                      <th className="py-3 px-4">Browser & OS</th>
                      <th className="py-3 px-4">Page Path</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-mono">
                    {(() => {
                      const logs = (analytics?.recentVisitors || []).filter((v) => {
                        if (!isWithinDatePreset(v.visitedAt, visitorFilterDate)) return false;
                        if (visitorFilterDevice !== 'all' && v.deviceType !== visitorFilterDevice) return false;
                        if (visitorSearchQuery.trim()) {
                          const q = visitorSearchQuery.toLowerCase();
                          const matchIp = v.ipAddress?.toLowerCase().includes(q);
                          const matchPath = v.pagePath?.toLowerCase().includes(q);
                          const matchBrowser = v.browser?.toLowerCase().includes(q);
                          const matchOs = v.operatingSystem?.toLowerCase().includes(q);
                          const matchRef = v.referrer?.toLowerCase().includes(q);
                          if (!matchIp && !matchPath && !matchBrowser && !matchOs && !matchRef) return false;
                        }
                        return true;
                      });

                      if (logs.length === 0) {
                        return (
                          <tr>
                            <td colSpan={7} className="py-12 text-center text-slate-500">
                              No visitor traffic logs recorded under the active filter criteria.
                            </td>
                          </tr>
                        );
                      }

                      return logs.map((v) => {
                        const isSelected = selectedVisitorIds.includes(v.id);
                        return (
                          <tr
                            key={v.id}
                            className={`hover:bg-white/[0.03] transition-colors ${
                              isSelected ? 'bg-blue-500/5' : ''
                            }`}
                          >
                            <td className="py-3 px-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedVisitorIds((prev) => [...prev, v.id]);
                                  } else {
                                    setSelectedVisitorIds((prev) => prev.filter((id) => id !== v.id));
                                  }
                                }}
                                className="rounded border-slate-600 bg-transparent text-blue-500 focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                              {new Date(v.visitedAt).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 font-mono font-semibold text-cyan-400">
                              {v.ipAddress || '127.0.0.1'}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                                  v.deviceType === 'Mobile'
                                    ? 'bg-purple-500/10 text-purple-300 border-purple-500/30'
                                    : v.deviceType === 'Tablet'
                                    ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                                    : 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                                }`}
                              >
                                {v.deviceType}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-300">
                              {v.browser} on {v.operatingSystem}
                            </td>
                            <td className="py-3 px-4 text-slate-400 font-mono text-[11px] truncate max-w-[140px]">
                              {v.pagePath}
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteVisitor(v.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                title="Delete visitor log"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-6 text-left">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2.5">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <span>Contact Inquiries & Collaborations</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Manage incoming submissions, filter by read/reply status and date, reply directly, or bulk delete obsolete records.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleClearOldMessages(30)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    adminTheme === 'light'
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Clear &gt; 30 Days</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleClearOldMessages(60)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    adminTheme === 'light'
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300 shadow-sm'
                      : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear &gt; 60 Days</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <GlassCard className="p-4 space-y-4">
              {/* Status Filter Tabs */}
              <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
                {[
                  { key: 'ALL', label: 'All Inquiries', count: messages.length },
                  { key: 'NEW', label: 'Unread (New)', count: messages.filter((m) => m.status === 'NEW').length },
                  { key: 'READ', label: 'Read', count: messages.filter((m) => m.status === 'READ').length },
                  { key: 'REPLIED', label: 'Replied', count: messages.filter((m) => m.status === 'REPLIED').length },
                  { key: 'ARCHIVED', label: 'Archived', count: messages.filter((m) => m.status === 'ARCHIVED').length },
                ].map((tab) => {
                  const isActive = messageFilterStatus === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type="button"
                      onClick={() => setMessageFilterStatus(tab.key)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-2 border ${
                        isActive
                          ? 'bg-blue-600 text-white border-blue-500 shadow-[0_2px_10px_rgba(59,130,246,0.4)]'
                          : adminTheme === 'light'
                          ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-300/80 shadow-sm'
                          : 'bg-[#080d1a]/80 text-slate-300 hover:text-white border-white/10 hover:border-white/20'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span
                        className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                          isActive
                            ? 'bg-white/25 text-white'
                            : tab.key === 'NEW' && tab.count > 0
                            ? 'bg-rose-500/20 text-rose-400 animate-pulse'
                            : adminTheme === 'light'
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-black/40 text-slate-400'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Date & Keyword Search Bar */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[220px] relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by sender name, email, subject, message body..."
                    value={messageSearchQuery}
                    onChange={(e) => setMessageSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-8 py-2.5 rounded-xl text-xs font-mono transition-all outline-none border ${
                      adminTheme === 'light'
                        ? 'bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                        : 'bg-[#080d1a] text-white border-white/20 placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 shadow-inner'
                    }`}
                  />
                  {messageSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setMessageSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                    adminTheme === 'light'
                      ? 'bg-white text-slate-800 border-slate-300 shadow-sm hover:border-slate-400'
                      : 'bg-[#080d1a] text-slate-200 border-white/20 hover:border-white/30 shadow-inner'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <select
                    value={messageFilterDate}
                    onChange={(e) => setMessageFilterDate(e.target.value)}
                    className={`bg-transparent border-none text-xs font-mono focus:ring-0 cursor-pointer outline-none font-medium ${
                      adminTheme === 'light' ? 'text-slate-800' : 'text-slate-200 [&>option]:bg-[#0c1222] [&>option]:text-white'
                    }`}
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="custom">Custom Date Range...</option>
                  </select>
                </div>

                {messageFilterDate === 'custom' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={messageCustomStartDate}
                      onChange={(e) => setMessageCustomStartDate(e.target.value)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                        adminTheme === 'light'
                          ? 'bg-white text-slate-900 border-slate-300 shadow-sm'
                          : 'bg-[#080d1a] text-white border-white/20 shadow-inner'
                      }`}
                    />
                    <span className="text-slate-400 text-xs font-mono">to</span>
                    <input
                      type="date"
                      value={messageCustomEndDate}
                      onChange={(e) => setMessageCustomEndDate(e.target.value)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                        adminTheme === 'light'
                          ? 'bg-white text-slate-900 border-slate-300 shadow-sm'
                          : 'bg-[#080d1a] text-white border-white/20 shadow-inner'
                      }`}
                    />
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Bulk Selection & Actions Bar */}
            {(() => {
              const filtered = messages.filter((msg) => {
                if (messageFilterStatus !== 'ALL' && msg.status !== messageFilterStatus) return false;
                if (!isWithinDatePreset(msg.createdAt, messageFilterDate, messageCustomStartDate, messageCustomEndDate)) return false;
                if (messageSearchQuery.trim()) {
                  const q = messageSearchQuery.toLowerCase();
                  const matchName = msg.name?.toLowerCase().includes(q);
                  const matchEmail = msg.email?.toLowerCase().includes(q);
                  const matchSubject = msg.subject?.toLowerCase().includes(q);
                  const matchMsg = msg.message?.toLowerCase().includes(q);
                  const matchType = msg.inquiryType?.toLowerCase().includes(q);
                  if (!matchName && !matchEmail && !matchSubject && !matchMsg && !matchType) return false;
                }
                return true;
              });

              const allSelected = filtered.length > 0 && filtered.every((m) => selectedMessageIds.includes(m.id));

              return (
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-xl border text-xs font-mono transition-all ${
                    adminTheme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                      : 'bg-[#080d1a]/80 border-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (allSelected) {
                          setSelectedMessageIds([]);
                        } else {
                          setSelectedMessageIds(filtered.map((m) => m.id));
                        }
                      }}
                      className={`flex items-center gap-1.5 transition-colors ${
                        adminTheme === 'light' ? 'text-slate-700 hover:text-blue-600' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {allSelected ? (
                        <CheckSquare className="w-4 h-4 text-blue-500" />
                      ) : (
                        <Square className={`w-4 h-4 ${adminTheme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
                      )}
                      <span>{allSelected ? 'Deselect All' : 'Select All Filtered'}</span>
                    </button>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-400">
                      Showing <strong className="text-blue-500 font-bold">{filtered.length}</strong> of {messages.length} inquiries
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedMessageIds.length > 0 && (
                      <button
                        type="button"
                        onClick={handleBatchDeleteMessages}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-mono transition-all font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Selected ({selectedMessageIds.length})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Inquiries Cards List */}
            <div className="space-y-4">
              {(() => {
                const filtered = messages.filter((msg) => {
                  if (messageFilterStatus !== 'ALL' && msg.status !== messageFilterStatus) return false;
                  if (!isWithinDatePreset(msg.createdAt, messageFilterDate, messageCustomStartDate, messageCustomEndDate)) return false;
                  if (messageSearchQuery.trim()) {
                    const q = messageSearchQuery.toLowerCase();
                    const matchName = msg.name?.toLowerCase().includes(q);
                    const matchEmail = msg.email?.toLowerCase().includes(q);
                    const matchSubject = msg.subject?.toLowerCase().includes(q);
                    const matchMsg = msg.message?.toLowerCase().includes(q);
                    const matchType = msg.inquiryType?.toLowerCase().includes(q);
                    if (!matchName && !matchEmail && !matchSubject && !matchMsg && !matchType) return false;
                  }
                  return true;
                });

                if (filtered.length === 0) {
                  return (
                    <GlassCard className="text-center py-16 space-y-2">
                      <Mail className="w-8 h-8 text-slate-500 mx-auto" />
                      <div className="text-sm font-mono text-slate-400 font-bold">No Contact Inquiries Found</div>
                      <p className="text-xs font-mono text-slate-500">
                        No submissions match the current filter or search criteria.
                      </p>
                    </GlassCard>
                  );
                }

                return filtered.map((msg) => {
                  const isSelected = selectedMessageIds.includes(msg.id);
                  return (
                    <GlassCard
                      key={msg.id}
                      className={`p-5 space-y-3 transition-all ${
                        isSelected ? 'border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : ''
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedMessageIds((prev) => [...prev, msg.id]);
                              } else {
                                setSelectedMessageIds((prev) => prev.filter((id) => id !== msg.id));
                              }
                            }}
                            className="rounded border-slate-600 bg-transparent text-blue-500 focus:ring-0 cursor-pointer"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm">{msg.name}</span>
                              <span className="text-xs text-blue-400 font-mono">({msg.email})</span>
                              <NeonBadge variant="purple" size="sm">
                                {msg.inquiryType}
                              </NeonBadge>
                            </div>
                            <h4 className="text-xs font-semibold mt-0.5">{msg.subject}</h4>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${
                              msg.status === 'NEW'
                                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400 animate-pulse'
                                : msg.status === 'REPLIED'
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400'
                                : msg.status === 'ARCHIVED'
                                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400'
                                : 'bg-slate-500/15 border-slate-500/40 text-slate-400'
                            }`}
                          >
                            {msg.status}
                          </span>
                          <span className="text-[10px] font-mono text-slate-500">
                            {new Date(msg.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <p
                        className={`text-xs p-3.5 rounded-xl border whitespace-pre-line leading-relaxed ${
                          adminTheme === 'light'
                            ? 'bg-slate-50 border-slate-200 text-slate-700'
                            : 'bg-black/30 border-white/5 text-slate-300'
                        }`}
                      >
                        {msg.message}
                      </p>

                      <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <a
                          href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-xs font-mono text-blue-400 border border-blue-500/30 transition-all font-semibold"
                        >
                          <Mail className="w-3 h-3" /> Compose Email Reply
                        </a>

                        <div className="flex items-center gap-1.5">
                          {msg.status !== 'READ' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateMessageStatus(msg.id, 'READ')}
                              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-[11px] font-mono text-slate-300 border border-white/10 transition-colors"
                            >
                              Mark Read
                            </button>
                          )}
                          {msg.status !== 'REPLIED' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateMessageStatus(msg.id, 'REPLIED')}
                              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-[11px] font-mono text-emerald-400 border border-emerald-500/30 transition-colors"
                            >
                              Mark Replied
                            </button>
                          )}
                          {msg.status !== 'ARCHIVED' && (
                            <button
                              type="button"
                              onClick={() => handleUpdateMessageStatus(msg.id, 'ARCHIVED')}
                              className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-[11px] font-mono text-amber-400 border border-amber-500/30 transition-colors"
                            >
                              Archive
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => handleDeleteMessage(msg.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                            title="Delete inquiry permanently"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </GlassCard>
                  );
                });
              })()}
            </div>
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="space-y-6 text-left">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <span>Security & Administrative Audit Logs</span>
                </h2>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Comprehensive audit trail of administrative operations, record mutations, logins, and settings updates.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleClearOldAuditLogs(30)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    adminTheme === 'light'
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border-amber-300 shadow-sm'
                      : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Clear &gt; 30 Days</span>
                </button>
                <button
                  type="button"
                  onClick={handleClearAllAuditLogs}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                    adminTheme === 'light'
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300 shadow-sm'
                      : 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border-rose-500/30'
                  }`}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All Logs</span>
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <GlassCard className="p-4 space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex-1 min-w-[220px] relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search logs by admin, entity, action, details, IP..."
                    value={auditSearchQuery}
                    onChange={(e) => setAuditSearchQuery(e.target.value)}
                    className={`w-full pl-9 pr-8 py-2.5 rounded-xl text-xs font-mono transition-all outline-none border ${
                      adminTheme === 'light'
                        ? 'bg-white text-slate-900 border-slate-300 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 shadow-sm'
                        : 'bg-[#080d1a] text-white border-white/20 placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 shadow-inner'
                    }`}
                  />
                  {auditSearchQuery && (
                    <button
                      type="button"
                      onClick={() => setAuditSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-0.5"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                    adminTheme === 'light'
                      ? 'bg-white text-slate-800 border-slate-300 shadow-sm hover:border-slate-400'
                      : 'bg-[#080d1a] text-slate-200 border-white/20 hover:border-white/30 shadow-inner'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <select
                    value={auditFilterAction}
                    onChange={(e) => setAuditFilterAction(e.target.value)}
                    className={`bg-transparent border-none text-xs font-mono focus:ring-0 cursor-pointer outline-none font-medium ${
                      adminTheme === 'light' ? 'text-slate-800' : 'text-slate-200 [&>option]:bg-[#0c1222] [&>option]:text-white'
                    }`}
                  >
                    <option value="ALL">All Actions</option>
                    <option value="CREATE">CREATE</option>
                    <option value="UPDATE">UPDATE</option>
                    <option value="DELETE">DELETE</option>
                    <option value="LOGIN">LOGIN</option>
                    <option value="SETTINGS">SETTINGS</option>
                  </select>
                </div>

                <div
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-mono transition-all ${
                    adminTheme === 'light'
                      ? 'bg-white text-slate-800 border-slate-300 shadow-sm hover:border-slate-400'
                      : 'bg-[#080d1a] text-slate-200 border-white/20 hover:border-white/30 shadow-inner'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <select
                    value={auditFilterDate}
                    onChange={(e) => setAuditFilterDate(e.target.value)}
                    className={`bg-transparent border-none text-xs font-mono focus:ring-0 cursor-pointer outline-none font-medium ${
                      adminTheme === 'light' ? 'text-slate-800' : 'text-slate-200 [&>option]:bg-[#0c1222] [&>option]:text-white'
                    }`}
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="7days">Last 7 Days</option>
                    <option value="30days">Last 30 Days</option>
                    <option value="custom">Custom Date Range...</option>
                  </select>
                </div>

                {auditFilterDate === 'custom' && (
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={auditCustomStartDate}
                      onChange={(e) => setAuditCustomStartDate(e.target.value)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                        adminTheme === 'light'
                          ? 'bg-white text-slate-900 border-slate-300 shadow-sm'
                          : 'bg-[#080d1a] text-white border-white/20 shadow-inner'
                      }`}
                    />
                    <span className="text-slate-400 text-xs font-mono">to</span>
                    <input
                      type="date"
                      value={auditCustomEndDate}
                      onChange={(e) => setAuditCustomEndDate(e.target.value)}
                      className={`px-3 py-2 rounded-xl text-xs font-mono border transition-all ${
                        adminTheme === 'light'
                          ? 'bg-white text-slate-900 border-slate-300 shadow-sm'
                          : 'bg-[#080d1a] text-white border-white/20 shadow-inner'
                      }`}
                    />
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Bulk Selection Bar */}
            {(() => {
              const filtered = auditLogs.filter((log) => {
                if (auditFilterAction !== 'ALL' && log.action !== auditFilterAction) return false;
                if (!isWithinDatePreset(log.createdAt, auditFilterDate, auditCustomStartDate, auditCustomEndDate)) return false;
                if (auditSearchQuery.trim()) {
                  const q = auditSearchQuery.toLowerCase();
                  const matchAdmin = log.adminUsername?.toLowerCase().includes(q);
                  const matchAction = log.action?.toLowerCase().includes(q);
                  const matchEntity = log.entityName?.toLowerCase().includes(q);
                  const matchDetails = log.details?.toLowerCase().includes(q);
                  const matchIp = log.ipAddress?.toLowerCase().includes(q);
                  if (!matchAdmin && !matchAction && !matchEntity && !matchDetails && !matchIp) return false;
                }
                return true;
              });

              const allSelected = filtered.length > 0 && filtered.every((l) => selectedAuditLogIds.includes(l.id));

              return (
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 py-2.5 px-4 rounded-xl border text-xs font-mono transition-all ${
                    adminTheme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                      : 'bg-[#080d1a]/80 border-white/10 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (allSelected) {
                          setSelectedAuditLogIds([]);
                        } else {
                          setSelectedAuditLogIds(filtered.map((l) => l.id));
                        }
                      }}
                      className={`flex items-center gap-1.5 transition-colors ${
                        adminTheme === 'light' ? 'text-slate-700 hover:text-purple-600' : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      {allSelected ? (
                        <CheckSquare className="w-4 h-4 text-purple-500" />
                      ) : (
                        <Square className={`w-4 h-4 ${adminTheme === 'light' ? 'text-slate-400' : 'text-slate-500'}`} />
                      )}
                      <span>{allSelected ? 'Deselect All' : 'Select All Filtered'}</span>
                    </button>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-400">
                      Showing <strong className="text-purple-500 font-bold">{filtered.length}</strong> of {auditLogs.length} audit logs
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {selectedAuditLogIds.length > 0 && (
                      <button
                        type="button"
                        onClick={handleBatchDeleteAuditLogs}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-mono transition-all font-semibold"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Selected ({selectedAuditLogIds.length})</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}

            {/* Audit Logs Table */}
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[11px] font-mono text-slate-400 uppercase tracking-wider bg-black/20">
                      <th className="py-3 px-3 w-10">Select</th>
                      <th className="py-3 px-4">Timestamp</th>
                      <th className="py-3 px-4">Admin</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Entity</th>
                      <th className="py-3 px-4">Details</th>
                      <th className="py-3 px-4">IP Address</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-xs font-mono">
                    {(() => {
                      const filtered = auditLogs.filter((log) => {
                        if (auditFilterAction !== 'ALL' && log.action !== auditFilterAction) return false;
                        if (!isWithinDatePreset(log.createdAt, auditFilterDate, auditCustomStartDate, auditCustomEndDate)) return false;
                        if (auditSearchQuery.trim()) {
                          const q = auditSearchQuery.toLowerCase();
                          const matchAdmin = log.adminUsername?.toLowerCase().includes(q);
                          const matchAction = log.action?.toLowerCase().includes(q);
                          const matchEntity = log.entityName?.toLowerCase().includes(q);
                          const matchDetails = log.details?.toLowerCase().includes(q);
                          const matchIp = log.ipAddress?.toLowerCase().includes(q);
                          if (!matchAdmin && !matchAction && !matchEntity && !matchDetails && !matchIp) return false;
                        }
                        return true;
                      });

                      if (filtered.length === 0) {
                        return (
                          <tr>
                            <td colSpan={8} className="py-12 text-center text-slate-500">
                              No audit records match the current filter or search criteria.
                            </td>
                          </tr>
                        );
                      }

                      return filtered.map((log) => {
                        const isSelected = selectedAuditLogIds.includes(log.id);
                        return (
                          <tr
                            key={log.id}
                            className={`hover:bg-white/[0.03] transition-colors ${
                              isSelected ? 'bg-purple-500/5' : ''
                            }`}
                          >
                            <td className="py-3 px-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedAuditLogIds((prev) => [...prev, log.id]);
                                  } else {
                                    setSelectedAuditLogIds((prev) => prev.filter((id) => id !== log.id));
                                  }
                                }}
                                className="rounded border-slate-600 bg-transparent text-purple-500 focus:ring-0 cursor-pointer"
                              />
                            </td>
                            <td className="py-3 px-4 text-slate-400 whitespace-nowrap">
                              {new Date(log.createdAt).toLocaleString()}
                            </td>
                            <td className="py-3 px-4 text-cyan-400 font-semibold">{log.adminUsername}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${
                                  log.action === 'CREATE'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                    : log.action === 'DELETE'
                                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                    : log.action === 'LOGIN'
                                    ? 'bg-purple-500/10 border-purple-500/30 text-purple-300'
                                    : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
                                }`}
                              >
                                {log.action}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-purple-400 font-medium">{log.entityName}</td>
                            <td className="py-3 px-4 text-slate-300 max-w-xs truncate" title={log.details}>
                              {log.details}
                            </td>
                            <td className="py-3 px-4 text-slate-500">{log.ipAddress || '127.0.0.1'}</td>
                            <td className="py-3 px-4 text-right">
                              <button
                                type="button"
                                onClick={() => handleDeleteAuditLog(log.id)}
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                                title="Delete audit log entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Settings className="w-5 h-5 text-blue-400" />
                <span>Site Settings & Dynamic Metrics</span>
              </h2>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Customize your live DSA counters, availability status, social media links, and branding directly.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="space-y-8">
              <GlassCard className="p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Upload className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    Home Tab Hero Picture (3D Avatar / Portrait)
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative w-32 h-40 rounded-2xl overflow-hidden border border-white/20 bg-[#060913] shadow-lg flex-shrink-0 group">
                    <img
                      src={resolveAssetUrl(settings.hero_avatar_url || profile?.portrait3dUrl) || '/assets/hero.png'}
                      alt="Hero Preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/hero.png';
                      }}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-mono text-white text-center p-1">
                      Active Avatar
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                        Upload New Photo / 3D Avatar
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer px-4 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploading ? 'Uploading...' : 'Choose Image File'}</span>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/webp,image/svg+xml"
                            disabled={uploading}
                            className="hidden"
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              setUploading(true);
                              try {
                                const res = await uploadAdminFile(file, false);
                                setSettings((prev) => ({
                                  ...prev,
                                  hero_avatar_url: res.fileUrl,
                                }));
                                if (profile) {
                                  setProfile((prev) => (prev ? { ...prev, portrait3dUrl: res.fileUrl } : null));
                                }
                                showNotice('success', 'Hero image uploaded! Click "Save Settings & Metrics" to apply.');
                              } catch (err: unknown) {
                                showNotice('error', err instanceof Error ? err.message : 'Image upload failed');
                              } finally {
                                setUploading(false);
                              }
                            }}
                          />
                        </label>

                        {settings.hero_avatar_url && (
                          <button
                            type="button"
                            onClick={() => {
                              setSettings((prev) => ({ ...prev, hero_avatar_url: '' }));
                              showNotice('success', 'Reset to default hero avatar. Remember to save!');
                            }}
                            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-xs font-mono text-slate-400 hover:text-rose-300 transition-all"
                          >
                            Reset to Default
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] font-mono text-slate-400 mt-1.5">
                        Supports WebP, PNG, JPEG up to 5MB. Directly updates the large hero frame on the Home tab.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Or Image URL / Relative Path
                      </label>
                      <input
                        type="text"
                        value={settings.hero_avatar_url || ''}
                        onChange={(e) =>
                          setSettings({ ...settings, hero_avatar_url: e.target.value })
                        }
                        placeholder="/uploads/... or https://..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <FileDown className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                        Curriculum Vitae &amp; Resume Control
                      </h3>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                        Directly controls the &quot;Download Resume&quot; button in the Home Hero section of the portfolio.
                      </p>
                    </div>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                      settings.resume_url
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {settings.resume_url ? '● Custom File Active' : '○ Default (/resume.pdf)'}
                  </span>
                </div>

                {/* Dedicated Live Resume Preview Box */}
                {(() => {
                  const activeResumePath = settings.resume_url || profile?.resumeUrl || '/resume.pdf';
                  const isCustom = Boolean(settings.resume_url || profile?.resumeUrl);
                  const fullUrl = resolveAssetUrl(activeResumePath);

                  return (
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                          <FileText className="w-6 h-6" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs font-mono font-bold text-white truncate">
                              {isCustom ? 'Active Uploaded Resume Document' : 'Default Portfolio Resume'}
                            </h4>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                              isCustom
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : 'bg-slate-700/50 text-slate-300 border-slate-600'
                            }`}>
                              PDF
                            </span>
                          </div>
                          <p className="text-[11px] font-mono text-slate-400 truncate max-w-md mt-0.5" title={activeResumePath}>
                            {activeResumePath}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                        <a
                          href={fullUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all cursor-pointer"
                          title="Document Overview"
                        >
                          <span>Document Overview</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })()}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-xs font-mono font-semibold text-slate-300">
                      Upload New Resume Document (PDF / DOCX)
                    </label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all shadow-sm">
                        <Upload className="w-4 h-4" />
                        <span>{uploadingResume ? 'Uploading Document...' : 'Choose Resume File'}</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,application/pdf"
                          disabled={uploadingResume}
                          className="hidden"
                          onChange={handleResumeUpload}
                        />
                      </label>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400">
                      Uploading automatically generates an accessible URL and links it to the homepage hero download button.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-xs font-mono font-semibold text-slate-300">
                      Resume URL or File Path
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={settings.resume_url || ''}
                        onChange={(e) => setSettings((prev) => ({ ...prev, resume_url: e.target.value }))}
                        placeholder="/resume.pdf or https://drive.google.com/..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 font-mono text-xs focus:outline-none focus:border-emerald-500"
                      />
                      {settings.resume_url && (
                        <a
                          href={resolveAssetUrl(settings.resume_url || profile?.resumeUrl)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 hover:text-emerald-300 text-xs font-mono flex items-center gap-1.5 transition-all flex-shrink-0"
                          title="Document Overview"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Overview</span>
                        </a>
                      )}
                    </div>
                    {settings.resume_url && (
                      <button
                        type="button"
                        onClick={() => {
                          setSettings((prev) => ({ ...prev, resume_url: '' }));
                          if (profile) {
                            setProfile((prev) => (prev ? { ...prev, resumeUrl: '' } : null));
                          }
                          showNotice('success', 'Reset to default /resume.pdf. Click Save Settings to persist.');
                        }}
                        className="text-[11px] font-mono text-rose-400 hover:text-rose-300 hover:underline inline-block"
                      >
                        Reset to default (/resume.pdf)
                      </button>
                    )}
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    Home Hero Dynamic Metrics
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                      DSA Solved Metric Count *
                    </label>
                    <input
                      type="text"
                      value={settings.dsa_solved_count || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, dsa_solved_count: e.target.value })
                      }
                      placeholder="e.g. 150+ or 200+"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-emerald-400 font-mono text-sm focus:outline-none focus:border-emerald-500"
                    />
                    <p className="text-[11px] font-mono text-slate-400 mt-1">
                      Updates the green metric counter in the Home Hero section.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                      Availability Status Badge *
                    </label>
                    <input
                      type="text"
                      value={settings.availability_badge || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, availability_badge: e.target.value })
                      }
                      placeholder="e.g. Available for Full-Stack & AI Roles"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-sm focus:outline-none focus:border-cyan-500"
                    />
                    <p className="text-[11px] font-mono text-slate-400 mt-1">
                      Displayed on the pulsing emerald badge at top of the page.
                    </p>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Globe className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    Social &amp; Competitive Programming Profiles
                  </h3>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Icons will appear automatically in your Hero section and Footer whenever a link is provided.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      GitHub URL
                    </label>
                    <input
                      type="url"
                      value={settings.github_url || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, github_url: e.target.value })
                      }
                      placeholder="https://github.com/kanhaiya28pandey/"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={settings.linkedin_url || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, linkedin_url: e.target.value })
                      }
                      placeholder="https://www.linkedin.com/in/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      LeetCode URL
                    </label>
                    <input
                      type="url"
                      value={settings.leetcode_url || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, leetcode_url: e.target.value })
                      }
                      placeholder="https://leetcode.com/u/kanhaiya28pandey/"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      GeeksforGeeks URL
                    </label>
                    <input
                      type="url"
                      value={settings.gfg_url || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, gfg_url: e.target.value })
                      }
                      placeholder="https://www.geeksforgeeks.org/user/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Codeforces URL
                    </label>
                    <input
                      type="url"
                      value={settings.codeforces_url || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, codeforces_url: e.target.value })
                      }
                      placeholder="https://codeforces.com/profile/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Instagram URL
                    </label>
                    <input
                      type="url"
                      value={settings.instagram_url || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, instagram_url: e.target.value })
                      }
                      placeholder="https://instagram.com/..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold text-emerald-400">
                      WhatsApp Number (Active Link) *
                    </label>
                    <input
                      type="text"
                      value={settings.whatsapp_number || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, whatsapp_number: e.target.value })
                      }
                      placeholder="+91 9801573326"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-emerald-500/30 text-emerald-400 font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Direct WhatsApp link on Home Hero and About Me sections.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold text-sky-400">
                      Phone Number (Call / Dial) *
                    </label>
                    <input
                      type="text"
                      value={settings.phone_number || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, phone_number: e.target.value })
                      }
                      placeholder="+91 9801573326"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-sky-500/30 text-sky-400 font-mono text-xs focus:outline-none focus:border-sky-500"
                    />
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Direct phone dialer link on Home Hero bar.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={settings.email || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, email: e.target.value })
                      }
                      placeholder="kanhaiya542112@gmail.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <span>Additional &amp; Custom Platform Links</span>
                        <NeonBadge variant="blue" size="sm">
                          {customSocialList.length} Added
                        </NeonBadge>
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                        Add links for HackerRank, CodeChef, Kaggle, Twitter / X, YouTube, or any custom platform.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCustomSocialList([
                          ...customSocialList,
                          { platform: '', url: '' },
                        ])
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:text-white text-xs font-mono font-semibold transition-all shadow-sm self-start sm:self-auto"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Platform Link</span>
                    </button>
                  </div>

                  {customSocialList.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center p-3 rounded-xl bg-white/[0.02] border border-white/5"
                    >
                      <div className="sm:col-span-4">
                        <label className="block text-[10px] font-mono text-slate-400 mb-0.5 font-medium">
                          Platform Name
                        </label>
                        <input
                          type="text"
                          value={item.platform}
                          onChange={(e) => {
                            const updated = [...customSocialList];
                            updated[idx].platform = e.target.value;
                            setCustomSocialList(updated);
                          }}
                          placeholder="e.g. HackerRank, Kaggle"
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="sm:col-span-7">
                        <label className="block text-[10px] font-mono text-slate-400 mb-0.5 font-medium">
                          Profile URL
                        </label>
                        <input
                          type="url"
                          value={item.url}
                          onChange={(e) => {
                            const updated = [...customSocialList];
                            updated[idx].url = e.target.value;
                            setCustomSocialList(updated);
                          }}
                          placeholder="https://..."
                          className="w-full px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="sm:col-span-1 flex justify-end pt-3 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = customSocialList.filter((_, i) => i !== idx);
                            setCustomSocialList(updated);
                          }}
                          className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-200 border border-rose-500/20 transition-all"
                          title="Remove this platform link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {customSocialList.length === 0 && (
                    <div className="text-center py-5 rounded-xl border border-dashed border-white/10 text-slate-500 font-mono text-xs">
                      No custom platforms added yet. Click &quot;Add Platform Link&quot; above to add HackerRank, CodeChef, Kaggle, Twitter/X, YouTube, etc.
                    </div>
                  )}
                </div>
              </GlassCard>

              <GlassCard className="p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    About Me Section Customization
                  </h3>
                </div>
                <p className="text-xs font-mono text-slate-400">
                  Manage the circular photo, stream badge, concise description, and location in the About Me section.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                      Stream / Role Badge
                    </label>
                    <input
                      type="text"
                      value={settings.about_stream_badge || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, about_stream_badge: e.target.value })
                      }
                      placeholder="Software Engineer"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Displayed on the circular photo badge (e.g. Software Engineer or Computer Applications).
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                      Location
                    </label>
                    <input
                      type="text"
                      value={settings.about_location || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, about_location: e.target.value })
                      }
                      placeholder="Chengalpattu, Chennai, Tamil Nadu"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-purple-300 font-mono text-xs focus:outline-none focus:border-purple-500"
                    />
                    <p className="text-[10px] font-mono text-slate-400 mt-1">
                      Location card displayed in the About Me section.
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                      About Me Short Bio &amp; Story (Plain English)
                    </label>
                    <textarea
                      rows={3}
                      value={settings.about_text || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, about_text: e.target.value })
                      }
                      placeholder="Concise description about your skills, engineering passion, and values..."
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2 pt-3 border-t border-white/10">
                    <label className="block text-xs font-mono text-slate-300 mb-2 font-semibold">
                      About Circle Photo (Circular Frame on About Section)
                    </label>
                    <div className="flex flex-col sm:flex-row items-center gap-5">
                      <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-purple-500/40 bg-[#060913] shadow-lg flex-shrink-0 group">
                        <img
                          src={resolveAssetUrl(settings.about_avatar_url || profile?.avatarUrl) || '/assets/kanhaiya_real.jpg'}
                          alt="About Preview"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/kanhaiya_real.jpg';
                          }}
                          className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[9px] font-mono text-white text-center p-1 rounded-full">
                          About Photo
                        </div>
                      </div>

                      <div className="flex-1 space-y-3 w-full">
                        <div className="flex items-center gap-3">
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-mono flex items-center gap-2 transition-all">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploading ? 'Uploading...' : 'Upload New Photo'}</span>
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/svg+xml"
                              disabled={uploading}
                              className="hidden"
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setUploading(true);
                                try {
                                  const res = await uploadAdminFile(file, false);
                                  setSettings((prev) => ({
                                    ...prev,
                                    about_avatar_url: res.fileUrl,
                                  }));
                                  if (profile) {
                                    setProfile((prev) => (prev ? { ...prev, avatarUrl: res.fileUrl } : null));
                                  }
                                  showNotice('success', 'About photo uploaded! Remember to click "Save Settings" below.');
                                } catch (err: unknown) {
                                  showNotice('error', err instanceof Error ? err.message : 'Photo upload failed');
                                } finally {
                                  setUploading(false);
                                }
                              }}
                            />
                          </label>

                          {settings.about_avatar_url && (
                            <button
                              type="button"
                              onClick={() => {
                                setSettings((prev) => ({ ...prev, about_avatar_url: '' }));
                                showNotice('success', 'Reset to default about photo. Remember to save settings!');
                              }}
                              className="px-3 py-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10 hover:border-rose-500/30 text-xs font-mono text-slate-400 hover:text-rose-300 transition-all"
                            >
                              Reset to Default
                            </button>
                          )}
                        </div>

                        <div>
                          <input
                            type="text"
                            value={settings.about_avatar_url || ''}
                            onChange={(e) =>
                              setSettings({ ...settings, about_avatar_url: e.target.value })
                            }
                            placeholder="/uploads/... or https://..."
                            className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-purple-300 font-mono text-xs focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-6 space-y-5">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Globe className="w-4 h-4 text-purple-400" />
                  <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                    Site Branding &amp; Links
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Browser Tab / Site Title
                    </label>
                    <input
                      type="text"
                      value={settings.site_title || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, site_title: e.target.value })
                      }
                      placeholder="Kanhaiya | techwithkanhaiya"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-mono text-xs focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-700 mb-1">
                      Support UPI ID
                    </label>
                    <input
                      type="text"
                      value={settings.support_coffee_url || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, support_coffee_url: e.target.value })
                      }
                      placeholder="e.g. pandey123@okhdfcbank"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 dark:bg-white/5 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-300 text-slate-200 dark:text-slate-200 light:text-slate-900 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                    <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-400 light:text-slate-500">
                      Enter your UPI ID (e.g. <span className="text-amber-400 font-mono">pandey123@okhdfcbank</span>) for instant QR code generation and direct UPI payments.
                    </p>
                  </div>
                </div>
              </GlassCard>

              {/* Email Service & Delivery Diagnostic Card */}
              <GlassCard className="p-6 space-y-5 border-blue-500/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <div>
                      <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                        Email Dispatch &amp; Port Unblock Diagnostic
                      </h3>
                      <p className="text-[11px] text-slate-400 font-mono">
                        Instant notification forwarding when visitors submit contact forms.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleTestEmailDispatch}
                    disabled={testingEmail}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md disabled:opacity-50 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{testingEmail ? 'Sending Test...' : 'Send Test Email'}</span>
                  </button>
                </div>

                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 text-xs font-mono text-slate-300 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-blue-400">
                    <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                    <span>Important: Render Free Tier SMTP Restriction</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Render free instances block outbound SMTP ports (25, 465, 587). To receive email alerts on Render Free Tier, provide a free <strong className="text-cyan-300">Resend API Key</strong> (3,000 emails/mo free via <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="underline text-blue-400">resend.com</a>) or <strong className="text-amber-300">Web3Forms Key</strong> (<a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="underline text-amber-400">web3forms.com</a>). HTTPS port 443 is 100% open and delivers directly to your Gmail inbox.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                      Recipient Email (Your Inbox) *
                    </label>
                    <input
                      type="email"
                      value={settings.recipient_email ?? 'kanhaiya542112@gmail.com'}
                      onChange={(e) =>
                        setSettings({ ...settings, recipient_email: e.target.value })
                      }
                      placeholder="kanhaiya542112@gmail.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
                    />
                    <p className="mt-1 text-[10px] text-slate-400 font-mono">
                      Where inquiries are forwarded.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                      Resend API Key (Recommended)
                    </label>
                    <input
                      type="password"
                      value={settings.resend_api_key || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, resend_api_key: e.target.value })
                      }
                      placeholder="re_xxxxxxxxxxxx"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-emerald-300 font-mono text-xs focus:outline-none focus:border-emerald-500"
                    />
                    <p className="mt-1 text-[10px] text-slate-400 font-mono">
                      Free tier: 3,000 emails/mo via resend.com
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1 font-semibold">
                      Web3Forms Access Key
                    </label>
                    <input
                      type="password"
                      value={settings.web3forms_key || ''}
                      onChange={(e) =>
                        setSettings({ ...settings, web3forms_key: e.target.value })
                      }
                      placeholder="Access Key from web3forms.com"
                      className="w-full px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-500"
                    />
                    <p className="mt-1 text-[10px] text-slate-400 font-mono">
                      Alternative HTTP relay via web3forms.com
                    </p>
                  </div>
                </div>

                {emailDiagnosticReport && (
                  <div
                    className={`p-4 rounded-xl border text-xs font-mono space-y-2 ${
                      emailDiagnosticReport.success
                        ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                        : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold">
                        {emailDiagnosticReport.success ? (
                          <CheckCircle className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                        )}
                        <span>
                          {emailDiagnosticReport.success
                            ? 'DISPATCH SUCCESS'
                            : 'DISPATCH ERROR / NOTICE'}
                        </span>
                      </div>
                      {emailDiagnosticReport.timestamp && (
                        <span className="text-[10px] text-slate-400">
                          {emailDiagnosticReport.timestamp}
                        </span>
                      )}
                    </div>
                    <p className="text-white font-semibold">
                      {emailDiagnosticReport.message}
                    </p>
                    {emailDiagnosticReport.channel && (
                      <div className="text-[11px] text-slate-300">
                        Active Channel: <strong className="text-cyan-400">{emailDiagnosticReport.channel}</strong>
                      </div>
                    )}
                    {emailDiagnosticReport.troubleshooting && (
                      <p className="text-[11px] text-amber-300/90 leading-relaxed pt-1 border-t border-white/10">
                        💡 {emailDiagnosticReport.troubleshooting}
                      </p>
                    )}
                  </div>
                )}
              </GlassCard>

              <div className="flex items-center justify-end gap-3 pt-2">
                <FuturisticButton
                  type="submit"
                  size="md"
                  variant="primary"
                  icon={<Save className="w-4 h-4" />}
                >
                  {savingSettings ? 'Saving Settings...' : 'Save Settings & Metrics'}
                </FuturisticButton>
              </div>
            </form>
          </div>
        )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
