import React, { useState } from 'react';
// The 'react-native' import is causing resolution errors in this environment.
// Forcing the component to compile by relying on the environment's implicit 
// availability of RN primitives (View, Text, etc.) and removing the explicit import.
const { View, Text, StyleSheet, SafeAreaView, FlatList, Image, TouchableOpacity, TextInput, Dimensions } = require('react-native');

// Get screen width for responsive sizing
// Since Dimensions.get() might not be available, we'll hardcode a reference width 
// or use a mock if 'react-native' cannot be imported. Assuming Dimensions is available
// after the require above. If not, fallback width is used.
let width;
try {
  width = Dimensions.get('window').width;
} catch (e) {
  width = 375; // Fallback width for styling calculations
}

// --- CONSTANTS & MOCK DATA ---

const COLORS = {
  primaryOrange: '#FF8A45', // Bright orange for the header
  searchGray: '#F3F4F6', // Light gray for the search bar background
  textDark: '#333',
  textGray: '#777',
  iconGreen: '#34D399', // Green/Teal for the checked state
  white: '#FFFFFF',
  purpleAd: '#8B5CF6', // Purple for the Ad background
};

const CHAT_DATA = [
  { id: '1', name: 'Ahmad', message: 'Ahmad: how much is it!', time: '9:40 AM', isAd: false, imageUrl: 'https://placehold.co/100x100/1E3A8A/FFFFFF?text=AH' },
  { id: '2', name: 'Amina', message: 'Amina: best offer', time: '9:25 AM', isAd: false, imageUrl: 'https://placehold.co/100x100/A0A0A0/FFFFFF?text=AM' },
  { id: '3', name: 'Amel', message: 'you : Ok, See you in To...', time: 'Fri', isAd: false, imageUrl: 'https://placehold.co/100x100/5B21B6/FFFFFF?text=AE' },
  { id: '4', name: 'Mohamed', message: 'Have a good day, Maisy!', time: 'Fri', isAd: false, imageUrl: 'https://placehold.co/100x100/059669/FFFFFF?text=MO' },
  { id: '5', name: 'Kacem', message: 'im waiting the car now', time: 'Thu', isAd: false, imageUrl: 'https://placehold.co/100x100/374151/FFFFFF?text=KA' },
  { id: '6', name: 'Pixsellz', message: 'Make design process easier...', time: 'Ad', isAd: true, imageUrl: 'https://placehold.co/100x100/000000/FFFFFF?text=P' },
  { id: '7', name: 'Ikram', message: 'The business plan loo...', time: 'Thu', isAd: false, imageUrl: 'https://placehold.co/100x100/991B1B/FFFFFF?text=IK' },
];

// --- COMPONENTS ---

// Helper component for the check/radio indicator
// isSelected determines if the tick is shown. isAd disables interactivity.
const StatusIndicator = ({ isSelected, isAd }) => {
  if (isAd) {
    // Render the Ad block (Purple/White gradient simulation)
    return (
      <View style={styles.adBlock}>
        <View style={styles.adBlockSegment} />
        <View style={[styles.adBlockSegment, { backgroundColor: COLORS.white, opacity: 0.8 }]} />
        <View style={[styles.adBlockSegment, { opacity: 0.6 }]} />
      </View>
    );
  }

  // Checkmark/Radio Button
  return (
    <View style={isSelected ? styles.checkedCircle : styles.uncheckedCircle}>
      {/* Show tick only if the message is selected */}
      {isSelected && <Text style={styles.checkIcon}>✓</Text>}
    </View>
  );
};

// Component for a single Chat or Ad item
const ChatListItem = ({ item, isSelected, onToggleSelect }) => {
  // If it's an Ad, it's not a standard chat item and should not be selectable.
  const isSelectable = !item.isAd;

  const handlePress = () => {
    // Only trigger selection if the item is not an ad
    if (isSelectable) {
      onToggleSelect(item.id);
    }
  };

  return (
    // Only chat items (not ads) are selectable/interactive for the radio button
    <TouchableOpacity 
      style={[styles.chatItem, item.isAd && styles.adItem]} 
      onPress={handlePress}
      activeOpacity={isSelectable ? 0.6 : 1} // Lower active opacity for selectable items
    >
      <Image
        source={{ uri: item.imageUrl }}
        style={item.isAd ? styles.adImage : styles.profileImage}
        onError={(e) => console.log('Image failed to load: ', e.nativeEvent.error)}
      />

      <View style={styles.chatDetails}>
        <View style={styles.nameRow}>
          <Text style={styles.chatName}>{item.name}</Text>
          {item.isAd && <Text style={styles.adTag}>Ad</Text>}
        </View>

        <View style={styles.messageRow}>
          {/* Message text */}
          <Text style={styles.lastMessage} numberOfLines={1}>
            {item.message}
          </Text>
          {/* Time/Day is placed right next to the message */}
          <Text style={styles.timestamp}>{item.time}</Text>
        </View>

        {item.isAd && (
          <Text style={styles.adLink}>
            View More
          </Text>
        )}
      </View>

      {/* Status Indicator (Radio/Tick/Ad Block) on the far right */}
      <StatusIndicator isSelected={isSelected} isAd={item.isAd} />
    </TouchableOpacity>
  );
};


