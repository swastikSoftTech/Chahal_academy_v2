import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {spacing} from '../../styles/spacing';
import colors from '../../styles/colors';
import {textScale} from '../../styles/responsiveStyles';
import RegularText from '../common/text/RegularText';

const ItemPickerModalRow = ({item, index, onPressItem, displayKey}) => {
  console.log('item?????', item);

  return (
    <TouchableOpacity
      style={styles.mainView}
      activeOpacity={1}
      onPress={() => onPressItem(item, index)}>
      <RegularText style={styles.itemText}>{item[displayKey]}</RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.PADDING_12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey300,
  },
  hLine: {
    height: 1,
    width: spacing.FULL_WIDTH,
    backgroundColor: colors.secondaryColor,
  },
  itemText: {
    fontSize: textScale(14),
    color: colors.grey900,
  },
});

export default ItemPickerModalRow;
