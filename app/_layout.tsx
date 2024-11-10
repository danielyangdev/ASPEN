// _layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="NameScreen" />
      <Stack.Screen name="LocationScreen" />
      <Stack.Screen name="InterestsScreen" />
      <Stack.Screen name="AddFriends" />
      <Stack.Screen name="Home" />
      <Stack.Screen name="AdventureDetails" />
      <Stack.Screen name="AddAdventure" />
      <Stack.Screen name="Calendar" />
    </Stack>
  );
}