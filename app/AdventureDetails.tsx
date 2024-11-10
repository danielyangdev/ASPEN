import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdventureDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      {/* Page Title */}
      <Text style={styles.title}>Adventure Details</Text>

      {/* Adventure Details */}
      <Text style={styles.detailText}>Who: </Text>
      <Text style={styles.detailText}>What: </Text>
      <Text style={styles.detailText}>Where: </Text>
      <Text style={styles.detailText}>Why: </Text>
      <Text style={styles.detailText}>When: </Text>
      <Text style={styles.detailText}>How: </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#87CEEB',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 10,
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80, // Increase top margin to give space for the back button
    marginBottom: 20,
    color: '#fff',
  },
  detailText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 8,
  },
});

export default AdventureDetails;