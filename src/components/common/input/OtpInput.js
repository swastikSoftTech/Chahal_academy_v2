import React, {useEffect, useState} from 'react';
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewProps,
} from 'react-native';
import {textScale} from '../../../styles/responsiveStyles';
import {spacing} from '../../../styles/spacing';
import RegularText from '../text/RegularText';
import colors from '../../../styles/colors';
import { fontNames } from '../../../styles/typography';

const OtpInput = ({
  borderBottomColor,
  error,
  otpLength = 6,
  onCodeChange,
  onCodeFilled = () => {},
  code,
  label,
  labelStyle,
  mainViewStyle,
  autoFocus,
}) => {
  // const OTP_BOX_SIZE = (spacing.FULL_WIDTH - (APP_PADDING_HORIZONTAL * 2) - (spacing.MARGIN_20 * otpLength)) / otpLength
  const OTP_BOX_SIZE = spacing.WIDTH_42;
  const [otpCountArray, setOtpCountArray] = useState([]);

  useEffect(() => {
    if (otpCountArray.length === 0 || otpCountArray.length != otpLength) {
      let tempArr = [];
      for (let i = 1; i <= (otpLength || 6); i++) {
        tempArr.push(i);
      }
      setOtpCountArray(tempArr);
    }
  }, [otpLength]);

  function onSubmitEditing() {}
  return (
    <View
      style={[
        styles.mainView,
        {
          borderBottomColor:
            borderBottomColor != undefined ? borderBottomColor : colors.white,
        },
        mainViewStyle,
      ]}>
      {label && label != '' && (
        <RegularText style={[styles.labelStyle, labelStyle]}>
          {label}
        </RegularText>
      )}

      <View style={styles.fieldBoxContainer}>
        {otpCountArray.map((item, index) => (
          <View
            key={index}
            style={[
              styles.otpEmptyField,
              {
                width: OTP_BOX_SIZE,
                height: OTP_BOX_SIZE,
              },
              code.length > index && styles.otpFilledField,
            ]}>
            <RegularText
              style={{
                ...styles.otp,
                color: code.length > index ? colors.grey900 : colors.grey400,
              }}>
              {code.length > index ? code[index] : '0'}
            </RegularText>
          </View>
        ))}
      </View>
      <TextInput
        autoFocus={autoFocus || true}
        onSubmitEditing={onSubmitEditing}
        style={[
          styles.inputStyle,
          {
            height: OTP_BOX_SIZE * 1.5,
            width: OTP_BOX_SIZE * otpLength + spacing.MARGIN_8 * otpLength * 2,
          },
        ]}
        maxLength={otpLength}
        keyboardType={'numeric'}
        // placeholderTextColor="#212121"
        onChangeText={onCodeChange}
        value={code}
        cursorColor={colors.transparent}
        contextMenuHidden={true}
        caretHidden={true}
      />
      {error != '' && (
        <RegularText style={styles.errorStyle}>{error}</RegularText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: spacing.MARGIN_24,
  },
  labelStyle: {
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    marginBottom: spacing.MARGIN_20,
  },
  codeInputFieldStyle: {
    width: spacing.HEIGHT_50,
    height: spacing.HEIGHT_50,
    borderWidth: spacing.WIDTH_1,
    borderRadius: spacing.RADIUS_8,
    borderColor: colors.grey400,
    color: colors.black,
    fontSize: textScale(16),
    fontFamily: fontNames.FONT_PRIMARY_REGULAR,
  },
  codeInputHighlightStyle: {
    borderColor: colors.black,
  },
  fieldBoxContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  otpEmptyField: {
    borderBottomWidth: spacing.RADIUS_2,
    marginHorizontal: spacing.MARGIN_8,
    borderColor: colors.grey400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpFilledField: {
    borderColor: colors.grey800,
  },
  otp: {
    fontSize: textScale(16),
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
  inputStyle: {
    position: 'absolute',
    alignSelf: 'center',
    color: colors.transparent,
  },
  errorStyle: {},
});

export default OtpInput;
