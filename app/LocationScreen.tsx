import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LocationScreen = () => {
  const [location, setLocation] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('/Users/danielyang/HackSC24/assets/images/aspen-background-2.png')}
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
        <Text style={styles.subtitle}>Where do you live?</Text>

        <TextInput
          style={styles.input}
          placeholder=""
          value={location}
          onChangeText={setLocation}
        />

        {/* Next Button */}
        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('InterestsScreen')}>
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
    right: -130, // Move it further off-screen to cut off more
    width: 330, // Increased width by 50% from original
    height: 270, // Increased height by 50% from original
    borderBottomLeftRadius: 80, // Slight rounding for aesthetics
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
  },
  textContainer: {
    marginTop: 350, // Move text lower for balance with enlarged image
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
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
  },
});

export default LocationScreen;