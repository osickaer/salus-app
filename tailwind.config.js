/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}", // Include expo-router folder
  ],
  theme: {
    extend: {
      colors: {
        primary: "#c99708", // yellow
        secondary: "#b22b2b", // red
        darkBackground: "#0E0E0E", // for dark mode (default rn)
        lightBackground: "#ffffff", // for light mode
        secondaryBackground: "#2C2C2C", // slightly lighter gray
        darkContainer: "#202020", // for all containers/views
        accent1: "#2b2d42", // Dark slate
        accent2: "#008080", // Teal
        protein: "#d55a5a", // pastel red
        carbs: "#e8b923", // pastel yellow
        fat: "#3aafa9", // pastel blue

        // Text colors for dark and light mode
        textPrimaryDark: "#f5f5f5", // Light text for dark mode
        textPrimaryLight: "#333333", // Dark text for light mode
        textSecondaryDark: "#cccccc", // Muted light gray for dark mode
        textSecondaryLight: "#666666", // Muted dark gray for light mode
        textAccentDark: "#c99708", // Accent text for dark mode
        textAccentLight: "#c99708", // Accent text for light mode (same color)
        textMutedDark: "#888888", // Muted for disabled or less important text
        textMutedLight: "#aaaaaa", // Muted text for light mode
      },
      fontSize: {
        sm: ["14px", "20px"], // Body text small
        base: ["16px", "24px"], // Body text default
        lg: ["18px", "28px"], // Subtitle
        xl: ["20px", "30px"], // Title
        "2xl": ["24px", "32px"], // Larger title
      },
      fontWeight: {
        light: "300", // Light font weight
        normal: "400", // Normal font weight
        medium: "500", // Medium font weight
        semibold: "600", // Semi-bold font weight
        bold: "700", // Bold font weight
      },
      spacing: {
        2: "8px",
        4: "16px",
        8: "32px",
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "32px",
        full: "9999px",
      },
    },
  },
  darkMode: "class",
};
