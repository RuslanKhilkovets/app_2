import {Animated, StyleSheet, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

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

  const handleFormSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

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
          <AddItemForm
            type={activeTab === TABS.I_LOOKING_FOR ? 'i_looking_for' : 'i_find'}
          />
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
