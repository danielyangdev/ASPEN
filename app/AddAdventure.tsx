import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, PanResponder, ImageBackground } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.4 * screenWidth;

const AddAdventure = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigation = useNavigation();
  const position = useRef(new Animated.ValueXY({ x: 0, y: screenHeight })).current;

  const [fontsLoaded] = useFonts({
    'KohSantepheap-Regular': require('../assets/fonts/KohSantepheap-Regular.ttf'), // Adjust path as needed
    'KohSantepheap-Bold': require('../assets/fonts/KohSantepheap-Bold.ttf'), // Adjust path as needed
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const cardsData = [
    {
      title: "Daniel & You",
      mainImage: 'https://images.unsplash.com/photo-1443926818681-717d074a57af?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      trailTitle: "Stargaze in Malibu",
      date: "Nov 20th, 8:00pm",
    },
    {
      title: "Tom & You",
      mainImage: 'https://images.unsplash.com/photo-1529862021-d416a7f1a5cd?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      trailTitle: "Skydiving in San Diego, CA",
      date: "Nov 11th, 8:00am",
    },
    {
      title: "Luke & You",
      mainImage: 'https://images.unsplash.com/photo-1575408264798-b50b252663e6?q=80&w=2706&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      trailTitle: "Partition Arch Trail",
      date: "Nov 23rd, 9:00am",
    },
    {
      title: "Josh, Akash & You",
      mainImage: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      trailTitle: "Don Toliver Concert",
      date: "Dec 4th, 9:00pm",
    },
    {
      title: "4+ & You",
      mainImage: 'https://images.unsplash.com/photo-1521488517399-2b4ed09655fa?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      trailTitle: "Climbing Yosemite",
      date: "Dec 12th, 11:00am",
    },
    {
      title: "Jasmine & You",
      mainImage: 'https://images.unsplash.com/photo-1546940072-0dc23916c4f2?q=80&w=2748&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      trailTitle: "The Louvre, Paris",
      date: "Jan 1st, 10:00am",
    },
    // Additional cards can go here...
  ];

const currentCard = cardsData[currentIndex];

useEffect(() => {
  animateCardEntrance();
}, [currentIndex]);

const animateCardEntrance = () => {
  position.setValue({ x: 0, y: screenHeight });
  Animated.spring(position, {
    toValue: { x: 0, y: 0 },
    useNativeDriver: false,
    friction: 8,
  }).start();
};

const panResponder = PanResponder.create({
  onStartShouldSetPanResponder: () => true,
  onPanResponderMove: (e, gesture) => {
    position.setValue({ x: gesture.dx, y: gesture.dy });
  },
  onPanResponderRelease: (e, gesture) => {
    if (gesture.dx > SWIPE_THRESHOLD) {
      forceSwipe('right');
    } else if (gesture.dx < -SWIPE_THRESHOLD) {
      forceSwipe('left');
    } else {
      resetPosition();
    }
  }
});

const forceSwipe = (direction) => {
  const x = direction === 'right' ? screenWidth * 1.4 : -screenWidth * 1.4;
  Animated.timing(position, {
    toValue: { x, y: 0 },
    duration: 250,
    useNativeDriver: false
  }).start(() => onSwipeComplete(direction));
};

const onSwipeComplete = (direction) => {
  if (direction === 'right') {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
      advanceToNextCard();
    }, 900);
  } else {
    setTimeout(advanceToNextCard, 400);
  }
};

const advanceToNextCard = () => {
  const newIndex = (currentIndex + 1) % cardsData.length;
  setCurrentIndex(newIndex);
};

const resetPosition = () => {
  Animated.spring(position, {
    toValue: { x: 0, y: 0 },
    useNativeDriver: false
  }).start();
};

const renderCard = () => {
  const card = cardsData[currentIndex];
  const rotate = position.x.interpolate({
    inputRange: [-screenWidth * 1.5, 0, screenWidth * 1.5],
    outputRange: ['-30deg', '0deg', '30deg']
  });

  const cardStyle = {
    ...position.getLayout(),
    transform: [{ rotate }]
  };

    return (
      <Animated.View {...panResponder.panHandlers} style={[styles.cardContainer, cardStyle]}>
        <ImageBackground source={{ uri: card.mainImage }} style={styles.card} imageStyle={styles.cardImage}>
          
          {/* Bottom content container */}
          <View style={styles.topContainer}>
            {/* Text container on the left */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{card.title}</Text>
              <Text style={styles.trailTitle}>{card.trailTitle}</Text>
              <Text style={styles.trailDate}>{card.date}</Text>
            </View>
          </View>
          {/* Bottom content container */}
          <View style={styles.bottomContainer}>
            {/* Button on the right */}
            <TouchableOpacity style={styles.planButton}>
              <Text style={styles.planButtonText}>See Plan</Text>
            </TouchableOpacity>
          </View>
          
        </ImageBackground>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground source={{ uri: currentCard.mainImage }} style={styles.backgroundImage} blurRadius={10}>
        
        {/* Overlay for the entire background */}
        <View style={styles.backgroundOverlay} pointerEvents="none" />

        {/* Back Button */}
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.viewCardContent}>
          {renderCard()}
          {showConfetti && (
            <ConfettiCannon count={100} origin={{ x: screenWidth / 2, y: 0 }} fadeOut autoStart />
          )}
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject, // Ensures the overlay covers the entire background
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Slightly white overlay
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  viewCardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    },
  cardContainer: {
    width: screenWidth * 0.9,
    height: screenHeight * 0.8, // Make the card taller
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
  card: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardImage: {
    borderRadius: 20,
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Ensures the overlay covers the entire image
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // Semi-transparent white overlay
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'KohSantepheap-Bold', 
  },
  trailTitle: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'KohSantepheap-Regular', 
  },
  trailDate: {
    fontSize: 12,
    color: '#fff',
    top: 5,
    fontFamily: 'KohSantepheap-Regular', 
  },
  topContainer: {
    position: 'absolute',
    top: 40, // Distance from the bottom edge of the card
    left: 30,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20, // Distance from the bottom edge of the card
    left: 30,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  textContainer: {
    flex: 1,
  },
  planButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  planButtonText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'KohSantepheap-Regular', 
  },
});

export default AddAdventure;