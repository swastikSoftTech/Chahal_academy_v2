import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {colors, styles} from '../../../themes';
import {useSelector} from 'react-redux';
import {
  Montserrat_Medium,
  deviceHeight,
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
  noDataImage,
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
import * as IMAGE from '../../../assets/images/indexnew';
import FullScreenLoading from '../../../components/common/FullScreenLoading';

export default function ShowSubTextModules() {
  const navigation = useNavigation();
  const route = useRoute();
  console.log('rout----', route?.params);
  const [list, setList] = useState([]);
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
        console.log('-----------', JSON.stringify(res));
        setList(res.message);
        return;
      })
      .finally(() => setIsLoading(false));
  };

  const maxAttemptValue = (submodule, module) => {
    console.log('for Max attempt value', submodule, module);
    if (submodule == null && module > 0) {
      console.log('maxAttemptValue1', module);
      return parseInt(module, 10);
    } else {
      console.log('maxAttemptValue', submodule);
      return parseInt(submodule, 10);
    }
  };
  return (
    <CSafeAreaView style={localStyles.root}>
      <FullScreenLoading isLoading={isLoading} />
      <CHeader
        title={route?.params?.name}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      {!isLoading && list.length == 0 ? (
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
        <>
          <FlatList
            data={list}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => {
              // console.log('data test----', JSON.stringify(item))
              console.log('item>>', item);
              return (
                <View style={{padding: 10}}>
                  <View
                    style={{
                      padding: 10,
                      width: '100%',
                      backgroundColor: 'white',
                      elevation: 10,
                      marginTop: 10,
                      borderRadius: 10,
                      top: -10,
                      shadowOffset: {
                        width: 10,
                        height: 10,
                      },
                      shadowOpacity: 20,
                      shadowRadius: 10,
                    }}>
                    {item.image == '' ? (
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
                        source={{uri: item.image}}
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
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
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
                        {item.name}
                      </Text>
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
                          style={{height: 13, width: 13, tintColor: '#454545'}}
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
                          {maxAttemptValue(
                            item?.attempts,
                            item?.module1?.attempts,
                          ) + ' '}
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
                        Nagative Questions :{' '}
                        {item.module1?.negative_marks + ' '}
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
                        {maxAttemptValue(
                          item?.attempts,
                          item?.module1?.attempts,
                        ) + ' '}
                      </Text>
                    </View>

                    <View style={{marginTop: 15}}>
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
                        <View>
                          <CButton
                            title="Start Test"
                            style={{width: '100%', textAlign: 'center'}}
                            onPress={() => {
                              console.log('item.id', item.id);
                              navigation.replace(StackNav.StartTest, {
                                qId: item?.id,
                                name: item.name,
                                duration: item?.module1?.duration,
                                attempt: item?.test_result?.attempt,
                                type: item?.fk_test_type_id,
                              });
                            }}
                          />
                          <View style={{marginTop: 10}}>
                            {item?.test_result?.attempt > 0 && (
                              <CButton
                                title="Results"
                                style={{width: 70, textAlign: 'center'}}
                                onPress={() => {
                                  navigation.navigate(StackNav.Results, {
                                    qId: item?.test_result?.fk_sub_module_id,
                                    attempt: item?.test_result?.attempt,
                                    type: item?.fk_test_type_id,
                                  });
                                }}
                              />
                            )}
                          </View>
                        </View>
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
                    </View>

                    {/* <View style={{ marginLeft: 8, rowGap: 5 }}>

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
                                                                    // navigation.replace(StackNav.ShowTestModule, {
                                                                    //     qId: item.id,
                                                                    // });

                                                                }}
                                                            />
                                                        ) : (
                                                            <CButton
                                                                title="Start Test"
                                                                style={{ width: 80, textAlign: 'center' }}
                                                                onPress={() => {
                                                                    navigation.replace(StackNav.StartTest, {
                                                                        qId: item.id,
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
          />
        </>
      )}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  courseContainer: {
    ...styles.mb20,
    width: deviceWidth - moderateScale(40),
    ...styles.p15,
    ...styles.selfCenter,
    borderRadius: moderateScale(16),
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
