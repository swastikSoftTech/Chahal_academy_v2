import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import axios from '../../../api/axios';
import {customRequest} from '../../../api/customRequest';
import {deviceWidth, getWidth} from '../../../common/constants';
import CText from '../../../components/common/CText';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import Questions from '../../../components/test/Questions';
import {StackNav} from '../../../navigation/NavigationKeys';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import moment from 'moment';

export default function StartTest() {
  const pagerRef = useRef();
  const questionNoRef = useRef();
  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  });
  const onViewableItemsChanged = useRef(({viewableItems, changed}) => {
    if (viewableItems.length) {
      // Get the index of the first viewable item
      const firstViewableItem = viewableItems[0];
      setCurrentPagerIndex(firstViewableItem.index);
      scrollQuestionNo(firstViewableItem.index);
    }
  });

  const [countdown, setCountDown] = useState(0);
  const [currentPagerIndex, setCurrentPagerIndex] = useState(0);

  // const questionTabScrollRef = useRef();
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(60);
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [test, setTest] = useState([]);
  const [testAttempt, setTestAttempt] = useState([]);
  const [subModuleId, setSubmoduleId] = useState();
  const [questions, setQuestions] = useState([]);
  // const SUBMIT = 'student/submit-result';
  // const [abc, setAbc] = useState([]);

  const [hasError, setHasError] = useState(false);
  const [countDownIntervalId, setCountDownIntervalId] = useState(undefined);
  console.log('route >>>', route.params);
  console.log('route >>>', route.params);

  async function startCountdown() {
    let endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + route.params.duration);
    const exp = moment(nextSpinTimeRes?.data?.nextSpinAt);
    const intervalId = setInterval(() => {
      console.log('route >>>', route.params);
      let now = moment().format();
      let diffDuration = moment.duration(exp.diff(now));
      let count = `${diffDuration.minutes()}:${diffDuration.seconds()}`;
      setCountDown(count);
      if (count === '0:0') {
        clearInterval(intervalId);
        Alert.alert('Timeout', 'Please try again on next attempt', [
          {text: 'Ok', onPress: navigation.goBack()},
        ]);
      }
    }, 1000);
    setCountDownIntervalId(intervalId);
    // let endTime = new Date();
    // endTime.setMinutes(endTime.getMinutes() + 60);
    // const exp = moment(endTime);
    // const intervalId = setInterval(() => {
    //   let now = moment().format();
    //   let diffDuration = moment.duration(exp.diff(now));
    //   let count = `${diffDuration.minutes()}:${diffDuration.seconds()}`;
    //   setCountDown(count);
    //   if (count === '0:0') {
    //     clearInterval(intervalId);
    //     Alert.alert('Timeout', 'Please try again on next attempt', [
    //       {text: 'Ok', onPress: navigation.goBack()},
    //     ]);
    //   }
    // }, 1000);
    // setCountDownIntervalId(intervalId);
  }

  const getTestSeries = async () => {
    const id = route.params.qId;
    setIsLoading(true);
    await customRequest(`student/test-series/question/${id}`, 'GET').then(
      res => {
        // const temp = res.data ? res.data : res;
        if (res.subModuleName) {
          const temp = res.data;
          setData(temp);

          setDuration(res.totalminute * 60);
          setSubmoduleId(+res.subModuleId);
          const formattedQuestions = res.data.map((que, index) => ({
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
          }));
          setQuestions(formattedQuestions);
        } else setHasError(true);
      },
    );
    setIsLoading(false);
  };

  useEffect(() => {
    // setCountDown(0);
    setIsLoading(false);
    setDuration(0);
    setData([]);
    setTest([]);
    setTestAttempt([]);
    setSubmoduleId();
    setQuestions([]);
    getTestSeries();
    startCountdown();
  }, []);

  const handleOptionSelect = (index, selected) => {
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
  };

  const handleFinalSubmitAnswer = async () => {
    try {
      let token = await AsyncStorage.getItem('tokenStudent');
      // let answer = [...questions.map(e => String(e.correctOption))];
      let questionid = [...questions.map(e => e.qid)];
      const config = {
        headers: {Authorization: `Bearer ${token}`},
      };

      const res = await axios.post(
        'student/submit-result',
        {
          submoduleid: subModuleId,
          answer: testAttempt,
          answerStatus: test,
          questionId: questionid,
        },
        config,
      );

      Alert.alert('Test Submitted Successfully');

      navigation.pop();

      //   navigation.navigate(StackNav.TestCard);

      //   setDuration(0);
      //   setCountDown(0);
      // Close the modal after handling the action
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // AsyncStorage.removeItem('token')
        navigation.navigate('LoginScreen');
      } else {
        // Display the error message properly
        Alert.alert('Error', error.message || 'An error occurred');
      }
    }
  };

  function toTime(second) {
    const istTime = second;
    const minutes = Math.floor(istTime / 60);
    const seconds = (istTime % (60 * 60)) % 60;
    const istTimeString = `${minutes}:${seconds}`;

    return istTimeString;
  }

  useEffect(() => {
    if (data !== undefined) {
      const dataLength = data.length;

      const emptyArray = [];
      const unattemptedQuestios = [];
      for (let i = 0; i < dataLength; i++) {
        emptyArray.push('');
        unattemptedQuestios.push('1');
      }
      //   return emptyArray;
      setTestAttempt(emptyArray);
    }
  }, [data]);

  const handleEndTest = () => {
    Alert.alert('Exam Ended');
    navigation.pop();
    navigation.navigate(StackNav.TestCard);
  };

  function scrollQuestion(index) {
    pagerRef?.current?.scrollToIndex({animated: true, index: index});
    setCurrentPagerIndex(index);
  }

  function scrollQuestionNo(index) {
    questionNoRef?.current?.scrollToIndex({animated: true, index: index});
  }

  return (
    <View style={{flex: 1}}>
      <FullScreenLoading isLoading={isLoading} />
      {/* ----------------------------------HEADER STARTING---------------------------------- */}
      <View
        style={{
          height: 64,
          width: getWidth(375),
          backgroundColor: 'white',
          elevation: 2,
          paddingHorizontal: 16,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={styles.countDownContainer}>
            <Text
              adjustsFontSizeToFit
              numberOfLines={1}
              style={styles.countDown}>
              {countdown}
            </Text>
          </View>
          <View style={{marginLeft: 12}}>
            {countdown ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <CText type={'R20'} numberOfLines={1} color="black">
                  {route?.params?.name} {route?.params?.duration}
                </CText>
              </View>
            ) : null}
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
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
                    handleEndTest();
                    handleFinalSubmitAnswer();
                  },
                },
              ],
              {cancelable: false},
            )
          }
          style={{
            backgroundColor: 'red',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5,
          }}>
          <Text
            style={{
              fontFamily: 'urbanist-bold',
              color: 'white',
              fontSize: 14,
            }}>
            END TEST {route?.params?.duration}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <Questions
          questions={questions}
          onOptionSelect={handleOptionSelect}
          pagerRef={pagerRef}
          questionNoRef={questionNoRef}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          currentPagerIndex={currentPagerIndex}
          setCurrentPagerIndex={setCurrentPagerIndex}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          marginTop: 'auto',
          paddingHorizontal: 12,
          paddingVertical: 6,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            scrollQuestion(currentPagerIndex - 1);
            scrollQuestionNo(currentPagerIndex - 1);
          }}
          style={{
            backgroundColor: '#ffa101',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'black',
              fontFamily: 'urbanist-medium',
              fontSize: 12,
            }}>
            Back
          </Text>
        </TouchableOpacity>
        <View style={{width: 8}} />
        {currentPagerIndex == questions.length - 1 ? null : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              scrollQuestion(currentPagerIndex + 1);
              scrollQuestionNo(currentPagerIndex + 1);
            }}
            style={{
              backgroundColor: '#ffa101',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 5,
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'urbanist-medium',
                fontSize: 12,
              }}>
              Next
            </Text>
          </TouchableOpacity>
        )}

        <View style={{width: 8}} />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
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
            )
          }
          style={{
            backgroundColor: '#584dff',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'urbanist-medium',
            }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const Question = React.memo(({question, onOptionSelect, questionCount}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectOption = option => {
    if (option === selectedOption) {
      setSelectedOption(null);
      onOptionSelect(null);
    } else {
      setSelectedOption(option);
      onOptionSelect(option);
    }
  };

  // useEffect(() => {
  //   onOptionSelect(selectedOption);
  // }, [selectedOption]);

  return (
    <View style={{flex: 1, width: deviceWidth}}>
      <ScrollView>
        <View
          style={{
            minHeight: 200,
            backgroundColor: '#f0f4ff',
            paddingHorizontal: 8,
            paddingVertical: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: 'black',
                fontFamily: 'urbanist-regular',
                fontSize: 14,
              }}>
              {question.qno}/{questionCount}
            </Text>
          </View>

          <RenderHTML
            source={{html: question.question}}
            baseStyle={{color: 'black'}}
            contentWidth={getWidth(deviceWidth - 32)}
          />
        </View>

        <View style={styles.optionsMainContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleSelectOption(1);
            }}
            style={[
              styles.optionContainer,
              {backgroundColor: selectedOption === 1 ? '#44b87b' : 'white'},
            ]}>
            <Text
              style={[
                styles.option,
                {color: selectedOption === 1 ? 'white' : 'black'},
              ]}>
              <Text style={{color: selectedOption === 1 ? 'white' : '#584dff'}}>
                A.
              </Text>
              {question.option_one}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleSelectOption(2);
            }}
            style={[
              styles.optionContainer,
              {backgroundColor: selectedOption === 2 ? '#44b87b' : 'white'},
            ]}>
            <Text
              style={[
                styles.option,
                {color: selectedOption === 2 ? 'white' : 'black'},
              ]}>
              <Text style={{color: selectedOption === 2 ? 'white' : '#584dff'}}>
                B.
              </Text>
              {question.option_two}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleSelectOption(3);
            }}
            style={[
              styles.optionContainer,
              {backgroundColor: selectedOption === 3 ? '#44b87b' : 'white'},
            ]}>
            <Text
              style={[
                styles.option,
                {color: selectedOption === 3 ? 'white' : 'black'},
              ]}>
              <Text style={{color: selectedOption === 3 ? 'white' : '#584dff'}}>
                C.
              </Text>
              {question.option_three}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleSelectOption(4);
            }}
            style={[
              styles.optionContainer,
              {backgroundColor: selectedOption === 4 ? '#44b87b' : 'white'},
            ]}>
            <Text
              style={[
                styles.option,
                {color: selectedOption === 4 ? 'white' : 'black'},
              ]}>
              <Text style={{color: selectedOption === 4 ? 'white' : '#584dff'}}>
                D.
              </Text>
              {question.option_four}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
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
  optionsMainContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  optionContainer: {
    elevation: 30,
    paddingVertical: 12,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginVertical: 6,
  },
  option: {
    fontSize: 17,
    fontFamily: 'urbanist-regular',
  },
});
