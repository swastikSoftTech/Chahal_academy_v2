import React from 'react';
import {StyleSheet, View} from 'react-native';
import RegularText from '../common/text/RegularText';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {fontNames} from '../../styles/typography';

const CARD_WIDTH = spacing.FULL_WIDTH / 1.4;

const TestimonialCard = ({testimonial, containerStyle}) => {
  return (
    <View style={[styles.mainContainer, containerStyle]}>
      <View style={styles.img} />
      <RegularText style={styles.msg}>
        Shruti sharma is an aluminus of St. Stephens College, Delhi , and hells
        from Bijnor, Uttar Pradesh. She pursued her post gradutation from Delhi
        school of economics.She has always wanted to serve a society in one way
        or another and saw IASservices with the most scope of serving the
        underpreviliaged and therefore decided to pursue civil services.
      </RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.lightTheme01,
    padding: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_6,
    width: CARD_WIDTH,
  },
  img: {
    height: spacing.HEIGHT_160,
    backgroundColor: colors.grey300,
    borderRadius: spacing.RADIUS_4,
  },
  msg: {
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    textAlign: 'center',
    marginTop: spacing.MARGIN_12,
  },
});

export default TestimonialCard;
