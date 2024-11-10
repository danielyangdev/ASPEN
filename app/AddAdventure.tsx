import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddAdventure = () => {
  const navigation = useNavigation();

  const handleSave = () => {
    // Logic to save the adventure
    console.log('Adventure saved');
    // Navigate back or to another screen after saving
    navigation.goBack();
  };

  const handleCancel = () => {
    // Logic to cancel the addition of the adventure
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New Adventure</Text>

      {/* Tick and Cross Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.tickButton} onPress={handleSave}>
          <Text style={styles.buttonText}>✔️</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.crossButton} onPress={handleCancel}>
          <Text style={styles.buttonText}>❌</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#87CEEB',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  tickButton: {
    backgroundColor: '#32CD32',
    padding: 20,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossButton: {
    backgroundColor: '#FF6347',
    padding: 20,
    borderRadius: 50,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default AddAdventure;