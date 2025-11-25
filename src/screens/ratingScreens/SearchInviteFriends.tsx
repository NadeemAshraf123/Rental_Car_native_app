import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const MOCK_FRIENDS = [
  {
    id: '1',
    name: 'Amel Fettah',
    avatar: require('../../assets/avatar/avatar1.jpg'),
    invited: true,
  },
  {
    id: '2',
    name: 'Ikram Rehala',
    avatar: require('../../assets/avatar/avatar2.jpg'),
    invited: false,
  },
  {
    id: '3',
    name: 'Riham Bakir',
    avatar: require('../../assets/avatar/flower.jpeg'),
    invited: true,
  },
  {
    id: '4',
    name: 'Samah Bensalah',
    avatar: require('../../assets/avatar/photo0.jpeg'),
    invited: true,
  },
  {
    id: '5',
    name: 'Aya Boukharouba',
    avatar: require('../../assets/avatar/ratingprofile.png'),
    invited: false,
  },
  {
    id: '6',
    name: 'Maissara Ammi',
    avatar: require('../../assets/avatar/avatar1.jpg'),
    invited: false,
  },
  {
    id: '7',
    name: 'Benriba',
    avatar: require('../../assets/avatar/avatar2.jpg'),
    invited: false,
  },
  {
    id: '8',
    name: 'Mohamed Fettah',
    avatar: require('../../assets/avatar/flower.jpeg'),
    invited: false,
  },
  //   { id: '9', name: 'Another Friend', avatar: require('../../assets/avatar/avatar2.jpg'), invited: true },

  //   { id: '10', name: 'Yet Another', avatar: require('../../assets/avatar/photo0.jpeg'), invited: false },
];

const SearchInviteFriends = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friends, setFriends] = useState(MOCK_FRIENDS);

  const handleToggleInvite = id => {
    setFriends(prevFriends =>
      prevFriends.map(friend =>
        friend.id === id ? {...friend, invited: !friend.invited} : friend,
      ),
    );
  };

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const renderFriendItem = ({item}) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => handleToggleInvite(item.id)}>
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.friendName}>{item.name}</Text>
      <View style={styles.iconContainer}>
        {item.invited ? (
          <Icon name="checkbox" size={24} color="#555" />
        ) : (
          <View style={styles.emptySquare} />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <TouchableOpacity
            onPress={() => navigation.navigate('RatingScreen')}
            style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Invite Friends</Text>
          <View style={styles.placeholderRight} />
        </View>

        <View style={styles.searchBarContainer}>
          <Icon
            name="search"
            size={20}
            color="#ffffffff"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>
      <FlatList
        data={filteredFriends}
        renderItem={renderFriendItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
      <View style={styles.footerLine} />
    </SafeAreaView>
  );
};

export default SearchInviteFriends;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },

  header: {
    backgroundColor: '#f9864a',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    overflow: 'hidden',
  },
  headerTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholderRight: {
    width: 34,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffdadaff',
    borderRadius: 8,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    height: 35,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 7,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 2,
  },

  listContentContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 10,
    paddingVertical: 3,
    paddingHorizontal: 15,
    marginBottom: 10,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 0,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 15,
  },
  friendName: {
    flex: 1,
    fontSize: 17,
    color: '#333',
    fontWeight: '500',
  },
  iconContainer: {
    width: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  emptySquare: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  footerLine: {
    height: 4,
    width: 150,
    backgroundColor: '#000',
    alignSelf: 'center',
    marginTop: 0,
    // marginBottom: 16,
    borderRadius: 2,
    opacity: 0.8,
  },
});
