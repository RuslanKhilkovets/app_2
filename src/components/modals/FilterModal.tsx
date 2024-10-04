import {View} from 'react-native';
import React, {useState} from 'react';

import {Modal, TabsSwitch, FilterItemsForm} from '@/components';
import {IFilters, IModalProps} from '@/types';
import TABS from '@/constants/Tabs';
import {useTabAnimation} from '@/hooks';

interface IFilterModalProps extends IModalProps {
  filters?: IFilters;
  setFilters: React.Dispatch<React.SetStateAction<IFilters | undefined>>;
}

const FilterModal = ({
  visible,
  onClose,
  filters,
  setFilters,
}: IFilterModalProps) => {
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
          <FilterItemsForm
            type={activeTab}
            filters={filters}
            setFilters={setFilters}
            onFormClose={onClose}
          />
        </TabsSwitch>
      </View>
    </Modal>
  );
};

export default FilterModal;
