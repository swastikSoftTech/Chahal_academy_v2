import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import RegularText from '../text/RegularText';
import Image from '../Image';
import {ImagePaths} from '../../../utils/imagePaths';
import {fontNames} from '../../../styles/typography';
import {spacing} from '../../../styles/spacing';
import {textScale} from '../../../styles/responsiveStyles';
import colors from '../../../styles/colors';
import ItemPickerModal from '../../modal/ItemPickerModal';

const ItemPicker = ({
  label,
  error,
  value,
  title,
  data,
  onSelectItem,
  displayKey,
  editable,
  labelStyle,
  labelRightComponent,
  mainViewStyle,
}) => {
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  function onPressPicker() {
    if (editable != false) {
      setIsPickerVisible(true);
    }
  }

  function closePicker() {
    setIsPickerVisible(false);
  }

  function onPressItem(item, index) {
    onSelectItem(item, index);
    closePicker();
  }

  return (
    <View style={[styles.mainView, mainViewStyle]}>
      {label && (
        <View style={styles.labelContainer}>
          <RegularText style={[styles.labelStyle, labelStyle]}>
            {label}
          </RegularText>
          {labelRightComponent ? labelRightComponent : null}
        </View>
      )}
      <TouchableOpacity
        style={[styles.inputView, {}]}
        onPress={() => onPressPicker()}
        activeOpacity={1}>
        <RegularText
          style={[
            styles.textInputStyle,
            {color: value == '' ? colors.grey400 : colors.grey900},
          ]}
          numberOfLines={1}>
          {value == '' ? title : value[displayKey]}
        </RegularText>
        {editable != false && (
          <Image
            source={ImagePaths.ARROW}
            style={[
              styles.downArrowStyle,
              isPickerVisible && {transform: [{rotate: '270deg'}]},
            ]}
            resizeMode={'contain'}
          />
        )}
      </TouchableOpacity>
      <RegularText style={styles.errorStyle}>{error || ''}</RegularText>
      <View>
        <ItemPickerModal
          visible={isPickerVisible}
          onClose={closePicker}
          title={title}
          data={data}
          onPressItem={onPressItem}
          value={value}
          displayKey={displayKey}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {},
  inputView: {
    paddingHorizontal: spacing.PADDING_20,
    justifyContent: 'space-between',
    height: spacing.HEIGHT_52,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: spacing.RADIUS_8,
    backgroundColor: colors.white,
    borderWidth: spacing.WIDTH_1,
    borderColor: colors.grey300,
  },
  textInputStyle: {
    fontSize: textScale(13),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    maxWidth: spacing.FULL_WIDTH / 1.3,
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
  errorStyle: {
    fontSize: textScale(10),
    color: colors.red500,
    marginTop: spacing.MARGIN_4,
    marginLeft: spacing.MARGIN_12,
  },
  downArrowStyle: {
    tintColor: colors.grey600,
    transform: [{rotate: '90deg'}],
    height: spacing.HEIGHT_14,
    width: spacing.HEIGHT_14,
  },
});

export default ItemPicker;
