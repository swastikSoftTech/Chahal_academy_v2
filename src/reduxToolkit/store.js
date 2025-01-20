import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {USER_SLICE, logout} from '../redux/slices/userSlice';

const rootReducer = (state, action) => {
  if (action.type === logout().type) {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const combinedReducer = combineReducers({
  [USER_SLICE.name]: USER_SLICE.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
