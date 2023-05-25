import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Image,
  } from 'react-native'
  import React, { useState, useEffect } from 'react'
  import { SafeAreaView } from 'react-native-safe-area-context'
  import PageContainer from '../components/PageContainer'
  import { COLORS, FONTS } from '../constants'
  import { AntDesign, Ionicons } from '@expo/vector-icons'
  import { useRoute } from "@react-navigation/native";
  
  const Contacts = ({ navigation }) => {
      const [search, setSearch] = useState('')
      const route=useRoute()
      const[data,setData]=useState(route.params?.contacts)
      const [user,setUser]= useState(route.params?.user)
      const [filteredUsers, setFilteredUsers] = useState(data?.length > 0 ? data : [])
  
      useEffect(() => {
          navigation.setOptions({
              headerRight: () => (
                  <TouchableOpacity
                      onPress={() => console.log('Profile')}
                      style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingRight: 22,
                      }}
                  >
                      <Image
                          source={{ uri: user.photoUrl }}
                          resizeMode="contain"
                          style={{
                              height: 30,
                              width: 30,
                              borderRadius: 15,
                              marginRight: 10,
                          }}
                      />
                      <Text style={{ ...FONTS.h4 }}>{user.firstname}</Text>
                  </TouchableOpacity>
              ),
          });
      }, [navigation, user]);
  
      const handleSearch = (text) => {
          setSearch(text)
          const filteredData = data.filter((user) =>
          user.firstname.toLowerCase().includes(text.toLowerCase())
  ) ?? []
          setFilteredUsers(filteredData)
      }
      
  
      const renderItem = ({ item, index }) =>{
         
          return  (
          <TouchableOpacity
              key={index}
              onPress={() =>
                  navigation.navigate('PersonalChat', {
                   userName: item.name,
                   receverId: item.id,
                   senderId:user.id,
                   firstname:user.firstname
                  })
              }
              
              style={[
                  {
                      width: '100%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 22,
                      borderBottomColor: COLORS.secondaryWhite,
                      borderBottomWidth: 1,
                  },
                  index % 2 !== 0
                      ? {
                            backgroundColor: COLORS.tertiaryWhite,
                        }
                      : null,
              ]}
          >
              <View
                  style={{
                      paddingVertical: 15,
                      marginRight: 22,
                  }}
              >
                  {item.isOnline && item.isOnline == true && (
                      <View
                          style={{
                              height: 14,
                              width: 14,
                              borderRadius: 7,
                              backgroundColor: COLORS.green,
                              borderColor: COLORS.white,
                              borderWidth: 2,
                              position: 'absolute',
                              top: 14,
                              right: 2,
                              zIndex: 1000,
                          }}
                      ></View>
                  )}
  
                  <Image
                      source={{ uri: item.photoUrl }}
                      resizeMode="contain"
                      style={{
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                      }}
                  />
              </View>
              <View
                  style={{
                      flexDirection: 'column',
                  }}
              >
                  <Text style={{ ...FONTS.h4, marginBottom: 4 }}>
                      {item.firstname} {item.lastname}
                  </Text>
                  <Text style={{ fontSize: 14, color: COLORS.secondaryGray }}>
                      {item.lastSeen}
                  </Text>
              </View>
          </TouchableOpacity>
      )}
  
      return (
          <SafeAreaView style={{ flex: 1 }}>
              <PageContainer>
                  <View style={{ flex: 1 }}>
                      <View
                          style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginHorizontal: 22,
                              marginTop: 22,
                          }}
                      >
                          <Text style={{ ...FONTS.h4 }}>Contacts</Text>
                          <TouchableOpacity
                              onPress={() => console.log('Add contacts')}
                          >
                              <AntDesign
                                  name="plus"
                                  size={20}
                                  color={COLORS.secondaryBlack}
                              />
                          </TouchableOpacity>
                      </View>
                      <View
                          style={{
                              marginHorizontal: 22,
                              flexDirection: 'row',
                              alignItems: 'center',
                              backgroundColor: COLORS.secondaryWhite,
                              height: 48,
                              marginVertical: 22,
                              paddingHorizontal: 12,
                              borderRadius: 20,
                          }}
                      >
                          <Ionicons
                              name="ios-search-outline"
                              size={24}
                              color={COLORS.black}
                          />
  
                          <TextInput
                              style={{
                                  width: '100%',
                                  height: '100%',
                                  marginHorizontal: 12,
                              }}
                              value={search}
                              onChangeText={handleSearch}
                              placeholder="Search contact..."
                          />
                      </View>
  
                      <FlatList
                          data={filteredUsers}
                          renderItem={renderItem}
                          keyExtractor={(item) => item.id.toString()}
                          contentContainerStyle={{ paddingBottom: 100 }}
                      />
                  </View>
              </PageContainer>
          </SafeAreaView>
      )
  }
  
  export default Contacts