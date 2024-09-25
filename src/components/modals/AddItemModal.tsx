import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

import {Modal, TabsSwitch, AddItemForm} from '@/components';
import {IModalProps} from '@/types';
import TABS from '@/constants/Tabs';
import {useTabAnimation} from '@/hooks';

const AddItemModal = ({visible, onClose, openFrom}: IModalProps) => {
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);

  const {underlinePosition} = useTabAnimation(activeTab);

  const backgroundColor = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFEAEA', '#EDE7FF'],
  });

  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Створення публікації"
      headerBgColor={backgroundColor}
      openFrom={openFrom}>
      <View style={styles.container}>
        <TabsSwitch
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          headerStyle={{padding: 0}}>
          <AddItemForm onFormClose={onClose} type={activeTab} />
        </TabsSwitch>
      </View>
    </Modal>
  );
};

export default AddItemModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
