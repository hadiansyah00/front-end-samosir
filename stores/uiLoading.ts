export const useUiLoadingStore = defineStore("uiLoading", {
  state: () => ({ loading: true }),
  actions: {
    done() {
      this.loading = false;
    },
    start() {
      this.loading = true;
    },
  },
});
