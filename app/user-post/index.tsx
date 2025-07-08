import PetListItem from "@/components/Home/PetListItem";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import { PetTypes } from "@/types/Pet.types";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function UserPost() {
  const { user } = useUser();
  const [userPostList, setUserPostList] = useState<DocumentData[] | PetTypes[]>(
    []
  );
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    user && GetUserPost();
  }, [user]);
  const GetUserPost = async () => {
    setLoader(true);
    setUserPostList([]);
    const q = query(
      collection(db, "Pets"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUserPostList((prev) => [...prev, doc.data()]);
    });
    setLoader(false);
  };

  const onDeletePost = (docId: string) => {
    Alert.alert(
      "Do you want to Delete?",
      "Do you really want to delete this post",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Click"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deletePost(docId),
        },
      ]
    );
  };
  const deletePost = async (docId: string) => {
    await deleteDoc(doc(db, "Pets", docId));
    GetUserPost();
  };

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={{ fontFamily: "outfit-medium", fontSize: 30 }}>
        UserPost
      </Text>
      <FlatList
        data={userPostList as PetTypes[]}
        refreshing={loader}
        onRefresh={() => GetUserPost()}
        numColumns={2}
        renderItem={({ item, index }) => (
          <View>
            <PetListItem pet={item} key={index} />
            <Pressable
              onPress={() => onDeletePost(item?.id)}
              style={styles.deleteBtn}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  textAlign: "center",
                }}
              >
                Delete
              </Text>
            </Pressable>
          </View>
        )}
      />
      {userPostList?.length === 0 && <Text>No Post Found</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteBtn: {
    backgroundColor: Colors.LIGHT_PRIMARY,
    padding: 5,
    borderRadius: 7,
    marginTop: 5,
    marginRight: 10,
  },
});
