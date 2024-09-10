import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Button, Input, KeyboardScroll, PhoneInput, Screen} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Api} from '@/api';
import {useAuthMutation} from '@/hooks';

const ChangePhoneScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<{
    password?: string;
    phone?: string;
    code?: string;
  }>({});

  const carouselRef = useRef<any>();
  const insets = useSafeAreaInsets();
  const screenWidth = Dimensions.get('window').width;

  const {mutate: passwordMutate, isLoading: isPasswordLoading} =
    useAuthMutation({
      mutationFn: Api.profile.verifyPassword,
      onSuccess: () => {
        setErrors({});
      },
      onError: ({errors}) => {
        setErrors(prev => ({
          ...prev,
          password: errors.message,
        }));
      },
    });

  const checkPassword = () => {
    console.log(password);

    passwordMutate({password});
  };

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const phoneSteps = [
    {
      component: (
        <View style={styles.container}>
          <View></View>
          <Input
            value={password}
            onChangeText={(text: string) => setPassword(text)}
            label="Введіть пароль, щоб змінити номер телефону"
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
          <PhoneInput
            value={phone}
            onChange={(text: string) => setPhone(text)}
            label="Новий номер телефону"
            placeholder="Телефон"
            error={errors.phone}
          />
          <View style={{marginBottom: insets.bottom + 20}}>
            <Button
              type="primary"
              onPress={() => goToNextStep()}
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
            onChangeText={setCode}
            label="Введіть код із SMS"
            placeholder="_ _ _ _"
            error={errors.code}
            inputStyle={{textAlign: 'center'}}
            maxLength={4}
          />
          <View style={{marginBottom: insets.bottom + 20}}>
            <Button
              type="primary"
              onPress={() => goToNextStep()}
              style={{marginTop: 14}}>
              Змінити номер
            </Button>
          </View>
        </View>
      ),
    },
  ];

  return (
    <Screen title="Телефон" backColor="#fff">
      <KeyboardScroll>
        <View style={{flex: 1}}>
          <Carousel
            ref={carouselRef}
            data={phoneSteps}
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

export default ChangePhoneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 16,
  },
});
