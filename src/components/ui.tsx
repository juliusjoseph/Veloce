// components/ui.tsx — shared primitives used by every Veloce screen
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Pressable, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, GradientName, gradients } from "./colors";

export type IconName = keyof typeof Ionicons.glyphMap;

// Extra tokens that aren't in theme/colors.ts yet (move them there if you like)
export const ui = {
  border: "rgba(255,255,255,0.08)",
  surfaceRaised: "#1B2438",
};

export const formatPrice = (n: number) =>
  "$" +
  n.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

/* ---------- Card ---------- */
export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[s.card, style]}>{children}</View>;
}

/* ---------- GradientButton ---------- */
type GradientButtonProps = {
  title: string;
  onPress?: () => void;
  gradient?: GradientName;
  icon?: IconName;
  style?: ViewStyle;
  disabled?: boolean;
};

export function GradientButton({
  title,
  onPress,
  gradient = "primary",
  icon,
  style,
  disabled,
}: GradientButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[{ opacity: disabled ? 0.5 : 1 }, style]}
    >
      <LinearGradient
        colors={gradients[gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.gradBtn}
      >
        <Text style={s.gradBtnText}>{title}</Text>
        {icon && (
          <Ionicons
            name={icon}
            size={16}
            color="#fff"
            style={{ marginLeft: 6 }}
          />
        )}
      </LinearGradient>
    </Pressable>
  );
}

/* ---------- IconButton (back, settings, edit, support...) ---------- */
type IconButtonProps = {
  icon: IconName;
  onPress?: () => void;
  variant?: "glass" | "gradient";
  size?: number;
  style?: ViewStyle;
};

export function IconButton({
  icon,
  onPress,
  variant = "glass",
  size = 44,
  style,
}: IconButtonProps) {
  const box = { width: size, height: size, borderRadius: size * 0.32 };
  const iconEl = (
    <Ionicons name={icon} size={size * 0.45} color={colors.textPrimary} />
  );
  return (
    <Pressable onPress={onPress} hitSlop={8} style={style}>
      {variant === "gradient" ? (
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[s.iconBtn, box]}
        >
          {iconEl}
        </LinearGradient>
      ) : (
        <View style={[s.iconBtn, s.iconBtnGlass, box]}>{iconEl}</View>
      )}
    </Pressable>
  );
}

/* ---------- ScreenHeader ---------- */
type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  left?: React.ReactNode; // e.g. <IconButton icon="chevron-back" variant="gradient" />
  right?: React.ReactNode; // e.g. <IconButton icon="settings-outline" />
  centered?: boolean; // true for Cart / Product detail style
};

export function ScreenHeader({
  title,
  subtitle,
  left,
  right,
  centered,
}: ScreenHeaderProps) {
  return (
    <View style={s.header}>
      <View style={centered ? s.headerSide : undefined}>{left}</View>
      <View style={[{ flex: 1 }, centered && { alignItems: "center" }]}>
        <Text style={[s.headerTitle, !centered && { fontSize: 28 }]}>
          {title}
        </Text>
        {subtitle && <Text style={s.headerSub}>{subtitle}</Text>}
      </View>
      <View style={centered ? s.headerSide : undefined}>{right}</View>
    </View>
  );
}

/* ---------- SegmentedTabs (Active/Past/Service, Description/Specification) ---------- */
type SegmentedTabsProps<T extends string> = {
  tabs: { key: T; label: string }[];
  value: T;
  onChange: (key: T) => void;
  style?: ViewStyle;
};

