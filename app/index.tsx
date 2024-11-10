import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Adjust path if needed

const Index = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>ASPEN</Text>

      {/* Large Circle */}
      <View style={styles.circle} />

      {/* Log In Button */}
      <TouchableOpacity
        style={styles.button}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUpScreen')}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB', // Light blue background to match the sample
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#4682B4', // Darker blue for the circle
    marginVertical: 30,
  },
  button: {
    width: 200,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#4682B4', // Dark blue for buttons
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Index;