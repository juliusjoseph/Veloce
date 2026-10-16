import Cart from "@/assets/icons/cart.svg";
import Doc from "@/assets/icons/doc.svg";
import MapIcon from "@/assets/icons/map.svg";
import Person from "@/assets/icons/person.svg";
import Subtract from "@/assets/icons/subtract.svg";
import { colors } from "@/components/colors";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import type { SvgProps } from "react-native-svg";

const PRIMARY = colors.primary;
const INACTIVE = "#7C8AA5";

type TabIconProps = {
  Icon: React.FC<SvgProps>;
  color: string;
  focused: boolean;
};

/** Icon with a soft glowing pill behind it when the tab is active. */
function TabIcon({ Icon, color, focused }: TabIconProps) {
  return (
    <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
      <Icon width={22} height={22} color={color} />
    </View>
  );
}

/** Renders the bottom tab navigator with a floating glass style. */
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: PRIMARY,
        tabBarInactiveTintColor: INACTIVE,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarLabelStyle: styles.label,
        tabBarBackground: () => (
          <BlurView
            intensity={40}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Browse",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Subtract} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={MapIcon} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Cart} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Person} color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="checkout"
        options={{
          title: "Orders",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon Icon={Doc} color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 5,
    height: 70,
    borderRadius: 26,
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(20,28,46,0.72)",
    overflow: "hidden",
    elevation: 0,
    width: "95%",
    marginLeft: 10,
  },
  tabItem: {
    paddingTop: 8,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  iconWrap: {
    width: 44,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: "rgba(39,198,244,0.14)",
    shadowColor: PRIMARY,
    shadowOpacity: 0.6,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
});
