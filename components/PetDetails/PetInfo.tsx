import Colors from "@/constants/Colors";
import { PetTypes } from "@/types/Pet.types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MarkFav from "../MarkFav";

const PetInfo = ({ pet }: { pet: PetTypes }) => {
  return (
    <View style={{}}>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: "100%",
          height: 400,
          objectFit: "cover",
        }}
      />
      <View
        style={{
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text style={{ fontFamily: "outfit-bold", fontSize: 27 }}>
            {pet?.name}
          </Text>
          <Text
            style={{ fontFamily: "outfit", fontSize: 16, color: Colors.GRAY }}
          >
            {pet?.address}
          </Text>
        </View>
        <MarkFav pet={pet} />
      </View>
    </View>
  );
};

export default PetInfo;

const styles = StyleSheet.create({});
