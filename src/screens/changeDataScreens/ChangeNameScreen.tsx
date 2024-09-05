import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Input, KeyboardScroll, Screen} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const ChangeNameScreen = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const insets = useSafeAreaInsets();

  const onChange = (text: string) => {
    setName(text);
  };

  const handleSave = () => {
    if (!name) {
      setError('Введіть ім`я!');
    } else {
      setError('');
    }
  };

  return (
    <Screen title="Ім`я" backColor="#fff">
      <KeyboardScroll>
        <View style={styles.container}>
          <View></View>
          <View>
            <Input
              placeholder="Ім`я"
              value={name}
              onChangeText={onChange}
              error={error}
            />
          </View>
          <View style={{marginBottom: insets.bottom + 10}}>
            <Button onPress={handleSave}>Зберегти</Button>
          </View>
        </View>
      </KeyboardScroll>
    </Screen>
  );
};

export default ChangeNameScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
});
