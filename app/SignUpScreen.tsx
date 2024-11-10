import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const interestsList = [
  'Outdoor Adventures', 'Extreme Sports', 'Arts & Craft',
  'Wellness Adventures', 'Music & Concerts', 'Culture & Heritage',
  'Community Service', 'Urban Adventures', 'Food & Culinary', 'Animal & Wildlife'
];

const SignUpScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const navigation = useNavigation();

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <ImageBackground
      source={require('../assets/images/aspen-background.png')}
      style={styles.background}
    >
      {/* Dark Overlay */}
      <View style={styles.overlay} />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>SIGN UP</Text>

      {/* Input Fields */}
      {['Name', 'Username', 'Password', 'City'].map((label, index) => (
        <View key={index} style={styles.inputContainer}>
          <Text style={styles.label}>{label}:</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor="transparent" // Hide placeholder text
            secureTextEntry={label === 'Password'}
          />
        </View>
      ))}

      {/* Interests Selection */}
      <View style={styles.sectionContainer}>
        <Text style={styles.label}>Interests:</Text>
        <View style={styles.interestsContainer}>
          {interestsList.map((interest, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.interestButton,
                selectedInterests.includes(interest) && styles.selectedInterestButton
              ]}
              onPress={() => toggleInterest(interest)}
            >
              <Text style={styles.interestText}>{interest}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('AddFriends')}
      >
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 50, // Adjust this value to move the content down
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Darken background with transparency
  },
  backButton: {
    position: 'absolute',
    top: 65,
    left: 20,
    padding: 10,
    marginBottom: 0,
  },
  backButtonText: {
    fontSize: 24, // Larger font size for bigger back button
    color: '#fff',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 0,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  sectionContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
    paddingLeft: 0,
    textAlign: 'left',
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderBottomWidth: 1,
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 10,
    paddingLeft: 5, // Shorten the line on the left
    paddingRight: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
  },
  interestButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    margin: 5,
  },
  selectedInterestButton: {
    backgroundColor: '#4682B4',
  },
  interestText: {
    color: '#fff',
    fontSize: 14,
  },
  nextButton: {
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default SignUpScreen;