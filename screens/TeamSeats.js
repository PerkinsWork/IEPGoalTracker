import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import { collection, doc, onSnapshot, addDoc, getDoc, deleteDoc, updateDoc, increment } from 'firebase/firestore';
import { auth } from '../services/auth';
import { sendInvite } from '../services/invites';

export default function TeamSeats() {
  const [user, setUser] = useState(null);
  const [invites, setInvites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const ref = doc(db, 'users', auth.currentUser.uid);
    const unsub = onSnapshot(ref, (snap) => setUser(snap.data()));
    const iRef = collection(db, 'invites');
    const unsubI = onSnapshot(iRef, (snap) => {
      const rows = snap.docs.filter(d => d.data().uid === auth.currentUser.uid).map(d => ({ id: d.id, ...d.data() }));
      setInvites(rows);
    });
    return () => { unsub(); unsubI(); };
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
        data={invites}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <Text>{item.email} - {item.status || 'Pending'}</Text>
        )}
      />
      <Button title="Invite" onPress={() => invite(prompt('Email'))} />
      <Button title="Manage Billing" onPress={() => navigate('/billing')} />
    </View>
  );
}
