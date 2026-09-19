/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta pensada para un ERP de administración de edificios:
        // azul-grisáceo profundo (confianza/orden) + un acento cálido para acciones.
        ink: {
          50: '#f4f6f8',
          100: '#e4e9ee',
          200: '#c7d1db',
          300: '#9caebe',
          400: '#6c869c',
          500: '#4d6780',
          600: '#3a5169',
          700: '#2f4256',
          800: '#293849',
          900: '#1c2733',
          950: '#111922',
        },
        amber: {
          500: '#c8842a',
          600: '#a86b1f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
