/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#c99708', // Custom color for primary elements
        secondary: '#c31331', // Custom color for secondary elements
      },
      fontSize: {
        sm: ['14px', '20px'], // 14px font size with 20px line-height
        base: ['16px', '24px'], // Default body font size and line-height
        lg: ['18px', '28px'],
        xl: ['20px', '30px'],
      },
      spacing: {
        4: '16px',  // Adjust spacing values globally
        8: '32px',
      },
      borderRadius: {
        sm: '4px', // Small radius for subtle rounding
        md: '8px', // Medium radius for general use
        lg: '12px', // Large radius for cards, buttons, etc.
        xl: '16px', // Extra large radius for prominent elements
        full: '9999px', // Full radius for circles or pills
      },
    },
  },
}
