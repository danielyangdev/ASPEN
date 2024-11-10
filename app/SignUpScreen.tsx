import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const interestsList = [
  'Outdoor Adventures', 'Extreme Sports', 'Arts & Craft',
  'Wellness Adventures', 'Music & Concerts', 'Culture & Heritage',
  'Community Service', 'Urban Adventures', 'Food & Culinary'
];

const avatars = Array(5).fill(null); // Placeholder for 5 avatars

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
        {/* Input Fields */}
        {['Name', 'Username', 'Email', 'Password', 'City'].map((placeholder, index) => (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.label}>{placeholder}:</Text>
            <TextInput
              style={styles.input}
              placeholder={placeholder}
              secureTextEntry={placeholder === 'Password'}
            />
          </View>
        ))}

        {/* Interests Selection */}
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

        {/* Avatar Selection */}
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
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
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
    alignSelf: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default SignUpScreen;