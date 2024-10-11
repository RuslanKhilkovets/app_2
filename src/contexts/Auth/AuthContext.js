import React, {useState, useEffect} from 'react';
import SInfo from 'react-native-sensitive-info';
import jwt_decode from 'jwt-decode';
import {useDispatch} from 'react-redux';

import {delCache} from '@/helpers';
import {resetUser, setUser} from '@/store/user';
import {Api} from '@/api';

export const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    // Отримуємо токен доступу з захищеного місця збереження
    SInfo.getItem('accessToken', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(token => {
      token && setAccessToken(token);
      setIsTokenChecked(true);
    });
  }, []);

  const getToken = async () => {
    if (accessToken) {
      const {exp} = jwt_decode(accessToken);
      if (new Date().getTime() < exp * 1000) {
        console.log('Access Token actived');
        return accessToken;
      }
    }

    await logout();
    return null;
  };

  const login = async (token, userData) => {
    // Зберігаємо токен доступу в захищеному місці збереження
    await SInfo.setItem('accessToken', token, {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(() => {
      setAccessToken(token);
    });
    await SInfo.setItem('user', JSON.stringify(userData), {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(() => {
      dispatch(setUser(userData));
    });
  };

  const logout = async () => {
    await Api.auth.logout();

    await SInfo.deleteItem('accessToken', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(() => setAccessToken(null));

    await SInfo.deleteItem('user', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    }).then(() => dispatch(resetUser()));

    await delCache('progress');
  };

  useEffect(() => {
    (async () => {
      await SInfo.setItem('accessToken', accessToken, {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });
    })();
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        login,
        logout,
        getToken,
        isTokenChecked,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
