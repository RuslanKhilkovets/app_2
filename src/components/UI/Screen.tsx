import {StyleSheet, View} from 'react-native';
import React from 'react';

import {ScreenHeader} from '@/components';

interface IScreen extends React.PropsWithChildren {
  title?: string;
  headerShown?: boolean;
  backColor?: string;
}

const Screen = ({
  children,
  title,
  headerShown = true,
  backColor = '#FFEAEA',
}: IScreen) => {
  return (
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
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});