import Bike from "@/assets/icons/bike.svg";
import Check from "@/assets/icons/check.svg";
import Shield from "@/assets/icons/shield.svg";
import { colors, gradients } from "@/components/colors";
import GradientButton from "@/components/GradientButton";
import OtpInput from "@/components/otpinput";
import Screen from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

const get_otp = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  function verifyCode(c: string): void {
    throw new Error("Function not implemented.");
  }

  function sendNewCode(): void {
    throw new Error("Function not implemented.");
  }

  const [error, setError] = useState("");

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
        <Shield />
      </View>

      <View style={{ width: "100%", marginTop: 15 }}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            color: colors.textPrimary,
          }}
        >
          Check your inbox.
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: colors.textSecondary,
            paddingTop: 15,
          }}
        >
          We sent a six-digit verification code to{" "}
          <Text style={{ color: colors.textPrimary, fontWeight: "bold" }}>
            alex@pelotonmail.com
          </Text>
        </Text>
      </View>

      <View style={{ marginTop: 15 }}>
        <OtpInput
          value={code}
          onChange={setCode}
          onComplete={(c) => verifyCode(c)} // runs when all 6 digits are entered
          onResend={() => sendNewCode()} // runs when "Resend code" is tapped
          resendSeconds={30}
          error={error}
        />
      </View>

      <View style={{ marginTop: "10%" }}>
        <GradientButton
          title="Verify account"
          onPress={() => {
            router.push("/(Auth)/sign_up");
          }}
          icon={<Check color={"#FFFFFF"} />}
        />
      </View>
    </Screen>
  );
};

export default get_otp;
