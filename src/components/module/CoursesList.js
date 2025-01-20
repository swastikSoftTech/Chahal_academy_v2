import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import StoreProductCard from '../row/StoreProductCard';
import {spacing} from '../../styles/spacing';
import {useNavigation} from '@react-navigation/native';
import CourseCard from '../row/CourseCard';
import {StackNav} from '../../navigation/NavigationKeys';

const CourseList = ({courses}) => {
  const {navigate} = useNavigation();
  const onPressCard = item => {
    navigate(StackNav.CourseCategoryDetailScreen, {
      slug: item?.slug,
      id: item?.id,
    });
  };
  return (
    <View>
      <FlatList
        data={courses}
        renderItem={({item, index}) => (
          // <></>
          <CourseCard
            course={item}
            index={index}
            onPressCourse={onPressCard}
            key={'courses' + index}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{gap: spacing.MARGIN_12}}
        // contentContainerStyle={{
        //   gap: spacing.MARGIN_12,
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CourseList;
