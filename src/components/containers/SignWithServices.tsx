import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {SignTypes} from '@/constants';
import GoogleLogo from '../../../assets/images/Google.svg';
import FacebookLogo from '../../../assets/images/Facebook.svg';

interface ISignWithServicesProps {
  type: SignTypes;
  googleLogin: () => void;
  facebookLogin?: () => void;
}

const SignWithServices = ({
  type,
  googleLogin,
  facebookLogin,
}: ISignWithServicesProps) => {
  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: type === SignTypes.SIGN_IN ? 60 : 0,
        },
      ]}>
      <Text style={styles.title}>Увійти за допомогою:</Text>

      <TouchableOpacity
        style={styles.iconContainer}
        activeOpacity={0.7}
        onPress={googleLogin}>
        <GoogleLogo />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        activeOpacity={0.7}
        onPress={facebookLogin}>
        <FacebookLogo />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 13,
    paddingBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
  },
  title: {
    fontSize: 15,
    fontFamily: 'Raleway-Regular',
    color: '#000',
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 13,
    borderRadius: 10,
  },
});

export default SignWithServices;
