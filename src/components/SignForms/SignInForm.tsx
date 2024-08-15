import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';

import CustomInput from '../UI/CustomInput';
import CustomButton from '../UI/CustomButton';
import ISignData from '../../types/ISignData';

const SignInForm = () => {
  const {control, handleSubmit} = useForm<ISignData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: ISignData) => {
    console.log('Sign in data:', data);
  };

  const onForgetPassword = () => {
    console.log('Forget Password');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
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
      </View>

      <CustomButton type="secondary" onPress={onForgetPassword}>
        Забули пароль?
      </CustomButton>

      <CustomButton type="primary" onPress={handleSubmit(onSubmit)}>
        Увійти
      </CustomButton>
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
});

export default SignInForm;
