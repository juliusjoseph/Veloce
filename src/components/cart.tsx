// components/cart.tsx — Shopping cart screen
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors, gradients } from "../components/colors";
import { formatPrice, GradientButton, ui } from "./ui";

/* ---------- Totals helper (keeps the math in one place) ---------- */
export function calcTotals(
  items: { price: number; quantity: number }[],
  deliveryFee = 0,
  discountPercent = 0,
) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = (subtotal * discountPercent) / 100;
  const total = subtotal - discount + deliveryFee;
  return { subtotal, deliveryFee, discountPercent, discount, total };
}

/* ---------- QuantityStepper: gradient "+", muted "−" ---------- */
export function QuantityStepper({
  value,
  onIncrement,
  onDecrement,
}: {
  value: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}) {
  return (
    <View style={s.stepper}>
      <Pressable onPress={onIncrement} hitSlop={6}>
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={s.stepBtn}
        >
          <Ionicons name="add" size={16} color="#fff" />
        </LinearGradient>
      </Pressable>
      <Text style={s.qty}>{value}</Text>
      <Pressable
        onPress={onDecrement}
        hitSlop={6}
        style={[s.stepBtn, s.stepMinus]}
      >
        <Ionicons name="remove" size={16} color={colors.textSecondary} />
      </Pressable>
    </View>
  );
}

/* ---------- CartItem ---------- */
type CartItemProps = {
  image: ImageSourcePropType;
  name: string;
  price: number;
  quantity: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
};

export function CartItem({
  image,
  name,
  price,
  quantity,
  onIncrement,
  onDecrement,
}: CartItemProps) {
  return (
    <View style={s.item}>
      <Image source={image} style={s.thumb} resizeMode="contain" />
      <View style={s.itemBody}>
        <Text style={s.itemName} numberOfLines={1}>
          {name}
        </Text>
        <View style={s.itemBottom}>
          <Text style={s.itemPrice}>{formatPrice(price)}</Text>
          <QuantityStepper
            value={quantity}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          />
        </View>
      </View>
    </View>
  );
}

/* ---------- PromoCodeInput ---------- */
type PromoCodeInputProps = {
  value: string;
  onChangeText: (t: string) => void;
  onApply?: () => void;
};

export function PromoCodeInput({
  value,
  onChangeText,
  onApply,
}: PromoCodeInputProps) {
  return (
    <View style={s.promoRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Promo code"
        placeholderTextColor={colors.textSecondary}
        autoCapitalize="characters"
        style={s.promoInput}
      />
      <GradientButton title="Apply" onPress={onApply} style={{ width: 110 }} />
    </View>
  );
}

/* ---------- OrderSummary ---------- */
type OrderSummaryProps = {
  subtotal: number;
  deliveryFee: number;
  discountPercent: number;
  total: number;
  freeShippingNote?: string; // "Your cart qualifies for free shipping"
};

export function OrderSummary(p: OrderSummaryProps) {
  return (
    <View style={s.summary}>
      {p.freeShippingNote && <Text style={s.note}>{p.freeShippingNote}</Text>}
      <Row label="Subtotal:" value={formatPrice(p.subtotal)} />
      <Row
        label="Delivery Fee:"
        value={formatPrice(p.deliveryFee).replace(".00", "")}
      />
      <Row label="Discount:" value={`${p.discountPercent}%`} />
      <View style={[s.row, { marginTop: 10 }]}>
        <Text style={s.totalLabel}>Total:</Text>
        <Text style={s.totalValue}>{formatPrice(p.total)}</Text>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.row}>
      <Text style={s.rowLabel}>{label}</Text>
      <Text style={s.rowValue}>{value}</Text>
    </View>
  );
}

/* ---------- CheckoutButton ---------- */
export function CheckoutButton({
  onPress,
  title = "Checkout",
}: {
  onPress?: () => void;
  title?: string;
}) {
  return (
    <Pressable onPress={onPress} style={s.checkout}>
      <LinearGradient
        colors={gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={s.checkoutIcon}
      >
        <Ionicons name="chevron-forward" size={20} color="#fff" />
      </LinearGradient>
      <Text style={s.checkoutText}>{title}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: ui.border,
  },
  thumb: {
    width: 76,
    height: 76,
    borderRadius: 16,
    backgroundColor: ui.surfaceRaised,
  },
  itemBody: {
    flex: 1,
    marginLeft: 14,
    height: 76,
    justifyContent: "space-between",
  },
  itemName: { color: "#fff", fontSize: 14, fontWeight: "700", marginTop: 6 },
  itemBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemPrice: { color: colors.primary, fontSize: 12, fontWeight: "600" },

  stepper: { flexDirection: "row", alignItems: "center", gap: 8 },
  stepBtn: {
    width: 24,
    height: 24,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  stepMinus: {
    backgroundColor: ui.surfaceRaised,
    borderWidth: 1,
    borderColor: ui.border,
  },
  qty: { color: "#fff", fontSize: 13, minWidth: 12, textAlign: "center" },

  promoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 16,
    backgroundColor: ui.surfaceRaised,
    borderRadius: 16,
    paddingLeft: 14,
    borderWidth: 1,
    borderColor: ui.border,
    overflow: "hidden",
  },
  promoInput: { flex: 1, color: "#fff", fontSize: 13, height: 48 },

  summary: { paddingHorizontal: 20, marginTop: 4 },
  note: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: "center",
    marginVertical: 14,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginTop: 8 },
  rowLabel: { color: "#fff", fontSize: 13, fontWeight: "600" },
  rowValue: { color: colors.textSecondary, fontSize: 13 },
  totalLabel: { color: "#fff", fontSize: 14, fontWeight: "700" },
  totalValue: { color: colors.primary, fontSize: 20, fontWeight: "800" },

  checkout: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 14,
    backgroundColor: ui.surfaceRaised,
    borderRadius: 16,
    paddingRight: 36,
    borderWidth: 1,
    borderColor: ui.border,
  },
  checkoutIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  checkoutText: { color: colors.textSecondary, fontSize: 14, marginLeft: 20 },
});
