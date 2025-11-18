import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const MyPreset = definePreset(Aura, {
  // ===================================== Design Tokens =====================================
  // Global design tokens that affect the entire theme
  designTokens: {
    fontFamily: {
      sans: "Readex Pro, sans-serif", // Main font family
      // serif: "Georgia, serif", // Optional: serif font
      // mono: "Courier New, monospace", // Optional: monospace font
    },
    // borderRadius: {
    //   none: "0",
    //   sm: "0.25rem",
    //   md: "0.5rem",
    //   lg: "1rem",
    //   xl: "1.5rem",
    // },
    // spacing: {
    //   // Custom spacing values
    // },
  },

  // ===================================== Semantic Colors =====================================
  // Color palette that can be referenced throughout the theme
  semantic: {
    primary: {
      50: "#EFF0FE",
      100: "#E2E4FD",
      200: "#CACDFB",
      300: "#AAADF7",
      400: "#8D88F1",
      500: "#6C5CE7", // Main primary color
      600: "#6A4FDC",
      700: "#5C40C2",
      800: "#4B369D",
      900: "#3F337C",
      950: "#261E48",
    },

    // You can also customize other semantic colors:
    // secondary: { 50: "...", 100: "...", ... },
    // success: { 50: "...", 100: "...", ... },
    // info: { 50: "...", 100: "...", ... },
    // warning: { 50: "...", 100: "...", ... },
    // error: { 50: "...", 100: "...", ... },
  },

  // ===================================== Color Scheme =====================================
  // Theme-specific overrides for light/dark modes
  colorScheme: {
    light: {
      // Light mode specific overrides
      // formField: {
      //   hoverBorderColor: "{error.400}",
      // },
    },
    dark: {
      // Dark mode specific overrides
      // formField: {
      //   hoverBorderColor: "{error.500}",
      // },
    },
  },
});

export default MyPreset;
