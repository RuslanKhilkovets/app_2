import React, {useContext, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Input, Button, PhoneInput, KeyboardScroll} from '@/components';
import {IRegisterData} from '@/types';
import {registerSchema} from '@/validations';
import {useAuthMutation} from '@/hooks';
import {handleAuthSuccess} from '@/helpers';
import {Api} from '@/api';
import {AuthContext} from '@/contexts/Auth/AuthContext';

const initialData = {
  name: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
};

const SignUpForm = () => {
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState<any>(null);

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IRegisterData>({
    resolver: yupResolver(registerSchema),
    defaultValues: initialData,
  });

  const onRequestSuccess = res => {
    const {access_token, user} = handleAuthSuccess(res);
    navigation.navigate('EmailConfirmation', {user, access_token});
  };

  const onRequestError = ({errors}) => {
    setFormErrors(errors?.errors);
  };

  const {mutate, isLoading} = useAuthMutation({
    mutationFn: Api.auth.register,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
  });

  const onSignUp = (data: IRegisterData) => {
    const preparedData = {
      ...data,
      phone: parseInt(data.phone.replace(/\D/g, ''), 10),
    };

    mutate(preparedData);
    reset();
  };

  const navToPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  return (
    <KeyboardScroll>
      <View style={styles.container}>
        <View style={styles.inputs}>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="Ім’я"
                value={value}
                onChangeText={onChange}
                error={errors.name?.message || formErrors?.name}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                error={errors.email?.message || formErrors?.email}
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            render={({field: {onChange, value}}) => (
              <PhoneInput
                placeholder="Телефон"
                value={value}
                onChange={onChange}
                error={errors.phone?.message || formErrors?.phone}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="Пароль"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={errors.password?.message || formErrors?.password}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirmation"
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="Підтвердження паролю"
                value={value}
                onChangeText={onChange}
                secureTextEntry
                error={
                  errors.password_confirmation?.message ||
                  formErrors?.password_confirmation
                }
              />
            )}
          />
        </View>
        <View style={styles.actions}>
          <Button
            type="primary"
            onPress={handleSubmit(onSignUp)}
            isLoading={isLoading}>
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
    </KeyboardScroll>
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