// Component for the Search Bar
const SearchBar = () => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        {/* Replace with a proper Feather/Ionicons search icon */}
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

// Main Screen Component
const AgencyChatScreen = () => {
  // State to track selected chat item IDs
  const [selectedChats, setSelectedChats] = useState({});

  // Function to toggle selection state
  const toggleChatSelection = (id) => {
    setSelectedChats(prevSelected => ({
      ...prevSelected,
      [id]: !prevSelected[id] // Toggle the boolean state for the given ID
    }));
  };

  return (
    // SafeAreaView ensures content doesn't overlap the notch/status bar
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>

        {/* 1. Header Section (Curved Orange Background) */}
        <View style={styles.headerBackground} />
        <View style={styles.headerContent}>
          {/* Placeholder for the Agency Logo/Image */}
          <Image
            source={{ uri: 'https://placehold.co/40x40/FF8A45/FFFFFF?text=App' }}
            style={styles.headerImage}
            onError={(e) => console.log('Image failed to load: ', e.nativeEvent.error)}
          />
          <Text style={styles.headerTitle}>Chats</Text>
        </View>

        {/* 2. Search Bar (Positioned to overlap the header/list gap) */}
        <SearchBar />

        {/* 3. Chat List */}
        <FlatList
          data={CHAT_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ChatListItem
              item={item}
              isSelected={!!selectedChats[item.id]} // Pass current selection status
              onToggleSelect={toggleChatSelection} // Pass the toggle function
            />
          )}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </SafeAreaView>
  );
};

// --- STYLESHEET ---

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white, // Main background
  },
  // --- Header Styles ---
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150, // Height of the orange block
    backgroundColor: COLORS.primaryOrange,
    // Use a large border radius to simulate the soft curve seen in the UI
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    // Add an inner curve effect for a more organic shape (optional)
    transform: [{ scaleX: 1.2 }], // Stretch slightly to create a fuller curve
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60, // Padding to push content down from the curve
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: COLORS.white, // Placeholder image background
    borderWidth: 1,
    borderColor: COLORS.white,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.white,
  },
  // --- Search Bar Styles ---
  searchBarContainer: {
    paddingHorizontal: 20,
    // Position the search bar to sit below the header curve (visually below the orange title)
    marginTop: -25, // Move up to overlap the header curve visually
    zIndex: 10,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.searchGray,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    color: COLORS.textGray,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: COLORS.textDark,
    padding: 0, // Reset default RN padding
  },
  // --- List Styles ---
  listContainer: {
    paddingTop: 10, // Space below the search bar
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 10,
  },
  profileImage: {
    width: 55,
    height: 55,
    borderRadius: 30, // Make it circular
    marginRight: 15,
    backgroundColor: '#E0E0E0',
  },
  adImage: {
    width: 55,
    height: 55,
    borderRadius: 10, // Ad image is square/rounded in the UI
    marginRight: 15,
    backgroundColor: '#E0E0E0',
  },
  chatDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  chatName: {
    fontSize: 16,
    fontWeight: '600',
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
    width: '100%',
  },
  lastMessage: {
    fontSize: 14,
    color: COLORS.textGray,
    // Allow the message to take up space, pushing time to the right
    maxWidth: width * 0.55,
    flexShrink: 1, // Allows text to shrink if necessary
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textGray,
    marginLeft: 5, // Small gap between message and time
    // Ensure the timestamp stays on the right
    alignSelf: 'flex-end',
  },
  adLink: {
    fontSize: 12,
    color: '#0000EE', // Blue link color
    fontWeight: '500',
    marginTop: 2,
  },
  // --- Status Indicator Styles (Radio/Tick) ---
  checkedCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.iconGreen,
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
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#CCC',
    marginLeft: 10,
  },
  // --- Ad Block Styles ---
  adBlock: {
    width: 35,
    height: 45,
    borderRadius: 8,
    overflow: 'hidden',
    marginLeft: 15,
    backgroundColor: COLORS.purpleAd, // Base color
  },
  adBlockSegment: {
    flex: 1,
    backgroundColor: COLORS.purpleAd,
    opacity: 0.9,
    marginVertical: 1, // Space between segments to simulate the stripe effect
  },
});

export default AgencyChatScreen;