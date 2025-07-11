import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  useFonts({
    outfit: require("./../assets/fonts/Outfit-Regular.ttf"),
    "outfit-medium": require("./../assets/fonts/Outfit-Medium.ttf"),
    "outfit-bold": require("./../assets/fonts/Outfit-Bold.ttf"),
  });
  return (
    <SafeAreaProvider>
      <ClerkProvider tokenCache={tokenCache}>
        <Stack>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="pet-details/index"
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitle: "",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen
            name="add-new-pet/index"
            options={{
              headerShown: true,
              // headerTransparent: true,
              headerTitle: "Add New Pet",
              headerBackButtonDisplayMode: "minimal",
            }}
          />
          <Stack.Screen name="chat/index" />
          <Stack.Screen
            name="user-post/index"
            options={{
              headerBackButtonDisplayMode: "minimal",
              headerTitle: "User Post",
            }}
          />
        </Stack>
      </ClerkProvider>
    </SafeAreaProvider>
  );
}
