import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const ProjectDetails = ({ route }) => {
  nav =useNavigation()
  const { project } = route.params;
  return (
    <View style={tw`flex-1 p-4`}>
      <View style={tw`flex-row items-center mb-2`}>
        <FontAwesome name="briefcase" size={16} color="gray" />
        <Text style={tw`text-gray-500 ml-1`}>{project.description}</Text>
      </View>
      <View style={tw`flex-row items-center mb-2`}>
        <FontAwesome name="link" size={16} color="gray" />
        <Text style={tw`text-gray-500 ml-1`}>{project.linkGit}</Text>
      </View>
      <View style={tw`flex-row items-center mb-2`}>
        <FontAwesome name="money" size={16} color="gray" />
        <Text style={tw`text-gray-500 ml-1`}>{project.price}</Text>
      </View>
      <View style={tw`flex-row items-center mb-2`}>
        <FontAwesome name="clock-o" size={16} color="gray" />
        <Text style={tw`text-gray-500 ml-1`}>{project.duration} days</Text>
      </View>
      <View style={tw`flex-row items-center mb-2`}>
        <FontAwesome name="user" size={16} color="gray" />
        <Text style={tw`text-gray-500 ml-1`}>{project.firstname} {project.lastname}</Text>
      </View>
      <View style={tw` p-2 items-end`}>
          <MaterialCommunityIcons name="shopping" size={24} color="black" onPress={()=>nav.navigate("PaymentForm" ,{project:project})} />
        </View>
    </View>
  );
};
export default ProjectDetails;
const styles = StyleSheet.create({});