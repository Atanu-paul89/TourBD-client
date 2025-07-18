// // tailwind.config.js
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         'primary-light': '#FFF5E4', // Our lightest palette color
//         'secondary-light': '#FFE3E1', // Second lightest
//         'accent-light': '#FFD1D1',   // Third lightest
//         'danger-light': '#FF9494',   // Darkest/Accent color
//         // You can add more semantic names or just use these as direct color references
//       },
//       fontFamily: {
//         // You can add custom fonts here if needed later
//       },
//     },
//   },
//   plugins: [
//     require('daisyui'),
//   ],
//   daisyui: {
//     themes: [
//       {
//         lightTheme: {
//           "primary": "#FF9494",       // DaisyUI primary will map to our danger-light
//           "secondary": "#FFD1D1",     // DaisyUI secondary will map to our accent-light
//           "accent": "#FFE3E1",        // DaisyUI accent will map to our secondary-light
//           "neutral": "#FFF5E4",       // DaisyUI neutral will map to our primary-light
//           "base-100": "#FFF5E4",      // Background for most components
//           "info": "#3ABFF8",          // Default DaisyUI info
//           "success": "#36D399",       // Default DaisyUI success
//           "warning": "#FBBD23",       // Default DaisyUI warning
//           "error": "#F87272",         // Default DaisyUI error
//           // Any other custom colors for specific DaisyUI components can go here
//         },
//       },
//     ],
//     // Optional: Add other DaisyUI configuration here
//     // darkTheme: "dark", // We are only using light theme as per requirements
//     // base: true, // applies background color and foreground color for root element by default
//     // styled: true, // include daisyUI colors and design decisions for all components
//     // utils: true, // adds responsive and modifier utility classes
//     // prefix: "", // prefix for daisyUI classnames (e.g., "du-btn")
//     // logs: true, // Shows info about daisyUI versions and themes
//     // themeRoot: ":root", // The element that receives theme color CSS variables
//   },
// };