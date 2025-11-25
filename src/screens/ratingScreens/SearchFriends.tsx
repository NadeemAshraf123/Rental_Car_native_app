import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const contactsData = [
  { id: '1', name: 'Amel Fettah', selected: true },
  { id: '2', name: 'Ikram Rehalha', selected: false },
  { id: '3', name: 'Riham Bakir', selected: true },
  { id: '4', name: 'Samah Bensalah', selected: true },
  { id: '5', name: 'Aya Boukharouba', selected: false },
  { id: '6', name: 'Maissara Ammi', selected: false },
  { id: '7', name: 'Benriba', selected: false },
  { id: '8', name: 'Mohamed Fettah', selected: false },
];

const SearchFriends = () => {
  const [searchText, setSearchText] = useState('');
  const [contacts, setContacts] = useState(contactsData);

  const toggleSelection = (id) => {
    const updated = contacts.map((contact) =>
      contact.id === id ? { ...contact, selected: !contact.selected } : contact
    );
    setContacts(updated);
  };

  const renderItem = ({ item }) => (
    <View style={styles.contactRow}>
      <Image
        source={require('../../assets/ratingscreen/reviewgift.png')}
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.name}</Text>
      <TouchableOpacity
        style={[
          styles.toggleButton,
          item.selected ? styles.selected : styles.deselected,
        ]}
        onPress={() => toggleSelection(item.id)}
      >
        {item.selected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite Friends</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
      <FlatList
        data={contacts.filter((c) =>
          c.name.toLowerCase().includes(searchText.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 20 },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 10,
    color: '#000',
  },
  searchBar: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  listContainer: { paddingBottom: 20 },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ccc',
    marginRight: 12,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  toggleButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#ccc',
  },
  deselected: {
    backgroundColor: '#f97316',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SearchFriends;
