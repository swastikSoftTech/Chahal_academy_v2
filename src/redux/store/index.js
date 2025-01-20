import {configureStore} from '@reduxjs/toolkit';
import {TEST_SERIES_API} from '../apis/testSeries.api';
import rootReducer from '../reducer';

// const store = createStore(rootReducer, applyMiddleware(thunk));

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      TEST_SERIES_API.middleware,
    ),
});

export default store;
