import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Slide3 = () => {
  return (
    <View style={[styles.slide, { backgroundColor: '#009688' }]}>
      <Text style={styles.title}>Stay on Track</Text>
      <Text style={styles.description}>Receive timely reminders to stay on top of your tasks.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
});

export default Slide3;
