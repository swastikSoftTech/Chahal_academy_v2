import {combineReducers} from 'redux';
import theme from './theme';
import profile from './profile';
import {USER_SLICE} from '../slices/userSlice';
import {DRAWER_SLICE} from '../slices/drawerSlice';
import {TEST_SERIES_API} from '../apis/testSeries.api';

const rootReducer = combineReducers({
  theme,
  profile,
  [USER_SLICE.name]: USER_SLICE.reducer,
  [DRAWER_SLICE.name]: DRAWER_SLICE.reducer,

  [TEST_SERIES_API.reducerPath]: TEST_SERIES_API.reducer,
});

export default rootReducer;
