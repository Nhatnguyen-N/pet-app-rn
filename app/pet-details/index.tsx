import AboutPet from "@/components/PetDetails/AboutPet";
import OwnerInfo from "@/components/PetDetails/OwnerInfo";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import Colors from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const PetDetails = () => {
  const pet = useLocalSearchParams();

  return (
    <View style={{}}>
      <ScrollView>
        {/* Pet Info */}
        <PetInfo pet={pet as any} />
        {/* Pet Properties */}
        <PetSubInfo pet={pet as any} />
        {/* About */}
        <AboutPet pet={pet as any} />
        {/* Owner Details */}
        <OwnerInfo pet={pet as any} />
        <View style={{ height: 70 }} />
      </ScrollView>
      {/* Adopt Me Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.sdoptBtn}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Adopt Me
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  sdoptBtn: { padding: 15, backgroundColor: Colors.PRIMARY },
  bottomContainer: {
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
