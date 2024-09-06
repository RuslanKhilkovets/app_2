import {createSlice} from '@reduxjs/toolkit';

const userInitialState = {
  email: '',
  name: '',
  phone: '',
  photo: '',
  location: {},
};

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser(_, {payload}) {
      return payload;
    },
    updateUser(state, {payload}) {
      return {...state, ...payload};
    },
    resetUser() {
      return userInitialState;
    },
  },
});

export default {
  userReducer: userSlice.reducer,
  slices: {setUser, resetUser, updateUser},
};
