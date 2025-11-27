export const imageUrl = (path: string): string => {
  const base = useRuntimeConfig().public.apiBaseUrl;

  if (!path) return "";
  return `${base}/storage/${path}`;
};
