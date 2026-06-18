/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#0b0f19',
          800: '#111827',
          700: '#1f2937',
        },
        isro: {
          orange: '#FF9933',
          navy: '#0c2340',
          blue: '#1e3a8a',
          accent: '#3b82f6',
          gold: '#fbbf24',
        }
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at top, #0f172a, #020617, #000000)',
        'star-pattern': "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"200\" height=\"200\" viewBox=\"0 0 200 200\"><circle cx=\"20\" cy=\"30\" r=\"1\" fill=\"%23ffffff\" opacity=\"0.2\"/><circle cx=\"120\" cy=\"50\" r=\"1.5\" fill=\"%23ffffff\" opacity=\"0.4\"/><circle cx=\"70\" cy=\"150\" r=\"0.8\" fill=\"%23ffffff\" opacity=\"0.1\"/><circle cx=\"180\" cy=\"110\" r=\"1.2\" fill=\"%23ffffff\" opacity=\"0.3\"/><circle cx=\"40\" cy=\"180\" r=\"1\" fill=\"%23ff9933\" opacity=\"0.2\"/><circle cx=\"150\" cy=\"170\" r=\"1.5\" fill=\"%233b82f6\" opacity=\"0.25\"/></svg>')",
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s infinite alternate',
        'star-twinkle': 'twinkle 6s infinite ease-in-out',
      },
      keyframes: {
        pulseGlow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 153, 51, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(255, 153, 51, 0.6)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        }
      }
    },
  },
  plugins: [],
}
