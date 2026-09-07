import React, { useEffect, useState } from 'react';
import { HeroSection } from '../sections/HeroSection';
import { fetchPortfolioOverview, DEFAULT_PORTFOLIO_DATA } from '../services/api';
import type { PortfolioOverview } from '../types/portfolio';

import { ExploreSection } from '../sections/ExploreSection';
import { AboutSection } from '../sections/AboutSection';
import { SkillsUniverseSection } from '../sections/SkillsUniverseSection';
import { ProjectsSection } from '../sections/ProjectsSection';
import { ExperienceSection } from '../sections/ExperienceSection';
import { EducationSection } from '../sections/EducationSection';
import { CertificatesSection } from '../sections/CertificatesSection';
import { AchievementsSection } from '../sections/AchievementsSection';
import { WorkWithMeSection } from '../sections/WorkWithMeSection';
import { ContactSection } from '../sections/ContactSection';

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
      <ExploreSection />

      {/* 3. About Me Section */}
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

      {/* 4. Skills Universe Section (3D Celestial Orbit) */}
      <SkillsUniverseSection skills={data.skills} />

      {/* 5. Projects Section */}
      <ProjectsSection projects={data.projects} />

      {/* 6. Experience Section */}
      {data.experiences && data.experiences.length > 0 && (
        <ExperienceSection experiences={data.experiences} />
      )}

      {/* 7. Education Section */}
      {data.educations && data.educations.length > 0 && (
        <EducationSection educations={data.educations} />
      )}

      {/* 8. Certificates Section */}
      {data.certificates && data.certificates.length > 0 && (
        <CertificatesSection certificates={data.certificates} />
      )}

      {/* 9. Achievements & Highlights Section */}
      {data.achievements && data.achievements.length > 0 && (
        <AchievementsSection achievements={data.achievements} />
      )}

      {/* 10. Work With Me / Opportunities Section */}
      <WorkWithMeSection />

      {/* 11. Contact Section */}
      <ContactSection
        profile={data.profile}
        settings={data.settings}
        socialLinks={socialLinksConfig}
      />
    </div>
  );
};
