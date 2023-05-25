import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const BecomeASeller = () => {
  const navigation = useNavigation();
  const handleStartSelling = () => {
    navigation.navigate("Register");
  };
  const [fadeAnim] = React.useState(new Animated.Value(1));
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const translateAnim = React.useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const handlePresss = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.8,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(translateAnim, {
        toValue: { x: 0, y: 50 },
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('Homewel');
      fadeAnim.setValue(1);
      scaleAnim.setValue(1);
      translateAnim.setValue({ x: 0, y: 0 });
      translateAnim.stopAnimation();
      translateAnim.removeAllListeners();
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={handlePresss}>
        <Animated.Image style={[styles.down, { opacity: fadeAnim }]} source={require('../assets/flesh.png')} />
      </TouchableOpacity>
      <Text style={styles.title}>Work your way</Text>
      <Text style={styles.subtitle}>You bring the skill.</Text>
      <Text style={styles.subtitle}>We'll make earning easy.</Text>
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>A Gig is bought every <Text style={styles.cardText}>2 mnts</Text></Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Projects completed <Text style={styles.cardText}>100+</Text></Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>The Prices ranges{'\n'} <Text style={styles.cardText}>$5 - $10k</Text></Text>
        </View>
      </View>
      <View style={styles.photoContainer}>
  <View style={styles.photo}>
    <View style={styles.imageTitleSubtitleContainer}>
      <Image source={require('../assets/doc.png')} style={styles.photoImage} />
      <View style={styles.titleSubtitleContainer}>
        <Text style={styles.photoTitle}>Create a Gig</Text>
        <Text style={styles.photoSubtitle}>Offer you services to a global audience{'\n'} and start earning more</Text>
      </View>
    </View>
  </View>
  <View style={styles.photo}>
    <View style={styles.imageTitleSubtitleContainer}>
      <Image source={require('../assets/msg.png')} style={styles.photoImage} />
      <View style={styles.titleSubtitleContainer}>
        <Text style={styles.photoTitle}>Deliver you work</Text>
        <Text style={styles.photoSubtitle}>Use our built-in tools to communicate {'\n'}with your customers and deliver their order.</Text>
      </View>
    </View>
  </View>
  <View style={styles.photo}>
    <View style={styles.imageTitleSubtitleContainer}>
      <Image source={require('../assets/done.png')} style={styles.photoImage} />
      <View style={styles.titleSubtitleContainer}>
        <Text style={styles.photoTitle}>Get paid</Text>
        <Text style={styles.photoSubtitle} >Payment is transferred to your account{'\n'} and its availble for withdrow</Text>
      </View>
    </View>
  </View>
</View>
      <TouchableOpacity style={styles.button} onPress={handleStartSelling}>
        <Text style={styles.buttonText}>Start Working Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 15,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 0,
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 30,
  },
  card: {
    marginRight: 10,
    marginLeft: 10,
    width: "30%",
    height: 90,
    width:109,
    backgroundColor: "#F2F2F2",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 350,
    height:50,
    backgroundColor: '#2D3748',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    marginTop: 39, //
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  down:{
    width:40,
    height:40,
    alignSelf: 'center',
    opacity: 0.7,
      },
      cardText:{
        color:"#1E90FF",
        fontSize:20,
      },
      photoContainer: {
        flexDirection: "column",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
      },
      photo: {
        alignItems: "flex-start",
        marginBottom: 15,
      },
      imageTitleSubtitleContainer: {
        flexDirection: "row",
        alignItems: "center",
      },
      photoImage: {
        width: 70,
        height: 70,
        marginRight: 8,
        marginLeft: 5
      },
      titleSubtitleContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      },
      photoTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 0,
      },
      photoSubtitle: {
        fontSize: 15,
        textAlign: "left",
      },
});
export default BecomeASeller;









