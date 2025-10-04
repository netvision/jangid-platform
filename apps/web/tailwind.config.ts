import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(224 71% 4%)',
        muted: {
          DEFAULT: 'hsl(210 40% 96%)',
          foreground: 'hsl(215 16% 47%)'
        },
        primary: {
          DEFAULT: 'hsl(215 90% 50%)',
          foreground: 'hsl(210 40% 98%)'
        },
        secondary: {
          DEFAULT: 'hsl(271 81% 56%)',
          foreground: 'hsl(210 40% 98%)'
        },
        accent: {
          DEFAULT: 'hsl(43 96% 56%)',
          foreground: 'hsl(224 71% 4%)'
        },
        border: 'hsl(214 32% 91%)',
        surface: 'hsl(210 20% 98%)',
        mutedForeground: 'hsl(215 16% 47%)'
      }
    }
  },
  plugins: []
} satisfies Config
