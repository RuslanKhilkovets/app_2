import React, {Dispatch, SetStateAction} from 'react';

import {Modal, SelectLocationList} from '@/components';
import {ILocation, IModalProps} from '@/types';

interface ICategoriesModalProps extends IModalProps {
  setLocation: Dispatch<SetStateAction<ILocation | null>>;
  location: ILocation | null;
}

const LocationModal = ({
  visible,
  onClose,
  openFrom = 'right',
  setLocation,
  location,
}: ICategoriesModalProps) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Локація"
      headerBgColor={'#fff'}
      openFrom={openFrom}>
      <SelectLocationList
        style={{padding: 20}}
        location={location}
        setLocation={setLocation}
      />
    </Modal>
  );
};

export default LocationModal;
