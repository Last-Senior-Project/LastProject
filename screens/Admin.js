import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { authentication, db } from '../firebase';
import tw from 'tailwind-react-native-classnames';
import { useTheme } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const DashboardScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = authentication.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await authentication.signOut();
      navigation.navigate('Homewel');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[tw`bg-gray-100 p-5`, {backgroundColor: colors.background}]}>
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={[tw`text-lg font-bold text-blue-500`, {color: colors.text}]}>
          Welcome to the Admin Dashboard!
        </Text>
        {currentUser && (
          <View style={tw`mt-4`}>
            <Text style={[tw`text-gray-500`, {color: colors.text}]}>{currentUser.email}</Text>
          </View>
        )}
        <TouchableOpacity onPress={handleLogout} style={tw`mt-4 flex-row items-center`}>
          <MaterialCommunityIcons name="logout" size={24} color={colors.primary} style={tw`mr-2`} />
          <Text style={[tw`text-blue-500`, {color: colors.primary}]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const SettingsScreen = () => {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Text style={tw`text-lg font-bold text-blue-500`}>Settings Screen</Text>
    </View>
  );
};

const UsersScreen = () => {
  const { colors } = useTheme();
  const [users, setUsers] = useState([]);
  const [not, setNot] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection('data').onSnapshot((snapshot) => {
      const usersList = [];
      snapshot.forEach((doc) => {
        const user = doc.data();
        usersList.push({ ...user, id: doc.id });
      });
      setUsers(usersList);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection('posts').onSnapshot((snapshot) => {
      const notList = [];
      snapshot.forEach((doc) => {
        const notification = doc.data();
        notList.push({ ...notification, id: doc.id });
      });
      setNot(notList);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteUser = async (id, email, password) => {
    try {
      // Delete user from Firestore
      await db.collection('data').doc(id).delete();
      console.log('User deleted from Firestore successfully');

      // Delete user from Authentication
      const userCredential = await authentication.signInWithEmailAndPassword(
        email,
        password
      );
      const user = userCredential.user;
      await user.delete();
      console.log('User deleted from Authentication successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={[tw`bg-gray-100 p-5`, {backgroundColor: colors.background}]}>
      <View style={tw`flex-1 items-center justify-center`}>
        <Text style={[tw`text-2xl font-bold mb-6`, {color: colors.text}]}>All Users</Text>
        {users.map((user) => (
          <View
            key={user.id}
            style={tw`w-full rounded-lg bg-white border border-gray-300 p-4 mb-4 flex-row items-center justify-between`}
          >
            <View style={tw`flex-1`}>
              <Text style={[tw`text-lg font-bold`, {color: colors.text}]}>
                {user.firstname} {user.lastname}
              </Text>
              <Text style={[tw`text-gray-500`, {color: colors.text}]}>{user.email}</Text>
              <Text style={[tw`text-gray-500`, {color: colors.text}]}>
                Created At: {user.createdAt.toDate().toDateString()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => handleDeleteUser(user.id, user.email, user.password)}
              style={tw`ml-4`}
            >
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        ))}
        <Text style={[tw`text-2xl font-bold mb-6`, {color: colors.text}]}>All Posts</Text>
        {not.map((not) => (
          <View
            key={not.id}
            style={tw`w-full rounded-lg bg-white border border-gray-300 p-4 mb-4 flex-row items-center justify-between`}
          >
            <View style={tw`flex-1`}>
              <Text style={[tw`text-lg font-bold`, {color: colors.text}]}>{not.text} </Text>
              <Text style={[tw`text-lg font-bold`, {color: colors.text}]}>{not.userName} </Text>
            </View>
            <TouchableOpacity style={tw`ml-4`}>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color={colors.primary}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const AdminDashboard = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'view-dashboard' : 'view-dashboard-outline';
          } else if (route.name === 'Settings') {
            iconName =   'cog' 
          } else if (route.name === 'Users') {
            iconName = focused ? 'account-group' : 'account-group-outline';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#1E90FF',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Users" component={UsersScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default AdminDashboard;