import React, {useEffect, useState} from 'react';

import {Screen, SelectLocationList} from '@/components';
import {ILocation} from '@/types';
import {useDispatch, useSelector} from 'react-redux';
import {useAuthMutation, useGoBack} from '@/hooks';
import {Api} from '@/api';
import {setUser} from '@/store/user';

const ChangeLocationScreen = () => {
  const user = useSelector(state => state)?.user;
  const [location, setLocation] = useState<ILocation | null>(user.location);
  const [error, setError] = useState('');

  const dispatch = useDispatch();
  const goBack = useGoBack();

  const {isLoading, mutate} = useAuthMutation({
    mutationFn: Api.profile.update,
    onSuccess: res => {
      goBack();
      dispatch(setUser({...user, location}));
    },
    onError: ({errors}) => {
      setError(errors?.message);
    },
  });

  useEffect(() => {
    user.location !== null &&
      user.location !== location &&
      mutate({location_id: user.location.id});
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
