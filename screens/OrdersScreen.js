import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import tw from 'tailwind-react-native-classnames';
import { db } from '../firebase';
import { useRoute } from '@react-navigation/native';

const OrdersScreen = () => {
const route = useRoute()
  const [orders, setOrders] = useState([]);
const [data,setData] =useState(route.params.user)
  useEffect(() => {
    const unsubscribe = db.collection('order')
      .onSnapshot((querySnapshot) => {
        console.log('Orders:', querySnapshot.docs.length);
        const orders = [];
        querySnapshot.forEach((doc) => {
          orders.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setOrders(orders);
      }, (error) => {
        console.error('Error fetching orders:', error);
      });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleNotification = (item) => {
    const notification = {
      sender: data.id,
      receiver: item.clientId,
      message: `${data.firstname} wants to work with you.`,
      nameFreelanccer:data.firstname,
      type: "work",
      createdAt: new Date(),
    };

    db.collection('notifications')
      .add(notification)
      .then(() => {
        Alert.alert('Notification sent!');
      })
      .catch((error) => {
        console.error('Error sending notification:', error);
      });
  };

  const renderItem = ({ item }) => (
    <View style={styles.orderBox}>
      <TouchableOpacity onPress={() => handleNotification(item)}>
        <MaterialIcons name="code" size={30} color="#5E60CE" />
      </TouchableOpacity>
      <View style={tw`ml-4 flex-1`}>
        <Text style={tw`text-lg font-bold text-gray-800`}>{item.title}</Text>
        <Text style={tw`text-sm text-gray-600 mb-2`}>Description: {item.description}</Text>
        <Text style={tw`text-sm text-gray-600 mb-2`}>Location: {item?.location}</Text>
        <Text style={tw`text-sm text-gray-600 mb-2`}>Skills :{item?.skills}</Text>
        <Text style={tw`text-sm text-gray-600 mb-2`}>Payment :{item?.pay}$/hour</Text>
        <Text style={tw`text-sm text-gray-600 mb-2`}>Country :{item?.country}</Text>
        <Text style={tw`text-sm text-gray-600 mb-2`}> City :{item?.city}</Text>
        <Text style={tw`text-sm text-gray-600`}>Order ID: {item.clientId}</Text>
      </View>
    </View>
  );

  return (
    <View style={tw`flex-1 bg-white p-6`}>
      <Text style={tw`text-lg font-bold mb-4`}>All Orders:</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  orderBox: {
    backgroundColor: '#F7FAFC',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
});

export default OrdersScreen;