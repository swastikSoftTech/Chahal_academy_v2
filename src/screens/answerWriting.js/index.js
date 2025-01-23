import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import axios, {BASEURL} from '../../api/axios';
import Header from '../../components/common/header/Header';
import Title from '../../components/common/text/Title';
import AnswerWritingReplyModal from '../../components/modal/AnswerWritingReplyModal';
import AnswerWritingViewModal from '../../components/modal/AnswerWritingViewModal';
import CommentList from '../../components/module/CommentList';
import DailyQuizeForm from '../../components/module/DailyQuizeForm';
import MediumSelector from '../../components/module/MediumSelector';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {
  convertDateTime,
  getCurrentAffairApiUrl,
  getFormData,
} from '../../utils/commonFunction';
import {
  API_BASE_URL,
  CURRENT_AFFAIR_CATEGORY_TYPE,
} from '../../utils/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import FullScreenLoading from '../../components/common/FullScreenLoading';
import flashMessage from '../../components/common/CustomFlashAlert';
import RenderHTML from 'react-native-render-html';

const AnswerWriting = ({route}) => {
  const {params} = route;
  const {date, id, type} = params;

  const navigation = useNavigation();
  const [webViewHeight, setWebViewHeight] = useState(0);
  const [currentAffairDetail, setCurrentAffairDetail] = useState();
  const [comments, setComments] = useState([]);
  const [selectedComment, setSelectedComment] = useState();

  // BOOLEAN STATES
  const [isLoading, setIsLoading] = useState(false);
  // const [activeTab, setActiveTab] = useState(true);
  // const [showAnswerWritingReplyModal, setShowAnswerWritingReplyModal] =
  //   useState(false);
  // const [showAnswerWritingViewModal, setShowAnswerWritingViewModal] =
  //   useState(false);
  const [isUploadLoading, setIsUploadLoading] = useState(false);

  useEffect(() => {
    getCurrentAffairDetail();
    getComments();
  }, []);

  async function getCurrentAffairDetail() {
    setIsLoading(true);
    try {
      const url = `${getCurrentAffairApiUrl(type, true)}${
        type === CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_MAGAZINE
          ? ''
          : `${convertDateTime(date, 'DD-MMM-YYYY')}/${id}`
      }`;
      const response = await axios.get(url);
      if (response?.data?.data) {
        setCurrentAffairDetail(response?.data?.data[0]);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function getComments() {
    try {
      // https://chahalacademy.com/api/answer-writing/23-Nov-2024/1234
      const url = `${API_BASE_URL}answer-writing/${convertDateTime(
        date,
        'DD-MMM-YYYY',
      )}/${id}`;
      console.log('url >>', url);

      const response = await axios.get(url);
      // console.log('response >>', response.data);
      if (response?.data?.answers) {
        setComments(response?.data?.answers);
      }
    } catch (err) {}
  }
console.log("webViewHeight >>>", webViewHeight);

  // function handelSelection(value) {
  //   setActiveTab(value);
  // }
  // function onPressReply(comment) {
  //   setSelectedComment(comment);
  //   setShowAnswerWritingReplyModal(true);
  // }
  // function onPressCloseReplyModal() {
  //   setShowAnswerWritingReplyModal(false);
  // }
  // async function onPressView(comment) {
  //   setSelectedComment(comment);
  //   try {
  //     setIsUploadLoading(true);
  //     const url = `${API_BASE_URL}answer-writing-monthly/reply/comment`;
  //     console.log('url >>', url);

  //     const response = await axios.postForm(
  //       url,
  //       getFormData({comment_id: comment.id}),
  //       {},
  //     );
  //     console.log('response >>> >>', response.data);
  //     if (response?.data?.success) {
  //       navigation.navigate(StackNav.PdfView, {
  //         pdfUrl: response?.data?.success,
  //       });
  //     } else {
  //       flashMessage('Something went wrong', 'danger');
  //     }
  //   } catch (err) {
  //     flashMessage('Something went wrong', 'danger');
  //   } finally {
  //     setIsUploadLoading(false);
  //   }
  //   // setShowAnswerWritingViewModal(true);
  // }
  // function onPressCloseViewModal() {
  //   setShowAnswerWritingViewModal(false);
  // }
  function handelFormData(payload) {
    console.log(payload);
    // setShowAnswerWritingReplyModal(false);
    postCommnet(payload);
    // navigation.navigate(StackNav.WebViewScreen);
  }

  async function postCommnet(payload) {
    try {
      setIsUploadLoading(true);
      const url = `${API_BASE_URL}answer-writing-monthly/reply`;
      console.log('url >>', url);

      const response = await axios.postForm(
        url,
        getFormData({...payload, id}),
        {},
      );
      if (response?.data?.success) {
        flashMessage(response?.data?.success, 'success');
        navigation.goBack();
      } else {
        flashMessage('Something went wrong', 'danger');
      }
    } catch (err) {
      flashMessage('Something went wrong', 'danger');
    } finally {
      setIsUploadLoading(false);
    }
  }

  const handleMessage = event => {
    const height = parseInt(event.nativeEvent.data, 10);
    console.log('height >>>>.', height);

    setWebViewHeight(parseInt(height / 2.4));
  };
  // console.log('comments >>>', comments, date, id);
  console.log('webViewHeight >', webViewHeight);

  const htmlContent = `
      <html>
        <head>
          <style>
            body, html {
              margin: 0;
              padding: 0;
              width : 96%
            }
            .content {
              padding:3rem 2rem;
              box-sizing: border-box; 
              height : auto;
            }
            span{
               font-size:1.5rem
            }
          </style>
        </head>
        <body>
          <div id="content" class="content">${currentAffairDetail?.long_desc}</div>
          <script>
         function sendHeight() {
          const contentDiv = document.getElementById('content');
          if (contentDiv) {
            const height = contentDiv.scrollHeight;
            console.log(height, "<<<< height >>>>")
            window.ReactNativeWebView.postMessage(height);
          }
        }

        // Send the height after the content is loaded
        window.onload = () => sendHeight();

        // Observe changes in the content div and send updates
        const observer = new ResizeObserver(() => sendHeight());
        observer.observe(document.getElementById('content'));
      </script>
        </body>
      </html>
    `;
  return (
    <View style={styles.maincontainer}>
      <Header title={convertDateTime(date, 'DD MMMM YYYY')} showMenu />
      <FullScreenLoading isLoading={isUploadLoading} />
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: spacing.MARGIN_16}}
          color={colors.theme}
        />
      ) : (
        <ScrollView>
          <View  style={{paddingHorizontal : APP_PADDING_HORIZONTAL}} >
          <RenderHTML
            source={{
              html: currentAffairDetail?.long_desc,
            }}
            contentWidth={spacing.FULL_WIDTH - (APP_PADDING_HORIZONTAL*4)}
          />
          </View>
          {/* <Title title={'Submit Your Answer'} style={styles.title} />
          <DailyQuizeForm handelFormData={handelFormData} /> */}
          {/* <MediumSelector
            activeTab={activeTab}
            handelSelection={handelSelection}
          /> */}
          {/* <View style={styles.seconderyContainer}>
            <CommentList
              data={comments}
              onPressReply={onPressReply}
              onPressView={onPressView}
            />
          </View> */}
        </ScrollView>
      )}
      {/* <AnswerWritingReplyModal
        visible={showAnswerWritingReplyModal}
        onRequestClose={onPressCloseReplyModal}
        submitComment={payload => {
          postCommnet({...payload, comment_id: selectedComment?.id});
          onPressCloseReplyModal();
        }}
      />
      <AnswerWritingViewModal
        visible={showAnswerWritingViewModal}
        onRequestClose={onPressCloseViewModal}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  webView: {
    flex: 1,
    marginTop: spacing.MARGIN_16,
    // height: spacing.FULL_HEIGHT / 2,
  },
  seconderyContainer: {
    flex: 1,
    marginHorizontal: APP_PADDING_HORIZONTAL,
  },
  title: {
    marginTop: spacing.MARGIN_16,
    // fontSize: textScale(18),
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    textAlign: 'center',
    color: colors.theme,
  },
});
export default AnswerWriting;
