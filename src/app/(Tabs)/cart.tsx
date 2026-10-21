// app/(tabs)/cart.tsx
import {
  calcTotals,
  CartItem,
  CheckoutButton,
  IconButton,
  OrderSummary,
  PromoCodeInput,
  ScreenHeader,
} from "@/components";
import { colors } from "@/components/colors";
import { useFloatingTabBarSpace } from "@/components/VeloceTabBar";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/products";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PROMOS: Record<string, number> = { BIKE30: 30 }; // code → % off
const FREE_SHIPPING_OVER = 500;
const DELIVERY_FEE = 25;

export default function CartScreen() {
  const space = useFloatingTabBarSpace();
  const { lines, changeQuantity } = useCart();
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Join cart lines with product data (skip any id that no longer exists)
  const items = lines.flatMap((l) => {
    const p = getProduct(l.productId);
    return p ? [{ ...p, quantity: l.quantity }] : [];
  });

  const applyCode = () => setDiscount(PROMOS[code.trim().toUpperCase()] ?? 0);

  const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);
  const deliveryFee =
    subtotal >= FREE_SHIPPING_OVER || items.length === 0 ? 0 : DELIVERY_FEE;
  const totals = calcTotals(items, deliveryFee, discount);

  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: space }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenHeader
          title="My Shopping Cart"
          centered
          left={
            <IconButton
              icon="chevron-back"
              variant="gradient"
              onPress={() => router.back()}
            />
          }
        />

        {items.length === 0 ? (
          <Text style={s.empty}>Your cart is empty.</Text>
        ) : (
          <>
            {items.map((i) => (
              <CartItem
                key={i.id}
                image={i.image}
                name={i.name}
                price={i.price}
                quantity={i.quantity}
                onIncrement={() => changeQuantity(i.id, 1)}
                onDecrement={() => changeQuantity(i.id, -1)}
              />
            ))}

            <PromoCodeInput
              value={code}
              onChangeText={setCode}
              onApply={applyCode}
            />

            <OrderSummary
              {...totals}
              freeShippingNote={
                deliveryFee === 0
                  ? "Your cart qualifies for free shipping"
                  : undefined
              }
            />

            <CheckoutButton onPress={() => {}} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  empty: {
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 80,
    fontSize: 14,
  },
});
