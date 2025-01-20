import React, {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import axios from '../../api/axios';
import Header from '../../components/common/header/Header';
import DailyQuizeResultModal from '../../components/modal/DailyQuizeResultModal';
import QuizQuestionList from '../../components/module/QuizQuestionList';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {
  convertDateTime,
  getCurrentAffairApiUrl,
} from '../../utils/commonFunction';
import AttributeKeyValue from '../../components/common/text/AttributeKeyValue';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import VirtualizedView from '../../components/common/VirtualizedView';
import Title from '../../components/common/text/Title';

const QuizeParticiaption = ({route}) => {
  const {params} = route;
  const {date, id, type} = params;

  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quizeSeletedOptions, setQuizeSeletedOptions] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isResultShow, setIsResultShow] = useState(false);
  const [resultData, setResultData] = useState({});
  const [isFinishBtnDisabled, setIsFinishBtnDisabled] = useState(true);

  useEffect(() => {
    getQuestions();
  }, []);

  useEffect(() => {
    if (quizeSeletedOptions.length) {
      setIsFinishBtnDisabled(false);
    } else {
      setIsFinishBtnDisabled(true);
    }
  }, [quizeSeletedOptions.length]);

  const getQuestions = async () => {
    setLoading(true);
    try {
      const url = `${getCurrentAffairApiUrl(type, true)}/${`${convertDateTime(
        date,
        'DD-MMM-YYYY',
      )}/${id}`}`;

      const response = await axios.get(url);

      if (response?.data?.question_details) {
        setQuestions(response.data.question_details);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  function handelSeletedOption(selectedOptionData) {
    const arr = quizeSeletedOptions;
    const isExist = quizeSeletedOptions.some(
      item => item.id === selectedOptionData.id,
    );
    if (isExist) {
      const updateDataIndex = quizeSeletedOptions.findIndex(
        item => item.id === selectedOptionData?.id,
      );
      const answerIsSame =
        quizeSeletedOptions[updateDataIndex].selectedOption ===
        selectedOptionData.selectedOption;
      if (answerIsSame) {
        arr.splice(updateDataIndex, 1);
        console.log('A', arr);
        setQuizeSeletedOptions(() => arr);
      } else if (updateDataIndex !== -1) {
        quizeSeletedOptions.splice(updateDataIndex, 1, selectedOptionData);
        setQuizeSeletedOptions(quizeSeletedOptions);
      }
    } else {
      setQuizeSeletedOptions([...quizeSeletedOptions, selectedOptionData]);
    }
  }

  function onPressFinish() {
    let total = 0;
    let wrongAnswerTotal = 0;
    for (let i = 0; i < quizeSeletedOptions.length; i++) {
      if (
        quizeSeletedOptions[i].selectedOption === quizeSeletedOptions[i].answer
      ) {
        total += 1;
      } else if (
        quizeSeletedOptions[i].selectedOption !== quizeSeletedOptions[i].answer
      ) {
        wrongAnswerTotal += 1;
      }
    }
    const totalMarks = questions?.length * 2;
    const negativeMarking = wrongAnswerTotal * 0.66;
    const obtainedMarks = total * 2 - negativeMarking;
    const percentage = (obtainedMarks / totalMarks) * 100;
    const payload = {
      totalMarks: totalMarks,
      obtainedMarks: obtainedMarks,
      percentage: percentage,
    };
    setResultData(payload);
    setIsResultShow(true);
  }
  function onPressResult() {
    setIsResultShow(true);
  }
  function closeResultModal() {
    setShowResultModal(false);
    setIsResultShow(true);
  }

  return (
    <View style={{flex: 1}}>
      <Header title={convertDateTime(date, 'DD MMMM YYYY')} showMenu />
      <VirtualizedView>
        {isLoading ? (
          <ActivityIndicator
            size={'large'}
            style={{marginTop: spacing.MARGIN_16}}
            color={colors.theme}
          />
        ) : (
          <QuizQuestionList
            questions={questions}
            handelSeletedOption={handelSeletedOption}
            onPressFinish={onPressFinish}
            isResultShow={isResultShow}
            isFinishBtnDisabled={isFinishBtnDisabled}
            quizeSeletedOptions={quizeSeletedOptions}
          />
        )}
        {Object.keys(resultData).length ? (
          <View style={styles.resultContainer}>
            <Title title={'Result'} style={{textAlign: 'center'}} />
            <AttributeKeyValue
              title={'Total Points'}
              value={resultData?.totalMarks}
              titleStyle={{flex: 1}}
            />
            <AttributeKeyValue
              title={'Your Points'}
              value={parseFloat(resultData?.obtainedMarks).toFixed(2)}
              titleStyle={{flex: 1}}
            />
            <AttributeKeyValue
              title={'Percentage'}
              value={`${parseFloat(resultData?.percentage).toFixed(2)}%`}
              titleStyle={{flex: 1}}
            />
          </View>
        ) : null}
      </VirtualizedView>
    </View>
  );
};

const styles = StyleSheet.create({
  resultContainer: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    backgroundColor: colors.white,
    padding: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_6,
    marginBottom: spacing.MARGIN_30,
  },
});

export default QuizeParticiaption;
