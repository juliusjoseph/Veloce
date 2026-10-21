// app/product/[id].tsx
import { colors } from "@/components/colors";
import { PriceBar, ProductHero, ProductInfoPanel } from "@/components";
import { useCart } from "@/context/CartContext";
import { getProduct } from "@/data/products";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addItem } = useCart();
  const product = getProduct(id);

  if (!product) {
    return (
      <SafeAreaView style={s.root}>
        <Text style={s.missing}>Product not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <ProductHero
          title={product.name}
          image={product.image}
          onBack={() => router.back()}
        />
        <ProductInfoPanel
          title={product.name}
          description={product.description}
          specs={product.specs}
        />
      </ScrollView>

      <PriceBar
        price={product.price}
        onAddToCart={() => {
          addItem(product.id);
          router.push("/cart");
        }}
      />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  missing: { color: "#fff", textAlign: "center", marginTop: 80 },
});
