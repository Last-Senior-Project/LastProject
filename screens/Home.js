import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Video } from 'expo-av';
const Home = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Video
        source={require("../assets/vidd.mp4")}
        style={StyleSheet.absoluteFill}
        muted
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
      />
      <SafeAreaView style={styles.safeArea}>
        <Image source={require("../assets/logo.png")} style={styles.logo} />
        <Text style={styles.p}>Freelance Services.</Text>
        <Text style={styles.pp}>On Demand.</Text>
        <View style={styles.imagesContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Services")}>
            <View style={styles.imageContainer}>
              <View style={styles.card}>
                <Image source={require("../assets/client.jpg")} style={styles.image} />
                <Text style={styles.imageText}>Find a service</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("BecomeSeller")}>
            <View style={styles.imageContainer}>
              <View style={styles.card}>
                <Image source={require("../assets/worker.jpg")} style={styles.image} />
                <Text style={styles.imageText}>Become a seller</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cardd}>
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.texttt}>Sign In</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity onPress={() => navigation.navigate("Register")} style={styles.signupContainer}>
                <Text style={styles.textt}>New to GigHive? </Text>
                <Text style={styles.text}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    marginTop: -20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  p: {
    marginTop: -350,
    marginLeft: 25,
    width: 400,
    fontSize: 34,
    fontWeight: "bold",
    color: "white",
  },
  pp: {
    marginLeft: 25,
    width: 400,
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  imagesContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  card: {
    marginHorizontal: 10,
    backgroundColor: 'white',
    width: 170,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 170,
    height: 150,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "white",
  },
  imageText: {
    color: "black",
    fontSize: 20,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonsContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
    marginBottom: -190,
    padding: 10,
  },
  buttonWrapper: {
    marginVertical: 6,
    width: 200,
    borderRadius: 20,
  },
  button: {
    marginTop: 2,
    width: 350,
    height: 50,
    backgroundColor: '#2D3748',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  texttt: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  text: {
    color: "#3B82F6",
    fontSize: 18,
    textDecorationLine: "underline",
  },
  textt: {
    color: "#3B82F6",
    fontSize: 15,
  },
  signupContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
  },
  logo: {
    height: 500,
    width: 500,
    marginBottom: 180,
    marginTop: -320,
  },
  cardd: {
    marginBottom: -51,
    marginHorizontal: 30,
    backgroundColor: 'white',
    width: "100%",
    borderRadius: 10,
    alignItems: 'center',
  },
});
export default Home;