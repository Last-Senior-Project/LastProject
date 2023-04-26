import React from "react";
import { View, Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home.js";
import BecomeAClient from "./screens/BecomeAClient.js";
import BecomeASeller from "./screens/BecomeASeller.js"
import SignIn from "./screens/SignIn.js";
import SignUp from "./screens/SignUp.js";
// import WorkerInterface from "./screens/WorkerInterface.js"


const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="SignIn" component={SignIn}/>
        <Stack.Screen name="SignUp" component={SignUp}/>
        <Stack.Screen name="BecomeAClient" component={BecomeAClient}/>
        <Stack.Screen name="BecomeASeller" component={BecomeASeller}/>


      </Stack.Group>
    </Stack.Navigator>
  );
};
export default StackNavigator;
