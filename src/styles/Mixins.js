import {Dimensions} from 'react-native';
import colors from './colors';

export const size = Dimensions.get('screen').width;

export function boxShadow(
  color,
  offset = {height: 2, width: 2},
  radius = 5,
  opacity = 0.8,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export function boxShadowLess(
  color,
  offset = {height: 1, width: 1},
  radius = 3,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}

export function boxShadowTwo(
  color = colors.black,
  offset = {height: 1, width: 0},
  radius = 2,
  opacity = 0.2,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
export function boxShadowZero(
  color,
  offset = {height: 0, width: 0},
  radius = 0,
  opacity = 0,
) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
