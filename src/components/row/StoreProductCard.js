import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import colors from '../../styles/colors';
import RegularText from '../common/text/RegularText';
import commonStyle from '../../styles/commonStyles';
import {fontNames} from '../../styles/typography';
import {textScale} from '../../styles/responsiveStyles';
import {boxShadow} from '../../styles/Mixins';
import Image from '../common/Image';

const CARD_WIDTH =
  (spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2 - spacing.MARGIN_12) / 2;
const StoreProductCard = ({product, index, onPressProduct}) => {
  const price = parseInt(
    product.price - (product.price / 100) * product.discount,
  );
  return (
    <TouchableOpacity
      style={[
        styles.mainContainer,
        index % 2 == 0 && {marginLeft: APP_PADDING_HORIZONTAL},
      ]}
      onPress={() => onPressProduct(product)}>
      {/* <View  /> */}
      <Image
        style={styles.productImg}
        resizeMode={'cover'}
        source={product.images[0]}
        // viewStyle={styles.productImgView}
      />
      <View style={styles.detailsContainer}>
        <RegularText numberOfLines={2} style={styles.productName}>
          {product.title}
        </RegularText>
        <View style={[commonStyle.flexDirectionRow, {gap: spacing.MARGIN_6}]}>
          <RegularText style={styles.price}>₹{price}</RegularText>
          <RegularText style={styles.discount}>
            {`(${product.discount}% Off)`}
          </RegularText>
        </View>
        <RegularText style={styles.actualPrice}>₹{product.price}</RegularText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: CARD_WIDTH,
    // borderWidth: 1,
    borderRadius: spacing.RADIUS_12,
    overflow: 'hidden',
    backgroundColor: colors.white,
    marginBottom: spacing.MARGIN_12,
    ...boxShadow(),
  },
  productImgView: {
    paddingVertical: spacing.PADDING_12,
    backgroundColor: colors.grey200,
  },
  productImg: {
    width: '100%',
    height: spacing.HEIGHT_226,
    backgroundColor: colors.grey200,
  },
  detailsContainer: {
    paddingHorizontal: spacing.PADDING_6,
    paddingVertical: spacing.PADDING_12,
  },
  productName: {
    fontSize: textScale(13),
  },
  price: {
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    fontSize: textScale(14),
  },
  discount: {
    color: colors.green600,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    fontSize: textScale(12),
  },
  actualPrice: {
    textDecorationLine: 'line-through',
    color: colors.grey600,
    marginTop: -spacing.MARGIN_6,
  },
});

export default StoreProductCard;
