import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Input, Button} from '@/components';
import {IRegisterData} from '@/types';
import {registerSchema} from '@/validations';
import {globals} from '@/constants';

const initialData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  passwordRepeat: '',
};

const SignUpForm = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IRegisterData>({
    resolver: yupResolver(registerSchema),
    defaultValues: initialData,
  });

  const onSignUp = (data: IRegisterData) => {
    const preparedData = {
      ...data,
      phone: parseInt(data.phone.replace(/\D/g, ''), 10),
    };

    reset();

    navigation.navigate('EmailConfirmation');
  };

  const navToPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.inputs}>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Ім’я"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Телефон"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.phone?.message}
                mask={globals.PHONE_MASK}
                maxLength={globals.PHONE_MASK.length}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Пароль"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                error={errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="passwordRepeat"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Підтвердження паролю"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                secureTextEntry
                error={errors.passwordRepeat?.message}
              />
            )}
          />
        </View>
        <View style={styles.actions}>
          <Button type="primary" onPress={handleSubmit(onSignUp)}>
            Далі
          </Button>

          <Text style={[styles.bottomText, {marginTop: 20}]}>
            Реєструючись, ви погоджуєтесь з
          </Text>

          <TouchableOpacity onPress={navToPolicy}>
            <Text
              style={[styles.bottomText, {textDecorationLine: 'underline'}]}>
              політикою конфіденційності
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
