import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Input, Button, KeyboardScroll} from '@/components';
import {ISignData} from '@/types';
import {loginSchema} from '@/validations';
import {handleAuthSuccess} from '@/helpers';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';
import {AuthContext} from '@/contexts/Auth/AuthContext';

const SignInForm = () => {
  const [formErrors, setFormErrors] = useState<any>({
    password: '',
    email: '',
  });
  const {login} = useContext(AuthContext);

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

  const onLoginSuccess = async (res: any) => {
    const {access_token, user} = handleAuthSuccess(res);
    await login(access_token, user);

    reset();

    navigation.navigate('Tabs');
  };

  const onLoginError = ({errors}: any) => {
    setFormErrors({
      email: errors?.errors?.email ? errors.errors.email[0] : '',
      password: errors?.errors?.password ? errors.errors.password[0] : '',
    });
  };

  const {mutate: onLogin, isLoading} = useAuthMutation({
    mutationFn: Api.auth.login,
    onError: onLoginError,
    onSuccess: onLoginSuccess,
  });

  const onSubmit = (data: ISignData) => {
    onLogin(data);
  };

  const onForgotPassword = () => {
    navigation.navigate('ResetPassword');
  };

  return (
    <KeyboardScroll>
      <View>
        <View style={styles.inputs}>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <Input
                placeholder="E-mail"
                value={value}
                onChangeText={onChange}
                error={errors?.email?.message || formErrors?.email}
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
                error={errors?.password?.message || formErrors?.password}
                secureTextEntry
              />
            )}
          />
        </View>

        <Button type="secondary" onPress={onForgotPassword}>
          Забули пароль?
        </Button>

        <Button
          type="primary"
          onPress={handleSubmit(onSubmit)}
          isLoading={isLoading}>
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

export default React.memo(SignInForm);
