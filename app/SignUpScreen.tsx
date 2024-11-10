import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const interestsList = [
  'Outdoor Adventures', 'Extreme Sports', 'Arts & Craft',
  'Wellness Adventures', 'Music & Concerts', 'Culture & Heritage',
  'Community Service', 'Urban Adventures', 'Food & Culinary'
];

const avatars = Array(5).fill(null);

const SignUpScreen = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedAvatar, setSelectedAvatar] = useState<number | null>(null);
  const navigation = useNavigation();

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const selectAvatar = (index: number) => {
    setSelectedAvatar(index);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>SIGN UP</Text>

        {/* Input Fields */}
        {['Name', 'Username', 'Password', 'City'].map((placeholder, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{placeholder}:</Text>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#b0c4de"
              secureTextEntry={placeholder === 'Password'}
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

        {/* Avatar Selection */}
        <View style={styles.sectionContainer}>
          <Text style={styles.label}>Avatar:</Text>
          <View style={styles.avatarsContainer}>
            {avatars.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.avatar,
                  selectedAvatar === index && styles.selectedAvatar
                ]}
                onPress={() => selectAvatar(index)}
              />
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30, // Move title down
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
    width: '100%',
  },
  sectionContainer: {
    width: '100%', // Align sections with input fields
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'left', // Align labels to the left
  },
  input: {
    height: 40,
    borderColor: '#fff',
    borderBottomWidth: 1,
    fontSize: 16,
    color: '#fff',
    paddingHorizontal: 10,
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
  avatarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
    gap: 20, // Increase spacing between avatars
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedAvatar: {
    borderColor: '#4682B4',
    backgroundColor: '#4682B4',
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 25,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default SignUpScreen;