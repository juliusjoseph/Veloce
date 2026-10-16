// components/product.tsx — Product detail screen
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors, gradients } from "../components/colors";
import {
  formatPrice,
  GradientButton,
  IconButton,
  SegmentedTabs,
  ui,
} from "./ui";

/* ---------- ProductHero: diagonal blue split, bike image, pager dots ---------- */
type ProductHeroProps = {
  title: string;
  image: ImageSourcePropType;
  onBack?: () => void;
  imageCount?: number;
  activeIndex?: number;
};

export function ProductHero({
  title,
  image,
  onBack,
  imageCount = 3,
  activeIndex = 0,
}: ProductHeroProps) {
  return (
    <View style={s.hero}>
      {/* diagonal blue slab */}
      <LinearGradient
        colors={gradients.primary}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={s.slab}
      />
      <View style={s.heroTop}>
        <IconButton icon="chevron-back" variant="gradient" onPress={onBack} />
        <Text style={s.heroTitle}>{title}</Text>
        <View style={{ width: 44 }} />
      </View>
      <Image source={image} style={s.heroImage} resizeMode="contain" />
      <View style={s.dots}>
        {Array.from({ length: imageCount }).map((_, i) => (
          <View key={i} style={[s.dot, i === activeIndex && s.dotActive]} />
        ))}
      </View>
    </View>
  );
}

/* ---------- ProductInfoPanel: Description / Specification tabs ---------- */
type Spec = { label: string; value: string };
type ProductInfoPanelProps = {
  title: string;
  description: string;
  specs?: Spec[];
};

export function ProductInfoPanel({
  title,
  description,
  specs = [],
}: ProductInfoPanelProps) {
  const [tab, setTab] = useState<"description" | "specification">(
    "description",
  );

  return (
    <View style={s.panel}>
      <SegmentedTabs
        tabs={[
          { key: "description", label: "Description" },
          { key: "specification", label: "Specification" },
        ]}
        value={tab}
        onChange={setTab}
      />
      <Text style={s.panelTitle}>{title}</Text>

      {tab === "description" ? (
        <Text style={s.panelBody}>{description}</Text>
      ) : (
        specs.map((sp) => (
          <View key={sp.label} style={s.specRow}>
            <Text style={s.specLabel}>{sp.label}</Text>
            <Text style={s.specValue}>{sp.value}</Text>
          </View>
        ))
      )}
    </View>
  );
}

/* ---------- PriceBar: price + Add to Cart ---------- */
export function PriceBar({
  price,
  onAddToCart,
}: {
  price: number;
  onAddToCart?: () => void;
}) {
  return (
    <View style={s.priceBar}>
      <Text style={s.price}>{formatPrice(price)}</Text>
      <GradientButton
        title="Add to Cart"
        onPress={onAddToCart}
        style={{ width: 150 }}
      />
    </View>
  );
}

const s = StyleSheet.create({
  hero: { height: 360, overflow: "hidden", backgroundColor: colors.background },
  slab: {
    position: "absolute",
    width: 420,
    height: 700,
    right: -150,
    top: -120,
    transform: [{ rotate: "28deg" }],
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  heroTitle: { color: "#fff", fontSize: 17, fontWeight: "700" },
  heroImage: { width: "100%", height: 200, marginTop: 24 },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 12,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dotActive: { backgroundColor: "#fff" },

  panel: {
    marginTop: -20,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    backgroundColor: colors.surface,
    padding: 20,
    borderWidth: 1,
    borderColor: ui.border,
  },
  panelTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
  },
  panelBody: { color: colors.textSecondary, fontSize: 15, lineHeight: 24 },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: ui.border,
  },
  specLabel: { color: colors.textSecondary, fontSize: 14 },
  specValue: { color: "#fff", fontSize: 14, fontWeight: "600" },

  priceBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
    backgroundColor: colors.background,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  price: { color: colors.primary, fontSize: 24, fontWeight: "600" },
});
