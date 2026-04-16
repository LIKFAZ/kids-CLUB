export default defineNuxtConfig({
  compatibilityDate: '2026-04-16',
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  devtools: { enabled: true },
  css: ['~/assets/main.css'],
  plugins: [
    { src: '~/plugins/leaflet.client.js', mode: 'client' }
  ],
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})

