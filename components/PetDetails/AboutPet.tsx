import Colors from "@/constants/Colors";
import { PetTypes } from "@/types/Pet.types";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const AboutPet = ({ pet }: { pet: PetTypes }) => {
  const [readMore, setReadMore] = useState(true);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        About {pet?.name}
      </Text>
      <Text
        numberOfLines={readMore ? 3 : 0}
        style={{ fontFamily: "outfit", fontSize: 14 }}
      >
        {pet?.about}
      </Text>
      {readMore && (
        <Pressable onPress={() => setReadMore(!readMore)}>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 14,
              color: Colors.SECONDARY,
            }}
          >
            {" "}
            Read More
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default AboutPet;

const styles = StyleSheet.create({});
