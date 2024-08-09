import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Slide2 = () => {
  return (
    <View style={[styles.slide, { backgroundColor: '#00b4d8' }]}>
      <Text style={styles.title}>Organize Your Tasks</Text>
      <Text style={styles.description}>Easily categorize and prioritize your tasks.</Text>
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

export default Slide2;
