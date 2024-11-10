import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const interestsList = [
  'Camping', 'Restaurants', 'Hiking', 'Concerts', 'Service',
  'Museums', 'Animals', 'Mindfulness', 'Skiing', 'Climbing', 'Reading', 'Sports',
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
      {/* Top Image */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/aspen-background-3.png')}
          style={styles.image}
        />
      </View>

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Title and Interests */}
      <View style={styles.textContainer}>
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
      </View>

      {/* Next Button */}
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
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'absolute',
    top: -20,
    right: -130, // Move image off-screen for aesthetic cutoff
    width: 330, // Increased width for enlarged image
    height: 270, // Increased height for enlarged image
    borderBottomLeftRadius: 80, // Rounded for aesthetics
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
    marginTop: 300, // Move text and interests down to balance with enlarged image
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
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  interestButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
    margin: 7,
  },
  selectedInterestButton: {
    backgroundColor: '#E0E0E0', // Highlight color for selected interests
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