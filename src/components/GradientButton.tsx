import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
// Bare React Native? Use: import LinearGradient from "react-native-linear-gradient";

type GradientButtonProps = {
  title: string;
  onPress?: () => void;
  /** Gradient stops, top-left -> bottom-right. Defaults to the Figma colors. */
  colors?: readonly [string, string, ...string[]];
  /** Icon shown inside the translucent box on the right. Pass null to hide the box. */
  icon?: React.ReactNode | null;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

const DEFAULT_COLORS = ["#27C6F4", "#326BFF"] as const;

/**
 * Renders a gradient button that disables presses when disabled or loading.
 * Shows a spinner while loading, otherwise a custom icon or the default arrow.
 * Passing null as the icon hides the icon box.
 */
export default function GradientButton({
  title,
  onPress,
  colors = DEFAULT_COLORS,
  icon,
  disabled = false,
  loading = false,
  style,
  textStyle,
}: GradientButtonProps) {
  const isDisabled = disabled || loading;

  // undefined -> default arrow, null -> no icon box
  const iconNode =
    icon === undefined ? (
      <Feather name="arrow-right" size={15} color="#FFFFFF" />
    ) : (
      icon
    );

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={({ pressed }) => [
        styles.shadow,
        { shadowColor: colors[colors.length - 1] },
        pressed && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      <LinearGradient
        colors={colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={[styles.title, textStyle]}>{title}</Text>

        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : iconNode !== null ? (
          <View style={styles.iconBox}>{iconNode}</View>
        ) : null}
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Drop shadow / glow from the Effects panel
  shadow: {
    borderRadius: 14,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 18,
    elevation: 10,
  },
  gradient: {
    minHeight: 50,
    borderRadius: 14, // Corner radius 14
    paddingLeft: 24,
    paddingRight: 10,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  // White @ 12.55% fill from "Selection colors"
  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1255)",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
  disabled: {
    opacity: 0.5,
  },
});
