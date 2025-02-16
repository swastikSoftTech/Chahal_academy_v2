import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import FullScreenLoading from '../../components/common/FullScreenLoading';
import Header from '../../components/common/header/Header';
import TestSeriesSubjectsList from '../../components/module/TestSeriesSubjectsList';
import { StackNav } from '../../navigation/NavigationKeys';
import {
  useLazyGetTestSeriesCoursesQuery
} from '../../redux/apis/testSeries.api';
import colors from '../../styles/colors';
import { spacing } from '../../styles/spacing';
import { APP_PADDING_HORIZONTAL } from '../../themes/commonStyle';

const TestSeriesSubjects = () => {
  const userDetails = useSelector(state => state.USER_SLICE); // retriving data from redux
  const navigation = useNavigation(); // for navigation
  
  const [
    getTestSeriesCourses,
    {data: testSeriesCoursesRes, isFetching: isTestSeriesCoursesLoading},
  ] = useLazyGetTestSeriesCoursesQuery(); // api call for test series subject

  useEffect(() => {
    if (userDetails.isUserLoggedIn) getTestSeriesCourses(); // checking is user logged in or not. If logged in than calling the api
  }, [userDetails.isUserLoggedIn]);

  function onPressTestSeriesSubject(courseId, courseName) {
    navigation.navigate(StackNav.TestSeries, {courseId, courseName}); 
  }

  return (
    <View style={styles.mainContainer}>
      <Header
        title={'Test Series'}
        hideBack
        showMenu
        showLogin={!userDetails?.isUserLoggedIn}
      />
      {userDetails?.isUserLoggedIn ? (
        isTestSeriesCoursesLoading ? (
          <FullScreenLoading isLoading={isTestSeriesCoursesLoading} />
        ) : (
          <View style={styles.seconderyContainer}>
            <TestSeriesSubjectsList
              testSeriesCategoryData={testSeriesCoursesRes || []}
              onPressTestSeriesSubject={onPressTestSeriesSubject}
            />
          </View>
        )
      ) : (
        <LottieView
          source={require('../../assets/lottie/login.json')}
          autoPlay
          loop
          style={styles.loginImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  seconderyContainer: {
    flex: 1,
  },
  loginImage: {
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2,
    height: spacing.FULL_WIDTH,
    alignSelf: 'center',
    marginTop: spacing.MARGIN_100,
  },
});

export default TestSeriesSubjects;
