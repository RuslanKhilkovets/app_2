import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import Carousel from 'react-native-snap-carousel';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Button, Input, Screen} from '@/components';
import {changePhoneSchema} from '@/validations';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ChangePhoneScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const carouselRef = useRef<any>();

  const insets = useSafeAreaInsets();

  const screenWidth = Dimensions.get('window').width;

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(changePhoneSchema),
    defaultValues: {
      password: '',
      phone: '',
      code: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
  };

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const phoneSteps = [
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
                label="Введіть пароль, щоб змінити номер телефону"
                placeholder="Пароль"
                secureTextEntry
                error={errors.password?.message}
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
            name="phone"
            render={({field: {onChange, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Новий номер телефону"
                placeholder="Телефон"
                error={errors.phone?.message}
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
                label="Введіть код із SMS"
                placeholder="_ _ _ _"
                error={errors.code?.message}
                inputStyle={{textAlign: 'center'}}
                maxLength={4}
              />
            )}
          />
          <View style={{marginBottom: insets.bottom + 20}}>
            <Button
              type="primary"
              onPress={handleSubmit(onSubmit)}
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
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={false}
        keyboardShouldPersistTaps="handled">
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
      </KeyboardAwareScrollView>
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
