import React, { useState } from 'react';
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
  const navigation = useNavigation();

  // Function to sync contacts
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
            : 'No phone number',  // Ensure phone number is always a string
          photo: contact.imageAvailable && contact.image && contact.image.uri ? { uri: contact.image.uri } : null,
        }));
        
        setFriends(contactsData);
      } else {
        Alert.alert('No contacts found', 'Your contact list is empty.');
      }
    } else {
      Alert.alert('Permission denied', 'Unable to access contacts.');
    }
  };

  // Function to handle adding a friend and removing from the list
  const handleAddFriend = (id: string) => {
    setFriends((prevFriends) => prevFriends.filter(friend => friend.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD FRIENDS</Text>

      {/* Sync Contacts Button */}
      <TouchableOpacity style={styles.syncButton} onPress={syncContacts}>
        <Text style={styles.syncButtonText}>Sync contacts</Text>
      </TouchableOpacity>

      {/* Friends List - Only show if there are contacts */}
      {friends.length > 0 && (
        <>
          <Text style={styles.subtitle}>Your friends on Aspen:</Text>
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
                      {item.phoneNumber ? item.phoneNumber : 'No phone number'}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => handleAddFriend(item.id)}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      )}

      {/* Next Button */}
      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate('Calendar')}
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
    marginTop: 50,
    marginBottom: 20,
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
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5A9BD4',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  friendPhone: { // New style for phone number
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  nextButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: '#4682B4',
    borderRadius: 25,
  },
  nextButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default AddFriends;