import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const MenuAddItem = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.plus}>+</Text>
    </View>
  );
};

export default MenuAddItem;

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    backgroundColor: '#000',
  },
  plus: {
    fontSize: 20,
    color: '#fff',
  },
});
