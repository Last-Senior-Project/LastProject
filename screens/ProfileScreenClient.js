import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import MyProfileScreenClient from "./MyProfileScreenClient.js";
import Help from "./Help.js";
import SettingsClient from "./SettingsClient.js";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
const profileName = "Account";
const helpName = "Help";
const settingsName = "Settings";

const ProfileScreenClient = ({ user, navigation }) => {
  const route = useRoute();
  const [data, setData] = useState(route.params.user);
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login " }]
    });
  };
  return (
    <Tab.Navigator
      initialRouteName={profileName}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;
          if (routeName === profileName) {
            iconName = focused ? "person-circle" : "person-circle";
          } else if (routeName === helpName) {
            iconName = focused ? "help-circle" : "help-circle";
          } else if (routeName === settingsName) {
            iconName = focused ? "settings" : "settings";
          } 
          return <Ionicons name={iconName} size={25} color={color} />;
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#999',
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          textTransform: 'capitalize',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#000',
        },
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#ddd',
        },
      })}
    >
      <Tab.Screen name={profileName} component={MyProfileScreenClient} initialParams={{ user: data }} />
      <Tab.Screen name={settingsName} component={SettingsClient} initialParams={{user:data}} />
      <Tab.Screen name={helpName} component={Help} />
    </Tab.Navigator>
  );
};
export default ProfileScreenClient;