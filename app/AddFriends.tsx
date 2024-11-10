import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const friends = [
  { id: '1', name: 'Name', username: 'username', photo: null },
  { id: '2', name: 'Name', username: 'username', photo: null },
  { id: '3', name: 'Name', username: 'username', photo: null },
  { id: '4', name: 'Name', username: 'username', photo: null },
];

const AddFriends = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ADD FRIENDS</Text>

      {/* Sync Contacts Button */}
      <TouchableOpacity style={styles.syncButton}>
        <Text style={styles.syncButtonText}>Sync contacts</Text>
      </TouchableOpacity>

      {/* Friends List */}
      <Text style={styles.subtitle}>Your friends on ___:</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendContainer}>
            <View style={styles.friendInfo}>
              <Image
                // source={item.photo || require('@/assets/images/default-avatar.png')}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.friendUsername}>{item.username}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        )}
      />

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
  friendUsername: {
    color: '#fff',
    fontSize: 14,
  },
  addButton: {
    backgroundColor: '#B0C4DE',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 15,
  },
  addButtonText: {
    color: '#4682B4',
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

export default AddFriends;