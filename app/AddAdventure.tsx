import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Animated, PanResponder, ImageBackground } from 'react-native';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import ConfettiCannon from 'react-native-confetti-cannon';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 0.7 * screenWidth;

const cardsData = [
  {
    title: "Daniel & You",
    mainImage: 'https://example.com/main-hike-image-1.jpg',
    smallImage1: 'https://example.com/map-image-1.jpg',
    smallImage2: 'https://example.com/second-hike-image-1.jpg',
    trailTitle: "Temescal Trail",
    date: "Nov 11th, 8:00am",
    status: "Scheduled"
  },
  {
    title: "Tom & You",
    mainImage: 'https://example.com/main-hike-image-1.jpg',
    smallImage1: 'https://example.com/map-image-1.jpg',
    smallImage2: 'https://example.com/second-hike-image-1.jpg',
    trailTitle: "Temescal Trail",
    date: "Nov 11th, 8:00am",
    status: "Scheduled"
  },
  {
    title: "Luke & You",
    mainImage: 'https://example.com/main-hike-image-1.jpg',
    smallImage1: 'https://example.com/map-image-1.jpg',
    smallImage2: 'https://example.com/second-hike-image-1.jpg',
    trailTitle: "Temescal Trail",
    date: "Nov 11th, 8:00am",
    status: "Scheduled"
  },
  // Additional cards can go here...
];

const AddAdventure = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigation = useNavigation();
  const position = useRef(new Animated.ValueXY({ x: 0, y: screenHeight })).current;

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
    const x = direction === 'right' ? screenWidth * 1.2 : -screenWidth * 1.2;
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
      setTimeout(advanceToNextCard, 300);
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
      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.card, cardStyle]}
      >
        <Text style={styles.title}>{card.title}</Text>
        
        <Image source={{ uri: card.mainImage }} style={styles.mainImage} />

        <View style={styles.imageRow}>
          <Image source={{ uri: card.smallImage1 }} style={styles.smallImage} />
          <Image source={{ uri: card.smallImage2 }} style={styles.smallImage} />
        </View>

        <View style={styles.trailInfo}>
          <Image source={{ uri: 'https://example.com/trail-icon.jpg' }} style={styles.trailIcon} />
          <View style={styles.trailTextContainer}>
            <Text style={styles.trailTitle}>{card.trailTitle}</Text>
            <Text style={styles.trailDate}>{card.date}</Text>
          </View>
          <View style={styles.trailStatus}>
            <Text style={styles.statusText}>{card.status}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.planButton}>
          <Text style={styles.planButtonText}>See Plan</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ImageBackground source={require('../assets/images/home-background.png')} style={styles.backgroundImage}>
        {/* Back Button */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>

        <View style={styles.viewCardContent}>
          {renderCard()}
          {showConfetti && (
            <ConfettiCannon
              count={100}
              origin={{ x: screenWidth / 2, y: 0 }}
              fadeOut
              autoStart
            />
          )}
        </View>
      </ImageBackground>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  container: {
    flex: 1,
  },
  viewCardContent: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  card: {
    width: screenWidth * 0.9,
    height: 550,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    justifyContent: 'center',
    position: 'relative',
    top: '15%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  mainImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  smallImage: {
    width: '48%',
    height: 80,
    borderRadius: 10,
  },
  trailInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#E0F7FA',
    borderRadius: 15,
    padding: 10,
  },
});

export default AddAdventure;