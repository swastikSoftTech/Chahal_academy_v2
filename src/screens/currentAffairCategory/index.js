import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CSafeAreaView from '../../components/common/CSafeAreaView';
// import {colors} from '../../../../themes';
import Header from '../../components/common/header/Header';
import CurrentAffairCategoryList from '../../components/module/CurrentAffairCategoryList';
import {CURRENT_AFFAIR_CATEGORY_TYPE} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../navigation/NavigationKeys';

const CURRENT_AFFAIR_CATEGORY_DATA = [
  {
    type: CURRENT_AFFAIR_CATEGORY_TYPE.IMPORTANT_CURRENT_AFFAIR,
    name: 'What To Read In The Hindu',
    imageUrl:
      'https://chahalacademy.com/assets/upsc/what-to-read-in-hindu.webp',
  },
  {
    type: CURRENT_AFFAIR_CATEGORY_TYPE.READ_INDIAN_EXPRESS,
    name: 'What To Read In Indian Express',
    imageUrl:
      'https://chahalacademy.com/assets/upsc/what-to-read-in-indian-express.webp',
  },
  {
    type: CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR,
    name: 'The Hindu Editorial Analysis',
    imageUrl:
      'https://chahalacademy.com/assets/upsc/the-hindu-editorial-analysis.webp',
  },
  {
    type: CURRENT_AFFAIR_CATEGORY_TYPE.INDIAN_EXPRESS,
    name: 'Indian Express Editorial Analysis',
    imageUrl:
      'https://chahalacademy.com/assets/upsc/the-indian-express-editorial-analysis.webp',
  },
];

export default function CurrentAffairCategory() {
  const navigation = useNavigation();
  function onPressCurrentAffairCategoryCard(item) {
    navigation.navigate(StackNav.CurrentAffairListing, {
      currentAffairCategory: item,
    });
  }
  return (
    <CSafeAreaView style={localStyles.mainContainer}>
      <Header title={'Current Affairs'} showMenu />
      <View style={localStyles.seconderyContainer}>
        <CurrentAffairCategoryList
          data={CURRENT_AFFAIR_CATEGORY_DATA}
          onPressCurrentAffairCategoryCard={onPressCurrentAffairCategoryCard}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  seconderyContainer: {
    flex: 1,
  },
});
