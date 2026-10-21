// components/AnimatedPromoCard.tsx
// Install once: npx expo install react-native-reanimated
// Effects: entrance (slide + fade) · floating bike · shine sweep · press squeeze
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import {
  ImageSourcePropType,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const GLASS = "rgba(40, 48, 66, 0.85)";
const BORDER = "rgba(255,255,255,0.08)";
const MUTED = "rgba(255,255,255,0.55)";

type Props = {
  image: ImageSourcePropType;
  label: string; // "30% Off"
  onPress?: () => void;
  style?: ViewStyle;
};

export function AnimatedPromoCard({ image, label, onPress, style }: Props) {
  const enter = useSharedValue(0); // 0 → 1 once, on mount
  const float = useSharedValue(0); // 0 ↔ 1 forever
  const shine = useSharedValue(0); // 0 → 1, then pause, repeat
  const press = useSharedValue(1); // card scale
  const cardWidth = useSharedValue(360);

  useEffect(() => {
    // 1. entrance
    enter.value = withSpring(1, { damping: 14, stiffness: 90 });

    // 2. floating: smooth up/down, reversing every cycle
    float.value = withRepeat(
      withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );

    // 3. shine: wait 2.5s, sweep for 1.1s, snap back, repeat
    shine.value = withRepeat(
      withSequence(
        withDelay(
          2500,
          withTiming(1, { duration: 1100, easing: Easing.inOut(Easing.quad) }),
        ),
        withTiming(0, { duration: 0 }),
      ),
      -1,
    );
  }, [enter, float, shine]);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [
      { perspective: 1000 },
      { rotate: "-1.5deg" },
      { translateY: interpolate(enter.value, [0, 1], [24, 0]) },
      { scale: press.value },
    ],
  }));

  const imageStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [
      { translateX: interpolate(enter.value, [0, 1], [90, 0]) },
      { translateY: interpolate(float.value, [0, 1], [0, -8]) },
      { rotate: `${interpolate(enter.value, [0, 1], [6, 0])}deg` }, // entrance tilt (already there)
      { rotate: `${interpolate(float.value, [0, 1], [-5, 5])}deg` }, // new: sway
    ],
  }));
  const labelStyle = useAnimatedStyle(() => ({
    opacity: enter.value,
    transform: [{ translateY: interpolate(enter.value, [0, 1], [14, 0]) }],
  }));

  const shineStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          shine.value,
          [0, 1],
          [-140, cardWidth.value + 140],
        ),
      },
      { rotate: "20deg" },
    ],
  }));

  const onLayout = (e: LayoutChangeEvent) => {
    cardWidth.value = e.nativeEvent.layout.width;
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={() => (press.value = withSpring(0.97, { damping: 15 }))}
      onPressOut={() => (press.value = withSpring(1, { damping: 12 }))}
    >
      <Animated.View onLayout={onLayout} style={[s.promo, style, cardStyle]}>
        <Animated.Image
          source={image}
          style={[s.image, imageStyle]}
          resizeMode="cover"
        />
        <Animated.Text style={[s.label, labelStyle]}>{label}</Animated.Text>

        {/* shine streak: sits on top, ignores touches */}
        <Animated.View pointerEvents="none" style={[s.shine, shineStyle]}>
          <LinearGradient
            colors={["transparent", "rgba(255,255,255,0.16)", "transparent"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

const s = StyleSheet.create({
  promo: {
    height: 200,
    borderRadius: 28,
    backgroundColor: GLASS,
    borderWidth: 1,
    borderColor: BORDER,
    padding: 16,
    justifyContent: "flex-end",
    overflow: "hidden", // clips the shine to the rounded card
  },
  image: {
    position: "absolute",
    top: 10,
    left: 20,
    right: 20,
    height: 150,
    width: "100%",
  },
  label: { fontSize: 26, fontWeight: "700", color: MUTED },
  shine: { position: "absolute", top: -60, bottom: -60, width: 70 },
});
