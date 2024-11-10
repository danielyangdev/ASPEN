import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Platform } from 'react-native';
import { Card, Button, Text, ActivityIndicator, useTheme } from 'react-native-paper';
import { Calendar } from 'lucide-react';
import { Clock } from 'lucide-react';
import { LogIn } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { MapPin } from 'lucide-react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

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

export default function HomeScreen() {
  const theme = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/auth/google/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        // Handle the auth URL or token
        setIsLoggedIn(true);
        fetchCalendarEvents();
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('http://localhost:8000/auth/google/signout', {
        method: 'POST',
      });
      setIsLoggedIn(false);
      setEvents([]);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const fetchCalendarEvents = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/calendar/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeStr: string) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString();
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.container}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <ThemedView style={styles.titleContainer}>
              <ThemedText style={styles.iconText}>📅</ThemedText>
              <Text variant="headlineMedium">Calendar Hub</Text>
            </ThemedView>
            
            {!isLoggedIn ? (
              <Button
                mode="contained"
                loading={loading}
                onPress={handleGoogleSignIn}
                style={styles.button}>
                Sign in with Google
              </Button>
            ) : (
              <Button
                mode="outlined"
                onPress={handleSignOut}
                style={styles.button}>
                Sign Out
              </Button>
            )}
          </Card.Content>
        </Card>

        {isLoggedIn && (
          <ThemedView style={styles.eventsContainer}>
            <Text variant="titleLarge" style={styles.sectionTitle}>
              Upcoming Events
            </Text>
            
            {loading ? (
              <ActivityIndicator animating={true} size="large" />
            ) : events.length === 0 ? (
              <Text>No upcoming events found</Text>
            ) : (
              events.map((event) => (
                <Card key={event.id} style={styles.eventCard}>
                  <Card.Content>
                    <Text variant="titleMedium">{event.summary}</Text>
                    
                    <ThemedView style={styles.eventDetails}>
                      <ThemedView style={styles.eventTime}>
                        <ThemedText style={styles.iconText}>🕐</ThemedText>
                        <Text variant="bodyMedium" style={styles.eventText}>
                          {formatDateTime(event.start.dateTime)}
                        </Text>
                      </ThemedView>
                      
                      {event.location && (
                        <ThemedView style={styles.eventLocation}>
                          <ThemedText style={styles.iconText}>📍</ThemedText>
                          <Text variant="bodyMedium" style={styles.eventText}>
                            {event.location}
                          </Text>
                        </ThemedView>
                      )}
                    </ThemedView>
                  </Card.Content>
                </Card>
              ))
            )}
          </ThemedView>
        )}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  iconText: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  headerCard: {
    marginBottom: 16,
    elevation: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
  eventsContainer: {
    gap: 16,
  },
  sectionTitle: {
    marginBottom: 12,
  },
  eventCard: {
    marginBottom: 12,
    elevation: 2,
  },
  eventDetails: {
    marginTop: 8,
    gap: 8,
  },
  eventTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  eventText: {
    flex: 1,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});