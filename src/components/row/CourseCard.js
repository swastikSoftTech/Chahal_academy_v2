import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import Image from '../common/Image';
import RegularText from '../common/text/RegularText';

const CARD_WIDTH =
  (spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2 - spacing.MARGIN_12) / 2;
const CourseCard = ({course, index, onPressCourse}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        index % 2 == 0 && {marginLeft: APP_PADDING_HORIZONTAL},
      ]}
      onPress={() => onPressCourse(course)}>
      <Image
        source={
          course?.image
            ? {uri: course?.image}
            : require('../../assets/images/test.png')
        }
        style={styles.productImg}
        resizeMode={'cover'}
      />

      <View style={styles.detailsContainer}>
        <RegularText numberOfLines={2} style={styles.productName}>
          {course?.name}
        </RegularText>
        <RegularText style={styles.price}>{`₹${course?.amount}`}</RegularText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: CARD_WIDTH,
    borderRadius: spacing.RADIUS_12,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginBottom: spacing.MARGIN_12,
    ...boxShadow(colors.theme),
  },
  productImg: {
    width: '100',
    height: spacing.HEIGHT_136,
    backgroundColor: colors.grey300,
  },
  detailsContainer: {
    paddingHorizontal: spacing.PADDING_6,
    paddingVertical: spacing.PADDING_12,
  },
  productName: {
    fontSize: textScale(13),
  },
  price: {
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    fontSize: textScale(14),
  },
  discount: {
    color: colors.green600,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    fontSize: textScale(12),
  },
  actualPrice: {
    textDecorationLine: 'line-through',
    color: colors.grey600,
    marginTop: -spacing.MARGIN_6,
  },
});

export default CourseCard;
