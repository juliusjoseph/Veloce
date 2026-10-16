import Bike from "@/assets/icons/bike.svg";
import Google from "@/assets/icons/google.svg";
import Zap from "@/assets/icons/zap.svg";
import AppTextInput from "@/components/AppTextInput";
import { colors, gradients } from "@/components/colors";
import GradientButton from "@/components/GradientButton";
import Screen from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const signIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  const [remember, setRemember] = useState(true);
  return (
    <Screen>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          height: "10%",
          alignItems: "center",
        }}
      >
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

      <View
        style={{
          flexDirection: "row",
          padding: 4,
          alignItems: "center",
          backgroundColor: colors.surface,
          borderRadius: 15,
          width: "40%",
          justifyContent: "space-evenly",
          marginTop: 10,
        }}
      >
        <Zap />
        <Text
          style={{
            fontSize: 15,
            color: colors.primaryDark,
            fontWeight: "bold",
          }}
        >
          Rider access
        </Text>
      </View>

      <View style={{ width: "100%", marginTop: 15 }}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: "bold",
            color: colors.textPrimary,
          }}
        >
          Welcome back.
        </Text>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "bold",
            color: colors.textSecondary,
            paddingTop: 15,
          }}
        >
          Sign in to continue building your perfect ride.
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

        <AppTextInput
          label="Password"
          icon="lock-closed-outline"
          isPassword
          value={form.password}
          onChangeText={(t) => setForm({ ...form, password: t })}
        />
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.checkRow}
          onPress={() => setRemember(!remember)}
          activeOpacity={0.7}
        >
          <View style={[styles.box, remember && styles.boxChecked]}>
            {remember && (
              <Ionicons name="checkmark" size={16} color={colors.textPrimary} />
            )}
          </View>
          <Text style={styles.label}>Remember me</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/(Auth)/forget_password")}
          hitSlop={10}
        >
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: "10%" }}>
        <GradientButton
          title="Login"
          onPress={() => {
            router.replace("/(Tabs)");
          }}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          marginTop: 15,
        }}
      >
        <View
          style={{
            width: "40%",
            height: 1,
            backgroundColor: colors.surface,
            marginTop: 5,
          }}
        ></View>
        <Text style={{ color: colors.textSecondary }}>OR</Text>
        <View
          style={{
            width: "40%",
            height: 1,
            backgroundColor: colors.surface,
            marginTop: 5,
          }}
        ></View>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: colors.whiteTint,
          minHeight: 50,
          borderRadius: 14,
          paddingLeft: 24,
          paddingRight: 10,
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: "#5A6A7C",
          flexDirection: "row",
          marginTop: 15,
        }}
      >
        <Google />
        <Text style={{ color: colors.textPrimary, paddingLeft: 10 }}>
          Continue with Google
        </Text>
      </TouchableOpacity>

      <View style={{ marginTop: 15, alignItems: "center", width: "100%" }}>
        <Text
          style={{
            fontSize: 15,
            color: colors.textSecondary,
          }}
        >
          New to Volece?{" "}
          <Text
            style={{
              fontSize: 15,
              fontWeight: "700",
              color: colors.primaryDark,
            }}
            onPress={() => router.push("/(Auth)/sign_up")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 15,
  },
  checkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.whiteTint,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  boxChecked: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
  },
  label: {
    fontSize: 15,
    color: colors.textSecondary,
  },
  link: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primaryDark,
  },
});

export default signIn;
