import React, {useState} from 'react';
import {View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Button, Input, KeyboardScroll, Screen} from '@/components';
import {changePasswordSchema} from '@/validations';
import {Api} from '@/api';
import {useAuthMutation} from '@/hooks';

const ChangePasswordScreen = () => {
  const [serverErrors, setServerErrors] = useState({
    current_password: '',
    password: '',
    password_confirmation: '',
  });
  const {
    reset,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      current_password: '',
      password: '',
      password_confirmation: '',
    },
  });

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.profile.updatePassword,
    onSuccess: res => {
      reset();
    },
    onError: ({errors}) => {
      setServerErrors(errors);
    },
  });

  const onSubmit = (data: any) => {
    const {password, current_password, password_confirmation} = data;

    mutate({
      password,
      current_password,
      password_confirmation,
    });
  };

  return (
    <Screen title="Новий пароль" backColor="#fff">
      <KeyboardScroll>
        <View style={{flex: 1, justifyContent: 'center', gap: 14}}>
          <Controller
            control={control}
            name="current_password"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Старий пароль"
                secureTextEntry
                error={
                  serverErrors.current_password ||
                  errors.current_password?.message
                }
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Новий пароль"
                secureTextEntry
                error={serverErrors.password || errors.password?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password_confirmation"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Підтвердження паролю"
                secureTextEntry
                error={
                  serverErrors.password_confirmation ||
                  errors.password_confirmation?.message
                }
              />
            )}
          />
          <Button onPress={handleSubmit(onSubmit)}>Підтвердити</Button>
        </View>
      </KeyboardScroll>
    </Screen>
  );
};

export default ChangePasswordScreen;
