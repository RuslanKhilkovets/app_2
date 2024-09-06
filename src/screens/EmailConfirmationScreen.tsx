import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Input, Button, Screen, KeyboardScroll} from '@/components';

const EmailConfirmationScreen = () => {
  const [code, setCode] = useState('');

  const onRegister = () => {
    console.log('register');
  };

  return (
    <Screen title="Підтвердження e-mai">
      <KeyboardScroll>
        <View style={styles.contentContainer}>
          <Input
            value={code}
            onChangeText={text => setCode(text)}
            label="Введіть код, що прийшов на e-mail"
            placeholder="Код"
          />

          <Button
            type="primary"
            onPress={onRegister}
            style={{
              marginTop: 14,
            }}>
            Зареєструватися
          </Button>
        </View>
      </KeyboardScroll>
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
