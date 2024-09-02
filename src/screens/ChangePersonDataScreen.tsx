import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useRoute} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {
  Button,
  Input,
  PostItem,
  Screen,
  SelectLocationList,
} from '@/components';
import {getSchemeByScreenType} from '@/validations';

const ChangePersonDataScreen = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const carouselRef = useRef<any>();
  const route = useRoute();
  const {screenType} = route.params || {};

  const screenWidth = Dimensions.get('window').width;

  const validationSchema = getSchemeByScreenType(screenType);

  const handleMenuToggle = (id: number | null) => {
    setOpenMenuId(prevId => (prevId === id ? null : id));
  };
  const handleMenuClose = () => {
    setOpenMenuId(null);
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      password: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      newPhone: '',
      newEmail: '',
      codePhone: '',
      codeEmail: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
  };

  const posts = [
    {
      id: 1,
      img: '',
      title: 'Iphone 12',
      status: 1,
      city: 'Луцьк',
      date: '9 серпня 2022',
    },
    {
      id: 2,
      img: '',
      title: 'Iphone 12',
      status: 0,
      city: 'Луцьк',
      date: '9 серпня 2022',
    },
  ];

  const goToNextStep = () => {
    carouselRef.current?.snapToNext();
  };

  const getPageTitle = (screenType: string): string => {
    switch (screenType) {
      case 'name':
        return 'Ім`я';
      case 'phone':
        return 'Телефон';
      case 'email':
        return 'E-mail';
      case 'location':
        return 'Локація';
      case 'password':
        return 'Новий пароль';
      case 'posts':
        return 'Активні публікації';
      default:
        return 'Undefined title';
    }
  };

  const getContent = (screenType: string): React.ReactNode => {
    switch (screenType) {
      case 'name': {
        return (
          <View style={styles.container}>
            <View></View>

            <Controller
              control={control}
              name="name"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  placeholder="Ім`я"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.name?.message}
                />
              )}
            />
            <Button onPress={handleSubmit(onSubmit)}>Зберегти</Button>
          </View>
        );
      }
      case 'phone': {
        return (
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
        );
      }
      case 'password': {
        return (
          <View style={{flex: 1, justifyContent: 'center', gap: 14}}>
            <Controller
              control={control}
              name="oldPassword"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Старий пароль"
                  secureTextEntry
                  errorMessage={errors.oldPassword?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="newPassword"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Новий пароль"
                  secureTextEntry
                  errorMessage={errors.newPassword?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {onChange, onBlur, value}}) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Підтвердження паролю"
                  secureTextEntry
                  errorMessage={errors.confirmPassword?.message}
                />
              )}
            />
            <Button onPress={handleSubmit(onSubmit)}>Підтвердити</Button>
          </View>
        );
      }
      case 'email': {
        return (
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
        );
      }
      case 'posts': {
        return (
          <Pressable style={{flex: 1}} onPress={handleMenuClose}>
            <ScrollView style={{marginTop: 25}}>
              <FlatList
                data={posts}
                renderItem={({item}) => (
                  <PostItem
                    id={item.id}
                    img={item.img}
                    title={item.title}
                    status={item.status}
                    city={item.city}
                    date={item.date}
                    isOpen={openMenuId === item.id}
                    onMenuToggle={() => handleMenuToggle(item.id)}
                    resetMenu={handleMenuClose}
                  />
                )}
                style={{overflow: 'visible'}}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{gap: 15, overflow: 'visible'}}
              />
            </ScrollView>
          </Pressable>
        );
      }
      case 'location': {
        return <SelectLocationList style={{marginTop: 30}} />;
      }
    }
  };

  const phoneSteps = [
    {
      component: (
        <View style={styles.container}>
          <View></View>

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Введіть пароль, щоб змінити номер телефону"
                placeholder="Пароль"
                secureTextEntry
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button type="primary" onPress={goToNextStep} style={{marginTop: 14}}>
            Надіслати код
          </Button>
        </View>
      ),
    },
    {
      component: (
        <View style={styles.container}>
          <View></View>

          <Controller
            control={control}
            name="newPhone"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Новий номер телефону"
                placeholder="Телефон"
                errorMessage={errors.newPhone?.message}
              />
            )}
          />
          <Button type="primary" onPress={goToNextStep} style={{marginTop: 14}}>
            Надіслати код
          </Button>
        </View>
      ),
    },
    {
      component: (
        <View style={styles.container}>
          <View></View>

          <Controller
            control={control}
            name="codePhone"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Введіть код із SMS"
                placeholder="_ _ _ _"
                errorMessage={errors.codePhone?.message}
                inputStyle={{textAlign: 'center'}}
                maxLength={4}
              />
            )}
          />
          <Button
            type="primary"
            onPress={handleSubmit(onSubmit)}
            style={{marginTop: 14}}>
            Змінити номер
          </Button>
        </View>
      ),
    },
  ];

  const emailSteps = [
    {
      component: (
        <View style={styles.container}>
          <View></View>

          <Controller
            control={control}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Введіть пароль, щоб змінити E-mail"
                placeholder="Пароль"
                secureTextEntry
                error={errors?.password?.message}
              />
            )}
          />

          <Button type="primary" onPress={goToNextStep} style={{marginTop: 14}}>
            Надіслати код
          </Button>
        </View>
      ),
    },
    {
      component: (
        <View style={styles.container}>
          <View></View>

          <Controller
            control={control}
            name="newEmail"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Новий E-mail"
                placeholder="E-mail"
                errorMessage={errors.newEmail?.message}
              />
            )}
          />

          <Button type="primary" onPress={goToNextStep} style={{marginTop: 14}}>
            Надіслати код
          </Button>
        </View>
      ),
    },
    {
      component: (
        <View style={styles.container}>
          <View></View>

          <Controller
            control={control}
            name="codeEmail"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                label="Введіть код із E-mail"
                placeholder="0000"
                errorMessage={errors.codeEmail?.message}
              />
            )}
          />
          <Button
            type="primary"
            onPress={handleSubmit(onSubmit)}
            style={{marginTop: 14}}>
            Змінити E-mail
          </Button>
        </View>
      ),
    },
  ];

  return (
    <Screen title={getPageTitle(screenType)} backColor="#fff">
      {getContent(screenType)}
    </Screen>
  );
};

export default ChangePersonDataScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    gap: 16,
  },
});
