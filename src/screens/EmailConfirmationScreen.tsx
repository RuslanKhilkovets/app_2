import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {Input, Button, Screen, KeyboardScroll} from '@/components';
import {Api} from '@/api';
import {useAuthMutation} from '@/hooks';
import {AuthContext} from '@/contexts/Auth/AuthContext';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';

interface IRouteParams {
  user: {
    email: string;
    [key: string]: any;
  };
  access_token: string;
}

interface IFormInput {
  code: string;
}

const EmailConfirmationScreen: React.FC = () => {
  const [fieldErrors, setFieldErrors] = useState();
  const route = useRoute<RouteProp<{params: IRouteParams}, 'params'>>();
  const {user, access_token} = route.params;

  const {login} = useContext(AuthContext);

  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IFormInput>({
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
      setFieldErrors(errors?.message);
    },
  });

  const onSubmit = (data: IFormInput) => {
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
                error={errors.code?.message || fieldErrors}
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
