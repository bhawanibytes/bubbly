import type { Config } from 'tailwindcss'

const config : Config = {
  darkMode: 'class', // or 'media'
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // adjust paths to your project
  ],
  theme: {
    extend: {
      colors: {
        background: '--background',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        hello: "yellow"
      },
    },
  },
  plugins: [],
}

export default config
