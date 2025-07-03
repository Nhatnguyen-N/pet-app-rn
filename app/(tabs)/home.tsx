import Header from "@/components/Home/Header";
import PetListByCategory from "@/components/Home/PetListByCategory";
import Slider from "@/components/Home/Slider";
import React from "react";
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
    </SafeAreaView>
  );
};

export default Home;
