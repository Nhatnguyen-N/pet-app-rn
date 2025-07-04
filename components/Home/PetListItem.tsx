import Colors from "@/constants/Colors";
import { PetTypes } from "@/types/Pet.types";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MarkFav from "../MarkFav";

const PetListItem = ({ pet }: { pet: PetTypes }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/pet-details",
          params: pet as any,
        })
      }
      style={{
        padding: 10,
        marginRight: 15,
        backgroundColor: Colors.WHITE,
        borderRadius: 10,
      }}
    >
      <View style={{ position: "absolute", zIndex: 10, right: 10, top: 10 }}>
        <MarkFav pet={pet} color={"white"} />
      </View>
      <Image
        source={{ uri: pet?.imageUrl }}
        style={{
          width: 150,
          height: 135,
          objectFit: "cover",
          borderRadius: 10,
        }}
      />
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 18,
        }}
      >
        {pet.name}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: Colors.GRAY, fontFamily: "outfit" }}>
          {pet?.breed}
        </Text>
        <Text
          style={{
            color: Colors.PRIMARY,
            backgroundColor: Colors.LIGHT_PRIMARY,
            fontFamily: "outfit",
            paddingHorizontal: 7,
            borderRadius: 10,
          }}
        >
          {pet?.age} YRS
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PetListItem;

const styles = StyleSheet.create({});
