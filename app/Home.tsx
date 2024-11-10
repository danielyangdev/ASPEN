import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Ensure this import path is correct

const adventures = [
  { id: '1', title: 'Universal Studios', date: 'Nov 11th, 8:00am', image: require('../assets/images/adventure.png') },
  { id: '2', title: 'Universal Studios', date: 'Nov 11th, 8:00am', image: require('../assets/images/adventure.png') },
  { id: '3', title: 'Universal Studios', date: 'Nov 11th, 8:00am', image: require('../assets/images/adventure.png') },
];

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('../assets/images/home-background.png')} style={styles.backgroundImage} />

      {/* Title */}
      <Text style={styles.title}>
        Take on a new{"\n"}adventure
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>Upcoming Adventures:</Text>

      {/* Adventure List */}
      <ScrollView contentContainerStyle={styles.adventureList}>
        {adventures.map(adventure => (
          <View key={adventure.id} style={styles.adventureCard}>
            <Image source={adventure.image} style={styles.adventureImage} />
            <View style={styles.adventureInfo}>
              <Text style={styles.adventureTitle}>{adventure.title}</Text>
              <View style={styles.adventureDateContainer}>
                <Image source={require('../assets/images/calendar.png')} style={styles.calendarIcon} />
                <Text style={styles.adventureDate}>{adventure.date}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Add New Adventure Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAdventure')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '145%',
    marginLeft: '-3.5%',
    height: 500,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',      
    alignSelf: 'flex-start',  
    paddingLeft: 20,
    marginTop: 90,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginTop: 140,
    marginBottom: 20,
    fontWeight: '600',
  },
  adventureList: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  adventureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1E8E4',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  adventureImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  adventureInfo: {
    flex: 1,
    marginLeft: 10,
  },
  adventureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adventureDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  calendarIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  adventureDate: {
    fontSize: 14,
    color: '#333',
  },
  viewButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4682B4',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
});

export default Home;