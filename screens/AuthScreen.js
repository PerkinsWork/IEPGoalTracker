import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInEmail, signUpEmail, signInGoogle, signInMicrosoft } from '../services/auth';

export default function AuthScreen({ mode = 'signin' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const loc = useLocation();
  mode = loc.pathname === '/signup' ? 'signup' : 'signin';

  const submit = async () => {
    try {
      if (mode === 'signup') await signUpEmail(email, password);
      else await signInEmail(email, password);
      navigate('/');
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <Text>{mode === 'signup' ? 'Sign Up' : 'Sign In'}</Text>
      {error ? <Text>{error}</Text> : null}
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginVertical: 4 }} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={{ borderWidth: 1, marginVertical: 4 }} />
      <Button title={mode === 'signup' ? 'Create Account' : 'Sign In'} onPress={submit} />
      <Button title="Google" onPress={() => signInGoogle().then(() => navigate('/')).catch(e => setError(e.message))} />
      <Button title="Microsoft" onPress={() => signInMicrosoft().then(() => navigate('/')).catch(e => setError(e.message))} />
    </View>
  );
}
