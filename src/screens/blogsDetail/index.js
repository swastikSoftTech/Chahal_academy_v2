import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../components/common/header/Header';
import colors from '../../styles/colors';
import BlogsList from '../../components/module/BlogsList';
import Title from '../../components/common/text/Title';
import RegularText from '../../components/common/text/RegularText';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';

const BlogDetail = () => {
  return (
    <View style={styles.mainContainer}>
      <Header title={'Blog Detail'} />
      <ScrollView style={styles.contentContainer}>
        <Title
          style={styles.title}
          title={'Chahal Academy - Employee you to empower your child'}
        />
        <View style={styles.thumbnail} />
        <RegularText style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          {'\n\n'}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          {'\n\n'}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </RegularText>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  contentContainer: {
    paddingHorizontal: APP_PADDING_HORIZONTAL,
  },
  title: {
    fontSize: textScale(13),
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    paddingHorizontal: spacing.PADDING_10,
    marginTop: spacing.MARGIN_24,
  },
  thumbnail: {
    height: spacing.HEIGHT_160,
    backgroundColor: colors.grey300,
    borderRadius: spacing.RADIUS_12,
    marginVertical: spacing.MARGIN_12,
  },
  description: {},
});

export default BlogDetail;
