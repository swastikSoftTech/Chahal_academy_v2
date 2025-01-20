import AsyncStorage from '@react-native-async-storage/async-storage';

export async function header(headers) {
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  //   headers.set('AppVersion', await DeviceInfo.getVersion());
  //   headers.set('Platform', 'MOBILE');
  //   headers.set('OsVersion', await DeviceInfo.getSystemVersion());
  //   headers.set('Os', Platform.OS);
  const token = await AsyncStorage.getItem('tokenStudent');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
}
