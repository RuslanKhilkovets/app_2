import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Slide1 = () => {
  return (
    <View style={[styles.slide]}>
      <Text style={styles.title}>Хей! Вітаю в єЗнахідці</Text>
      <Text style={styles.description}>
        Тут ти можеш знайти загублені речі, 
        а також допомогти іншим знайти їх
    </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    backgroundColor: '#EDE7FF',
    flex: 1,
    alignItems: 'center',
    paddingTop: 54,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    fontFamily: "Raleway",
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: "400",
    color: '#000',
    textAlign: 'center',
    maxWidth: 264
  },
});

export default Slide1;
