import React, {useRef, useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Carousel from 'react-native-snap-carousel';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Button, Input, Screen} from '@/components';
import {changeEmailSchema} from '@/validations';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ChangeEmailScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const carouselRef = useRef<any>();

  const screenWidth = Dimensions.get('window').width;

  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(changeEmailSchema),
    defaultValues: {
      password: '',
      email: '',
      code: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
  };

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const emailSteps = [
    {
      component: (
        <View style={styles.container}>
          <View></View>

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Введіть пароль, щоб змінити E-mail"
                placeholder="Пароль"
                secureTextEntry
                error={errors?.password?.message}
              />
            )}
          />
          <View style={{marginBottom: insets.bottom + 20}}>
            <Button
              type="primary"
              onPress={goToNextStep}
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

          <Controller
            control={control}
            name="email"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Новий E-mail"
                placeholder="E-mail"
                error={errors.email?.message}
              />
            )}
          />
          <View style={{marginBottom: insets.bottom + 20}}>
            <Button
              type="primary"
              onPress={goToNextStep}
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

          <Controller
            control={control}
            name="code"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Введіть код із E-mail"
                placeholder="_ _ _ _"
                error={errors.code?.message}
                inputStyle={{textAlign: "center"}}
              />
            )}
          />
          <View style={{marginBottom: insets.bottom + 20}}>
            <Button
              type="primary"
              onPress={handleSubmit(onSubmit)}
              style={{marginTop: 14}}>
              Змінити E-mail
            </Button>
          </View>
        </View>
      ),
    },
  ];

  return (
    <Screen title="E-mail" backColor="#fff">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={false}
        keyboardShouldPersistTaps="handled">
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
      </KeyboardAwareScrollView>
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
