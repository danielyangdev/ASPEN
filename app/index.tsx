import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Adjust path if needed

const Index = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require('/Users/danielyang/HackSC24/assets/images/aspen-background.png')}
      style={styles.background}
      imageStyle={styles.image} // Apply custom transform style
    >
      {/* Dark Overlay */}
      <View style={styles.overlay} />

      {/* Title and Subtitle */}
      <View style={styles.textContainer}>
        <Text style={styles.mainTitle}>ASPEN</Text>
        <Text style={styles.subtitle}>
          Take back your time,
          {"\n"}take on an adventure
        </Text>
      </View>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.getStartedButton}
        onPress={() => navigation.navigate('NameScreen')} // Changed to navigate to NameScreen
      >
        <Text style={styles.getStartedButtonText}>Get started</Text>
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
  image: {
    transform: [
      { scale: 1.35 }, // Zoom the image out slightly
      { translateX: 0 },
      { translateY: 15 }, // Move the background image to the left
    ],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Darken background with transparency
  },
  textContainer: {
    position: 'absolute',
    bottom: 300, // Position text right above the button
    left: 20, // Align text to the left side
  },
  mainTitle: {
    fontSize: 80, // Increase font size for emphasis
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic', // Make text italic
    textAlign: 'left',
    marginTop: 10, // Small gap between title and subtitle
  },
  getStartedButton: {
    position: 'absolute',
    bottom: 70, // Position button at the very bottom with some margin
    alignSelf: 'center', // Center the button horizontally
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  getStartedButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Index;