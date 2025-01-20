import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import colors from '../../styles/colors';
import Title from '../common/text/Title';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import {boxShadow} from '../../styles/Mixins';

const BlogCard = ({blog, index, onPressBlog}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        index == 0 && {marginTop: spacing.MARGIN_16},
      ]}
      onPress={onPressBlog}>
      <View style={styles.thumbnail} />
      <Title
        title={'Chahal Academy - Employee you to empower your child'}
        style={styles.title}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: spacing.MARGIN_16,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    borderRadius: spacing.RADIUS_6,
    overflow: 'hidden',
    backgroundColor: colors.white,
    ...boxShadow(),
  },
  thumbnail: {
    height: spacing.HEIGHT_160,
    backgroundColor: colors.grey300,
  },
  title: {
    fontSize: textScale(13),
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    padding: spacing.PADDING_10,
  },
});

export default BlogCard;
