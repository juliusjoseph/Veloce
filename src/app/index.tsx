import Arrow from "@/assets/icons/arrow.svg";
import Bike from "@/assets/icons/bike.svg";
import Zap from "@/assets/icons/zap.svg";
import { colors, gradients } from "@/components/colors";
import Screen from "@/components/Screen";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
/** Renders the Veloce landing screen with a button that opens the first onboarding screen. */
export default function Index() {
  const router = useRouter();
  return (
    <Screen backgroundImage={require("@/assets/images/splash.png")}>
      <View
        style={{
          width: "100%",
          marginTop: 20,
          flexDirection: "row",
          height: "70%",
        }}
      >
        <LinearGradient
          colors={gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            width: 55,
            height: 55,
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
          padding: 5,
          alignItems: "center",
          backgroundColor: colors.whiteTint,
          borderRadius: 15,
          width: "40%",
          justifyContent: "space-between",
          borderWidth: 1,
          borderColor: "#5A6A7C",
        }}
      >
        <Zap />
        <Text
          style={{
            fontSize: 15,
            color: colors.textPrimary,
          }}
        >
          2026 collection
        </Text>
      </View>
      <View style={{ width: "50%", marginTop: 15 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            color: colors.textPrimary,
          }}
        >
          Find your next perfect ride.
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
          Curating premium machines…
        </Text>

        <TouchableOpacity
          onPress={() => {
            router.push("/introone");
          }}
          style={{
            backgroundColor: "#262C36",
            borderRadius: 5,
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Arrow />
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
