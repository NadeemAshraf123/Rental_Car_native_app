import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CarsDetailView from './CarsDetailView'; 
import AgenciesDetailView from './AgenciesDetailView';
import FamousDetailView from './FamousDetailView'; 


interface ContentPanelProps { 
    navigation: any ;
}

type ActiveTab = 'Cars' | 'Agencies' | 'Famous';

const ContentPanel = ({ navigation }: ContentPanelProps) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('Cars');

  const renderDetailView = () => {
    switch (activeTab) {
      case 'Cars':
        return <CarsDetailView navigation={navigation} />;
      case 'Agencies':
        return <AgenciesDetailView navigation={navigation} />;
      case 'Famous':
        return <FamousDetailView  />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.panelContainer}>


      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>GO</Text>
        <Text style={styles.logoSubText}>CarGo</Text>
      </View>


      <View style={styles.contentWrapper}>
      <View style={styles.tabNav}>
        {['Cars', 'Agencies', 'Famous'].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as ActiveTab)}
            style={[styles.tabButton, activeTab === tab && styles.activeTabContainer]}
          >
          
            <View style={activeTab === tab ? styles.activeDot : styles.inactiveDot} />
            <Text 
              style={[
                styles.tabText, 
                activeTab === tab ? styles.activeTabText : styles.inactiveTabText
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.detailContent}>
        {renderDetailView()}
      </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    backgroundColor: '#F9864A',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 0,
    paddingTop: 50,
    marginHorizontal: 0, 
    paddingBottom: 20,
  },
  contentWrapper: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 15,
    paddingTop: 10,
    
    marginBottom: -50,
    
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: 'white',
    lineHeight: 20,
    paddingTop: 5,
  },
  logoSubText: {
    fontSize: 10,
    color: '#FF7A00',
    marginTop: -5,
  },
  
  tabNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 13,
    paddingHorizontal: 10,
  },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#FF7A00',
    marginRight: 5,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF7A00',
    marginRight: 5,
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: 'black',
  },
  inactiveTabText: {
    color: 'black',
  },
  detailContent: {
    
  },
  activeTabContainer: {
        borderBottomWidth: 2, 
        borderBottomColor: 'black', 
        paddingBottom: 5, 
    },
});

export default ContentPanel;