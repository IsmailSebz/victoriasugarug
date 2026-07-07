// Tailwind Play CDN custom config
tailwind.config = {
  theme: {
    extend: {
      colors: {
        green: {
          50:  '#f0f7f1', 100: '#d9edd9', 200: '#b4dab6', 300: '#80c083',
          400: '#4da052', 500: '#2e7d32', 600: '#1b5e20', 700: '#145218',
          800: '#0f3d12', 900: '#0a290c', 950: '#051506'
        },
        gold: {
          50:  '#fdf9ec', 100: '#faf0ca', 200: '#f5df92', 300: '#efc95a',
          400: '#c8a84b', 500: '#b8922f', 600: '#9a7424', 700: '#7a5a1c',
          800: '#5e4415', 900: '#3d2c0d', 950: '#1f1506'
        }
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Georgia', 'Times New Roman', 'serif']
      }
    }
  }
}
