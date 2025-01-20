import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../components/common/header/Header';
import Title from '../../components/common/text/Title';
import StoreProductsList from '../../components/module/StoreProductsList';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {SCREEN_PRODUCT_DETAIL} from '../../utils/constants';
import {ImagePaths} from '../../utils/imagePaths';

const PRODUCTS = [
  {
    title: 'Indian Economy NCERT Book',
    images: [ImagePaths.BOOK_ECO_FRONT, ImagePaths.BOOK_ECO_BACK],
    price: 290,
    discount: 20,
    description: `This book includes comprehensive coverage of Class 9-12 NCERT Books

MCQs & Subjective Questions are given after Each Unit

Book is Relevant for both

1) UPSC Civil Services Exam
2) State PCS Exam 

The best way to cover NCERTs 
`,
  },
  {
    title: 'Indian And World Geography NCERT Book',
    images: [ImagePaths.BOOK_GEO_FRONT, ImagePaths.BOOK_GEO_BACK],
    price: 590,
    discount: 20,
    description: `This book includes comprehensive coverage of Class 6-12 (old+new) NCERT Books

MCQs & Subjective Questions are given after Each Unit

Book is Relevant for both

1) UPSC Civil Services Exam
2) State PCS Exam 

The best way to cover NCERTs 
`,
  },
  {
    title: 'Indian Polity NCERT Book',
    images: [ImagePaths.BOOK_POL_FRONT, ImagePaths.BOOK_POL_BACK],
    price: 280,
    discount: 20,
    description: `This book includes comprehensive coverage of Class 6-12 (old+new) NCERT Books

MCQs & Subjective Questions are given after Each Unit

Book is Relevant for both

1) UPSC Civil Services Exam
2) State PCS Exam 

The best way to cover NCERTs 
`,
  },
  {
    title: 'Environment And Science NCERT Book',
    images: [ImagePaths.BOOK_SCIENCE_FRONT, ImagePaths.BOOK_SCIENCE_BACK],
    price: 295,
    discount: 20,
    description: `This book includes comprehensive coverage of Class 6-12 NCERT Books

MCQs & Subjective Questions are given after Each Unit

Book is Relevant for both

1) UPSC Civil Services Exam
2) State PCS Exam 

The best way to cover NCERTs 
`,
  },
  {
    title: 'Indian Society NCERT Book',
    images: [ImagePaths.BOOK_SOC_FRONT, ImagePaths.BOOK_SOC_BACK],
    price: 160,
    discount: 20,
    description: `This book includes comprehensive coverage of all NCERT Books

MCQs & Subjective Questions are given after Each Unit

Book is Relevant for both

1) UPSC Civil Services Exam
2) State PCS Exam 

The best way to cover NCERTs`,
  },
  {
    title: 'Indian And World History NCERT Book',
    images: [ImagePaths.BOOK_HIST_FRONT, ImagePaths.BOOK_HIST_BACK],
    price: 890,
    discount: 20,
    description: `This book includes comprehensive coverage of 
Class 6-12 (old+new) NCERT Books

MCQs & Subjective Questions are given after Each Unit

Book is Relevant for both

1) UPSC Civil Services Exam
2) State PCS Exam 

The best way to cover NCERTs`,
  },
];

const MaterialStore = product => {
  const {navigate} = useNavigation();
  const onPressProduct = product => {
    navigate(SCREEN_PRODUCT_DETAIL, {product: product});
  };

  return (
    <View style={styles.mainContainer}>
      <Header title={'Books Store'} showMenu />
      <ScrollView style={styles.contentContainer}>
        {/* <View style={styles.carousalSkeleton} /> */}
        <Title
          title={'Look into our books collection 🔥'}
          style={styles.title}
        />
        <StoreProductsList
          products={PRODUCTS}
          onPressProduct={onPressProduct}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  contentContainer: {
    // paddingHorizontal: APP_PADDING_HORIZONTAL,
  },
  carousalSkeleton: {
    height: spacing.HEIGHT_136,
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2,
    backgroundColor: colors.grey300,
    marginVertical: spacing.MARGIN_16,
    borderRadius: spacing.RADIUS_12,
    alignSelf: 'center',
  },
  title: {
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    marginBottom: spacing.MARGIN_8,
    marginTop: spacing.MARGIN_12,
  },
});

export default MaterialStore;
