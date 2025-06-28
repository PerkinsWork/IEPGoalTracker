import React from 'react';
import { View, Text } from 'react-native-web';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { API_URL } from 'react-native-dotenv';

const HomeScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Home - API: {API_URL}</Text>
  </View>
);

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}
