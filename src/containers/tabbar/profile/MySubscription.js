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
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {customRequest} from '../../../api/customRequest';
import * as IMAGE from '../../../assets/images/indexnew';
import {
  Montserrat_Medium,
  courseImage,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import LoginButton from '../../../components/common/LoginButton';
import {styles} from '../../../themes';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import {logoutUser} from '../../../utils/commonFunction';
const MySubscription = ({navigation}) => {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const userDetails = useSelector(state => state.USER_SLICE);

  const [subscriptionData, setSubscriptionData] = useState([]);
  // const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const today = moment(new Date()).format('YYYY-MM-DD');

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      // setAuthenticated(true);
      subscriptionApi();
    } else if (response?.message == 'Unauthenticated.') {
      logoutUser();
      setIsLoading(false);
    }
  };

  const subscriptionApi = () => {
    customRequest('student/my-subscriptions', 'GET').then(res => {
      console.log('subscriptionApi', res);
      setSubscriptionData(res);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    subscriptionApi();
    setRefreshing(false);
  };

  const dateFormatter = date => {
    return moment(date).format('DD-MM-YYYY');
  };

  return (
    <CSafeAreaView style={styles.flex}>
      <FullScreenLoading isLoading={isLoading} />
      {userDetails?.isUserLoggedIn ? (
        <View>
          <CHeader
            title={'My Courses'}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          <View style={{padding: 10}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginBottom: 105}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              {subscriptionData.length > 0 ? (
                subscriptionData?.map((item, index) => {
                  //console.log('item', item);
                  return (
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: 'white',
                        elevation: 8,
                        borderRadius: 8,
                        padding: 10,
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View style={{width: '33%'}}>
                        <Image
                          resizeMode="center"
                          style={{width: 125, height: 110, borderRadius: 5}}
                          source={
                            item?.course[0]?.image
                              ? {uri: item?.course[0]?.image}
                              : {uri: courseImage}
                          }
                        />
                      </View>
                      <View style={{width: '59%'}}>
                        <Text
                          numberOfLines={1}
                          style={{
                            color: 'black',
                            fontFamily: Montserrat_Medium,
                            fontSize: 16,
                            letterSpacing: 0.5,
                          }}>
                          {item?.course[0]?.name}
                        </Text>

                        <View
                          style={{
                            marginTop: 2,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View style={{width: '70%', flexDirection: 'row'}}>
                            <Image
                              style={{
                                width: 15,
                                height: 15,
                                tintColor: '#454545',
                                top: 1.5,
                              }}
                              source={IMAGE.WALLET}
                            />
                            <Text
                              style={{
                                color: '#454545',
                                fontFamily: Montserrat_Medium,
                              }}>
                              {' '}
                              ₹{item?.course[0]?.amount}
                            </Text>
                          </View>
                          <View
                            style={{width: '30%', justifyContent: 'center'}}>
                            <Text
                              style={{
                                fontFamily: Montserrat_Medium,
                                fontSize: 12,
                                color:
                                  item?.expiry_date < today ? 'red' : '#00d26a',
                              }}>
                              {item?.expiry_date < today ? 'Expired' : 'Active'}
                            </Text>
                          </View>
                        </View>

                        <View style={{marginTop: 5, flexDirection: 'row'}}>
                          <Image
                            style={{
                              width: 15,
                              height: 15,
                              tintColor: '#454545',
                              top: 2,
                            }}
                            source={IMAGE.CALENDER}
                          />
                          <Text
                            style={{
                              color: '#a9a9a9',
                              marginLeft: 5,
                              fontFamily: Montserrat_Medium,
                            }}>
                            <Text style={{color: '#454545'}}>Paid : </Text>
                            {dateFormatter(item?.start_date)}
                          </Text>
                        </View>

                        <View style={{marginTop: 5, flexDirection: 'row'}}>
                          <Image
                            style={{
                              width: 15,
                              height: 15,
                              tintColor: 'red',
                              top: 2,
                            }}
                            source={IMAGE.CALENDER}
                          />
                          <Text
                            style={{
                              color: 'red',
                              marginLeft: 5,
                              fontFamily: Montserrat_Medium,
                            }}>
                            <Text style={{color: 'red'}}>Expired : </Text>
                            {dateFormatter(item?.expiry_date)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    // <View
                    //   key={index}
                    //   style={{
                    //     width: '100%',
                    //     marginTop: 20,
                    //     padding: 10,
                    //     backgroundColor: 'white',
                    //     borderRadius: 10,
                    //     flexDirection: 'row',
                    //     alignItems: 'center',

                    //     elevation: 5,
                    //    //borderColor: item?.expiry_date > today ? 'green' : 'red',
                    //     //borderWidth: 2,
                    //     //columnGap: 18,
                    //     backgroundColor: colors.backgroundColor,
                    //   }}>
                    //   <Image
                    //     resizeMode="contain"
                    //     style={{ height: 120, aspectRatio: 1 }}
                    //     source={
                    //       item?.course[0]?.image
                    //         ? {uri: item?.course[0]?.image }
                    //         : {uri: courseImage }
                    //     }
                    //   />
                    //   <View style={{ width: '65%', rowGap: 10 }}>
                    //     <CText type={'b16'} numberOfLines={1}>
                    //       {item?.course[0]?.name}
                    //     </CText>
                    //     <View
                    //       style={{
                    //         flexDirection: 'row',
                    //         justifyContent: 'space-around',
                    //       }}>
                    //       <View style={{ rowGap: 5 }}>
                    //         <View style={{ flexDirection: 'row', columnGap: 10 }}>
                    //           <Money style={{ height: 20, width: 20 }} />
                    //           <CText>₹{item?.course[0]?.amount}</CText>
                    //         </View>

                    //         <View style={{ flexDirection: 'row', columnGap: 10 }}>
                    //           <Calendar height={20} width={20} />
                    //           <CText>{dateFormatter(item?.start_date)}</CText>
                    //         </View>

                    //         <View style={{ flexDirection: 'row', columnGap: 10 }}>
                    //           <Calendar height={20} width={20} />
                    //           <CText>{dateFormatter(item?.expiry_date)}</CText>
                    //         </View>
                    //       </View>
                    //       <View
                    //         style={{
                    //           flexDirection: 'column',
                    //           justifyContent: 'space-between',
                    //           paddingHorizontal: 11,
                    //         }}>
                    //         <CText
                    //           type={'b16'}
                    //           style={{
                    //             alignSelf: 'flex-start',
                    //             color:
                    //               item?.expiry_date < today ? 'red' : 'green',
                    //           }}>
                    //           {item?.expiry_date < today ? 'Expired' : 'Active'}
                    //         </CText>
                    //         <CText
                    //           type={'b16'}
                    //           color={
                    //             item?.course[0]?.amount == 0
                    //               ? 'green'
                    //               : colors.primary
                    //           }>
                    //           {item?.course[0]?.amount == 0 ? 'Free' : 'Paid'}
                    //         </CText>
                    //       </View>
                    //     </View>
                    //   </View>
                    // </View>
                  );
                })
              ) : (
                <Image
                  style={{
                    width: getWidth(355),
                    aspectRatio: 1,
                    marginTop: getWidth(100),
                  }}
                  source={{uri: noDataImage}}
                />
              )}
            </ScrollView>
          </View>
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
              title={'My Courses'}
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

export default MySubscription;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  container: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    top: moderateScale(-30),
  },
  profileCover: {
    width: '100%',
    height: moderateScale(170),
  },

  profileImage: {
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    borderWidth: moderateScale(2),
    top: moderateScale(-50),
    ...styles.selfCenter,
    position: 'absolute',
  },
  innerContainer: {
    ...styles.pl10,
    ...styles.pr10,
  },

  submitButton: {
    ...styles.mt40,
    width: '40%',
    alignSelf: 'center',
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
