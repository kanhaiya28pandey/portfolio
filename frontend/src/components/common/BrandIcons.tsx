import React from 'react';

export const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);

export const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.6a1.64 1.64 0 1 0 0 3.28 1.64 1.64 0 0 0 0-3.28z" />
  </svg>
);

export const LeetCodeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 4.818 3.868 5.861 5.861 0 0 0 3.605-.902l3.414-2.58a1.352 1.352 0 1 0-1.631-2.158l-3.413 2.58a3.17 3.17 0 0 1-2.295.579 3.23 3.23 0 0 1-2.62-2.104 3.013 3.013 0 0 1-.021-1.369 3.09 3.09 0 0 1 .711-1.258l3.818-4.088 4.542-4.858A1.37 1.37 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

export const GfgIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 6.5h3c.83 0 1.5.67 1.5 1.5v1.25h-2.5V10h-2v4h2v-1.25h1.25v2.75h-3.25a1.5 1.5 0 0 1-1.5-1.5v-4c0-.83.67-1.5 1.5-1.5zm6.5 4.5c0 .83-.67 1.5-1.5 1.5h-1v-5h1c.83 0 1.5.67 1.5 1.5v2zm-11 0c0 .83-.67 1.5-1.5 1.5h-1v-5h1c.83 0 1.5.67 1.5 1.5v2z" />
  </svg>
);

export const CodeforcesIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M4.5 7.5a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-3 0V9a1.5 1.5 0 0 1 1.5-1.5z" />
    <path d="M12 3.5a1.5 1.5 0 0 1 1.5 1.5v12a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
    <path d="M19.5 10.5a1.5 1.5 0 0 1 1.5 1.5v5a1.5 1.5 0 0 1-3 0v-5a1.5 1.5 0 0 1 1.5-1.5z" />
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const HackerRankIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0a12 12 0 1 0 12 12A12.013 12.013 0 0 0 12 0zm3.87 16.5h-2.18v-3.79h-3.38v3.79H8.13V7.5h2.18v3.62h3.38V7.5h2.18z" />
  </svg>
);

export const CodeChefIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M11.96 0C5.35 0 0 5.35 0 11.96c0 6.6 5.35 11.95 11.96 11.95 6.6 0 11.95-5.35 11.95-11.95C23.91 5.35 18.56 0 11.96 0zm0 3.32c4.77 0 8.64 3.87 8.64 8.64 0 4.77-3.87 8.64-8.64 8.64a8.65 8.65 0 0 1-8.64-8.64c0-4.77 3.87-8.64 8.64-8.64zm-3.04 4.5a4.14 4.14 0 0 0-4.14 4.14c0 2.29 1.85 4.14 4.14 4.14 1.83 0 3.38-1.19 3.91-2.84h-1.95a2.22 2.22 0 0 1-1.96 1.15 2.24 2.24 0 0 1-2.24-2.24 2.24 2.24 0 0 1 2.24-2.24c.89 0 1.66.53 1.96 1.29h1.95a4.12 4.12 0 0 0-3.91-2.64zm6.08 0a4.14 4.14 0 0 0-4.14 4.14c0 2.29 1.85 4.14 4.14 4.14 1.83 0 3.38-1.19 3.91-2.84H17a2.22 2.22 0 0 1-1.96 1.15 2.24 2.24 0 0 1-2.24-2.24 2.24 2.24 0 0 1 2.24-2.24c.89 0 1.66.53 1.96 1.29h1.95a4.12 4.12 0 0 0-3.91-2.64z" />
  </svg>
);

export const KaggleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.246l-5.18-6.574-1.875 1.781v4.758c0 .281-.141.422-.422.422H5.066c-.281 0-.422-.141-.422-.422V.422C4.644.141 4.785 0 5.066 0h2.371c.281 0 .422.141.422.422v14.461l6.762-6.668c.141-.141.305-.211.492-.211h3.281c.141 0 .234.047.281.141.047.117.023.211-.07.281l-7.465 7.184 7.605 8.168c.07.094.094.188.07.281z" />
  </svg>
);

export const TwitterXIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export const GenericWebIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

export const PhoneIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

export const DynamicSocialIcon: React.FC<{
  platform?: string;
  url?: string;
  className?: string;
}> = ({ platform = '', url = '', className = 'w-4 h-4' }) => {
  const combined = `${platform} ${url}`.toLowerCase();

  if (combined.includes('github')) return <GithubIcon className={className} />;
  if (combined.includes('linkedin')) return <LinkedinIcon className={className} />;
  if (combined.includes('whatsapp') || combined.includes('wa.me')) return <WhatsAppIcon className={className} />;
  if (combined.includes('phone') || combined.includes('tel:')) return <PhoneIcon className={className} />;
  if (combined.includes('leetcode')) return <LeetCodeIcon className={className} />;
  if (combined.includes('geeks') || combined.includes('gfg')) return <GfgIcon className={className} />;
  if (combined.includes('codeforces')) return <CodeforcesIcon className={className} />;
  if (combined.includes('instagram')) return <InstagramIcon className={className} />;
  if (combined.includes('hackerrank')) return <HackerRankIcon className={className} />;
  if (combined.includes('codechef')) return <CodeChefIcon className={className} />;
  if (combined.includes('kaggle')) return <KaggleIcon className={className} />;
  if (combined.includes('twitter') || combined.includes('x.com')) return <TwitterXIcon className={className} />;
  if (combined.includes('youtube')) return <YouTubeIcon className={className} />;

  return <GenericWebIcon className={className} />;
};
