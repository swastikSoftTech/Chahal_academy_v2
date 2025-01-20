import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Image from '../common/Image';
import {spacing} from '../../styles/spacing';
import RegularText from '../common/text/RegularText';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {fontNames} from '../../styles/typography';

const CourseCategoryCard = ({
  isLarge,
  category,
  containerStyle,
  onPressCategory,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPressCategory(category)}
      style={[
        styles.categoryCardContainer,
        containerStyle,
        // {height: isLarge ? spacing.HEIGHT_216 : spacing.HEIGHT_178},
      ]}>
      <Image
        source={{uri: category.image}}
        style={[
          styles.categoryImg,
          {height: isLarge ? spacing.HEIGHT_146 : spacing.HEIGHT_128},
        ]}
        resizeMode={'cover'}
      />
      <RegularText style={styles.categoryName}>{category.name}</RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryCardContainer: {
    width:
      (spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2 - spacing.MARGIN_12) / 2,
    // height: spacing.HEIGHT_180,
    backgroundColor: colors.white,
    borderRadius: spacing.RADIUS_12,
    overflow: 'hidden',
    ...boxShadow(colors.theme),
    // backgroundColor: colors.cardBackgroundColor2,
  },
  categoryImg: {
    width: '100%',
  },
  categoryName: {
    paddingHorizontal: spacing.PADDING_10,
    paddingVertical: spacing.PADDING_12,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
});

export default CourseCategoryCard;
