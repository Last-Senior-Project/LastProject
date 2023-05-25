import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  SafeAreaView,
  TouchableOpacity,
  FlatList
  } from "react-native";
  import React, {useState,useEffect} from "react";
  import { Ionicons , MaterialCommunityIcons} from '@expo/vector-icons';
  import { categories} from '../constants/data';
  import { useRoute } from "@react-navigation/native";
  import { firebase, db } from '../firebase';
  import tw from "tailwind-react-native-classnames";
  import { MaterialIcons } from "@expo/vector-icons";
  import { FontAwesome } from '@expo/vector-icons';
  import { TouchableWithoutFeedback,Linking } from 'react-native';  
import { height } from "deprecated-react-native-prop-types/DeprecatedImagePropType";
  const HomeScreen = ({ navigation }) => {
  const route=useRoute()
  const[dataa,setDataa]=useState(route.params.user)
  const COLORS = {
  lightWhite: '#f7f7f7',
  // add other color values here
  };
  const [activeCategory, setActiveCategory] = useState(1);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [newComment, setNewComment] = useState("");
  const [searchText,setSearchText]=useState("")
  const [showsearch,setShowsearch]=useState(false)
  const [profiles,setProfiles]=useState([])
  const [error, setError] = useState(null);
  console.log(dataa.online);
  const formatDate = (created) => {  
    if (!created) {
      return '';
    }  
    const date = created.toDate();  
    return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
  }
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const querySnapshot = await db.collection("data").get();
        const profiles = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          profiles.push(data);
        });
        setProfiles(profiles);
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching profiles");
      }
    };
    fetchProfiles();
  }, []);
////////////render profile
const renderProfile = ({ item }) => {
  if (searchText !== "" && (
    item.firstname.toLowerCase().startsWith(searchText.toLowerCase()) ||
    item.lastname.toLowerCase().startsWith(searchText.toLowerCase()) ||
    item.email.toLowerCase().startsWith(searchText.toLowerCase()) ||
    item.phoneNumber.toLowerCase().startsWith(searchText.toLowerCase()) ||
    item.expertise.toLowerCase().startsWith(searchText.toLowerCase()) ||
    (item.skills && item.skills.some(skill =>
      skill.toLowerCase().includes(searchText.toLowerCase())
    )) ||
    item.countryName.toLowerCase().startsWith(searchText.toLowerCase())||
    item.expertise.toLowerCase().startsWith(searchText.toLowerCase())
  )) {
    return (
      <TouchableOpacity
        style={[tw`my-4 bg-white rounded-lg p-4 flex-row items-center justify-between`, { alignSelf: 'center' }]}
        onPress={() => navigateToOneProfile(item)}
      >
        <View>
          <Text style={tw`text-lg font-bold mb-2`}>
            {item.firstname} {item.lastname}
          </Text>
          <View style={tw`flex-row items-center mb-1`}>
            <MaterialIcons name="email" size={16} color="gray" style={tw`mr-1`} />
            <Text style={tw`text-gray-500`}>{item.email}</Text>
          </View>
          <View style={tw`flex-row items-center mb-1`}>
            <MaterialIcons name="phone" size={16} color="gray" style={tw`mr-1`} />
            <Text style={tw`text-gray-500`}>{item.phoneNumber}</Text>
          </View>
          <View style={tw`flex-row items-center mb-1`}>
            <MaterialIcons
              name="assignment"
              size={16}
              color="gray"
              style={tw`mr-1`}
            />
            <Text style={tw`text-gray-500`}>{item.expertise}</Text>
          </View>
          <View style={tw`flex-row items-center`}>
            <MaterialIcons
              name="location-on"
              size={16}
              color="gray"
              style={tw`mr-1`}
            />
            <Text style={tw`text-gray-500`}>{item.countryName}</Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="black" />
      </TouchableOpacity>
    );
  } else {
    return null;
  }
};

