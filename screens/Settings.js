import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  StyleSheet,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { authentication, db } from "../firebase";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { gs, colors } from "../Styles";

const { width, height } = Dimensions.get("window");
const SettingsScreen = () => {
  const route = useRoute();
  const [data, setData] = useState(route.params.user);
  const [skillText, setSkillText] = useState("");
  const [aboutText, setAboutText] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [skills, setSkills] = useState(data.skills || []);
  const [showskils, setShowskils] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [currentps, setCurrentps] = useState("");
  const scrollViewRef = useRef(null);
  const [education, setEducation] = useState({
    school: "",
    fieldOfStudy: "",
    startYear: "",
    endYear: "",
  });
  const [experience, setExperience] = useState({
    company: "",
    title: "",
    startYear: "",
    endYear: "",
  });
  const [project, setProject] = useState({
    name: "",
    description: "",
    price: "",
    linkGit: "",
    firstname:data.firstname,
      lastname:data.lastname
  });

  useEffect(() => {
    setData(route.params?.user || {});
  }, [route.params?.user]);
  const addExperience = async () => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", data.email)
        .get();
      const userDoc = querySnapshot.docs[0];
      await userDoc.ref.update({
        experience: [...(data.experience || []), experience],
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      setExperience({
        company: "",
        title: "",
        startYear: "",
        endYear: "",
      });
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };
  const handleEducationChange = (key, value) => {
    setEducation({ ...education, [key]: value });
  };

  const addEducation = async () => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", data.email)
        .get();
      const userDoc = querySnapshot.docs[0];
      await userDoc.ref.update({
        education: [...(data.education || []), education],
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
    } catch (error) {
      console.error("Error adding education:", error);
    }
  };
  const handleAboutTextChange = (text) => setAboutText(text);

  const handleDeleteSkill = async (skill) => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", data.email)
        .get();
      const userDoc = querySnapshot.docs[0];
      const updatedSkills = skills.filter((s) => s !== skill);
      await userDoc.ref.update({
        skills: updatedSkills,
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      setSkills(updatedSkills);
      console.log("Skill deleted successfully");
    } catch (error) {
      console.error("Error deleting skill:", error);
    }
  };

  const updateAbout = async (email, newAbout) => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", email)
        .get();
      const userDoc = querySnapshot.docs[0];
      await userDoc.ref.update({
        about: newAbout,
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      console.log("User about updated successfully");
    } catch (error) {
      console.error("Error updating user about:", error);
    }
  };

  const handleUpdateAbout = () => {
    updateAbout(data.email, aboutText);
    setShowInput(false);
  };

  const handleAddSkill = async () => {
    const newSkill = skillText;

    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", data.email)
        .get();
      const userDoc = querySnapshot.docs[0];
      await userDoc.ref.update({
        skills: [...skills, newSkill],
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      setSkillText("");
      setSkills(updatedUserData.skills || []); // Update the skills array with the updated data
      setShowskils(false);
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  const handleChangePassword = () => {
    if (currentps == data.password) {
      authentication.currentUser
        .updatePassword(newPassword)
        .then(() => {
          console.log("Password changed successfully");
          setNewPassword("");
          // Scroll to the TextInput component
          scrollViewRef.current.scrollTo({ x: 0, y: height, animated: true });
        })
        .catch((error) => {
          console.error("Error changing password:", error);
        });
    } else {
      alert("Check your current password");
    }
  };
  const handleDeleteEducation = async (index) => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", data.email)
        .get();
      const userDoc = querySnapshot.docs[0];
      const updatedEducation = data.education.filter((edu, i) => i !== index);
      await userDoc.ref.update({
        education: updatedEducation,
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      console.log("Education deleted successfully");
    } catch (error) {
      console.error("Error deleting education:", error);
    }
  };

  const handleDeleteExperience = async (index) => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", data.email)
        .get();
      const userDoc = querySnapshot.docs[0];
      const updatedExperience = data.experience.filter((exp, i) => i !== index);
      await userDoc.ref.update({
        experience: updatedExperience,
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      console.log("Experience deleted successfully");
    } catch (error) {
      console.error("Error deleting experience:", error);
    }
  };
  const addProject = async () => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", data.email)
        .get();
      const userDoc = querySnapshot.docs[0];
      await userDoc.ref.update({
        projects: [...(data.projects || []), project],
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      setProject({
        name: "",
        description: "",
        price: "",
        linkGit: "",
      });
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleProjectChange = (key, value) => {
    setProject({ ...project, [key]: value });
  };
  const handleDeleteProject = async (index) => {
    try {
      const querySnapshot = await db
        .collection("data")
        .where("email", "==", data.email)
        .get();
      const userDoc = querySnapshot.docs[0];
      const updatedProjects = data.projects.filter((proj, i) => i !== index);
      await userDoc.ref.update({
        projects: updatedProjects,
      });
      const updatedUserData = (await userDoc.ref.get()).data();
      setData(updatedUserData);
      console.log("Project deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };
  return (
    <View style={[tw`flex-1 justify-center items-center`, styles.container]}>
      <ScrollView style={[tw`w-full px-4 mb-10`, { maxWidth: width * 0.9 }]}>
        <Text style={[tw`text-2xl font-bold mb-10`,gs.title,{left:45,marginTop:30}]}>Settings Screen</Text>
        <View style={tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>About <Ionicons name="newspaper-outline" size={20} color="grey" /></Text>
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 120 }]}
            multiline={true}
            numberOfLines={4}
            onChangeText={handleAboutTextChange}
            placeholder={data.about}
          />
          <Button
            title="Save"
            onPress={handleUpdateAbout}
            color="#2D3748"
            style={tw`w-full`}
          />
        </View>

        <View style={tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>Skills <Ionicons name="key-outline" size={20} color="grey" /></Text>
          {skills.map((skill, index) => (
            <View
              style={tw`flex-row items-center justify-between mb-4`}
              key={index}
            >
              <Text style={tw`text-lg`}>{skill}</Text>
              <Ionicons
                name="close"
                size={24}
                color="red"
                onPress={() => handleDeleteSkill(skill)}
              />
            </View>
          ))}
          <View style={tw`flex-row items-center justify-between`}>
            {!showskils && (
              <Button
                title="Add Skill"
                color={"#2D3748"}
                onPress={() => setShowskils(!showskils)}
              />
            )}
            {showskils && (
              <View style={tw`w-full flex-row`}>
                <TextInput
                  style={[
                    tw`bg-gray-100 px-4 py-2 rounded-md mb-4 w-3/4 mr-2`,
                    { height: 40 },
                  ]}
                  placeholder="Enter your skill"
                  onChangeText={(text) => setSkillText(text)}
                  value={skillText}
                />
                <Button
                  title="Save"
                  onPress={() => handleAddSkill()}
                  color="#2D3748"
                  style={tw`w-1/4`}
                />
              </View>
            )}
          </View>
        </View>

        <View style={tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>Change Password <Ionicons name="lock-closed-outline" size={20} color="grey" /></Text>

          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Enter current password"
            onChangeText={(text) => setCurrentps(text)}
            value={currentps}
            secureTextEntry={true}
          />

          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Enter new password"
            onChangeText={(text) => setNewPassword(text)}
            value={newPassword}
            secureTextEntry={true}
          />

          <Button
            title="Change Password"
            onPress={handleChangePassword}
            color="#2D3748"
            style={tw`w-full`}
          />
        </View>

        <View style={tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>Add Education <Ionicons name="document-attach-outline" size={20} color="grey" /></Text>
          {data.education &&
            data.education.map((edu, index) => (
              <View
                key={index}
                style={tw`flex-row items-center justify-between mb-4`}
              >
                <View>
                  <Text style={tw`text-lg font-bold`}>{edu.school}</Text>
                  <Text style={tw`text-sm`}>{edu.fieldOfStudy}</Text>
                  <Text style={tw`text-sm`}>
                    {edu.startYear} - {edu.endYear}
                  </Text>
                </View>
                <Ionicons
                  name="close"
                  size={24}
                  color="red"
                  onPress={() => handleDeleteEducation(index)}
                />
              </View>
            ))}
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="School/University"
            onChangeText={(text) => handleEducationChange("school", text)}
            value={education.school}
          />
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Field of Study"
            onChangeText={(text) => handleEducationChange("fieldOfStudy", text)}
            value={education.fieldOfStudy}
          />
          <View style={tw`flex-row justify-between`}>
            <TextInput
              style={[
                tw`bg-gray-100 px-4 py-2 rounded-md mb-4 w-1/3 mr-2`,
                { height: 40 },
              ]}
              placeholder="Start Year"
              onChangeText={(text) => handleEducationChange("startYear", text)}
              value={education.startYear}
            />
            <TextInput
              style={[
                tw`bg-gray-100 px-4 py-2 rounded-md mb-4 flex-1 ml-2`,
                { height: 40 },
              ]}
              placeholder="End Year"
              onChangeText={(text) => handleEducationChange("endYear", text)}
              value={education.endYear}
            />
          </View>
          <Button
            title="Save"
            onPress={addEducation}
            color="#2D3748"
            style={tw`w-full mt-4`}
          />
        </View>
        <View style={tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>Add Experience <Ionicons name="document-attach-outline" size={20} color="grey" /></Text>
          {data.experience &&
            data.experience.map((exp, index) => (
              <View
                key={index}
                style={tw`flex-row items-center justify-between mb-4`}
              >
                <View>
                  <Text style={tw`text-lg font-bold`}>{exp.title}</Text>
                  <Text style={tw`text-sm`}>{exp.company}</Text>
                  <Text style={tw`text-sm`}>
                    {exp.startYear} - {exp.endYear}
                  </Text>
                </View>
                <Ionicons
                  name="close"
                  size={24}
                  color="red"
                  onPress={() => handleDeleteExperience(index)}
                />
              </View>
            ))}
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Company Name"
            onChangeText={(text) =>
              setExperience({ ...experience, company: text })
            }
            value={experience.company}
          />
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Title"
            onChangeText={(text) =>
              setExperience({ ...experience, title: text })
            }
            value={experience.title}
          />
          <View style={tw`flex-row justify-between`}>
            <TextInput
              style={[
                tw`bg-gray-100 px-4 py-2 rounded-md mb-4 w-1/3 mr-2`,
                { height: 40 },
              ]}
              placeholder="Start Year"
              onChangeText={(text) =>
                setExperience({ ...experience, startYear: text })
              }
              value={experience.startYear}
            />
            <TextInput
              style={[
                tw`bg-gray-100 px-4 py-2 rounded-md mb-4 flex-1 ml-2`,
                { height: 40 },
              ]}
              placeholder="End Year"
              onChangeText={(text) =>
                setExperience({ ...experience, endYear: text })
              }
              value={experience.endYear}
            />
          </View>
          <Button
            title="Save"
            onPress={addExperience}
            color="#2D3748"
            style={tw`w-full mt-4`}
          />
        </View>
        <View style={tw`w-full mb-8 bg-white rounded-lg shadow-lg px-4 py-6`}>
          <Text style={tw`text-lg font-bold mb-4`}>Add Project <Ionicons name="document-attach-outline" size={20} color="grey" /></Text>
          {data.projects &&
            data.projects.map((proj, index) => (
              <View
                key={index}
                style={tw`flex-row items-center justify-between mb-4`}
              >
                <View>
                  <Text style={tw`text-lg font-bold`}>{proj.name}</Text>
                  <Text style={tw`text-sm`}>{proj.description}</Text>
                  <Text style={tw`text-sm`}>${proj.price}</Text>
                  <Text style={tw`text-sm`}># {proj.linkGit}#</Text>
                </View>
                <Ionicons
                  name="close"
                  size={24}
                  color="red"
                  onPress={() => handleDeleteProject(index)}
                />
              </View>
            ))}

          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Project Name"
            onChangeText={(text) => handleProjectChange("name", text)}
            value={project.name}
          />
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Description"
            onChangeText={(text) => handleProjectChange("description", text)}
            value={project.description}
          />
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="Price"
            onChangeText={(text) => handleProjectChange("price", text)}
            value={project.price}
          />
          <TextInput
            style={[tw`bg-gray-100 px-4 py-2 rounded-md mb-4`, { height: 40 }]}
            placeholder="link Github"
            onChangeText={(text) => handleProjectChange("linkGit", text)}
            value={project.linkGit}
          />
          <Button
            title="Save"
            onPress={addProject}
            color="#2D3748"
            style={tw`w-full mt-4`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkBg,
  },
  imageContainer: {
    ...gs.center,
    marginTop: 16,
    shadowColor: colors.darkBg,
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 0.5,
  },
  check: {
    ...gs.center,
    borderRadius: 100,
    width: 32,
    height: 32,
    shadowColor: colors.darkBg,
    shadowOffset: { height: 3, width: 1 },
    shadowOpacity: 0.3,
    position: "absolute",
    zIndex: 1,
  },
  follow: {
    ...gs.button,
    ...gs.rowCenter,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginTop: 16,
    borderColor: "rgba(255,255,255,0.5)",
    borderWidth: 2,
    top: -105,
    marginHorizontal: 130,
  },
  followText: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
    marginLeft: 4,
  },
  descContainer: {
    ...gs.sectionContainer,
    backgroundColor: colors.darkBg,
  },
  info: {
    color: colors.textSec,
    fontWeight: "600",
    marginTop: 4,
  },
  card: {
    backgroundColor: "#faebd7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 10,
    left: -100,
    marginHorizontal: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  eduCard: {
    backgroundColor: "#faebd7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 10,
    left: 100,
    marginHorizontal: 100,
    top: -325,
  },
  workCard: {
    backgroundColor: "#faebd7",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    padding: 20,
    margin: 10,
    left: 0,
    marginHorizontal: 100,
    top: -325,
  },
  projectsTitle: {
    left: 110,
    top: -300,
  },
  projectCard: {
    flex: 1,
    backgroundColor: "#faebd7",
    alignItems: "center",
    justifyContent: "center",
    height: 500,
    width: 350,
    borderRadius: 15,
    margin: 10,
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 2,
    shadowRadius: 12.35,

    elevation: 19,
  },
  projectsContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%",
    top: -270,
    marginBottom: 8,
    backgroundColor: colors.darkBg,
  },
  settingsContainer: {
    top: -180,
    left: 10,
  },
  logoutContainer: {
    top: -300,
    left: 255,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
    top: -20,
    position: "relative",
    height: 56,
  },
  projectDescription: {
    fontSize: 15,
    color: "white",
    top: -50,
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
});

export default SettingsScreen;
