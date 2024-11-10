import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface CalendarEvent {
  id: string;
  summary: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: string;
}

const Calendar = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]); 
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
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.authorization_url) {
          // In a real mobile app, you'd use WebBrowser.openAuthSessionAsync
          // For testing, we'll just log the URL
          console.log('Auth URL:', data.authorization_url);
          Alert.alert(
            'Authentication Required',
            'For testing: Open this URL in your browser:\n' + data.authorization_url
          );
        }
        setIsAuthenticated(true);
        syncGoogleCalendar();
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      console.error('Sign in error:', error);
      Alert.alert('Error', 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const syncGoogleCalendar = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:8000/calendar/events');
      
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
        Alert.alert('Success', 'Calendar synchronized successfully!');
      } else {
        throw new Error('Failed to fetch calendar events');
      }
    } catch (error) {
      console.error('Calendar sync error:', error);
      Alert.alert('Error', 'Failed to sync calendar events');
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
        setEvents([]);
        Alert.alert('Success', 'Signed out successfully');
      } else {
        throw new Error('Failed to sign out');
      }
    } catch (error) {
      console.error('Sign out error:', error);
      Alert.alert('Error', 'Failed to sign out');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar</Text>

      {/* Auth Buttons */}
      {!isAuthenticated ? (
        <TouchableOpacity 
          style={styles.syncButton} 
          onPress={handleGoogleSignIn}
          disabled={isLoading}
        >
          <Text style={styles.syncButtonText}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.syncButton} 
            onPress={syncGoogleCalendar}
            disabled={isLoading}
          >
            <Text style={styles.syncButtonText}>
              Sync Calendar
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.syncButton, styles.signOutButton]} 
            onPress={handleSignOut}
            disabled={isLoading}
          >
            <Text style={styles.syncButtonText}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Loading Indicator */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}

      {/* Upcoming Events List */}
      <Text style={styles.subtitle}>Upcoming Events:</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const { date, time } = formatDateTime(item.start.dateTime);
          return (
            <View style={styles.eventContainer}>
              <Text style={styles.eventTitle}>{item.summary}</Text>
              <Text style={styles.eventDetails}>{date} | {time}</Text>
              {item.location && (
                <Text style={styles.eventLocation}>📍 {item.location}</Text>
              )}
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>
            {isAuthenticated ? 'No events found' : 'Sign in to view your events'}
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
  buttonContainer: {
    gap: 10,
    marginVertical: 15,
  },
  syncButton: {
    backgroundColor: '#4682B4',
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
    marginVertical: 5,
  },
  signOutButton: {
    backgroundColor: '#DC3545',
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
  eventLocation: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  nextButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
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
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Calendar;