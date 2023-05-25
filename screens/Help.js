import React, { Component } from 'react'; 
import { Text, View, StyleSheet, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default  Help=()=> {
  
const navigation = useNavigation()
   return (
     <View style={styles.container}>
       <Text style={styles.text}>
       If you have any questions or require assistance, our dedicated bot is here to provide instant answers. You can conveniently reach out to our bot by sending a message, and it will promptly address your queries. Alternatively, you can also email us at
         {'\n'}
         <Text 
           style={styles.textt}
           onPress={() => Linking.openURL('mailto:gighive@gmail.com')}>
           gighive@gmail.com
         </Text>
         , and our team will respond to your inquiries as quickly as possible. We value your satisfaction and aim to provide efficient support.   and our team will respond to your inquiries as quickly as possible. We value your satisfaction and aim to provide efficient support.
       </Text>
       <View style={styles.chatButton}>
    <TouchableOpacity onPress={() => navigation.navigate("ChatBot")}>
    <MaterialCommunityIcons name="chat-outline" size={24} color="#003580" onPress={() => navigation.navigate('ChatBot')} />
        </TouchableOpacity>
    </View>
     </View>
     
   );
 }


const styles = StyleSheet.create({
 container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center',
   padding: 20,
 },
 text: {
   fontSize: 17,
   textAlign: 'center',
   marginBottom: 180,
 }, 
 textt: {
  fontSize: 17,
  textAlign: 'center',
  marginBottom: 180,
  color:"blue",
}, 
chatButton: {
  width: 60,
  height: 60,
  borderRadius: 25,
  backgroundColor: "#f7f7f7",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  bottom: 20,
  right: 20,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
  elevation: 2,
}
});