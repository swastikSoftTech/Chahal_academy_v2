import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  RefreshControl,
  Modal,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {styles} from '../../../themes';
import {useSelector} from 'react-redux';
import {
  Montserrat_Bold,
  Montserrat_Medium,
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import {
  Right_Arrow_Icon,
  Star_Icon_Filled,
  User_Icon,
} from '../../../assets/svgs';
import {useNavigation, useIsFocused, useRoute} from '@react-navigation/native';
import CText from '../../../components/common/CText';
import {StackNav, TabNav} from '../../../navigation/NavigationKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {customRequest} from '../../../api/customRequest';
import CHeader from '../../../components/common/CHeader';
import Watch from '../../../assets/svgs/watch.svg';
import CButton from '../../../components/common/CButton';
import strings from '../../../i18n/strings';
import axios from '../../../api/axios';
import LinearGradient from 'react-native-linear-gradient';
import * as IMAGE from '../../../assets/images/indexnew';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import {logoutUser} from '../../../utils/commonFunction';
const TestCard = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userDetails = useSelector(state => state.USER_SLICE);

  const [list, setList] = useState([]);
  const [analystData, setAnaystData] = useState([]);
  const [resp, setResp] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const colors = useSelector(state => state.theme.theme);
  // const [authenticated, setAuthenticated] = useState(false);
  const [isShown, setIsShown] = useState(null);

  console.log('preItem------', route?.params?.id);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      // setAuthenticated(true);
      getTests(true);
    } else if (response?.message === 'Unauthenticated.') {
      logoutUser();
      setIsLoading(false);
    }
  };

  const getTests = async authenticated => {
    if (authenticated) {
      customRequest(`student/test-series/course/${route?.params?.id}`, 'GET')
        .then(res => {
          //console.log('responseAuth-------', JSON.stringify(res));
          setList(() => res.message);
          setAnaystData(() => res.analytics);
          // setIsLoading(false);
          return;
        })
        .finally(() => setIsLoading(false));
    } else {
      customRequest(`student/universalTestSeries/${route?.params?.id}`, 'GET')
        .then(res => {
          console.log(
            'offline Response -----------',
            res[0]?.course_relation_liveclass[0]?.coursemodule,
          );
          setList(() => res);
          // setIsLoading(false);
          return;
        })
        .finally(() => setIsLoading(false));
    }
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
    // getTests();
    setRefreshing(false);
  };

  const handleTest = async id => {
    try {
      const tokenStudent = await AsyncStorage.getItem('tokenStudent');
      const config = {
        headers: {Authorization: `Bearer ${tokenStudent}`},
      };
      // setLoading(true);
      const responce = await axios.get(`student/test-attempt/${id}`, config);
      console.log('responce:::::2a', responce);
      setResp(responce);
      console.log('responce:::::2a', resp);
    } catch (error) {
      console.log('responce:::::3', error);
      console.log(error);
      if (error.response.status === 401) {
        await AsyncStorage.removeItem('token');
        navigation.navigate('LoginScreen');
      }
      Alert.alert('error');
    }

    // }
  };

  const maxAttemptValue = (submodule, module) => {
    //console.log('for Max attempt value', submodule, module);
    if (submodule == null && module > 0) {
      console.log('maxAttemptValue1', module);
      return parseInt(module, 10);
    } else {
      console.log('maxAttemptValue', submodule);
      return parseInt(submodule, 10);
    }
  };

  const renderTestSeries = (item, index) => {
    // console.log(
    //   'ItemTest',
    //   item?.item?.course_relation_liveclass[0].coursemodule,
    // );

    console.log('item >>>', JSON.stringify(item));

    return (
      <View>
        {item?.item?.course_relation_liveclassmodule?.map((item, index) => {
          //console.log('ItemTest2---',JSON.stringify(item));
          return (
            <View key={index}>
              <View style={{paddingHorizontal: 10, top: 15}}>
                {item?.coursemodule?.map(itx => {
                  //console.log('itx--',JSON.stringify(itx))
                  return (
                    <>
                      <TouchableOpacity
                        onPress={() => {
                          console.log('ii--', JSON.stringify(itx));
                          setIsShown(itx.id);
                        }}
                        style={{
                          alignSelf: 'flex-start',
                        }}>
                        <LinearGradient
                          colors={['#d418a0', '#ec3a7c', '#ffcc00']}
                          style={{
                            // height: 35,
                            // width: '100%',
                            flexDirection: 'row',
                            padding: 8,
                            // borderWidth: 1,
                            // borderColor: '#d3d3d3',
                            gap: 5,
                            alignItems: 'center',
                            borderRadius: 5,
                          }}
                          start={{x: 0.5, y: 0}}
                          end={{x: 0, y: 0.5}}>
                          <View>
                            <Text
                              numberOfLines={1}
                              style={[
                                {
                                  textTransform: 'capitalize',
                                  fontSize: 13,
                                  color: '#ffffff',
                                  fontFamily: Montserrat_Medium,
                                },
                              ]}>
                              {itx.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                width: 18,
                                height: 18,
                                tintColor: '#ffffff',
                              }}
                              source={require('../../../assets/images/about.png')}
                            />
                          </View>
                        </LinearGradient>
                      </TouchableOpacity>

                      {itx.id === isShown && (
                        <Modal
                          transparent={true}
                          visible={true}
                          animationType="slide">
                          <View
                            style={{
                              width: '100%',
                              height: '100%',
                              backgroundColor: '#2d2d2dda',
                              justifyContent: 'center',
                              alignItems: 'center',
                              padding: 10,
                            }}>
                            <View
                              style={{
                                width: '100%',
                                borderRadius: 8,
                                backgroundColor: 'white',
                                padding: 10,
                                elevation: 10,
                              }}>
                              <View>
                                {analystData?.map(itemz => {
                                  console.log('ii--11--', itemz);
                                  return (
                                    <View
                                      style={{paddingHorizontal: 10, top: 10}}>
                                      {item.courserelationsubmodule.map(
                                        itxm => {
                                          //console.log('iiii--',JSON.stringify(itx) )
                                          return (
                                            <>
                                              {itxm.module_id ==
                                                itemz.module_id && (
                                                <>
                                                  <View>
                                                    <Image
                                                      style={{
                                                        width: 50,
                                                        height: 50,
                                                        alignSelf: 'center',
                                                      }}
                                                      source={require('../../../assets/images/analyst.png')}
                                                    />
                                                    <TouchableOpacity
                                                      onPress={() => {
                                                        setIsShown(null);
                                                      }}
                                                      style={{
                                                        position: 'absolute',
                                                        right: -5,
                                                        top: -10,
                                                      }}>
                                                      <Image
                                                        style={{
                                                          width: 25,
                                                          height: 25,
                                                        }}
                                                        source={require('../../../assets/images/close.png')}
                                                      />
                                                    </TouchableOpacity>

                                                    <Text
                                                      style={[
                                                        {
                                                          fontSize: 20,
                                                          color: '#454545',
                                                          textAlign: 'center',
                                                          fontWeight: 'bold',
                                                          letterSpacing: 1,
                                                        },
                                                      ]}>
                                                      Analytics
                                                    </Text>
                                                    <View
                                                      style={{
                                                        width: '100%',
                                                        borderWidth: 0.5,
                                                        borderColor: '#d3d3d3',
                                                        marginTop: 10,
                                                      }}
                                                    />

                                                    <View
                                                      style={{
                                                        flexDirection: 'row',
                                                        marginTop: 10,
                                                      }}>
                                                      <Text
                                                        style={{
                                                          color: '#454545',
                                                          fontWeight: 'bold',
                                                          marginTop: 8,
                                                          fontSize: 16,
                                                        }}>
                                                        Average :
                                                      </Text>
                                                      <Text
                                                        style={{
                                                          color: 'black',
                                                          fontWeight: 'bold',
                                                          marginTop: 8,
                                                          fontSize: 16,
                                                          marginLeft: 15,
                                                        }}>
                                                        {itemz.avg}.00 %
                                                      </Text>
                                                    </View>
                                                    <View
                                                      style={{
                                                        flexDirection: 'row',
                                                      }}>
                                                      <Text
                                                        style={{
                                                          color: '#454545',
                                                          fontWeight: 'bold',
                                                          marginTop: 8,
                                                          fontSize: 16,
                                                        }}>
                                                        Total Attends :
                                                      </Text>
                                                      <Text
                                                        style={{
                                                          color: 'black',
                                                          fontWeight: 'bold',
                                                          marginTop: 8,
                                                          fontSize: 16,
                                                          marginLeft: 5,
                                                        }}>
                                                        {itemz.total_attempt}
                                                      </Text>
                                                    </View>
                                                    <View
                                                      style={{
                                                        flexDirection: 'row',
                                                      }}>
                                                      <Text
                                                        style={{
                                                          color: '#454545',
                                                          fontWeight: 'bold',
                                                          marginTop: 8,
                                                          fontSize: 16,
                                                        }}>
                                                        Total Incorrect :
                                                      </Text>
                                                      <Text
                                                        style={{
                                                          color: 'black',
                                                          fontWeight: 'bold',
                                                          marginTop: 8,
                                                          fontSize: 16,
                                                          marginLeft: 5,
                                                        }}>
                                                        {itemz.total_incorrect}
                                                      </Text>
                                                    </View>
                                                    <View
                                                      style={{
                                                        flexDirection: 'row',
                                                        marginBottom: 10,
                                                      }}>
                                                      <Text
                                                        style={{
                                                          color: '#454545',
                                                          fontWeight: 'bold',
                                                          marginTop: 8,
                                                          fontSize: 16,
                                                        }}>
                                                        Message :
                                                      </Text>
                                                      <Text
                                                        style={
                                                          itemz.avg < 50
                                                            ? {
                                                                color: 'red',
                                                                fontWeight:
                                                                  'bold',
                                                                marginTop: 8,
                                                                fontSize: 15,
                                                                marginLeft: 5,
                                                                marginRight: 50,
                                                              }
                                                            : {
                                                                color: 'green',
                                                                fontWeight:
                                                                  'bold',
                                                                marginTop: 8,
                                                                fontSize: 15,
                                                                marginLeft: 5,
                                                                marginRight: 50,
                                                              }
                                                        }>
                                                        {itemz.message}
                                                      </Text>
                                                    </View>
                                                  </View>
                                                  <View
                                                    style={{
                                                      width: '100%',
                                                      justifyContent: 'center',
                                                      alignItems: 'center',
                                                    }}>
                                                    <View
                                                      style={{
                                                        width: '50%',
                                                        height: 35,
                                                        zIndex: 1000,
                                                        right: 0,
                                                        justifyContent:
                                                          'center',
                                                        alignItems: 'center',
                                                        marginBottom: 20,
                                                        marginTop: 15,
                                                      }}>
                                                      <LinearGradient
                                                        colors={[
                                                          '#ec3a7c',
                                                          '#ff942d',
                                                        ]}
                                                        style={{
                                                          height: '100%',
                                                          width: '100%',
                                                          position: 'absolute',
                                                          borderRadius: 10,
                                                        }}
                                                        start={{x: 0.5, y: 0}}
                                                        end={{x: 0, y: 0.5}}
                                                      />
                                                      <Text
                                                        style={{
                                                          color: 'white',
                                                          fontSize: 13,
                                                          fontWeight: 'bold',
                                                          letterSpacing: 1,
                                                        }}>
                                                        Done
                                                      </Text>
                                                    </View>
                                                  </View>
                                                </>
                                              )}
                                            </>
                                          );
                                        },
                                      )}
                                    </View>
                                  );
                                })}
                              </View>
                            </View>
                          </View>
                        </Modal>
                      )}
                    </>
                  );
                })}
              </View>

              <View
                style={[
                  styles.ml20,
                  {
                    gap: moderateScale(5),
                  },
                ]}>
                <CText
                  type={'s20'}
                  numberOfLines={1}
                  style={[styles.m5, {fontWeight: 'bold'}]}>
                  {item?.coursemodule[0]?.submodule?.length > 0 &&
                    item?.coursemodule[0]?.name}
                </CText>
              </View>

              {item?.coursemodule[0]?.test_series?.length > 0 &&
                item?.coursemodule[0]?.test_series?.map((subitem, subIndex) => {
                  console.log('ItemTest3 >>>>', subitem);
                  return (
                    <View style={{padding: 10}}>
                      <View
                        style={{
                          padding: 10,
                          width: '100%',
                          backgroundColor: 'white',
                          elevation: 10,
                          marginTop: 0,
                          borderRadius: 10,
                          top: -10,
                          shadowOffset: {
                            width: 10,
                            height: 10,
                          },
                          shadowOpacity: 20,
                          shadowRadius: 10,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Image
                            style={{width: 15, height: 15, tintColor: 'black'}}
                            source={IMAGE.STUDENT_COURCES}
                          />
                          <Text
                            style={{
                              color: 'black',
                              fontFamily: Montserrat_Medium,
                              fontSize: 19,
                              letterSpacing: 0.7,
                              marginLeft: 5,
                            }}>
                            {subitem.name}
                          </Text>
                        </View>

                        {subitem.image == '' ? (
                          <Image
                            resizeMode="contain"
                            source={require('../../../assets/images/test.png')}
                            style={{
                              width: '100%',
                              height: 120,
                              borderRadius: 5,
                              marginTop: 8,
                              backgroundColor: '#d3d3d3',
                            }}
                          />
                        ) : (
                          <Image
                            resizeMode="contain"
                            source={{uri: subitem.image}}
                            style={{
                              width: '100%',
                              height: 150,
                              borderRadius: 5,
                              marginTop: 8,
                              backgroundColor: '#d3d3d3',
                            }}
                          />
                        )}

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15,
                          }}>
                          <View
                            style={{
                              width: '48%',
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              style={{
                                height: 13,
                                width: 13,
                                tintColor: '#454545',
                                top: 1,
                              }}
                              source={IMAGE.WATCH}
                            />
                            <Text
                              style={{
                                fontFamily: Montserrat_Medium,
                                color: '#454545',
                                fontSize: 13,
                                marginLeft: 5,
                              }}>
                              Duration : {item?.coursemodule[0]?.duration} mins
                            </Text>
                          </View>

                          <View
                            style={{
                              width: '48%',
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'flex-end',
                            }}>
                            <Image
                              style={{
                                height: 13,
                                width: 13,
                                tintColor: '#454545',
                              }}
                              source={IMAGE.EXAM}
                            />
                            <Text
                              style={{
                                fontFamily: Montserrat_Medium,
                                color: '#454545',
                                fontSize: 13,
                                marginLeft: 5,
                              }}>
                              Attempt :{' '}
                              {subitem?.test_result?.attempt == null
                                ? 0 + ' '
                                : subitem?.test_result?.attempt + ' '}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15,
                          }}>
                          <View
                            style={{
                              width: '48%',
                              alignItems: 'center',
                              flexDirection: 'row',
                            }}>
                            <Image
                              style={{
                                height: 13,
                                width: 13,
                                tintColor: '#454545',
                                top: 1,
                              }}
                              source={IMAGE.QUESTIONS}
                            />
                            <Text
                              style={{
                                fontFamily: Montserrat_Medium,
                                color: '#454545',
                                fontSize: 13,
                                marginLeft: 5,
                              }}>
                              Questions : {subitem?.qst_count}
                            </Text>
                          </View>

                          <View
                            style={{
                              width: '48%',
                              alignItems: 'center',
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                            }}>
                            <Image
                              style={{
                                height: 13,
                                width: 13,
                                tintColor: '#454545',
                                top: 1,
                              }}
                              source={IMAGE.BOOK}
                            />
                            <Text
                              style={{
                                fontFamily: Montserrat_Medium,
                                color: '#454545',
                                fontSize: 13,
                                marginLeft: 5,
                              }}>
                              Marks : {subitem?.qst_count}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 15,
                          }}>
                          <Image
                            style={{
                              height: 13,
                              width: 13,
                              tintColor: '#fa826a',
                              top: 1,
                            }}
                            source={IMAGE.QUESTIONS}
                          />
                          <Text
                            style={{
                              fontFamily: Montserrat_Medium,
                              color: '#fa826a',
                              fontSize: 13,
                              marginLeft: 5,
                            }}>
                            Nagative Questions :{' '}
                            {item.coursemodule[0]?.negative_marks + ' '}
                          </Text>
                        </View>

                        <View
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 15,
                          }}>
                          <Image
                            style={{
                              height: 13,
                              width: 13,
                              tintColor: '#fa826a',
                            }}
                            source={IMAGE.EXAM}
                          />
                          <Text
                            style={{
                              fontFamily: Montserrat_Medium,
                              color: '#fa826a',
                              fontSize: 13,
                              marginLeft: 5,
                            }}>
                            Max Attempt :{' '}
                            {subitem?.test_result?.attempt == null
                              ? 0 + ' '
                              : subitem?.test_result?.attempt + ' '}
                          </Text>
                        </View>

                        <View style={{marginTop: 15}}>
                          {subitem?.test_structure?.name === 'Folder' ? (
                            <CButton
                              title="Show Test"
                              style={{width: '100%', textAlign: 'center'}}
                              onPress={() => {
                                navigation.replace(
                                  StackNav.ShowSubTextModules,
                                  {
                                    qId: subitem.id,
                                    name: subitem.name,
                                  },
                                );
                              }}
                            />
                          ) : (
                            <CButton
                              title="Start Test"
                              style={{width: '100%', textAlign: 'center'}}
                              onPress={() => {
                                console.log('item.id >>', subitem, item.id);
                                navigation.navigate(StackNav.StartTest, {
                                  qId: subitem?.id,
                                  name: subitem.name,
                                });
                              }}
                            />
                          )}

                          {/* {
                            subitem.fk_test_structure_id !== '1' ? (
                              <TouchableOpacity
                                style={{ marginBottom: 10 }}
                              >
                                {subitem?.test_result?.attempt >=
                                  maxAttemptValue(
                                    subitem?.attempts,
                                    item?.coursemodule[0]?.attempts,
                                  ) ? null : (
                                  <CButton
                                    title="Start Test"
                                    style={{ width: 80, textAlign: 'center' }}
                                    onPress={() => {
                                      navigation.replace(StackNav.StartTest, {
                                        qId: subitem.id,
                                        attempt:
                                          item?.item
                                            ?.courserelationsubmodule[0]
                                            ?.test_result?.attempt,
                                        name: subitem.name,
                                      });
                                      handleTest(subitem.id);
                                      console.log('Starttest');
                                    }}
                                  />
                                )}
                              </TouchableOpacity>
                            ) : <TouchableOpacity>
                              {subitem?.test_result?.attempt >=
                                maxAttemptValue(
                                  subitem?.attempts,
                                  item?.coursemodule[0]?.attempts,
                                ) ? null : (
                                <CButton
                                  title="Show Test"
                                  style={{ width: 80, textAlign: 'center' }}
                                  onPress={() => {
                                    navigation.replace(StackNav.ShowTestModule, {
                                      qId: subitem.id,
                                      name: subitem.name,
                                    });
                                    //handleTest(subitem.id);
                                    console.log('Starttest',subitem);
                                  }}
                                />
                              )}
                            </TouchableOpacity>
                          } */}

                          {/* 
                          {subitem?.test_result?.attempt > 0 && (
                            <CButton
                              title="Results"
                              style={{ width: 70, textAlign: 'center' ,}}
                              onPress={() => {
                                navigation.navigate(StackNav.Results, {
                                  qId: subitem?.test_result
                                    ?.fk_sub_module_id,
                                  attempt: subitem?.test_result?.attempt,
                                  type: subitem?.fk_test_type_id,
                                });
                              }}
                            />
                          )} */}
                        </View>
                      </View>
                    </View>
                    // <View style={{ padding: 10 }}>
                    //   <View
                    //     style={[
                    //       localStyles.courseContainer,
                    //       {
                    //         marginTop: -10,
                    //         backgroundColor: colors.categoryColor,
                    //         shadowColor: '#000',
                    //         elevation: 2,
                    //         shadowOffset: {width: 3, height: 3 },
                    //         shadowOpacity: 0.5,
                    //         shadowRadius: 2,
                    //         flexDirection: 'row',
                    //       },
                    //     ]}>
                    //     {subitem.image == '' ? (
                    //       <Image
                    //         source={require('../../../assets/images/test.png')}
                    //         style={localStyles.cardImage}
                    //       />
                    //     ) : (
                    //       <Image
                    //         source={{ uri: subitem.image }}
                    //         style={localStyles.cardImage}
                    //       />
                    //     )}
                    //     <View style={{ marginLeft: 8, rowGap: 5 }}>
                    //       <Text
                    //         numberOfLines={1}
                    //         style={{ fontFamily: Montserrat_Medium, color: 'black', fontSize: 17 }}>
                    //         {subitem.name}
                    //       </Text>
                    //       <View>
                    //         <View
                    //           style={[
                    //             styles.rowSpaceBetween,
                    //             { width: moderateScale(180) },
                    //           ]}>
                    //           <Text
                    //             style={{ color: "#454545", fontFamily: Montserrat_Medium }}
                    //             numberOfLines={1}
                    //           >
                    //             {subitem?.qst_count} Questions
                    //           </Text>
                    //           <View style={[styles.rowStart, { columnGap: 5 }]}>
                    //             <Watch
                    //               width={15}
                    //               height={15}
                    //               style={{ alignSelf: 'center' }}
                    //             />
                    //             <CText
                    //               type={'m12'}
                    //               numberOfLines={1}
                    //               color={colors.gray}>
                    //               {item?.coursemodule[0]?.duration} mins
                    //             </CText>
                    //           </View>
                    //         </View>
                    //         <View style={styles.rowSpaceBetween}>
                    //           <CText
                    //             type={'m12'}
                    //             numberOfLines={1}
                    //             color={colors.gray}>
                    //             {item.coursemodule[0]?.total_marks} Marks
                    //           </CText>
                    //           <CText
                    //             type={'m12'}
                    //             numberOfLines={1}
                    //             color={colors.warning}>
                    //             {item.coursemodule[0]?.negative_marks + ' '}
                    //             Negative Mark
                    //           </CText>
                    //         </View>

                    //         <View style={styles.rowSpaceBetween}>
                    //           <CText
                    //             type={'m12'}
                    //             numberOfLines={1}
                    //             color={'red'}>
                    //             {maxAttemptValue(
                    //               subitem?.attempts,
                    //               item?.coursemodule[0]?.attempts,
                    //             ) + ' '}
                    //             max attempts
                    //           </CText>
                    //           <CText type={'m12'} numberOfLines={1}>
                    //             {subitem?.test_result?.attempt == null
                    //               ? 0 + ' '
                    //               : subitem?.test_result?.attempt + ' '}
                    //             attempts taken
                    //           </CText>
                    //         </View>
                    //         <View
                    //           style={[
                    //             styles.rowSpaceBetween,

                    //           ]}>
                    //           {/* {console.log(
                    //             'Value3',
                    //             subitem?.test_result?.attempt,
                    //             maxAttemptValue(
                    //               subitem?.attempts,
                    //               item?.coursemodule[0]?.attempts,
                    //             ),
                    //           )} */}
                    //           {
                    //             subitem.fk_test_structure_id !== '1' ? (
                    //               <TouchableOpacity>
                    //                 {subitem?.test_result?.attempt >=
                    //                   maxAttemptValue(
                    //                     subitem?.attempts,
                    //                     item?.coursemodule[0]?.attempts,
                    //                   ) ? null : (
                    //                   <CButton
                    //                     title="Start Test"
                    //                     style={{ width: 80, textAlign: 'center' }}
                    //                     onPress={() => {
                    //                       navigation.replace(StackNav.StartTest, {
                    //                         qId: subitem.id,
                    //                         attempt:
                    //                           item?.item
                    //                             ?.courserelationsubmodule[0]
                    //                             ?.test_result?.attempt,
                    //                         name: subitem.name,
                    //                       });
                    //                       handleTest(subitem.id);
                    //                       console.log('Starttest');
                    //                     }}
                    //                   />
                    //                 )}
                    //               </TouchableOpacity>
                    //             ) : <TouchableOpacity>
                    //               {subitem?.test_result?.attempt >=
                    //                 maxAttemptValue(
                    //                   subitem?.attempts,
                    //                   item?.coursemodule[0]?.attempts,
                    //                 ) ? null : (
                    //                 <CButton
                    //                   title="Show Test"
                    //                   style={{ width: 80, textAlign: 'center' }}
                    //                   onPress={() => {
                    //                     navigation.replace(StackNav.ShowTestModule, {
                    //                       qId: subitem.id,
                    //                       name: subitem.name,
                    //                     });
                    //                     //handleTest(subitem.id);
                    //                     //console.log('Starttest');
                    //                   }}
                    //                 />
                    //               )}
                    //             </TouchableOpacity>
                    //           }

                    //           {subitem?.test_result?.attempt > 0 && (
                    //             <CButton
                    //               title="Results"
                    //               style={{ width: 70, textAlign: 'center' }}
                    //               onPress={() => {
                    //                 navigation.navigate(StackNav.Results, {
                    //                   qId: subitem?.test_result
                    //                     ?.fk_sub_module_id,
                    //                   attempt: subitem?.test_result?.attempt,
                    //                   type: subitem?.fk_test_type_id,
                    //                 });
                    //               }}
                    //             />
                    //           )}
                    //         </View>
                    //       </View>
                    //     </View>
                    //   </View>
                    // </View>
                  );
                })}
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <CSafeAreaView style={localStyles.root}>
      <FullScreenLoading isLoading={isLoading} />
      <CHeader
        title={route?.params?.name}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      {userDetails?.isUserLoggedIn ? (
        <FlatList
          data={list}
          showsVerticalScrollIndicator={false}
          renderItem={(item, index) => renderTestSeries(item, index)}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <FlatList
          data={list[0]?.course_relation_liveclass}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <View>
                {item.coursemodule.map((item, index) => {
                  return (
                    <>
                      <View>
                        <View
                          style={[
                            styles.flex,
                            styles.ml20,

                            {
                              gap: moderateScale(5),
                            },
                          ]}>
                          <CText
                            type={'s20'}
                            numberOfLines={1}
                            style={[styles.m5, {fontWeight: 'bold'}]}>
                            {item.name}
                          </CText>
                        </View>
                      </View>

                      {item.submodule.map((subitem, subIndex) => {
                        return (
                          <View>
                            {subitem.qst_count > 0 && (
                              <View
                                style={[
                                  localStyles.courseContainer,
                                  {
                                    backgroundColor: colors.categoryColor,
                                    shadowColor: '#000',
                                    elevation: 5,
                                    shadowOffset: {width: 3, height: 3},
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    flexDirection: 'row',
                                  },
                                ]}>
                                {subitem.image == '' ? (
                                  <Image
                                    source={require('../../../assets/images/test.png')}
                                    style={localStyles.cardImage}
                                  />
                                ) : (
                                  <Image
                                    source={{uri: subitem.image}}
                                    style={localStyles.cardImage}
                                  />
                                )}
                                <View style={{marginLeft: 10}}>
                                  <CText
                                    type={'m16'}
                                    numberOfLines={1}
                                    style={{
                                      fontWeight: 'bold',
                                    }}>
                                    {subitem.name}
                                  </CText>
                                  <View>
                                    <View
                                      style={[
                                        styles.rowSpaceBetween,
                                        {width: moderateScale(180)},
                                      ]}>
                                      <CText
                                        type={'m12'}
                                        numberOfLines={1}
                                        color={colors.gray}>
                                        {subitem?.qst_count} Questions
                                      </CText>
                                      <View
                                        style={[
                                          styles.rowStart,
                                          {columnGap: 5},
                                        ]}>
                                        <Watch
                                          width={15}
                                          height={15}
                                          style={{alignSelf: 'center'}}
                                        />
                                        <CText
                                          type={'m12'}
                                          numberOfLines={1}
                                          color={colors.gray}>
                                          {item?.duration} mins
                                        </CText>
                                      </View>
                                    </View>
                                    <View style={styles.rowSpaceBetween}>
                                      <CText
                                        type={'m12'}
                                        numberOfLines={1}
                                        color={colors.gray}>
                                        {item?.total_marks} Marks
                                      </CText>
                                      <CText
                                        type={'m12'}
                                        numberOfLines={1}
                                        color={colors.warning}>
                                        {item?.negative_marks + ' '}
                                        Negative Mark
                                      </CText>
                                    </View>
                                    <View style={styles.rowSpaceBetween}>
                                      <CText
                                        type={'m12'}
                                        numberOfLines={1}
                                        color={'red'}>
                                        {maxAttemptValue(
                                          subitem?.attempts,
                                          item?.coursemodule?.attempts,
                                        ) + ' '}
                                        max attempts
                                      </CText>
                                      <CText type={'m12'} numberOfLines={1}>
                                        {subitem?.test_result?.attempt == null
                                          ? 0 + ' '
                                          : subitem?.test_result?.attempt + ' '}
                                        attempts taken
                                      </CText>
                                    </View>
                                    <View style={styles.rowSpaceBetween}>
                                      <TouchableOpacity
                                        style={{marginBottom: 10}}>
                                        {subitem?.test_result?.attempt ==
                                        maxAttemptValue(
                                          subitem?.attempts,
                                          item?.coursemodule?.attempts,
                                        ) ? null : (
                                          <CButton
                                            title="Start Test"
                                            style={{
                                              width: 80,
                                              textAlign: 'center',
                                            }}
                                            onPress={() => {
                                              navigation.replace(
                                                StackNav.StartTest,
                                                {
                                                  qId: subitem.id,
                                                  attempt:
                                                    item?.item
                                                      ?.courserelationsubmodule[0]
                                                      ?.test_result?.attempt,
                                                  name: subitem.name,
                                                },
                                              );
                                              handleTest(subitem.id);
                                              console.log('Starttest');
                                            }}
                                          />
                                        )}
                                      </TouchableOpacity>
                                      {subitem?.test_result?.attempt > 0 && (
                                        <CButton
                                          title="Results"
                                          style={{
                                            width: 70,
                                            textAlign: 'center',
                                          }}
                                          onPress={() => {
                                            navigation.navigate(
                                              StackNav.Results,
                                              {
                                                qId: subitem?.test_result
                                                  ?.fk_sub_module_id,
                                                attempt:
                                                  subitem?.test_result?.attempt,
                                                type: subitem?.fk_test_type_id,
                                              },
                                            );
                                          }}
                                        />
                                      )}
                                    </View>
                                  </View>
                                  <View style={{marginTop: 20, width: 100}}>
                                    <CButton
                                      title="Start Test"
                                      style={{width: 80, textAlign: 'center'}}
                                      onPress={() => {
                                        navigation.navigate(StackNav.Auth);
                                      }}
                                    />
                                  </View>
                                </View>
                              </View>
                            )}
                          </View>
                        );
                      })}
                    </>
                  );
                })}
              </View>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </CSafeAreaView>
  );
};

export default TestCard;

const localStyles = StyleSheet.create({
  courseContainer: {
    ...styles.mb20,
    width: '100%',
    ...styles.p10,
    ...styles.selfCenter,
    borderRadius: 5,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  cardImage: {
    height: 80,
    borderRadius: 5,
    width: 110,
    resizeMode: 'contain',
    backgroundColor: '#d3d3d3',
  },
  ratingDetail: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
  submitButton: {
    width: 50,
    padding: 5,
  },
});
