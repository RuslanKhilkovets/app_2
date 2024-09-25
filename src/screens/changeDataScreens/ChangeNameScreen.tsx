import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {Button, Input, KeyboardScroll, Screen} from '@/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useAuthMutation, useGoBack} from '@/hooks';
import {Api} from '@/api';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '@/store/user';

const ChangeNameScreen = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const user = useSelector(state => state)?.user;
  const dispatch = useDispatch();

  const insets = useSafeAreaInsets();
  const goBack = useGoBack();

  const onChange = (text: string) => {
    setName(text);
  };

  const {mutate} = useAuthMutation({
    mutationFn: Api.profile.update,
    onSuccess: () => {
      dispatch(setUser({...user, name}));
      goBack();
    },
    onError: ({errors}) => {
      setError(errors.message);
    },
  });

  const handleSave = () => {
    mutate({login: user.email, name});
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
