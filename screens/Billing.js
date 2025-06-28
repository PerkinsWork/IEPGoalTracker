import React from 'react';
import { View, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { httpsCallable, getFunctions } from 'firebase/functions';
import { app } from '../services/firebase';

export default function Billing() {
  const navigate = useNavigate();
  const openCheckout = async () => {
    const fn = httpsCallable(getFunctions(app), 'createCheckout');
    const res = await fn({ successUrl: window.location.origin, cancelUrl: window.location.origin + '/billing' });
    window.location.href = res.data.url;
  };
  const openPortal = async () => {
    const fn = httpsCallable(getFunctions(app), 'billingPortal');
    const res = await fn({ returnUrl: window.location.origin });
    window.location.href = res.data.url;
  };
  return (
    <View style={{ padding: 16 }}>
      <Button title="Upgrade" onPress={openCheckout} />
      <Button title="Manage Billing" onPress={openPortal} />
      <Button title="Back" onPress={() => navigate('/team')} />
    </View>
  );
}
