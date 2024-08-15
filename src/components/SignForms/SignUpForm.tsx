import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import IRegisterData from 'src/types/IRegisterData';
import CustomInput from '../UI/CustomInput';
import CustomButton from '../UI/CustomButton';

const SignUpForm = () => {
  const navigation = useNavigation();

  const {control, handleSubmit} = useForm<IRegisterData>({
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      passwordRepeat: '',
    },
  });

  const onSignUp = (data: IRegisterData) => {
    console.log('Sign Up Data:', data);
    navigation.navigate('EmailConfirmation');
  };

  const navToPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <Controller
          control={control}
          name="name"
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="Ім’я"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="E-mail"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="Телефон"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="Пароль"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />
        <Controller
          control={control}
          name="passwordRepeat"
          render={({field: {onChange, onBlur, value}}) => (
            <CustomInput
              placeholder="Підтвердження паролю"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />
      </View>
      <View style={styles.actions}>
        <CustomButton type="primary" onPress={handleSubmit(onSignUp)}>
          Далі
        </CustomButton>

        <Text style={[styles.bottomText, {marginTop: 20}]}>
          Реєструючись, ви погоджуєтесь з
        </Text>

        <TouchableOpacity onPress={navToPolicy}>
          <Text style={[styles.bottomText, {textDecorationLine: 'underline'}]}>
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
