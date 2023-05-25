import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { firebase } from "../firebase";
import tw from "tailwind-react-native-classnames";

const CloudinaryImageUpload = () => {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const backgroundColor = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasCameraPermission(status === "granted");
    })();
  }, []);

  const startBackgroundColorAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundColor, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const startButtonOpacityAnimation = () => {
    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result);
    }
  };

  const handleCameraCapture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setImage(result);
      }
    } else {
      console.log("Camera permission not granted");
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    const response = await fetch(image.uri);
    const blob = await response.blob();
    const filename = image.uri.substring(image.uri.lastIndexOf("/") + 1);
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child(filename);

    try {
      await imageRef.put(blob);
      const imageUrl = await imageRef.getDownloadURL();

      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const firestore = firebase.firestore();
        const userRef = firestore
          .collection("data")
          .where("id", "==", currentUser.uid);
        const querySnapshot = await userRef.get();

        if (!querySnapshot.empty) {
          const docSnapshot = querySnapshot.docs[0];
          const docRef = docSnapshot.ref;
          await docRef.update({
            image: imageUrl,
          });

          setUploading(false);
          Alert.alert("Photo uploaded successfully!");
          setImage(null);
        } else {
          console.log("No matching document found");
        }
      } else {
        console.log("No current user found");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    startBackgroundColorAnimation();
    startButtonOpacityAnimation();
  }, []);
  return (
    <Animated.View
      style={[
        tw`flex-1 items-center justify-center`,
        {
          backgroundColor: backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ["gray", "white"],
          }),
        },
      ]}
    >
      <Animated.View
        style={[
          tw`rounded-2xl w-44 h-12 bg-gray-800 items-center justify-center`,
          {
            opacity: buttonOpacity,
          },
        ]}
      >
        <TouchableOpacity onPress={handleImagePicker}>
          <Ionicons name="image-outline" size={24} color="white" />
          <Text style={tw`text-white text-lg font-bold ml-2`}>Pick Image</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          tw`rounded-2xl w-44 h-12 bg-gray-700 items-center justify-center mt-4`,
          {
            opacity: buttonOpacity,
          },
        ]}
      >
        <TouchableOpacity onPress={handleCameraCapture}>
          <Ionicons name="camera-outline" size={24} color="white" />
          <Text style={tw`text-white text-lg font-bold ml-2`}>Take Photo</Text>
        </TouchableOpacity>
      </Animated.View>
      <View style={tw`mt-8 mb-16 items-center`}>
        {image && <Image source={{ uri: image.uri }} style={tw`w-72 h-72`} />}
        <Animated.View
          style={[
            tw`rounded-2xl w-44 h-12 bg-gray-900 items-center justify-center mt-4`,
            {
              opacity: buttonOpacity,
            },
          ]}
        >
          <TouchableOpacity onPress={handleUpload}>
            <Text style={tw`text-white text-lg font-bold`}>Upload Image</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};
export default CloudinaryImageUpload;
