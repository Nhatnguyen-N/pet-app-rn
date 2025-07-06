import { db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import { CategoryTypes } from "@/types/Category.types";
import { useUser } from "@clerk/clerk-expo";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  uploadPreset: process.env.CLOUDINARY_UPLOAD_PRESETS,
  // api_secret: process.env.CLOUDINARY_API_SECRET,
};

export default function AddNewPet() {
  const [formData, setFormData] = useState([]);
  const [gender, setGender] = useState<string>();
  const [categoryList, setCategoryList] = useState<
    DocumentData[] | CategoryTypes[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [image, setImage] = useState<string | null>(null);
  const [loader, setLoader] = useState(false);
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    GetCategories();
  }, []);
  const handleInputChange = (fieldName: string, fieldValue: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [fieldName]: fieldValue,
    }));
  };
  const GetCategories = async () => {
    setCategoryList([]);
    const snapshot = await getDocs(collection(db, "Category"));
    snapshot.forEach((doc) => {
      // console.log(doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  const imagePicker = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const onSubmit = async () => {
    if (Object.keys(formData).length !== 8) {
      Alert.alert("Enter All Detail");
      return;
    }

    UploadImage();
  };
  const UploadImage = async () => {
    setLoader(true);
    if (!image) {
      Alert.alert("Image Found");
      return;
    }
    console.log(
      `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`
    );

    try {
      const formData = new FormData();
      formData.append("file", {
        uri: image,
        type: "image/jpg",
        name: "pet_" + Date.now() + ".jpg",
      } as any);
      formData.append("upload_preset", "pet-image");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dsq3oy0yz/image/upload`,
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.error?.message || "Upload failed");
      console.log("data", data.secure_url);
      Alert.alert("Success", "Upload thành công!");
      SaveFormData(data.secure_url);
    } catch (error: any) {
      console.error("Upload error:", error);
      Alert.alert("Error", "Upload thất bại: " + error.message);
    }
  };
  const SaveFormData = async (imageUrl: any) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "Pets", docId), {
      ...formData,
      imageUrl: imageUrl,
      userName: user?.fullName,
      email: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      id: docId,
    });
    setLoader(false);
    router.replace("/(tabs)/home");
  };
  return (
    <ScrollView
      style={{
        padding: 20,
      }}
    >
      <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
        Add New Pet for Adoption
      </Text>
      <Pressable onPress={imagePicker}>
        {!image ? (
          <Image
            source={require("../../assets/images/icon.png")}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: Colors.GRAY,
            }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 15,
            }}
          />
        )}
      </Pressable>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Name *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("name", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Breed *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("breed", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChange("age", value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight *</Text>
        <TextInput
          style={styles.input}
          keyboardType="number-pad"
          onChangeText={(value) => handleInputChange("weight", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address *</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => handleInputChange("address", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>About *</Text>
        <TextInput
          style={styles.input}
          numberOfLines={5}
          multiline={true}
          onChangeText={(value) => handleInputChange("about", value)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pet Category *</Text>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue: string, itemIndex) => {
            setSelectedCategory(itemValue);
            handleInputChange("category", itemValue);
          }}
          style={[
            styles.input,
            {
              justifyContent: "center",
              height: 200,
            },
          ]}
          itemStyle={{
            color: "blue",
            fontSize: 16,
            fontFamily: "outfit",
          }}
        >
          {categoryList.map((category, index) => (
            <Picker.Item
              key={index}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Gender *</Text>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue: string, itemIndex) => {
            setGender(itemValue);
            handleInputChange("sex", itemValue);
          }}
          style={[
            styles.input,
            {
              justifyContent: "center",
              height: 100,
            },
          ]}
          itemStyle={{
            color: "blue",
            fontSize: 16,
            fontFamily: "outfit",
          }}
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <TouchableOpacity
        disabled={loader}
        style={styles.button}
        onPress={onSubmit}
      >
        {loader ? (
          <ActivityIndicator size={"large"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 18,
              textAlign: "center",
            }}
          >
            Submit
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 5,
  },
  input: {
    padding: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 7,
    fontFamily: "outfit",
  },
  label: {
    marginVertical: 5,
    fontFamily: "outfit",
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 7,
    marginVertical: 10,
    marginBottom: 20,
  },
});
