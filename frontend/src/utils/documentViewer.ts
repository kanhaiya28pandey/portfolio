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
 * Opens a document (PDF, image, or web credential) safely using a native anchor click.
 * This guarantees it is never blocked by mobile browser popup blockers (Safari iOS / Chrome Android)
 * and does not rely on third-party viewer proxies like Google Docs Viewer that break or require sign-in.
 */
export const openDocument = (url?: string | null, _title?: string): void => {
  if (!url) return;
  const resolved = resolveAssetUrl(url);
  if (!resolved) return;

  const link = document.createElement('a');
  link.href = resolved;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
