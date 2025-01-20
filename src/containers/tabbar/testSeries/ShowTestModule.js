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
import {colors, styles} from '../../../themes';
import {useSelector} from 'react-redux';
import {
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

export default function ShowTestModule() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('route?.params?.id', route?.params);
  const [list, setList] = useState([]);
  const [analystData, setAnaystData] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTests();
  }, []);

  const getTests = async () => {
    customRequest(
      `student/test-series/course/submodule/${route?.params?.qId}`,
      'GET',
    )
      .then(res => {
        //console.log('responseAuth modules----', JSON.stringify(res));
        setList(res.message);
        setAnaystData(res.analytics);
        return;
      })
      .finally(() => setIsLoading(false));
  };
  const maxAttemptValue = (submodule, module) => {
    // console.log('for Max attempt value', submodule, module);
    if (submodule == null && module > 0) {
      //console.log('maxAttemptValue1', module);
      return parseInt(module, 10);
    } else {
      //console.log('maxAttemptValue', submodule);
      return parseInt(submodule, 10);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getTests();
    setRefreshing(false);
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <FullScreenLoading isLoading={isLoading} />
      <CHeader
        // title = 'hello'
        title={route?.params?.name}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <FlatList
        data={list}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          console.log('items--12', JSON.stringify(item));
          return (
            <View style={{padding: 10, marginTop: -12}}>
              {index == 0 && (
                <>
                  {analystData?.map(itx => {
                    return (
                      <View style={{marginBottom: 10}}>
                        <TouchableOpacity
                          onPress={() => {
                            console.log('ii--', JSON.stringify(itx));
                            setIsShown(true);
                          }}
                          style={{
                            width: 100,
                            backgroundColor: 'white',
                            borderWidth: 1,
                            borderColor: '#d3d3d3',
                            borderRadius: 5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            padding: 5,
                            height: 35,
                            alignItems: 'center',
                          }}>
                          <LinearGradient
                            colors={['#d418a0', '#ec3a7c', '#ffcc00']}
                            style={{
                              height: 35,
                              width: 100,
                              position: 'absolute',
                              borderRadius: 5,
                            }}
                            start={{x: 0.5, y: 0}}
                            end={{x: 0, y: 0.5}}
                          />
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
                              Analytics
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
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </>
              )}
              <View
                style={[
                  localStyles.courseContainer,
                  {
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    elevation: 5,
                    shadowOffset: {width: 3, height: 3},
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    padding: 15,
                  },
                ]}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
                      top: 3,
                    }}>
                    {item.name}
                  </Text>
                </View>
                {item.image == '' ? (
                  <Image
                    resizeMode="contain"
                    source={require('../../../assets/images/test.png')}
                    style={{
                      width: '100%',
                      height: 120,
                      borderRadius: 5,
                      marginTop: 5,
                      backgroundColor: '#d3d3d3',
                    }}
                  />
                ) : (
                  <Image
                    resizeMode="contain"
                    source={{uri: item.image}}
                    style={{
                      width: '100%',
                      height: 150,
                      borderRadius: 5,
                      marginTop: 5,
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
                        top: -2,
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
                      Duration : {item?.module1?.duration} mins
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
                        top: -2,
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
                      {item?.test_result?.attempt == null
                        ? 0 + ' '
                        : item?.module1?.attempt + ' '}
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
                        top: -2,
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
                      Questions : {item?.qst_count}
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
                        top: -2,
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
                      Marks : {item?.qst_count}
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
                    Nagative Questions : {item.module1?.negative_marks + ' '}
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
                    style={{height: 13, width: 13, tintColor: '#fa826a'}}
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
                    {maxAttemptValue(item?.attempts, item?.module1?.attempts) +
                      ' '}
                  </Text>
                </View>

                <View
                  style={[
                    styles.rowSpaceBetween,
                    {
                      marginTop: 5,
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    },
                  ]}>
                  {item?.test_structure?.name === 'Folder' ? (
                    <CButton
                      title="Show Test"
                      style={{width: '100%', textAlign: 'center'}}
                      onPress={() => {
                        navigation.replace(StackNav.ShowSubTextModules, {
                          qId: item.id,
                          name: item.name,
                        });
                      }}
                    />
                  ) : (
                    <CButton
                      title="Start Test"
                      style={{width: '100%', textAlign: 'center'}}
                      onPress={() => {
                        console.log('item.id', item.id);
                        navigation.replace(StackNav.StartTest, {
                          qId: item?.id,
                          name: item.name,
                        });
                      }}
                    />
                  )}
                </View>

                {/* {item.image == null ? (
                                    <Image
                                        source={require('../../../assets/images/test.png')}
                                        style={localStyles.cardImage}
                                    />
                                ) : (
                                    <Image
                                        source={{ uri: item.image }}
                                        style={localStyles.cardImage}
                                    />
                                )}
                                <View style={{ marginLeft: 8, rowGap: 5 }}>
                                    <CText
                                        type={'m16'}
                                        numberOfLines={1}
                                        style={{ fontWeight: 'bold' }}>
                                        {item.name}
                                    </CText>
                                    <View>

                                        <View
                                            style={[
                                                styles.rowSpaceBetween,
                                                { width: moderateScale(180) },
                                            ]}>
                                            <CText
                                                type={'m12'}
                                                numberOfLines={1}
                                                color={colors.gray}>
                                                {item?.qst_count} Questions
                                            </CText>
                                            <View style={[styles.rowStart, { columnGap: 5 }]}>
                                                <Watch
                                                    width={15}
                                                    height={15}
                                                    style={{ alignSelf: 'center' }}
                                                />
                                                <CText
                                                    type={'m12'}
                                                    numberOfLines={1}
                                                    color={colors.gray}>
                                                    {item?.module1?.duration} mins
                                                </CText>
                                            </View>

                                        </View>
                                        <View style={styles.rowSpaceBetween}>
                                            <CText
                                                type={'m12'}
                                                numberOfLines={1}
                                                color={colors.gray}>
                                                {item.module1?.total_marks} Marks
                                            </CText>
                                            <CText
                                                type={'m12'}
                                                numberOfLines={1}
                                                color={colors.warning}>
                                                {item.module1?.negative_marks + ' '}
                                                Negative Mark
                                            </CText>
                                        </View>
                                        <View style={styles.rowSpaceBetween}>
                                            <CText
                                                type={'m12'}
                                                numberOfLines={1}
                                                color={'red'}>
                                                {maxAttemptValue(
                                                    item?.attempts,
                                                    item?.module1?.attempts,
                                                ) + ' '}
                                                max attempts
                                            </CText>
                                            <CText type={'m12'} numberOfLines={1}>
                                                {item?.test_result?.attempt == null
                                                    ? 0 + ' '
                                                    : item?.module1?.attempt + ' '}
                                                attempts taken
                                            </CText>
                                        </View>


                                        <View style={[styles.rowSpaceBetween, { marginTop: 5 }]}>
                                            {
                                                item?.test_structure?.name === 'Folder' ? (
                                                    <CButton
                                                        title="Show Test"
                                                        style={{ width: 80, textAlign: 'center' }}
                                                        onPress={() => {
                                                            navigation.replace(StackNav.ShowSubTextModules, {
                                                                qId: item.id,
                                                                name: item.name,
                                                            });

                                                        }}
                                                    />
                                                ) : (
                                                    <CButton
                                                        title="Start Test"
                                                        style={{ width: 80, textAlign: 'center' }}
                                                        onPress={() => {
                                                            navigation.replace(StackNav.StartTest, {
                                                                qId: item.id,
                                                                name: item.name,
                                                            });
                                                        }}
                                                    />
                                                )
                                            }
                                        </View>

                                    </View>

                                </View> */}
              </View>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <>
        <Modal transparent={true} visible={isShown}>
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
              {analystData?.map(item => {
                //console.log('item--', item)
                return (
                  <View>
                    <View style={{paddingHorizontal: 10, top: 10}}>
                      <View>
                        <Image
                          style={{width: 50, height: 50, alignSelf: 'center'}}
                          source={require('../../../assets/images/analyst.png')}
                        />
                        <TouchableOpacity
                          onPress={() => {
                            setIsShown(false);
                          }}
                          style={{position: 'absolute', right: -5, top: -10}}>
                          <Image
                            style={{width: 25, height: 25}}
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

                        <View style={{flexDirection: 'row', marginTop: 10}}>
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
                            {item.avg}.00 %
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
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
                            {item.total_attempt}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row'}}>
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
                            {item.total_incorrect}
                          </Text>
                        </View>
                        <View style={{flexDirection: 'row', marginBottom: 10}}>
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
                              item.avg < 50
                                ? {
                                    color: 'red',
                                    fontWeight: 'bold',
                                    marginTop: 8,
                                    fontSize: 15,
                                    marginLeft: 5,
                                    marginRight: 50,
                                  }
                                : {
                                    color: 'green',
                                    fontWeight: 'bold',
                                    marginTop: 8,
                                    fontSize: 15,
                                    marginLeft: 5,
                                    marginRight: 50,
                                  }
                            }>
                            {item.message}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            setIsShown(false);
                          }}
                          style={{
                            width: '50%',
                            height: 35,
                            zIndex: 1000,
                            right: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 20,
                            marginTop: 15,
                          }}>
                          <LinearGradient
                            colors={['#ec3a7c', '#ff942d']}
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
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </Modal>
      </>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  courseContainer: {
    ...styles.mb20,
    width: '100%',
    ...styles.p10,
    ...styles.selfCenter,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: 'white',
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  cardImage: {
    height: getHeight(90),
    borderRadius: moderateScale(12),
    width: getWidth(96),
    resizeMode: 'contain',
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
