export const useSEO = () => {
  const store = useSeoStore();
  const { frontSettings } = storeToRefs(store);

  return { frontSettings, store };
};
