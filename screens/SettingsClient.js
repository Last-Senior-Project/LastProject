import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  StyleSheet
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { authentication, db } from "../firebase";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { gs, colors } from "../Styles";

const { width, height } = Dimensions.get("window");
const SettingsScreen = () => {
  const route = useRoute();
  const [data, setData] = useState(route.params.user);
  
  const [aboutText, setAboutText] = useState("");
  const [showInput, setShowInput] = useState(false);
  
  const [newPassword, setNewPassword] = useState("");
  const [currentps, setCurrentps] = useState("");
  const scrollViewRef = useRef(null);

 

  useEffect(() => {
    setData(route.params?.user || {});
  }, [route.params?.user]);
 
  const handleAboutTextChange = (text) => setAboutText(text);

  

  const updateAbout = async (email, newAbout) => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", email)
        .get();
      const userDoc = querySnapshot.docs[0];
      await userDoc.ref.update({
        about: newAbout,
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      console.log("User about updated successfully");
    } catch (error) {
      console.error("Error updating user about:", error);
    }
  };

  const handleUpdateAbout = () => {
    updateAbout(data.email, aboutText);
    setShowInput(false);
  };


  const handleChangePassword = () => {
    if (currentps == data.password) {
      authentication.currentUser
        .updatePassword(newPassword)
        .then(() => {
          console.log("Password changed successfully");
          setNewPassword("");
          // Scroll to the TextInput component
          scrollViewRef.current.scrollTo({ x: 0, y: height, animated: true });
        })
        .catch((error) => {
          console.error("Error changing password:", error);
        });
    } else {
      alert("Check your current password");
    }
  };
 
  return (
    <View style={[tw`flex-1 justify-center items-center`,styles.container]}>
      <ScrollView style={[tw`w-full px-4 mb-10`, { maxWidth: width * 0.9 }]}>
        <Text style={[tw`text-2xl font-bold mb-10`,gs.title,{left:45,marginTop:30}]}>Settings Screen</Text>
        <View style={tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>Update your Profile Description <Ionicons name="newspaper-outline" size={20} color="grey" /></Text>
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 120 }]}
            multiline={true}
            numberOfLines={4}
            onChangeText={handleAboutTextChange}
            placeholder={data.about}
          />
          <Button
            title="Save"
            onPress={handleUpdateAbout}
            color="#2D3748"
            style={[tw`w-full`]}
          />
        </View>

        

        <View style={tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>Change Your Password <Ionicons name="lock-closed-outline" size={20} color="grey" /></Text>

          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Enter current password"
            onChangeText={(text) => setCurrentps(text)}
            value={currentps}
            secureTextEntry={true}
          />

          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Enter new password"
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
            secureTextEntry={true}
          />

          <Button
            title="Change Password"
            onPress={handleChangePassword}
            color="#2D3748"
            style={[tw`w-full`]}
          />
        </View>

      
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBg,
  },
  imageContainer: {
    ...gs.center,
    marginTop: 16,
    shadowColor: colors.darkBg,
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 0.5,
  },
  check: {
    ...gs.center,
    borderRadius: 100,
    width: 32,
    height: 32,
    shadowColor: colors.darkBg,
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 0.3,
    position: "absolute",
    zIndex: 1,
  },
  follow: {
    ...gs.button,
    ...gs.rowCenter,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginTop: 16,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 2,
    top: -105,
    marginHorizontal: 130,
  },
  followText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
    marginLeft: 4,
  },
  descContainer: {
    ...gs.sectionContainer,
    backgroundColor: colors.darkBg,
  },
  info: {
    color: colors.textSec,
    fontWeight: "600",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#faebd7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 10,
    left: -100,
    marginHorizontal: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  eduCard: {
    backgroundColor: "#faebd7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 10,
    left: 100,
    marginHorizontal: 100,
    top: -325,
  },
  workCard: {
    backgroundColor: "#faebd7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 10,
    left: 0,
    marginHorizontal: 100,
    top: -325,
  },
  projectsTitle: {
    left: 110,
    top: -300,
  },
  projectCard: {
    flex: 1,
    backgroundColor: "#faebd7",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    width: 350,
    borderRadius: 15,
    margin: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 2,
    shadowRadius: 12.35,

    elevation: 19,
  },
  projectsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    top: -270,
    marginBottom: 8,
    backgroundColor: colors.darkBg,
  },
  settingsContainer: {
    top: -180,
    left: 10,
  },
  logoutContainer: {
    top: -300,
    left: 255,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
    top: -20,
    position: "relative",
    height: 56,
  },
  projectDescription: {
    fontSize: 15,
    color: "white",
    top: -50,
  },
  button: {
    backgroundColor: "#2D3748",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
