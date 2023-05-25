import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet, 
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import { authentication, db, firebase } from "../firebase";
import { Ionicons, Entypo } from "@expo/vector-icons";
import { gs, colors } from "../Styles";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
// import storage from '@react-native-firebase/storage';
const MyProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [data, setData] = useState(route.params.user);
  const [toggle, setToggle] = useState(false);
  const [imageUri, setImageUri] = useState(data.image);
  const render = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    const fetchData = async () => {
      if (data.email) {
        try {
          const querySnapshot = await db
            .collection("data")
            .where("email", "==", data.email)
            .get();
          const userDoc = querySnapshot.docs[0];
          const updatedUserData = userDoc.data();
          setData(updatedUserData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchData();
  }, [render]);
  const navigateToSettings = () => {
    navigation.navigate("Settings", { data: data });
  };
  const handleLogout = async () => {
    try {
      const user = authentication.currentUser;
      
      // Retrieve the document based on user id
      const querySnapshot = await db
        .collection("data")
        .where("id", "==", user.uid)
        .get();
        
      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        
        // Update online status to false
        await userDocRef.update({
          online: false,
        });
      }
      
      authentication
        .signOut()
        .then(() => {
          navigation.navigate("Homewel");
        })
        .catch((error) => {
          console.error("Error signing out:", error);
        });
    } catch (error) {
      console.error("Error updating online status:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <LinearGradient
          colors={[colors.black, colors.purple]}
          start={[0, 0]}
          end={[1, 1]}
        >
          <View
            style={{
              marginHorizontal: 32,
              paddingVertical: 64,
              marginTop: -35,
            }}
          >
            <View style={gs.rowBetween}>
              <Ionicons name="md-arrow-back" color={colors.text} size={32} />
            </View>
            <View style={styles.imageContainer}>
              <Image
                style={{ width: 100, height: 100, borderRadius: 32 }}
                source={{
                  uri: imageUri
                    ? imageUri
                    : "https://cdn.vectorstock.com/i/preview-1x/66/14/default-avatar-photo-placeholder-profile-picture-vector-21806614.jpg",
                }}
              />
              <TouchableOpacity onPress={()=>{navigation.navigate("Upload")}}>
                <Ionicons
                  name="camera-outline"
                  size={30}
                  color="white"
                  style={{ marginLeft: 130, bottom: 30 }}
                />
              </TouchableOpacity>
              <Text style={[gs.subTitle]}> #{data.type}</Text>
              <Text style={[gs.subTitle]}>#{data.expertise}</Text>
            </View>
          </View>
          <View style={[gs.center, { marginVertical: 12, marginBottom: 100 }]}>
            <Text style={[gs.title, { marginTop: -60 }]}>
              {data.firstname} {data.lastname}
              <View style={styles.check}>
                <Ionicons name="md-checkmark" size={40} color={colors.pink} />
              </View>
              <Ionicons name="location-outline" size={20} color="gray-500" />
              <Text style={[gs.subTitle, { marginBottom: 8 }]}>
                {data.countryName}
              </Text>
            </Text>
          </View>
        </LinearGradient>
      </View>
      <View>
        <View style={styles.descContainer}>
          <Text style={gs.title}>About Me</Text>
          <ScrollView
            style={[
              tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`,
              { backgroundColor: colors.darkBg },
            ]}
          >
            <Text style={styles.info}>{data.about}</Text>
          </ScrollView>
        </View>
        <View style={styles.descContainer}>
          <Text style={gs.title}>My Skills</Text>
          <View style={[tw`flex flex-row flex-wrap`]}>
            <View style={[tw`flex flex-row flex-wrap`]}>
              {data.skills &&
                data.skills.map((skill, index) => (
                  <ScrollView
                    style={[
                      tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`,
                      { backgroundColor: colors.darkBg },
                    ]}
                  >
                    <View
                      key={index}
                      style={[tw`bg-gray-200 rounded-full px-4 py-2 mx-2 mt-2`]}
                    >
                      <Text style={[tw`text-gray-800`]}>{skill}</Text>
                    </View>
                  </ScrollView>
                ))}
            </View>
          </View>
        </View>
        <View style={styles.descContainer}>
          <Text style={gs.title}>My Education</Text>
          <View style={[tw`flex flex-row flex-wrap`]}>
            {data.education &&
              data.education.map((edu, index) => (
                <ScrollView
                  style={[
                    tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`,
                    { backgroundColor: colors.darkBg },
                  ]}
                >
                  <Text style={styles.info}>
                    {edu.school} ({edu.startYear} - {edu.endYear})
                  </Text>
                  <Text style={gs.title}>{edu.fieldOfStudy}</Text>
                </ScrollView>
              ))}
          </View>
        </View>
        <View style={styles.descContainer}>
          <Text style={gs.title}>My Work Experience</Text>
          <View style={[tw`flex flex-row flex-wrap`]}>
            {data.experience &&
              data.experience.map((exp, index) => (
                <ScrollView
                  style={[
                    tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`,
                    { backgroundColor: colors.darkBg },
                  ]}
                >
                  <Text style={styles.info}>
                    {exp.company}, {exp.title} ({exp.startYear} - {exp.endYear})
                  </Text>
                  <Text style={gs.title}>{exp.description}</Text>
                </ScrollView>
              ))}
          </View>
          <View style={[styles.descContainer, { left: -21 }]}>
            <Text style={gs.title}>My Projects</Text>
            <View style={[tw`flex flex-row flex-wrap`]}>
              {data.projects &&
                data.projects.map((proj, index) => (
                  <ScrollView
                    key={index}
                    style={[tw`border-b border-gray-300 py-4 mb-4`]}
                  >
                    <Text style={gs.subTitle}>{proj.name}</Text>
                    <Text style={[tw`text-gray-700 mb-2`]}>
                      {proj.description}
                    </Text>
                    <Text style={[tw`text-gray-600`]}>
                      Price: ${proj.price} |{" "}
                    </Text>
                    <Text style={[tw`underline text-gray-600`]}>
                      GitHub Link: {proj.linkGit}
                    </Text>
                  </ScrollView>
                ))}
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          tw`p-4 bg-blue-500 items-center rounded-lg mb-4 mx-4`,
          { backgroundColor: "#2D3748" },
        ]}
        onPress={navigateToSettings}
      >
        <Ionicons name="settings-outline" size={24} color="white" />
        <Text style={[tw`text-white font-bold ml-2`]}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[tw`p-4 bg-red-500 items-center rounded-lg mx-4`]}
        onPress={() => handleLogout()}
      >
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={[tw`text-white font-bold ml-2`]}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
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
    backgroundColor: "#FAEBD7",
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
    backgroundColor: "#FAEBD7",
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
    backgroundColor: "#FAEBD7",
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
    backgroundColor: "#FAEBD7",
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
});
export default MyProfileScreen;
