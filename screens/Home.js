import React from 'react';
import { View, Text } from 'react-native';
import { API_URL } from 'react-native-dotenv';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home - API: {API_URL}</Text>
    </View>
  );
}
