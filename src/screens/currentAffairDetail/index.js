import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import axios from '../../api/axios';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import Header from '../../components/common/header/Header';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {
  convertDateTime,
  getCurrentAffairApiUrl,
} from '../../utils/commonFunction';
import {CURRENT_AFFAIR_CATEGORY_TYPE} from '../../utils/constants';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';

const CurrentAffairDetail = ({route}) => {
  const {params} = route;
  const {date, id, type} = params;

  const [currentAffairDetail, setCurrentAffairDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCurrentAffairDetail();
  }, []);

  async function getCurrentAffairDetail() {
    setIsLoading(true);
    try {
      const url = `${getCurrentAffairApiUrl(type, true)}${
        type === CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_MAGAZINE
          ? ''
          : type === CURRENT_AFFAIR_CATEGORY_TYPE.READ_INDIAN_EXPRESS
          ? id
          : `${convertDateTime(date, 'DD-MMM-YYYY')}/${id}`
      }`;
      console.log('url >>', url);

      const response = await axios.get(url);
      console.log('response >>', response);

      if (response?.data?.data) {
        setCurrentAffairDetail(response?.data?.data[0]);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  }
  const htmlContent = `
      <html>
        <head>
          <style>
           body, html {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            .content {
              margin:3rem 2rem;
              flex : 1;
              
              overflow: hidden
            }
            span{
               font-size:2.5rem;
            }
          </style>
        </head>
        <body>
          <div class="content">${currentAffairDetail?.long_desc}</div>
        </body>
      </html>
    `;
  return (
    <CSafeAreaView style={styles.mainContainer}>
      <Header title={convertDateTime(date, 'DD MMMM YYYY')} showMenu />
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: spacing.MARGIN_16}}
          color={colors.theme}
        />
      ) : (
        <WebView
          source={{
            html: htmlContent,
          }}
          showsVerticalScrollIndicator={false}
          style={styles.webView}
        />
      )}
    </CSafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  webView: {
    flex: 1,
    marginTop: spacing.MARGIN_16,
    width: '100%',
    borderWidth: 1,
    // marginHorizontal: APP_PADDING_HORIZONTAL,
  },
});

export default CurrentAffairDetail;
