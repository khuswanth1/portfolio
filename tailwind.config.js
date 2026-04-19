/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00d4ff',
        secondary: '#7b2fff',
        accent: '#ff6b35',
        gold: '#ffd700',
        dark: {
          100: '#1a1f35',
          200: '#141829',
          300: '#0e1220',
          400: '#080c18',
          500: '#040810'
        }
      },
      fontFamily: {
        heading: ['Rajdhani', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'particle': 'particle 8s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          from: { textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff' },
          to: { textShadow: '0 0 20px #00d4ff, 0 0 40px #00d4ff, 0 0 60px #00d4ff' }
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' }
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(0,212,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.03) 1px, transparent 1px)",
        'hero-gradient': 'radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(123,47,255,0.15) 0%, transparent 50%)',
      },
      backgroundSize: {
        'grid': '50px 50px'
      }
    }
  },
  plugins: []
}
