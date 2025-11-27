// stores/seoStore.ts
import { defineStore } from "pinia";

export const useSeoStore = defineStore("seoStore", {
  state: () => ({
    frontSettings: null as Record<string, any> | null,
    loading: false,
    error: null as any,
  }),

  actions: {
    async fetchFrontSettings() {
      // Jika sudah ada data → tidak fetch ulang
      if (this.frontSettings) return this.frontSettings;

      const config = useRuntimeConfig();
      this.loading = true;
      this.error = null;

      try {
        const response = await $fetch<any>(
          `${config.public.apiUrl}/home?include=frontSettings`
        );

        const rawSettings = response?.data?.frontSettings ?? [];

        // Map jadi key-value
        const mapped: Record<string, any> = {};

        rawSettings.forEach((item: any) => {
          let value = item.value;

          // Parse jika string JSON
          if (typeof value === "string" && value.startsWith("[")) {
            try {
              value = JSON.parse(value);
            } catch {
              // biarkan tetap string jika gagal parse
            }
          }

          mapped[item.key] = value;
        });

        // Debug sekali saja agar tidak spam
        console.debug("🔧 SEO SETTINGS PARSED:", mapped);

        this.frontSettings = mapped;
        return mapped;
      } catch (err: any) {
        this.error = err;
        console.error("❌ SEO Fetch Error:", err);
        return null;
      } finally {
        this.loading = false;
      }
    },

    /**
     * Mengambil setting dengan key tertentu
     * auto return null jika tidak ada
     */
    getSetting(key: string) {
      return this.frontSettings?.[key] ?? null;
    },
  },
});
