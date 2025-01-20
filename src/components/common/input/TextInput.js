import React, {useState} from 'react';
import {
  Keyboard,
  StyleSheet,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import {spacing} from '../../../styles/spacing';
import colors from '../../../styles/colors';
import {textScale} from '../../../styles/responsiveStyles';
import {fontNames} from '../../../styles/typography';
import RegularText from '../text/RegularText';

const TextInput = ({
  placeHolder,
  onChangeText,
  onSubmitEditing,
  refValue,
  keyboardType,
  returnKeyType,
  secureTextEntry,
  inputStyle,
  editable,
  value,
  error,
  rightComponent,
  leftComponent,
  onPressInput,
  mainViewStyle,
  autoCapitalize,
  maxChar,
  ref,
  multiline,
  inputContainerStyle,
  autoFocus,
  label,
  labelRightComponent,
  labelStyle,
  fieldActiveColor,
  labelContainerStyle,
  placeholderTextColor,
}) => {
  const [isFieldActive, setIsFieldActive] = useState(false);
  const [isUserOnInput, setIsUserOnInput] = useState(false);

  function _handleFocus() {
    if (!isUserOnInput) {
      setIsUserOnInput(true);
    }
    if (!isFieldActive) {
      setIsFieldActive(true);
    }
  }

  function _handleBlur() {
    if (isUserOnInput) {
      setIsUserOnInput(false);
    }
    if (isFieldActive) {
      setIsFieldActive(false);
    }
  }
  return (
    <View style={[mainViewStyle]} ref={ref}>
      {label && (
        <View style={[styles.labelContainer, labelContainerStyle]}>
          <RegularText style={[styles.labelStyle, labelStyle]}>
            {label}
          </RegularText>
          {labelRightComponent ? labelRightComponent : null}
        </View>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            borderColor: isFieldActive
              ? fieldActiveColor || colors.black
              : colors.grey300,
          },
          error != '' && {borderColor: colors.red500},
          editable == false && {
            backgroundColor: colors.grey200,
            borderWidth: 0,
          },
          inputContainerStyle,
        ]}>
        {leftComponent ? leftComponent : null}
        {/* <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}> */}
        <RNTextInput
          ref={refValue}
          placeholder={placeHolder ? placeHolder : '' || ''}
          placeholderTextColor={placeholderTextColor || colors.grey500}
          value={value}
          editable={editable != undefined ? editable : true}
          multiline={multiline != undefined ? multiline : false}
          showSoftInputOnFocus={onPressInput ? false : true}
          style={[styles.textInputStyle, inputStyle, {}]}
          keyboardType={keyboardType}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize || 'sentences'}
          autoFocus={autoFocus || false}
          maxLength={maxChar ? maxChar : undefined}
          onFocus={() => _handleFocus()}
          onBlur={() => _handleBlur()}
          onPressIn={() => {
            if (onPressInput) {
              Keyboard.dismiss();
              onPressInput();
            }
          }}
          onSubmitEditing={() => onSubmitEditing()}
          onChangeText={value => onChangeText(value)}
        />
        {/* </TouchableOpacity> */}
        {rightComponent ? rightComponent : null}
      </View>
      <RegularText style={styles.errorStyle}>{error || ''}</RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {},
  inputContainer: {
    height: spacing.HEIGHT_52,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: spacing.RADIUS_8,
    backgroundColor: colors.white,
    borderWidth: spacing.WIDTH_1,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.MARGIN_8,
  },
  labelStyle: {
    fontSize: textScale(13),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
  },
  textInputStyle: {
    flex: 1,
    color: colors.black,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    fontSize: textScale(14),
    paddingHorizontal: spacing.PADDING_20,
  },
  errorStyle: {
    fontSize: textScale(10),
    color: colors.red500,
    marginTop: spacing.MARGIN_4,
    marginLeft: spacing.MARGIN_12,
  },
});

export default TextInput;
