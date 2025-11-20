import React, { useState } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const ProfileNotificationScreen = () => {
  const navigation = useNavigation();
  const [settings, setSettings] = useState({
    general: true,
    sound: false,
    vibrate: true,
    updates: false,
    bill: true,
    promo: true,
    discount: false,
    payment: false,
    newService: false,
    newTips: true,
  });

  const toggle = key => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderRow = (label, key) => (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Switch
      style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }]}}
        value={settings[key]}
        onValueChange={() => toggle(key)}
        trackColor={{ false: '#ccc', true: '#F9864A' }}
        thumbColor="#fff"
      />
    </View>
  );

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

    
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Common</Text>
        {renderRow('General Notification', 'general')}
        {renderRow('Sound', 'sound')}
        {renderRow('Vibrate', 'vibrate')}
      </View>

    
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>System & services update</Text>
        {renderRow('App updates', 'updates')}
        {renderRow('Bill Reminder', 'bill')}
        {renderRow('Promotion', 'promo')}
        {renderRow('Discount Available', 'discount')}
        {renderRow('Payment Request', 'payment')}
      </View>

      
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Others</Text>
        {renderRow('New Service Available', 'newService')}
        {renderRow('New Tips Available', 'newTips')}
      </View>

      <View style={styles.footerLine} />


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },

  header: {
    position: 'relative',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 12,
    paddingHorizontal: 16,
  },

  sectionContainer: {
    marginTop: 24,
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
    paddingBottom: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '900',
    marginBottom: 8,
    color: '#333',
    paddingHorizontal: 16
  },


  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 12,
    color: '#504e4eff',
  },

  
footerLine: {
  height: 3,
  width: '40%',         
  backgroundColor: '#000',
  alignSelf: 'center',  
  marginTop: 76,        
  borderRadius: 1,      
},

});

export default ProfileNotificationScreen;
