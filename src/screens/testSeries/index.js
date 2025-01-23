import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import Header from '../../components/common/header/Header';
import RegularText from '../../components/common/text/RegularText';
import Image from '../../components/common/Image';
import {ImagePaths} from '../../utils/imagePaths';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {textScale} from '../../styles/responsiveStyles';
import LinearGradient from 'react-native-linear-gradient';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import commonStyle from '../../styles/commonStyles';
import {useState} from 'react';
import TestSeriesAnalyticsModal from '../../components/modal/TestSeriesAnalyticsModal';
import TestSeriesList from '../../components/module/TestSeriesList';
import {useGetTestSeriesCourseQuery} from '../../redux/apis/testSeries.api';
import {useNavigation} from '@react-navigation/native';
import {
  SCREEN_TEST_SERIES_FOLDER,
  SCREEN_TEST_SERIES_RESULT,
} from '../../utils/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import FullScreenLoading from '../../components/common/FullScreenLoading';

const TestSeries = ({route}) => {
  const {params} = route;
  const {courseName, courseId} = params;

  const navigation = useNavigation();

  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  const {
    data: testSeriesRes,
    isUninitialized,
    isLoading: isTestSeriesCourseLoading,
    error,
  } = useGetTestSeriesCourseQuery(courseId);
  console.log('message >>>', testSeriesRes?.analytics);

  const onPressTestCategory = () => {
    setShowAnalyticsModal(true);
  };
  const closeAnalyticssModal = () => {
    setShowAnalyticsModal(false);
  };
  const onPressStartTest = testSeries => {
    navigation.navigate(StackNav.StartTest, {
      qId: testSeries?.id,
      name: testSeries.name,
    });
  };

  const navigateToTestFolder = testSeries => {
    navigation.navigate(SCREEN_TEST_SERIES_FOLDER, {
      courseName: testSeries.name,
      submoduleId: testSeries.id,
    });
  };

  const onPressResult = (qId, attempt, type) => {
    navigation.navigate(SCREEN_TEST_SERIES_RESULT, {qId, attempt, type});
  };

  return (
    <View style={styles.mainContainer}>
      <Header title={courseName} hideBack={false} />
      {isTestSeriesCourseLoading ? (
        <FullScreenLoading isLoading={isTestSeriesCourseLoading} />
      ) : (
        <>
          {/* <TouchableOpacity onPress={onPressTestCategory}>
            <LinearGradient
              colors={['#d418a0', '#ec3a7c', '#ffcc00']}
              start={{x: 0.5, y: 0}}
              end={{x: 0, y: 0.5}}
              style={styles.testCategoryContainer}>
              <RegularText style={styles.title}>{courseName}</RegularText>
              <Image source={ImagePaths.ABOUT} style={styles.aboutIcon} />
            </LinearGradient>
          </TouchableOpacity> */}
          <View style={styles.seconderyContainer}>
            <TestSeriesList
              testSeriesData={
                (testSeriesRes?.message?.length &&
                  testSeriesRes?.message[0]?.course_relation_liveclassmodule[0]
                    ?.coursemodule?.length &&
                  testSeriesRes?.message[0]?.course_relation_liveclassmodule[0]
                    ?.coursemodule[0]?.test_series) ||
                []
              }
              course={
                testSeriesRes?.message?.length &&
                testSeriesRes?.message[0]?.course_relation_liveclassmodule[0]
                  ?.coursemodule?.length &&
                testSeriesRes?.message[0]?.course_relation_liveclassmodule[0]
                  ?.coursemodule[0]
              }
              onPressStartTest={onPressStartTest}
              navigateToTestFolder={navigateToTestFolder}
              onPressResult={onPressResult}
            />
          </View>
        </>
      )}
      <TestSeriesAnalyticsModal
        visible={showAnalyticsModal}
        onRequestClose={closeAnalyticssModal}
        average={testSeriesRes?.analytics[0]?.avg}
        message={testSeriesRes?.analytics[0]?.message}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
  testCategoryContainer: {
    marginVertical: spacing.MARGIN_16,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    ...commonStyle.flexDirectionRow,
    padding: spacing.PADDING_10,
    gap: spacing.MARGIN_10,
    alignSelf: 'flex-start',
    borderRadius: spacing.RADIUS_8,
  },
  title: {
    color: colors.white,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    fontSize: textScale(16),
  },
  aboutIcon: {
    width: spacing.WIDTH_18,
    height: spacing.WIDTH_18,
    tintColor: colors.white,
  },
  seconderyContainer: {
    flex: 1,
  },
});
export default TestSeries;
