import { Header } from "@/components/Header";
import { ToneProvider } from "@/context/ToneContext";
import { Stack, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Root Layout Component:
 * Configures the primary Expo Router navigation stack, wrapping the entire app
 * with the global ToneProvider, device notch-safe area padding, and a persistent Header.
 */
export default function RootLayout() {
  return (
    <ToneProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#18181b' }}>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: '#080808' },
            headerShown: true,
            // Shared top header with a reset callback to dismiss all screens
            header: () => <Header onReset={() => { router.dismissAll() }} />
          }}
        />
      </SafeAreaView>
    </ToneProvider>
  );
}
