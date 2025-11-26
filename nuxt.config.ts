// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import MyPreset from "./themes/theme.js";

export default defineNuxtConfig({
  modules: [
    "@primevue/nuxt-module",
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "nuxt-swiper",
  ],

  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    layoutTransition: {
      name: "layout",
      mode: "out-in",
    },
    head: {
      title: "Wattani Aquaculture Association",
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          name: "description",
          content: "Wattani Aquaculture Association",
        },
        {
          charset: "utf-8",
        },
      ],
    },
  },

  css: ["~/assets/css/main.css", "~/assets/css/scrollbar.css"],

  // primevue: {
  //   importTheme: { from: "@/themes/theme.js" },
  //   options: {
  //     ripple: true,
  //     inputVariant: "filled",
  //   },
  // },

  primevue: {
    options: {
      theme: {
        preset: MyPreset,
        options: {
          darkModeSelector: "",
        },
      },
      ripple: true,
    },
    autoImport: true,
  },

  i18n: {
    baseUrl: "http://localhost:3000", // Development base URL
    // baseUrl:
    //   process.env.NODE_ENV === "production"
    //     ? "https://sakanapp.com.sa" // Production base URL
    //     : "http://localhost:3000", // Development base URL
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
      alwaysRedirect: false,
    },
    compilation: { strictMessage: false },
    defaultLocale: "en",
    defaultDirection: "ltr",
    langDir: "locales",
    strategy: "no_prefix",
    locales: [
      {
        code: "ar",
        name: "Arabic",
        dir: "rtl",
        file: { path: "ar.json", cache: true },
        language: "ar",
      },
      {
        code: "cs",
        name: "Czech",
        dir: "ltr",
        file: { path: "cs.json", cache: true },
        language: "cs",
      },
      {
        code: "en",
        name: "English",
        dir: "ltr",
        file: { path: "en.json", cache: true },
        language: "en",
      },
      {
        code: "fr",
        name: "French",
        dir: "ltr",
        file: { path: "fr.json", cache: true },
        language: "fr",
      },
      {
        code: "de",
        name: "German",
        dir: "ltr",
        file: { path: "de.json", cache: true },
        language: "de",
      },
      {
        code: "fa",
        name: "Iranian",
        dir: "rtl",
        file: { path: "fa.json", cache: true },
        language: "fa",
      },
      {
        code: "hi",
        name: "Indian",
        dir: "ltr",
        file: { path: "hi.json", cache: true },
        language: "hi",
      },
      {
        code: "ru",
        name: "Russian",
        dir: "ltr",
        file: { path: "ru.json", cache: true },
        language: "ru",
      },
      {
        code: "es",
        name: "Spanish",
        dir: "ltr",
        file: { path: "es.json", cache: true },
        language: "es",
      },
      {
        code: "tr",
        name: "Turkish",
        dir: "ltr",
        file: { path: "tr.json", cache: true },
        language: "tr",
      },
    ],
  },

  googleFonts: {
    families: {
      "Readex Pro": true,
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
    preload: true,
    useStylesheet: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
});
