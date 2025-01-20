import React from 'react';
import {StyleSheet, View} from 'react-native';
import CSafeAreaView from '../../components/common/CSafeAreaView';
// import {colors} from '../../../../themes';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/common/header/Header';
import CurrentAffairCategoryList from '../../components/module/CurrentAffairCategoryList';
import {StackNav} from '../../navigation/NavigationKeys';
import {CURRENT_AFFAIR_CATEGORY_TYPE} from '../../utils/constants';

const MAGAZINE_CATEGORY_TYPE = [
  {
    type: CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_MAGAZINE,
    name: 'Current Affairs Magazine',
    imageUrl:
      'https://chahalacademy.com/assets/upsc/current-affairs-magazine.webp',
  },
  {
    type: CURRENT_AFFAIR_CATEGORY_TYPE.YOJANA_MAGAZINE,
    name: 'Yojana Magazine',
    imageUrl: 'https://chahalacademy.com/assets/upsc/yojana-magazine.webp',
  },
  {
    type: CURRENT_AFFAIR_CATEGORY_TYPE.KURUKSHETRA_MAGAZINE,
    name: 'Kurukshetra Magazine',
    imageUrl: 'https://chahalacademy.com/assets/upsc/kurukshetra-magazine.webp',
  },
];

export default function MagazinesCategory() {
  const navigation = useNavigation();
  function onPressCurrentAffairCategoryCard(item) {
    navigation.navigate(StackNav.Magazines, {
      magazineCategoryData: item,
    });
  }
  return (
    <CSafeAreaView style={localStyles.mainContainer}>
      <Header title={'Magazines'} showMenu />
      <View style={localStyles.seconderyContainer}>
        <CurrentAffairCategoryList
          data={MAGAZINE_CATEGORY_TYPE}
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
