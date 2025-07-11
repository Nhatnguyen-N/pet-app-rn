import { useUser } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const { user } = useUser();

  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    CheckNavLoaded();
  }, []);
  const CheckNavLoaded = () => {
    if (!rootNavigationState.key) return null;
  };
  return (
    user && (
      <View
        style={{
          flex: 1,
        }}
      >
        {user ? (
          <Redirect href={"/(tabs)/home"} />
        ) : (
          <Redirect href={"/login"} />
        )}
      </View>
    )
  );
}
