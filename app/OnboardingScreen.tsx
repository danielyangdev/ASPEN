import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Define the navigation type for your stack
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

const OnboardingScreen = () => {
  // Type `useNavigation` to know the screen names
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adventure App</Text>
      <Button
        title="Log In"
        // Uncomment and add navigation target once login screen is created
        // onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        color="#1E90FF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
});

export default OnboardingScreen;