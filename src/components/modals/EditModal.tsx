import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {Modal, EditForm} from '@/components';
import {IAddItemFormData, IModalProps, IPostItem} from '@/types';
import TABS from '@/constants/Tabs';
import {useTheme} from '@/contexts/Theme/ThemeContext';

interface IEditModalProps extends IModalProps {
  item: IAddItemFormData;
}

const EditModal = ({visible, onClose, item}: IEditModalProps) => {
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);

  const {themes, colorScheme} = useTheme();

  const backgroundColor =
    item['type'] === TABS.I_FIND
      ? themes[colorScheme].purpleLight
      : themes[colorScheme].pinkLight;
  const underlineColor =
    item['type'] === TABS.I_FIND
      ? themes[colorScheme].purple
      : themes[colorScheme].primary;

  console.log(item);

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Редагування"
      headerBgColor={backgroundColor}>
      <View style={{flex: 1}}>
        <View style={[styles.tabsSwitchersContainer, {backgroundColor}]}>
          <View style={styles.tabsSwitcher}>
            <Text
              style={[
                styles.tabsSwitcherText,
                {
                  fontFamily: 'Raleway-SemiBold',
                  color: themes[colorScheme].dark,
                },
              ]}>
              {item?.type === TABS.I_FIND ? 'Я знайшов' : 'Я шукаю'}
            </Text>
          </View>

          <View
            style={[styles.tabSwitcherLine, {backgroundColor: underlineColor}]}
          />
        </View>
        <EditForm item={item} onFormClose={onClose} />
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  tabsSwitchersContainer: {
    position: 'relative',
    flexDirection: 'row',
  },
  tabsSwitcher: {
    padding: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  tabsSwitcherText: {
    fontSize: 15,
  },
  tabSwitcherLine: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 3,
  },
});
