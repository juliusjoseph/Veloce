import Bike from "@/assets/icons/bike.svg";
import Key from "@/assets/icons/key.svg";
import Send from "@/assets/icons/send.svg";
import AppTextInput from "@/components/AppTextInput";
import { colors, gradients } from "@/components/colors";
import GradientButton from "@/components/GradientButton";
import Screen from "@/components/Screen";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const forget_password = () => {
  const [form, setForm] = useState({
    email: "",
  });
  const router = useRouter();
  return (
    <Screen>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          height: "10%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity
            style={{
              width: 38,
              height: 38,
              backgroundColor: colors.surface,
              borderRadius: 10,
              borderWidth: 1,
              justifyContent: "center",
              alignItems: "center",
              borderColor: colors.whiteTint,
            }}
          >
            <Ionicons name="arrow-back" size={15} color="#FFFFFF" />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              color: colors.textSecondary,
              paddingLeft: 10,
            }}
          >
            Go Back
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <LinearGradient
            colors={gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: 45,
              height: 45,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Bike />
          </LinearGradient>
          <View style={{ marginLeft: 10 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: colors.textPrimary,
              }}
            >
              VELOCE
            </Text>
            <Text style={{ fontSize: 14, color: colors.primaryDark }}>
              Ride beyond
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          width: "15%",
          height: 50,
          backgroundColor: "#14213E",
          borderRadius: 18,
          borderWidth: 1,
          justifyContent: "center",
          alignItems: "center",
          borderColor: "#5A7ABF",
        }}
      >
        <Key />
      </View>

      <View style={{ width: "100%", marginTop: 15 }}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            color: colors.textPrimary,
          }}
        >
          Reset your password.
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.textSecondary,
            paddingTop: 15,
          }}
        >
          Enter the email linked to your Veloce account. We’ll send a secure
          reset link.
        </Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <AppTextInput
          label="Email"
          icon="mail-outline"
          keyboardType="email-address"
          autoCapitalize="none"
          value={form.email}
          onChangeText={(t) => setForm({ ...form, email: t })}
        />
      </View>

      <View style={{ marginTop: "10%" }}>
        <GradientButton
          title="Send reset link"
          onPress={() => {
            router.push("/(Auth)/get_otp");
          }}
          icon={<Send color={"#FFFFFF"} />}
        />
      </View>
    </Screen>
  );
};

export default forget_password;
