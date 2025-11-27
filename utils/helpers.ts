/**
 * Mengecek apakah URL sudah lengkap (http/https)
 */
export const isExternalUrl = (url?: string | null): boolean => {
  if (!url) return false;
  return /^https?:\/\//.test(url);
};

/**
 * Membersihkan path agar tidak ada double slash
 */
const cleanPath = (path: string): string => {
  return path.replace(/^\/+/, "").replace(/\/+$/, "");
};

/**
 * Build URL untuk gambar dari Laravel
 * - Jika sudah full URL → return langsung
 * - Jika relative → gabungkan dengan apiUrlBase
 */
export const buildImageUrl = (path?: string | null): string => {
  if (!path) return "";

  // Sudah lengkap? (https://..)
  if (isExternalUrl(path)) {
    return path;
  }

  // Bersihkan path agar aman
  const clean = cleanPath(path);

  // Ambil base dari config Nuxt (tanpa /api/v1)
  const config = useRuntimeConfig();
  const base = config.public.apiUrlBase || "";

  // Laravel images biasanya di storage/
  return `${base}/storage/${clean}`;
};

/**
 * Build URL untuk menu
 */
export const buildMenuUrl = (item: any): string => {
  if (!item) return "/";

  // Jika menu punya custom URL
  if (item.url) {
    return isExternalUrl(item.url) ? item.url : `/${cleanPath(item.url)}`;
  }

  // Jika pakai slug
  if (item.slug) {
    return `/${cleanPath(item.slug)}`;
  }

  return "/";
};
