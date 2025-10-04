import process from 'node:process'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  srcDir: '.',
  devtools: { enabled: true },
  typescript: {
    strict: true,
    typeCheck: true
  },
  css: ['~/assets/styles/tailwind.css'],
  modules: [
    ['@nuxtjs/tailwindcss', { exposeConfig: false, viewer: false }],
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon'
  ],
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:4000/api'
    }
  },
  nitro: {
    preset: 'node-server'
  }
})
