import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const NameScreen = () => {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  // Load the font
  const [fontsLoaded] = useFonts({
    'KohSantepheap-Regular': require('../assets/fonts/KohSantepheap-Regular.ttf'), // Adjust path as needed
    'KohSantepheap-Bold': require('../assets/fonts/KohSantepheap-Bold.ttf'), // Adjust path as needed
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/aspen-background-1.png')}
          style={styles.image}
        />
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Title and Input */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>Let's create your profile</Text>
        <Text style={styles.subtitle}>What's your name?</Text>

        <TextInput
          style={styles.input}
          placeholder=""
          value={name}
          onChangeText={setName}
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('LocationScreen')}>
          <Text style={styles.nextButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'absolute',
    top: -20,
    right: -130,
    width: 330,
    height: 270,
    borderBottomLeftRadius: 80,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    fontFamily: 'KohSantepheap-Bold', // Apply font to back button
  },
  textContainer: {
    marginTop: 350,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'KohSantepheap-Bold', // Apply font to title
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'KohSantepheap-Regular', // Apply font to subtitle
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    fontSize: 16,
    paddingVertical: 5,
    width: '100%',
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 30,
  },
  nextButtonText: {
    fontSize: 24,
    fontFamily: 'KohSantepheap-Regular', // Apply font to next button
  },
});

export default NameScreen;