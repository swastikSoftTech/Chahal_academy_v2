import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {fontNames} from '../../../styles/typography';
import colors from '../../../styles/colors';

const RegularText = props => {
  return (
    <Text {...props} style={[styles.text, props.style, props.style2]} >
      {props.children}
    </Text>
  );
};

RegularText.prototype = {
  style: 'Object',
};

RegularText.defaultProps = {
  children: '',
};

const styles = StyleSheet.create({
  text: {
    color: colors.grey900,
    fontFamily: fontNames.FONT_PRIMARY_REGULAR,
  },
});

export default RegularText;
