import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  SafeAreaView 
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

export default function AgencyNotificationScreen() {
  
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
            source={require('../assets/agencyreistration/profile1.png')} 
            style={styles.stackImage} 
            resizeMode="contain"
          />
          
          <Text style={styles.title}>notification</Text>
        </View>
      </View>
      <View style={styles.bottomView} />

      <View style={styles.contentArea}>
        
        <View style={styles.addPubContainer}>
          <TextInput
            style={styles.addPubInput}
            placeholder="Add Another Pub"
            placeholderTextColor="#999"
            editable={false}
          />
          <TouchableOpacity style={styles.plusButton}>
            <Feather name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}


const ORANGE = '#F9864A';
const LIGHT_GRAY = 'white';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LIGHT_GRAY,
  },
  
  header: {
    backgroundColor: '#F9864A',
    overflow: 'hidden',
    paddingTop: 15,
    paddingBottom: 20, 
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  stackImage: {
    width: 45,
    height: 45,
    borderRadius: 8,
    backgroundColor: ORANGE, 
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',

    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bottomView: {
    backgroundColor: '#feece2',
    height: 35,
  },
  
  contentArea: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 30, 
  },
  
  addPubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 100,
    borderColor: 'black', 
    borderWidth: 0.3,
    shadowColor: '#5d5c5cff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  addPubInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  plusButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ORANGE, // Orange color for the plus button
    justifyContent: 'center',
    alignItems: 'center',
  },
});