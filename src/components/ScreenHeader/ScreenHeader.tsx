import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {GoBack} from '@/components';

import {useGoBack} from '@/hooks';

const ScreenHeader = ({children}: React.PropsWithChildren) => {
  const goBack = useGoBack();

  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <GoBack />
      </View>

      <Text style={styles.headerTitle}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    flexDirection: 'row',
    position: 'relative',
    justifyContent: 'center',
  },
  headerTitle: {
    width: 250,
    textAlign: 'center',
    color: '#000',
    fontSize: 22,
    fontFamily: 'Raleway-SemiBold',
  },

  icon: {
    position: 'absolute',
    left: 0,
    top: 30,
  },
});

export default ScreenHeader;
