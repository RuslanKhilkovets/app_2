import React from 'react';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import BackIcon from '../../../assets/images/back.svg';

import useGoBack from '../../hooks/useGoBack';

const ScreenHeader = ({children}: React.PropsWithChildren) => {
  const goBack = useGoBack();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={goBack} style={styles.icon}>
        <BackIcon />
      </TouchableOpacity>

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
  },

  icon: {
    position: 'absolute',
    left: 0,
    top: 33,
  },
});

export default ScreenHeader;
