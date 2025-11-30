import NProgress from "nprogress";
import "~/assets/css/nprogress.css";

export default defineNuxtPlugin((nuxtApp) => {
  NProgress.configure({ showSpinner: false });

  nuxtApp.hook("page:start", () => {
    NProgress.start();
  });

  nuxtApp.hook("page:finish", () => {
    NProgress.done();
  });
});
