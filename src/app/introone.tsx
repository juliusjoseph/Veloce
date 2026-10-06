import AppImage from "@/components/AppImage";
import { colors } from "@/components/colors";
import GradientButton from "@/components/GradientButton";
import Screen from "@/components/Screen";
import { Link, useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const introone = () => {
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
        <Text style={{ color: colors.primaryDark }}>Discover</Text>
        <Link href={"/"} style={{ color: colors.textSecondary }}>
          Skip
        </Link>
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
          source={require("../../assets/images/stage.png")}
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
          Exceptional bikes, handpicked for you.
        </Text>
      </View>
      <View
        style={{
          width: "100%",
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
          Explore road, gravel and electric machines from the world’s most
          respected makers.
        </Text>
      </View>
      <View style={{ marginTop: "25%" }}>
        <GradientButton
          title="Next"
          onPress={() => {
            router.push("/introTwo");
          }}
        />
      </View>
    </Screen>
  );
};

export default introone;
