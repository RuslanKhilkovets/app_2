import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import Character from '@images/character_2.png';
import Arrow from '@images/arrow_1.png';
import Menu from '@images/menu.png';

const Slide1 = () => {
  return (
    <View style={styles.slide}>
      <Image style={styles.characterImage} source={Character} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Створення публікації</Text>
        <Image source={Arrow} style={styles.titleAfterElement} />
      </View>
      <Image source={Menu} style={styles.menuImage} />
      <Text style={styles.slideDescription}>
        За допомогою цієї кнопки в меню можна опублікувати знахідку або згубу
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    backgroundColor: '#FFEAEA',
    flex: 1,
    alignItems: 'center',
    paddingTop: 300,
  },

  characterImage: {
    width: 300,
    height: 300,
    position: 'absolute',
    top: 0,
    right: 0,
  },
  title: {
    color: '#000',
    fontWeight: '700',
    fontSize: 26,
    fontFamily: 'Raleway-SemiBold',
    lineHeight: 26,
  },
  titleContainer: {
    position: 'relative',
  },
  titleAfterElement: {
    position: 'absolute',
    right: 80,
    top: 25,
  },
  menuImage: {
    marginTop: 40,
    width: '100%',
  },
  slideDescription: {
    marginTop: 20,
    maxWidth: 314,
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
    lineHeight: 17,
    textAlign: 'center',
    color: '#000',
    fontWeight: '400',
  },
});

export default Slide1;
