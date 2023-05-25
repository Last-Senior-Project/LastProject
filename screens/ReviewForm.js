import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { firebase, db } from '../firebase'
import StarRating from 'react-native-star-rating';

const ReviewForm = ({ projectName, userId }) => {
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
 
  const handleSubmit = async () => {
    try {
      if (!review || !rating) {
        throw new Error('Review and rating are required');
      }
      if (!userId) {
        throw new Error('User ID is required');
      }
       console.log(userId,'hereeeeeeeeeeeeeee')
      const userRef = db.collection('data');
      const querySnapshot = await userRef.where('id', '==', userId).get();
      const userDoc = querySnapshot.docs[0];
  
      if (!userDoc) {
        throw new Error(`User ${userId} not found`);
      }
  
      const userData = userDoc.data();
      const projects = userData.projects || [];
  
      console.log('projects:', projects);
  
      if (!Array.isArray(projects)) {
        throw new Error(`Projects is not an array: ${typeof projects}`);
      }
  
      const projectIndex = projects.findIndex(p => p.name.trim() === projectName.trim());
  
      if (projectIndex === -1) {
        throw new Error(`Project ${projectName} not found`);
      }
         // Check if the "reviews" field exists in the project object and initialize it with an empty array if it doesn't
    if (!projects[projectIndex].reviews) {
        projects[projectIndex].reviews = [];
      }
  
      // Update the "reviews" field of the project object
      projects[projectIndex].reviews = [...projects[projectIndex].reviews, { review, rating }];
  
      await userDoc.ref.update({ projects });
  
      setReview('');
      setRating(0);
  
      console.log(`Successfully added review to project ${projectName}`);
    } catch (error) {
      console.error(`Error adding review to project ${projectName}: ${error.message}`);
    }
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Write a review"
        value={review}
        onChangeText={setReview}
        multiline={true}
        numberOfLines={4}
      />
      <StarRating
        disabled={false}
        maxStars={5}
        rating={rating}
        selectedStar={(rating) => setRating(rating)}
        starSize={30}
        fullStarColor={'#f1c40f'}
        emptyStarColor={'#ccc'}
        containerStyle={{ marginTop: 10, marginBottom: 20 }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ReviewForm;