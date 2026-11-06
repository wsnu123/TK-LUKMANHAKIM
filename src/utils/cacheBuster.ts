/**
 * Cache Buster Utility for Static & Uploaded Assets
 * Appends a version query parameter (?v=timestamp) to image URLs
 * to ensure that browser caches are invalidated whenever an image is updated in Admin Panel.
 */

let globalAssetVersion: number = Date.now();

export function setGlobalAssetVersion(version: number) {
  globalAssetVersion = version;
  if (typeof window !== 'undefined') {
    (window as any).__APP_ASSET_VERSION__ = version;
  }
}

export function getGlobalAssetVersion(): number {
  if (typeof window !== 'undefined' && (window as any).__APP_ASSET_VERSION__) {
    return (window as any).__APP_ASSET_VERSION__;
  }
  return globalAssetVersion;
}

/**
 * Returns a cache-busted URL for an image or file asset.
 * - Leaves base64 data URLs (data:image/...) and blob URLs untouched.
 * - Replaces or appends ?v=<timestamp> or custom version string.
 */
export function getCacheBustedUrl(url?: string | null, customVersion?: string | number): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed) return '';

  // Data URLs and Blob URLs should never have query params attached
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed;
  }

  const version = customVersion !== undefined && customVersion !== null && customVersion !== ''
    ? customVersion
    : getGlobalAssetVersion();

  try {
    // If the URL already contains a ?v= parameter, update it
    if (/([?&])v=[^&]*/.test(trimmed)) {
      return trimmed.replace(/([?&])v=[^&]*/, `$1v=${encodeURIComponent(String(version))}`);
    }

    const separator = trimmed.includes('?') ? '&' : '?';
    return `${trimmed}${separator}v=${encodeURIComponent(String(version))}`;
  } catch {
    return trimmed;
  }
}
