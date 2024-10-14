import React, {useEffect, useState} from 'react';
import SInfo from 'react-native-sensitive-info';

import {Screen, SelectLocationList} from '@/components';
import {ILocation} from '@/types';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthMutation, useGoBack} from '@/hooks';
import {Api} from '@/api';
import {setUser} from '@/store/user';
import {showMessage} from '@/helpers';

const ChangeLocationScreen = () => {
  const user = useSelector(state => state.user) || {};
  const [location, setLocation] = useState<ILocation | null>(user.location);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const goBack = useGoBack();

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.profile.update,
    onSuccess: async res => {
      await SInfo.setItem('user', JSON.stringify(res.data.data), {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      }).then(() => {
        dispatch(setUser(res.data.data));
      });

      showMessage('success', res.data.message);

      goBack();
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  useEffect(() => {
    if (location !== null && user.location !== location) {
      mutate({location_id: location.id});
    }
  }, [location]);

  return (
    <Screen title={'Локація'} backColor="#fff">
      <SelectLocationList
        style={{marginTop: 30}}
        location={location}
        setLocation={setLocation}
      />
    </Screen>
  );
};

export default ChangeLocationScreen;
