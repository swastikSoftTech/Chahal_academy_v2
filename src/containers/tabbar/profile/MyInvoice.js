import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {customRequest} from '../../../api/customRequest';
import * as IMAGE from '../../../assets/images/indexnew';
import {Montserrat_Medium, getWidth} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CText from '../../../components/common/CText';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import LoginButton from '../../../components/common/LoginButton';
import {styles} from '../../../themes';
import {logoutUser} from '../../../utils/commonFunction';
const MyInvoice = ({navigation}) => {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const userDetails = useSelector(state => state.USER_SLICE);

  const [invoiceData, setInvoiceData] = useState([]);
  // const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const today = moment(new Date()).format('YYYY-MM-DD');

  const tokenCheck = async () => {
    console.log('Token', await AsyncStorage.getItem('tokenStudent'));
    const response = await customRequest('verify_token', 'GET');
    if (response?.message == 'authenticated') {
      // setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      logoutUser();
      setIsLoading(false);
    }
  };

  const invoiceApi = async () => {
    await customRequest('get-student-InvoiceList', 'GET').then(res => {
      setInvoiceData(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      invoiceApi();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    invoiceApi();
    setRefreshing(false);
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const downloadInvoice = async (id, name) => {
    await customRequest(`invoice/pdf/${id}`, 'GET').then(res => {
      console.log('invoicepsf', res);
      let pdf_URL = res?.message;
      console.log('pdfUrl', pdf_URL);
      let ext = getExtention(pdf_URL);
      ext = '.' + ext[0];
      const {config, fs} = RNFetchBlob;
      let PdfDir = fs.dirs.DownloadDir;
      let options = {
        fileCache: true,
        addAndroidDownloads: {
          // Related to the Android only
          useDownloadManager: true,
          notification: true,
          path: PdfDir + `/${name}.pdf`,
          // '/lms' +
          // '.pdf',
          description: 'pdf',
        },
      };
      config(options)
        .fetch('GET', pdf_URL)
        .then(res => {
          console.log('res -> ', res);
          ToastAndroid.show('File downloaded', ToastAndroid.LONG);
        });
    });
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <FullScreenLoading isLoading={isLoading} />
      {userDetails?.isUserLoggedIn ? (
        <View>
          <CHeader
            title={'My Invoices'}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                padding={10}
              />
            }>
            {invoiceData?.map((item, index) => {
              console.log('item', item);
              return (
                <View
                  key={index}
                  style={{
                    width: getWidth(357),
                    marginHorizontal: 10,
                    marginTop: 10,
                    padding: 10,
                    elevation: 5,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor:
                      colors.backgroundColor == '#F8F9FA' ? 'white' : 'gray',
                    backgroundColor: colors.backgroundColor,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}>
                    <View style={{alignItems: 'center', width: '64%'}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          width: '100%',
                        }}>
                        <Image
                          style={{width: 15, height: 15}}
                          source={IMAGE.STUDENT_COURCES}
                        />
                        <Text
                          style={{
                            fontFamily: Montserrat_Medium,
                            color: 'black',
                            marginLeft: 4,
                          }}>
                          {item?.courses?.name}
                        </Text>
                      </View>

                      <View
                        style={{
                          marginTop: 5,
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          width: '100%',
                        }}>
                        <Image
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: '#454545',
                            top: 3,
                            marginRight: 5,
                          }}
                          source={IMAGE.CALENDER}
                        />
                        <Text
                          style={{
                            color: '#454545',
                            fontFamily: Montserrat_Medium,
                            fontSize: 13,
                            letterSpacing: 1,
                          }}>
                          DOP : {item?.inv_date}
                        </Text>
                      </View>
                      <View
                        style={{
                          marginTop: 5,
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          width: '100%',
                        }}>
                        <Image
                          style={{
                            width: 15,
                            height: 15,
                            tintColor: '#454545',
                            top: 3,
                            marginRight: 5,
                          }}
                          source={IMAGE.WALLET}
                        />
                        <Text
                          style={{
                            color: '#454545',
                            fontFamily: Montserrat_Medium,
                            letterSpacing: 1,
                          }}>
                          Amount : ₹ {item?.total_amount}
                        </Text>
                      </View>
                    </View>
                    <View style={{width: '30%'}}>
                      <TouchableOpacity
                        style={[localStyles.button, {marginVertical: 20}]}
                        onPress={() =>
                          downloadInvoice(item?.id, item?.courses?.name)
                        }>
                        <CText type={'m16'} color={'white'}>
                          Download
                        </CText>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              marginHorizontal: 10,
              marginRight: 20,
            }}>
            <CHeader
              title={'My Invoices'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <LottieView
            source={require('../../../assets/lottie/login.json')}
            autoPlay // Start playing automatically
            loop // Repeat the animation
            style={{
              width: getWidth(350),
              height: getWidth(350),
              alignSelf: 'center',
              marginTop: '40%',
            }} // Adjust dimensions as needed
          />
        </View>
      )}
    </CSafeAreaView>
  );
};

export default MyInvoice;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },

  submitButton: {
    ...styles.mt20,
    width: '30%',
    alignSelf: 'center',
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  button: {
    width: getWidth(90),
    marginTop: 20,
    padding: 5,
    backgroundColor: '#5F5CF0',
    borderRadius: 6,
    elevation: 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
