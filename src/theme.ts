import { useColorScheme } from "react-native";

export const spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 24, xxl: 32 };
export const radius = { sm: 8, md: 12, lg: 16, pill: 999 };

export const typography = {
  largeTitle: { fontSize: 34, fontWeight: "700" as const },
  title: { fontSize: 28, fontWeight: "700" as const },
  headline: { fontSize: 17, fontWeight: "600" as const },
  body: { fontSize: 17, fontWeight: "400" as const },
  callout: { fontSize: 16, fontWeight: "400" as const },
  subhead: { fontSize: 15, fontWeight: "400" as const },
  footnote: { fontSize: 13, fontWeight: "400" as const },
  caption: { fontSize: 12, fontWeight: "400" as const },
};

export const lightColors = {
  background: "#F2F2F7",
  surface: "#FFFFFF",
  primary: "#007AFF",
  textPrimary: "#000000",
  textSecondary: "#6C6C70",
  separator: "#C6C6C8",
  success: "#34C759",
  warning: "#FF9500",
  danger: "#FF3B30",
};

export const darkColors = {
  background: "#000000",
  surface: "#1C1C1E",
  primary: "#0A84FF",
  textPrimary: "#FFFFFF",
  textSecondary: "#98989D",
  separator: "#38383A",
  success: "#30D158",
  warning: "#FFD60A",
  danger: "#FF453A",
};

export const useTheme = () =>
  useColorScheme() === "dark" ? darkColors : lightColors;
