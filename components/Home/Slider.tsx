import { db } from "@/config/firebaseConfig";
import { SliderTypes } from "@/types/Slider.types";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";

const Slider = () => {
  const [sliderList, setSliderList] = useState<SliderTypes[] | DocumentData[]>(
    []
  );
  useEffect(() => {
    GetSliders();
  }, []);

  const GetSliders = async () => {
    setSliderList([]);
    const snapshot = await getDocs(collection(db, "Sliders"));
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setSliderList((sliderList) => [...sliderList, doc.data()]);
    });
  };
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <FlatList
        data={sliderList as SliderTypes[]}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View key={index} style={[{ marginLeft: index > 0 ? 20 : 0 }]}>
            <Image
              source={{ uri: item?.imageUrl }}
              style={styles.sliderImage}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
  sliderImage: {
    width: Dimensions.get("screen").width * 0.9,
    height: Dimensions.get("screen").height * 0.2,
    borderRadius: 15,
    // marginRight: 15,
  },
});
