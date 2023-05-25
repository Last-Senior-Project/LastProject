import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { firebase, db } from "../firebase";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native";
const HomeScreenClient = ({ navigation }) => {
  const route = useRoute();
  const [dataa, setDataa] = useState(route.params.user);
  const [all, setAll] = useState(route.params.contacts);
  const COLORS = {
    lightWhite: "#F7F7F7",
    // add other color values here
  };
  const [searchText, setSearchText] = useState("");
  const [showsearch, setShowsearch] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [filter,setFiler]=useState([])
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await db.collection("data").get();
        const profiles = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          profiles.push(data);
        });
        setProfiles(profiles);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching profiles");
      }
    };
    fetchProfiles();
  }, []);
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await db.collection("data").where("projects", "!=", null).get();
        const projects = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.projects.forEach((project) => {
            projects.push(project);
          });
        });
        setProjects(projects);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching projects");
      }
    };
    fetchProjects();
  }, []);
  console.log("filter",projects)
  const filteredProfiles = profiles.filter((profile) =>
  profile.firstname.toLowerCase().startsWith(searchText.toLowerCase()) ||
  profile.lastname.toLowerCase().startsWith(searchText.toLowerCase()) ||
  profile.email.toLowerCase().startsWith(searchText.toLowerCase()) ||
  profile.phoneNumber.toLowerCase().startsWith(searchText.toLowerCase()) ||
  profile.expertise.toLowerCase().startsWith(searchText.toLowerCase()) ||
  (profile.skills && profile.skills.some(skill =>
    skill.toLowerCase().includes(searchText.toLowerCase())
  )) ||
  profile.countryName.toLowerCase().startsWith(searchText.toLowerCase())
);
  // render profile
  const renderProfile = ({ item }) => {
    if (
      searchText !== "" &&
      (item.firstname.toLowerCase().startsWith(searchText.toLowerCase()) ||
        item.lastname.toLowerCase().startsWith(searchText.toLowerCase()) ||
        item.email.toLowerCase().startsWith(searchText.toLowerCase()) ||
        item.phoneNumber.toLowerCase().startsWith(searchText.toLowerCase()) ||
        item.expertise.toLowerCase().startsWith(searchText.toLowerCase()) ||
        (item.skills &&
          item.skills.some((skill) =>
            skill.toLowerCase().includes(searchText.toLowerCase())
          )) ||
        item.countryName.toLowerCase().startsWith(searchText.toLowerCase()))
    ) {
      return (
        <TouchableOpacity
          style={[
            tw`my-4 bg-white rounded-lg p-4 flex-row items-center justify-between`,
            { alignSelf: "center" },
          ]}
          onPress={() => navigateToOneProfile(item)}
        >
          <View>
            <Text style={tw`text-lg font-bold mb-2`}>
              {item.firstname} {item.lastname}
            </Text>
            <View style={tw`flex-row items-center mb-1`}>
              <MaterialIcons
                name="email"
                size={16}
                color="gray"
                style={tw`mr-1`}
              />
              <Text style={tw`text-gray-500`}>{item.email}</Text>
            </View>
            <View style={tw`flex-row items-center mb-1`}>
              <MaterialIcons
                name="phone"
                size={16}
                color="gray"
                style={tw`mr-1`}
              />
              <Text style={tw`text-gray-500`}>{item.phoneNumber}</Text>
            </View>
            <View style={tw`flex-row items-center mb-1`}>
              <MaterialIcons                name="assignment"
                size={16}
                color="gray"
                style={tw`mr-1`}
              />
              <Text style={tw`text-gray-500`}>{item.expertise}</Text>
            </View>
            <View style={tw`flex-row items-center`}>
              <MaterialIcons
                name="location-on"
                size={16}
                color="gray"
                style={tw`mr-1`}
              />
              <Text style={tw`text-gray-500`}>{item.countryName}</Text>
            </View>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="black" />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };
  const navigateToOneProfile = (profile) => {
    navigation.navigate("oneProfile", { profile, dataa });
  };
  const setToSearch = (query) => {
    setSearchText(query);
    setShowsearch(!showsearch);
  };
  const handleSearchClick = () => {
    if (searchText.length) {
      setShowsearch(!showsearch);
    } else {
      alert("check the query to search with ");
    }
  };
  return (
    <View style={{ flex: 1, position: 'relative' }}>
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
        <Ionicons name="menu" size={24} color="black" />
        <View className="flex-row items-center space-x-2">
          <Ionicons name="location" size={25} color="red" />
          <Text className="font-semibold text-base">
            {dataa.countryName}
          </Text>
        </View>
        <Image
          source={{ uri: dataa.photoUrl }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
        />
      </View>
    </SafeAreaView>
    {/* search box */}
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
      <TextInput
        style={{ backgroundColor: '#fff', borderRadius: 10, flex: 1, marginRight: 10, padding: 10 }}
        placeholder="Search"
        onChangeText={(text)=>{setSearchText(text)}}
      />
      <Ionicons name="search" size={24} color="black" onPress={handleSearchClick} />
    </View>
    {showsearch &&
      <View style={{
        position: 'absolute',
        top: 110,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        zIndex: 1,
      }}>
        <TouchableWithoutFeedback onPress={() => setShowsearch(!showsearch)}>
          <FontAwesome
            name={showsearch ? 'close' : 'search'}
            size={24}
            color="black"
            style={{ position: 'absolute', top: 10, right: 10 }}
          />
        </TouchableWithoutFeedback>
        {error && <Text style={tw`text-red-500 text-center mb-4`}>{error}</Text>}
        {filteredProfiles.length > 0 ? (
          <FlatList
            data={filteredProfiles}
            renderItem={renderProfile}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        ) : (
          <Text style={[tw`text-center text-lg`, { textAlign: 'center' }]}>No profiles found</Text>
        )}
      </View>
    }
   <View style={tw`flex-1 bg-gray-100`}>
  <FlatList
    data={projects}
    numColumns={2}
    contentContainerStyle={tw`p-4`}
    renderItem={({ item }) => (
      <TouchableOpacity
        style={tw`flex-1 bg-white rounded-lg overflow-hidden shadow-md p-4 mx-2 mb-4`}
        onPress={() => {
          navigation.navigate("ProjectDetails", { project: item });
        }}
      >
        <View>
          <Text style={tw`text-lg font-bold mb-2`}>{item.name}</Text>
          <View style={tw`flex-row items-center mb-1`}>
            <FontAwesome name="briefcase" size={16} color="gray" />
            <Text style={tw`text-gray-500 ml-1`}>{item.description}</Text>
            <Text style={tw`text-gray-500 ml-1`}>{item.linkGit}</Text>
          </View>
          <View style={tw`flex-row items-center mb-1`}>
            <MaterialIcons
              name="attach-money"
              size={16}
              color="gray"
              style={tw`mr-1`}
            />
            <Text style={tw`text-gray-500 ml-1`}>{item.price}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={16}
              color="gray"
              style={tw`mr-1`}
            />
            <Text style={tw`text-gray-500`}>{item.duration} days</Text>
          </View>
        </View>
        <View style={tw`bg-gray-200 p-2 items-end`}>
          <MaterialIcons name="chevron-right" size={24} color="black" />
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item) => item.id}
  />
</View>
      <View style={styles.chatButton}>
    <TouchableOpacity onPress={() => navigation.navigate("ChatBot")}>
    <MaterialCommunityIcons name="chat-outline" size={24} color="#003580" onPress={() => navigation.navigate('ChatBot')} />
        </TouchableOpacity>
    </View>
    </View>
  );
};
export default HomeScreenClient;
const styles = StyleSheet.create({
  chatButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});