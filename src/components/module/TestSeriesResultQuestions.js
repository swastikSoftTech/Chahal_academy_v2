import React, {useContext, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {StyleSheet, View} from 'react-native';
import RegularText from '../common/text/RegularText';
import EmptyComponenet from './EmptyComponenet';
import WebView from 'react-native-webview';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import {fontNames} from '../../styles/typography';
import {textScale} from '../../styles/responsiveStyles';
import {TopTabContext} from '../common/topTabs/TopTabs';

const QUESTION_TYPE = {
  WRONG: 'WRONG',
  LEAVE: 'LEAVE',
};

const TestSeriesResultQuestions = ({questionType}) => {
  const {questions} = useContext(TopTabContext);
  console.log('questions>>>>>>', questions);

  return (
    // <View
    //   style={{
    //     flex: 1,
    //   }}>
    <FlashList
      data={questions || []}
      decelerationRate="fast"
      renderItem={({item: question, index}) => {
        return (
          <View style={[styles.questionContainer]} key={'Question' + index}>
            <RegularText style={styles.questionKey}>
              Question {index + 1}
            </RegularText>
            <RenderWebView html={question?.question} index={index} isBold />
            <RegularText style={styles.questionKey}>
              Answer :{' '}
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
              Explaination :{' '}
            </RegularText>
            <RenderWebView html={question?.explaination} index={index} />
          </View>
        );
      }}
      ListEmptyComponent={() => (
        <EmptyComponenet
          message={`No ${
            questionType === QUESTION_TYPE.WRONG ? 'Wrong' : 'Unattempted'
          } Question`}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
    // </View>
  );
};

const RenderWebView = ({html, index, isBold}) => {
  const [webViewHeight, setWebViewHeight] = useState(0);

  const htmlContent = `
      <html>
        <head>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
            }
            .content {}
            span{
               font-size:3rem;
               font-weight : ${isBold ? 700 : 400};
            }
          </style>
        </head>
        <body>
          <div id="content" class="content" style="height: fit-content"><span class="quest" </span>${html}</div>
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

  const handleQuestionMessage = event => {
    const height = parseInt(event.nativeEvent.data, 10);
    setWebViewHeight(parseInt(height / 2.8));
  };

  return (
    <WebView
      source={{
        html: htmlContent,
      }}
      cacheEnabled={false}
      originWhitelist={['*']}
      javaScriptEnabled={true}
      androidHardwareAccelerationDisabled={true}
      domStorageEnabled={false}
      onMessage={handleQuestionMessage}
      showsVerticalScrollIndicator={false}
      style={{
        width:
          spacing.FULL_WIDTH -
          APP_PADDING_HORIZONTAL * 2 -
          spacing.MARGIN_12 * 2,
        height: webViewHeight,
      }}
    />
  );
};

const styles = StyleSheet.create({
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
});

export default TestSeriesResultQuestions;
