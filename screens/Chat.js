import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState,useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageContainer from "../components/PageContainer";
import {
  MaterialCommunityIcons,
  AntDesign,
  Ionicons,
} from "@expo/vector-icons";
import { FONTS, COLORS } from "../constants";
import { useRoute } from "@react-navigation/native";
import { firebase } from "../firebase";
import { ScrollView } from "react-native-gesture-handler";
const ChatScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const route = useRoute();
  const [data, setData] = useState(route.params?.contacts);
  const [user, setUser] = useState(route.params?.user);
  const [filteredUsers, setFilteredUsers] = useState(
    data?.length > 0 ? data : []
  );
  const[toggle,setToggle]=useState(false)
  const triger =()=>{
    setToggle(!toggle)
  }
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("data")
      .onSnapshot((snapshot) => {
        const updatedData = snapshot.docs.map((doc) => doc.data());
        setData(updatedData);
      });

    return () => {
      unsubscribe();
    };
  }, [triger]);
  const handleSearch = (text) => {
    setSearch(text);
    const filteredData =
      data?.filter((user) =>
        user.firstname.toLowerCase().includes(text.toLowerCase())
      ) ?? [];
    setFilteredUsers(filteredData);
  };
  const renderItem = ({ item, index }) => {
    // Check if user is online
    const isOnline = item.online && item.online === true;
    return (
    <TouchableOpacity
      key={index}
      onPress={() =>
        navigation.navigate("PersonalChat", {
          userName: item.name,
          receverId: item.id,
          senderId: user.id,
          firstname: user.firstname,
          image:item.image,
          userImage:user.image
        })
      }
      style={[
        {
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 22,
          borderBottomColor: COLORS.secondaryWhite,
          borderBottomWidth: 1,
        },
        index % 2 !== 0
          ? {
              backgroundColor: COLORS.tertiaryWhite,
            }
          : null,
      ]}
    >
      <View
        style={{
          paddingVertical: 15,
          marginRight: 22,
        }}
      >
        { item.online && item.online == true && (
          <View
            style={{
              height: 14,
              width: 14,
              borderRadius: 7,
              backgroundColor: COLORS.green,
              borderColor: COLORS.white,
              borderWidth: 2,
              position: "absolute",
              top: 14,
              right: 2,
              zIndex: 1000,
            }}
          ></View>
        )}

        <Image
          source={{ uri: item.image}}
          resizeMode="contain"
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
        }}
      >
       <Text style={{ ...FONTS.h4, marginBottom: 4 }}>
  {item.firstname} {item.lastname}{' '}

</Text>

        <Text style={{ fontSize: 14, color: COLORS.secondaryGray }}>
        {item.online ? <Text style={{ color: 'green' }}>Online</Text> : <Text style={{ color: 'red' }}>Offline</Text>}
        </Text>
      </View>
    </TouchableOpacity>)
}
  return (
    <ScrollView>
        <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 22,
              marginTop: 22,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>Chats</Text>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity onPress={() => console.log("Add contacts")}>
                <MaterialCommunityIcons
                  name="message-badge-outline"
                  size={20}
                  color={COLORS.secondaryBlack}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginLeft: 12,
                }}
                onPress={() => console.log("Add contacts")}
              >
                <MaterialCommunityIcons
                  name="playlist-check"
                  size={20}
                  color={COLORS.secondaryBlack}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              marginHorizontal: 22,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                marginRight: 4,
              }}
            >
              <TouchableOpacity
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#e6edff",
                  marginBottom: 4,
                }}
              >
                <AntDesign name="plus" size={24} color={COLORS.black} />
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal={true}
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      paddingVertical: 15,
                      marginRight: 22,
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      resizeMode="contain"
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                      }}
                    />
                  </TouchableOpacity>
                  <Text>{item.firstname?.substring(0, 5)}...</Text>
                </View>
              )}
            />
          </View>
          <View
            style={{
              marginHorizontal: 22,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: COLORS.secondaryWhite,
              height: 48,
              marginVertical: 22,
              paddingHorizontal: 12,
              borderRadius: 20,
            }}
          >
            <Ionicons
              name="ios-search-outline"
              size={24}
              color={COLORS.black}
            />

            <TextInput
              style={{
                width: "100%",
                height: "100%",
                marginHorizontal: 12,
              }}
              value={search}
              onChangeText={handleSearch}
              placeholder="Search contact..."
            />
          </View>

          <View
            style={{
              paddingBottom: 100,
            }}
          >
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
      </PageContainer>
    </SafeAreaView>
    </ScrollView>
  );
};

export default ChatScreen;
