import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  theme: undefined,
};

export const THEME_SLICE = createSlice({
  name: 'THEME_SLICE',
  initialState,
  reducers: {
    changeTheme: (state, {payload}) => {
      state.theme = payload;
    },
  },
});

export const appSlice = state => state.THEME_SLICE;

export const {changeTheme} = THEME_SLICE.actions;

export default THEME_SLICE.reducer;
