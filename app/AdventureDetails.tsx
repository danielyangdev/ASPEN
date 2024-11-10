import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

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
    paddingVertical: 10, // Increase padding for larger touch area
    paddingHorizontal: 5,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Removed background color
    borderRadius: 10,
  },
  backButtonText: {
    fontSize: 24, // Larger font size
    color: '#fff',
  },
});

export default AdventureDetails;