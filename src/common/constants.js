import {Dimensions, Platform} from 'react-native';

//Device dimensions
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export const deviceWidth = viewportWidth;
export const deviceHeight = viewportHeight;

let sampleHeight = 812;
let sampleWidth = 375;

const scale = viewportWidth / 375;

//Device type check
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isTablet = viewportHeight / viewportWidth < 1.6;

export const checkPlatform = () => {
  if (Platform.OS === 'android') {
    return 'android';
  } else {
    return 'ios';
  }
};

//Responsive height and width function
export function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
export function hp(percentage) {
  const value = (percentage * viewportHeight) / 100;
  return Math.round(value);
}

//Get Width of Screen
export function getWidth(value) {
  return (value / sampleWidth) * deviceWidth;
}

//Get Height of Screen
export function getHeight(value) {
  return (value / sampleHeight) * deviceHeight;
}

//Responsive size function
export function moderateScale(size) {
  const newSize = size * scale;
  return Math.round(newSize);
}

//AsyncStorage keys
export const THEME = 'THEME';
export const ON_BOARDING = 'ON_BOARDING';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const USER_DATA = 'USER_DATA';
export const USER_ID = 'USER_ID';
export const noDataImage =
  'https://img.freepik.com/premium-vector/no-data-concept-illustration_86047-488.jpg?w=740';
export const courseImage =
  'https://img.freepik.com/free-vector/online-tutorials-concept_52683-37481.jpg?w=1380&t=st=1706594778~exp=1706595378~hmac=1dec88c31600a994fb7c9b0a374ba6652d8df9ed902f8da2eb152ab6b8ef6283';

// parivesh code
export const Montserrat_Bold = 'Poppins-Bold';
export const Montserrat_Regular = 'Montserrat-Regular';
export const Montserrat_Medium = 'Poppins-Medium';
export const blueColor = '#5a97e2';
