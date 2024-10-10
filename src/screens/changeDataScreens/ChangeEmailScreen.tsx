import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import SInfo from 'react-native-sensitive-info';

import {Button, Input, KeyboardScroll, Screen} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Api} from '@/api';
import {useAuthMutation, useGoBack} from '@/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '@/store/user';
import {showMessage} from '@/helpers';

const ChangeEmailScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<{
    password?: string;
    email?: string;
    code?: string;
  }>({});
  const carouselRef = useRef<any>();

  const screenWidth = Dimensions.get('window').width;
  const insets = useSafeAreaInsets();

  const user = useSelector(state => state)?.user;
  const dispatch = useDispatch();

  const goBack = useGoBack();

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const {mutate: passwordMutate, isLoading: isPasswordLoading} =
    useAuthMutation({
      mutationFn: Api.profile.verifyPassword,
      onSuccess: () => {
        goToNextStep();
      },
      onError: ({errors}) => {
        setErrors(prev => ({
          ...prev,
          password: errors.message,
        }));
      },
    });
  const {mutate: emailMutate, isLoading: isEmailLoading} = useAuthMutation({
    mutationFn: Api.profile.update,
    onSuccess: () => {
      goToNextStep();
    },
    onError: ({errors}) => {
      setErrors({
        email: errors.message,
      });
    },
  });

  const {isLoding: isCheckCodeLoading, mutate: checkCodeMutate} =
    useAuthMutation({
      mutationFn: Api.profile.updateEmail,
      onSuccess: async res => {
        dispatch(setUser({...user, email}));
        await SInfo.setItem('user', JSON.stringify(res.data.data), {
          sharedPreferencesName: 'mySharedPrefs',
          keychainService: 'myKeychain',
        }).then(() => {
          dispatch(setUser(res.data.data));
        });
        showMessage('success', 'E-mail успішно змінено!');
        goBack();
      },
      onError: ({errors}) => {
        setErrors({
          code: errors.message,
        });
      },
    });

  const checkCode = () => {
    checkCodeMutate({code, login: user.email});
  };

  const checkPassword = () => {
    passwordMutate({password});
  };

  const updateEmail = () => {
    emailMutate({email});
  };

  const emailSteps = [
    {
      component: (
        <View style={styles.container}>
          <View></View>
          <Input
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            label="Введіть пароль, щоб змінити e-mail"
            placeholder="Пароль"
            secureTextEntry
            error={errors.password}
          />
          <View style={{marginBottom: insets.bottom + 20}}>
            <Button
              type="primary"
              onPress={checkPassword}
              isLoading={isPasswordLoading}
              style={{marginTop: 14}}>
              Надіслати код
            </Button>
          </View>
        </View>
      ),
    },
    {
      component: (
        <View style={styles.container}>
          <View></View>
          <Input
            value={email}
            onChangeText={(text: string) => setEmail(text)}
            label="Новий e-mail"
            placeholder="E-mail"
            error={errors.email}
          />
          <View style={{marginBottom: insets.bottom + 20}}>
            <Button
              type="primary"
              onPress={updateEmail}
              style={{marginTop: 14}}>
              Надіслати код
            </Button>
          </View>
        </View>
      ),
    },
    {
      component: (
        <View style={styles.container}>
          <View></View>

          <Input
            value={code}
            onChangeText={(text: string) => setCode(text)}
            label="Введіть код із E-mail"
            placeholder="_ _ _ _"
            error={errors.code}
            inputStyle={{textAlign: 'center'}}
          />

          <View style={{marginBottom: insets.bottom + 20}}>
            <Button type="primary" onPress={checkCode} style={{marginTop: 14}}>
              Змінити E-mail
            </Button>
          </View>
        </View>
      ),
    },
  ];

  return (
    <Screen title="E-mail" backColor="#fff">
      <KeyboardScroll>
        <View style={styles.container}>
          <Carousel
            ref={carouselRef}
            data={emailSteps}
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
      </KeyboardScroll>
    </Screen>
  );
};

export default ChangeEmailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 16,
  },
});
