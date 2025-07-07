import { db } from "@/config/firebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
export default function ChatScreen() {
  const params = useLocalSearchParams();
  const { user } = useUser();
  const navigation = useNavigation();
  const [messages, setMessages] = useState<IMessage[]>([]);
  useEffect(() => {
    GetUserDetails();

    const unsubscribe = onSnapshot(
      collection(db, "Chat", params?.id as string, "Messages"),
      (snapshot) => {
        const messageData = snapshot.docs.map((doc) => ({
          _id: doc.id,
          ...doc.data(),
        }));
        setMessages(messageData as IMessage[]);
      }
    );
    return () => unsubscribe();
  }, []);

  const GetUserDetails = async () => {
    const docRef = doc(db, "Chat", params?.id as string);
    const docSnap = await getDoc(docRef);
    const result = docSnap.data();
    const otherUser = result?.users.filter(
      (item: any) => item.email !== user?.primaryEmailAddress?.emailAddress
    );
    console.log(otherUser[0].name);
    navigation.setOptions({
      headerTitle: otherUser[0].name,
    });
  };
  const onSend = async (newMessage: IMessage[]) => {
    setMessages((previousMessage) =>
      GiftedChat.append(previousMessage, newMessage)
    );
    newMessage[0].createdAt = moment().format("MM-DD-YYYY HH:mm:ss");
    await addDoc(
      collection(db, "Chat", params.id as string, "Messages"),
      newMessage[0]
    );
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      showUserAvatar={true}
      user={{
        _id: user?.primaryEmailAddress?.emailAddress!,
        name: user?.fullName!,
        avatar: user?.imageUrl,
      }}
    />
  );
}
