import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
// import RenderHTML from 'react-native-render-html';
import { deviceWidth, getWidth } from '../../common/constants';

import WebView from 'react-native-webview';

const Question = ({question, onOptionSelect, questionCount, index}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  console.log(' selectedOption>>>', selectedOption, question.qno, question);
  const handleSelectOption = option => {
    if (option === selectedOption) {
      onOptionSelect(null);
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
      onOptionSelect(option);
    }
  };

  return (
    <ScrollView
      style={{
        width: deviceWidth,
        minHeight: 600,
      }}>
      <View style={styles.questionTopContainer}>
        <Text style={styles.questionTopContainer_questionNo}>
          {question.qno}/{questionCount}
        </Text>

        <WebView
          source={{html: question.question}}
          baseStyle={{color: 'black'}}
          contentWidth={getWidth(deviceWidth - 32)}
        />
      </View>

      <View style={styles.optionsMainContainer}>
        {['option_one', 'option_two', 'option_three', 'option_four'].map(
          (opt, idx) => {
            const optionNumber = idx + 1;
            const optionLabel = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOption === optionNumber;
            const backgroundColor = isSelected ? '#44b87b' : 'white';
            const textColor = isSelected ? 'white' : 'black';
            const labelColor = isSelected ? 'white' : '#584dff';

            return (
              <TouchableOpacity
                key={optionNumber}
                activeOpacity={0.8}
                onPress={() => handleSelectOption(optionNumber)}
                style={[styles.optionContainer, {backgroundColor}]}>
                <Text style={[styles.optionText, {color: textColor}]}>
                  <Text style={{color: labelColor}}>{`${optionLabel}. `}</Text>
                  {question[opt]}
                </Text>
              </TouchableOpacity>
            );
          },
        )}
      </View>
    </ScrollView>
  );
};

const Questions = ({
  questions,
  onOptionSelect,
  pagerRef,
  questionNoRef,
  viewabilityConfig,
  onViewableItemsChanged,
  currentPagerIndex,
  setCurrentPagerIndex,
}) => {
  // const onPressQuestionCount = index => {
  //   scrollQuestion(index);
  //   // setCurrentPagerIndex(index);
  // };
  // function scrollQuestion(index) {
  //   pagerRef?.current?.scrollToIndex({animated: true, index: index});
  //   setCurrentPagerIndex(index);
  // }

  // function scrollQuestionNo(index) {
  //   questionNoRef?.current?.scrollToIndex({animated: true, index: index});
  // }

  const keyExtractor = useCallback(item => item.qid.toString(), []);
  // const getItemLayout = useCallback(
  //   (data, index) => ({
  //     length: deviceWidth,
  //     offset: deviceWidth * index,
  //     index,
  //   }),
  //   [],
  // );

  const renderItem = ({item, index}) => (
    <Question
      questionCount={questions.length}
      question={item}
      key={'Question' + index}
      // selectedOption={testAttempt[index]}
      onOptionSelect={selected => onOptionSelect(index, selected)}
    />
  );

  return (
    <View style={styles.mainContainer}>
      {/* <View style={{marginVertical: 12}}>
        <FlatList
          ref={questionNoRef}
          data={questions}
          initialNumToRender={10}
          renderItem={({item: question, index}) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onPressQuestionCount(index)}
                style={[
                  styles.questionCountContainer,
                  {
                    backgroundColor:
                      index === currentPagerIndex
                        ? 'green'
                        : question.backgroundColor,
                    marginRight: questions.length == index + 1 ? 8 : 0,
                  },
                ]}>
                <Text
                  style={[
                    styles.questionCount,
                    {
                      color:
                        index === currentPagerIndex
                          ? 'white'
                          : question.textColor,
                    },
                  ]}>
                  Q.{question.qno}
                </Text>
              </TouchableOpacity>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View> */}
      <FlashList
        ref={pagerRef}
        data={questions}
        // contentContainerStyle={{flex: 1}}
        // style={{flex: 1}}
        estimatedItemSize={50}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        // onViewableItemsChanged={onViewableItemsChanged.current}
        // viewabilityConfig={viewabilityConfig.current}
        // getItemLayout={getItemLayout}
        // initialNumToRender={5}
        // windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  questionCountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 8,
  },
  questionCount: {
    fontSize: 18,
    fontFamily: 'urbanist-regular',
  },
  questionTopContainer: {
    minHeight: 200,
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  questionTopContainer_questionNo: {
    color: 'black',
    fontFamily: 'urbanist-regular',
    fontSize: 14,
  },
  optionsMainContainer: {
    flex: 1,
  },
  optionContainer: {
    elevation: 30,
    paddingVertical: 12,
    borderRadius: 5,
    paddingHorizontal: 12,
    marginVertical: 6,
    marginHorizontal: 16,
  },
  option: {
    fontSize: 17,
    fontFamily: 'urbanist-regular',
  },
});

export default Questions;
