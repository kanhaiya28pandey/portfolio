import React, { useEffect, useState } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { LazySection } from '../components/common/LazySection';
import { fetchPortfolioOverview, DEFAULT_PORTFOLIO_DATA } from '../services/api';
import type { PortfolioOverview } from '../types/portfolio';

// Progressive code-split lazy imports for below-the-fold heavy sections
const ExploreSection = React.lazy(() =>
  import('../sections/ExploreSection').then((m) => ({ default: m.ExploreSection }))
);
const AboutSection = React.lazy(() =>
  import('../sections/AboutSection').then((m) => ({ default: m.AboutSection }))
);
const SkillsUniverseSection = React.lazy(() =>
  import('../sections/SkillsUniverseSection').then((m) => ({ default: m.SkillsUniverseSection }))
);
const ProjectsSection = React.lazy(() =>
  import('../sections/ProjectsSection').then((m) => ({ default: m.ProjectsSection }))
);
const ExperienceSection = React.lazy(() =>
  import('../sections/ExperienceSection').then((m) => ({ default: m.ExperienceSection }))
);
const EducationSection = React.lazy(() =>
  import('../sections/EducationSection').then((m) => ({ default: m.EducationSection }))
);
const CertificatesSection = React.lazy(() =>
  import('../sections/CertificatesSection').then((m) => ({ default: m.CertificatesSection }))
);
const AchievementsSection = React.lazy(() =>
  import('../sections/AchievementsSection').then((m) => ({ default: m.AchievementsSection }))
);
const WorkWithMeSection = React.lazy(() =>
  import('../sections/WorkWithMeSection').then((m) => ({ default: m.WorkWithMeSection }))
);
const ContactSection = React.lazy(() =>
  import('../sections/ContactSection').then((m) => ({ default: m.ContactSection }))
);

export const HomePage: React.FC = () => {
  const [data, setData] = useState<PortfolioOverview>(DEFAULT_PORTFOLIO_DATA);

  useEffect(() => {
    let isMounted = true;
    fetchPortfolioOverview().then((overview) => {
      if (isMounted && overview) {
        setData(overview);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  let customSocialLinks: Array<{ platform: string; url: string }> = [];
  try {
    if (data.settings?.custom_social_links) {
      customSocialLinks = JSON.parse(data.settings.custom_social_links);
    }
  } catch {
    customSocialLinks = [];
  }

  const heroAvatarUrl = data.settings?.hero_avatar_url || data.profile.portrait3dUrl;

  const socialLinksConfig = {
    github: data.settings?.github_url || data.profile.githubUrl || 'https://github.com/kanhaiya28pandey/',
    linkedin: data.settings?.linkedin_url || data.profile.linkedinUrl || 'https://www.linkedin.com/in/kanhaiya-pandey-3856743a7/',
    email: data.settings?.email || data.profile.email || 'kanhaiya542112@gmail.com',
    phone: data.settings?.phone_number || data.profile.phone || '+91 9801573326',
    whatsapp: data.settings?.whatsapp_number || '+91 9801573326',
    leetcode: data.settings?.leetcode_url || data.profile.leetcodeUrl,
    gfg: data.settings?.gfg_url || data.profile.gfgUrl,
    codeforces: data.settings?.codeforces_url || data.profile.codeforcesUrl,
    instagram: data.settings?.instagram_url || data.profile.instagramUrl,
    customLinks: customSocialLinks,
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section (Immediate Critical Paint) */}
      <HeroSection
        heroAvatarUrl={heroAvatarUrl}
        resumeUrl={data.profile.resumeUrl || data.settings?.resume_url || '/resume.pdf'}
        stats={{
          projectsCount: data.projects.length,
          skillsCount: data.skills.length,
          statusText: data.settings?.availability_badge || data.profile.availabilityStatus,
          dsaSolvedCount: data.settings?.dsa_solved_count || '150+',
        }}
        socialLinks={socialLinksConfig}
      />

      {/* 2. Explore / Developer Universe Introduction */}
      <LazySection fallbackTitle="Engineering Focus" minHeight="min-h-[260px]">
        <ExploreSection />
      </LazySection>

      {/* 3. About Me Section */}
      <LazySection id="about" fallbackTitle="About Profile" minHeight="min-h-[420px]">
        <AboutSection
          profileData={{
            name: data.profile.fullName,
            status: data.profile.title,
            bio: data.profile.bio,
            aboutText: data.settings?.about_text || data.profile.aboutMarkdown,
            avatarUrl: data.settings?.about_avatar_url || data.profile.avatarUrl,
            location: data.settings?.about_location || data.profile.location,
            streamBadge: data.settings?.about_stream_badge || 'Software Engineer',
            phone: data.settings?.phone_number || data.profile.phone || '+91 9801573326',
            whatsapp: data.settings?.whatsapp_number || '+91 9801573326',
          }}
          educations={data.educations}
        />
      </LazySection>

      {/* 4. Skills Universe Section (3D Celestial Orbit) */}
      <LazySection id="skills" fallbackTitle="Skills Universe (3D Orbit)" minHeight="min-h-[500px]">
        <SkillsUniverseSection skills={data.skills} />
      </LazySection>

      {/* 5. Projects Section */}
      <LazySection id="projects" fallbackTitle="Featured Projects" minHeight="min-h-[500px]">
        <ProjectsSection projects={data.projects} />
      </LazySection>

      {/* 6. Experience Section */}
      {data.experiences && data.experiences.length > 0 && (
        <LazySection id="experience" fallbackTitle="Career Milestones" minHeight="min-h-[400px]">
          <ExperienceSection experiences={data.experiences} />
        </LazySection>
      )}

      {/* 7. Education Section */}
      {data.educations && data.educations.length > 0 && (
        <LazySection id="education" fallbackTitle="Academic Credentials" minHeight="min-h-[420px]">
          <EducationSection educations={data.educations} />
        </LazySection>
      )}

      {/* 8. Certificates Section */}
      {data.certificates && data.certificates.length > 0 && (
        <LazySection id="certificates" fallbackTitle="Verified Certifications" minHeight="min-h-[420px]">
          <CertificatesSection certificates={data.certificates} />
        </LazySection>
      )}

      {/* 9. Achievements & Highlights Section */}
      {data.achievements && data.achievements.length > 0 && (
        <LazySection id="achievements" fallbackTitle="Honors & Achievements" minHeight="min-h-[350px]">
          <AchievementsSection achievements={data.achievements} />
        </LazySection>
      )}

      {/* 10. Work With Me / Opportunities Section */}
      <LazySection fallbackTitle="Collaboration Protocols" minHeight="min-h-[280px]">
        <WorkWithMeSection />
      </LazySection>

      {/* 11. Contact Section */}
      <LazySection id="contact" fallbackTitle="Direct Transmission Channels" minHeight="min-h-[480px]">
        <ContactSection
          profile={data.profile}
          settings={data.settings}
          socialLinks={socialLinksConfig}
        />
      </LazySection>
    </div>
  );
};
