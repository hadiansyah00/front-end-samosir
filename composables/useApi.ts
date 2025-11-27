export const useApi = async (path: string, options = {}) => {
  const config = useRuntimeConfig();

  const { data, error } = await useFetch(`${config.public.apiUrl}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
    },
  });

  if (error.value) throw error.value;
  return data.value;
};
