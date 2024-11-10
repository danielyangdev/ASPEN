import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface TimeSlot {
  id: string;
  start: string;
  end: string;
  busy: boolean;
}

interface FreeBusyResponse {
  timeMin: string;
  timeMax: string;
  calendars: {
    [key: string]: {
      busy: Array<{
        start: string;
        end: string;
      }>;
    };
  };
}

const Calendar = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigation = useNavigation();

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/auth/google/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authorization_url) {
          Alert.alert(
            'Authentication Required',
            'For testing: Open this URL in your browser:\n' + data.authorization_url
          );
        }
        setIsAuthenticated(true);
        checkAvailability();
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const checkAvailability = async () => {
    try {
      setIsLoading(true);
      const now = new Date();
      const timeMin = now.toISOString();
      const timeMax = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();

      const response = await fetch('http://localhost:8000/calendar/freebusy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ timeMin, timeMax, items: [{ id: 'primary' }] }),
      });
      
      if (response.ok) {
        const data: FreeBusyResponse = await response.json();
        const slots: TimeSlot[] = [];
        const currentDate = new Date(now);
        
        for (let day = 0; day < 7; day++) {
          for (let hour = 9; hour < 17; hour++) {
            const slotStart = new Date(currentDate);
            slotStart.setHours(hour, 0, 0, 0);
            
            const slotEnd = new Date(currentDate);
            slotEnd.setHours(hour + 1, 0, 0, 0);

            const isBusy = data.calendars.primary.busy.some(busySlot => {
              const busyStart = new Date(busySlot.start);
              const busyEnd = new Date(busySlot.end);
              return (
                (slotStart >= busyStart && slotStart < busyEnd) ||
                (slotEnd > busyStart && slotEnd <= busyEnd)
              );
            });

            slots.push({
              id: `${slotStart.toISOString()}`,
              start: slotStart.toISOString(),
              end: slotEnd.toISOString(),
              busy: isBusy
            });
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }

        setTimeSlots(slots);
        Alert.alert('Success', 'Calendar availability checked successfully!');
      } else {
        throw new Error('Failed to fetch calendar availability');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to check calendar availability');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/auth/google/signout', {
        method: 'POST',
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        setTimeSlots([]);
        Alert.alert('Success', 'Signed out successfully');
      } else {
        throw new Error('Failed to sign out');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Calendar Availability</Text>

      {/* Auth Buttons */}
      {!isAuthenticated ? (
        <TouchableOpacity 
          style={styles.authButton} 
          onPress={handleGoogleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.authButtonText}>Sign in with Google</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.authButton} 
            onPress={checkAvailability}
            disabled={isLoading}
          >
            <Text style={styles.authButtonText}>Check Availability</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.authButton, styles.signOutButton]} 
            onPress={handleSignOut}
            disabled={isLoading}
          >
            <Text style={styles.authButtonText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}

      {/* Time Slots List */}
      <Text style={styles.subtitle}>Available Time Slots:</Text>
      <FlatList
        data={timeSlots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { date, time } = formatDateTime(item.start);
          return (
            <View style={[
              styles.slotContainer,
              item.busy ? styles.busySlot : styles.freeSlot
            ]}>
              <Text style={styles.slotTitle}>
                {item.busy ? '🔴 Busy' : '🟢 Available'}
              </Text>
              <Text style={styles.slotDetails}>{date} | {time}</Text>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            {isAuthenticated ? 'No time slots found' : 'Sign in to view availability'}
          </Text>
        )}
      />

      {/* Next Button */}
      <TouchableOpacity 
        style={styles.nextButton} 
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.nextButtonText}>→</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff', // White background for consistency
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 10,
    marginVertical: 15,
  },
  authButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 5,
  },
  signOutButton: {
    backgroundColor: '#FF5252',
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  slotContainer: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  freeSlot: {
    backgroundColor: '#4CAF50',
  },
  busySlot: {
    backgroundColor: '#FF5252',
  },
  slotTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  slotDetails: {
    color: '#fff',
    fontSize: 14,
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: 30,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#000',
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#000',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Calendar;