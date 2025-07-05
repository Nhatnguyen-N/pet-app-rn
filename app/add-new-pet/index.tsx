import { db } from "@/config/firebaseConfig";
import Colors from "@/constants/Colors";
import { CategoryTypes } from "@/types/Category.types";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
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
export default function AddNewPet() {
  const [formData, setFormData] = useState([]);
  const [gender, setGender] = useState<string>();
  const [categoryList, setCategoryList] = useState<
    DocumentData[] | CategoryTypes[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string>();
  const [image, setImage] = useState<string | null>(null);
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

    // console.log(result);

    if (!result.canceled) {
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
    // const resp =await fetch(image);
    // const blobImage = await resp.blob();
    // const storageRef = ref(storage,"/PetAdopt/"+Date.now()+'.jpg');
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
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text
          style={{
            fontFamily: "outfit-medium",
            fontSize: 18,
            textAlign: "center",
          }}
        >
          Submit
        </Text>
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
