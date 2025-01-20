import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';

// Check App Platform
const checkPlatform = () => {
  if (Platform.OS === 'android') {
    return 'android';
  } else {
    return 'ios';
  }
};

// Set Async Storage Data
const setAsyncStorageData = async (key, value) => {
  const stringData = JSON.stringify(value);
  await AsyncStorage.setItem(key, stringData);
};

// Get Async Storage Data
const getAsyncStorageData = async key => {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data);
};

//Show Popup Alert
const showPopupWithOk = (title, message, okClicked) => {
  Alert.alert(title ? title : 'Academy', message ? message : '', [
    {text: 'OK', onPress: () => okClicked && okClicked()},
  ]);
};

//Show Popup with ok and cancel
const showPopupWithOkAndCancel = (title, message, okClicked, cancelClicked) => {
  Alert.alert(title ? title : 'Academy', message ? message : '', [
    {
      text: 'cancel',
      onPress: () => cancelClicked && cancelClicked(),
      style: 'cancel',
    },
    {
      text: 'ok',
      onPress: () => okClicked && okClicked(),
    },
  ]);
};

function useCounter(timerState = 'stop', setCounter, timerValue) {
  const [interval, setIntervalVal] = useState(0);
  useEffect(() => {
    if (timerState === 'start') {
      const current_time = new Date();
      const diff = (current_time.getTime() - new Date().getTime()) / 1000;
      const timer = setInterval(() => {
        setCounter(timerValue - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else if (timerState === 'pause') {
      const timer = setInterval(() => {
        setIntervalVal(i => i + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    } else if (timerState === 'stop') {
      setIntervalVal(0);
    }
  }, [timerState, timerValue]);
}

export {
  showPopupWithOk,
  showPopupWithOkAndCancel,
  getAsyncStorageData,
  setAsyncStorageData,
  checkPlatform,
  useCounter,
};
