import UserItem from "@/components/Inbox/UserItem";
import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import {
  collection,
  DocumentData,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const Inbox = () => {
  const { user } = useUser();
  const [userList, setUserList] = useState<DocumentData[]>([]);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    user && GetUserList();
  }, [user]);

  // Get User List Depends on Current User Emails
  const GetUserList = async () => {
    setLoader(true);
    setUserList([]);
    const q = query(
      collection(db, "Chat"),
      where(
        "userIds",
        "array-contains",
        user?.primaryEmailAddress?.emailAddress
      )
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setUserList((prevList) => [...prevList, doc.data()]);
    });
    setLoader(false);
  };
  // Filter the list of Other User in one state
  const MapOtherUserList = () => {
    const list = [] as any[];
    userList.forEach((record) => {
      const otherUser = record.users?.filter(
        (userprop: any) =>
          userprop?.email !== user?.primaryEmailAddress?.emailAddress
      );
      const result = {
        docId: record.id,
        ...otherUser[0],
      };
      list.push(result);
    });
    return list;
  };
  return (
    <View
      style={{
        padding: 20,
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
        Inbox
      </Text>
      <FlatList
        data={MapOtherUserList()}
        refreshing={loader}
        onRefresh={() => GetUserList()}
        style={{
          marginTop: 20,
        }}
        renderItem={({ item, index }) => <UserItem user={item} key={index} />}
      />
    </View>
  );
};

export default Inbox;

const styles = StyleSheet.create({});
