import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const { height, width } = Dimensions.get('window');


const RatingScreen = () => {
  // State to track the rating (0 to 5)
  const [rating, setRating] = useState(4);
  const [comments, setComments] = useState('');

  // Dummy user data
  const user = {
    image: 'https://via.placeholder.com/150/FF8C00/FFFFFF?text=R', // Placeholder for user image
  };

  // Helper function to render a star icon based on the current rating
  const renderStar = (index) => {
    const starFilled = index <= rating;
    return (
      <TouchableOpacity key={index} onPress={() => setRating(index)}>
        <Icon
          name={starFilled ? 'star' : 'star-outline'}
          size={40}
          color={starFilled ? '#FFC72C' : '#ccc'}
          style={styles.starIcon}
        />
      </TouchableOpacity>
    );
  };

  const handleSubmit = () => {
    console.log(`Rating: ${rating} stars, Comments: ${comments}`);
    // Add logic here to submit the review to your backend
  };

  return (
    <View style={styles.container}>
      
      {/* --- 1. Background Shapes (Absolute Positioning) --- */}
      <View style={styles.background}>
        {/* Large transparent/light orange shape 1 (top/middle) */}
        <View style={styles.largeShape} /> 
        {/* Smaller transparent/light orange shape 2 (top right) */}
        <View style={styles.smallShape} /> 
      </View>

      {/* --- 2. Header (On top of background) --- */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => console.log('Go back')}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rating</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* --- 3. User Image (Absolute Positioned relative to the main card) --- */}
          <Image
            source={{ uri: user.image }}
            style={styles.userImage}
          />
          
          {/* --- 4. Main Content Card --- */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>How is your experience ?</Text>
            <Text style={styles.cardSubtitle}>
              Your feedback will help improve driving experience
            </Text>

            {/* Star Rating Section */}
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(renderStar)}
            </View>

            {/* Additional Comments Input */}
            <TextInput
              style={styles.commentInput}
              multiline
              placeholder="Additional comments..."
              placeholderTextColor="#999"
              onChangeText={setComments}
              value={comments}
            />

            {/* Submit Button */}
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
      </ScrollView>
    </View>
  );
};

export default RatingScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background color of the whole screen
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: height * 0.2, // Pushes content down, below the absolute header/image start point
    paddingBottom: 40,
  },

  // --- Background Shapes (Absolute) ---
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: height * 0.4, // Height of the colored background area
    overflow: 'hidden',
  },
  // Simulates the large, transparent shape
  largeShape: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: width * 1.5,
    height: height * 0.7,
    borderRadius: (height * 0.7) / 2,
    backgroundColor: 'rgba(255, 140, 0, 0.1)', // Light orange/peach
  },
  // Simulates the smaller, more opaque shape overlaying the large one
  smallShape: {
    position: 'absolute',
    top: 50,
    right: 50,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: 'rgba(255, 140, 0, 0.2)', // Slightly more opaque
  },


  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50, // Adjust for status bar
    position: 'absolute', // Keep header on top of everything
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'flex-start',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginLeft: 20,
  },

  // --- User Image & Main Card ---
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
    zIndex: 5, // Ensures image is above the card
    marginBottom: -50, // Pulls the image up to overlap the card top
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingTop: 70, // Create space for the image to overlap
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    paddingHorizontal: 15,
  },

  // --- Rating Styles ---
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
  },
  starIcon: {
    marginHorizontal: 4,
  },

  // --- Input and Button ---
  commentInput: {
    width: '100%',
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#eee',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#f87232', // Primary Orange color
    borderRadius: 15,
    paddingVertical: 18,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
