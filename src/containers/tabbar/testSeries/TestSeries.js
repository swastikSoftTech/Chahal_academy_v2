import {useIsFocused, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Progress from 'react-native-progress';
import {useSelector} from 'react-redux';
import {customRequest} from '../../../api/customRequest';
import * as IMAGE from '../../../assets/images/indexnew';
import {Right_Arrow_Icon} from '../../../assets/svgs';
import {
  Montserrat_Medium,
  deviceHeight,
  deviceWidth,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../../common/constants';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import Header from '../../../components/common/header/Header';
import {StackNav} from '../../../navigation/NavigationKeys';
import {spacing} from '../../../styles/spacing';
import {styles} from '../../../themes';
import {logoutUser} from '../../../utils/commonFunction';
const TestSeries = () => {
  const userDetails = useSelector(state => state.USER_SLICE);
  const colors = useSelector(state => state.theme.theme);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const tokenCheck = async () => {
    setIsLoading(true);
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck >>>', response);
    if (response?.message === 'authenticated') {
      // setAuthenticated(true);
      getTests(true);
    } else if (response?.message === 'Unauthenticated.') {
      logoutUser();
      getTests(false);
    }
    setIsLoading(false);
  };

  const getTests = async authenticated => {
    if (authenticated) {
      customRequest('student/test-series/courses', 'GET').then(res => {
        // console.log('responseTest', res);
        setList(res);
        return;
      });
    } else {
      customRequest('student/universaltestSeriescourses', 'GET').then(res => {
        // console.log('offline Response -----------', res);
        setList(res);
        return;
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      // getTests();
    }
  }, [isFocused, userDetails?.isUserLoggedIn]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    getTests();
    setRefreshing(false);
  };

  const renderTestSeries = (item, index) => {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(StackNav.TestCard, {
              id: item?.item?.id,
              name: item?.item?.courseName,
            })
          }
          style={[
            localStyles.categoryContainer,

            {
              backgroundColor: 'white',
              shadowColor: '#000',
              elevation: 5,
              shadowOffset: {width: 3, height: 3},
              shadowOpacity: 0.5,
              shadowRadius: 2,
              justifyContent: 'space-around',
            },
          ]}>
          <View style={{width: '30%'}}>
            <Image
              resizeMode="contain"
              style={{height: 70, width: 85, borderRadius: 5}}
              source={{
                uri: `${item?.item?.image}`,
              }}
            />
          </View>
          <View style={{width: '60%'}}>
            <Text
              numberOfLines={2}
              style={[
                {
                  fontFamily: Montserrat_Medium,
                  color: 'black',
                  fontSize: 16,
                  marginRight: 20,
                },
              ]}>
              {item?.item?.courseName}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 6,
                alignItems: 'center',
              }}>
              <Image
                style={{width: 15, height: 15, tintColor: '#454545'}}
                source={IMAGE.EXAM}
              />
              <Text style={{fontFamily: Montserrat_Medium, color: '#454545'}}>
                {item?.item?.count?.testSeries} TestSeries
              </Text>
            </View>
            <View style={{marginTop: 8}}></View>
            <Progress.Bar
              style={{alignSelf: 'flex-end'}}
              width={deviceWidth / 2}
              progress={
                item?.item?.count?.attempt ||
                0 / item?.item?.count?.testSeries ||
                0
              }
              color="#38AD62"
            />
          </View>

          <Right_Arrow_Icon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <FullScreenLoading isLoading={isLoading} />
      {userDetails?.isUserLoggedIn ? (
        <View>
          <Header title={'Test Series'} hideBack={true} showMenu />
          {list?.length == 0 ? (
            <View>
              <Image
                source={{uri: noDataImage}}
                style={{
                  width: deviceWidth,
                  height: deviceHeight / 2,
                  alignSelf: 'center',
                  marginTop: '35.5%',
                }}
              />
            </View>
          ) : (
            <View style={[{marginTop: spacing.MARGIN_16}]}>
              {/* <CHeader
                title={'Test Series'}
                isHideBack={false}
                customTextStyle={localStyles.headerText}
              /> */}
              <FlatList
                data={list}
                showsVerticalScrollIndicator={false}
                renderItem={(item, index) => renderTestSeries(item, index)}
                keyExtractor={(item, index) => index.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          )}
        </View>
      ) : (
        <View>
          <Header title={'Test Series'} hideBack={true} showMenu showLogin />
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
          {/* <FlatList
            data={list}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => {
              console.log('itemm-', item);
              return (
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(StackNav.TestCard, {
                        id: item.id,
                        name: item.courseName,
                      })
                    }
                    style={[
                      localStyles.categoryContainer,
                      {
                        backgroundColor: colors.inputBg,
                        shadowColor: '#000',
                        elevation: 5,
                        shadowOffset: { width: 3, height: 3 },
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                        height: 110,
                      },
                    ]}>
                    <View style={styles.rowStart}>
                      <View style={localStyles.iconStyle}>
                        <Image
                          style={{ height: 55, width: 55 }}
                          source={{
                            uri: item.image,
                          }}
                        />
                      </View>
                      <View style={{ rowGap: 10, marginLeft: 20 }}>
                        <CText
                          type={'m16'}
                          style={[styles.ml10, { fontWeight: 'bold' }]}>
                          {item.courseName}
                        </CText>
                        <View style={{ flexDirection: 'row', columnGap: 15 }}>
                          <View style={{ flexDirection: 'row' }}>
                            <TestSVG height={20} width={20} />
                            <CText type={'m12'} style={styles.ml10}>
                              {item?.count?.testSeries} TestSeries
                            </CText>
                          </View>
                          <View style={{ flexDirection: 'row' }}></View>
                        </View>
                      </View>
                    </View>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          /> */}
        </View>
      )}
    </CSafeAreaView>
  );
};

export default TestSeries;
const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  headerStyle: {
    ...styles.ph10,
    ...styles.mv20,
  },
  iconStyle: {
    width: moderateScale(48),
    height: moderateScale(48),
  },
  categoryContainer: {
    ...styles.rowSpaceBetween,
    padding: 8,
    ...styles.mh25,
    ...styles.mb25,
    borderRadius: 8,
    paddingVertical: 12,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  collection: {
    ...styles.flex,
    marginHorizontal: '2%',
    marginVertical: '4%',
    borderRadius: moderateScale(15),
  },
  imageBackground: {
    width: moderateScale(155),
    height: moderateScale(128),
    ...styles.justifyEnd,
  },
  submitButton: {
    ...styles.mt40,
    width: '40%',
    alignSelf: 'center',
  },
});
