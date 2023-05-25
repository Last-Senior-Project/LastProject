import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS, FONTS } from "./constants";
import HomeScreen from "./screens/HomeScreen";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import OrderPanelScreen from "./screens/OrderPanelScreen";
import OrdersScreen from "./screens/OrdersScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { NavigationContainer } from "@react-navigation/native";
import SearchScreen from "./screens/SearchScreen";
import PlacesScreen from "./screens/PlacesScreen";
import MapScreen from "./screens/MapScreen";
import PropertyInfoScreen from "./screens/PropertyInfoScreen";
import RoomsScreen from "./screens/RoomsScreen";
import UserScreen from "./screens/UserScreen";
import ConfirmationScreen from "./screens/ConfirmationScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ChatScreen from "./screens/ChatScreen";
import Contacts from "./screens/Contacts";
import PersonalChat from "./screens/PersonalChat";
import ChatBot from "./screens/ChatBot";
import OneProfile from "./screens/OneProfile";
import Home from "./screens/Home.js";
import Services from "./screens/Services.js";
import ServicesIn from "./screens/ServicesIn.js";
import BecomeSeller from "./screens/BecomeSeller.js";
import Admin from "./screens/Admin";
import { db } from "./firebase";
import ReviewForm from "./screens/ReviewForm";
import ReviewsList from "./screens/ReviewsList";
import HomeScreenClient from "./screens/HomeScreenClient";
import ProfileScreenClient from "./screens/ProfileScreenClient";
import OrderClient from "./screens/OrderClient";
import Notfications from "./screens/Notfications";
import ContactClient from "./screens/ContactClient";
import Chat from "./screens/Chat";
import ProjectDetails from "./screens/ProjectDetails";
import PaymentForm from "./screens/PaymentForm";
import Upload from "./screens/Upload";
const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    const route = useRoute();
    const [data, setData] = useState(route.params.user);
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
      const collectionRef = db.collection("data");
      collectionRef.get().then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setContacts(data);
      });
    }, []);
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          initialParams={{ user: data }}
          component={HomeScreen}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#003580" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="OrderPanel"
          component={OrderPanelScreen}
          options={{
            tabBarLabel: "Notfications",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="notifications" size={24} color="#003580" />
              ) : (
                <Ionicons name="notifications" size={24} color="black" />
              ),
          }}
        />

        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          initialParams={{ user: data }}
          options={{
            tabBarLabel: "Orders",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="card" size={24} color="#003580" />
              ) : (
                <Ionicons name="card-outline" size={24} color="black" />
              ),
          }}
        />
        {contacts.length > 0 && (
          <Tab.Screen
            name="Chat"
            initialParams={{ contacts: contacts, user: data }}
            component={Chat}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {focused ? (
                      <>
                        <Text
                          style={{
                            ...FONTS.body3,
                            color: COLORS.secondaryBlack,
                          }}
                        >
                          Chats
                        </Text>
                        <FontAwesome
                          name="circle"
                          size={8}
                          color={COLORS.black}
                        />
                      </>
                    ) : (
                      <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color={COLORS.black}
                      />
                    )}
                  </View>
                );
              },
            }}
          />
        )}

        {contacts.length > 0 && (
          <Tab.Screen
            name="Contacts"
            initialParams={{ contacts: contacts, user: data }}
            component={Contacts}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {focused ? (
                      <>
                        <Text
                          style={{
                            ...FONTS.body3,
                            color: COLORS.secondaryBlack,
                          }}
                        >
                          Contacts
                        </Text>
                        <FontAwesome
                          name="circle"
                          size={8}
                          color={COLORS.black}
                        />
                      </>
                    ) : (
                      <Feather name="users" size={24} color={COLORS.black} />
                    )}
                  </View>
                );
              },
            }}
          />
        )}

        <Tab.Screen
          name="Profile"
          initialParams={{ user: data }}
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
        {/* <Tab.Screen
        name="PersonalChat"
        initialParams={{user:data}}
        component={PersonalChat}
        options={{ tabBarVisible: false }}
      /> */}
      </Tab.Navigator>
    );
  }

  function BottomTabsClient() {
    const route = useRoute();
    const [data, setData] = useState(route.params.user);
    const [contacts, setContacts] = useState([]);
    useEffect(() => {
      const collectionRef = db.collection("data");
      collectionRef.get().then((querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setContacts(data);
      });
    }, []);
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="HomeClient"
          initialParams={{ user: data }}
          component={HomeScreenClient}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color="#003580" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="Notfications"
          initialParams={{ user: data }}
          component={Notfications}
          options={{
            tabBarLabel: "Notfications",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="notification" size={24} color="#003580" />
              ) : (
                <AntDesign name="notification" size={24} color="black" />
              ),
          }}
        />
        {contacts.length > 0 && (
          <Tab.Screen
            name="Chat"
            initialParams={{ contacts: contacts, user: data }}
            component={ChatScreen}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {focused ? (
                      <>
                        <Text
                          style={{
                            ...FONTS.body3,
                            color: COLORS.secondaryBlack,
                          }}
                        >
                          Chats
                        </Text>
                        <FontAwesome
                          name="circle"
                          size={8}
                          color={COLORS.black}
                        />
                      </>
                    ) : (
                      <Ionicons
                        name="chatbubble-outline"
                        size={24}
                        color={COLORS.black}
                      />
                    )}
                  </View>
                );
              },
            }}
          />
        )}

        {contacts.length > 0 && (
          <Tab.Screen
            name="Contacts"
            initialParams={{ contacts: contacts, user: data }}
            component={ContactClient}
            options={{
              tabBarIcon: ({ focused }) => {
                return (
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {focused ? (
                      <>
                        <Text
                          style={{
                            ...FONTS.body3,
                            color: COLORS.secondaryBlack,
                          }}
                        >
                          Contacts
                        </Text>
                        <FontAwesome
                          name="circle"
                          size={8}
                          color={COLORS.black}
                        />
                      </>
                    ) : (
                      <Feather name="users" size={24} color={COLORS.black} />
                    )}
                  </View>
                );
              },
            }}
          />
        )}
        <Tab.Screen
          name="OrderClient"
          component={OrderClient}
          initialParams={{ user: data }}
          options={{
            tabBarLabel: "Order",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="reorder-four" size={24} color="#003580" />
              ) : (
                <Ionicons name="reorder-four" size={24} color="black" />
              ),
          }}
        />
        <Tab.Screen
          name="ProfileClient"
          initialParams={{ user: data }}
          component={ProfileScreenClient}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color="#003580" />
              ) : (
                <Ionicons name="person-outline" size={24} color="black" />
              ),
          }}
        />
        {/* <Tab.Screen
        name="PersonalChat"
        initialParams={{user:data}}
        component={PersonalChat}
        options={{ tabBarVisible: false }}
      /> */}
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Homewel"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Services"
          component={Services}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ServicesIn"
          component={ServicesIn}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="BecomeSeller"
          component={BecomeSeller}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={BottomTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Places" component={PlacesScreen} />
        <Stack.Screen
          name="Map"
          component={MapScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="Info" component={PropertyInfoScreen} />
        <Stack.Screen name="Rooms" component={RoomsScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
        <Stack.Screen name="Contacts" component={Contacts} />
        <Stack.Screen name="PersonalChat" component={PersonalChat} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="OrderPanel" component={OrderPanelScreen} />
        <Stack.Screen name="ChatBot" component={ChatBot} />
        <Stack.Screen name="Rate" component={ReviewForm} />
        <Stack.Screen name="Review" component={ReviewsList} />
        <Stack.Screen name="ProjectDetails" component={ProjectDetails} />
        <Stack.Screen name="PaymentForm" component={PaymentForm} />
        <Stack.Screen name="Upload" component={Upload} />
        <Stack.Screen
          name="Client"
          component={BottomTabsClient}
          options={{ headerShown: false }}
        />

        <Stack.Screen name="oneProfile" component={OneProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
