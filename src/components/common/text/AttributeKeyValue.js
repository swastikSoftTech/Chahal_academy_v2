import React from 'react';
import {StyleSheet, View} from 'react-native';
import {textScale} from '../../../styles/responsiveStyles';
import colors from '../../../styles/colors';
import {fontNames} from '../../../styles/typography';
import RegularText from './RegularText';

const AttributeKeyValue = ({
  title,
  value,
  titleStyle,
  valueStyle,
  mainViewStyle,
  valueComponent,
}) => {
  return (
    <View style={[styles.container, mainViewStyle]}>
      <RegularText style={[styles.titleStyle, titleStyle]}>
        {title} :{' '}
      </RegularText>
      {valueComponent ? (
        valueComponent
      ) : (
        <RegularText style={[styles.valueStyle, valueStyle]}>
          {value}
        </RegularText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: textScale(14),
    textTransform: 'capitalize',
    color: colors.grey900,
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
  },
  valueStyle: {
    flex: 1,
    fontSize: textScale(14),
    color: colors.grey900,
    fontFamily: fontNames.FONT_FAMILY_SEMI_BOLD,
  },
});

export default AttributeKeyValue;
