import Screen from "@/components/Screen";
import { CategoryChip, ProductCard, PromoCard } from "@/components/VeloceCards";
import React from "react";
import { View } from "react-native";

const index = () => {
  return (
    <Screen scroll>
      <View style={{ marginTop: 20 }}>
        <PromoCard
          image={require("@/assets/images/Electric.png")}
          label="30% Off"
        />
      </View>

      <View style={{ flexDirection: "row", gap: 14, marginTop: 20 }}>
        <CategoryChip label="All" active />
        <CategoryChip icon="bicycle" />
        <CategoryChip icon="speedometer" />
        <CategoryChip icon="triangle" />
        <CategoryChip icon="shield" />{" "}
      </View>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",

          justifyContent: "space-between",
          marginTop: "10%",
        }}
      >
        <ProductCard
          image={require("@/assets/images/helmet.png")}
          category="Road Bike"
          name="PEUGEOT - LR01"
          price={1999.99}
          tilt="left"
        />
        <ProductCard
          image={require("@/assets/images/darkbicycle.png")}
          category="Road Helmet"
          name="SMITH - Trade"
          price={120}
          tilt="right"
        />
        <ProductCard
          image={require("@/assets/images/bicycleRed.png")}
          category="Road Helmet"
          name="SMITH - Trade"
          price={120}
          tilt="right"
        />
        <ProductCard
          image={require("@/assets/images/Electric.png")}
          category="Road Helmet"
          name="SMITH - Trade"
          price={120}
          tilt="right"
        />
        <ProductCard
          image={require("@/assets/images/darkbicycle.png")}
          category="Road Helmet"
          name="SMITH - Trade"
          price={120}
          tilt="right"
        />
        <ProductCard
          image={require("@/assets/images/Electric.png")}
          category="Road Helmet"
          name="SMITH - Trade"
          price={120}
          tilt="right"
        />
      </View>
    </Screen>
  );
};

export default index;
