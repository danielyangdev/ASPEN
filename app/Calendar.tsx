import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const sampleEvents = [
  { id: '1', title: 'Hiking Trip', date: '2024-11-10', time: '10:00 AM' },
  { id: '2', title: 'Camping Night', date: '2024-11-15', time: '6:00 PM' },
  { id: '3', title: 'Kayaking Adventure', date: '2024-11-18', time: '8:00 AM' },
];

const Calendar = () => {
  const [events, setEvents] = useState(sampleEvents); // Replace with API data once integrated
  const navigation = useNavigation();

  const syncGoogleCalendar = () => {
    // Placeholder function for Google Calendar sync
    console.log('Syncing with Google Calendar...');
    // Logic to fetch and update events would go here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>

      {/* Sync Google Calendar Button */}
      <TouchableOpacity style={styles.syncButton} onPress={syncGoogleCalendar}>
        <Text style={styles.syncButtonText}>Sync Google Calendar</Text>
      </TouchableOpacity>

      {/* Upcoming Events List */}
      <Text style={styles.subtitle}>Upcoming Events:</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.eventContainer}>
            <Text style={styles.eventTitle}>{item.title}</Text>
            <Text style={styles.eventDetails}>{item.date} | {item.time}</Text>
          </View>
        )}
      />

      {/* Next Button */}
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#87CEEB',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#fff',
  },
  syncButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 15,
  },
  syncButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    marginVertical: 10,
  },
  eventContainer: {
    backgroundColor: '#5A9BD4',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  eventTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDetails: {
    color: '#fff',
    fontSize: 14,
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default Calendar;