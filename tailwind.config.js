/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ibague: {
          red: {
            DEFAULT: '#D32F2F',
            dark: '#B71C1C',
            light: '#EF5350',
            50: '#FFEBEE',
            100: '#FFCDD2'
          },
          yellow: {
            DEFAULT: '#FBC02D',
            vibrant: '#FFD600',
            light: '#FFF59D',
            50: '#FFFDE7'
          },
          green: {
            DEFAULT: '#2E7D32',
            dark: '#1B5E20',
            light: '#66BB6A',
            50: '#E8F5E9'
          }
        }
      },
      fontFamily: {
        display: ['Montserrat', 'Poppins', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'brand': '0 10px 25px -5px rgba(211, 47, 47, 0.2), 0 8px 10px -6px rgba(211, 47, 47, 0.1)',
        'card': '0 4px 20px -2px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(15, 23, 42, 0.12)',
      }
    },
  },
  plugins: [],
}

