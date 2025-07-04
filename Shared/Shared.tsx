import { db } from "@/config/firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const GetFavList = async (user: any) => {
  const docSnap = await getDoc(
    doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress)
  );

  if (docSnap?.exists()) {
    return docSnap.data();
  } else {
    await setDoc(
      doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress),
      {
        email: user?.primaryEmailAddress?.emailAddress,
        favorites: [],
      }
    );
  }
};

const UpdateFav = async (favorites: any, user: any) => {
  const docRef = doc(db, "UserFavPet", user?.primaryEmailAddress?.emailAddress);
  try {
    await updateDoc(docRef, {
      favorites: favorites,
    });
  } catch (error) {
    console.log(error);
  }
};

export default {
  GetFavList,
  UpdateFav,
};
