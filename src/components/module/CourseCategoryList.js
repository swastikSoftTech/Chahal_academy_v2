import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import CourseCategoryCard from '../row/CourseCategoryCard';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {StackNav, TabNav} from '../../navigation/NavigationKeys';

const CourseCategoryList = ({
  courseCategories,
  cardStyle,
  from,
  footerComponent,
}) => {
  const {navigate} = useNavigation();
  const onPressCategory = cat => {
    navigate(StackNav.CourseCategory, {
      id: cat?.id,
    });
  };
  return (
    <FlatList
      data={courseCategories || []}
      renderItem={({item, index}) => (
        <CourseCategoryCard
          key={'courseCategories' + index}
          category={item}
          index={index}
          onPressCategory={onPressCategory}
          containerStyle={{
            marginTop:
              index === 0 || index === 1
                ? from == TabNav.HomeTab
                  ? 0
                  : spacing.MARGIN_16
                : 0,
            marginBottom: spacing.MARGIN_16,
            ...cardStyle,
          }}
        />
      )}
      columnWrapperStyle={{gap: spacing.MARGIN_12}}
      // ItemSeparatorComponent={
      //   <View style={{marginBottom: spacing.MARGIN_12}} />
      // }
      keyExtractor={(item, index) => String(index)}
      numColumns={2}
      contentContainerStyle={{paddingHorizontal: APP_PADDING_HORIZONTAL}}
      showsVerticalScrollIndicator={false}
      ListFooterComponent={footerComponent}
    />
  );
};

const styles = StyleSheet.create({});

export default CourseCategoryList;
