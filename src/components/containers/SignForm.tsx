import React, {useState, useEffect, useRef} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {SignInForm, SignUpForm, SignWithServices, GoBack} from '@/components';
import {SignTypes} from '@/constants';

const SignForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {action: initialAction} = route.params || {};
  const [action, setAction] = useState(initialAction || SignTypes.SIGN_IN);

  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [action, fadeAnim]);

  const handleFormSwitch = (newAction: string) => {
    setAction(newAction);
  };
  const canGoBack = () => {
    const state = navigation.getState();
    const previousRoute = state?.routes[state?.index - 1];
    return previousRoute?.name !== 'Tabs';
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header, {paddingTop: insets.top}]}>
        {canGoBack() && (
          <View style={{position: 'absolute', left: 0, top: insets.top}}>
            <GoBack />
          </View>
        )}
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => handleFormSwitch(SignTypes.SIGN_IN)}>
            <Text
              style={[
                styles.formTypeLabel,
                action === SignTypes.SIGN_IN && styles.formTypeLabel_active,
              ]}>
              Вхід
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleFormSwitch(SignTypes.SIGN_UP)}>
            <Text
              style={[
                styles.formTypeLabel,
                action === SignTypes.SIGN_UP && styles.formTypeLabel_active,
              ]}>
              Реєстрація
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View style={[styles.formContainer, {opacity: fadeAnim}]}>
        <SignWithServices type={action} />
        {action === SignTypes.SIGN_IN ? <SignInForm /> : <SignUpForm />}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFEAEA',
  },
  header: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  formTypeLabel: {
    fontSize: 22,
    lineHeight: 25,
    color: '#000',
    textDecorationLine: 'underline',
    fontFamily: 'Raleway-Medium',
  },
  formTypeLabel_active: {
    fontFamily: 'Raleway-SemiBold',
    textDecorationLine: 'none',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SignForm;
