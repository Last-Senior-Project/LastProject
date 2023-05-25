import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { firebase, db } from "../firebase";
import { Feather } from "@expo/vector-icons";
import tw from "tailwind-react-native-classnames";
import { TouchableOpacity } from "react-native-gesture-handler";
const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Get current user and notifications
    const currentUser = firebase.auth().currentUser;
    const unsub = db.collection("notifications").where("recipientId", "==", currentUser.uid).onSnapshot(snapshot => {
      const newNotifications = snapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt.toDate().toLocaleString();
        return { ...data, id: doc.id, createdAt };
      });
      setNotifications(newNotifications);
    });

    const unsub2 = db.collection("notifications").where("receiver", "==", currentUser.uid).onSnapshot(snapshot => {
      const newNotifications = snapshot.docs.map(doc => {
        const data = doc.data();
        const createdAt = data.createdAt.toDate().toLocaleString();
        return { ...data, id: doc.id, createdAt };
      });
      setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
    });

    // Unsubscribe from subscriptions on unmount
    return () => {
      unsub();
      unsub2();
    };
  }, []);

  // Accept friend request
 // Accept friend request
const handleAccept = async notification => {
  try {
    const currentUser = firebase.auth().currentUser;

    // Add sender to recipient's friend list
    const recipientRef = db.collection("data").where("id", "==", currentUser.uid);
    const recipientSnapshot = await recipientRef.get();
    if (!recipientSnapshot.empty) {
      const recipientDoc = recipientSnapshot.docs[0];
      const recipientData = recipientDoc.data();
      const friendList = recipientData.friend || [];
      if (!friendList.includes(notification.senderId)) {
        friendList.push(notification.senderId);
        await recipientDoc.ref.update({ friend: friendList });
      }
    }

    // Add recipient to sender's friend list
    const senderRef = db.collection("data").where("id", "==", notification.senderId);
    const senderSnapshot = await senderRef.get();
    if (!senderSnapshot.empty) {
      const senderDoc = senderSnapshot.docs[0];
      const senderData = senderDoc.data();
      const friendList = senderData.friend || [];
      if (!friendList.includes(currentUser.uid)) {
        friendList.push(currentUser.uid);
        await senderDoc.ref.update({ friend: friendList });
      }
    }

    // Delete notification
    await db.collection("notifications").doc(notification.id).delete();
  } catch (error) {
    console.log("Error accepting friend request:", error.message);
  }
};

// Reject friend request
const handleReject = async notification => {
  try {
    const currentUser = firebase.auth().currentUser;

    // Delete notification
    await db.collection("notifications").doc(notification.id).delete();

    // Remove recipient from sender's friend list
    const senderRef = db.collection("data").where("id", "==", notification.senderId);
    const senderSnapshot = await senderRef.get();
    if (!senderSnapshot.empty) {
      const senderDoc = senderSnapshot.docs[0];
      const senderData = senderDoc.data();
      const friendList = senderData.friend || [];
      const index = friendList.indexOf(currentUser.uid);
      if (index !== -1) {
        friendList.splice(index, 1);
        await senderDoc.ref.update({ friend: friendList });
      }
    }
  } catch (error) {
    console.log("Error rejecting friend request:", error.message);
  }
};

  const renderNotifications = notifications => {
    return notifications.map(notification => {
      if (notification.type === "accept") {
        return (
          <View 
            key={notification.id} 
            style={tw`bg-green-100 rounded-md p-3 mb-2 flex items-center`}>
            <Feather name="check-circle" size={20} color="green" />
            <Text style={tw`text-green-800 font-bold text-center text-sm ml-2`}>  
              {notification.message}
            </Text>
          </View>
        );
      } else if (notification.type === "friendRequestAccepted") {
        return (
          <View 
            key={notification.id} 
            style={tw`bg-blue-100 rounded-md p-3 mb-2 flex items-center`}>
            <Feather name="user-plus" size={20} color="blue" />
            <Text style={tw`text-blue-800 font-bold text-center text-sm ml-2`}>  
              {notification.name} accepted your friend request.
            </Text>
          </View>
        );
      } else if (notification.type === "friendRequest") {
        return (
          <View 
            key={notification.id} 
            style={tw`bg-blue-100 rounded-md p-3 mb-2 flex items-center`}>
            <Feather name="user-plus" size={20} color="blue" />
            <Text style={tw`text-blue-800 font-bold text-center text-sm ml-2`}>  
              {notification.name} sent you a friend request.
            </Text>
            <View style={tw`flex-row ml-auto`}>
              <TouchableOpacity
                style={tw`bg-green-100 rounded-full p-1 mr-2`}
                
              >
                <Feather name="check" size={20} color="green" onPress={() => handleAccept(notification)}/>
              </TouchableOpacity>
              <TouchableOpacity
                style={tw`bg-red-100 rounded-full p-1`}
                
              >
                <Feather name="x" size={20} color="red" onPress={() => handleReject(notification)}/>
              </TouchableOpacity>
            </View>
          </View>
        );
      } else {
        return null;
      }
    });
  };

  return (
    <View style={tw`p-4`}>
      <Text style={tw`text-2xl font-bold mb-4`}>Notifications</Text>
      {renderNotifications(notifications)}
    </View>
  );
};

export default Notifications;