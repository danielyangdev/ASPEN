import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdventureDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adventure Details</Text>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff',
  },
  detailText: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 8,
  },
});

export default AdventureDetails;