// theme/colors.ts
// One place for every color in your app. Change a value here and it updates everywhere.

export const colors = {
  // Brand
  primary: "#27C6F4",
  primaryDark: "#326BFF",

  // Backgrounds
  background: "#0B1220",
  surface: "#141C2E",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "#9AA4B8",

  // Status
  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",

  // Overlays
  whiteTint: "rgba(255,255,255,0.1255)", // icon box fill from Figma
} as const;

// Gradients are [start, end] color pairs
export const gradients = {
  primary: [colors.primary, colors.primaryDark],
  success: ["#4ADE80", "#16A34A"],
  danger: ["#FB7185", "#E11D48"],
  sunset: ["#FF8A00", "#FF3D77"],
} as const;

export type GradientName = keyof typeof gradients;
