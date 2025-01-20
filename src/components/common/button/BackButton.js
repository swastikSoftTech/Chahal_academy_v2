import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Back_Dark_Icon, Back_Light_Icon} from '../../../assets/svgs';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {spacing} from '../../../styles/spacing';
import colors from '../../../styles/colors';

const BackButton = ({onPress}) => {
  const {goBack} = useNavigation();

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={onPress || goBack}>
      {/* {colors.dark == 'dark' ? <Back_Dark_Icon /> : <Back_Light_Icon />} */}
      <Back_Dark_Icon />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: spacing.WIDTH_30,
    height: spacing.WIDTH_30,
    backgroundColor: colors.theme,
    borderRadius: spacing.RADIUS_90,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackButton;