export function SegmentedTabs<T extends string>({
  tabs,
  value,
  onChange,
  style,
}: SegmentedTabsProps<T>) {
  return (
    <View style={[s.segWrap, style]}>
      {tabs.map((t) => {
        const active = t.key === value;
        const label = (
          <Text
            style={[s.segText, active && { color: "#fff", fontWeight: "700" }]}
          >
            {t.label}
          </Text>
        );
        return (
          <Pressable
            key={t.key}
            onPress={() => onChange(t.key)}
            style={{ flex: 1 }}
          >
            {active ? (
              <LinearGradient
                colors={gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={s.segItem}
              >
                {label}
              </LinearGradient>
            ) : (
              <View style={s.segItem}>{label}</View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

/* ---------- Badge ("ON SCHEDULE", "DELIVERED SEP 18") ---------- */
type Tone = "success" | "warning" | "danger" | "info";
const toneColor: Record<Tone, string> = {
  success: colors.success,
  warning: colors.warning,
  danger: colors.danger,
  info: colors.primary,
};

export function Badge({
  label,
  tone = "success",
  dot,
}: {
  label: string;
  tone?: Tone;
  dot?: boolean;
}) {
  const c = toneColor[tone];
  return (
    <View style={[s.badge, { backgroundColor: c + "26" }]}>
      {dot && <View style={[s.badgeDot, { backgroundColor: c }]} />}
      <Text style={[s.badgeText, { color: c }]}>{label}</Text>
    </View>
  );
}

/* ---------- SectionHeader ("Recent activity" + "View history") ---------- */
export function SectionHeader({
  title,
  actionLabel,
  onAction,
}: {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <View style={s.sectionRow}>
      <Text style={s.sectionTitle}>{title}</Text>
      {actionLabel && (
        <Pressable onPress={onAction}>
          <Text style={s.sectionAction}>{actionLabel}</Text>
        </Pressable>
      )}
    </View>
  );
}

/* ---------- BottomTabBar (shared by Profile / Orders / Browse...) ---------- */
export type TabItem = { key: string; label: string; icon: IconName };

export const defaultTabs: TabItem[] = [
  { key: "browse", label: "Browse", icon: "bicycle" },
  { key: "explore", label: "Explore", icon: "map-outline" },
  { key: "cart", label: "Cart", icon: "cart-outline" },
  { key: "profile", label: "Profile", icon: "person-outline" },
  { key: "orders", label: "Orders", icon: "receipt-outline" },
];

export function BottomTabBar({
  items = defaultTabs,
  active,
  onChange,
}: {
  items?: TabItem[];
  active: string;
  onChange: (key: string) => void;
}) {
  return (
    <View style={s.tabBar}>
      {items.map((t) => {
        const on = t.key === active;
        return (
          <Pressable
            key={t.key}
            onPress={() => onChange(t.key)}
            style={s.tabSlot}
          >
            <View
              style={[s.tabPill, on && { backgroundColor: colors.primaryDark }]}
            >
              <Ionicons
                name={t.icon}
                size={22}
                color={on ? "#fff" : colors.textSecondary}
              />
              <Text style={[s.tabLabel, on && { color: "#fff" }]}>
                {t.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: ui.border,
    padding: 14,
  },
  gradBtn: {
    height: 48,
    paddingHorizontal: 22,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gradBtnText: { color: "#fff", fontWeight: "700", fontSize: 15 },
  iconBtn: { alignItems: "center", justifyContent: "center" },
  iconBtnGlass: {
    backgroundColor: ui.surfaceRaised,
    borderWidth: 1,
    borderColor: ui.border,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  headerSide: { width: 44 },
  headerTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: "700" },
  headerSub: { color: colors.textSecondary, fontSize: 13, marginTop: 2 },

  segWrap: {
    flexDirection: "row",
    backgroundColor: ui.surfaceRaised,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: ui.border,
  },
  segItem: {
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  segText: { color: colors.textSecondary, fontSize: 14 },

  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  badgeDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  badgeText: { fontSize: 10, fontWeight: "700", letterSpacing: 0.4 },

  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: "700" },
  sectionAction: { color: colors.primary, fontSize: 13, fontWeight: "600" },

  tabBar: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 24,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: ui.border,
  },
  tabSlot: { flex: 1, alignItems: "center" },
  tabPill: {
    minWidth: 62,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: "center",
    gap: 2,
  },
  tabLabel: { color: colors.textSecondary, fontSize: 10, fontWeight: "600" },
});
