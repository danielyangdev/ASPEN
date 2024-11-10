import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';

const SERVER_IP = '127.0.0.1';  // Your server IP
const SERVER_URL = `http://${SERVER_IP}:8000`;

const Calendar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${SERVER_URL}/auth/google/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authorization_url) {
          // Open the authorization URL without handling callbacks
          await WebBrowser.openBrowserAsync(data.authorization_url);
          // Navigate to the next page after browser is closed
          navigation.navigate('Home');
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to get authorization URL: ${errorText}`);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      Alert.alert('Error', `Failed to open Google Sign-in: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar Availability</Text>

      <TouchableOpacity 
        style={styles.syncButton} 
        onPress={handleGoogleSignIn}
        disabled={isLoading}
      >
        <Text style={styles.syncButtonText}>
          Sign in with Google
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
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
  syncButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 5,
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Calendar;