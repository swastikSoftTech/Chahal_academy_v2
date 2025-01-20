import {StyleSheet} from 'react-native';
import {getHeight, moderateScale} from '../common/constants';
import {colors} from './colors';
import flex from './flex';
import margin from './margin';
import {spacing} from '../styles/spacing';

export const APP_PADDING_HORIZONTAL = spacing.PADDING_16;

export default StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.backgroundColor,
    ...flex.flex,
  },
  innerContainer: {
    paddingHorizontal: moderateScale(20),
    ...margin.mt20,
  },
  generalTitleText: {
    fontSize: moderateScale(24),
  },
  underLineText: {
    textDecorationLine: 'underline',
  },
  horizontalLine: {
    height: getHeight(10),
    width: '100%',
  },
  shadowStyle: {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 5,
    elevation: 5,
  },
  capitalizeTextStyle: {
    textTransform: 'capitalize',
  },
  actionSheetIndicator: {
    width: moderateScale(60),
    ...margin.mt10,
  },
});
