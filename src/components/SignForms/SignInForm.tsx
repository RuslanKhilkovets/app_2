import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import CustomInput from '../UI/CustomInput';
import CustomButton from '../UI/CustomButton';
import ISignData from '../../types/ISignData';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import loginSchema from 'validations/loginSchema';
import {useNavigation} from '@react-navigation/native';

const SignInForm = () => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: ISignData) => {
    console.log('Sign in data:', data);
  };

  const onForgetPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.inputs}>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <CustomInput
                  placeholder="E-mail"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors?.email?.message}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <View>
                <CustomInput
                  placeholder="Пароль"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  error={errors?.password?.message}
                  secureTextEntry
                />
              </View>
            )}
          />
        </View>

        <CustomButton type="secondary" onPress={onForgetPassword}>
          Забули пароль?
        </CustomButton>

        <CustomButton type="primary" onPress={handleSubmit(onSubmit)}>
          Увійти
        </CustomButton>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  inputs: {
    gap: 14,
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default SignInForm;
