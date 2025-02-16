import { FlashList } from '@shopify/flash-list';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import WebView from 'react-native-webview';
import FullScreenLoading from '../../components/common/FullScreenLoading';
import Image from '../../components/common/Image';
import Header from '../../components/common/header/Header';
import RegularText from '../../components/common/text/RegularText';
import Title from '../../components/common/text/Title';
import EmptyComponenet from '../../components/module/EmptyComponenet';
import {
  useLazyGetTestSeriesResultsQuery,
  useLazyGetTestSeriesSingleResultQuery,
} from '../../redux/apis/testSeries.api';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import { APP_PADDING_HORIZONTAL } from '../../themes/commonStyle';
import { ImagePaths } from '../../utils/imagePaths';
import RenderHTML from 'react-native-render-html';
import { useIsFocused } from '@react-navigation/native';

const QUESTION_TYPE = {
  WRONG: 'WRONG',
  LEAVE: 'LEAVE',
};

const CHART_RADIOUS =
  spacing.FULL_WIDTH / 2 - APP_PADDING_HORIZONTAL * 4 - spacing.PADDING_12 * 5;

const TestSeriesResult = ({ route }) => {
  const { params } = route;
  const { qId, attempt, type } = params;

  const isFocused = useIsFocused()

  const attemptsArr = Array.from({ length: attempt }, (_, index) => index + 1);

  const [selectedAttempt, setSelectedAttempt] = useState(1);
  const [result, setResult] = useState(); // common result state for diffrent types of result
  const [questionType, setQuestionType] = useState(QUESTION_TYPE.WRONG);
  const [error, setError] = useState();

  const [
    getResults,
    { data: resultsRes, isFetching: isResultResLoading, error: resultsError, },
  ] = useLazyGetTestSeriesResultsQuery();
  const [
    getSingleResult,
    {
      data: singleResultRes,
      isFetching: isSingleResultLoading,
      error: singleresultError,
    },
  ] = useLazyGetTestSeriesSingleResultQuery();

  const ATTEMPT_PIE_DATA = [
    {
      value: result?.totalAttempt || 0,
      color: colors.green400,
      text: result?.totalAttempt || 0,
      textColor: colors.white,
      title: 'Attempted Question',
    }, // attempt
    {
      value: result?.leaveQuestion || 0,
      color: colors.blue200,
      text: result?.leaveQuestion || 0,
      textColor: colors.white,
      title: 'Unattempted Question',
    }, // leave
  ];
  const pieData = [
    {
      value: result?.correctAnswer || 0,
      color: colors.green500,
      text: result?.correctAnswer || 0,
      textColor: colors.white,
      title: 'Correct Answers',
    }, // correct
    {
      value: result?.wrongAnswer || 0,
      color: colors.red500,
      text: result?.wrongAnswer || 0,
      textColor: colors.white,
      title: 'Wrong Answers',
    }, // wrong
  ];

  useEffect(() => {
    // conditionaly fetching result as per type
    if (type == '1') getResults({ id: qId, attempt: selectedAttempt });
    else getSingleResult({ id: qId, attempt: selectedAttempt });
  }, [selectedAttempt, isFocused]);

  useEffect(() => {
    // conditionaly storing result response in result state as per type
    if (resultsRes) setResult(resultsRes);
    else setResult(singleResultRes);
    // string error for both types 
    if (resultsError) {
      setError(resultsError);
    } else if (singleresultError) setError(singleresultError);
    else setError(undefined)
  }, [resultsRes, singleResultRes, resultsError, singleresultError, isSingleResultLoading, isResultResLoading]);

  const onChangeAttempt = attempt => {
    setSelectedAttempt(attempt);
  };
console.log("result >>", result);
console.log("resultsRes >>", resultsRes);
console.log("singleResultRes >>", singleResultRes);

  const accuracy = (result?.correctAnswer / result?.totalAttempt) * 100;

  return (
    <View style={{ flex: 1, backgroundColor: colors.grey100 }}>
      <Header title={'Results'} hideBack={false} />
      {/* ------------------- ATTEMPTS HORIZONTAL LIST - STARTING ------------------- */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {attemptsArr.map((attempt, index) => {
            return (
              <TouchableOpacity
                onPress={() => onChangeAttempt(attempt)}
                key={attempt}
                style={[
                  styles.attemptContainer,
                  index == 0 && { marginLeft: APP_PADDING_HORIZONTAL },
                  index + 1 == attemptsArr.length && {
                    marginRight: APP_PADDING_HORIZONTAL,
                  },
                  selectedAttempt == attempt && { backgroundColor: colors.theme },
                ]}>
                <RegularText
                  style={[
                    styles.attemptNumber,
                    selectedAttempt == attempt && { color: colors.white },
                  ]}>
                  Attempt {attempt}
                </RegularText>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      {/*   ------------------- ATTEMPTS HORIZONTAL LIST - ENDING ------------------- */}
      {isResultResLoading || isSingleResultLoading ? (
        <FullScreenLoading
          isLoading={isResultResLoading || isSingleResultLoading}
        />
      ) : (
        <>
          {
            error?.originalStatus === 210 ||
              error?.originalStatus === 500 ||
              result?.totalAttempt == 0 ? (
              <View style={styles.notDataContainer}>
                <Image
                  source={ImagePaths.NOT_FOUND}
                  style={styles.notDataImg}
                />
                <Title title={'Test was not submitted properly'} />
              </View>
            ) : (
            
              <ScrollView
                style={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[2]}>
                <View style={styles.infromationContainer}>
                  <RenderInformation
                    title={'Total Marks'}
                    value={result?.totalQuestion * result?.eachQuestionMark}
                    icon={ImagePaths.REPORT}
                  />
                  <RenderInformation
                    title={'Scored Marks'}
                    value={parseFloat(result?.totalMarks).toFixed(2)}
                    icon={ImagePaths.SPEEDO_METER}
                  />
                  <RenderInformation
                    title={'Accuracy'}
                    value={parseFloat(accuracy).toFixed(2)}
                    icon={ImagePaths.ACCURACY}
                  />
                  <RenderInformation
                    title={'Negative Marks'}
                    value={result?.negativeMark * result?.wrongAnswer}
                    icon={ImagePaths.NEGATIVE_SIGN}
                  />
                </View>

                <View style={styles.chartContainer}>
                  <RenderChart
                    title={`Total Question: ${result?.totalQuestion || 0}`}
                    pieData={ATTEMPT_PIE_DATA}
                  />
                  <RenderChart
                    title={`Total Attempt: ${result?.totalAttempt || 0}`}
                    pieData={pieData}
                  />
                </View>

                {/* <View
                  style={[
                    commonStyle.flexDirectionRow,
                    {gap: spacing.MARGIN_12},
                  ]}>
                  <Button
                    title={'Download AnswerSheet'}
                    buttonStyle={styles.downloadBtn}
                    textStyle={styles.downloadBtnText}
                  />
                  <Button
                    title={'Download Result'}
                    buttonStyle={styles.downloadBtn}
                    textStyle={styles.downloadBtnText}
                  />
                </View> */}
                {/* <TopTabs tabsData={tabData} /> */}
                {/* ------------------- WRONG AND LEAVE QUESTIONS TAB - STARING ------------------- */}
                <View style={styles.questionTabContainer}>
                  <View style={styles.questionTabSubContainer}>
                    <RegularText
                      style={[
                        styles.tabTitle,
                        questionType === QUESTION_TYPE.WRONG &&
                        styles.selectedTabTitle,
                      ]}
                      onPress={() => setQuestionType(QUESTION_TYPE.WRONG)}>
                      Wrong Questions
                    </RegularText>
                    <RegularText
                      style={[
                        styles.tabTitle,
                        questionType === QUESTION_TYPE.LEAVE &&
                        styles.selectedTabTitle,
                      ]}
                      onPress={() => setQuestionType(QUESTION_TYPE.LEAVE)}>
                      Unattempted Questions
                    </RegularText>
                  </View>
                </View>
                {questionType === QUESTION_TYPE.WRONG ? (
                  <RenderQuestions questions={result?.wrongQuestions} />
                ) : (
                  <RenderQuestions questions={result?.leaveQuestions} />
                )}
              </ScrollView>
            )
            // ------------------- WRONG AND LEAVE QUESTIONS TAB - ENDING -------------------
          }
        </>
      )}
    </View>
  );
};

const RenderQuestions = ({ questions, questionType }) => {
  return (
    <FlashList
      data={questions || []}
      decelerationRate="fast"
      estimatedItemSize={50}
      renderItem={({ item: question, index }) => {
        return (
          <View style={[styles.questionContainer]} key={'Question' + index}>
            <RegularText style={styles.questionKey}>
              Question {index + 1}
            </RegularText>
            <RenderWebView html={question.question} index={index} isBold />
            <RegularText style={styles.questionKey}>
              Correct Answer :{' '}
              <RegularText style={styles.questionValue}>
                {question?.answer}
              </RegularText>
            </RegularText>
            {question?.your_answer && (
              <RegularText style={styles.questionKey}>
                Your Answer :{' '}
                <RegularText style={styles.questionValue}>
                  {question?.your_answer}
                </RegularText>
              </RegularText>
            )}
            <RegularText style={styles.questionKey}>
              Explanation :{' '}
            </RegularText>
            <RenderWebView html={question?.explaination} index={index} />
          </View>
        );
      }}
      ListEmptyComponent={() => (
        <EmptyComponenet
          message={`No ${questionType === QUESTION_TYPE.WRONG ? 'Wrong' : 'Unattempted'
            } Question`}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
};

const RenderInformation = ({ title, value, icon }) => {
  return (
    <View style={[styles.informationCard]}>
      <View style={{ flex: 1 }}>
        <RegularText style={styles.informationTitle}>{title}</RegularText>
        <RegularText style={styles.informationValue}>{value}</RegularText>
      </View>
      <Image source={icon} style={styles.informationIcon} />
    </View>
  );
};

const RenderChart = ({ title, pieData }) => {
  return (
    <View style={styles.chartCard}>
      <Title
        title={title}
        style={{ fontSize: textScale(12) }}
        adjustsFontSizeToFit
        numberOfLines={1}
      />
      <PieChart
        donut
        showText
        // textColor="black"
        radius={CHART_RADIOUS}
        textSize={textScale(12)}
        textBackgroundRadius={26}
        data={pieData}
      />
      <View style={{ width: '100%' }}>
        {pieData.map(data => {
          return (
            <View
              key={data.title}
              style={[
                commonStyle.flexDirectionRow,
                {
                  gap: spacing.MARGIN_10,
                  width: '100%',
                },
              ]}>
              <View
                style={{
                  width: spacing.WIDTH_8,
                  height: spacing.WIDTH_8,
                  backgroundColor: data.color,
                  borderRadius: spacing.RADIUS_30,
                }}
              />
              <RegularText
                style={{ flex: 1, fontSize: textScale(11) }}
                numberOfLines={1}>
                {data.title}
              </RegularText>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const RenderWebView = ({ html, index, isBold }) => {
  return (
    <View style={{ paddingHorizontal: APP_PADDING_HORIZONTAL }} >
      <RenderHTML
        source={{
          html: html,
        }}
        contentWidth={spacing.FULL_WIDTH - (APP_PADDING_HORIZONTAL * 4)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  attemptContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_10,
    marginRight: spacing.MARGIN_12,
    marginVertical: spacing.MARGIN_16,
    minHeight: spacing.HEIGHT_30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attemptNumber: {
    color: colors.black,
  },
  notDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notDataImg: {
    width: spacing.WIDTH_200,
    height: spacing.WIDTH_200,
  },
  contentContainer: {
    // paddingHorizontal: APP_PADDING_HORIZONTAL,
  },
  infromationContainer: {
    marginTop: spacing.MARGIN_16,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: spacing.MARGIN_12,
    marginBottom: spacing.MARGIN_12,
  },
  informationCard: {
    width: (spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2) / 2.1,
    flexDirection: 'row',
    gap: spacing.MARGIN_2,
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.PADDING_20,
    borderRadius: spacing.RADIUS_12,
    paddingHorizontal: spacing.PADDING_12,
  },
  informationTitle: {
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    fontSize: textScale(14),
  },
  informationValue: {
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    fontSize: textScale(20),
  },
  informationIcon: {
    width: spacing.WIDTH_30,
    height: spacing.WIDTH_30,
  },
  chartContainer: {
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_16,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    // marginBottom: spacing.MARGIN_12,
  },
  chartCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: spacing.PADDING_20,
    borderRadius: spacing.RADIUS_12,
    paddingHorizontal: spacing.PADDING_12,

    gap: spacing.MARGIN_12,
  },
  questionTabContainer: {
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.MARGIN_12,
    backgroundColor: colors.grey100,
  },
  questionTabSubContainer: {
    ...commonStyle.flexDirectionRow,
    backgroundColor: colors.white,
    padding: spacing.PADDING_6,
    borderRadius: spacing.RADIUS_6,
  },
  tabTitle: {
    paddingVertical: spacing.PADDING_8,
    flex: 1,
    textAlign: 'center',
    borderRadius: spacing.RADIUS_6,
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    fontSize: textScale(11),
  },
  selectedTabTitle: {
    color: colors.white,
    backgroundColor: colors.theme,
  },
  questionContainer: {
    backgroundColor: colors.white,
    marginBottom: spacing.MARGIN_12,
    padding: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_6,
    marginHorizontal: APP_PADDING_HORIZONTAL,
  },
  questionKey: {
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    fontSize: textScale(14),
    color: colors.theme,
  },
  questionValue: {},
  downloadBtn: {
    flex: 1,
    borderRadius: spacing.RADIUS_8,
  },
  downloadBtnText: {
    fontSize: textScale(12),
    textAlign: 'center',
  },
});

export default TestSeriesResult;
