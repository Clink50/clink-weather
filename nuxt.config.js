export default {
  target: 'static',
  ssr: true,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Clink Weather',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Get your latest weather updates here!' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/clink-weather.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap',
      },
      {
        rel: 'stylesheet',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css',
      },
    ],
  },

  loading: {
    color: '#fa923f',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/scss/main.scss'],

  // tailwindcss: {
  //   cssPath: '~/assets/scss/tailwind.scss',
  // },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/nuxt-client-init.client.js', '~/filters/filters'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://tailwindcss.com/docs/guides/nuxtjs
    // '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    scss: ['~/assets/scss/abstracts/*.scss'],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Should hold all env variables that are public as these will
  // be exposed on the frontend and is exposed on both client and
  // server side with $config. Should have default values with ||
  publicRuntimeConfig: {
    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
      // baseURL: '',
    },
    cityFinderBaseUrl: process.env.CITY_FINDER_BASE_URL || 'https://api.teleport.org/api',
    openWeatherBaseUrl:
      process.env.OPEN_WEATHER_BASE_URL || 'https://api.openweathermap.org/data/2.5',
    openWeatherApiKey: process.env.OPEN_WEATHER_API_KEY,
  },

  // Should hold all env variables that are private and should
  // not be exposed on the frontend and is exposed to only the
  // server side with $config (it overrides publicRuntimeConfig)
  privateRuntimeConfig: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Server Middleware: https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-servermiddleware
  serverMiddleware: [],

  generate: {
    // https://nuxtjs.org/docs/2.x/deployment/netlify-deployment/
    fallback: true,
  },
};
