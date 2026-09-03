/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#090a0c',
          900: '#0e1013',
          850: '#13161b',
          800: '#191d24',
          700: '#232832',
          600: '#343b48',
        },
        cinema: {
          gold: '#e5a93c',
          amber: '#f59e0b',
          glow: '#fbbf24',
          muted: '#8e7952',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'monospace'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'cinema-glow': '0 0 30px -5px rgba(245, 158, 11, 0.15)',
        'modal-glow': '0 25px 80px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(245, 158, 11, 0.08)',
      },
    },
  },
  plugins: [],
}