const filteredProfiles = profiles.filter((profile) =>
  profile.firstname.toLowerCase().startsWith(searchText.toLowerCase()) ||
  profile.lastname.toLowerCase().startsWith(searchText.toLowerCase()) ||
  profile.email.toLowerCase().startsWith(searchText.toLowerCase()) ||
  profile.phoneNumber.toLowerCase().startsWith(searchText.toLowerCase()) ||
  profile.expertise.toLowerCase().startsWith(searchText.toLowerCase()) ||
  (profile.skills && profile.skills.some(skill =>
    skill.toLowerCase().includes(searchText.toLowerCase())
  )) ||
  profile.countryName.toLowerCase().startsWith(searchText.toLowerCase())||
  profile.expertise.toLowerCase().startsWith(searchText.toLowerCase())
);



  useEffect(() => {
    const unsubscribe = db.collection("posts").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(data);
    });
    return unsubscribe;
  }, []);

  const handleLike = async (postId) => {
    const user = dataa;
    if (!user) {
      return;
    }
    const postRef = db.collection("posts").doc(postId);
    const post = await postRef.get();
    const postData = post.data();
    const isLiked = postData.likes.includes(user.id);
    const updatedLikes = isLiked
      ? firebase.firestore.FieldValue.arrayRemove(user.id)
      : firebase.firestore.FieldValue.arrayUnion(user.id);
    await postRef.update({ likes: updatedLikes });
  };

  const handleNewPost = async () => {
    const user = dataa;
    if (!user) {
      console.log('User is undefined');
      return;
    }
    await db.collection("posts").add({
      text: newPost,
      userUid: user.id,
      userName :user.firstname,
      likes: [],
      comments: [],
      created: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setNewPost("");
  };

  const navigateToOneProfile = (profile) => {
    navigation.navigate("oneProfile", { profile ,dataa});
  };

  const handleNewComment = async (postId) => {
    const user = dataa;
    if (!user) {
      console.log('User is undefined');
      return;
    }
    const postRef = db.collection("posts").doc(postId);
    const post = await postRef.get();
    const postData = post.data();
    const updatedComments = [...postData.comments, { text: newComment,userName :user.firstname, userUid: user.id, created: new Date() }];
    await postRef.update({ comments: updatedComments });
    setNewComment("");
  };
  const setToSearch=(query)=>{
    setSearchText(query)
    setShowsearch(!showsearch)
  }
  const handleDeleteComment = async (postId, comment) => {
    const postRef = db.collection("posts").doc(postId);
    const post = await postRef.get();
    const postData = post.data();
    const updatedComments = postData.comments.filter(
      (c) => c.created.toDate().toString() !== comment.created.toDate().toString()
    );
    await postRef.update({ comments: updatedComments });
  };

  const handleDelete = async (postId) => {
    const postRef = db.collection("posts").doc(postId);
    const post = await postRef.get();
    const postData = post.data();
      
    // Only allow post author to delete
    if (postData.userUid === dataa.id) {
      await postRef.delete();
    } 
  };

  const renderItem = ({ item }) => {
  
    return (
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
        <View style={{flex: 1}}>
        <Text style={styles.postHeaderText}>{item.text}</Text>
        <Text style={styles.userName}>     
           {item.userName}   
        </Text>   

        <Text style={styles.postedAt}>
         Posted {formatDate(item.created)}  
        </Text>
        </View>
          <TouchableOpacity onPress={() => handleLike(item.id)}>
            <Ionicons
              name={
                item.likes.includes(dataa.id) ? "heart" : "heart-outline"
              }
              size={24}
              color={item.likes.includes(dataa.id) ? "red" : "black"}
            />
          </TouchableOpacity>
          <Text style={styles.likesCount}>{item.likes.length}</Text>
          {item.userUid === dataa.id && (
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
       <Ionicons name="trash-outline" size={24} color="black" />
      </TouchableOpacity>
           )}
        </View>
        <View style={styles.postComments}>
          <FlatList
            data={item.comments}
            keyExtractor={(comment) =>
              comment.created.toDate().toString()
            }
            renderItem={({ item: comment }) => (
              <View style={styles.commentContainer}>
                <Text style={styles.commentUser}>{comment.userName}</Text>
                <View style={styles.commentTextContainer}>
                  <Text style={styles.commentText}>{comment.text}</Text>
                  {comment.userUid === dataa.id && (
                    <TouchableOpacity
                      onPress={() =>
                        handleDeleteComment(item.id, comment)
                      }
                    >
                      <Ionicons
                        name="close-circle-outline"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            )}
          />
          <View style={styles.newCommentContainer}>
            <TextInput
              style={styles.newCommentInput}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={(text) => setNewComment(text)}
            />
            <TouchableOpacity onPress={() => handleNewComment(item.id)}>
              <Text style={styles.newCommentButton}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  const handleSearchClick = () => {
    if(searchText.length){
      setShowsearch(!showsearch)
    }
    else{
      alert("check the query to serach with ")
    }
  }
  
  return (
    <>
    <View style={{ flex: 1, position: 'relative' }}>
    <SafeAreaView style={{ backgroundColor: COLORS.lightWhite }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 10 }}>
        
        <View className="flex-row items-center space-x-2" style={{ marginLeft: 170}}>
          <Ionicons name="location" size={25} color="black" />
          <Text className="font-semibold text-base">
            {dataa.countryName}
          </Text>
        </View>
        <Image
          source={{ uri: dataa.image }}
          style={{ width: 40, height: 40, borderRadius: 8 }}
        />
      </View>
    </SafeAreaView>
  
    {/* search box */}
    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 10 }}>
      <TextInput
        style={{ backgroundColor: '#ccc', borderRadius: 8, flex: 1, marginRight: 10, padding: 10 }}
        placeholder="Search"
        onChangeText={(text)=>{setSearchText(text)}}
      />
      <Ionicons name="search" size={24} color="black" onPress={handleSearchClick} />
    </View>
  
   
    {showsearch && 
      <View style={{
        position: 'absolute',
        top: 110, 
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.9)',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        zIndex: 1,
      }}>
        <TouchableWithoutFeedback onPress={() => setShowsearch(!showsearch)}>
          <FontAwesome
            name={showsearch ? 'close' : 'search'}
            size={24}
            color="black"
            style={{ position: 'absolute', top: 10, right: 10 }}
          />
        </TouchableWithoutFeedback>
        
        {error && <Text style={tw`text-red-500 text-center mb-4`}>{error}</Text>}
        {filteredProfiles.length > 0 ? (
          <FlatList
            data={filteredProfiles}
            renderItem={renderProfile}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ alignItems: 'center' }}
          />
        ) : (
          <Text style={[tw`text-center text-lg`, { textAlign: 'center' }]}>No profiles found</Text>
        )}
      </View>
    }
    <View style={{flexDirection: 'row'}}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categories}
        
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => setActiveCategory(item.id)}
              style={{
                paddingHorizontal: 12,
                paddingVertical: 8,
                backgroundColor: activeCategory === item.id ? '#333' : '#eee',
                borderRadius: 20,
                marginRight: 10,
                marginTop:10,
                marginLeft: 8,
              }}>
              <Text
              onPress={()=>setToSearch(item.title)}
                style={{
                  color: activeCategory === item.id ? '#fff' : '#333',
                  fontWeight: 'bold',
                }}>
                {item.title}

              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  
    <View style={{ marginHorizontal: 20 }}>
  <Text style={{ fontSize: 17, fontWeight: "500", marginTop: 10 }}>Work More, Money Less</Text>
  {dataa.projects && dataa.projects.length > 0 ? (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 20 }}>
      {dataa.projects.map((project) => (
        <Pressable
          key={project.name}
          style={{
            width: 200,
            height: 150,
            backgroundColor: "#003580",
            borderRadius: 8,
            padding: 20,
            marginRight: 10
          }}
          onPress={() => {
            // Open the project's GitHub link in the default browser
            Linking.openURL(project.linkGit);
          }}>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "bold" }}>{project.name}</Text>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "500", marginTop: 5 }}>
            {project.description}
          </Text>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "500", marginTop: 5 }}>
            {project.linkGit}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  ) : (
    <Text style={{ fontSize: 15, fontWeight: "500", marginTop: 20 }}>There are no projects yet.</Text>
  )}
