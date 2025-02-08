// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  // app configuration
  app: {
    head: {
      title: 'Nuxt3 Starter Kit',
      charset: 'utf-8',
      viewport:
        'width=device-width, initial-scale=1, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no',
      templateParams: {
        separator: '-',
        siteName: 'Nuxt 3 Starter Kit',
      },
      titleTemplate: '%s %separator Nuxt 3 Starter Kit',
      // import external link css
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap' }
      ]
    },
    pageTransition: {
      name: 'page',
      mode: 'out-in', // default
    },
    // layoutTransition: {
    //   name: 'slide',
    //   mode: 'out-in' // default
    // }
  },
  
  // components configuration
  components: [
    {
      path: '~/components',
      // pathPrefix: false, // if you don't want to use the prefix folder set false
    },
  ],

  // css configuration
  css: [
    '~/assets/css/main.css',
  ],

  // modules configuration
  modules: [
  ],

  // runtime configuration
  runtimeConfig: {
    baseUrl: process.env.NUXT_PUBLIC_URL ?? '/',
    // The private keys which are only available within server-side
    apiSecret: '123',
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: '/api',
      omdbApiKey: process.env.NUXT_OMDB_API_KEY,
      omdbApiBase: 'http://www.omdbapi.com/',
      // site configuration
      site: {
        // titleSeparator: '-',
        name: process.env.NUXT_SITE_NAME ?? 'My Nuxt Site',
        url: process.env.NUXT_SITE_URL ?? 'http://localhost:3000',
        description: 'Welcome to my awesome site!',
        defaultLocale: 'en', // not needed if you have @nuxtjs/i18n installed
        indexable: false, // set false, not indexable website (staging/testing mode)
      },
    },
  },

  // vite configuration
  vite: {
    // css preprovessor configuration
    plugins: [
      tailwindcss(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_colors.scss" as *;'
        }
      }
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { 
    enabled: true,
    timeline: {
      enabled: true,
    }
  }
})
