//Library Imports
import React from 'react';
import {ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';

//Local Imports
import {getHeight, moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import CText from './CText';

export default function CButton({
  title,
  type,
  color,
  onPress,
  containerStyle,
  style,
  icon = null,
  frontIcon = null,
  bgColor = null,
  children,
  isLoading,
  ...props
}) {
  const colors = useSelector(state => state.theme.theme);
  return (
    <TouchableOpacity
      disabled={isLoading}
      style={[
        localStyle.btnContainer,
        styles.rowCenter,
        containerStyle,
        bgColor
          ? {backgroundColor: bgColor}
          : {backgroundColor: colors.primary},
      ]}
      onPress={onPress}
      {...props}>
      {isLoading ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <>
          {frontIcon}
          <CText type={type} style={style} color={color ? color : colors.white}>
            {title}
          </CText>
          {icon}
        </>
      )}

      {children}
    </TouchableOpacity>
  );
}

const localStyle = StyleSheet.create({
  btnContainer: {
    height: getHeight(45),
    borderRadius: moderateScale(55) / 2,
  },
});
