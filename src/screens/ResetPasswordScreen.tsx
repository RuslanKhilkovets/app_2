import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useRef} from 'react';
import Carousel from 'react-native-snap-carousel';

import {Screen, Input, Button} from '@/components';
import {useAuthMutation, useTimer} from '@/hooks';
import {Api} from '@/api';

export default function ResetPasswordScreen() {
  const [code, setCode] = useState('');
  const [checkCodeErrors, setCheckCodeErrors] = useState('');
  const [loginErrors, setLoginErrors] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPassword_confirmation] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const {timer, isTimerActive, startTimer} = useTimer(59);
  const carouselRef = useRef<any>();

  const screenWidth = Dimensions.get('window').width;

  const {isLoginLoading, mutate: loginMutate} = useAuthMutation({
    mutationFn: Api.auth.remindPassword,
    onSuccess: () => {
      goToNextStep();
    },
    onError: ({errors}) => {
      setLoginErrors(errors?.message);
    },
  });

  const {isCheckCodeLoading, mutate: checkCodeMutate} = useAuthMutation({
    mutationFn: Api.auth.checkCode,
    onSuccess: () => {
      goToNextStep();
    },
    onError: ({errors}) => {
      setCheckCodeErrors(errors?.message);
    },
  });

  const {mutate: resentCodeMutate} = useAuthMutation({
    mutationFn: Api.auth.resentPasswordCode,
    onSuccess: () => {
      startTimer();
    },
    onError: ({errors}) => {
      console.log(errors);
    },
  });

  const {isResetPasswordLoading, mutate: resetPasswordMutate} = useAuthMutation(
    {
      mutationFn: Api.auth.resetPassword,
      onSuccess: () => {
        goToNextStep();
      },
      onError: ({errors}) => {
        setCheckCodeErrors(errors?.message);
      },
    },
  );

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const getCodeByLogin = () => {
    loginMutate({login});
  };

  const resentCode = () => {
    resentCodeMutate({login});
  };

  const checkCode = () => {
    checkCodeMutate({code, login});
  };

  const resetPassword = () => {
    resetPasswordMutate({login, code, password, password_confirmation});
  };

  const steps = [
    {
      component: (
        <View style={styles.content}>
          <Input
            value={login}
            onChangeText={text => setLogin(text)}
            label="Крок 1. Введіть свій e-mail"
            placeholder="E-mail"
            error={loginErrors}
          />

          <Button
            type="primary"
            onPress={getCodeByLogin}
            isLoading={isLoginLoading}
            style={{
              marginTop: 14,
            }}>
            Отримати код
          </Button>
        </View>
      ),
    },
    {
      component: (
        <View style={styles.content}>
          <Input
            value={code}
            onChangeText={text => setCode(text)}
            label="Крок 2. Введіть код"
            placeholder="Код"
            error={checkCodeErrors}
          />
          {isTimerActive ? (
            <Text style={styles.text}>
              Код можна знову надіслати через: {timer}с
            </Text>
          ) : (
            <Button
              type="secondary"
              onPress={resentCode}
              isLoading={isCheckCodeLoading}>
              Надіслати знову код
            </Button>
          )}

          <Button type="primary" onPress={checkCode}>
            Далі
          </Button>
        </View>
      ),
    },
    {
      component: (
        <View style={[styles.content, styles.inputs]}>
          <Input
            value={password}
            onChangeText={text => setPassword(text)}
            label="Крок 3. Введіть новий пароль"
            placeholder="Новий пароль"
            secureTextEntry
          />

          <Input
            value={password_confirmation}
            onChangeText={text => setPassword_confirmation(text)}
            placeholder="Підтвердження паролю"
            error={
              password !== password_confirmation &&
              password &&
              password_confirmation &&
              'Паролі не співпадають'
            }
            secureTextEntry
          />

          <Button
            type="primary"
            onPress={resetPassword}
            isLoading={isResetPasswordLoading}
            style={{
              marginTop: 14,
            }}>
            Скинути пароль
          </Button>
        </View>
      ),
    },
  ];

  return (
    <Screen title="Відновлення пароля" backColor="#FFEAEA">
      <View style={styles.screenContainer}>
        <Carousel
          ref={carouselRef}
          data={steps}
          renderItem={({item}) => item.component}
          sliderWidth={screenWidth - 32}
          itemWidth={screenWidth - 32}
          onSnapToItem={index => setActiveStep(index)}
          firstItem={activeStep}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          scrollEnabled={false}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  text: {
    marginTop: 20,
    marginBottom: 10,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  inputs: {
    gap: 20,
  },
});
