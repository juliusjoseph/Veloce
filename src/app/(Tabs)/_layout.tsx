import Cart from "@/assets/icons/cart.svg";
import Doc from "@/assets/icons/doc.svg";
import MapIcon from "@/assets/icons/map.svg";
import Person from "@/assets/icons/person.svg";
import Subtract from "@/assets/icons/subtract.svg";
import VeloceTabBar from "@/components/VeloceTabBar";
import { Tabs } from "expo-router";
import React from "react";
import type { SvgProps } from "react-native-svg";

type IconFn = (p: { color: string }) => React.ReactElement;

/** Builds a tabBarIcon from an SVG. The tab bar handles the pill + label. */
const icon =
  (Icon: React.FC<SvgProps>): IconFn =>
  ({ color }) => <Icon width={22} height={22} color={color} />;

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <VeloceTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Browse", tabBarIcon: icon(Subtract) }}
      />
      <Tabs.Screen
        name="map"
        options={{ title: "Explore", tabBarIcon: icon(MapIcon) }}
      />
      <Tabs.Screen
        name="cart"
        options={{ title: "Cart", tabBarIcon: icon(Cart) }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{ title: "Profile", tabBarIcon: icon(Person) }}
      />
      <Tabs.Screen
        name="checkout"
        options={{ title: "Orders", tabBarIcon: icon(Doc) }}
      />
    </Tabs>
  );
}
