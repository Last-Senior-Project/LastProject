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
import { db } from '../firebase'


const Contacts = ({ navigation }) => {
    const [search, setSearch] = useState('')
    const route=useRoute()
    const[data,setData]=useState(route.params?.contacts)
    const [user,setUser]= useState(route.params?.user)
    const [filteredUsers, setFilteredUsers] = useState(data?.length > 0 ? data : [])

    useEffect(() => {
        
        const fetchFriends = async () => {
            if (user?.friend) {
              const friendDocs = await Promise.all(user?.friend.map((friendId) =>
                db.collection('data').doc(friendId).get()
              ));
              const friends = friendDocs.map((doc) => doc.data());
              setFilteredUsers(friends);
            }
          };
        fetchFriends();
    }, [user.friend]);
    

    const handleSearch = (text) => {
        setSearch(text)
        const filteredData = data.filter((user) =>
            user.firstname.toLowerCase().includes(text.toLowerCase())
        ) ?? []
        setFilteredUsers(filteredData)
    }
    console.log("filter",filteredUsers)

    const renderItem = ({ item, index }) =>{
       
        return  (
            <TouchableOpacity
                key={index}
                onPress={() =>
                    navigation.navigate('PersonalChat', {
                        userName: item.firstname,
                        firstname:user.lastname,
                        image:user.image
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

                    <Image
                        source={{ uri: item?.image }}
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
                        {item?.firstname} {item?.lastname}
                    </Text>
                    <Text style={{ fontSize: 14, color: COLORS.secondaryGray }}>
                        {item?.lastSeen}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    console.log("filtred",filteredUsers);
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

                    <View
                        style={{
                            paddingBottom: 100,
                        }}
                    >
                       {filteredUsers.length > 0 && (
  <FlatList
    data={filteredUsers}
    renderItem={renderItem}
    keyExtractor={(item) => item?.id}
  />
)}
                    </View>
                </View>
            </PageContainer>
        </SafeAreaView>
    )
}

export default Contacts