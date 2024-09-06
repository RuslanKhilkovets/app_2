import {configureStore} from '@reduxjs/toolkit';
import {user} from '@/store';

const store = configureStore({
  reducer: {
    user: user.userReducer,
  },
});

export default store;
