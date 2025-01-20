import React from 'react';
import {FlatList} from 'react-native';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import Button from '../common/button/Button';
import QuizQuestion from '../row/QuizQuestion';
import EmptyComponenet from './EmptyComponenet';
import {FlashList} from '@shopify/flash-list';

const QuizQuestionList = ({
  questions,
  handelSeletedOption,
  onPressFinish,
  isResultShow,
  quizeSeletedOptions,
  isFinishBtnDisabled,
}) => {
  return (
    <FlatList
      data={questions}
      renderItem={({item, index}) => (
        <QuizQuestion
          question={item}
          index={index}
          handelSeletedOption={handelSeletedOption}
          isResultShow={isResultShow}
        />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyComponenet />}
      ListFooterComponent={
        isResultShow == false && (
          <Button
            title={'Finish'}
            // backgroundColor={colors.orange900}
            buttonStyle={{
              marginHorizontal: APP_PADDING_HORIZONTAL,
              marginBottom: spacing.MARGIN_12,
              // borderColor: colors.orange900,
            }}
            disabled={isFinishBtnDisabled}
            onPressButton={onPressFinish}
          />
        )
      }
    />
  );
};

export default QuizQuestionList;
