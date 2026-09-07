import { resolveAssetUrl } from './assetUrl';

/**
 * Checks if a given URL represents a PDF document.
 */
export const isPdfDocument = (url?: string | null): boolean => {
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  return clean.endsWith('.pdf') || clean.includes('.pdf?') || clean.includes('/pdf/');
};

/**
 * Checks if a given URL represents an image.
 */
export const isImageDocument = (url?: string | null): boolean => {
  if (!url) return false;
  const clean = url.trim().toLowerCase();
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)(\?.*)?$/i.test(clean);
};

/**
 * Detects if the current client is a mobile device or tablet (touch-centric viewport).
 */
export const isMobileOrTabletDevice = (): boolean => {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    return false;
  }
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  const isTouchDevice = 'maxTouchPoints' in navigator && navigator.maxTouchPoints > 1;
  const isSmallViewport = window.innerWidth <= 1024;

  return mobileRegex.test(userAgent) || (isTouchDevice && isSmallViewport);
};

/**
 * Opens a document (PDF, image, or web credential) optimized for the user's device.
 * 
 * - Mobile / Tablet: For public HTTP(S) PDF links, routes through Google Docs Viewer
 *   so that iOS and Android devices render the document inline immediately with full zoom
 *   and page navigation without requiring external PDF reader apps or failing on downloads.
 * - Desktop: Opens directly in a new tab utilizing the browser's built-in PDF viewer engine.
 */
export const openDocument = (url?: string | null, _title?: string): void => {
  if (!url) return;
  const resolved = resolveAssetUrl(url);
  if (!resolved) return;

  const isPdf = isPdfDocument(resolved);
  const isMobile = isMobileOrTabletDevice();

  // If it's a PDF on mobile/tablet and hosted over HTTP/HTTPS, use Google Docs Viewer for seamless rendering
  if (isPdf && isMobile && (resolved.startsWith('http://') || resolved.startsWith('https://'))) {
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resolved)}&embedded=false`;
    window.open(viewerUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // Desktop or direct image / web credential URL
  window.open(resolved, '_blank', 'noopener,noreferrer');
};

/**
 * Triggers a direct download of a document file.
 */
export const downloadDocument = (url?: string | null, suggestedFileName?: string): void => {
  if (!url) return;
  const resolved = resolveAssetUrl(url);
  if (!resolved) return;

  const link = document.createElement('a');
  link.href = resolved;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  if (suggestedFileName) {
    link.download = suggestedFileName;
  } else {
    const parts = resolved.split('/');
    link.download = parts[parts.length - 1] || 'document.pdf';
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
