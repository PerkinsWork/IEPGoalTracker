import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { streamStudents, addStudent } from '../services/repository';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  useEffect(() => {
    const unsub = streamStudents(setStudents);
    return unsub;
  }, []);

  const onAdd = () => {
    if (!name) return;
    addStudent({ name, grade });
    setName('');
    setGrade('');
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text>{item.name} - {item.grade}</Text>
        )}
      />
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginTop: 8, padding: 4 }}
      />
      <TextInput
        placeholder="Grade"
        value={grade}
        onChangeText={setGrade}
        style={{ borderWidth: 1, marginTop: 8, padding: 4 }}
      />
      <Button title="Add Student" onPress={onAdd} />
    </View>
  );
}
