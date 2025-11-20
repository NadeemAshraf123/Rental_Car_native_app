import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const LanguageScreen = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('English (UK)');

  const suggested = ['English (US)', 'English (UK)'];
  const others = [
    'Mandarin',
    'Hindi',
    'Spanish',
    'French',
    'Arabic',
    'Russian',
    'Indonesia',
    'Vietnamese',
  ];

  const renderLanguageRow = (item: string) => {
    const isSelected = selectedLanguage === item;
    return (
      <TouchableOpacity
        style={styles.languageRow}
        onPress={() => setSelectedLanguage(item)}
      >
        <Text style={styles.languageText}>{item}</Text>
        <View style={styles.circleWrapper}>
          <View
            style={[
              styles.circle,
              isSelected && styles.selectedCircle,
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingHorizontal: 30}}>
      
      <View style={styles.header}>
  <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
    <Icon name="arrow-back" size={24} color="#000" />
  </TouchableOpacity>
  <Text style={styles.headerTitle}>Language</Text>
</View>


      <Text style={styles.sectionTitle}>Suggested</Text>
      {suggested.map(lang => renderLanguageRow(lang))}

      <Text style={styles.sectionTitle}>Others</Text>
      {others.map(lang => renderLanguageRow(lang))}

      <View  style={styles.addLanguageButtonContainer}>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add another languages</Text>
        <View style={styles.PlusIcon}>
        <Icon name="add" size={20} color="#fff" />
        </View>

      </TouchableOpacity>
      </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 16, backgroundColor: '#fff' },
  header: {
  position: 'relative',
  height: 48,
  justifyContent: 'center',
  alignItems: 'center',
  
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

  headerIcon: {
    textAlign: 'left',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  languageText: {
    fontSize: 13,
    color: '#000',
  },
  circleWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#F9864A',
  },
  selectedCircle: {
    backgroundColor: '#F9864A',
    borderColor: '#F9864A',
  },
  addLanguageButtonContainer: {
    backgroundColor: '#fff', 
    padding: 8,
    borderRadius: 8,
    marginTop: 24,
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  addButton: {
    flexDirection: 'row',    
  },
  addButtonText: {
    fontSize: 14,
  },
  PlusIcon: {
    backgroundColor: '#F9864A',
    borderRadius: 50,
    marginLeft: 50,
  },
});

export default LanguageScreen;
