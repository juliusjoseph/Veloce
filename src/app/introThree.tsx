import AppImage from "@/components/AppImage";
import { colors } from "@/components/colors";
import GradientButton from "@/components/GradientButton";
import Screen from "@/components/Screen";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const introThree = () => {
  const router = useRouter();
  return (
    <Screen>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <Text style={{ color: colors.primaryDark }}>Ride ready</Text>
      </View>
      <View
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppImage
          source={require("../../assets/images/repair.png")}
          height={"100%"}
        />
      </View>

      <View style={{ width: "60%" }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: colors.textPrimary,
          }}
        >
          Checkout fast. Ride with confidence.
        </Text>
      </View>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          marginTop: 15,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: colors.textSecondary,
          }}
        >
          Secure payment, insured delivery and expert setup—so your new bike
          arrives ready for the road.
        </Text>
      </View>
      <View style={{ marginTop: "25%" }}>
        <GradientButton
          title="Next"
          onPress={() => {
            router.push("/");
          }}
        />
      </View>
    </Screen>
  );
};

export default introThree;
