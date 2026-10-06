import { Stack } from "expo-router";

/** Renders the root navigation stack with screen headers hidden. */
export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
