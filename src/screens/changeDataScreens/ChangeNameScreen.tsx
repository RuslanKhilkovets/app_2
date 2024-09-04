import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Button, Input, Screen} from '@/components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ChangeNameScreen = () => {
  const [name, setName] = useState('');

  const insets = useSafeAreaInsets();

  const onChange = (text: string) => {
    setName(text);
  };

  return (
    <Screen title="Ім`я" backColor="#fff">
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        enableOnAndroid={false}
         keyboardShouldPersistTaps="handled"
      >
        <View></View>
        <View>
          <Input placeholder="Ім`я" value={name} onChangeText={onChange} />
        </View>
        <View style={{marginBottom: insets.bottom + 30}}>
          <Button onPress={() => {}}>Зберегти</Button>
        </View>
      </KeyboardAwareScrollView>
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
