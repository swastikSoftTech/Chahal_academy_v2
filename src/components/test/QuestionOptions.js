import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {deviceWidth} from '../../common/constants';

const QuestionOptions = ({options, selectedOption, onSelectOption}) => {
  return (
    <View style={styles.optionsMainContainer}>
      <FlatList
        data={options}
        renderItem={({item: option, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                onSelectOption(index + 1);
              }}
              style={[
                styles.optionContainer,
                {
                  backgroundColor:
                    selectedOption === index + 1 ? '#44b87b' : 'white',
                },
              ]}>
              <Text
                style={[
                  styles.option,
                  {color: selectedOption === index + 1 ? 'white' : 'black'},
                ]}>
                <Text
                  style={{
                    color: selectedOption === index + 1 ? 'white' : '#584dff',
                  }}>
                  {index === 0
                    ? 'A.'
                    : index === 1
                    ? 'B.'
                    : index === 2
                    ? 'C.'
                    : 'D.'}
                </Text>
                {option}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default QuestionOptions;
