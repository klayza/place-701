/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte}"],
  theme: {
    fontFamily: {
      mono: ['Space Mono', 'mono'],
      medium: ['PixelfySans', 'mono'],
      sans: ['Open Sans', 'serif']
    },
    extend: {},
  },
  plugins: [],
  important: true,
}

