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


const RatingScreen = ( {navigation} ) => {

  const [rating, setRating] = useState(4);
  const [comments, setComments] = useState('');

  const user = {
    image: 'https://via.placeholder.com/150/FF8C00/FFFFFF?text=R',
  };


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
    navigation.navigate('InviteFriendsScreen');

  };

  return (
    <View style={styles.container}>
      
      
      <View style={styles.background}>

    <Image 
          source={require('../../assets/avatar/avatar1.jpg')}
          style={styles.backgroundImage1}
          resizeMode="cover"
        />

        <Image 
          source={require('../../assets/avatar/avatar1.jpg')}
          style={styles.backgroundImage2}
          resizeMode="contain" 
        />
        

      </View>

    
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerArrow}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rating</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
            <Text style={styles.cardTitle}>How is your experience ?</Text>
            <Text style={styles.cardSubtitle}>
              Your feedback will help improve driving experience
            </Text>

        
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map(renderStar)}
            </View>

            
            <TextInput
              style={styles.commentInput}
              multiline
              placeholder="Additional comments..."
              placeholderTextColor="#999"
              onChangeText={setComments}
              value={comments}
            />

            
            <TouchableOpacity 
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>

    
          <Image
            source = {require('../../assets/avatar/ratingprofile.png')}
            style={styles.userImage}
          />
          
      </ScrollView>
    </View>
  );
};

export default RatingScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', 
  },
  scrollContent: {
    alignItems: 'center',
    paddingTop: height * 0.2,
    paddingBottom: 40,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // height: height * 0.4,
    overflow: 'hidden',
  },
  backgroundImage1: {
    
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.5,
    top: -height * 0.1,
    left: -width * 0.5,
    opacity: 0.3, 
    transform: [{ rotate: '45deg' }],
  },

  backgroundImage2: {
    
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
    top: 50, 
    right: -50, 
    opacity: 0.5, 
    
  },
  largeShape: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: width * 1.5,
    height: height * 0.7,
    borderRadius: (height * 0.7) / 2,
    backgroundColor: 'rgba(255, 140, 0, 0.1)',
  },
  
  smallShape: {
    position: 'absolute',
    top: 50,
    right: 50,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: (width * 0.8) / 2,
    backgroundColor: 'rgba(255, 140, 0, 0.2)', 
  },


  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50, 
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    // marginLeft: 20,
  },

  headerArrow: {
  position: 'absolute',
  left: 20,
  top: 50,
  padding: 5,
},

  
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#1e1c1cff',
    zIndex: 10,

    marginTop: -420, 
  },
  card: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 1,
    zIndex: 0,
    marginTop: 90,
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
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    justifyContent: 'center',
  },
  starIcon: {
    marginHorizontal: 4,
  },

  commentInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#f5f5f5',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    marginBottom: 50,
    borderWidth: 1,
    borderColor: '#eee',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#f87232', 
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
});
