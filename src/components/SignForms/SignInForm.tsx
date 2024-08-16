import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Input, Button} from '@/components';
import {ISignData} from '@/types';
import {loginSchema} from '@/validations';

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

  const onForgotPassword = () => {
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
                <Input
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
                <Input
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

        <Button type="secondary" onPress={onForgotPassword}>
          Забули пароль?
        </Button>

        <Button type="primary" onPress={handleSubmit(onSubmit)}>
          Увійти
        </Button>
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
