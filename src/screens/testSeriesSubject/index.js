import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Header from '../../components/common/header/Header';
import colors from '../../styles/colors';
import TestSeriesSubjectsList from '../../components/module/TestSeriesSubjectsList';
import {useNavigation} from '@react-navigation/native';
import {StackNav} from '../../navigation/NavigationKeys';
import {
  useGetTestSeriesCoursesQuery,
  useLazyGetTestSeriesCoursesQuery,
} from '../../redux/apis/testSeries.api';
import FullScreenLoading from '../../components/common/FullScreenLoading';
import {useSelector} from 'react-redux';
import LottieView from 'lottie-react-native';
import {getWidth} from '../../common/constants';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {useEffect} from 'react';

const TestSeriesSubjects = () => {
  const userDetails = useSelector(state => state.USER_SLICE);
  const navigation = useNavigation();
  const [
    getTestSeriesCourses,
    {data: testSeriesCoursesRes, isFetching: isTestSeriesCoursesLoading},
  ] = useLazyGetTestSeriesCoursesQuery();

  useEffect(() => {
    if (userDetails.isUserLoggedIn) getTestSeriesCourses();
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
