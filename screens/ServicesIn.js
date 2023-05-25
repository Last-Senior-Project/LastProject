import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'tailwind-react-native-classnames';

const ServiceCard = ({ icon, title, isGreenBorder, onPress }) => {

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[tw`border-2 rounded-xl p-6 m-2`, isGreenBorder && tw`border-green-500`, { width: 150, height: 200 }]}>
        <View style={tw`flex-1 justify-center items-center`}>
          <Image source={icon} style={[tw`w-16 h-16`, { alignSelf: 'center' }]} />
        </View>
        <View style={tw`flex-1 justify-end`}>
          <Text style={tw`text-center font-bold text-sm`}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ServicesIn = ({ navigation }) => {
  const services = [
    { icon: require('../assets/video.png'), title: 'Video Editor' },
    { icon: require('../assets/gallery.png'), title: 'Graphic Designer' },
    { icon: require('../assets/coding.png'), title: 'Web Developer' },
    { icon: require('../assets/games.png'), title: 'Gaming' },
  ];
  const [selectedService, setSelectedService] = useState(null);

  const handleSelectService = (title) => {
    setSelectedService(title);
  };

  const handleContinue = () => {
    navigation.navigate('Main');
  };

  return (
    <ScrollView contentContainerStyle={tw`bg-gray-100 p-5`}>
      <Text style={tw`pt-8 pb-5 text-2xl font-bold mb-5`}>Choose the service that best suits you:</Text>
      <View style={tw`flex-row flex-wrap justify-between items-center`}>
        <View style={tw`flex-row justify-between w-full`}>
          <ServiceCard
            icon={services[0].icon}
            title={services[0].title}
            isGreenBorder={selectedService === services[0].title}
            onPress={() => handleSelectService(services[0].title)}
          />
          <ServiceCard
            icon={services[1].icon}
            title={services[1].title}
            isGreenBorder={selectedService === services[1].title}
            onPress={() => handleSelectService(services[1].title)}
          />
        </View>
        <View style={tw`flex-row justify-between w-full`}>
          <ServiceCard
            icon={services[2].icon}
            title={services[2].title}
            isGreenBorder={selectedService === services[2].title}
            onPress={() => handleSelectService(services[2].title)}
          />
          <ServiceCard
            icon={services[3].icon}
            title={services[3].title}
            isGreenBorder={selectedService === services[3].title}
            onPress={() => handleSelectService(services[3].title)}
          />
        </View>
      </View>
      <TouchableOpacity 
        style={[tw`w-80 bg-blue-500 rounded-lg py-3 px-6 self-center mt-10`, selectedService ? tw`opacity-100` : tw`opacity-50`]} 
        // onPress={fn(selectedService)} 
        disabled={!selectedService}
      >
        <Text style={tw`text-white font-bold text-lg text-center`}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ServicesIn;