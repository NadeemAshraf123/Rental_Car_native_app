import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentWrapper}>
        
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Types data we collect</Text>
          <Text style={styles.paragraph}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
          </Text>
          <Text style={styles.paragraph}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur...
          </Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use of your personal data</Text>
          <Text style={styles.paragraph}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium...
          </Text>
          <Text style={styles.paragraph}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.
          </Text>
        </View>

        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Disclosure of your personal data</Text>
          <Text style={styles.paragraph}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum...
          </Text>
          <Text style={styles.paragraph}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore...
          </Text>
          <Text style={styles.paragraph}>
            Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet...
            Lorem, ipsum dolor sit amet 
            consectetur adipisicing elit. Veniam ducimus obcaecati delectus officiis 
            repudiandae, officia, dignissimos eos iure maiores minima et sint assumenda 
            tempore velit. Voluptatem tenetur ducimus laboriosam, consequuntur 
            quibusdam enim quo. Illum est ducimus odit in impedit exercitationem!
          </Text>
        </View>
      </View>

      <View    style={styles.footerLine} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  contentWrapper: {
    paddingHorizontal: 36,
  },

  header: {
    position: 'relative',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
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

  section: {
    marginTop: 34,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: 12,
    color: '#504e4e',
    lineHeight: 14, 
    fontWeight: '700',

    marginBottom: 8,
  },
  footerLine: {
    height: 4,
    width: 150,             
    backgroundColor: '#000',
    alignSelf: 'center',    
    marginTop: 80,
    // marginBottom: 16,
    borderRadius: 2,        
    opacity: 0.8,     
  },
});

export default PrivacyPolicyScreen;
