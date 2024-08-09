import React from 'react';
import { ActivityIndicator, SafeAreaView } from 'react-native';
import { Text } from 'react-native-svg';

const Loading = () => {
    return (
        <SafeAreaView style={{
          height: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <ActivityIndicator size={"large"} />
          <Text>Loading...</Text>
        </SafeAreaView>
      );
};

export default Loading;