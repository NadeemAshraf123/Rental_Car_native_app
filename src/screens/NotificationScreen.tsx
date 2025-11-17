import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';

const notifications = [
  {
    id: '1',
    name: 'Deficar',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet...',
    time: '1m ago',
    badge: 2,
    avatar: require('../assets/avatar/avatar1.jpg'),
  },
  {
    id: '2',
    name: 'Aymen cars services',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet...',
    time: '1m ago',
    badge: null,
    avatar: require('../assets/avatar/avatar2.jpg'),
  },
  {
    id: '3',
    name: 'MAGI Cars',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet...',
    time: '1m ago',
    badge: null,
    avatar: require('../assets/avatar/flower.jpeg'),
  },
  {
    id: '4',
    name: 'ARC',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet...',
    time: '1m ago',
    badge: 2,
    avatar: require('../assets/avatar/avatar2.jpg'),
  },
  {
    id: '5',
    name: 'LOVEHA',
    message:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit dolor sit amet...',
    time: '1m ago',
    badge: null,
    avatar: require('../assets/avatar/avatar1.jpg'),
  },
];

const NotificationScreen = () => {
  const renderItem = ({item}) => (
    <View style={styles.card}>
      <View style={styles.avatarWrapper}>
        <Image source={item.avatar} style={styles.avatar} />
        {item.badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.badge}</Text>
          </View>
        )}
      </View>

      <View style={styles.textContainer}>
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text style={styles.message}>{item.message}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Notification</Text>
        </View>
      </View>

      <View style={styles.Labelheader}>
        <Text style={styles.headerLabel}>General</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#F9864A',
  },
  header: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
    padding: 14,
  },
  Labelheader: {
    backgroundColor: '#feeee6',
    height: 30,
  },
  headerLabel: {
    fontSize: 14,
    color: 'black',
    marginTop: 4,
    textAlign: 'left',
    marginLeft: 18,
    padding: 5,
  },
  listContainer: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 12,
    position: 'relative',
  },
  avatarWrapper: {
    position: 'relative',
    width: 35,
    height: 35,
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '900',
    fontFamily: 'Roboto-Black',
    color: '#333',
  },
  message: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
  time: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#f57c00',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    minWidth: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
});
