/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        polar: {
          950: '#060d19',
          900: '#0a1628',
          850: '#0e1e36',
          800: '#112240',
          700: '#1b3358',
          600: '#234475',
          cyan: '#00d4ff',
          ice: '#a8d8ea',
          aurora: '#00ff88',
          amber: '#ffaa00',
          red: '#ff4444',
          glow: 'rgba(0, 212, 255, 0.15)'
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'flow-dash': 'flow 1.5s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'aurora-glow': 'aurora 8s ease infinite'
      },
      keyframes: {
        flow: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        aurora: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.8 }
        }
      },
      boxShadow: {
        'polar-glow': '0 0 25px rgba(0, 212, 255, 0.25)',
        'aurora-glow': '0 0 25px rgba(0, 255, 136, 0.25)',
        'red-glow': '0 0 25px rgba(255, 68, 68, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      }
    },
  },
  plugins: [],
}
