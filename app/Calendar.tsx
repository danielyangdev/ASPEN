import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as WebBrowser from 'expo-web-browser';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const SERVER_URL = 'http://localhost:8000';

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
          await WebBrowser.openBrowserAsync(data.authorization_url);
          navigation.navigate('Home' as never);
        }
      } else {
        const errorText = await response.text();
        throw new Error(`Failed to get authorization URL: ${errorText}`);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      Alert.alert('Error', `Failed to open Google Sign-in: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const [fontsLoaded] = useFonts({
    'KohSantepheap-Regular': require('../assets/fonts/KohSantepheap-Regular.ttf'), 
    'KohSantepheap-Bold': require('../assets/fonts/KohSantepheap-Bold.ttf'), 
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Calendar Availability</Text>

      {/* Auth Button */}
      <TouchableOpacity 
        style={styles.authButton} 
        onPress={handleGoogleSignIn}
        disabled={isLoading}
      >
        <Text style={styles.authButtonText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => navigation.navigate('Home' as never)}
      >
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'KohSantepheap-Regular', 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
    fontFamily: 'KohSantepheap-Bold', 
  },
  authButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 20,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'KohSantepheap-Regular', 
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  nextButtonText: {
    fontSize: 24,
    fontFamily: 'KohSantepheap-Regular', 
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'KohSantepheap-Regular', 
  },
});

export default Calendar;