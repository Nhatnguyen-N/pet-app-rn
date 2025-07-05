import Shared from "@/Shared/Shared";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function MarkFav({
  pet,
  color = "black",
}: {
  pet: any;
  color?: string;
}) {
  const { user } = useUser();
  const [favList, setFavList] = useState<DocumentData | undefined>([]);
  useEffect(() => {
    user && GetFav();
  }, [user]);
  const GetFav = async () => {
    const result = await Shared.GetFavList(user);
    // console.log(result);
    // if (!result) return null;
    setFavList(result?.favorites ? result?.favorites : []);
  };
  const AddToFav = async () => {
    const favResult = favList;
    favResult!.push(pet?.id);
    await Shared.UpdateFav(favResult, user);
    GetFav();
  };
  const RemoveFromFav = async () => {
    const favResult = favList!.filter((item: any) => item !== pet.id);
    await Shared.UpdateFav(favResult, user);
    GetFav();
  };
  return (
    <View>
      {favList?.includes(pet.id) ? (
        <Pressable onPress={() => RemoveFromFav()}>
          <Ionicons name="heart" size={30} color={"red"} />
        </Pressable>
      ) : (
        <Pressable onPress={() => AddToFav()}>
          <Ionicons name="heart-outline" size={30} color={color} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
