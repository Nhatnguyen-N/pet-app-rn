import PetListItem from "@/components/Home/PetListItem";
import { db } from "@/config/firebaseConfig";
import Shared from "@/Shared/Shared";
import { PetTypes } from "@/types/Pet.types";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Favorite = () => {
  const { user } = useUser();
  const [favIds, setFavIds] = useState([]);
  const [favPetList, setFavPetList] = useState<DocumentData[] | PetTypes[]>([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    user && GetFavPetIds();
  }, [user]);

  const GetFavPetIds = async () => {
    setLoader(true);
    const results = await Shared.GetFavList(user);
    setFavIds(results?.favorites);
    setLoader(false);
    GetFavPetList(results?.favorites);
  };
  const GetFavPetList = async (ids: any) => {
    setLoader(true);
    setFavPetList([]);
    const q = query(collection(db, "Pets"), where("id", "in", ids));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setFavPetList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: Platform.OS === "ios" ? 10 : 20,
        paddingBottom: 20,
        marginTop: 20,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-medium",
          fontSize: 30,
        }}
      >
        Favorite
      </Text>
      <FlatList
        data={favPetList as PetTypes[]}
        numColumns={2}
        onRefresh={GetFavPetIds}
        refreshing={loader}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Favorite;

const styles = StyleSheet.create({});
