import { PetTypes } from "@/types/Pet.types";
import React from "react";
import { StyleSheet, View } from "react-native";
import PetSubInfoCard from "./PetSubInfoCard";

const PetSubInfo = ({ pet }: { pet: PetTypes }) => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <PetSubInfoCard
          icon={require("../../assets/images/calendar.png")}
          title="Age"
          value={pet?.age + " Years"}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/bone.png")}
          title="Breed"
          value={pet?.breed}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <PetSubInfoCard
          icon={require("../../assets/images/sex.png")}
          title="Sex"
          value={pet?.sex ? pet?.sex : "unknow"}
        />
        <PetSubInfoCard
          icon={require("../../assets/images/weight.png")}
          title="Weight"
          value={pet?.weight + " Kg"}
        />
      </View>
    </View>
  );
};

export default PetSubInfo;

const styles = StyleSheet.create({});
