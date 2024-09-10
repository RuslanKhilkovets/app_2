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

export const {setUser, resetUser, updateUser} = userSlice.actions;
export const userReducer = userSlice.reducer;
