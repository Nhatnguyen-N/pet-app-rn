import Colors from "@/constants/Colors";
import { UserTypes } from "@/types/Pet.types";
import { Link } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const UserItem = ({ user }: { user: UserTypes }) => {
  return (
    <Link href={`/chat?id=${user?.docId || ""}`}>
      <View
        style={{
          marginVertical: 7,
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 40, height: 40, borderRadius: 99 }}
        />
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
          }}
        >
          {user?.name}
        </Text>
      </View>
      <View
        style={{
          borderWidth: 0.5,
          marginVertical: 7,
          borderColor: Colors.GRAY,
        }}
      ></View>
    </Link>
  );
};

export default UserItem;

const styles = StyleSheet.create({});
