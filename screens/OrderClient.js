// import React, { useState } from 'react';
// import { StyleSheet, View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
// import tw from 'tailwind-react-native-classnames';
// import { useRoute } from '@react-navigation/native';
// import { db } from '../firebase';

// const MyFormScreen = () => {
//   const [title, setTitle] = useState('');
//   const [description, setDescription] = useState('');
//   const route = useRoute();
//   const [data, setData] = useState(route.params.user);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [orders, setOrders] = useState([]);

//   const handleTitleChange = (text) => {
//     setTitle(text);
//   };

//   const handleDescriptionChange = (text) => {
//     setDescription(text);
//   };

//   const handleSubmit = () => {
//     db.collection("order").add({
//       title: title,
//       description: description,
//       clientId: data.id,
//     })
//       .then(() => {
//         console.log("Order created successfully!");
//         setTitle("");
//         setDescription("");
//       })
//       .catch((error) => {
//         console.error("Error creating order: ", error);
//       });
//   };

//   const handleSeeAll = () => {
//     db.collection("order").where("clientId", "==", data.id)
//       .onSnapshot((querySnapshot) => {
//         console.log("Orders matching clientId:", data.id);
//         const orders = [];
//         querySnapshot.forEach((doc) => {
//           orders.push(doc.data());
//         });
//         setOrders(orders);
//         handleOpenModal();
//       }, (error) => {
//         console.error("Error fetching orders:", error);
//       });
//   };

//   const handleOpenModal = () => {
//     setModalVisible(true);
//   };

//   return (
//     <View style={tw`flex-1 bg-white p-6`}>
//       <Text style={tw`text-lg font-bold mb-4`}>Title:</Text>
//       <TextInput
//         style={tw`border border-gray-400 rounded-lg px-4 py-2 mb-4`}
//         onChangeText={handleTitleChange}
//         value={title}
//       />
//       <Text style={tw`text-lg font-bold mb-4`}>Description:</Text>
//       <TextInput
//         style={tw`border border-gray-400 rounded-lg px-4 py-2 mb-4 h-28`}
//         onChangeText={handleDescriptionChange}
//         value={description}
//         multiline={true}
//         numberOfLines={4}
//       />
//       <TouchableOpacity
//         style={tw`bg-blue-500 rounded-lg px-4 py-2`}
//         onPress={handleSubmit}
//       >
//         <Text style={tw`text-white font-bold text-lg text-center`}>Submit</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={tw`bg-gray-500 rounded-lg px-4 py-2 mt-4`}
//         onPress={handleSeeAll}
//       >
//         <Text style={tw`text-white font-bold text-lg text-center`}>See All</Text>
//       </TouchableOpacity>
//       <Modal
//         animationType="slide"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(false);
//         }}
//       >
//         <View style={tw`flex-1 justify-center items-center bg-gray-800 bg-opacity-50`}>
//           <View style={tw`bg-white rounded-lg p-4 w-11/12 max-h-80 overflow-auto`}>
//             <Text style={tw`text-lg font-bold mb-4`}>My Orders</Text>
//             {orders.map((order, index) => (
//               <View key={index} style={tw`mb-4`}>
//                 <Text style={tw`text-lg font-bold`}>{order.title}</Text>
//                 <Text style={tw`text-gray-500 mb-2`}>{order.description}</Text>
//                 <Text style={tw`text-gray-500`}>Order ID: {order.clientId}</Text>
//               </View>
//             ))}
//             <TouchableOpacity
//               style={tw`bg-blue-500 rounded-lg px-4 py-2`}
//               onPress={() => {
//                 setModalVisible(false);
//               }}
//             >
//               <Text style={tw`text-white font-bold text-lg text-center`}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default MyFormScreen;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Modal,
  Alert,
  Image,
} from "react-native";
import { db, firebase,authentication } from "../firebase";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useRoute } from "@react-navigation/native";

