import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, SIZES, FONTS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { GiftedChat, Send, Bubble } from 'react-native-gifted-chat'
import { firebase, db } from '../firebase';
import { useRoute } from "@react-navigation/native";

const PersonalChat = ({ route,navigation }) => {
    const router=useRoute()
    const [data, setData] = useState(router.params.user);
    const { userName,firstname,image,userImage} = route.params; 
    const [messages, setMessages] = useState([]);
    const receverId = route.params.receverId || "";
    const senderId = route.params.senderId || "";
    
    const yourAvatar = userImage;
   const theirAvatar = image;
  
   useEffect(() => {
    if (senderId && receverId) {
      const messagesRef = db.collection('messages');
  
      const unsubscribe = messagesRef
        .where('senderId', 'in', [senderId, receverId])
        .where('receverId', 'in', [senderId, receverId])
        .orderBy('createdAt', 'desc')
        .onSnapshot((querySnapshot) => {
          const newMessages = [];
          querySnapshot.forEach((doc) => {
            const message = doc.data();
            if ( 
                (message.senderId === senderId && message.receverId === receverId) ||  
                (message.senderId === receverId && message.receverId === senderId)
              ) { 
              if (message.createdAt) { // check if createdAt exists
                newMessages.push({  
                  _id: doc.id,
                  text: message.text,
                  createdAt: message.createdAt.toDate(),     
                  user: {  
                    _id: message.senderId === senderId ? senderId : receverId,
                    name: message.senderId === senderId ? firstname : userName,    
                    avatar:  message.senderId === senderId ? yourAvatar : theirAvatar   
                  }
                });
              }
            }
          });
          setMessages(newMessages);
        });
  
      return () => unsubscribe();
    }
  }, [senderId, receverId, userName,firstname]);

  const onSend = useCallback((messages) => {
    messages.forEach((msg) => {
      db.collection('messages').add({
        text: msg.text,
        senderId: senderId, 
        receverId:receverId,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    });
  }, [senderId,receverId]);
    // change button of send
    const renderSend = (props) => {
        return (
            <Send {...props}>
                <View
                    style={{
                        height: 36,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 36,
                        borderRadius: 18,
                        backgroundColor: COLORS.primary,
                        marginRight: 5,
                        marginBottom: 5,
                    }}
                >
                    <FontAwesome name="send" size={12} color={COLORS.white} />
                </View>
            </Send>
        )
    }

    // customize sender messages
    const renderBubble = (props) => {
        return (
          <Bubble
            {...props}
            wrapperStyle={{
              left: {
                backgroundColor: COLORS.lightGray3,
              },
              right: {
                backgroundColor: COLORS.primary,
              },
            }}
            textStyle={{
              left: {
                color: COLORS.black,
              },
              right: {
                color: COLORS.white,
              },
            }}
            // apply different styles for receiver messages
            timeTextStyle={{
              left: {
                color: COLORS.black,
              },
              right: {
                color: COLORS.white,
              },
            }}
            usernameStyle={{
              left: {
                color: COLORS.black,
              },
              right: {
                color: COLORS.white,
              },
            }}
          />
        );
      };
    return (
        <SafeAreaView style={{ flex: 1, color: COLORS.secondaryWhite }}>
            <StatusBar style="light" backgroundColor={COLORS.white} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingHorizontal: 22,
                    backgroundColor: COLORS.white,
                    height: 60,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Contacts')}
                    >
                        <MaterialIcons
                            name="keyboard-arrow-left"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <Text style={{ ...FONTS.h4, marginLeft: 8 }}>
                        {userName}
                    </Text>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <TouchableOpacity
                        onPress={() => console.log('search')}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <MaterialIcons
                            name="search"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => console.log('Menu')}
                        style={{
                            marginRight: 8,
                        }}
                    >
                        <MaterialIcons
                            name="menu"
                            size={24}
                            color={COLORS.black}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <GiftedChat
                messages={messages}
                onSend={onSend}
                user={{
                    _id: senderId,
                 name: firstname,
                 avatar: yourAvatar,
                }}
                renderBubble={renderBubble}
                alwaysShowSend
                renderSend={renderSend}
                recipient={{ 
                    id: receverId, 
                    name: userName,
                    avatar: theirAvatar,
                  }}
                scrollToBottom
                textInputStyle={{
                    borderRadius: 22,
                    borderWidth: 1,
                    borderColor: COLORS.gray,
                    marginRight: 6,
                    paddingHorizontal: 12,
                }}
            />
        </SafeAreaView>
    )
}

export default PersonalChat
