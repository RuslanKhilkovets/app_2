import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Carousel from 'react-native-snap-carousel';

import {Screen, Input, Button} from '@/components';

export default function ResetPasswordScreen() {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [activeStep, setActiveStep] = useState(0);

  const carouselRef = useRef<Carousel<any>>(null);

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer, isTimerActive]);

  const getCode = () => {
    if (!isTimerActive) {
      setTimer(59);
      setIsTimerActive(true);
    }
  };

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const steps = [
    {
      component: (
        <View style={styles.content}>
          <Input
            value={code}
            onChangeText={text => setCode(text)}
            label="Крок 1. Введіть свій e-mail"
            placeholder="E-mail"
          />

          <Button
            type="primary"
            onPress={goToNextStep}
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
          />
          {isTimerActive ? (
            <Text style={styles.text}>
              Код можна знову надіслати через: {timer}с
            </Text>
          ) : (
            <Button
              type="secondary"
              onPress={getCode}
              style={{
                marginTop: 14,
              }}>
              Надіслати знову код
            </Button>
          )}

          <Button
            type="primary"
            onPress={goToNextStep}
            style={{
              marginTop: 14,
            }}>
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
            value={passwordRepeat}
            onChangeText={text => setPasswordRepeat(text)}
            placeholder="Підтвердження паролю"
            error={
              password !== passwordRepeat &&
              password &&
              passwordRepeat &&
              'Паролі не співпадають'
            }
            secureTextEntry
          />

          <Button
            type="primary"
            onPress={() => console.log('Reset password')}
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
    <Screen title="Відновлення пароля">
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
