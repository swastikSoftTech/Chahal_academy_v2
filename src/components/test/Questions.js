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
import RenderHTML from 'react-native-render-html';
import { spacing } from '../../styles/spacing';
import { APP_PADDING_HORIZONTAL } from '../../themes/commonStyle';

const Question = ({question, onOptionSelect, questionCount, index}) => {
  const [selectedOption, setSelectedOption] = useState(null);

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
      }}>
      <View style={styles.questionTopContainer}>
        <Text style={styles.questionTopContainer_questionNo}>
          {question.qno}/{questionCount}
        </Text>
        <RenderHTML
          source={{html: question.question}}
          baseStyle={{color: 'black'}}
          contentWidth={spacing.FULL_WIDTH - (APP_PADDING_HORIZONTAL * 2)}
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

  const keyExtractor = useCallback(item => item.qid.toString(), []);

  const renderItem = ({item, index}) => (
    <View style={{ minHeight : spacing.FULL_HEIGHT - spacing.MARGIN_18 - (spacing.MARGIN_12 *2) - spacing.MARGIN_90,}} >
    <Question
      questionCount={questions.length}
      question={item}
      key={'Question' + index}
      onOptionSelect={selected => onOptionSelect(index, selected)}
    />
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <FlashList
        ref={pagerRef}
        data={questions}
        estimatedItemSize={50}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
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
    // flex: 1,
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
