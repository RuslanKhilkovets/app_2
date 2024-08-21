import {SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';

import {ScreenHeader} from '@/components';

interface IScreen extends React.PropsWithChildren {
  title?: string;
  headerShown?: boolean;
  backColor?: string;
  bgColor?: string;
}

const Screen = ({
  children,
  title,
  headerShown = true,
  backColor = '#FFEAEA',
  bgColor,
}: IScreen) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: bgColor}}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: backColor,
          },
        ]}>
        {headerShown && <ScreenHeader>{title}</ScreenHeader>}

        {children}
      </View>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
