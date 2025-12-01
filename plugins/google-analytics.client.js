export default defineNuxtPlugin(() => {
  // Load Google Analytics script
  const id = "G-27F5TW7S6G";

  // Inject script
  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);

  // Insert gtag config
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }

  gtag("js", new Date());
  gtag("config", id);
});