</View>
  
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Gig-Hive Community</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.newPostContainer}>
          <TextInput
            style={styles.newPostInput}
            placeholder="What's on your mind?"
            value={newPost}
            onChangeText={(text) => setNewPost(text)}
          />
          <TouchableOpacity onPress={handleNewPost}>
            <Text style={styles.newPostButton}>Post</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={posts}
          keyExtractor={(post) => post.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  </View>
    <View style={styles.chatButton}>
    <TouchableOpacity onPress={() => navigation.navigate("ChatBot")}>
    <MaterialCommunityIcons name="chat-outline" size={24} color="#003580" onPress={() => navigation.navigate('ChatBot')} />
        </TouchableOpacity>
    </View>
  </>
  )
}
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      paddingHorizontal: 20,
      paddingVertical: 20,
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
    },
    header: {
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "gray",
      borderBottomWidth: 1,
      borderBottomColor: "#e6e6e6",
      borderRadius:8
    },
    headerText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "black",
      fontFamily: "System",
    },
    newPostContainer: {
      height:60,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ccc",
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 20,
      marginTop:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    newPostInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: "#333333",
      fontFamily: "Roboto",
    },
    newPostButton: {
      marginLeft: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#2D3748',
      borderRadius: 8,
      color:"white",
    },
    newPostButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: '700',
      fontFamily: "Roboto",
    },
    postContainer: {
      backgroundColor: "#ccc",
      borderRadius: 8,
      padding: 20,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      minHeight: 100, // increase the minHeight property
    },
    postHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
      minHeight: 20,
    },
    postHeaderText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333333",
      fontFamily: "System",
      minHeight: 40, // increase the minHeight property
    },
    likesCount: {
      marginLeft: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: "#333333",
      fontFamily: "System",
    },
    postComments: {
      marginVertical: 10,
    },
    commentContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    commentTextContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginLeft: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: "#f9fafb",
      borderRadius: 8,
    },
    commentText: {
      flex: 1,
      fontSize: 16,
      color: "black",
      fontFamily: "Roboto",
    },
    commentUser: {
      fontWeight: "bold",
      color: "black",
      fontFamily: "Roboto",
    },
    newCommentContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#ffffff",
      borderRadius: 8,
      paddingHorizontal: 20,
      paddingVertical: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
    },
    newCommentInput: {
      flex: 1,
      height: 40,
      fontSize: 16,
      color: "#333333",
      fontFamily: "Roboto",
    },
    newCommentButton: {
      marginLeft: 10,
      paddingVertical: 12,
      paddingHorizontal: 20,
      backgroundColor: '#2D3748',
      color:"white",
      borderRadius: 8,
    },
    newCommentButtonText: {
      color: "white",
      fontSize: 26,
      fontWeight: "bold",
      fontFamily: "Roboto",
    },
    userName: {        
      fontSize: 16,       
      fontWeight: 'bold',    
      marginBottom: 5     
    },  
  
    postedAt: {              
     fontSize: 14,            
     color: '#999999'       
    }
  });