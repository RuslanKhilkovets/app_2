import React from 'react';

import {
  Screen,
  SelectLocationList,
} from '@/components';

const ChangeLocationScreen = () => {

  return (
    <Screen title={"Локація"} backColor="#fff">
      <SelectLocationList style={{marginTop: 30}} />
    </Screen>
  );
};

export default ChangeLocationScreen;