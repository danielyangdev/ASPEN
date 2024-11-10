import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const interestsList = [
  'Camping', 'Hiking', 'Concerts', 'Service',
  'Museums', 'Restaurants', 'Animals', 'Mindfulness',
  'Skiing', 'Climbing'
];

const InterestsScreen = () => {
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
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Let's create your profile</Text>
      <Text style={styles.subtitle}>What are your interests?</Text>

      <View style={styles.interestsContainer}>
        {interestsList.map((interest, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.interestButton,
              selectedInterests.includes(interest) && styles.selectedInterestButton,
            ]}
            onPress={() => toggleInterest(interest)}
          >
            <Text style={styles.interestText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('AddFriends')}>
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
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
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  interestButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    margin: 5,
  },
  selectedInterestButton: {
    backgroundColor: '#E0E0E0', // Change to selected color
  },
  interestText: {
    fontSize: 16,
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 30,
  },
  nextButtonText: {
    fontSize: 24,
  },
});

export default InterestsScreen;