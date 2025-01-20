import {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import WebView from 'react-native-webview';
import colors from '../../styles/colors';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import RegularText from '../common/text/RegularText';

const Option = ({option, onPressOption, selectedOption}) => {
  return (
    <TouchableOpacity
      style={[
        styles.optionContainer,
        selectedOption === option && {backgroundColor: colors.orange600},
      ]}
      onPress={() => onPressOption(option)}>
      <RegularText>{option}</RegularText>
    </TouchableOpacity>
  );
};

const QuizQuestion = ({
  question,
  index,
  handelSeletedOption,
  isResultShow,
  quizeSeletedOptions,
}) => {
  const [selectedOption, setSelectedOption] = useState();
  const [webViewHeight, setWebViewHeight] = useState(0);
  const [webViewAnswerHeight, setWebViewAnswerHeight] = useState(0);

  const handleQuestionMessage = event => {
    const height = parseInt(event.nativeEvent.data, 10);
    setWebViewHeight(parseInt(height / 2.8));
  };
  const handleAnswerMessage = event => {
    const height = parseInt(event.nativeEvent.data, 10);
    setWebViewAnswerHeight(parseInt(height / 2.8));
  };
  function onPressOption(id, option, answer) {
    if (isResultShow) return;
    setSelectedOption(selectedOption === option ? null : option);
    const selectedOptionData = {
      id: id,
      selectedOption: option,
      answer: answer,
    };
    handelSeletedOption(selectedOptionData);
  }

  const htmlContent = `
  <html>
    <head>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 97%;
        }
        .content {
          padding:3rem 2rem;
        }
        span{
           font-size:2.5rem;
        }
      </style>
    </head>
    <body>
      <div id="content" class="content" style="height: fit-content"><span class="quest" >Quest ${
        index + 1
      }. </span>${question?.question}</div>
        <script>
         function sendHeight() {
          const contentDiv = document.getElementById('content');
          if (contentDiv) {
            const height = contentDiv.offsetHeight;
            window.ReactNativeWebView.postMessage(height);
          }
        }

        // Send the height after the content is loaded
        window.onload = sendHeight;

        // Observe changes in the content div and send updates
        const observer = new ResizeObserver(() => sendHeight());
        observer.observe(document.getElementById('content'));
      </script>
    </body>
  </html>
`;

  const htmlContentDescription = `
  <html>
    <head>
      <style>
        body, html {
          margin: 0;
          padding: 0;
          width: 97%;
        }
        .content {
          padding:3rem 2rem;
        }
        span{
           font-size:2.5rem;
        }
      </style>
    </head>
    <body>
      <div id="content" class="content" style="height: fit-content"><span class="quest" > </span>${question?.description}</div>
        <script>
         function sendHeight() {
          const contentDiv = document.getElementById('content');
          if (contentDiv) {
            const height = contentDiv.offsetHeight;
            window.ReactNativeWebView.postMessage(height);
          }
        }

        // Send the height after the content is loaded
        window.onload = sendHeight;

        // Observe changes in the content div and send updates
        const observer = new ResizeObserver(() => sendHeight());
        observer.observe(document.getElementById('content'));
      </script>
    </body>
  </html>
`;
  return (
    <View
      style={[
        styles.mainContainer,
        index === 0 && {marginTop: spacing.MARGIN_10},
      ]}>
      {/* <RegularText>
        <RegularText>Ques.{index + 1}:</RegularText>
        {'Question name'}
      </RegularText> */}
      <WebView
        source={{
          html: htmlContent,
        }}
        cacheEnabled={false}
        originWhitelist={['*']}
        allowFileAccess={false}
        javaScriptEnabled={true}
        androidHardwareAccelerationDisabled={true}
        domStorageEnabled={false}
        useWebKit={true}
        onMessage={handleQuestionMessage}
        showsVerticalScrollIndicator={false}
        style={{
          // flex: 1,
          width:
            spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2 - spacing.MARGIN_12,
          height: webViewHeight,
          // height: spacing.HEIGHT_196,
        }}
      />
      <View style={styles.optionsContainer}>
        <Option
          quizeSeletedOptions={quizeSeletedOptions}
          option={question.optiona}
          onPressOption={selectedOption =>
            onPressOption(
              question?.quiz_id,
              selectedOption,
              question[question?.answer],
            )
          }
          selectedOption={selectedOption}
        />
        <Option
          quizeSeletedOptions={quizeSeletedOptions}
          option={question.optionb}
          onPressOption={selectedOption =>
            onPressOption(
              question?.quiz_id,
              selectedOption,
              question[question?.answer],
            )
          }
          selectedOption={selectedOption}
        />
        <Option
          quizeSeletedOptions={quizeSeletedOptions}
          option={question.optionc}
          onPressOption={selectedOption =>
            onPressOption(
              question?.quiz_id,
              selectedOption,
              question[question?.answer],
            )
          }
          selectedOption={selectedOption}
        />
        <Option
          quizeSeletedOptions={quizeSeletedOptions}
          option={question.optiond}
          onPressOption={selectedOption =>
            onPressOption(
              question?.quiz_id,
              selectedOption,
              question[question?.answer],
            )
          }
          selectedOption={selectedOption}
        />
      </View>
      {isResultShow && (
        <WebView
          source={{
            html: htmlContentDescription,
          }}
          cacheEnabled={false}
          originWhitelist={['*']}
          allowFileAccess={false}
          javaScriptEnabled={true}
          domStorageEnabled={false}
          useWebKit={true}
          androidHardwareAccelerationDisabled={true}
          onMessage={handleAnswerMessage}
          showsVerticalScrollIndicator={false}
          style={[
            styles.optionContainer,
            {
              // flex: 1,
              width:
                spacing.FULL_WIDTH -
                APP_PADDING_HORIZONTAL * 2 -
                spacing.MARGIN_12,
              height: webViewAnswerHeight,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: spacing.MARGIN_10,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    paddingHorizontal: spacing.MARGIN_12,
    backgroundColor: colors.white,
    paddingBottom: spacing.PADDING_12,
    borderRadius: spacing.RADIUS_6,
  },
  webView: {
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2 - spacing.MARGIN_12,
    height: spacing.HEIGHT_160,
  },
  optionContainer: {
    paddingHorizontal: spacing.PADDING_12,
    paddingVertical: spacing.PADDING_8,
    backgroundColor: colors.grey200,
    borderRadius: spacing.RADIUS_6,
    marginTop: spacing.MARGIN_12,
    overflow: 'hidden',
  },
  // answer: {
  //   fontSize: textScale(14),
  //   color: colors.green600,
  //   fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
  // },
});

export default QuizQuestion;
