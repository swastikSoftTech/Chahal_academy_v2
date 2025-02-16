import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import FullScreenLoading from '../../components/common/FullScreenLoading';
import Header from '../../components/common/header/Header';
import TestSeriesAnalyticsModal from '../../components/modal/TestSeriesAnalyticsModal';
import TestSeriesList from '../../components/module/TestSeriesList';
import { StackNav } from '../../navigation/NavigationKeys';
import {
  useGetTestSeriesCourseSubmoduleQuery
} from '../../redux/apis/testSeries.api';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import { APP_PADDING_HORIZONTAL } from '../../themes/commonStyle';
import { SCREEN_TEST_SERIES_FOLDER, SCREEN_TEST_SERIES_RESULT } from '../../utils/constants';

const TestSeriesFolder = ({route}) => {
  const {params} = route;
  const {courseName, submoduleId} = params;
  console.log("params >>>>>>>", params);

  const navigation = useNavigation();
  const isFocused = useIsFocused()

  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);

  const {
    data: testSeriesRes,
    isUninitialized,
    isLoading: isTestSeriesCourseSubmoduleLoading,
    refetch : refetchTesetSeries
  } = useGetTestSeriesCourseSubmoduleQuery(submoduleId);
  console.log('testSeriesRes folder folder >>>', JSON.stringify(testSeriesRes));

useEffect(() => {
  if(isFocused)refetchTesetSeries()
}, [isFocused])

  const onPressTestCategory = () => {
    setShowAnalyticsModal(true);
  };
  const closeAnalyticssModal = () => {
    setShowAnalyticsModal(false);
  };
  const onPressTestSeriesCard = () => {};

  const onPressResult = (qId, attempt, type) => {
    navigation.navigate(SCREEN_TEST_SERIES_RESULT, {qId, attempt, type});
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
  return (
    <View style={styles.mainContainer}>
      <Header title={courseName} hideBack={false} />
      {isTestSeriesCourseSubmoduleLoading ? (
        <FullScreenLoading isLoading={isTestSeriesCourseSubmoduleLoading} />
      ) : (
        <>
          {/* <TouchableOpacity onPress={onPressTestCategory}>
            <LinearGradient
              colors={['#d418a0', '#ec3a7c', '#ffcc00']}
              start={{x: 0.5, y: 0}}
              end={{x: 0, y: 0.5}}
              style={styles.testCategoryContainer}>
              <RegularText style={styles.title}>Ncert Test Series</RegularText>
              <Image source={ImagePaths.ABOUT} style={styles.aboutIcon} />
            </LinearGradient>
          </TouchableOpacity> */}
          <View style={styles.seconderyContainer}>
            <TestSeriesList
              testSeriesData={testSeriesRes?.message || []}
              onPressTestSeriesCard={onPressTestSeriesCard}
              onPressResult={onPressResult}
              onPressStartTest={onPressStartTest}
              navigateToTestFolder={navigateToTestFolder}
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
export default TestSeriesFolder;
