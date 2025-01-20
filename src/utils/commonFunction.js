import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {PermissionsAndroid, Platform, ToastAndroid} from 'react-native';
import {logout} from '../redux/slices/userSlice';
import store from '../redux/store';
import {CURRENT_AFFAIR_CATEGORY_TYPE} from './constants';

export function convertDateTime(value, format, isUtc) {
  if (isUtc == true) {
    let convertedValue = moment(value).utc().format(format);
    return convertedValue;
  } else {
    let convertedValue = moment(value).format(format);
    return convertedValue;
  }
}

export function getCurrentAffairApiUrl(type, isDetail) {
  const BASE_URL = 'https://chahalacademy.com/api/';
  switch (type) {
    case CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR:
      return isDetail
        ? `${BASE_URL}current-affairs/`
        : `${BASE_URL}the-hindu-editorial-analysis/`;
    case CURRENT_AFFAIR_CATEGORY_TYPE.IMPORTANT_CURRENT_AFFAIR:
      return isDetail
        ? `${BASE_URL}important-current-affairs/`
        : `${BASE_URL}get/what-to-read-in-the-hindu/`;
    case CURRENT_AFFAIR_CATEGORY_TYPE.INDIAN_EXPRESS:
      return isDetail
        ? `${BASE_URL}indian-express/`
        : `${BASE_URL}indian-express-editorial-analysis/`;
    case CURRENT_AFFAIR_CATEGORY_TYPE.READ_INDIAN_EXPRESS:
      return isDetail
        ? `${BASE_URL}read-indian-express/`
        : `${BASE_URL}what-to-read-in-indian-express/`;
    case CURRENT_AFFAIR_CATEGORY_TYPE.ANSWER_WRITING:
      return isDetail
        ? `${BASE_URL}answer-writing/`
        : `${BASE_URL}daily-answer-writing/`;
    case CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_MAGAZINE:
      return `${BASE_URL}current-affairs-magazine`;
    case CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_QUIZE:
      return isDetail
        ? `${BASE_URL}quiz-question`
        : `${BASE_URL}daily-current-affairs-quiz`;
    // https://chahalacademy.com/api/current-affairs-magazine
    default:
      break;
  }
}

export function getMagazineApiUrl(type) {
  const BASE_URL = 'https://chahalacademy.com/api/';
  switch (type) {
    case CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_MAGAZINE:
      return `${BASE_URL}current-affairs-magazine`;
    case CURRENT_AFFAIR_CATEGORY_TYPE.KURUKSHETRA_MAGAZINE:
      return `${BASE_URL}kurukshetra-magazine`;
    case CURRENT_AFFAIR_CATEGORY_TYPE.YOJANA_MAGAZINE:
      return `${BASE_URL}yojana-magazine`;

    default:
      break;
  }
}

async function requestStoragePermission() {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'This app needs access to your storage to read documents.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Storage permission granted');
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
}

//Create form data
export function getFormData(data) {
  let formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    if (Array.isArray(value) === true) {
      for (var i = 0; i < value.length; i++)
        formData.append(`${key}`, value[i]);
    } else formData.append(`${key}`, value);
  }
  return formData;
}

export const logoutUser = async () => {
  await AsyncStorage.removeItem('tokenStudent');
  store.dispatch(logout());
};
