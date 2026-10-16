// VeloceCards.tsx
// Install: npx expo install expo-linear-gradient @expo/vector-icons
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

/* ---------- Theme ---------- */
export const theme = {
  bg: "#1B2230",
  glass: "rgba(40, 48, 66, 0.85)",
  glassBorder: "rgba(255,255,255,0.08)",
  blueStart: "#3FA9F5",
  blueEnd: "#5B5BF0",
  text: "#FFFFFF",
  textMuted: "rgba(255,255,255,0.55)",
  heart: "#3FA9F5",
};

/* ---------- 1. Promo banner ("30% Off") ---------- */
type PromoCardProps = {
  image: ImageSourcePropType;
  label: string; // e.g. "30% Off"
  onPress?: () => void;
  style?: ViewStyle;
};

export function PromoCard({ image, label, onPress, style }: PromoCardProps) {
  return (
    <Pressable onPress={onPress} style={[styles.promo, style]}>
      <Image source={image} style={styles.promoImage} resizeMode="contain" />
      <Text style={styles.promoLabel}>{label}</Text>
    </Pressable>
  );
}

/* ---------- 2. Category chip ---------- */
type CategoryChipProps = {
  icon?: keyof typeof Ionicons.glyphMap;
  label?: string; // shown instead of icon when provided (e.g. "All")
  active?: boolean;
  onPress?: () => void;
};

export function CategoryChip({
  icon,
  label,
  active,
  onPress,
}: CategoryChipProps) {
  const content = label ? (
    <Text style={styles.chipLabel}>{label}</Text>
  ) : (
    <Ionicons
      name={icon ?? "bicycle"}
      size={26}
      color={active ? "#fff" : theme.textMuted}
    />
  );

  return (
    <Pressable onPress={onPress}>
      {active ? (
        <LinearGradient
          colors={[theme.blueStart, theme.blueEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.chip, styles.chipActive]}
        >
          {content}
        </LinearGradient>
      ) : (
        <View style={[styles.chip, styles.chipIdle]}>{content}</View>
      )}
    </Pressable>
  );
}

/* ---------- 3. Product card (bike / helmet) ---------- */
type ProductCardProps = {
  image: ImageSourcePropType;
  category: string; // "Road Bike"
  name: string; // "PEUGEOT - LR01"
  price: number;
  favorite?: boolean;
  onToggleFavorite?: (next: boolean) => void;
  onPress?: () => void;
  tilt?: "left" | "right" | "none"; // matches the angled cards in the design
  style?: ViewStyle;
};

export function ProductCard({
  image,
  category,
  name,
  price,
  favorite = false,
  onToggleFavorite,
  onPress,
  tilt = "left",
  style,
}: ProductCardProps) {
  const [liked, setLiked] = useState(favorite);

  const toggle = () => {
    const next = !liked;
    setLiked(next);
    onToggleFavorite?.(next);
  };

  const transform =
    tilt === "left"
      ? [{ perspective: 900 }, { rotateY: "8deg" }, { rotate: "-4deg" }]
      : tilt === "right"
        ? [{ perspective: 900 }, { rotateY: "-8deg" }, { rotate: "3deg" }]
        : [];

  return (
    <TouchableOpacity onPress={onPress} style={styles.product}>
      <Pressable onPress={toggle} hitSlop={10} style={styles.heart}>
        <Ionicons
          name={liked ? "heart" : "heart-outline"}
          size={22}
          color={liked ? theme.heart : "#fff"}
        />
      </Pressable>

      <View style={styles.productImageWrap}>
        <Image
          source={image}
          style={styles.productImage}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.productCategory}>{category}</Text>
      <Text style={styles.productName} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.productPrice}>
        $ {price.toLocaleString("en-US", { minimumFractionDigits: 2 })}
      </Text>
    </TouchableOpacity>
  );
}

/* ---------- Example usage ---------- */
// <PromoCard image={require('./assets/bike-hero.png')} label="30% Off" />
//
// <View style={{ flexDirection: 'row', gap: 14 }}>
//   <CategoryChip label="All" active />
//   <CategoryChip icon="bicycle" />
//   <CategoryChip icon="speedometer" />
//   <CategoryChip icon="triangle" />
//   <CategoryChip icon="shield" />
// </View>
//
// <ProductCard
//   image={require('./assets/peugeot.png')}
//   category="Road Bike"
//   name="PEUGEOT - LR01"
//   price={1999.99}
//   tilt="left"
// />
// <ProductCard
//   image={require('./assets/helmet.png')}
//   category="Road Helmet"
//   name="SMITH - Trade"
//   price={120}
//   tilt="right"
// />

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  promo: {
    height: 200,
    borderRadius: 28,
    backgroundColor: theme.glass,
    borderWidth: 1,
    borderColor: theme.glassBorder,
    padding: 16,
    justifyContent: "flex-end",
    overflow: "hidden",
    transform: [{ perspective: 1000 }, { rotate: "-1.5deg" }],
  },
  promoImage: {
    position: "absolute",
    top: 10,
    width: 350,
    height: 150,
  },
  promoLabel: {
    fontSize: 26,
    fontWeight: "700",
    color: theme.textMuted,
  },

  chip: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    shadowColor: theme.blueStart,
    shadowOpacity: 0.5,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  chipIdle: {
    backgroundColor: theme.glass,
    borderWidth: 1,
    borderColor: theme.glassBorder,
  },
  chipLabel: { color: "#fff", fontWeight: "700", fontSize: 14 },

  product: {
    height: 200,
    borderRadius: 24,
    backgroundColor: theme.glass,
    borderWidth: 1,
    borderColor: theme.glassBorder,
    padding: 5,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    width: 160,
    marginBottom: 20,
  },
  heart: { position: "absolute", top: 12, right: 12, zIndex: 2 },
  productImageWrap: {
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: { width: "100%", height: "100%" },
  productCategory: {
    marginTop: 10,
    fontSize: 12,
    color: theme.textMuted,
  },
  productName: {
    marginTop: 2,
    fontSize: 15,
    fontWeight: "700",
    color: theme.text,
  },
  productPrice: {
    marginTop: 4,
    fontSize: 12,
    color: theme.textMuted,
  },
});
