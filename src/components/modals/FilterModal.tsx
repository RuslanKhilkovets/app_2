import {Animated, View} from 'react-native';
import React, {useState, useRef} from 'react';

import {Modal, TabsSwitch, FilterItemsForm} from '@/components';
import {IModalProps} from '@/types';
import TABS from '@/constants/Tabs';
import {useTabAnimation} from '@/hooks';

const FilterModal = ({visible, onClose}: IModalProps) => {
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
      title="Фільтр"
      headerBgColor={backgroundColor}>
      <View style={{flex: 1}}>
        <TabsSwitch
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          headerStyle={{padding: 0}}>
          <FilterItemsForm type={activeTab} />
        </TabsSwitch>
      </View>
    </Modal>
  );
};

export default FilterModal;
