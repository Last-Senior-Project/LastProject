import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import { db } from '../firebase';
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NotificationsScreen = () => {
  const route = useRoute();
  const [user, setUser] = useState(route.params.user);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('notifications')
      .where('receiver', '==', user.id)
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        console.log('Notifications:', querySnapshot.docs.length);
        const notifications = [];
        querySnapshot.forEach((doc) => {
          notifications.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setNotifications(notifications);
      }, (error) => {
        console.error('Error fetching notifications:', error);
      });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const handleAccept = (notification) => {
    db.collection('worked').doc(notification.sender).set({
      acceptedBy: user.id,
      Freelancer:notification.sender,
      acceptedAt: new Date(),
    })
    .then(() => {
      console.log('Sender added to "worked" collection');
      // Send notification to sender
      db.collection('notifications').add({
        sender: user.firstname,
        receiver: notification.sender,
        message: `You have been accepted by ${user.firstname}.`,
        type: 'accept',
        createdAt: new Date(),
      })
      .then(() => {
        console.log('Notification sent to sender');
      })
      .catch((error) => {
        console.error('Error sending notification to sender:', error);
      });
    })
    .catch((error) => {
      console.error('Error adding sender to "worked" collection:', error);
    });
  };

  const handleReject = (notification) => {
  };

  const renderItem = ({ item }) => (
    <View style={styles.notificationBox}>
      <Text style={tw`text-lg font-bold text-gray-800`}>{item.message}</Text>
      <Text style={tw`text-sm text-gray-600`}>From: {item.sender}</Text>
      <Text style={tw`text-sm text-gray-600`}>Date: {new Date(item.createdAt.toDate()).toLocaleDateString()}</Text>
      {item.type === 'work' && (
        <View style={tw`flex-row mt-2`}>
          <TouchableOpacity onPress={() => handleAccept(item)}>
            <MaterialCommunityIcons name="check-circle-outline" size={24} color="#5E60CE" style={tw`mr-2`} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleReject(item)}>
            <MaterialCommunityIcons name="close-circle-outline" size={24} color="#E53E3E" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      <Text style={tw`text-lg font-bold mb-4`}>Notifications:</Text>
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  notificationBox: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
});

export default NotificationsScreen;