import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from './types'; // Ensure this import path is correct

const adventures = [
  {
    id: '1',
    title: 'Universal Studios',
    date: 'Nov 11th, 8:00am',
    image: require('../assets/images/universal-studios.png'),
    price: 80,
    stars: '4.5/5',
    location: '100 Universal City Plaza, Universal City, CA 91608',
    people: 'Ally Wang, Beatrice Smith, Christopher Lee',
    description: 'Universal Studios is a major entertainment complex featuring a blend of thrilling amusement park rides, engaging movie-based attractions, and studio tours set in the vibrant ambiance of Hollywood magic. Created by Universal Pictures, the theme parks are designed around popular film franchises, inviting guests to immerse themselves in themed worlds inspired by movies like Harry Potter, Jurassic Park, The Simpsons, and Despicable Me.',
  },
  {
    id: '2',
    title: 'Skydiving Oceanside',
    date: 'Nov 16th, 2:00pm',
    image: require('../assets/images/oceanside-skydiving.png'),
    price: Math.floor(Math.random() * 91) + 10, // Random price from 10 to 100
    stars: (4.1 + Math.random() * 0.8).toFixed(1) + '/5', // Random rating from 4.1 to 4.9
    location: 'Oceanside, CA',
    people: 'John Doe, Jane Smith',
    description: 'Experience the thrill of a lifetime with skydiving over the stunning coast of Oceanside. Feel the rush as you jump from thousands of feet above, freefalling through the sky, and enjoy breathtaking views of the Pacific Ocean and the scenic Californian coastline. This adventure is perfect for thrill-seekers and adrenaline lovers looking for an unforgettable, heart-pounding experience.',
  },
  {
    id: '3',
    title: 'USC vs Nebraska',
    date: 'Nov 16th, 7:00pm',
    image: require('../assets/images/usc-football.png'),
    price: Math.floor(Math.random() * 91) + 10,
    stars: (4.1 + Math.random() * 0.8).toFixed(1) + '/5',
    location: 'Los Angeles Memorial Coliseum, CA',
    people: 'Mike Johnson, Sarah Lee, Kevin Yu',
    description: 'Join the roaring crowds at the historic Los Angeles Memorial Coliseum for a thrilling college football showdown between the USC Trojans and the Nebraska Cornhuskers. With decades of tradition and fierce rivalry, this game promises to deliver intense action, passionate fans, and an electric atmosphere as two iconic teams battle for victory on the gridiron. An event not to be missed for sports enthusiasts and USC fans alike.',
  },
  {
    id: '4',
    title: 'Los Angeles County Museum',
    date: 'Nov 25th, 10:00am',
    image: require('../assets/images/la-county-museum.png'),
    price: Math.floor(Math.random() * 91) + 10,
    stars: (4.1 + Math.random() * 0.8).toFixed(1) + '/5',
    location: '5905 Wilshire Blvd, Los Angeles, CA 90036',
    people: 'Emily Carter, Rachel Adams',
    description: 'Step into a world of art, history, and culture at the Los Angeles County Museum of Art (LACMA). As the largest art museum in the western United States, LACMA offers an expansive collection ranging from ancient artifacts to contemporary masterpieces. With exhibitions that span cultures, eras, and media, visitors can marvel at everything from Renaissance paintings to modern sculptures. Perfect for art lovers, history buffs, and anyone looking to be inspired by human creativity.',
  },
  {
    id: '5',
    title: 'Big Bear Lake',
    date: 'Dec 13th, 7:00am',
    image: require('../assets/images/big-bear.png'),
    price: Math.floor(Math.random() * 91) + 10,
    stars: (4.1 + Math.random() * 0.8).toFixed(1) + '/5',
    location: 'Big Bear Lake, CA',
    people: 'Lucas Gray, Monica Reyes, Justin Kim',
    description: 'Escape to the serene beauty of Big Bear Lake, nestled in the San Bernardino Mountains. This scenic getaway offers pristine waters, stunning mountain views, and a tranquil atmosphere perfect for relaxation and outdoor activities. Enjoy fishing, kayaking, hiking, and exploring local trails surrounded by lush forests and wildlife. Whether you’re looking for adventure or peace and quiet, Big Bear Lake is an ideal destination to unwind and connect with nature.',
  },
  {
    id: '6',
    title: 'Yosemite National Park',
    date: 'Dec 20th, 11:00am',
    image: require('../assets/images/yosemite-park.png'),
    price: Math.floor(Math.random() * 91) + 10,
    stars: (4.1 + Math.random() * 0.8).toFixed(1) + '/5',
    location: 'Yosemite National Park, CA',
    people: 'Sophia Chen, Tom Parker, Lisa Tran',
    description: 'Discover the awe-inspiring landscapes of Yosemite National Park, one of America’s most beloved natural wonders. From towering granite cliffs and cascading waterfalls to sprawling meadows and ancient giant sequoias, Yosemite offers a breathtaking array of scenery. Whether you’re hiking, camping, or photographing the majestic views, each moment spent here is a reminder of nature’s grandeur. Ideal for nature enthusiasts, adventurers, and anyone seeking tranquility in the heart of the wilderness.',
  }
];

const Home = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/images/home-background.png')} style={styles.backgroundImage} />

      <Text style={styles.title}>Take on a new{"\n"}adventure</Text>

      <View style={styles.upcomingContainer}>
        <Text style={styles.subtitle}>Upcoming Adventures:</Text>

        <ScrollView contentContainerStyle={styles.adventureList} showsVerticalScrollIndicator={false}>
          {adventures.map(adventure => (
            <View key={adventure.id} style={styles.adventureCard}>
              <Image source={adventure.image} style={styles.adventureImage} />
              <View style={styles.adventureInfo}>
                <Text style={styles.adventureTitle}>{adventure.title}</Text>
                <View style={styles.adventureDateContainer}>
                  <Image source={require('../assets/images/calendar.png')} style={styles.calendarIcon} />
                  <Text style={styles.adventureDate}>{adventure.date}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => navigation.navigate('AdventureDetails', {
                  title: adventure.title,
                  date: adventure.date,
                  image: adventure.image,
                  price: adventure.price,
                  stars: adventure.stars,
                  location: adventure.location,
                  people: adventure.people,
                  description: adventure.description,
                })}
              >
                <Text style={styles.viewButtonText}>View</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View style={styles.bottomOverlay} />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAdventure')}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backgroundImage: {
    position: 'absolute',
    width: '145%',
    marginLeft: '-40%',
    height: '90%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',      
    alignSelf: 'flex-start',  
    paddingLeft: 20,
    marginTop: 90,
  },
  upcomingContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    marginTop: 240,   // change height of card
    paddingHorizontal: 20,
    paddingBottom: 80, // Extra padding to make space for the blur effect
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    textAlign: 'left',
    fontWeight: '600',
    marginBottom: 20,
  },
  adventureList: {
    paddingBottom: 40, // Space for the add button
  },
  adventureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D1E8E4',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  adventureImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  adventureInfo: {
    flex: 1,
    marginLeft: 10,
  },
  adventureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  adventureDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  calendarIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  adventureDate: {
    fontSize: 14,
    color: '#333',
  },
  viewButton: {
    backgroundColor: '#87CEEB',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#87CEEB',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    opacity: 0.8,
  },
});

export default Home;