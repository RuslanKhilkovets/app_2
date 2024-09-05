import {KeyboardAvoidingView, Platform} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const KeyboardScroll = ({children}: React.PropsWithChildren) => {
  return Platform.OS === 'ios' ? (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {children}
    </KeyboardAvoidingView>
  ) : (
    <KeyboardAwareScrollView
      enableOnAndroid={false}
      contentContainerStyle={{flex: 1}}
      keyboardShouldPersistTaps="handled">
      {children}
    </KeyboardAwareScrollView>
  );
};

export default KeyboardScroll;
