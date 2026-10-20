import Bike from "@/assets/icons/bike.svg";
import Google from "@/assets/icons/google.svg";
import AppTextInput from "@/components/AppTextInput";
import { colors, gradients } from "@/components/colors";
import GradientButton from "@/components/GradientButton";
import Screen from "@/components/Screen";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const signUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [remember, setRemember] = useState(true);
  const router = useRouter();
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <Screen scroll={true}>
        <View
          style={{
            width: "100%",

            flexDirection: "row",
            height: 55,
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

        <View style={{ width: "100%", marginTop: 10 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: colors.textPrimary,
            }}
          >
            Create your rider account.
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: colors.textSecondary,
              paddingTop: 5,
            }}
          >
            Save favorites, compare builds and track every order.
          </Text>
        </View>

        <View style={{ marginTop: 15 }}>
          <AppTextInput
            label="Full Name"
            icon="person-outline"
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
          />

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

          <AppTextInput
            label="Confirm Password"
            icon="lock-closed-outline"
            isPassword
            error={
              form.confirm && form.confirm !== form.password
                ? "Passwords don't match"
                : undefined
            }
            value={form.confirm}
            onChangeText={(t) => setForm({ ...form, confirm: t })}
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
                <Ionicons
                  name="checkmark"
                  size={16}
                  color={colors.textPrimary}
                />
              )}
            </View>
          </TouchableOpacity>
          <Text style={styles.label}>
            {" "}
            I agree to the Terms & Privacy Policy
          </Text>
        </View>

        <View style={{ marginTop: "5%" }}>
          <GradientButton
            title="Create account"
            onPress={() => {
              router.push("/(Auth)/sign_in");
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
            Already have an account?{" "}
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                color: colors.primaryDark,
              }}
              onPress={() => router.push("/(Auth)/sign_in")}
            >
              Sign in
            </Text>
          </Text>
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
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
    paddingLeft: 15,
  },
});

export default signUp;
