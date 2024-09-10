import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Input, KeyboardScroll, Screen} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuthMutation} from '@/hooks';
import {Api} from '@/api';

const ChangeNameScreen = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const insets = useSafeAreaInsets();

  const onChange = (text: string) => {
    setName(text);
  };

  const {mutate} = useAuthMutation({
    mutationFn: Api.auth.resentPasswordCode,
    onSuccess: () => {
      console.log('success');
    },
    onError: ({errors}) => {
      console.log(errors);
    },
  });

  const handleSave = () => {
    mutate({name});
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
