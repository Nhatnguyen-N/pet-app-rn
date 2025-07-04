import Header from "@/components/Home/Header";
import PetListByCategory from "@/components/Home/PetListByCategory";
import Slider from "@/components/Home/Slider";
import Colors from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  return (
    <SafeAreaView
      style={{ paddingHorizontal: 20, paddingBottom: 20, marginTop: 20 }}
    >
      {/* Header */}
      <Header />
      {/* Slider */}
      <Slider />
      {/* PetList + Category */}
      <PetListByCategory />
      {/* Add New Pet Option */}
      <TouchableOpacity style={styles.addNewPetContainer}>
        <MaterialIcons name="pets" size={24} color={Colors.PRIMARY} />
        <Text
          style={{
            fontFamily: "outfit-medium",
            color: Colors.PRIMARY,
            fontSize: 18,
          }}
        >
          Add New Pet
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addNewPetContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    backgroundColor: Colors.LIGHT_PRIMARY,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    borderRadius: 15,
    borderStyle: "dashed",
    justifyContent: "center",
  },
});

export default Home;
