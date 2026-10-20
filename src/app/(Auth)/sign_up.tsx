import Bike from "@/assets/icons/bike.svg";
import Google from "@/assets/icons/google.svg";
import AppTextInput from "@/components/AppTextInput";
import { gradients } from "@/components/colors";
import Screen from "@/components/Screen";
import { radius, spacing, typography, useTheme } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const signUp = () => {
  const theme = useTheme();
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
      <Screen
        scroll
        style={{ paddingHorizontal: spacing.lg }}
        backgroundColor={theme.background}
        lightStatusBar={false}
      >
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
              borderRadius: radius.md,
            }}
          >
            <Bike />
          </LinearGradient>
          <View style={{ marginLeft: spacing.md }}>
            <Text
              style={{
                ...typography.headline,
                color: theme.textPrimary,
              }}
            >
              VELOCE
            </Text>
            <Text style={{ ...typography.footnote, color: theme.primary }}>
              Ride beyond
            </Text>
          </View>
        </View>

        <View style={{ width: "100%", marginTop: spacing.xl }}>
          <Text
            style={{
              ...typography.title,
              color: theme.textPrimary,
            }}
          >
            Create your rider account.
          </Text>
          <Text
            style={{
              ...typography.subhead,
              color: theme.textSecondary,
              paddingTop: spacing.sm,
            }}
          >
            Save favorites, compare builds and track every order.
          </Text>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <AppTextInput
            label="Full Name"
            icon="person-outline"
            value={form.name}
            onChangeText={(t) => setForm({ ...form, name: t })}
            autoComplete="name"
            textContentType="name"
            returnKeyType="next"
          />

          <AppTextInput
            label="Email"
            icon="mail-outline"
            keyboardType="email-address"
            autoCapitalize="none"
            value={form.email}
            onChangeText={(t) => setForm({ ...form, email: t })}
            autoComplete="email"
            textContentType="emailAddress"
            returnKeyType="next"
          />

          <AppTextInput
            label="Password"
            icon="lock-closed-outline"
            isPassword
            value={form.password}
            onChangeText={(t) => setForm({ ...form, password: t })}
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="next"
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
            autoComplete="new-password"
            textContentType="newPassword"
            returnKeyType="done"
          />
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setRemember(!remember)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.box,
                { borderColor: theme.separator, backgroundColor: theme.surface },
                remember && {
                  backgroundColor: theme.primary,
                  borderColor: theme.primary,
                },
              ]}
            >
              {remember && (
                <Ionicons name="checkmark" size={16} color="#FFFFFF" />
              )}
            </View>
          </TouchableOpacity>
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            {" "}
            I agree to the Terms & Privacy Policy
          </Text>
        </View>

        <View style={{ marginTop: spacing.xl }}>
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              router.push("/(Auth)/sign_in");
            }}
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.pressedButton,
            ]}
          >
            <LinearGradient
              colors={gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.primaryButtonContent}
            >
              <Text style={styles.primaryButtonText}>Create account</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </LinearGradient>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
            marginTop: spacing.xl,
          }}
        >
          <View
            style={{
              width: "40%",
              height: 1,
              backgroundColor: theme.separator,
              marginTop: spacing.xs,
            }}
          ></View>
          <Text style={{ ...typography.footnote, color: theme.textSecondary }}>
            OR
          </Text>
          <View
            style={{
              width: "40%",
              height: 1,
              backgroundColor: theme.separator,
              marginTop: spacing.xs,
            }}
          ></View>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: theme.surface,
            minHeight: 50,
            borderRadius: radius.md,
            paddingLeft: 24,
            paddingRight: 10,
            paddingVertical: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: theme.separator,
            flexDirection: "row",
            marginTop: spacing.xl,
          }}
        >
          <Google />
          <Text
            style={{
              ...typography.callout,
              color: theme.textPrimary,
              paddingLeft: spacing.md,
            }}
          >
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View
          style={{
            marginTop: spacing.xl,
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text
            style={{
              ...typography.subhead,
              color: theme.textSecondary,
            }}
          >
            Already have an account?{" "}
            <Text
              style={{
                ...typography.subhead,
                fontWeight: "700",
                color: theme.primary,
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
    gap: spacing.md,
    minHeight: 48,
  },
  box: {
    width: 24,
    height: 24,
    borderRadius: radius.sm,
    borderWidth: 1.5,
    borderColor: "transparent",
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    ...typography.subhead,
    paddingLeft: spacing.md,
  },
  primaryButton: {
    height: 50,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  primaryButtonContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
  },
  primaryButtonText: {
    ...typography.headline,
    color: "#FFFFFF",
  },
  pressedButton: { opacity: 0.7 },
});

export default signUp;
