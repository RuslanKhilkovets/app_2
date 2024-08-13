import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Slide1 = () => {
  return (
    <View style={styles.slide}>
      <Image
        style={styles.characterImage}
        source={require('../../../assets/images/character_2.png')}
      />
      <View style={styles.mainContent}>

      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Створення публікації
        </Text>
        <Image source={require('../../../assets/images/arrow_1.png')} style={styles.titleAfterElement} />
      </View>
      <Image source={require('../../../assets/images/menu.png')} style={styles.menuImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    backgroundColor: '#FFEAEA',
    flex: 1,
    alignItems: 'center',
    paddingTop: 54,
  },
  mainContent: {
    marginTop: 250
  },
  characterImage: {
    width: 300,
    height: 300,
    position: "absolute",
    top: 0,
    right: 0,
  },
  title: {
    color: "#000",
    fontWeight: "700",
    fontSize: 26,
    fontFamily: "Raleway",
    lineHeight: 26
  },
  titleContainer: {
    position: "relative"
  },
  titleAfterElement: {
    position: "absolute",
    right: 80,
    top: 25
  },
  menuImage: {
    marginTop: 40,
    width: "100%"
  }
});

export default Slide1;