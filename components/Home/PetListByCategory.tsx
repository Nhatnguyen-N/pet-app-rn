import { db } from "@/config/firebaseConfig";
import { PetTypes } from "@/types/Pet.types";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Category from "./Category";
import PetListItem from "./PetListItem";

const PetListByCategory = () => {
  const [petList, setPetList] = useState<DocumentData[] | PetTypes[]>([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    GetPetList("Fish");
  }, []);
  const GetPetList = async (category: string) => {
    setLoader(true);
    setPetList([]);
    const q = query(collection(db, "Pets"), where("category", "==", category));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setPetList((petList) => [...petList, doc.data()]);
    });
    setLoader(false);
  };
  return (
    <View>
      <Category category={(value) => GetPetList(value)} />
      <FlatList
        data={petList as PetTypes[]}
        scrollEnabled={petList.length > 1 ? true : false}
        style={{ marginTop: 10 }}
        // horizontal
        numColumns={2}
        refreshing={loader}
        onRefresh={() => GetPetList("Fish")}
        renderItem={({ item, index }) => <PetListItem pet={item} />}
      />
    </View>
  );
};

export default PetListByCategory;

const styles = StyleSheet.create({});
