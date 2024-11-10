import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AdventureDetails = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../assets/images/universal-studios.png')}
        style={styles.backgroundImage}
      />

      {/* Content Container */}
      <View style={styles.contentContainer}>
        <View style={styles.handle} />
        <Text style={styles.title}>Universal Studios:</Text>

        {/* Icons and Information */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Image source={require('../assets/images/money-sign.png')} style={styles.icon} />
            <Text style={styles.infoText}>$10</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={require('../assets/images/star.png')} style={styles.icon} />
            <Text style={styles.infoText}>4.5/5</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={require('../assets/images/calendar.png')} style={styles.icon} />
            <Text style={styles.infoText}>Nov 11th, 8:00am - 5:00pm</Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={require('../assets/images/location.png')} style={styles.icon} />
            <Text style={styles.infoText}>
              100 Universal City Plaza, Universal City, CA 91608
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Image source={require('../assets/images/person.png')} style={styles.icon} />
            <Text style={styles.infoText}>Ally Wang, Beatrice Smith, Christopher Lee</Text>
          </View>
        </View>

        {/* Description */}
        <ScrollView style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            Universal Studios is a major entertainment complex featuring a blend of thrilling
            amusement park rides, engaging movie-based attractions, and studio tours set in the
            vibrant ambiance of Hollywood magic. Created by Universal Pictures, the theme parks
            are designed around popular film franchises, inviting guests to immerse themselves in
            themed worlds inspired by movies like Harry Potter, Jurassic Park, The Simpsons, and
            Despicable Me.
          </Text>
        </ScrollView>
      </View>

      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Back</Text>
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
  },
  descriptionContainer: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default AdventureDetails;