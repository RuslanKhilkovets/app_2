import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Input, Button, KeyboardScroll} from '@/components';
import {ISignData} from '@/types';
import {loginSchema} from '@/validations';

const SignInForm = () => {
  const navigation = useNavigation();
  const {
    reset,
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

  const onSubmit = (data: ISignData) => {};

  const onForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  const onSignIn = () => {
    handleSubmit(onSubmit);

    if (!errors.email?.message || !errors.password?.message) {
      navigation.navigate('Tabs');
      reset();
    }
  };

  return (
    <KeyboardScroll>
      <View>
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
                  error={errors?.email?.message}
                />
              </View>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <View>
                <Input
                  placeholder="Пароль"
                  value={value}
                  onChangeText={onChange}
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

        <Button type="primary" onPress={onSignIn}>
          Увійти
        </Button>
      </View>
    </KeyboardScroll>
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
