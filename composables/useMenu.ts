export const useMenu = () => {
  const store = useMenuStore();
  const { menus } = storeToRefs(store);

  return { menus, store };
};
