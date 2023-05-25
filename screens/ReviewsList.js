import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { db } from '../firebase';

const ReviewsList = ({ projectName, userId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log('fetching reviews for project', projectName);
    const unsubscribe = db
    .collection('data')
    .where('id', '==', userId)
    .onSnapshot((snapshot) => {
      console.log('reviews snapshot', snapshot);
      const userData = snapshot.docs[0]?.data();
      const project = userData?.projects?.find((p) => p.name.trim() === projectName.trim());
      console.log('project', project);
      setReviews(project?.reviews ?? []);
    });

    return () => unsubscribe();
  }, [projectName]);

  console.log('reviews', reviews);

  if (reviews.length === 0) {
    return <Text style={styles.noReviewsText}>No reviews yet.</Text>;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => {
        console.log('review item', item);
        return (
          <View style={styles.reviewContainer}>
            <Text style={styles.reviewText}>{item.review}</Text>
            <Text style={styles.reviewRating}>Rating: {item.rating}</Text>
          </View>
        );
      }}
      keyExtractor={(item, index) => index.toString()}
      style={styles.listView}
    />
  );
};

const styles = StyleSheet.create({
  noReviewsText: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
  reviewContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 16,
    lineHeight: 24,
  },
  reviewRating: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
  listView: {
    marginTop: 10,
    //maxHeight: 200, // remove this property to see if it's causing the issue
  },
});

export default ReviewsList;