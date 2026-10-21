// components/profile.tsx — Profile screen
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, gradients } from "../components/colors";
import { IconButton, IconName, ui } from "./ui";

/* ---------- ProfileHeader: avatar, name, verified badge, edit ---------- */
type ProfileHeaderProps = {
  name: string;
  subtitle: string; // "Road rider · San Francisco, CA"
  avatar: ImageSourcePropType;
  verified?: boolean;
  onEdit?: () => void;
};

export function ProfileHeader({
  name,
  subtitle,
  avatar,
  verified,
  onEdit,
}: ProfileHeaderProps) {
  return (
    <View style={s.profileRow}>
      <View style={s.avatarRing}>
        <Image source={avatar} style={s.avatar} />
      </View>
      <View style={{ flex: 1, marginLeft: 14 }}>
        <Text style={s.name}>{name}</Text>
        <Text style={s.sub}>{subtitle}</Text>
        {verified && (
          <View style={s.verified}>
            <Ionicons
              name="checkmark-circle-outline"
              size={14}
              color={colors.primary}
            />
            <Text style={s.verifiedText}>VERIFIED RIDER</Text>
          </View>
        )}
      </View>
      <IconButton icon="create-outline" onPress={onEdit} size={40} />
    </View>
  );
}

/* ---------- MembershipCard: "Veloce Plus" gradient card ---------- */
type MembershipCardProps = {
  tier: string; // "VELOCE PLUS"
  since: string; // "Since 2024"
  title: string; // "Priority service unlocked"
  perks: string; // "Free bike fitting · Insured delivery · 2× points"
};

export function MembershipCard({
  tier,
  since,
  title,
  perks,
}: MembershipCardProps) {
  return (
    <LinearGradient
      colors={gradients.primary}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={s.member}
    >
      <View style={s.memberCircle} />
      <View style={s.memberTop}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Ionicons name="ribbon-outline" size={18} color="#fff" />
          <Text style={s.tier}>{tier}</Text>
        </View>
        <Text style={s.since}>{since}</Text>
      </View>
      <Text style={s.memberTitle}>{title}</Text>
      <Text style={s.perks}>{perks}</Text>
    </LinearGradient>
  );
}

/* ---------- StatsRow: Miles ridden / Bikes owned / Velo points ---------- */
export function StatsRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <View style={s.statsRow}>
      {stats.map((st) => (
        <View key={st.label} style={s.stat}>
          <Text style={s.statValue}>{st.value}</Text>
          <Text style={s.statLabel}>{st.label}</Text>
        </View>
      ))}
    </View>
  );
}

/* ---------- MenuList: My garage, Saved bikes, Fit profile... ---------- */
export type MenuItem = {
  key: string;
  icon: IconName;
  label: string;
  meta?: string;
  onPress?: () => void;
};

export function MenuList({
  title,
  items,
}: {
  title?: string;
  items: MenuItem[];
}) {
  return (
    <View>
      {title && <Text style={s.menuTitle}>{title}</Text>}
      <View style={s.menu}>
        {items.map((it, i) => (
          <Pressable
            key={it.key}
            onPress={it.onPress}
            style={[s.menuRow, i < items.length - 1 && s.menuDivider]}
          >
            <View style={s.menuIcon}>
              <Ionicons name={it.icon} size={20} color={colors.primary} />
            </View>
            <Text style={s.menuLabel}>{it.label}</Text>
            {it.meta && <Text style={s.menuMeta}>{it.meta}</Text>}
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.textSecondary}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    marginTop: 8,
  },
  avatarRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    padding: 2,
  },
  avatar: { width: "100%", height: "100%", borderRadius: 30 },
  name: { color: "#fff", fontSize: 20, fontWeight: "700" },
  sub: { color: colors.textSecondary, fontSize: 12, marginTop: 2 },
  verified: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  verifiedText: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  member: {
    marginHorizontal: 5,
    marginTop: 16,
    borderRadius: 24,
    padding: 18,
    overflow: "hidden",
    shadowColor: colors.primary,
    shadowOpacity: 0.45,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  memberCircle: {
    position: "absolute",
    width: 170,
    height: 170,
    borderRadius: 85,
    right: -40,
    top: -50,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  memberTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tier: { color: "#fff", fontWeight: "800", fontSize: 14, letterSpacing: 0.3 },
  since: { color: "rgba(255,255,255,0.8)", fontSize: 11 },
  memberTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
    marginTop: 34,
  },
  perks: { color: "rgba(255,255,255,0.85)", fontSize: 12, marginTop: 6 },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 5,
    marginTop: 14,
  },
  stat: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 14,
    borderRadius: 16,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: ui.border,
  },
  statValue: { color: "#fff", fontSize: 18, fontWeight: "800" },
  statLabel: { color: colors.textSecondary, fontSize: 11, marginTop: 2 },

  menuTitle: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.8,
    marginHorizontal: 20,
    marginTop: 22,
    marginBottom: 10,
  },
  menu: {
    marginHorizontal: 5,
    borderRadius: 24,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: ui.border,
    paddingHorizontal: 12,
  },
  menuRow: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  menuDivider: { borderBottomWidth: 1, borderBottomColor: ui.border },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.whiteTint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  menuLabel: { flex: 1, color: "#fff", fontSize: 15, fontWeight: "600" },
  menuMeta: { color: colors.textSecondary, fontSize: 12, marginRight: 8 },
});
