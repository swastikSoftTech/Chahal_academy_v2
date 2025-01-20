import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {textScale} from '../../../styles/responsiveStyles';
import {spacing} from '../../../styles/spacing';
import {fontNames} from '../../../styles/typography';
import colors from '../../../styles/colors';
import Image from '../Image';
import RegularText from '../text/RegularText';

const Button = ({
  backgroundColor,
  title,
  textStyle,
  buttonStyle,
  onPressButton,
  disabled,
  fetching,
  rightImage,
  rightImageStyle,
  marginTop,
  leftImage,
  leftImageStyle,
  activityIndicatorColor,
  isSecondary,
  borderColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.buttonStyle,
        {
          backgroundColor: isSecondary
            ? backgroundColor || colors.transparent
            : backgroundColor != undefined
            ? backgroundColor
            : colors.theme,
          marginTop: marginTop,
        },
        {
          borderColor: borderColor ? borderColor : colors.theme,
        },
        disabled && {
          backgroundColor: colors.lightTheme02,
          borderColor: borderColor || colors.lightTheme02,
        },
        buttonStyle,
      ]}
      onPress={() => {
        if (!fetching) {
          onPressButton();
        }
      }}>
      {!fetching && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {leftImage ? (
            <View style={{alignItems: 'flex-end'}}>
              <Image source={leftImage} style={leftImageStyle} />
            </View>
          ) : null}
          <RegularText
            style={{
              ...styles.textStyle,
              ...{color: isSecondary ? colors.theme : colors.white},
              ...textStyle,
            }}>
            {title}
          </RegularText>
          {rightImage ? (
            <View style={{alignItems: 'flex-end'}}>
              <Image source={rightImage} style={rightImageStyle} />
            </View>
          ) : null}
        </View>
      )}
      {fetching == true && (
        <ActivityIndicator
          color={activityIndicatorColor || colors.white}
          size="small"
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: spacing.RADIUS_100,
    paddingHorizontal: spacing.PADDING_12,
    height: spacing.HEIGHT_48,
    justifyContent: 'center',
    borderWidth: spacing.WIDTH_2,
  },
  textStyle: {
    color: colors.white,
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
  },
});

Button.defaultProps = {
  onPressButton: () => {},
};

export default Button;
