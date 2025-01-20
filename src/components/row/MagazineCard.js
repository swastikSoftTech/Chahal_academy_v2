import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import Button from '../common/button/Button';
import RegularText from '../common/text/RegularText';

const CARD_WIDTH = (spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 3) / 2;

const MagazineCard = ({magazine, containerStyle, onPressMazine, index}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onPressMazine(magazine)}
      style={[
        styles.mazineCardContainer,
        containerStyle,
        index % 2 !== 0
          ? {marginLeft: spacing.MARGIN_8}
          : {marginRight: spacing.MARGIN_8},
      ]}>
      <RegularText style={styles.title}>{magazine?.title}</RegularText>
      <Button
        title={'Open'}
        backgroundColor={colors.white}
        borderColor={colors.white}
        buttonStyle={styles.openButtonStyle}
        textStyle={styles.buttonText}
        onPressButton={() => onPressMazine(magazine)}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mazineCardContainer: {
    width: CARD_WIDTH,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    borderRadius: spacing.RADIUS_10,
    overflow: 'hidden',
    padding: spacing.PADDING_12,
    backgroundColor: colors.orange900,
    marginBottom: spacing.MARGIN_12,
    ...boxShadow(colors.theme),
  },
  title: {
    color: colors.white,
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    flex: 1,
  },
  openButtonStyle: {
    marginTop: spacing.MARGIN_10,
    height: spacing.HEIGHT_30,
    borderRadius: spacing.RADIUS_8,
    alignSelf: 'flex-end',
  },
  buttonText: {
    color: colors.black,
  },
});

export default MagazineCard;
