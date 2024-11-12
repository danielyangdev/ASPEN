import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; 
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const Index = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    'KohSantepheap-Regular': require('../assets/fonts/KohSantepheap-Regular.ttf'), 
    'KohSantepheap-Bold': require('../assets/fonts/KohSantepheap-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ImageBackground
      source={require('../assets/images/aspen-background.png')}
      style={styles.background}
      imageStyle={styles.image} 
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
        onPress={() => navigation.navigate('NameScreen' as never)}
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
      { scale: 1.35 }, 
      { translateX: 0 },
      { translateY: 15 },
    ],
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  textContainer: {
    position: 'absolute',
    bottom: 300, 
    left: 20, 
  },
  mainTitle: {
    fontSize: 80, 
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'KohSantepheap-Bold',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 22,
    color: '#fff',
    fontStyle: 'italic',
    textAlign: 'left',
    fontFamily: 'KohSantepheap-Regular',
    marginTop: 7, 
  },
  getStartedButton: {
    position: 'absolute',
    bottom: 70, 
    alignSelf: 'center',
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
    fontFamily: 'KohSantepheap-Bold',
  },
});

export default Index;