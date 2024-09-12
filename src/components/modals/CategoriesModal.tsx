import React, {Dispatch, SetStateAction} from 'react';

import {CategoriesList, Modal} from '@/components';
import {ICategory, IModalProps} from '@/types';

interface ICategoriesModalProps extends IModalProps {
  setCategory: Dispatch<SetStateAction<ICategory | null>>;
}

const CategoriesModal = ({
  visible,
  onClose,
  openFrom = 'right',
  setCategory,
}: ICategoriesModalProps) => {
  return (
    <Modal
      visible={visible}
      onClose={onClose}
      title="Категорії"
      headerBgColor={'#fff'}
      openFrom={openFrom}>
      <CategoriesList setCategory={setCategory} />
    </Modal>
  );
};

export default CategoriesModal;
