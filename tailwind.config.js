/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'body-gradient': 'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)',
        /* Your new vibrant gradient applied here */
        'header-footer-gradient': 'linear-gradient(90deg, hsla(331, 78%, 69%, 1) 0%, hsla(238, 82%, 70%, 1) 100%)',
        'content-gradient': 'linear-gradient(135deg, #FFFFFF 0%, #F5F8FF 40%, #EEF2FF 70%, #F6F0FF 100%)',
        'btn-primary': 'linear-gradient(135deg, #2458E8 0%, #4A63FF 50%, #8A4EFF 100%)',
        'btn-hover': 'linear-gradient(135deg, #0B2E9E 0%, #2458E8 50%, #7A3FD1 100%)',
      }
    },
  },
  plugins: [],
}