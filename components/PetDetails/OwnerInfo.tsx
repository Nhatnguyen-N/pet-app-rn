import Colors from "@/constants/Colors";
import { PetTypes } from "@/types/Pet.types";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const OwnerInfo = ({ pet }: { pet: PetTypes }) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",

          gap: 20,
        }}
      >
        <Image
          source={{ uri: pet?.userImage }}
          style={{ width: 50, height: 50, borderRadius: 99 }}
        />
        <View>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
            {pet?.userName}
          </Text>
          <Text style={{ fontFamily: "outfit", color: Colors.GRAY }}>
            Pet Owner
          </Text>
        </View>
      </View>
      <Ionicons name="send-sharp" size={24} color={Colors.PRIMARY} />
    </View>
  );
};

export default OwnerInfo;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    backgroundColor: Colors.WHITE,
    justifyContent: "space-between",
    borderColor: Colors.PRIMARY,
  },
});
