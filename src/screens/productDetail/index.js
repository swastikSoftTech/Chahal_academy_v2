import React from 'react';
import {Linking, ScrollView, StyleSheet, View} from 'react-native';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {spacing} from '../../styles/spacing';
import colors from '../../styles/colors';
import RegularText from '../../components/common/text/RegularText';
import commonStyle from '../../styles/commonStyles';
import {fontNames} from '../../styles/typography';
import {textScale} from '../../styles/responsiveStyles';
import Button from '../../components/common/button/Button';
import Title from '../../components/common/text/Title';
import AttributeKeyValue from '../../components/common/text/AttributeKeyValue';
import BackButton from '../../components/common/button/BackButton';
import Header from '../../components/common/header/Header';
import ImageCarousal from '../../components/module/ImageCarousal';

const ProductDetail = ({route}) => {
  const {params} = route;
  const {product} = params;

  const price = parseInt(
    product.price - (product.price / 100) * product.discount,
  );

  const onBuy = () => {
    Linking.openURL(
      `whatsapp://send?text=Hello, I want to buy ${product.title}&phone=+918810655021`,
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* <BackButton /> */}
      <Header title={'Product Details'} showMenu />
      <ScrollView style={styles.contentContainer}>
        {/* <View style={styles.productImgs} /> */}
        <ImageCarousal
          dataArray={product.images}
          isLocalImg={true}
          imgStyle={styles.productImgs}
          imgContainerstyle={styles.productImgContainer}
          resizeMode={'cover'}
        />
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
        <View style={styles.seprator} />
        <Title title={'Product Details'} style={styles.productDetailTitle} />
        <RegularText>{product.description}</RegularText>
        {/* <AttributeKeyValue title={'Publication'} value={'Chahal Academy'} />
        <AttributeKeyValue title={'Publication Year'} value={'2024'} />
        <AttributeKeyValue title={'Laguage'} value={'English'} /> */}
      </ScrollView>
      <Button
        buttonStyle={styles.buyBtn}
        rightImage={require('../../assets/images/whatsapp.png')}
        rightImageStyle={{
          width: spacing.WIDTH_16,
          height: spacing.WIDTH_16,
          marginLeft: spacing.MARGIN_8,
        }}
        onPressButton={onBuy}
        title={'Buy Now'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: APP_PADDING_HORIZONTAL,
  },
  productImgContainer: {
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 4,
    // height: spacing.HEIGHT_300,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    marginVertical: spacing.MARGIN_12,
    borderRadius: spacing.RADIUS_12,
    // borderWidth: 1,
  },
  productImgs: {
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 4,
    backgroundColor: colors.grey300,
    // alignSelf: 'center',
    height: spacing.HEIGHT_420,
    // height: '100%',
    // height: spacing.HEIGHT_400,

    // width: '100%',
  },
  productName: {
    fontSize: textScale(15),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
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
  productDetailTitle: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
  },
  buyBtn: {
    margin: APP_PADDING_HORIZONTAL,
  },
  seprator: {
    width: '100%',
    height: spacing.HEIGHT_2,
    borderRadius: spacing.RADIUS_12,
    marginVertical: spacing.MARGIN_12,
    backgroundColor: colors.grey300,
  },
});
export default ProductDetail;
