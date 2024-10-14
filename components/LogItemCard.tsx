import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LogItemCard = ({ type, description, timestamp }: { type: string; description: string; timestamp: string }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.type}>{type.toUpperCase()}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.timestamp}>{timestamp}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  type: {
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    color: '#ccc',
  },
  timestamp: {
    color: '#777',
    fontSize: 12,
  },
});

export default LogItemCard;
