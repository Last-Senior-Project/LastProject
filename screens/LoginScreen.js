import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView, Image, Alert } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; 
import { useNavigation } from "@react-navigation/native";
import { db } from "../firebase";
import { authentication, firebase } from "../firebase";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const nav = useNavigation();
  
  const handleLogin = async () => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (email === "admin@admin.com") {
        console.log("admin");
        signInWithEmailAndPassword(authentication, email, password);
        nav.navigate("Admin");
      } else {
        const querySnapshot = await db
          .collection("data")
          .where("email", "==", email)
          .get();
          
        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          const userData = querySnapshot.docs[0].data();
          console.log(userData.id);
          alert(`Welcome ${userData.firstname}`);
          
          // Update online status to true
          
          
          if (userData?.ban?.length){
            Alert.alert("you are baned")
            nav.navigate("Homewel")
          }
          else{
            if(userData.type === "Freelancer") {
              await userDocRef.update({
                online: true
              });
              nav.navigate("Main", { user: userData });
            } else if (userData.type === "Client") {
              await userDocRef.update({
                online: true
              });
              nav.navigate("Client", { user: userData });
            }
          }
          
         
        } else {
          alert("User does not exist");
          setErrorMessage("User does not exist");
        }
      }
    } catch (error) {
      alert(error);
      setErrorMessage(error.message);
    }
  };
  
  const handleResetPassword = async () => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert("Password reset email sent. Please check your inbox.");
    } catch (error) {
      alert(error.message);
    }
  };
  
  const handleSignUp = () => {
    nav.navigate("Register");
  };
  
  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  
  return (
    <SafeAreaView style={[tw`flex-1 bg-gray-100`]}>
      <View style={[tw`flex-1 items-center justify-center`, { paddingHorizontal: 20 }]}>
        <Image source={require("../assets/logo.png")} style={{ height: 500, width: 500, marginBottom: -100, marginTop: -190 }} />
        <Text style={[tw`text-2xl font-bold text-gray-800 mb-6`, { marginLeft:-202 }]}>Welcome Back!</Text>
        <Text style={[tw` mb-3`, { marginLeft:-49 }]}>Sign in to Gig-Hive to pick exactly where you left off.</Text>
        <View style={[tw`w-full`]}>
          <TextInput
            style={[tw`bg-gray-200 rounded-lg p-3 mb-4 w-full`, { borderColor: "#ccc", borderWidth: 1 }]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCompleteType="email"
            keyboardType="email-address"
          />
        </View>
        <View style={[tw`w-full relative`]}>
          <TextInput
            style={[tw`bg-gray-200 rounded-lg p-3 mb-4 w-full`, { borderColor: "#ccc", borderWidth: 1 }]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
          />
          <TouchableOpacity style={[tw`absolute top-3 right-3`]} onPress={toggleSecureTextEntry}>
            <MaterialIcons name={secureTextEntry ? "visibility-off" : "visibility"} size={24} color="#777" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[tw`bg-blue-500 rounded-lg p-3 mb-4 w-full`, { backgroundColor: "#2D3748" }]} onPress={handleLogin}>
          <Text style={[tw`text-white font-bold text-center text-lg`]}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleResetPassword}>
          <Text style={[tw`text-blue-500 text-center mb-4`]}>Forgot Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[tw`border border-blue-500 rounded-lg p-3 w-full`, { borderColor: "#2D3748" }]} onPress={() => nav.navigate("Register")}>
          <Text style={[tw`text-blue-500 font-bold text-center text-lg`]}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}