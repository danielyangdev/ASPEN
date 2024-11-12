import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const AdventureDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {
    title,
    date,
    image,
    price,
    stars,
    location,
    people,
    description
  } = route.params;

  const [fontsLoaded] = useFonts({
    'KohSantepheap-Regular': require('../assets/fonts/KohSantepheap-Regular.ttf'),
    'KohSantepheap-Bold': require('../assets/fonts/KohSantepheap-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={image} style={styles.backgroundImage} />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        <View style={styles.handle} />
        <Text style={styles.title}>{title}</Text>

        {/* Icons and Information */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Image source={require('../assets/images/money-sign.png')} style={styles.icon} />
            <Text style={styles.infoText}>${price}</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={require('../assets/images/star.png')} style={styles.icon} />
            <Text style={styles.infoText}>{stars}</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={require('../assets/images/calendar.png')} style={styles.icon} />
            <Text style={styles.infoText}>{date}</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={require('../assets/images/location.png')} style={styles.icon} />
            <Text style={styles.infoText}>{location}</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={require('../assets/images/person.png')} style={styles.icon} />
            <Text style={styles.infoText}>{people}</Text>
          </View>
        </View>

        {/* Description */}
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>{description}</Text>
        </ScrollView>

        {/* View More Button */}
        <TouchableOpacity style={styles.viewMoreButton} onPress={() => {}}>
          <Text style={styles.viewMoreButtonText}>View More</Text>
        </TouchableOpacity>
      </View>

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: '40%',
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  contentContainer: {
    position: 'absolute',
    top: '35%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    flex: 1,
    height: '65%',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#000',
    fontFamily: 'KohSantepheap-Bold', 
  },
  infoContainer: {
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  infoText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'KohSantepheap-Regular', 
  },
  descriptionContainer: {
    flex: 1,
    marginBottom: 20, 
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    fontFamily: 'KohSantepheap-Regular', 
  },
  viewMoreButton: {
    backgroundColor: '#D1E8E4', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 40, 
    alignSelf: 'center', 
  },
  viewMoreButtonText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'KohSantepheap-Regular', 
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#fff',
    fontFamily: 'KohSantepheap-Regular', 
  },
});

export default AdventureDetails;