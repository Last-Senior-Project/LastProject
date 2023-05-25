import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import { db, firebase } from "../firebase";
import { useNavigation, useRoute } from "@react-navigation/native";
function OneProfile({ route, navigation }) {
  const { profile, dataa } = route.params;
  const currentUser = firebase.auth().currentUser;
  const nav=useNavigation()
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await db.collection("data").where("email", "==", dataa.email).get();

        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          const data = doc.data();

          if (data.friend?.includes(profile.id)) {
            setIsFriend(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser.email, profile.id]);

  const handleAddFriend = async (uid, friendProfile) => {
    try {
      const userRef = db.collection("data").where("id", "==", dataa.id);
  
      const snapshot = await userRef.get();
  
      if (snapshot.empty) {
        console.log("No matching documents.");
        return;
      }
  
      // The dataa document exists, so we can update it
      const doc = snapshot.docs[0];
  
      // Check if the friend field includes the profile ID
      const isFriend = (doc.data().friend && doc.data().friend.includes(friendProfile.id));
  
      // If the profile ID is already in the friend field, remove it
      if (isFriend) {
        await doc.ref.update({
          friend: firebase.firestore.FieldValue.arrayRemove(friendProfile.id),
        });
  
        console.log("Friend removed successfully");
        setIsFriend(false);
      } else {
        // Otherwise, add the friend's ID to the friend field
        await doc.ref.update({
          friend: firebase.firestore.FieldValue.arrayUnion(friendProfile.id),
        });
  
        console.log("Friend added successfully");
        setIsFriend(true);
  
        // Send a notification to the user who received the friend request
        const currentUser = firebase.auth().currentUser;
  
        const recipientId = uid;
        const senderId = currentUser.uid;
        const type = "friendRequest";
        const name=dataa.firstname
        const notificationRef = db.collection("notifications").doc();
        await notificationRef.set({
          id: notificationRef.id,
          recipientId,
          senderId,
          type,
          name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check if the profile being displayed is the user's own profile
  const isOwnProfile = dataa.id === profile.id;

  return (
    <View style={tw`flex-1 bg-gray-50`}>
      <ScrollView contentContainerStyle={tw`p-4`}>
        <View style={tw`bg-white rounded-lg p-4 mb-4`}>
          <View style={tw`flex-row items-center mb-4`}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={tw`text-3xl font-bold ml-4 text-balck-600`} numberOfLines={1}>
              {profile.firstname} {profile.lastname}
            </Text>
          </View>
          <View style={tw`border-2 border-blue-500 rounded-lg p-4 mb-4`}>
            <Text style={tw`text-lg font-bold mb-2 text-blue-600`}>Profile Information</Text>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`bg-gray-200 py-2 px-4 rounded-lg mr-2`}>
                <Text style={tw`text-lg font-bold text-gray-600`} numberOfLines={1}>
                  Name:
                </Text>
              </View>
              <Text style={tw`text-lg text-gray-700`} numberOfLines={1}>
                {profile.firstname} {profile.lastname}
              </Text>
            </View>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`bg-gray-200 py-2 px-4 rounded-lg mr-2`}>
                <Text style={tw`text-lg font-bold text-gray-600`} numberOfLines={1}>
                  Age:
                </Text>
              </View>
              <Text style={tw`text-lg text-gray-700`}>{profile.agent}</Text>
            </View>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`bg-gray-200 py-2 px-4 rounded-lg mr-2`}>
                <Text style={tw`text-lg font-bold text-gray-600`} numberOfLines={1}>
                  Country:
                </Text>
              </View>
              <Text style={tw`text-lg text-gray-700`}>{profile.countryName}</Text>
            </View>
          </View>
          <View style={tw`border-2 border-blue-500 rounded-lg p-4 mb-4`}>
            <Text style={tw`text-lg font-bold mb-2 text-blue-600`}>Contact Information</Text>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`bg-gray-200 py-2 px-4 rounded-lg mr-2`}>
                <MaterialIcons name="email" size={24} color="gray" />
              </View>
              <Text style={tw`text-lg text-gray-700`} numberOfLines={2}>
                {profile.email}
              </Text>
            </View>
            <View style={tw`flex-row items-center mb-2`}>
              <View style={tw`bg-gray-200 py-2 px-4 rounded-lg mr-2`}>
                <MaterialIcons name="phone" size={24} color="gray" />
              </View>
              <Text style={tw`text-lg text-gray-700`} numberOfLines={1}>
                {profile.phoneNumber}
              </Text>
            </View>
          </View>
          {isOwnProfile ? (
            <Text style={tw`text-lg font-bold mb-2 text-blue-600`} 
            onPress={()=>{ nav.navigate('Profile')}}
            >Go to your profile to see your information</Text>
          ) : (
            <>
              {isFriend ? (
                <TouchableOpacity style={tw`bg-red-500 py-2 px-4 rounded-lg`} onPress={() => handleAddFriend(currentUser.uid, profile)}>
                  <MaterialIcons name="remove" size={24} color="white" />
                  <Text style={tw`text-lg font-bold text-white ml-2`}>Remove Friend</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={tw`bg-blue-500 py-2 px-4 rounded-lg`} onPress={() => handleAddFriend(profile.id, profile)}>
                  <Text style={tw`text-lg font-bold text-white text-center`}>Add Friend</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

export default OneProfile;