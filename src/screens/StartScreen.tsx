import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import Character from '@images/character.png';

const StartScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.slide}>
      <Text style={styles.title}>Хей! Вітаю в єЗнахідці</Text>

      <Text style={styles.description}>
        Тут ти можеш знайти загублені речі, а також допомогти іншим знайти їх
      </Text>

      <View style={styles.actionsView}>
        <Text style={styles.actionsTitle}>Ти вже користувався додатком?</Text>
        <View style={styles.actionsButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('StartSlider')}
            activeOpacity={0.7}>
            <Text style={styles.linkText}>Я новий користувач</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SignForms', {action: 'auth'})}
            activeOpacity={0.7}>
            <Text style={styles.linkText}>Вже маю акаунт</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image style={styles.characterImage} source={Character} />
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
    fontWeight: '600',
    fontFamily: 'Raleway-Medium',
    color: '#000000',
    marginBottom: 10,
  },
  description: {
    marginTop: 16,
    fontSize: 15,
    fontWeight: '400',
    color: '#000',
    textAlign: 'center',
    maxWidth: 264,
  },
  actionsView: {
    padding: 29,
    marginTop: 30,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  actionsTitle: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Raleway',
    color: '#fff',
    marginBottom: 10,
  },
  actionsButtons: {
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 27,
    width: '100%',
    marginTop: 10,
  },
  linkText: {
    fontSize: 15,
    color: '#fff',
    textDecorationLine: 'underline',
  },
  characterImage: {
    position: 'absolute',
    bottom: 0,
    height: 500,
    width: 459,
  },
});

export default StartScreen;
