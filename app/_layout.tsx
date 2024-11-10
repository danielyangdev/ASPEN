// _layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="SignUpScreen" />
      <Stack.Screen name="AddFriends" />
      <Stack.Screen name="Home" />
      <Stack.Screen name="AdventureDetails" />
      <Stack.Screen name="AddAdventure" />
      <Stack.Screen name="Calendar" />
      {/* Add other screens here */}
    </Stack>
  );
}