import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import HomeHeader from '../../components/common/header/HomeHeader';
import CourseCategoryList from '../../components/module/CourseCategoryList';
import {customRequest} from '../../api/customRequest';
import colors from '../../styles/colors';
import {useDispatch} from 'react-redux';
import {showDrawer} from '../../redux/slices/drawerSlice';
import Header from '../../components/common/header/Header';
import Button from '../../components/common/button/Button';
import {spacing} from '../../styles/spacing';
import VirtualizedView from '../../components/common/VirtualizedView';

const CourseCategory = () => {
  const dispatch = useDispatch();
  const [courseCategories, setCourseCategories] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    getCourseCategory();
  }, []);
  const getCourseCategory = () => {
    // setIsLoading(true);
    customRequest('course-category/show-actives', 'GET').then(res => {
      // console.log('Category data', res);
      setCourseCategories(res?.message || []);
    });
    // setIsLoading(false);
    return;
  };
  const toggleDrawer = () => {
    // setVisibleDrawer(!visibleDrawer);
    dispatch(showDrawer());
  };
  return (
    <View style={styles.mainContainer}>
      {/* <Header title={'Courses'} hideBack showMenu showLogin /> */}
      <HomeHeader toggleDrawer={toggleDrawer} hideMenu={false} />

      <CourseCategoryList
        courseCategories={courseCategories.slice(
          0,
          loadMore ? courseCategories.length - 1 : 6,
        )}
        footerComponent={
          <Button
            title={loadMore ? 'Show Less' : 'Load More'}
            buttonStyle={styles.lodeMoreBtn}
            onPressButton={() => setLoadMore(!loadMore)}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  lodeMoreBtn: {
    alignSelf: 'center',
    marginBottom: spacing.MARGIN_20,
    paddingVertical: 0,
    height: 'auto',
  },
});

export default CourseCategory;
