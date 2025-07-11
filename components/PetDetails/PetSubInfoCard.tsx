import Colors from "@/constants/Colors";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";

export default function PetSubInfoCard({
  icon,
  title,
  value,
}: {
  icon: ImageSourcePropType;
  title: string;
  value: string;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        padding: 10,
        margin: 5,
        borderRadius: 8,
        gap: 10,
        flex: 1,
      }}
    >
      <Image
        source={icon}
        style={{
          width: 40,
          height: 40,
        }}
      />
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
        >
          {title}
        </Text>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 16 }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
