import { Image, ImageSource } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Edge, SafeAreaView } from "react-native-safe-area-context";
import { colors } from "./colors";

type ScreenProps = {
  children?: React.ReactNode;
  /** Make the screen scrollable. */
  scroll?: boolean;
  /** Which sides to protect. Defaults to all four. */
  edges?: Edge[];
  /** Override the background color. */
  backgroundColor?: string;
  /** Full-screen background image: require("...") or { uri: "..." } */
  backgroundImage?: ImageSource | number;
  /** Light status bar icons (for dark backgrounds). */
  lightStatusBar?: boolean;
  /** Style for the inner content area. */
  style?: StyleProp<ViewStyle>;
};

/**
 * Wraps screen content in a safe area with optional scrolling and a background image.
 * Controls the status bar appearance and applies style to the inner content area.
 */
export default function Screen({
  children,
  scroll = false,
  edges = ["top", "right", "bottom", "left"],
  backgroundColor = colors.background,
  backgroundImage,
  lightStatusBar = true,
  style,
}: ScreenProps) {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar style={lightStatusBar ? "light" : "dark"} />

      {/* Image sits behind everything and goes under the status bar */}
      {backgroundImage ? (
        <Image
          source={backgroundImage}
          contentFit="cover"
          style={StyleSheet.absoluteFill}
        />
      ) : null}

      {/* Safe area is transparent so the image shows through */}
      <SafeAreaView edges={edges} style={styles.container}>
        {scroll ? (
          <ScrollView
            contentContainerStyle={[styles.content, style]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.container, styles.content, style]}>
            {children}
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingHorizontal: 12 },
});
