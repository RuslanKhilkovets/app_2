import React, {useState} from 'react';

import {StyleSheet, View} from 'react-native';

import ScreenHeader from '../components/ScreenHeader/ScreenHeader';
import CustomInput from '../components/UI/CustomInput';
import CustomButton from '../components/UI/CustomButton';
import Screen from '../components/Screen/Screen';

const EmailConfirmationScreen = () => {
  const [code, setCode] = useState('');

  const onRegister = () => {
    console.log('register');
  };

  return (
    <Screen title="Підтвердження e-mai">
      <View style={styles.contentContainer}>
        <CustomInput
          value={code}
          onChangeText={text => setCode(text)}
          label="Введіть код, що прийшов на e-mail"
          placeholder="Код"
        />

        <CustomButton
          type="primary"
          onPress={onRegister}
          style={{
            marginTop: 14,
          }}>
          Зареєструватися
        </CustomButton>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default EmailConfirmationScreen;
