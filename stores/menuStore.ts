// stores/menu.ts
import { defineStore } from "pinia";

interface MenuItem {
  id: number;
  name: string;
  slug: string;
  url?: string | null;
  type?: string | null;
  parent_id?: number | null;
  order?: number;
  is_active?: number;
}

export const useMenuStore = defineStore("menu", {
  state: () => ({
    menus: [] as MenuItem[],
    loading: false,
    error: null as any,
  }),

  getters: {
    /** 🔥 Menu utama (tanpa parent) */
    mainMenus: (state) =>
      state.menus.filter((m) => !m.parent_id && m.is_active === 1),

    /** 🔥 Ambil anak menu berdasarkan parent_id */
    children: (state) => (id: number) =>
      state.menus.filter((m) => m.parent_id === id),
  },

  actions: {
    /**
     * Fetch menus from API
     * @param force  — force true means always refetch from server
     */
    async fetchMenus(force = false) {
      // Prevent refetching if already loaded
      if (!force && this.menus.length > 0) return;

      this.loading = true;
      this.error = null;

      const config = useRuntimeConfig();

      try {
        const response = await $fetch<any>(
          `${config.public.apiUrl}/home?include=menus`
        );

        /**
         * Handle semua kemungkinan struktur response Laravel.
         * Sangat fleksibel.
         */
        const menus =
          response?.menus ??
          response?.data?.menus ??
          (Array.isArray(response?.data) ? response.data : []) ??
          [];

        this.menus = Array.isArray(menus) ? menus : [];

        // Debug only in dev mode
        if (import.meta.dev) {
          console.log("✔️ [Menus Loaded]:", this.menus);
        }
      } catch (err: any) {
        this.error = err;
        console.error("❌ Menu Fetch Error:", err);
      } finally {
        this.loading = false;
      }
    },

    /** 🔥 Optional: Get single menu by slug */
    getBySlug(slug: string) {
      return this.menus.find((m) => m.slug === slug) ?? null;
    },

    /** 🔥 Optional: Get single menu by ID */
    getById(id: number) {
      return this.menus.find((m) => m.id === id) ?? null;
    },
  },
});
