import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import IRegisterData from '../../types/IRegisterData';

import CustomInput from '../UI/CustomInput';
import CustomButton from '../UI/CustomButton';

const SignUpForm = () => {
  const navigation = useNavigation();

  const [signData, setSignData] = useState<IRegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    passwordRepeat: '',
  });

  const onInputChange = (name: string) => (text: string) => {
    setSignData((prev: IRegisterData) => {
      return {
        ...prev,
        [name]: text,
      };
    });
  };

  const onSignUp = () => {
    navigation.navigate('EmailConfirmation');
  };

  const navToPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <CustomInput
          placeholder="Ім’я"
          value={signData.name}
          onChangeText={onInputChange('name')}
        />
        <CustomInput
          placeholder="E-mail"
          value={signData.email}
          onChangeText={onInputChange('email')}
        />
        <CustomInput
          placeholder="Телефон"
          value={signData.phone}
          onChangeText={onInputChange('phone')}
        />
        <CustomInput
          placeholder="Пароль"
          value={signData.password}
          onChangeText={onInputChange('password')}
          secureTextEntry
        />
        <CustomInput
          placeholder="Підтвердженння паролю"
          value={signData.passwordRepeat}
          onChangeText={onInputChange('passwordRepeat')}
          secureTextEntry
        />
      </View>
      <View style={styles.actions}>
        <CustomButton type="primary" onPress={onSignUp}>
          Далі
        </CustomButton>

        <Text
          style={[
            styles.bottomText,
            {
              marginTop: 20,
            },
          ]}>
          Реєструючись, ви погоджуєтесь з
        </Text>

        <TouchableOpacity onPress={navToPolicy}>
          <Text
            style={[
              styles.bottomText,
              {
                textDecorationLine: 'underline',
              },
            ]}>
            політикою конфіденційності
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputs: {
    gap: 14,
  },
  actions: {
    marginVertical: 40,
  },
  bottomText: {
    color: '#000',
    fontFamily: 'Raleway-Medium',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SignUpForm;
