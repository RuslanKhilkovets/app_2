import React, {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import {
  SignInForm,
  SignUpForm,
  SignWithServices,
  AppIcon,
  GoBack,
} from '@/components';

import {useGoBack} from '@/hooks';

import {SignTypes} from '@/constants';

const SignForm = () => {
  const route = useRoute();
  const goBack = useGoBack();

  const {action: initialAction} = route.params || {};

  const [action, setAction] = useState(initialAction || SignTypes.SIGN_IN);

  const handleFormSwitch = (newAction: string) => {
    setAction(newAction);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack />

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

      <SignWithServices
        type={
          action === SignTypes.SIGN_UP ? SignTypes.SIGN_UP : SignTypes.SIGN_IN
        }
      />

      {action === SignTypes.SIGN_IN ? <SignInForm /> : <SignUpForm />}
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
    paddingVertical: 30,
    flexDirection: 'row',
    gap: 70,
  },
  headerActions: {
    flexDirection: 'row',
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
});

export default SignForm;
