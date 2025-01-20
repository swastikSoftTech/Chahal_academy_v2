import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';

// Custom Imports
import {Back_Dark_Icon, Back_Light_Icon} from '../../assets/svgs';
import {Montserrat_Medium} from '../../common/constants';
import {styles} from '../../themes';

const CHeader = props => {
  const {
    title,
    onPressBack,
    rightIcon,
    isHideBack,
    isLeftIcon,
    customTextStyle = {},
  } = props;
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  useFocusEffect(() => {
    // React.useCallback(() => {
    StatusBar.setBackgroundColor(colors?.backgroundColor);
    StatusBar.setBarStyle('dark-content');
    // }, []);
  });

  const goBack = () => navigation.goBack();
  return (
    <View
      style={[
        localStyles.container,
        !!isHideBack && styles.pr10,
        props.containerStyle,
      ]}>
      <View style={[styles.rowStart, styles.flex]}>
        {!isHideBack && (
          <TouchableOpacity style={styles.pr10} onPress={onPressBack || goBack}>
            {colors.dark == 'dark' ? <Back_Dark_Icon /> : <Back_Light_Icon />}
          </TouchableOpacity>
        )}
        {!!isLeftIcon && isLeftIcon}
        {/* 
        <Text style={[styles.pr10, styles.mr10,{ fontFamily: Montserrat_Bold, textAlign: "center", color: 'black' }]}>{title}</Text> */}
        <Text
          numberOfLines={1}
          style={[
            styles.pr10,
            styles.mr10,
            {
              fontFamily: Montserrat_Medium,
              color: 'black',
              fontSize: 18,
              letterSpacing: 0.5,
              ...customTextStyle,
            },
          ]}>
          {title}
        </Text>
      </View>
      {!!rightIcon && rightIcon}
    </View>
  );
};

export default memo(CHeader);

const localStyles = StyleSheet.create({
  container: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    ...styles.center,
  },
});
