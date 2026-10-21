// components/VeloceTabBar.tsx
// Floating glass tab bar with a "liquid" pill: one pill slides between tabs and
// stretches while it travels (the leading edge moves first, the trailing edge lags).
import type {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { gradients } from "@/components/colors";

const INACTIVE = "#7C8AA5";
const BAR_HEIGHT = 70;
const SIDE_MARGIN = 16;
const PILL_HEIGHT = 54;
const PILL_MAX_WIDTH = 66;

// Liquid feel: the edge the pill is moving TOWARD uses FAST, the edge it is
// leaving uses SLOW. The gap between them is the stretch.
const FAST = { damping: 18, stiffness: 260, mass: 0.8 };
const SLOW = { damping: 20, stiffness: 110, mass: 1 };

/** Bottom padding your screens need so content isn't hidden behind the bar. */
export function useFloatingTabBarSpace() {
  const { bottom } = useSafeAreaInsets();
  return BAR_HEIGHT + Math.max(bottom, 8) + 16;
}

/* ---------- One tab: icon + label, small pop when it becomes active ---------- */
type TabButtonProps = {
  label: string;
  focused: boolean;
  icon: BottomTabNavigationOptions["tabBarIcon"];
  onPress: () => void;
  onLongPress: () => void;
  accessibilityLabel?: string;
};

function TabButton({
  label,
  focused,
  icon,
  onPress,
  onLongPress,
  accessibilityLabel,
}: TabButtonProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withSpring(focused ? 1.08 : 1, {
      damping: 12,
      stiffness: 180,
    });
  }, [focused, scale]);

  const contentStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const color = focused ? "#FFFFFF" : INACTIVE;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={focused ? { selected: true } : {}}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      style={s.slot}
    >
      <Animated.View style={[s.content, contentStyle]}>
        {icon?.({ focused, color, size: 22 })}
        <Text style={[s.label, { color }]}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
}

/* ---------- The bar ---------- */
export default function VeloceTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  const [trackWidth, setTrackWidth] = useState(0);
  const count = state.routes.length;
  const slotW = trackWidth / count;
  const pillW = Math.min(PILL_MAX_WIDTH, Math.max(slotW - 4, 1));

  // The pill is defined by two edges so they can move at different speeds
  const left = useSharedValue(0);
  const right = useSharedValue(0);
  const placed = useRef(false);
  const lastSlotW = useRef(0);

  useEffect(() => {
    if (slotW === 0) return;
    const targetL = state.index * slotW + (slotW - pillW) / 2;
    const targetR = targetL + pillW;

    // first layout, or the bar was resized (rotation): jump, don't animate
    if (!placed.current || lastSlotW.current !== slotW) {
      left.value = targetL;
      right.value = targetR;
      placed.current = true;
      lastSlotW.current = slotW;
      return;
    }

    const movingRight = targetL > left.value;
    left.value = withSpring(targetL, movingRight ? SLOW : FAST);
    right.value = withSpring(targetR, movingRight ? FAST : SLOW);
  }, [state.index, slotW, pillW, left, right]);

  const pillStyle = useAnimatedStyle(() => {
    const width = right.value - left.value;
    return {
      left: left.value,
      width,
      // squash the pill slightly as it stretches, like a droplet
      transform: [
        {
          scaleY: interpolate(
            width,
            [pillW, pillW + Math.max(slotW, 1)],
            [1, 0.86],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const onTrackLayout = (e: LayoutChangeEvent) =>
    setTrackWidth(e.nativeEvent.layout.width);

  return (
    <View
      pointerEvents="box-none"
      style={[s.wrap, { bottom: Math.max(insets.bottom, 8) }]}
    >
      <View style={s.bar}>
        {/* glass layers */}
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        <LinearGradient
          pointerEvents="none"
          colors={["rgba(255,255,255,0.10)", "rgba(255,255,255,0.02)"]}
          style={StyleSheet.absoluteFill}
        />
        {/* bright specular edge along the top */}
        <LinearGradient
          pointerEvents="none"
          colors={["transparent", "rgba(255,255,255,0.45)", "transparent"]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={s.specular}
        />

        <View style={s.track} onLayout={onTrackLayout}>
          {/* liquid pill (behind the icons) */}
          {slotW > 0 && (
            <Animated.View pointerEvents="none" style={[s.pill, pillStyle]}>
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={StyleSheet.absoluteFill}
              />
              <View style={s.pillHighlight} />
            </Animated.View>
          )}

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const focused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            };

            return (
              <TabButton
                key={route.key}
                label={options.title ?? route.name}
                focused={focused}
                icon={options.tabBarIcon}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                onPress={onPress}
                onLongPress={() =>
                  navigation.emit({ type: "tabLongPress", target: route.key })
                }
              />
            );
          })}
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  wrap: { position: "absolute", left: SIDE_MARGIN, right: SIDE_MARGIN },
  bar: {
    height: BAR_HEIGHT,
    paddingHorizontal: 8,
    borderRadius: 26,
    overflow: "hidden", // clips blur, gloss and pill to the rounded corners
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(20,28,46,0.72)",
  },
  specular: { position: "absolute", top: 0, left: 28, right: 28, height: 1 },
  track: { flex: 1, flexDirection: "row" },
  pill: {
    position: "absolute",
    top: (BAR_HEIGHT - 2 - PILL_HEIGHT) / 2,
    height: PILL_HEIGHT,
    borderRadius: 20,
    overflow: "hidden",
  },
  // thin light edge inside the pill so it reads as glass, not flat paint
  pillHighlight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 20,
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.35)",
  },
  slot: { flex: 1, alignItems: "center", justifyContent: "center" },
  content: { alignItems: "center", gap: 2 },
  label: { fontSize: 10, fontWeight: "600" },
});
