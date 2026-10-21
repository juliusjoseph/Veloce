// OrdersScreen.tsx → paste into app/(tabs)/checkout.tsx (your Orders tab route)
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/components/colors";
import { useFloatingTabBarSpace } from "@/components/VeloceTabBar";
import {
  ActivityCard,
  IconButton,
  OrderCard,
  ScreenHeader,
  SectionHeader,
  SegmentedTabs,
} from "@/components";

type Tab = "active" | "past" | "service";

// Swap these for your own assets: require('@/assets/images/soloist.png')
const BIKE_IMG = { uri: "https://picsum.photos/id/146/300/240" };
const HELMET_IMG = { uri: "https://picsum.photos/id/1062/300/300" };

const TIMELINE = [
  { label: "Confirmed", date: "Oct 01" },
  { label: "Prepared", date: "Oct 02" },
  { label: "Shipped", date: "Today" },
  { label: "Delivered", date: "Oct 05" },
];

// Replace with data from your API / context
const PAST_ORDERS = [
  {
    id: "VL-10217",
    name: "Smith Network MIPS",
    price: 170,
    date: "SEP 18",
    image: HELMET_IMG,
  },
  {
    id: "VL-10102",
    name: "Pilot Chromoly 520",
    price: 3999,
    date: "AUG 30",
    image: BIKE_IMG,
  },
];

export default function OrdersScreen() {
  const space = useFloatingTabBarSpace();
  const [tab, setTab] = useState<Tab>("active");

  return (
    <SafeAreaView style={s.root} edges={["top"]}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: space }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader
          title="Orders"
          subtitle="Track purchases and service"
          right={<IconButton icon="headset-outline" onPress={() => {}} />}
        />

        <View style={s.body}>
          <SegmentedTabs
            tabs={[
              { key: "active", label: "Active" },
              { key: "past", label: "Past" },
              { key: "service", label: "Service" },
            ]}
            value={tab}
            onChange={setTab}
          />

          {tab === "active" && (
            <>
              <OrderCard
                style={s.cardGap}
                orderId="VL-10482"
                status="In transit"
                badge={{ label: "ON SCHEDULE", tone: "success" }}
                image={BIKE_IMG}
                category="Road bike"
                name="Cervélo Soloist 105"
                details="Embers · 54 cm · 1 item"
                price={3400}
                steps={TIMELINE}
                currentStep={2}
                eta="Estimated delivery · Monday, Oct 05"
                onTrack={() => {}}
              />

              <SectionHeader
                title="Recent activity"
                actionLabel="View history"
                onAction={() => setTab("past")}
              />
              <ActivityCard
                image={HELMET_IMG}
                statusLabel="DELIVERED SEP 18"
                name="Smith Network MIPS"
                meta="Order #VL-10217 · $170"
                onReorder={() => {}}
              />
            </>
          )}

          {tab === "past" &&
            PAST_ORDERS.map((o) => (
              <View key={o.id} style={s.cardGap}>
                <ActivityCard
                  image={o.image}
                  statusLabel={`DELIVERED ${o.date}`}
                  name={o.name}
                  meta={`Order #${o.id} · $${o.price.toLocaleString("en-US")}`}
                  onReorder={() => {}}
                />
              </View>
            ))}

          {tab === "service" && (
            <Text style={s.empty}>No service bookings yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.background },
  body: { paddingHorizontal: 20, marginTop: 4 },
  cardGap: { marginTop: 16 },
  empty: {
    color: colors.textSecondary,
    textAlign: "center",
    marginTop: 48,
    fontSize: 14,
  },
});
