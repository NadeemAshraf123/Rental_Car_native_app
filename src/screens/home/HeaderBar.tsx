import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, DrawerActions  } from '@react-navigation/native';



export default function HeaderBar() {

    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.getParent()?.dispatch(DrawerActions.openDrawer());
    }



  return (
    <>
      <View style={styles.headerOverlay}>
        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuIcon}
            onPress={openDrawer}>
            <Icon name="menu" size={32} color="#F9864A" />
          </TouchableOpacity>

          <TouchableOpacity onPress={openDrawer}>
            <Image
              source={{uri: 'https://i.pravatar.cc/100'}}
              style={styles.profilePic}
            />
          </TouchableOpacity>

          {/* <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View style={styles.outerRing}>
              <LinearGradient
                colors={['#F9864A', '#8B4513']}
                style={styles.gradientRing}>
                <View style={styles.whiteBorder}>
                  <Image
                    source={{uri: 'https://i.pravatar.cc/100'}}
                    style={styles.profilePic}
                  />
                </View>
              </LinearGradient>
            </View>
          </TouchableOpacity> */}
        </View>

        <View style={styles.searchContainer}>
          <Icon
            name="search"
            size={20}
            color="#FF7A00"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
          <TouchableOpacity style={styles.filterIcon}>
            <Icon name="tune" size={20} color="#FF7A00" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  headerOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
  container: {
    paddingLeft: 30,
    paddingRight: 30,
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },

  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  menuIcon: {
    padding: 6,
  },

    profilePic: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: '#f9864a',
    },

  outerRing: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  gradientRing: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  whiteBorder: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profilePic1: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },

  searchContainer: {
    width: '80%' ,
    alignSelf: 'center', 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
    marginTop: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 46},
  },
  searchIcon: {
    marginRight: 10,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#777',
  },

  filterIcon: {
    marginLeft: 10,
  },
});
