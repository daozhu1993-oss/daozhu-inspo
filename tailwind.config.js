/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Caveat"', '"Playwrite HR"', 'cursive', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
      },
      colors: {
        bezel: '#ded2ba',
        'bezel-d1': '#d6c6a8',
        'bezel-d2': '#cebb97',
        'bezel-l1': '#e7ddcb',
        'bezel-l2': '#efe8dc',
      }
    },
  },
  plugins: [],
}
