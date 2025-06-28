import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { app, db } from '../services/firebase';
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { httpsCallable, getFunctions } from 'firebase/functions';
import { auth } from '../services/auth';
import { sendInvite } from '../services/invites';

export default function TeamSeats() {
  const [user, setUser] = useState(null);
  const [invites, setInvites] = useState([]);
  const [seats, setSeats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ref = doc(db, 'users', auth.currentUser.uid);
    const unsub = onSnapshot(ref, (snap) => setUser(snap.data()));
    const iRef = collection(db, 'invites');
    const unsubI = onSnapshot(iRef, (snap) => {
      const rows = snap.docs.filter(d => d.data().uid === auth.currentUser.uid).map(d => ({ id: d.id, ...d.data(), status: 'Pending' }));
      setInvites(rows);
    });
    const sRef = collection(db, 'users', auth.currentUser.uid, 'seats');
    const unsubS = onSnapshot(sRef, (snap) => {
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data(), status: 'Active' }));
      setSeats(rows);
    });
    return () => { unsub(); unsubI(); unsubS(); };
  }, []);

  const invite = async (email) => {
    if (user.seatsUsed >= user.seatsAllowed) return navigate('/billing');
    await sendInvite(email);
  };

  return (
    <View style={{ padding: 16 }}>
      {user && (
        <Text>Plan: {user.subscriptionTier} {user.seatsUsed}/{user.seatsAllowed}</Text>
      )}
      <FlatList
        data={[...seats, ...invites]}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Text>{item.email} - {item.status}</Text>
        )}
      />
      <Button title="Invite" onPress={() => invite(prompt('Email'))} />
      <Button title="Manage Billing" onPress={async () => {
        const fn = httpsCallable(getFunctions(app), 'billingPortal');
        const res = await fn({ customerId: user.customerId, returnUrl: window.location.origin + '/team' });
        window.location.href = res.data.url;
      }} />
    </View>
  );
}
