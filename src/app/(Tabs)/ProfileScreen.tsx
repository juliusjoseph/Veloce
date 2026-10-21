// screens/ProfileScreen.tsx
import {
  IconButton,
  MembershipCard,
  MenuItem,
  MenuList,
  ProfileHeader,
  ScreenHeader,
  StatsRow,
} from "@/components";
import Screen from "@/components/Screen";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

// Swap for your own asset: require('../assets/avatar.png')
const AVATAR = { uri: "https://i.pravatar.cc/200?img=47" };

export default function ProfileScreen() {
  const [tab, setTab] = useState("profile");

  // Wire these to your navigation (Expo Router / React Navigation)
  const menu: MenuItem[] = [
    {
      key: "garage",
      icon: "bicycle",
      label: "My garage",
      meta: "3 bikes",
      onPress: () => {},
    },
    {
      key: "saved",
      icon: "heart-outline",
      label: "Saved bikes",
      meta: "12",
      onPress: () => {},
    },
    {
      key: "fit",
      icon: "resize-outline",
      label: "Fit profile",
      meta: "Updated",
      onPress: () => {},
    },
    {
      key: "payment",
      icon: "card-outline",
      label: "Payment & addresses",
      onPress: () => {},
    },
  ];

  return (
    <Screen scroll>
      <ScreenHeader
        title="Profile"
        subtitle="Your Veloce riding account"
        right={<IconButton icon="settings-outline" onPress={() => {}} />}
      />

      <ProfileHeader
        name="Alex Morgan"
        subtitle="Road rider · San Francisco, CA"
        avatar={AVATAR}
        verified
        onEdit={() => {}}
      />

      <MembershipCard
        tier="VELOCE PLUS"
        since="Since 2024"
        title="Priority service unlocked"
        perks="Free bike fitting · Insured delivery · 2× points"
      />

      <StatsRow
        stats={[
          { value: "1,284", label: "Miles ridden" },
          { value: "3", label: "Bikes owned" },
          { value: "2,460", label: "Velo points" },
        ]}
      />

      <MenuList title="ACCOUNT & RIDING" items={menu} />
      <View style={{ height: 100, width: "100%" }}></View>
    </Screen>
  );
}

const s = StyleSheet.create({
  content: { paddingBottom: 100 },
});
