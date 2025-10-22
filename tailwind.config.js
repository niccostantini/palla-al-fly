/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          600: '#5B3DF5',
          700: '#4D32D6',
        },
        accent: {
          aqua: '#00D4FF',
          rose: '#FF4D96',
        },
        success: {
          600: '#16A34A',
        },
        warning: {
          600: '#F59E0B',
        },
        danger: {
          600: '#EF4444',
        },
        info: {
          600: '#0EA5E9',
        },
        role: {
          setter: '#5B3DF5',
          oh: '#00D4FF',
          oph: '#FF4D96',
          mb: '#65A30D',
          l: '#F59E0B',
        },
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'card': '0 8px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}
