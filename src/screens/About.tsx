import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {Logo, Screen} from '@/components';

const About = () => {
  const handlePress = () => {
    Linking.openURL('mailto:company@gmail.com');
  };

  return (
    <Screen title="Про додаток" backColor="#fff" bgColor="#fff">
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Logo />
          <Text style={styles.title}>
            Тут ти можеш знайти загублені речі, а також допомогти іншим знайти
            їх
          </Text>
          <Text style={styles.subtitle}>© NameCompany</Text>
          <TouchableOpacity onPress={handlePress}>
            <Text style={styles.gmail}>company@gmail.com</Text>
          </TouchableOpacity>
        </View>

        <Image
          source={require('../../assets/images/character.png')}
          style={styles.img}
        />
      </View>

      <View style={{alignItems: 'center'}}>
        <Text style={styles.version}>версія 1.0</Text>
      </View>
    </Screen>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 100,
    position: 'relative',
  },
  title: {
    width: 264,
    marginVertical: 30,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    color: '#000',
    fontSize: 15,
  },
  subtitle: {
    fontFamily: 'Raleway-Semibold',
    fontSize: 15,
  },
  gmail: {
    marginTop: 14,
    fontFamily: 'Raleway-Medium',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  img: {
    width: 220,
    height: 240,
    position: 'absolute',
    bottom: -125,
    right: -50,
  },
  version: {
    fontFamily: 'Raleway-Regular',
    color: '#757575',
    fontSize: 15,
  },
});
