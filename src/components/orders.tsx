// components/orders.tsx — Orders screen
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../components/colors";
import { Badge, formatPrice, IconButton, ui } from "./ui";

/* ---------- OrderTimeline: Confirmed → Prepared → Shipped → Delivered ---------- */
export type TimelineStep = { label: string; date: string };

export function OrderTimeline({
  steps,
  currentIndex,
}: {
  steps: TimelineStep[];
  currentIndex: number;
}) {
  const n = steps.length;
  const inset = `${100 / (2 * n)}%` as const; // line runs from first dot center to last dot center
  const progress = `${(currentIndex / (n - 1)) * 100}%` as const;

  return (
    <View style={s.tlWrap}>
      <View style={[s.tlLine, { left: inset, right: inset }]}>
        <View style={[s.tlFill, { width: progress }]} />
      </View>
      <View style={{ flexDirection: "row" }}>
        {steps.map((st, i) => {
          const done = i < currentIndex;
          const current = i === currentIndex;
          return (
            <View key={st.label} style={s.tlStep}>
              <View
                style={[
                  s.tlDot,
                  done && { backgroundColor: colors.primaryDark },
                  current && s.tlDotCurrent,
                ]}
              />
              <Text
                style={[
                  s.tlLabel,
                  current && { color: "#fff", fontWeight: "700" },
                ]}
              >
                {st.label}
              </Text>
              <Text style={s.tlDate}>{st.date}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

/* ---------- OrderCard: "In transit" order with product, timeline, Track ---------- */
type OrderCardProps = {
  orderId: string; // "VL-10482"
  status: string; // "In transit"
  badge?: { label: string; tone?: "success" | "warning" | "danger" | "info" };
  image: ImageSourcePropType;
  category: string; // "Road bike"
  name: string;
  details: string; // "Embers · 54 cm · 1 item"
  price: number;
  steps: TimelineStep[];
  currentStep: number;
  eta: string; // "Estimated delivery · Monday, Oct 05"
  onTrack?: () => void;
};

export function OrderCard(p: OrderCardProps) {
  return (
    <View style={s.order}>
      <View style={s.orderTop}>
        <View>
          <Text style={s.orderId}>ORDER #{p.orderId}</Text>
          <Text style={s.orderStatus}>{p.status}</Text>
        </View>
        {p.badge && (
          <Badge label={p.badge.label} tone={p.badge.tone ?? "success"} dot />
        )}
      </View>

      <View style={s.productRow}>
        <Image source={p.image} style={s.thumb} resizeMode="cover" />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={s.category}>{p.category.toUpperCase()}</Text>
          <View style={s.nameRow}>
            <Text style={s.productName} numberOfLines={1}>
              {p.name}
            </Text>
            <Text style={s.productPrice}>
              {formatPrice(p.price).replace(".00", "")}
            </Text>
          </View>
          <Text style={s.details}>{p.details}</Text>
        </View>
      </View>

      <OrderTimeline steps={p.steps} currentIndex={p.currentStep} />

      <Pressable onPress={p.onTrack} style={s.etaBar}>
        <Text style={s.eta}>{p.eta}</Text>
        <View style={s.trackRow}>
          <Text style={s.track}>Track</Text>
          <Ionicons name="arrow-forward" size={14} color={colors.primary} />
        </View>
      </Pressable>
    </View>
  );
}

/* ---------- ActivityCard: recent delivered order with reorder action ---------- */
type ActivityCardProps = {
  image: ImageSourcePropType;
  statusLabel: string; // "DELIVERED SEP 18"
  name: string;
  meta: string; // "Order #VL-10217 · $170"
  onReorder?: () => void;
};

export function ActivityCard({
  image,
  statusLabel,
  name,
  meta,
  onReorder,
}: ActivityCardProps) {
  return (
    <View style={s.activity}>
      <Image source={image} style={s.activityThumb} resizeMode="cover" />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <Ionicons
            name="checkmark-circle-outline"
            size={14}
            color={colors.success}
          />
          <Text style={s.delivered}>{statusLabel}</Text>
        </View>
        <Text style={s.activityName}>{name}</Text>
        <Text style={s.details}>{meta}</Text>
      </View>
      <IconButton icon="refresh" onPress={onReorder} size={40} />
    </View>
  );
}

const s = StyleSheet.create({
  tlWrap: { marginTop: 18, paddingHorizontal: 4 },
  tlLine: {
    position: "absolute",
    top: 5,
    height: 2,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  tlFill: { height: 2, backgroundColor: colors.primaryDark },
  tlStep: { flex: 1, alignItems: "center" },
  tlDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#2A3350",
  },
  tlDotCurrent: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginTop: -2,
    backgroundColor: colors.primary,
    borderWidth: 3,
    borderColor: "#fff",
  },
  tlLabel: { color: colors.textSecondary, fontSize: 11, marginTop: 8 },
  tlDate: {
    color: colors.textSecondary,
    fontSize: 9,
    marginTop: 2,
    opacity: 0.7,
  },

  order: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: ui.border,
    padding: 14,
  },
  orderTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderId: {
    color: colors.textSecondary,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  orderStatus: { color: "#fff", fontSize: 20, fontWeight: "800", marginTop: 4 },

  productRow: { flexDirection: "row", marginTop: 14 },
  thumb: {
    width: 76,
    height: 64,
    borderRadius: 14,
    backgroundColor: ui.surfaceRaised,
  },
  category: {
    color: colors.primary,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  productName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
    marginRight: 8,
  },
  productPrice: { color: colors.primary, fontSize: 16, fontWeight: "800" },
  details: { color: colors.textSecondary, fontSize: 12, marginTop: 4 },

  etaBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    backgroundColor: ui.surfaceRaised,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  eta: { color: colors.textSecondary, fontSize: 12 },
  trackRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  track: { color: colors.primary, fontSize: 13, fontWeight: "700" },

  activity: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: ui.border,
    padding: 10,
  },
  activityThumb: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: ui.surfaceRaised,
  },
  delivered: {
    color: colors.success,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  activityName: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 4,
  },
});
