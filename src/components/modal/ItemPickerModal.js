import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import {spacing} from '../../styles/spacing';
import RegularText from '../common/text/RegularText';
import Image from '../common/Image';
import {ImagePaths} from '../../utils/imagePaths';
import CommonModal from '../common/modal/CommonModal';
import colors from '../../styles/colors';
import ItemPickerModalRow from '../row/itemPickerModalRow';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const ItemPickerModal = ({
  visible,
  onClose,
  title,
  data,
  onPressItem,
  value,
  displayKey,
}) => {
  return (
    <CommonModal
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose()}
      transparent={true}
      hideCloseIcon={true}
      transparentBlackViewStyle={{}}>
      <View style={styles.headerView}>
        {/* <View style={{ flex: 1 }} > */}
        {/* <RegularText
                        title={title}
                        fontFamily={fontNames.FONT_FAMILY_SEMI_BOLD}
                        textStyle={styles.titleStyle}
                    /> */}
        <RegularText style={styles.titleStyle}>{title}</RegularText>
        {/* </View> */}
        <TouchableOpacity
          onPress={() => onClose()}
          style={styles.closeIconContainer}>
          <Image
            source={ImagePaths.CLOSE_ICON}
            style={{tintColor: colors.grey600}}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(index)}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        listKey={'itemPickerModalList'}
        renderItem={({item, index}) => {
          return (
            <ItemPickerModalRow
              item={item}
              onPressItem={onPressItem}
              displayKey={displayKey}
              key={'itemPickerModalList_row' + index}
            />
          );
        }}
      />
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: textScale(15),
  },
  titleStyle: {
    fontSize: textScale(16),
    color: colors.theme,
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    textTransform: 'capitalize',
    alignSelf: 'center',
  },
  headerView: {
    paddingVertical: spacing.PADDING_12,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconContainer: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
});

export default ItemPickerModal;
