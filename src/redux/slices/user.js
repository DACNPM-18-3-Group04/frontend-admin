import { createSlice } from '@reduxjs/toolkit';
import {
  ACCESS_TOKEN_NAME,
  USER_INFO_CACHE_NAME,
} from '../../helpers/constants/auth';

const initialState = {
  isLogin: false,
  id: '',
  fullname: '',
  contact_email: '',
  contact_number: '',
  avatar: '',
  token: 'empty_token',
};

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateUser: (state, action) => {
      const { id, fullname, contact_email, contact_number, avatar, token } =
        action.payload;
      if (id !== undefined) state.id = id;
      if (fullname !== undefined) state.fullname = fullname;
      if (avatar !== undefined) state.avatar = avatar;
      if (contact_email !== undefined) state.contact_email = contact_email;
      if (contact_number !== undefined) state.contact_number = contact_number;
      if (token !== undefined) state.token = token;
      if (id !== undefined) state.isLogin = true;
      localStorage.setItem(USER_INFO_CACHE_NAME, JSON.stringify({ ...state }));
    },
    signIn: (state, action) => {
      const { id, fullname, contact_email, contact_number, avatar, token } =
        action.payload;
      if (
        id !== undefined &&
        fullname !== undefined &&
        avatar !== undefined &&
        token !== undefined
      ) {
        state.isLogin = true;
        state.id = id;
        state.fullname = fullname;
        state.avatar = avatar;
        state.token = token;
        if (contact_email !== undefined) state.contact_email = contact_email;
        if (contact_number !== undefined) state.contact_number = contact_number;
        // To help to persist logged in user
        localStorage.setItem(ACCESS_TOKEN_NAME, token);
        localStorage.setItem(
          USER_INFO_CACHE_NAME,
          JSON.stringify(action.payload),
        );
      }
    },
    signOut: (state) => {
      // To help to persist logged in user
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      localStorage.removeItem(USER_INFO_CACHE_NAME);
      return initialState;
    },
  },
});

export const { updateUser, signIn, signOut } = UserSlice.actions;
export const UserReducer = UserSlice.reducer;
export const selectUser = (state) => state.user;
export default UserReducer;
