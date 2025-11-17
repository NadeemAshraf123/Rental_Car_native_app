import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ChatScreen = () => {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.headerContainer}>
      <View style={styles.header}>
        <Image
          source={require('../assets/avatar/photo0.jpeg')}
          style={styles.profileImage}
        />
        <Text style={styles.headerText}>Chats</Text>
      </View>
      </View>

    
      <View style={styles.searchContainer}>
        <Icon name="search" size={16} color="#f57c00" style={styles.searchIcon} />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer:{
    backgroundColor: '#f9864a',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 0,
    position: 'relative',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,

  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  headerShape: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: '#333',
  },
  
});
