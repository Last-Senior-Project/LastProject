import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator.js";
export default function App() {
  return (
    <NavigationContainer>
      <StackNavigator />
      
    </NavigationContainer>
  );
}
