import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import {spacing} from '../../styles/spacing';
import {ImagePaths} from '../../utils/imagePaths';
import Image from '../common/Image';
import Title from '../common/text/Title';
import CourseCategoryCard from '../row/CourseCategoryCard';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../navigation/NavigationKeys';
import {SCREEN_COURSE_CATEGORY} from '../../utils/constants';

// const CourseCategoryCard = ({isLarge, category}) => {
//   return (
//     <View
//       style={[
//         styles.categoryCardContainer,
//         // {height: isLarge ? spacing.HEIGHT_216 : spacing.HEIGHT_178},
//       ]}>
//       <Image
//         source={{uri: category.image}}
//         style={[
//           styles.categoryImg,
//           {height: isLarge ? spacing.HEIGHT_146 : spacing.HEIGHT_128},
//         ]}
//         resizeMode={'cover'}
//       />
//       <RegularText style={styles.categoryName}>{category.name}</RegularText>
//     </View>
//   );
// };

const HomePopularCategories = ({courses}) => {
  const {navigate} = useNavigation();
  const onPressCategory = cat => {
    navigate(StackNav.CourseCategory, {
      id: cat?.id,
    });
  };
  function onPressSeeAll() {
    navigate(SCREEN_COURSE_CATEGORY);
  }
  return (
    <View style={styles.mainContainer}>
      <Title title={'Popular Courses'} />
      {courses?.length ? (
        <View style={styles.coursesGridContainer}>
          <View style={{gap: spacing.MARGIN_12}}>
            <CourseCategoryCard
              isLarge={true}
              category={courses[0]}
              onPressCategory={onPressCategory}
            />
            <CourseCategoryCard
              category={courses[1]}
              onPressCategory={onPressCategory}
            />
          </View>
          <View style={{gap: spacing.MARGIN_12, height: '100%'}}>
            <CourseCategoryCard
              category={courses[2]}
              onPressCategory={onPressCategory}
            />
            <TouchableOpacity
              onPress={onPressSeeAll}
              style={[
                styles.categoryCardContainer,
                styles.seeAllCard,
                // {height: '100%'},
              ]}>
              <Image source={ImagePaths.SEE_MORE} style={styles.seeMore_icon} />
              <Title title={'See All'} style={{marginTop: spacing.MARGIN_6}} />
            </TouchableOpacity>
            {/* <CourseCategoryCard isLarge={true} category={courses[3]} /> */}
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    alignSelf: 'center',
  },
  coursesGridContainer: {
    ...commonStyle.flexDirectionRow,
    marginBottom: spacing.MARGIN_12,
    gap: spacing.MARGIN_12,
  },
  // categoryCardContainer: {
  //   width:
  //     (spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2 - spacing.MARGIN_12) / 2,
  //   // height: spacing.HEIGHT_180,
  //   backgroundColor: colors.white,
  //   borderRadius: spacing.RADIUS_12,
  //   overflow: 'hidden',
  //   ...boxShadow(),
  //   backgroundColor: colors.cardBackgroundColor2,
  // },
  // categoryImg: {
  //   width: '100%',
  // },
  // categoryName: {
  //   paddingHorizontal: spacing.PADDING_10,
  //   paddingVertical: spacing.PADDING_12,
  // },
  seeAllCard: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.cardBackgroundColor2,
    borderRadius: spacing.RADIUS_12,
  },
  seeMore_icon: {
    width: spacing.WIDTH_90,
    height: spacing.WIDTH_90,
  },
});

export default HomePopularCategories;
