import {Animated, StyleSheet, View} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

import {Modal, TabsSwitch, AddItemForm} from '@/components';
import {IModalProps} from '@/types';
import TABS from '@/constants/Tabs';

const AddItemModal = ({visible, onClose, openFrom}: IModalProps) => {
  const [activeTab, setActiveTab] = useState(TABS.I_LOOKING_FOR);
  const underlinePosition = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(0)).current;

  const backgroundColor = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFEAEA', '#EDE7FF'],
  });

  const handleFormSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  useEffect(() => {
    Animated.timing(underlinePosition, {
      toValue: activeTab === TABS.I_LOOKING_FOR ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    Animated.sequence([
      Animated.timing(contentOpacity, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 300,
        delay: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [activeTab]);

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
