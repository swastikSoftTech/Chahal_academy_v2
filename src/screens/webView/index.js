import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {spacing} from '../../styles/spacing';

const WebViewScreen = ({route}) => {
  //   const {params} = route;
  //   const {date, id, type} = params;

  //   const [currentAffairDetail, setCurrentAffairDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  //   useEffect(() => {
  //     getCurrentAffairDetail();
  //   }, []);

  //   async function getCurrentAffairDetail() {
  //     setIsLoading(true);
  //     try {
  //       const url = `${getCurrentAffairApiUrl(type, true)}${
  //         type === CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_MAGAZINE
  //           ? ''
  //           : `${convertDateTime(date, 'DD-MMM-YYYY')}/${id}`
  //       }`;
  //       console.log('url >>', url);

  //       const response = await axios.get(url);
  //       console.log('response >>', response);

  //       if (response?.data?.data) {
  //         setCurrentAffairDetail(response?.data?.data[0]);
  //       }
  //     } catch (error) {
  //       console.log('Something went wrong', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   const htmlContent = `
  //       <html>
  //         <head>
  //           <style>
  //             .content {
  //               margin:3rem 2rem;
  //             }
  //             span{
  //                font-size:2rem
  //             }
  //           </style>
  //         </head>
  //         <body>
  //           <div class="content">${currentAffairDetail?.long_desc}</div>
  //         </body>
  //       </html>
  //     `;
  return (
    <View style={styles.maincontainer}>
      {/* <Header title={convertDateTime(date, 'DD MMMM YYYY')} /> */}
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: spacing.MARGIN_16}}
          color={colors.theme}
        />
      ) : (
        <WebView
          source={{
            html: '',
          }}
          showsVerticalScrollIndicator={false}
          style={styles.webView}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
  },
  webView: {
    marginTop: spacing.MARGIN_16,
  },
});
export default WebViewScreen;
