export type ContentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
export type InquiryType = 'JOB' | 'INTERNSHIP' | 'COLLABORATION' | 'FREELANCE' | 'GENERAL';
export type MessageStatus = 'NEW' | 'READ' | 'REPLIED' | 'ARCHIVED';

export interface Profile {
  id?: number;
  fullName: string;
  title: string;
  bio: string;
  aboutMarkdown: string;
  avatarUrl?: string;
  portrait3dUrl?: string;
  resumeUrl?: string;
  availabilityStatus: string;
  location?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  coffeeUrl?: string;
  leetcodeUrl?: string;
  gfgUrl?: string;
  codeforcesUrl?: string;
  instagramUrl?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string; // FRONTEND, BACKEND, DATABASE, TOOLS, CORE
  proficiencyLevel: string; // BEGINNER, LEARNING, INTERMEDIATE, ADVANCED, STRONG
  description?: string;
  iconKey?: string;
  displayOrder: number;
  status: ContentStatus;
  relatedConcepts?: string[];
  usedInProjects?: string[];
  proficiencyPercentage?: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  summary: string;
  descriptionMarkdown?: string;
  thumbnailUrl?: string;
  bannerUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  category: string; // FULLSTACK, BACKEND, FRONTEND
  isFeatured?: boolean;
  featured?: boolean;
  displayOrder: number;
  status: ContentStatus;
  skills?: Skill[];
  skillIds?: number[];
  tag?: string;
}

export interface ExperienceCertificate {
  id?: string | number;
  title: string;
  fileUrl: string;
  type?: string; // e.g. "CERTIFICATE", "LETTER", "LOR", "OFFER_LETTER", "NDA"
  issuer?: string;
  description?: string;
}

export interface Experience {
  id: number;
  organization: string;
  role: string;
  location?: string;
  duration: string;
  descriptionMarkdown: string;
  isCurrent: boolean;
  displayOrder: number;
  status: ContentStatus;
  employmentType?: string; // e.g. "Fully Remote", "Virtual Internship", "Full Time", "Hybrid"
  assignedProjectName?: string;
  assignedProjectSlug?: string;
  technologies?: string;
  certificatesJson?: string;
  certificates?: ExperienceCertificate[];
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  duration: string;
  gradeOrPercentage?: string;
  description?: string;
  displayOrder: number;
  status: ContentStatus;
  certificatesJson?: string;
  certificates?: ExperienceCertificate[];
}

export interface Certificate {
  id: number;
  title: string;
  issuingOrg: string;
  issueDate: string;
  credentialUrl?: string;
  thumbnailUrl?: string;
  iconKey?: string;
  displayOrder: number;
  status: ContentStatus;
}

export interface Achievement {
  id: number;
  title: string;
  metricValue: string;
  description?: string;
  descriptionMarkdown?: string;
  organization?: string;
  issueDate?: string;
  proofUrl?: string;
  iconKey?: string;
  displayOrder: number;
  status: ContentStatus;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: InquiryType;
  website?: string; // honeypot
}

export interface PortfolioOverview {
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  educations: Education[];
  certificates: Certificate[];
  achievements: Achievement[];
  settings: Record<string, string>;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: InquiryType;
  status: MessageStatus;
  ipAddress?: string;
  createdAt: string;
  repliedAt?: string;
}

export interface AuditLog {
  id: number;
  adminUsername: string;
  action: string;
  entityName: string;
  entityId: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}

export interface DashboardSummary {
  totalProjects: number;
  totalSkills: number;
  unreadMessages: number;
  recentAuditLogs: AuditLog[];
}

export interface AdminUser {
  username: string;
  role: string;
  authenticated: boolean;
}

export interface VisitorLog {
  id: number;
  ipAddress: string;
  userAgent: string;
  deviceType: string;
  browser: string;
  operatingSystem: string;
  referrer?: string;
  pagePath: string;
  visitedAt: string;
}

export interface AnalyticsSummary {
  totalVisits: number;
  uniqueVisitors: number;
  todayVisits: number;
  thisWeekVisits: number;
  totalInquiries: number;
  conversionRate: number;
  deviceBreakdown: Record<string, number>;
  browserBreakdown: Record<string, number>;
  dailyVisits: Array<{ date: string; count: number }>;
  recentVisitors: VisitorLog[];
}