const OrdersScreen = () => {
    const route =useRoute()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [pay, setPay] = useState("");
  const [createJobExpanded, setCreateJobExpanded] = useState(false);
  const [jobsExpanded, setJobsExpanded] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filterType, setFilterType] = useState("");
  const [data,setData]=useState(route.params.user)
  const currenUser = firebase.auth().currentUser.uid
  

  const handleFilterPress = (type) => {
    setFilterType(type);
    handleFilter(type);
  };

  const handleSubmit = () => {
        db.collection("order").add({
          title: title,
          description: description,
          clientId: currenUser,
          skills:skills,
          pay:pay,
          country:country,
          city:city
        })
          .then(() => {
            console.log("Order created successfully!");
            setTitle("");
            setDescription("");
          })
          .catch((error) => {
            console.error("Error creating order: ", error);
          });
      };
    useEffect(()=>{
        const handleSeeAll = () => {
            db.collection("order").where("clientId", "==", currenUser)
              .onSnapshot((querySnapshot) => {
                console.log("Orders matching clientId:", currenUser);
                const orders = [];
                querySnapshot.forEach((doc) => {
                  orders.push(doc.data());
                });
                setJobs(orders);
                
              }, (error) => {
                console.error("Error fetching orders:", error);
              });
          };
          
          handleSeeAll()
    },[])
      
  const handleCreatePress = () => {
    setCreateJobExpanded(!createJobExpanded);
  };

  const handleJobs = () => {
    setJobsExpanded(!jobsExpanded);
  };

  const handleFilter = (type) => {
    if (type === "latest") {
      setJobs((prevJobs) => [...prevJobs].sort((a, b) => b.date - a.date));
    } else if (type === "earliest") {
      setJobs((prevJobs) => [...prevJobs].sort((a, b) => a.date - b.date));
    }
  };

  const [sortType, setSortType] = useState("ascending");

  const handleSort = () => {
    if (sortType === "ascending") {
      setSortType("descending");
      setJobs((prevJobs) =>
        [...prevJobs].sort((a, b) => b.title.localeCompare(a.title))
      );
    } else {
      setSortType("ascending");
      setJobs((prevJobs) =>
        [...prevJobs].sort((a, b) => a.title.localeCompare(b.title))
      );
    }
  };

  const [sortOrder, setSortOrder] = useState("ascending");

  const handleSortOrder = () => {
    if (sortOrder === "ascending") {
      setSortOrder("descending");
      setJobs((prevJobs) =>
        [...prevJobs].sort((a, b) => parseInt(b.pay) - parseInt(a.pay))
      );
    } else {
      setSortOrder("ascending");
      setJobs((prevJobs) =>
        [...prevJobs].sort((a, b) => parseInt(a.pay) - parseInt(b.pay))
      );
    }
  };

  const [locationFilter, setLocationFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [sortLocationOrder, setSortLocationOrder] = useState("ascending");

  const countries = [...new Set(jobs.map((job) => job.country))];

  const handleLocationSort = () => {
    if (sortLocationOrder === "ascending") {
      setSortLocationOrder("descending");
      setJobs((prevJobs) =>
        [...prevJobs].sort((a, b) => b.location.localeCompare(a.location))
      );
    } else {
      setSortLocationOrder("ascending");
      setJobs((prevJobs) =>
        [...prevJobs].sort((a, b) => a.location.localeCompare(b.location))
      );
    }
  };


  const handleCountryFilter = (country) => {
    setCountryFilter(country);
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);

  const handleDeleteJob = () => {
    setModalVisible(false);
    setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobToDelete.id));
    setJobToDelete(null);
  };

  const handleCancelDelete = () => {
    setModalVisible(false);
    setJobToDelete(null);
  };

  const handleShowDeleteWarning = (job) => {
    setJobToDelete(job);
    setModalVisible(true);
  };

  {
    /* This is a comment */
  }

  {
    /* POST RENDERING */
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity style={jobsStyles.item}>
      <View style={styles.userContainer}>
        <View style={styles.userRatingContainer}>
        </View>
      </View>
      <View style={jobsStyles.titleContainer}>
        <Text style={jobsStyles.title}>{item.title}</Text>
        <Text style={jobsStyles.pay}>${item.pay}/year</Text>
      </View>
      <Text style={jobsStyles.description}>{item.description}</Text>
      <View style={jobsStyles.infoContainer}>
        <Text style={jobsStyles.info}>{item.skills}</Text>
      </View>
      <View style={jobsStyles.infoContainer}>
        <Text style={jobsStyles.info}>
          {item.location}, {item.country}
        </Text>
      </View>
      <View style={jobsStyles.infoContainer}>
      </View>
      <TouchableOpacity onPress={() => handleShowDeleteWarning(item)}>
        <Ionicons
          name="ios-trash-outline"
          size={28}
          color="#007bff"
          style={{ left: 250 }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  {
    /* COUNTRY INPUT PICKERS ON CREATE A JOB OFFER DO NOT CHANGE */
  }
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");

  const nations = [
    {
      label: "United States",
      value: "usa",
      cities: ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"],
    },
    {
      label: "Canada",
      value: "canada",
      cities: ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton"],
    },
    {
      label: "Tunisia",
      value: "tunisia",
      cities: [
        "Tunis",
        "Sfax",
        "Sousse",
        "Kairouan",
        "Bizerte",
        "Gabès",
        "Aryanah",
        "Hammamet",
        "Kasserine",
        "Gafsa",
        "La Goulette",
        "Zarzis",
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={handleCreatePress}>
        <Text style={styles.title}>
          Create a Job Offer{" "}
          <Ionicons name="md-create" size={20} color="blue" />
        </Text>
      </TouchableOpacity>
      {createJobExpanded && (
        <ScrollView style={styles.container}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Job Title</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter job title"
              onChangeText={(text) => setTitle(text)}
              value={title}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Job Description</Text>
            <TextInput
              style={[styles.input, styles.multiline]}
              placeholder="Enter job description"
              onChangeText={(text) => setDescription(text)}
              value={description}
              multiline
              numberOfLines={4}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Skills Required</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter required skills"
              onChangeText={(text) => setSkills(text)}
              value={skills}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter job location"
              onChangeText={(text) => setLocation(text)}
              value={location}
            />
            <View style={locationFilterStyles.container}>
              <Picker
                selectedValue={country}
                onValueChange={(value) => setCountry(value)}
              >
                <Picker.Item label="Select a country" value="" />
                {nations.map((country) => (
                  <Picker.Item
                    key={country.value}
                    label={country.label}
                    value={country.value}
                  />
                ))}
              </Picker>
              {country && (
                <Picker
                  selectedValue={city}
                  onValueChange={(value) => setCity(value)}
                >
                  <Picker.Item label="Select a city" value="" />
                  {nations
                    .find((c) => c.value === country)
                    .cities.map((city) => (
                      <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pay</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter pay amount"
              onChangeText={(text) => setPay(text)}
              value={pay}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      {/* This is a comment */}

      {/* MY OFFER OPACITY*/}
      <TouchableOpacity style={jobsStyles.touchable} onPress={handleJobs}>
        <Text style={jobsStyles.title}>
          My Offers <Ionicons name="eye" size={20} color="blue" />
        </Text>
      </TouchableOpacity>

      {!jobsExpanded && (
        <ScrollView style={jobsStyles.container}>

          <View style={ascdescStyles.container}>
            <View style={ascdescStyles.filterContainer}>
              <TouchableOpacity
                style={ascdescStyles.arrowButton}
                onPress={handleSort}
              >
                <Text style={ascdescStyles.filterLabel}>
                  Sort by title: A-Z
                </Text>
                <Ionicons
                  name={
                    sortType === "ascending" ? "ios-arrow-up" : "ios-arrow-down"
                  }
                  size={24}
                  color="#007bff"
                />
              </TouchableOpacity>
            </View>
          </View>

    

          <View style={locationFilterStyles.container}>
            <View style={locationFilterStyles.filterContainer}>
              <TouchableOpacity
                style={locationFilterStyles.arrowButton}
                onPress={handleLocationSort}
              >
                <Text style={locationFilterStyles.filterLabel}>
                  Sort by country
                </Text>
                <Ionicons
                  name={
                    sortLocationOrder === "ascending"
                      ? "ios-arrow-up"
                      : "ios-arrow-down"
                  }
                  size={24}
                  color="#007bff"
                />
              </TouchableOpacity>

              <View style={locationFilterStyles.pickerContainer}>
                <Picker
                  selectedValue={countryFilter}
                  onValueChange={handleCountryFilter}
                  style={locationFilterStyles.picker}
                >
                  <Picker.Item label="All" value="All" />
                  {countries.map((country, index) => (
                    <Picker.Item key={index} label={country} value={country} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>

          <FlatList
            data={jobs.filter(
              (job) =>
                (locationFilter === "All" || job.location === locationFilter) &&
                (countryFilter === "All" || job.country === countryFilter)
            )}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={jobsStyles.list}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
              setJobToDelete(null);
            }}
          >
            <View style={deletionStyles.modalBackground}>
              <View style={deletionStyles.modalContainer}>
                <Text style={deletionStyles.modalTitle}>Delete job offer?</Text>
                <Text style={deletionStyles.modalText}>
                  Are you sure you want to delete this job offer?
                </Text>
                <View style={deletionStyles.modalButtonContainer}>
                  <TouchableOpacity
                    style={deletionStyles.modalButton}
                    onPress={handleDeleteJob}
                  >
                    <Text style={deletionStyles.modalButtonText}>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={deletionStyles.modalButton}
                    onPress={handleCancelDelete}
                  >
                    <Text style={deletionStyles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      )}
      {/* This is a comment */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  touchable: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    color: "#007aff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  inputContainer: {
    backgroundColor: "#ccc",
    borderRadius: 8,
    padding: 3,
    marginBottom: 10,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    color: "#333",
  },
  multiline: {
    height: 100,
  },
  button: {
    backgroundColor: "#2D3748",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  userPicture: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    color: "#666",
  },
  userRatingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userRatingIcon: {
    marginRight: 2,
  },
});

const jobsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  touchable: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 200,
  },
  list: {
    padding: 1,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    color: "#007aff",
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
  pay: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
});

const filteringStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 20,
  },
  button: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    height: 40,
  },
  buttonText: {
    color: "#007bff",
    fontSize: 16,
    fontWeight: "bold",
    top: 2,
  },
  activeButton: {
    backgroundColor: "#2D3748",
  },
  activeButtonText: {
    color: "white",
  },
});

const ascdescStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  arrowButton: {
    marginRight: 10,
  },
  filterLabel: {
    fontSize: 16,
    color: "#666",
  },
});

const payStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  arrowButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 16,
    color: "#666",
    marginRight: 5,
  },
});

const locationFilterStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    marginBottom: 20,
  },
  list: {
    padding: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  arrowButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 16,
    color: "#666",
    marginRight: 5,
  },
  pickerContainer: {
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    width: 150,
    height: 40,
  },
});

const deletionStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  list: {
    padding: 20,
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  info: {
    fontSize: 14,
    color: "#666",
    marginRight: 10,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  arrowButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 16,
    color: "#666",
    marginRight: 5,
  },
  pickerContainer: {
    marginLeft: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    width: 150,
    height: 40,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  modalText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: "100%",
  },
  modalButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
export default OrdersScreen;
