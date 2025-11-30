export const imageUrl = (path: string): string => {
  const config = useRuntimeConfig();
  const base = config.public.apiBaseUrl;

  console.log("📌 [imageUrl] BASE URL:", base);
  console.log("📌 [imageUrl] PATH:", path);

  if (!path) return "";

  const full = `${base}/storage/${path}`;

  console.log("📌 [imageUrl] FULL URL:", full);

  return full;
};
