import React from 'react';
import {View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import {Button, Input, KeyboardScroll, Screen} from '@/components';
import {changePasswordSchema} from '@/validations';

const ChangePasswordScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
  };

  return (
    <Screen title="Новий пароль" backColor="#fff">
      <KeyboardScroll>
        <View style={{flex: 1, justifyContent: 'center', gap: 14}}>
          <Controller
            control={control}
            name="oldPassword"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Старий пароль"
                secureTextEntry
                error={errors.oldPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="newPassword"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Новий пароль"
                secureTextEntry
                error={errors.newPassword?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="Підтвердження паролю"
                secureTextEntry
                error={errors.confirmPassword?.message}
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
