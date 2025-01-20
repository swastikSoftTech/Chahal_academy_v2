import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  token: '',
  userData: undefined,
  isUserLoggedIn: false,
};

export const USER_SLICE = createSlice({
  name: 'USER_SLICE',
  initialState,
  reducers: {
    userDetails: (state, action) => {
      console.log('action >>', action.payload);

      if (action.payload.token) state.token = action.payload.token;
      if (action.payload.userData) state.userData = action.payload.userData;
      if (action.payload.isUserLoggedIn)
        state.isUserLoggedIn = action.payload.isUserLoggedIn;
      return state;
    },
    logout: state => {
      state.token = '';
      state.userData = undefined;
      state.isUserLoggedIn = false;
    },
  },
});

export const userRes = state => state.USER_SLICE;

export const {userDetails, logout} = USER_SLICE.actions;

export default USER_SLICE.reducer;
