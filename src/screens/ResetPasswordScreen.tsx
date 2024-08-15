import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';
import React, {useState, useRef} from 'react';
import Screen from '@/components/Screen/Screen';
import CustomInput from '@/components/UI/CustomInput';
import CustomButton from '@/components/UI/CustomButton';

export default function ResetPasswordScreen() {
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(59);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const screenWidth = Dimensions.get('window').width;

  // Анімаційні значення для кожного кроку
  const step1Anim = useRef(new Animated.Value(0)).current;
  const step2Anim = useRef(new Animated.Value(screenWidth * 3)).current;
  const step3Anim = useRef(new Animated.Value(screenWidth * 3)).current;

  const animateStep = (currentStepAnim, nextStepAnim) => {
    Animated.timing(currentStepAnim, {
      toValue: -screenWidth,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(nextStepAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const getCode = () => {
    if (!isTimerActive) {
      setTimer(59);
      setIsTimerActive(true);
    }

    // Анімація переходу з кроку 1 на крок 2
    animateStep(step1Anim, step2Anim);
  };

  const goToNextStep = () => {
    // Анімація переходу з кроку 2 на крок 3
    animateStep(step2Anim, step3Anim);
  };

  return (
    <Screen title="Відновлення пароля">
      <View style={styles.screenContainer}>
        <Animated.View
          style={[
            styles.stepContainer,
            {transform: [{translateX: step1Anim}]},
          ]}>
          <CustomInput
            value={code}
            onChangeText={text => setCode(text)}
            label="Крок 1. Введіть свій e-mail"
            placeholder="E-mail"
          />

          <CustomButton
            type="primary"
            onPress={getCode}
            style={{
              marginTop: 14,
            }}>
            Отримати код
          </CustomButton>
        </Animated.View>

        <Animated.View
          style={[
            styles.stepContainer,
            {transform: [{translateX: step2Anim}]},
          ]}>
          <CustomInput
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
            <CustomButton
              type="secondary"
              onPress={getCode}
              style={{
                marginTop: 14,
              }}>
              Надіслати знову код
            </CustomButton>
          )}

          <CustomButton
            type="primary"
            onPress={goToNextStep}
            style={{
              marginTop: 14,
            }}>
            Далі
          </CustomButton>
        </Animated.View>

        <Animated.View
          style={[
            styles.stepContainer,
            styles.inputs,
            {transform: [{translateX: step3Anim}]},
          ]}>
          <CustomInput
            value={password}
            onChangeText={text => setPassword(text)}
            label="Крок 3. Введіть новий пароль"
            placeholder="Новий пароль"
            secureTextEntry
          />

          <CustomInput
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

          <CustomButton
            type="primary"
            onPress={() => console.log('Reset password')}
            style={{
              marginTop: 14,
            }}>
            Скинути пароль
          </CustomButton>
        </Animated.View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  stepContainer: {
    position: 'absolute',
    width: '100%',
  },
  text: {
    marginVertical: 20,
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    fontSize: 13,
    color: '#000',
  },
  inputs: {
    gap: 20,
  },
});
