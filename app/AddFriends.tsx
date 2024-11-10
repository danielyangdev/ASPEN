import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native';

const AddFriends = () => {
  interface Friend {
    id: string;
    name: string;
    phoneNumber: string;
    photo: { uri: string } | null;
  }

  const [friends, setFriends] = useState<Friend[]>([]);
  const [contactsSynced, setContactsSynced] = useState(false);
  const navigation = useNavigation();

  // Sync contacts function
  const syncContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.Name, Contacts.Fields.Image, Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        const contactsData = data.map((contact, index) => ({
          id: index.toString(),
          name: contact.name || 'Unknown',
          phoneNumber: contact.phoneNumbers && contact.phoneNumbers.length > 0 
            ? String(contact.phoneNumbers[0].number) 
            : 'No phone number',
          photo: contact.imageAvailable && contact.image && contact.image.uri ? { uri: contact.image.uri } : null,
        }));

        setFriends(contactsData);
        setContactsSynced(true); // Hide button after syncing
      } else {
        Alert.alert('No contacts found', 'Your contact list is empty.');
      }
    } else {
      Alert.alert('Permission denied', 'Unable to access contacts.');
    }
  };

  // Handle adding a friend
  const handleAddFriend = (id: string) => {
    setFriends((prevFriends) => prevFriends.filter(friend => friend.id !== id));
  };

  // Navigate to Calendar page if all friends are added
  useEffect(() => {
    if (contactsSynced && friends.length === 0) {
      navigation.navigate('Calendar');
    }
  }, [friends, contactsSynced]);

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* Introductory Text */}
      {!contactsSynced && (
        <>
          <Text style={styles.title}>Let's add your friends</Text>
          <Text style={styles.subtitle}>Find your friends on Aspen!</Text>
        </>
      )}

      {/* Sync Contacts Button */}
      {!contactsSynced && (
        <TouchableOpacity style={styles.syncButton} onPress={syncContacts}>
          <Text style={styles.syncButtonText}>Sync contacts</Text>
        </TouchableOpacity>
      )}

      {/* Friends List - Only show if there are contacts */}
      {friends.length > 0 && (
        <>
          <Text style={styles.boldSubtitle}>Your friends on Aspen:</Text>
          <FlatList
            data={friends}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.friendContainer}>
                <View style={styles.friendInfo}>
                  <Image
                    source={item.photo ? item.photo : require('@/assets/images/default-avatar.png')}
                    style={styles.avatar}
                  />
                  <View>
                    <Text style={styles.friendName}>{item.name}</Text>
                    <Text style={styles.friendPhone}>
                      {item.phoneNumber || 'No phone number'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => handleAddFriend(item.id)}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
            ListFooterComponent={() => (
              <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('Calendar')}
              >
                <Text style={styles.nextButtonText}>→</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff', // White background color
    paddingTop: 100, // Move everything down
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
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  boldSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  syncButton: {
    backgroundColor: '#f2f2f2', // Light background for button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000', // Black border to match style
    marginVertical: 15,
  },
  syncButtonText: {
    fontSize: 16,
    color: '#000',
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ccc',
    marginRight: 10,
  },
  friendName: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendPhone: {
    color: '#000',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    backgroundColor: '#000',
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default AddFriends;