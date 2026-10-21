import { AnimatedPromoCard } from "@/components/AnimatedPromoCard";
import Screen from "@/components/Screen";
import { CategoryChip, ProductCard } from "@/components/VeloceCards";
import { PRODUCTS } from "@/data/products";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";

const Browse = () => {
  return (
    <Screen scroll>
      <View style={{ marginTop: 20 }}>
        <AnimatedPromoCard
          image={require("@/assets/images/Electric.png")}
          label="30% Off"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 14, marginTop: 20 }}>
        <CategoryChip label="All" active />
        <CategoryChip icon="bicycle" />
        <CategoryChip icon="speedometer" />
        <CategoryChip icon="triangle" />
        <CategoryChip icon="shield" />
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          marginTop: "10%",
        }}
      >
        {PRODUCTS.map((p, index) => (
          <ProductCard
            key={p.id}
            image={p.image}
            category={p.category}
            name={p.name}
            price={p.price}
            tilt={index % 2 === 0 ? "left" : "right"}
            // width 48% = two cards per row; flex 0 overrides the card's flex: 1
            style={{ width: "48%", flex: 0, marginBottom: 16 }}
            onPress={() =>
              router.push({
                pathname: "/product/[id]",
                params: { id: p.id },
              } as const)
            }
          />
        ))}
      </View>

      <View style={{ height: 100 }} />
    </Screen>
  );
};

export default Browse;
