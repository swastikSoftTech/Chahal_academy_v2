import {StyleSheet} from 'react-native';
import colors from './colors';
import {spacing} from './spacing';
import {fontNames} from './typography';

const commonStyle = StyleSheet.create({
  flexDirectionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seprator: {
    height: spacing.HEIGHT_2,
    backgroundColor: colors.grey200,
    marginVertical: spacing.MARGIN_16,
  },
  spinWheelScreen_text: {
    fontFamily: fontNames.OPEN_SANS_SEMI_BOLD,
    color: colors.white,
    textAlign: 'center',
  },
});

export default commonStyle;
