import AboutPet from "@/components/PetDetails/AboutPet";
import OwnerInfo from "@/components/PetDetails/OwnerInfo";
import PetInfo from "@/components/PetDetails/PetInfo";
import PetSubInfo from "@/components/PetDetails/PetSubInfo";
import { db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
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
  const router = useRouter();
  const { user } = useUser();

  // Used to Initiate the chat between two users
  const InitiateChat = async () => {
    try {
      const docId1 = user?.primaryEmailAddress?.emailAddress + "_" + pet?.email;
      const docId2 = pet?.email + "_" + user?.primaryEmailAddress?.emailAddress;

      const q = query(
        collection(db, "Chat"),
        where("id", "in", [docId1, docId2])
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.data());

        router.push({
          pathname: "/chat",
          params: { id: doc.id },
        });
      });
      if (querySnapshot.docs?.length === 0) {
        await setDoc(doc(db, "Chat", docId1), {
          id: docId1,
          users: [
            {
              email: user?.primaryEmailAddress?.emailAddress,
              imageUrl: user?.imageUrl,
              name: user?.fullName,
            },
            {
              email: pet?.email,
              imageUrl: pet?.userImage,
              name: pet.userName,
            },
          ],
          userIds: [user?.primaryEmailAddress?.emailAddress, pet?.email],
        });
        router.push({
          pathname: "/chat",
          params: { id: docId1 },
        });
      }
    } catch (error) {
      console.log("Error", error);
    }
  };
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
        <TouchableOpacity onPress={InitiateChat} style={styles.sdoptBtn}>
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
