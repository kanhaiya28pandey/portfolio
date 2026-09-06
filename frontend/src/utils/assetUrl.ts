/**
 * Utility helper to resolve asset, upload, and media URLs across environments.
 * 
 * - Base64 Data URLs (data:...) and Blob URLs (blob:...) are returned as-is.
 * - External absolute URLs (http:// or https://) are returned as-is.
 * - Bundled frontend assets (/assets/...) are returned as-is (hosted by Vercel/Vite).
 * - Upload paths (/uploads/...) are resolved to the backend origin
 *   (e.g., https://portfolio-olzx.onrender.com or VITE_API_URL without /api/v1).
 */
export const resolveAssetUrl = (url?: string | null): string => {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Data URLs, Blob URLs, or fully qualified HTTP(S) links
  if (
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://')
  ) {
    return trimmed;
  }

  // Frontend public static assets
  if (trimmed.startsWith('/assets/')) {
    return trimmed;
  }

  // Backend uploaded resources (avatars, resumes, certificates, project banners)
  if (trimmed.startsWith('/uploads/')) {
    const rawApiUrl = import.meta.env.VITE_API_URL || 'https://portfolio-olzx.onrender.com/api/v1';
    const backendOrigin = rawApiUrl
      .replace(/\/api\/v1\/?$/, '')
      .replace(/\/$/, '');
    return `${backendOrigin}${trimmed}`;
  }

  return trimmed;
};
