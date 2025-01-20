import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import FlashMessage from 'react-native-flash-message';
import 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import CSafeAreaView from './components/common/CSafeAreaView';
import flashMessage from './components/common/CustomFlashAlert';
import AppNavigator from './navigation';
import {logout, userDetails} from './redux/slices/userSlice';
import {styles} from './themes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const colors = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  useEffect(() => {
    getLoginStatus();
  }, []);

  async function getLoginStatus() {
    try {
      const token = await AsyncStorage.getItem('tokenStudent');
      if (token) {
        dispatch(userDetails({token: token, isUserLoggedIn: true}));
      } else {
        dispatch(logout());
      }
    } catch (err) {
      flashMessage('Something went wrong', 'danger');
    } finally {
    }
  }
  return (
    <CSafeAreaView style={styles.flex}>
      <StatusBar
        barStyle={colors?.dark == 'dark' ? 'light-content' : 'dark-content'}
      />
      <AppNavigator />
      <FlashMessage position="top" />
    </CSafeAreaView>
  );
};

export default App;
