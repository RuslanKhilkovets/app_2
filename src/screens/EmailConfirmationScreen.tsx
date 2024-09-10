import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {Input, Button, Screen, KeyboardScroll} from '@/components';
import {Api} from '@/api';
import {useAuthMutation} from '@/hooks';
import {handleAuthSuccess} from '@/helpers';
import {AuthContext} from '@/contexts/Auth/AuthContext';
import {useNavigation, useRoute} from '@react-navigation/native';

const emailConfirmationSchema = yup.object().shape({
  code: yup
    .string()
    .required('Код є обов’язковим')
    .min(4, 'Код має бути мінімум з 4 символів'),
});

const EmailConfirmationScreen = () => {
  const route = useRoute();
  const {user, access_token} = route.params || {};

  const {login} = useContext(AuthContext);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm({
    resolver: yupResolver(emailConfirmationSchema),
    defaultValues: {
      code: '',
    },
  });

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.auth.verify,
    onSuccess: () => {
      login(access_token, user);

      navigation.navigate('Tabs');

      reset();
    },
    onError: ({errors}) => {
      console.log('Error:', errors);
    },
  });

  const onSubmit = (data: {code: string}) => {
    mutate({code: data.code, login: user.email});
  };

  return (
    <Screen title="Підтвердження e-mail">
      <KeyboardScroll>
        <View style={styles.contentContainer}>
          <Controller
            control={control}
            name="code"
            render={({field: {onChange, value}}) => (
              <Input
                label="Введіть код, що прийшов на e-mail"
                placeholder="Код"
                value={value}
                onChangeText={onChange}
                error={errors.code?.message}
              />
            )}
          />

          <Button
            type="primary"
            onPress={handleSubmit(onSubmit)}
            isLoading={isLoading}
            style={{
              marginTop: 14,
            }}>
            Зареєструватися
          </Button>
        </View>
      </KeyboardScroll>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default EmailConfirmationScreen;
