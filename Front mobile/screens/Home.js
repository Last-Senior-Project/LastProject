import { useNavigation } from "@react-navigation/native";
import React from "react";
import { view, Text, SafeAreaView,Image, Button } from "react-native";
const Home = () => {
    const navigation = useNavigation()
    return (<SafeAreaView>
        <Text>this is home</Text>
        <Button onPress={()=>navigation.navigate("BecomeAClient")} title="BecomeAClient"/>
        <Button onPress={()=>navigation.navigate("BecomeASeller")} title="BecomeASeller"/>
        <Button onPress={()=>navigation.navigate("SignIn")} title="SignIn"/>
        <Button onPress={()=>navigation.navigate("SignUp")} title="SignUp"/>

        {/* <Image
        
        source={require('../assets/pic1.jpeg')}
      /> */}
      </SafeAreaView>)
  
};
export default Home;
