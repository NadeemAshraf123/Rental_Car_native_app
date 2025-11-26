import React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

const screenWidth = Dimensions.get('window').width;

const InviteFriendsScreen = ( {navigation} ) => {
  const inviteCode = 'A045KL';

  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/ratingscreen/reviewgift.png')}
            style={styles.illustration}
            resizeMode="cover" 
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Invite Friends</Text>
          <Text style={styles.subtitle}>Get 3 Coupons each!</Text>
          <Text style={styles.description}>
            When your friend sign up with your referral code, you'll both get{''}
            <Text style={{ fontWeight: 'bold' }}>3.0 coupons</Text>
          </Text>
        </View>
      </View>

    
      <View style={styles.shareSection}>
        <Text style={styles.shareTitle}>Share Your Invite Code</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.codeInput}
            value={inviteCode}
            editable={false}
          />
          <TouchableOpacity
            style={styles.uploadIcon}
            onPress={() => console.log('Handle share action')}
          >

            <Icon name="share-outline" size={24} color="#F9864A" />
          </TouchableOpacity>
        </View>
        <View style={styles.underline} />
      </View>

    
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SearchInviteFriends')}
      >
        <Text style={styles.buttonText}>Invite Friends</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default InviteFriendsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 25, 
    paddingTop: 30, 
    alignItems: 'center',
  },
  

  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 15,

    elevation: 1, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  

  imageContainer: {
    width: '100%',
    height: screenWidth * 0.80,
    backgroundColor: '#fff7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {
    width: '70%',
    height: '70%',
  },

  content: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    marginTop: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },

  shareSection: {
    width: '100%',
    maxWidth: 400,
    paddingHorizontal: 5,
    marginTop: 30,
    marginBottom: 30,
  },
  shareTitle: {
    fontSize: 16,
    color: '#606060',
    fontWeight: '600',
    marginBottom: 5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  codeInput: {
    flex: 1,
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    paddingVertical: 10,
  },
  uploadIcon: {
    paddingLeft: 10,
    paddingVertical: 5,
  },
  underline: {
    height: 1,
    backgroundColor: '#ccc', 
    width: '100%',
    marginTop: -5,
  },

  button: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#f9864a',
    paddingVertical: 10,
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});