import React, {useEffect, useRef, useState} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {getWidth} from '../../../common/constants';
import moment from 'moment';
import CText from '../../../components/common/CText';
import Questions from '../../../components/test/Questions';
import {useNavigation} from '@react-navigation/native';
import {customRequest} from '../../../api/customRequest';
import {StackNav} from '../../../navigation/NavigationKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from '../../../api/axios';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import {SCREEN_TEST_SERIES_RESULT} from '../../../utils/constants';
import {useLazyGetTestSeriesSingleResultQuery} from '../../../redux/apis/testSeries.api';

const StartTest = ({route}) => {
  const navigation = useNavigation();

  // ------------------------ useRef ------------------------
  const pagerRef = useRef();
  // const questionNoRef = useRef();
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    if (viewableItems.length) {
      // Get the index of the first viewable item
      const firstViewableItem = viewableItems[0];
      setCurrentPagerIndex(firstViewableItem.index);
      // scrollQuestionNo(firstViewableItem.index);
    }
  });
  // ------------------------ useState ------------------------
  const [countdown, setCountDown] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [testAttempt, setTestAttempt] = useState([]);
  const [test, setTest] = useState([]);
  const [subModuleId, setSubmoduleId] = useState();
  const [countDownInterval, setCountDownInterval] = useState();

  // ------------------------ Pager states ------------------------
  const [currentPagerIndex, setCurrentPagerIndex] = useState(0);
  // ------------------------ Boolean states ------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // setIsLoading(true)
    getTestSeries();
    return () => {
      clearInterval(countDownInterval);
    };
  }, []);

  const getTestSeries = async () => {
    const id = route.params.qId;
    setIsLoading(true);
    // https://lmscodenew.chahalacademy.com/api/student/test-attempt/{testID}
    await customRequest(`student/test-attempt/${id}`, 'GET')
      .then(async attempt => {
        if (attempt[0] == 'success') {
          await customRequest(`student/test-series/question/${id}`, 'GET')
            .then(res => {
              // const temp = res.data ? res.data : res;
              if (res.subModuleName) {
                const temp = res.data;
                const emptyArray = [];
                const unattemptedQuestios = [];
                // setData(temp);
                console.log('res >>>>>>>>>>', res);
                // setDuration(res.totalminute * 60);
                setSubmoduleId(+res.subModuleId);
                const formattedQuestions = res.data.map((que, index) => {
                  emptyArray.push('');
                  unattemptedQuestios.push('1');
                  return {
                    qid: que.id,
                    qno: index + 1,
                    question: que.name,
                    option_one: que.option_1,
                    option_two: que.option_2,
                    option_three: que.option_3,
                    option_four: que.option_4,
                    backgroundColor: 'white',
                    textColor: 'black',
                    correctOption: '',
                  };
                });

                startCountdown(res.totalminute);
                setQuestions(formattedQuestions);
                setTestAttempt(emptyArray);
                setTest(unattemptedQuestios);
              }
            })
            .catch(err => {
              console.log('api err >>', err);
            });
        } else {
          Alert.alert('Message', 'Max attempt reached', [
            {
              text: 'Go Back',
              onPress: () => navigation.goBack(),
            },
          ]);
        }
      })
      .catch(err => {
        console.log('test-attempt err >>', err);
      });

    setIsLoading(false);
  };

  async function startCountdown(duration) {
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + duration);
    const exp = moment(endTime);
    const intervalId = setInterval(() => {
      let now = moment().format();
      let diffDuration = moment.duration(exp.diff(now));
      let count = `${diffDuration.hours()}:${diffDuration.minutes()}:${diffDuration.seconds()}`;
      setCountDown(count);
      if (count === '0:0:0') {
        clearInterval(intervalId);
        Alert.alert('Timeout', 'Please try again on next attempt', [
          {text: 'Ok', onPress: navigation.goBack()},
        ]);
      }
    }, 1000);
    setCountDownInterval(intervalId);
  }

  const onPressEndTest = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to proceed?',
      [
        {
          text: 'No',
          onPress: () => console.log('No pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            handleFinalSubmitAnswer();
            handleEndTest();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const handleOptionSelect = (index, selected) => {
    console.log('handleOptionSelect>>', index, selected);

    setTestAttempt(prevAttempt => {
      const updatedAttempt = [...prevAttempt];
      updatedAttempt[index] = String(selected);
      return updatedAttempt;
    });

    setTest(prevTest => {
      const updatedTest = prevTest.map((value, i) => {
        return i === index ? (selected === '' ? '1' : '2') : value;
      });
      return updatedTest;
    });

    // const updatedSelectedAnswer = [...testAttempt];

    // if (index >= 0 && selected !== null && selected !== undefined) {
    //   updatedSelectedAnswer[index] = String(selected);
    //   setTestAttempt(updatedSelectedAnswer);
    //   var newArray = updatedSelectedAnswer.map(function (value) {
    //     if (value === '') {
    //       return String(1);
    //     } else {
    //       return String(2);
    //     }
    //   });
    //   setTest(newArray);
    // } else if (selected === null) {
    //   updatedSelectedAnswer[index] = '';
    //   setTestAttempt(updatedSelectedAnswer);
    //   var newArray = updatedSelectedAnswer.map(function (value) {
    //     if (value === '') {
    //       return String(1);
    //     } else {
    //       return String(2);
    //     }
    //   });
    //   setTest(newArray);
    // }
  };

  const handleEndTest = () => {
    Alert.alert('Exam Ended');
    // navigation.pop();
    // navigation.navigate(StackNav.TestCard);
    navigation.goBack();
  };

  function scrollQuestion(index) {
    pagerRef?.current?.scrollToIndex({animated: true, index: index});
    setCurrentPagerIndex(index);
  }

  // function scrollQuestionNo(index) {
  //   questionNoRef?.current?.scrollToIndex({animated: true, index: index});
  // }

  const onPressSubmit = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to proceed?',
      [
        {
          text: 'No',
          onPress: () => console.log('No pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => handleFinalSubmitAnswer(),
        },
      ],
      {cancelable: false},
    );
  };
  console.log('parasm >>>', route.params);

  const handleFinalSubmitAnswer = async () => {
    try {
      let token = await AsyncStorage.getItem('tokenStudent');
      // let answer = [...questions.map(e => String(e.correctOption))];
      let questionid = [...questions.map(e => e.qid)];
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };

      const payload = {
        submoduleid: subModuleId,
        answer: testAttempt,
        answerStatus: test,
        questionId: questionid,
      };
      console.log('payload >>>', JSON.stringify(payload));
      // return;
      const res = await axios.post('student/submit-result', payload, config);
      console.log('submit test res =>', res);

      Alert.alert('Test Submitted Successfully');

      // navigation.pop();

      // useNavigation.navigate(StackNav.TestCard);
      navigation.pop();
      navigation.navigate(SCREEN_TEST_SERIES_RESULT, {
        qId: route.params.qId,
        attempt: route.params.attempt,
        type: route.params.type,
      });
      //   setDuration(0);
      //   setCountDown(0);
      // Close the modal after handling the action
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // AsyncStorage.removeItem('token')
        useNavigation.navigate('LoginScreen');
      } else {
        // Display the error message properly
        Alert.alert('Error', error.message || 'An error occurred');
      }
    }
  };

  // console.log('testAttempt>>>', testAttempt);

  return (
    <View style={styles.mainContainer}>
      <FullScreenLoading isLoading={isLoading} />
      <View style={styles.headerContainer}>
        <View style={styles.countDownContainer}>
          <Text adjustsFontSizeToFit numberOfLines={1} style={styles.countDown}>
            {countdown}
          </Text>
        </View>
        {countdown ? (
          <CText
            type={'R20'}
            adjustsFontSizeToFit
            numberOfLines={1}
            style={{flex: 1}}
            color="black">
            {route?.params?.name}
          </CText>
        ) : null}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onPressEndTest}
          style={styles.endTestBtnContainer}>
          <Text style={styles.endTestBtnContainer}>END TEST</Text>
        </TouchableOpacity>
      </View>
      {questions.length ? (
        <View style={{flex: 1}}>
          <Questions
            questions={questions}
            onOptionSelect={handleOptionSelect}
            pagerRef={pagerRef}
            // questionNoRef={questionNoRef}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            currentPagerIndex={currentPagerIndex}
            setCurrentPagerIndex={setCurrentPagerIndex}
            answers={testAttempt}
          />
        </View>
      ) : null}
      {questions.length ? (
        <View style={styles.footerContainer}>
          {currentPagerIndex === 0 ? null : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                scrollQuestion(currentPagerIndex - 1);
                // scrollQuestionNo(currentPagerIndex - 1);
              }}
              style={styles.scrollBtn}>
              <Text style={styles.scrollBtnText}>Back</Text>
            </TouchableOpacity>
          )}

          {currentPagerIndex == questions.length - 1 ? null : (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                scrollQuestion(currentPagerIndex + 1);
                // scrollQuestionNo(currentPagerIndex + 1);
              }}
              style={styles.scrollBtn}>
              <Text style={styles.scrollBtnText}>Next</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressSubmit}
            style={styles.submitBtn}>
            <Text style={styles.submitBtnText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    height: 64,
    backgroundColor: 'white',
    elevation: 2,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  countDownContainer: {
    borderWidth: 2,
    width: 50,
    height: 50,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countDown: {
    fontSize: 16,
    fontFamily: 'urbanist-regular',
    width: 45,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'black',
    fontWeight: '700',
  },
  endTestBtnContainer: {
    backgroundColor: 'red',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  endTestText: {
    fontFamily: 'urbanist-bold',
    color: 'white',
    fontSize: 14,
  },
  footerContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 'auto',
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
  },
  scrollBtn: {
    backgroundColor: '#ffa101',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 5,
  },
  scrollBtnText: {
    color: 'black',
    fontFamily: 'urbanist-medium',
    fontSize: 14,
  },
  submitBtn: {
    backgroundColor: '#584dff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  submitBtnText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'urbanist-medium',
  },
});

export default StartTest;
