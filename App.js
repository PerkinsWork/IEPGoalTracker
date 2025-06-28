import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from '@screens/Home';
import AuthScreen from './screens/AuthScreen';
import TeamSeats from './screens/TeamSeats';
import Billing from './screens/Billing';
import RequireAuth from './components/RequireAuth';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthScreen />} />
        <Route path="/signup" element={<AuthScreen mode="signup" />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/team" element={<TeamSeats />} />
          <Route path="/billing" element={<Billing />} />
        </Route>
      </Routes>
    </Router>
  );
}
