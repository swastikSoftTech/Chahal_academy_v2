import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  data: undefined,
  isDrawerVisible: false,
};

export const DRAWER_SLICE = createSlice({
  name: 'DRAWER_SLICE',
  initialState,
  reducers: {
    showDrawer: state => {
      state.isDrawerVisible = true;
    },
    closeDrawer: state => {
      state.isDrawerVisible = false;
    },
  },
});

export const drawerRes = state => state.DRAWER_SLICE;

export const {showDrawer, closeDrawer} = DRAWER_SLICE.actions;

export default DRAWER_SLICE.reducer;
