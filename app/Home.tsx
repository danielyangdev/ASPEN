import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Ensure this import path is correct

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Move title lower */}
      <Text style={styles.title}>Upcoming Adventures</Text>

      {/* Adventure 1 Button */}
      <TouchableOpacity
        style={styles.adventureButton}
        onPress={() => navigation.navigate('AdventureDetails')}
      >
        <Text style={styles.adventureButtonText}>Adventure 1</Text>
      </TouchableOpacity>

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
    padding: 20,
    backgroundColor: '#87CEEB',
    alignItems: 'center', // Center elements horizontally
    justifyContent: 'center', // Center elements vertically if possible
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginTop: 0, // Push title lower down the screen
    marginBottom: 20,
  },
  adventureButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    width: '80%',
  },
  adventureButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#4682B4',
    width: 70, // Increase button size
    height: 70,
    borderRadius: 35, // Make button circular
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20, // Place at the bottom of the screen
    alignSelf: 'center', // Center horizontally
  },
  addButtonText: {
    color: '#fff',
    fontSize: 36, // Increase font size for better visibility
    fontWeight: 'bold',
  },
});

export default Home;