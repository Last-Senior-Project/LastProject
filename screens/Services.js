import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Animated,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const ServiceCard = ({ icon, title }) => {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate('Register');
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.cardContainer}>
        <View style={styles.cardHeader}>
          <Image source={icon} style={styles.icon} />
        </View>
        <View style={styles.cardFooter}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const Services = () => {
  const handlePress = () => {
    navigation.navigate('Register');
  };
  const navigation = useNavigation();
  const services =   [
    { icon: require('../assets/video.png'), title: 'Video Editing' },
    { icon: require('../assets/gallery.png'), title: 'Graphic Design' },
    { icon: require('../assets/coding.png'), title: 'Web Development' },
    { icon: require('../assets/games.png'), title: 'Gaming' },
    { icon: require('../assets/writing.png'), title: 'Writing Content' },
    { icon: require('../assets/3d.png'), title: '3D Design' },
    { icon: require('../assets/translate.png'), title: 'Translating Content' },
    { icon: require('../assets/e-c.png'), title: 'E Commerce' },
    { icon: require('../assets/microphone.png'), title: 'Creating Songs' },
  ];
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
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePresss}>
        <Animated.Image style={[styles.down, { opacity: fadeAnim }]} source={require('../assets/flesh.png')} />
      </TouchableOpacity>
      <Text style={styles.headerText}>Choose the services that best suit you are interested in</Text>
      <Text style={styles.selectText}>Select one.</Text>
      <View style={styles.servicesContainer}>
        {services.map((service, index) => (
          <ServiceCard key={index} icon={service.icon} title={service.title} />
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Continue (Sign Up First) </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  headerText: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    width: 100,
    height: 120,
    justifyContent: 'space-around',
    elevation: 3,
    marginBottom: 20,
  },
  cardHeader: {
    flex: 1,
    justifyContent: 'center',
  },
  cardFooter: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  icon: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    width:350,
    height:50,
    backgroundColor: '#2D3748',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    marginTop: 7,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  buttonTextt: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center'
  },
  selectText: {
    fontSize: 16,
    opacity: 0.6, // Change opacity to make it not 100% clear
    textAlign: 'left',
    marginBottom:10,
  },
  down:{
width:40,
height:40,
alignSelf: 'center',
opacity: 0.7,
  }
});
export default Services;