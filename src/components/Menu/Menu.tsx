import {StyleSheet, View} from 'react-native';
import React from 'react';

import {MenuAddItem, MenuItem} from '@/components';

const Menu = () => {
  return (
    <View style={styles.container}>
      <MenuItem iconName="search_menu" title="Пошук" />
      <MenuItem iconName="favorite_menu" title="Вибране" />

      <MenuAddItem />

      <MenuItem iconName="message_menu" title="Пошук" />
      <MenuItem iconName="user_menu" title="Профіль" />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
