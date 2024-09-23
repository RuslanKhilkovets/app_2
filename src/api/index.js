import axios from 'axios';
import SInfo from 'react-native-sensitive-info';

import apiAuth from './auth';
import apiProfile from './profile';
import apiFavorites from './favorites';
import apiPosts from './posts';
import apiMyPosts from './myPosts';
import apiPages from './pages';
import apiSuggest from './suggest';
import apiMedia from './media';

import {REACT_APP_API_URL} from '@env';

const client = axios.create({
  baseURL: REACT_APP_API_URL,
});

client.interceptors.request.use(
  async config => {
    const accessToken = await SInfo.getItem('accessToken', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => {
    console.log('Error request', error);
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const errorStatus = error?.response?.status;
    const errorData = error?.response?.data;
    let reject = {
      status: errorStatus,
      title: 'Помилка сервера',
      message: 'Зверніться до адміністратора',
      errors: errorData,
    };

    console.log(errorStatus, errorData);

    switch (errorStatus) {
      case 401:
        reject = {
          status: errorStatus,
          title: 'Помилка авторизації',
          message: 'Логін та пароль не співпадають',
          errors: errorData?.errors,
        };
        break;
      case 400:
        const entries = Object.entries(errorData?.errors);
        let message = '';
        for (const [key, value] of entries) {
          message += `${key}: ${value?.join(', ')}`;
        }
        reject = {
          status: errorStatus,
          title: 'Помилка заповнення полів',
          message: message,
          errors: errorData?.errors,
        };
        break;
    }
    return Promise.reject(reject);
  },
);

export const Api = {
  auth: apiAuth(client),
  profile: apiProfile(client),
  favorites: apiFavorites(client),
  myPosts: apiMyPosts(client),
  posts: apiPosts(client),
  pages: apiPages(client),
  suggest: apiSuggest(client),
  media: apiMedia(client),
};
