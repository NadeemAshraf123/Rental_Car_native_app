import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput, Dimensions } from 'react-native';

let width;
try {
  width = Dimensions.get('window').width;
} catch (e) {
  width = 375;
}

const COLORS = {
  primaryOrange: '#FF8A45',
  searchGray: '#F3F4F6',
  textDark: '#333',
  textGray: '#777',
  iconGreen: '#34D399',
  white: '#FFFFFF',
  purpleAd: '#8B5CF6',
};

const CHAT_DATA = [
  { id: '1', name: 'Ahmad', message: 'Ahmad: how much is it!', time: '9:40 AM', isAd: false, imageUrl: require('../../assets/avatar/avatar1.jpg') },
  { id: '2', name: 'Amina', message: 'Amina: best offer', time: '9:25 AM', isAd: false, imageUrl:  require('../../assets/avatar/avatar1.jpg') },
  { id: '3', name: 'Amel', message: 'you : Ok, See you in To...', time: 'Fri', isAd: false, imageUrl:  require('../../assets/avatar/avatar1.jpg') },
  { id: '4', name: 'Mohamed', message: 'Have a good day, Maisy!', time: 'Fri', isAd: false, imageUrl:  require('../../assets/avatar/avatar1.jpg') },
  { id: '5', name: 'Kacem', message: 'im waiting the car now', time: 'Thu', isAd: false, imageUrl:  require('../../assets/avatar/avatar1.jpg') },
  { id: '6', name: 'Pixsellz', message: 'Make design process easier...', time: 'Ad', isAd: true, imageUrl:  require('../../assets/avatar/avatar1.jpg') },
  { id: '7', name: 'Ikram', message: 'The business plan loo...', time: 'Thu', isAd: false, imageUrl:  require('../../assets/avatar/avatar1.jpg') },
];

const StatusIndicator = ({ isSelected, isAd }) => {
  if (isAd) {
    return (
      <View style={styles.adBlock}>
        <View style={styles.adBlockSegment} />
        <View style={[styles.adBlockSegment, { backgroundColor: COLORS.white, opacity: 0.8 }]} />
        <View style={[styles.adBlockSegment, { opacity: 0.6 }]} />
      </View>
    );
  }
  return (
    <View style={isSelected ? styles.checkedCircle : styles.uncheckedCircle}>
      {isSelected && <Text style={styles.checkIcon}>✓</Text>}
    </View>
  );
};

const ChatListItem = ({ item, isSelected, onToggleSelect }) => {
  const isSelectable = !item.isAd;
  const handlePress = () => {
    if (isSelectable) {
      onToggleSelect(item.id);
    }
  };

  return (
    
    <TouchableOpacity 
      style={[styles.chatItem, item.isAd && styles.adItem]} 
      onPress={handlePress}
      activeOpacity={isSelectable ? 0.6 : 1}
    >
      <Image
        source={item.imageUrl }
        style={item.isAd ? styles.adImage : styles.profileImage}
        onError={(e) => console.log('Image failed to load: ', e.nativeEvent.error)}
      />

      <View style={styles.chatDetails}>
        <View style={styles.nameRow}>
          <Text style={styles.chatName}>{item.name}</Text>
          {item.isAd && <Text style={styles.adTag}>Ad</Text>}
        </View>

        <View style={styles.messageRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.message}
          </Text>
          <Text style={styles.timestamp}>{item.time}</Text>
        </View>

        {item.isAd && (
          <Text style={styles.adLink}>
            View More
          </Text>
        )}
      </View>

      <StatusIndicator isSelected={isSelected} isAd={item.isAd} />
    </TouchableOpacity>
  );
};


const SearchBar = () => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor={COLORS.textGray}
        />
      </View>
    </View>
  );
};

const AgencyChatScreen = () => {

  const [selectedChats, setSelectedChats] = useState({});

  const toggleChatSelection = (id) => {
    setSelectedChats(prevSelected => ({
      ...prevSelected,
      [id]: !prevSelected[id] 
    }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        <View style={styles.headerBackground} />
        <View style={styles.headerContent}>
        
          <Image
            source={require("../../assets/agencyreistration/profile1.png")}
            style={styles.headerImage}
            onError={(e) => console.log('Image failed to load: ', e.nativeEvent.error)}
          />
          <Text style={styles.headerTitle}>Chats</Text>
        </View>

        <SearchBar />

        <FlatList
          data={CHAT_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              item={item}
              isSelected={!!selectedChats[item.id]}
              onToggleSelect={toggleChatSelection} 
            />
          )}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 80, 
    backgroundColor: COLORS.primaryOrange,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transform: [{ scaleX: 1.2 }],
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10, 
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 45,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: COLORS.white,
    borderWidth: 0,
    borderColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },
 
  searchBarContainer: {
    paddingHorizontal: 20,
    marginTop: 18,
    zIndex: 0,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.searchGray,
    borderRadius: 9,
    paddingVertical: 7,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
    color: COLORS.textGray,
    
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    padding: 0,
  },

  listContainer: {
    paddingTop: 18, 
    paddingHorizontal: 40,
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  separator: {
    height: 0,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 5,
    // backgroundColor: '#E0E0E0',
  },
  adImage: {
    width: 25,
    height: 25,
    borderRadius: 10, 
    marginRight: 15,
    backgroundColor: '#E0E0E0',
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.textDark,
  },
  adTag: {
    fontSize: 10,
    color: COLORS.textGray,
    backgroundColor: COLORS.searchGray,
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  lastMessage: {
    fontSize: 14,
    color: COLORS.textGray,
    maxWidth: width * 0.55,
    flexShrink: 1,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textGray,
    marginLeft: 5,
    alignSelf: 'flex-end',
  },
  adLink: {
    fontSize: 13,
    color: '#0000EE',
    fontWeight: '900',
    marginTop: 2,
  },
  checkedCircle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: "#eee9e9ff",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  checkIcon: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  uncheckedCircle: {
    width: 16,
    height: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CCC',
    marginLeft: 10,
  },
  
  adBlock: {
    width: 40,
    height: 35,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 15,
    backgroundColor: COLORS.purpleAd,
  },
  adBlockSegment: {
    flex: 1,
    backgroundColor: COLORS.purpleAd,
    opacity: 0.1,
    marginVertical: 1,
  },
});

export default AgencyChatScreen;