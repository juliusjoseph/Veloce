import { Image, ImageContentFit, ImageSource } from "expo-image";
import React, { useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "./colors";

type AppImageProps = {
  /** Local file: require("./pic.png")  |  Remote: { uri: "https://..." } */
  source: ImageSource | number;
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  /** Shortcut for a square image: size={80} */
  size?: number;
  /** Corner radius. */
  radius?: number;
  /** Fully round (avatars). Overrides radius. */
  circle?: boolean;
  /** cover (fill & crop) | contain (fit inside) | fill | none */
  contentFit?: ImageContentFit;
  /** Shown if the image fails to load. */
  fallback?: ImageSource | number;
  style?: StyleProp<ViewStyle>;
};

/**
 * Renders an image with configurable dimensions, shape, and content fit.
 * Uses the fallback image or a plain placeholder when the source fails to load.
 * The size prop overrides width and height; circle overrides the corner radius.
 */
export default function AppImage({
  source,
  width,
  height,
  size,
  radius = 0,
  circle = false,
  contentFit = "cover",
  fallback,
  style,
}: AppImageProps) {
  const [failed, setFailed] = useState(false);

  const w = size ?? width ?? "100%";
  const h = size ?? height ?? w;
  const borderRadius =
    circle && typeof w === "number" ? w / 2 : circle ? 9999 : radius;

  const box: ViewStyle = { width: w, height: h, borderRadius };

  // Failed to load and no fallback image: show a plain placeholder block
  if (failed && !fallback) {
    return <View style={[box, styles.placeholder, style]} />;
  }

  return (
    <Image
      source={failed && fallback ? fallback : source}
      contentFit={contentFit}
      transition={200}
      cachePolicy="memory-disk"
      onError={() => setFailed(true)}
      style={[box, style as object]}
    />
  );
}

const styles = StyleSheet.create({
  placeholder: { backgroundColor: colors.surface },
});
