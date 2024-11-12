import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import * as Contacts from 'expo-contacts';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Calendar: undefined;
};
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

const AddFriends = () => {
  interface Friend {
    id: string;
    name: string;
    phoneNumber: string;
    photo: { uri: string } | null;
  }

  const [friends, setFriends] = useState<Friend[]>([]);
  const [contactsSynced, setContactsSynced] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    'KohSantepheap-Regular': require('../assets/fonts/KohSantepheap-Regular.ttf'), 
    'KohSantepheap-Bold': require('../assets/fonts/KohSantepheap-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

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
        setContactsSynced(true); 
      } else {
        Alert.alert('No contacts found', 'Your contact list is empty.');
      }
    } else {
      Alert.alert('Permission denied', 'Unable to access contacts.');
    }
  };

  const handleAddFriend = (id: string) => {
    setFriends((prevFriends) => prevFriends.filter(friend => friend.id !== id));
  };

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
          <Text style={styles.title}>Next, sync your contacts</Text>
          <Text style={styles.subtitle}>Aspen's better with friends!</Text>
        </>
      )}

      {/* Sync Contacts Button */}
      {!contactsSynced && (
        <TouchableOpacity style={styles.syncButton} onPress={syncContacts}>
          <Text style={styles.syncButtonText}>Sync contacts</Text>
        </TouchableOpacity>
      )}

      {/* Friends List */}
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
    backgroundColor: '#fff', 
    paddingTop: 100, 
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backButtonText: {
    fontSize: 24,
    color: '#000',
    fontFamily: 'KohSantepheap-Regular',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'KohSantepheap-Bold',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'KohSantepheap-Regular',
  },
  boldSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
    fontFamily: 'KohSantepheap-Regular',
  },
  syncButton: {
    backgroundColor: '#f2f2f2', 
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000', 
    marginVertical: 15,
  },
  syncButtonText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'KohSantepheap-Regular',
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#E0E0E0',
    padding: 15,
    fontFamily: 'KohSantepheap-Regular',
    borderRadius: 10,
    marginVertical: 5,
  },
  friendInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'KohSantepheap-Regular',
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
    fontFamily: 'KohSantepheap-Bold',
  },
  friendPhone: {
    color: '#000',
    fontSize: 14,
    fontFamily: 'KohSantepheap-Regular',
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
    fontFamily: 'KohSantepheap-Regular',
  },
  nextButton: {
    alignSelf: 'center',
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  nextButtonText: {
    fontSize: 24,
    fontFamily: 'KohSantepheap-Regular',
  },
});

export default AddFriends;