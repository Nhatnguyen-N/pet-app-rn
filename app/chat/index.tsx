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
import { View } from "react-native";
import { GiftedChat, IMessage, InputToolbar } from "react-native-gifted-chat";
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
    <View style={{ flex: 1 }}>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        showUserAvatar={true}
        minInputToolbarHeight={60} // Giảm từ mặc định 70px
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              marginBottom: 40, // Xóa padding đáy
              maxHeight: 40,
            }}
            primaryStyle={{
              minHeight: 40, // Chiều cao tối thiểu thực tế
            }}
          />
        )}
        // Giữ nguyên các props khác
        user={{
          _id: user?.primaryEmailAddress?.emailAddress!,
          name: user?.fullName!,
          avatar: user?.imageUrl,
        }}
      />
    </View>
  );
}
