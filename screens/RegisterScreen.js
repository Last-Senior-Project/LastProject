import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView
} from "react-native";
import { RadioButton } from 'react-native-paper';
import tailwind from "twrnc";
import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { authentication } from "../firebase";
import { db } from "../firebase";
import { serverTimestamp } from "firebase/firestore";
import tw from "tailwind-react-native-classnames";
import CountryPicker from "react-native-country-picker-modal";
import CheckBox from "react-native-check-box";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import ServicesIn from "./ServicesIn";
export default function SignUpScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [countryName, setCountryName] = useState("");
  const nav = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [from1, setFrom1] = useState(true);
  const [form2, setFrom2] = useState(false);
  const [form3, setFrom3] = useState(false);
  const [form4, setFrom4] = useState(false);
  const [age, setAge] = useState("");
  const [sex, setSex] = useState("");
  const [isFreelancerChecked, setIsFreelancerChecked] = useState(false);
  const [isClientChecked, setIsClientChecked] = useState(false);
  const [type, setType] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showTail, setShowTail] = useState(false);
  const [tailAnimation] = useState(new Animated.Value(0));
  const [areaOfExpertise,setAreaOfExpertise]=useState("");
  const [selectedService, setSelectedService] = useState(null);

  const handleFreelancerCheckBox = () => {
    setIsFreelancerChecked(!isFreelancerChecked);
  };

  const handleClientCheckBox = () => {
    setIsClientChecked(!isClientChecked);
  };
  const onSelectCountry = (country) => {
    setCountryCode(country.cca2);
    setCountryName(country.name);
  };

  const handleSignUp = () => {
    const auth = getAuth();
    const time = serverTimestamp();
    const userRef = db.collection("data").doc(); // create a new document reference with a unique ID
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Add user information to Firestore
        userRef
          .set({
            id: user.uid,
            email: email,
            firstname: firstName,
            lastname: lastName,
            password: password,
            createdAt: time,
            phoneNumber: phoneNumber,
            agent: age,
            countryName: countryName,
            sex: sex,
            type: type,
            expertise: selectedService,
            online:true
          })
          .then(() => {
            console.log("User added to Firestore");
            const data = {
              id: user.uid, // set the user's Firebase UID as the ID in Firestore
              email: email,
              firstname: firstName,
              lastname: lastName,
              password: password,
              createdAt: time,
              phoneNumber: phoneNumber,
              agent: age,
              countryName: countryName,
              sex: sex,
              type: type,
              expertise: selectedService,
            };
            if (type === "Freelancer") {
              nav.navigate("Main", { user: data });
            } else if (type === "Client") {
              nav.navigate("Client", { user: data });
            }
          })
          .catch((error) => {
            console.error("Error adding user to Firestore: ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error creating user: ", errorCode, errorMessage);
        alert(errorMessage);
      });
  }; 
  console.log(password === confirmPassword);
  const next = () => {
    if (password.length < 6) {
      alert("Password should be atleast 6 characters long");
    } else if (password !== confirmPassword) {
      alert("Confirm your password ");
    } else if (firstName.length < 3 ) {
      alert("First Name should be atleast 3 characters long");
    }
    else if (lastName.length < 3 ) {
      alert("Last Name should be atleast 3 characters long");
    }
    else if (email.length < 6 ) {
      alert("Email Address should be atleast 6 characters long");
    }
     else {
      setFrom1(!from1);
      setFrom2(!form2);
    }
  };
  const next1 = () => {
    setFrom2(!form2);
    setFrom3(!form3);
  };
  const next2 = () => {
    setFrom3(!form3);
    setFrom4(!form4);
  };
  useEffect(() => {
    // Check if all input fields are filled
    if (firstName && lastName && email && password && confirmPassword) {
      // Start animation
      Animated.timing(tailAnimation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(1.5),
        useNativeDriver: true,
      }).start(() => {
        setShowTail(true);
      });
    } else {
      // Reset animation
      setShowTail(false);
      tailAnimation.setValue(0);
    }
  }, [firstName, lastName, email, password, confirmPassword, tailAnimation]);
  const ServiceCard = ({ icon, title, isGreenBorder, onPress }) => {

    return (
      <TouchableOpacity onPress={onPress}>
      <View style={[tw`border-2 rounded-xl p-1 m-4 bg-white`, { borderColor: isGreenBorder ? 'green' : 'white', width: 90, height: 110 }]}>
        <View style={tw`flex-1 justify-center items-center`}>
          <Image source={icon} style={[tw, { width: 50, height: 50 }, { alignSelf: 'center' }]} />
        </View>
        <View style={tw`flex-1 justify-end`}>
          <Text style={tw`text-center font-bold text-sm`}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
    );
  };
  
    const services = [
      { icon: require('../assets/video.png'), title: 'Video Editing' },
      { icon: require('../assets/gallery.png'), title: 'Graphic Design' },
      { icon: require('../assets/coding.png'), title: 'Web Development' },
      { icon: require('../assets/games.png'), title: 'Gaming' },
      { icon: require('../assets/writing.png'), title: 'Writing Content' },
      { icon: require('../assets/3d.png'), title: '3D Design' },
      { icon: require('../assets/translate.png'), title: 'Translating Content' },
      { icon: require('../assets/e-c.png'), title: 'Ecommerce' },
      { icon: require('../assets/microphone.png'), title: 'Creating Songs' },
    ];
    
  
    const handleSelectService = (title) => {
      setSelectedService(title);
    };
    const handleFreelancerRadioButton = () => {
      setIsFreelancerChecked(true);
      setIsClientChecked(false);
      setType("Freelancer")
    };
  
    const handleClientRadioButton = () => {
      setIsFreelancerChecked(false);
      setIsClientChecked(true);
      setType("Client")
    };
  const render = () => {
    if (from1) {
      return (
        <ScrollView>
        <View style={tailwind`flex-1 items-center justify-center bg-gray-100`}>
          <View
            style={tailwind`p-8 w-full max-w-md bg-white rounded-xl shadow-lg`}
          >
            <Text style={tailwind`text-3xl font-bold mb-0 ml--3 text-gray-800 mt-8`}>
              Create An Account
            </Text>
            <Text style={tailwind`  mb-5 text-black ml--3`}>
            Join our growing freelance community to offer your professional services, connect with customers, and get paid of Gig-Hive's trusted platform
            </Text>

            <View style={tailwind`mb-2 ml--3 w-94`}>
              <Text style={tailwind`text-base text-gray-600 mb-2`}>
                First Name
              </Text>
              <TextInput
                style={[tw`bg-gray-200 rounded-lg p-3 mb-0 w-full`, { borderColor: "#ccc", borderWidth: 1 }]}
                placeholderTextColor="#9CA3AF"
                placeholder="Enter your first name"
                onChangeText={(firstName) => setFirstName(firstName)}
              />
            </View>

            <View style={tailwind`mb-2 ml--3 w-94`}>
              <Text style={tailwind`text-base text-gray-600 mb-2`}>
                Last Name
              </Text>
              <TextInput
                style={[tw`bg-gray-200 rounded-lg p-3 mb-0 w-full`, { borderColor: "#ccc", borderWidth: 1 }]}
                placeholderTextColor="#9CA3AF"
                placeholder="Enter your last name"
                onChangeText={(lastName) => setLastName(lastName)}
              />
            </View>

            <View style={tailwind`mb-2 ml--3 w-94`}>
              <Text style={tailwind`text-base text-gray-600 mb-2`}>
                Email Address
              </Text>
              <TextInput
                style={[tw`bg-gray-200 rounded-lg p-3 mb-0 w-full`, { borderColor: "#ccc", borderWidth: 1 }]}
                placeholderTextColor="#9CA3AF"
                placeholder="Enter your email address"
                onChangeText={(email) => setEmail(email)}
                keyboardType="email-address"
              />
            </View>

            <View style={tailwind`mb-2 ml--3 w-94`}>
              <Text style={tailwind`text-base text-gray-600 mb-2`}>
                Password
              </Text>
              <View
                style={[tailwind`flex-row items-center w-full bg-gray-200 rounded-lg p-3 border `,{ borderColor: "#ccc", borderWidth: 1 }]}
              >
                <TextInput
                  style={tailwind`flex-1 text-gray-800`}
                  placeholderTextColor="#9CA3AF"
                  placeholder="Enter your password"
                  secureTextEntry={!showPassword}
                  onChangeText={(password) => setPassword(password)}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Feather
                    name={showPassword ? "eye-off" : "eye"}
                    size={24}
                    color="#9CA3AF"
                  />
                </Pressable>
              </View>
            </View>

            <View style={tailwind`mb-8 ml--3 w-94`}>
              <Text style={tailwind`text-base text-gray-600 mb-2`}>
                Confirm Password
              </Text>
              <TextInput
                style={[tw`bg-gray-200 rounded-lg p-3 mb-0 w-full`, { borderColor: "#ccc", borderWidth: 1 }]}
                placeholderTextColor="#9CA3AF"
                placeholder="Confirm your password"
                secureTextEntry={!showPassword}
                onChangeText={(password) => setConfirmPassword(password)}
              />
            </View>

            <Pressable
              style={[tw` rounded-lg p-3 mb-4 mr-10 `, { backgroundColor: "#2D3748" , width:380, marginLeft:-15}]}
              onPress={next}
            >
              <Text style={[tw`text-white font-bold text-center text-lg `]}>
                Create Account
              </Text>
            </Pressable>

            {showTail && (
              <Animated.View
                style={[
                  tailwind`bg-gray-100 w-8 h-8 rounded-full absolute top-0 right-12`,
                  {
                    transform: [
                      {
                        translateY: tailAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-30, 30],
                        }),
                      },
                    ],
                  },
                ]}
              />
            )}
          </View>
        </View>
        </ScrollView>
      );
    } else if (form2) {
      return (
<View style={tw`bg-gray-100 flex-1 justify-center px-6 py-4`}>
  <View style={[tw`bg-gray-300 rounded-md p-6 border border-gray-400 mb-8`, { marginTop: 20 }]}>
    <Text style={tw`text-2xl font-bold mb-4 text-center`}>Age</Text>
    <Picker
      selectedValue={age}
      onValueChange={(itemValue) => setAge(itemValue)}
      style={tw`bg-white px-4 py-2 `}
      itemStyle={tw`text-base`}
    >
      <Picker.Item label="Select your age" value="" />
      <Picker.Item label="18-24" value="18-24" />
      <Picker.Item label="25-34" value="25-34" />
      <Picker.Item label="35-44" value="35-44" />
      <Picker.Item label="45-54" value="45-54" />
      <Picker.Item label="55-64" value="55-64" />
      <Picker.Item label="65 or over" value="65 or over" />
    </Picker>
  </View>

  <View style={[tw`bg-gray-300 rounded-md p-6 border border-gray-400 mb-8`]}>
    <Text style={tw`text-2xl font-bold mb-4 text-center`}>Sex</Text>
    <Picker
      selectedValue={sex}
      onValueChange={(itemValue) => setSex(itemValue)}
      style={tw`bg-white px-4 py-2 rounded-md`}
      itemStyle={tw`text-base`}
    >
      <Picker.Item label="Select your sex" value="" />
      <Picker.Item label="Male" value="Male" />
      <Picker.Item label="Female" value="Female" />
      <Picker.Item label="Other" value="Other" />
    </Picker>
  </View>

  <View style={tw`flex flex-row justify-center items-center mt-12`}>
    <TouchableOpacity
      onPress={next}
      style={[tw`w-1/3 py-4 bg-gray-300 rounded-md items-center justify-center  mr-4 flex-row`, { marginTop: 50 }]}
    >
      <MaterialIcons
        name="arrow-back"
        size={24}
        color="white"
        style={tw`mr-2`}
      />
      <Text style={tw`text-lg font-bold text-white`}>Go back</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={next1}
      style={[tw`w-1/3 py-4 rounded-md items-center justify-center ml-4 flex-row`, { marginTop: 50, backgroundColor: "#2D3748" }]}
    >
      <Text style={tw`text-lg font-bold text-white mr-2`}>Next</Text>
      <MaterialIcons name="arrow-forward" size={24} color="white" />
    </TouchableOpacity>
  </View>
</View>


      );
    } else if (form3) {
      return (
        <View style={tw`bg-gray-100 mt-8 rounded-lg overflow-hidden`}>
        <View style={tw` p-6`}>
          <Text style={tw` text-lg font-bold mb-2 text-gray-800`}>Phone Number</Text>
          <View style={tw`flex-row items-center bg-gray-300 rounded-md border border-gray-400 p-2 mb-4`}>
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withFilter
              withCountryNameButton
              withCallingCodeButton
              onSelect={onSelectCountry}
              containerButtonStyle={tw`p-2`}
            />
            <View style={tw`flex-1 ml-4`}>
              <TextInput
                style={tw`p-2 text-base text-gray-800`}
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChangeText={(text) => setPhoneNumber(text)}
                keyboardType="phone-pad"
              />
            </View>
          </View>
  
          <Text style={tw`text-lg font-bold mb-2 text-gray-800`}>Country</Text>
          <View style={tw`bg-gray-300 rounded-md border border-gray-400 p-2 flex-row items-center mb-4`}>
            <CountryPicker
              countryCode={countryCode}
              withFlag
              withFilter
              withCountryNameButton
              withCallingCodeButton
              onSelect={onSelectCountry}
              containerButtonStyle={tw`p-2`}
            />
            <View style={tw`flex-1 ml-4`}>
              <Text style={tw`p-2 text-base text-gray-800`}>{countryName}</Text>
            </View>
          </View>
  
          <View style={tw`bg-gray-300 rounded-md border border-gray-400 p-4 mb-4`}>
            <Text style={tw`text-lg font-bold mb-2 text-gray-800`}>Choose your role:</Text>
            <View style={tw`flex-row items-center mb-2`}>
              <RadioButton
                value="freelancer"
                status={isFreelancerChecked ? 'checked' : 'unchecked'}
                onPress={handleFreelancerRadioButton}
                color="#3182CE"
              />
              <Text style={tw`text-base text-gray-800`}>Freelancer</Text>
            </View>
            <View style={tw`flex-row items-center mb-2`}>
              <RadioButton
                value="client"
                status={isClientChecked ? 'checked' : 'unchecked'}
                onPress={handleClientRadioButton}
                color="#3182CE"
              />
              <Text style={tw`text-base text-gray-800`}>Client</Text>
            </View>
          </View>
  
          <View style={tw`flex flex-row justify-between items-center`}>
            <TouchableOpacity onPress={next1} style={[tw`w-1/3 py-4 bg-gray-300 rounded-md items-center justify-center  mr-4 flex-row`, { marginLeft:48,marginTop: 112 }]}>
              <MaterialIcons name="arrow-back" size={24} color="white" style={tw`mr-2`} />
              <Text style={tw`text-lg font-bold text-white `}>Go back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={next2} style={[tw`w-1/3 py-4 rounded-md items-center justify-center ml-4 flex-row`, { marginRight:55,marginTop: 112, backgroundColor: "#2D3748" }]}
    >
              <Text style={tw`text-lg font-bold text-white mr-2 `}>Next</Text>
              <MaterialIcons name="arrow-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      );
    }  
    else if(form4){
      return(
        <ScrollView contentContainerStyle={tw`bg-gray-100 p-5 `}>
  <Text style={tw`pt-8 pb-5 text-2xl font-bold mb-2`}>Choose the services that best suit you are interested in:</Text>
  <Text style={tw`pt-5  mb-0`}>Choose one</Text>
  <View style={tw`flex-row flex-wrap justify-between items-center `}>
    <View style={tw`flex-row justify-between `}>
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
      <ServiceCard

        icon={services[2].icon}
        title={services[2].title}
        isGreenBorder={selectedService === services[2].title}
        onPress={() => handleSelectService(services[2].title)}
      />
      
    </View>
    <View style={tw`flex-row justify-between w-full`}>
      <ServiceCard
        icon={services[3].icon}
        title={services[3].title}
        isGreenBorder={selectedService === services[3].title}
        onPress={() => handleSelectService(services[3].title)}
      />
      <ServiceCard
        icon={services[4].icon}
        title={services[4].title}
        isGreenBorder={selectedService === services[4].title}
        onPress={() => handleSelectService(services[4].title)}
      />
      <ServiceCard
        icon={services[5].icon}
        title={services[5].title}
        isGreenBorder={selectedService === services[5].title}
        onPress={() => handleSelectService(services[5].title)}
      />
    </View>
    <View style={tw`flex-row justify-between w-full`}>
      <ServiceCard
        icon={services[6].icon}
        title={services[6].title}
        isGreenBorder={selectedService === services[6].title}
        onPress={() => handleSelectService(services[6].title)}
      />
      <ServiceCard
        icon={services[7].icon}
        title={services[7].title}
        isGreenBorder={selectedService === services[7].title}
        onPress={() => handleSelectService(services[7].title)}
      />
      <ServiceCard
        icon={services[8].icon}
        title={services[8].title}
        isGreenBorder={selectedService === services[8].title}
        onPress={() => handleSelectService(services[8].title)}
      />
    </View>
  </View>
  <TouchableOpacity 
    style={[tw`w-full bg-gray-700 rounded-lg py-3 px-6 self-center mt-6`, selectedService ? tw`opacity-100` : tw`opacity-50`]} 
    onPress={handleSignUp}
    disabled={!selectedService}
  >
    <Text style={tw`text-white font-bold text-lg text-center`}>Continue</Text>
  </TouchableOpacity>
</ScrollView>

      )
    }
  };

  console.log("types", type);
  return render();
}
