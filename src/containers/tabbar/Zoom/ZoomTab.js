import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import RNRestart from 'react-native-restart';
import ZoomUs from 'react-native-zoom-us';
import {useSelector} from 'react-redux';
import axios from '../../../api/axios';
import {customRequest} from '../../../api/customRequest';
import * as IMAGE from '../../../assets/images/indexnew';
import {
  Montserrat_Medium,
  deviceHeight,
  deviceWidth,
  getWidth,
  noDataImage,
} from '../../../common/constants';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import Header from '../../../components/common/header/Header';
import {styles} from '../../../themes';

export default function ZoomTab() {
  const isFocused = useIsFocused();
  const userDetails = useSelector(state => state.USER_SLICE);
  const colors = useSelector(state => state.theme.theme);
  const [list, setList] = useState([]);
  const [token, setToken] = useState('');
  const [loader, setLoader] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [name, setName] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, [isFocused]);

  useEffect(() => {
    const listener = ZoomUs.onMeetingStatusChange(async ({event}) => {
      console.log('onMeetingStatusChange', event);
      if (event == 'MEETING_STATUS_DISCONNECTING') {
        RNRestart.restart();
      }
    });
    const joinListener = ZoomUs.onMeetingJoined(() => {
      console.log('onMeetingJoined');
    });

    return () => {
      listener.remove();
      joinListener.remove();
    };
  }, []);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      const user = await AsyncStorage.getItem('user');
      setName(JSON.parse(user));
      setAuthenticated(true);
      getMeetingData();
    } else if (response?.message == 'Unauthenticated.') {
      setAuthenticated(false);
      await AsyncStorage.removeItem('tokenStudent');
      setLoader(false);
    }
  };

  const initializeZoom = async (token, meetingNumber, id) => {
    try {
      const isZoomIntialized = await ZoomUs.isInitialized();
      console.log('isZoomIntialized >>', isZoomIntialized);

      if (!isZoomIntialized) {
        await ZoomUs.initialize({
          jwtToken: token,
        })
          .then(res => {
            console.log('res >>', res);
          })
          .catch(err => console.log('err >>', err));
      }
      getMeetingId(meetingNumber, id);
    } catch (error) {
      console.error('Error initializing Zoom:', error);
    }
  };

  const startMeeting = async (meetingId, pass) => {
    console.log('Start Meeting', meetingId, pass, token, name);
    try {
      const startMeetingResult = await ZoomUs.joinMeeting({
        userName: name,
        meetingNumber: meetingId,
        password: pass,
        // zoomAccessToken: token,
        // noMeetingErrorMessage: true,
        autoConnectAudio: true,
        noInvite: true,

        //noTitlebar: true,
        //noTextMeetingId: true,
        //noTextPassword: true,
      });
      setLoader(false);
      // const startMeetingResult = await ZoomUs.joinMeetingWithPassword(
      //   name,
      //   meetingId,
      //   pass,
      // );
      console.log('startMeetingResult >>', startMeetingResult);
    } catch (e) {
      Alert.alert('Error', 'Could not execute startMeeting');
      console.error('ERR', e);
    }
  };

  const getMeetingData = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    setToken(token);
    console.log('token--', token);
    let formBody = [];

    formBody = formBody.join('&');
    await fetch('https://lmscodenew.chahalacademy.com/api/student-liveclass', {
      method: 'GET',
      body: formBody,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    }).then(result => {
      result.json().then(response => {
        try {
          console.log('response >>', JSON.stringify(response));
          if (response?.message === 'Unauthenticated.') {
            setAuthenticated(false);
          } else {
            console.log('Classresponse', response);
            setLoader(false);
            // setResponseData(response);
            const course = response[0]?.map(e => e.course).flat();
            console.log(course, 'courseResponse');
            const coursesWithLiveClass = course.filter(
              e => e.course_relation_liveclass.length > 0,
            );
            console.log(coursesWithLiveClass, 'filter');
            const coursebatchrelation = coursesWithLiveClass
              ?.map(e => {
                //  console.log(e,"ee")
                const cname = e.name;
                const coursebatchrelation = [];
                e?.course_relation_liveclass?.map(r => {
                  // console.log(r,"rrr")
                  coursebatchrelation?.push(Object.assign(r, {cname: cname}));
                });
                return coursebatchrelation;
              })
              .flat();
            console.log(coursebatchrelation, 'course batch');
            const batch_detail_relation = coursebatchrelation
              ?.map(e => {
                //  console.log(e,"eee")
                const cname = e.cname;
                const batch_detail_relation = [];
                e?.livevideocourserelation?.map(r => {
                  // console.log(r,"rrr")
                  batch_detail_relation.push(Object.assign(r, {cname: cname}));
                });
                return batch_detail_relation;
              })
              .flat();
            console.log(batch_detail_relation, 'course batch relation');
            const batch_relation = batch_detail_relation
              ?.map(e => {
                // console.log(e,"eee")

                const cname = e.cname;
                const batch_relation = [];
                e?.liveclassvideo?.map(r => {
                  batch_relation.push(Object.assign(r, {cname: cname}));
                });
                console.log(batch_relation, 'batch');
                return batch_relation;
              })
              .flat();
            console.log('batch_relation >>', batch_relation);

            setList(() => batch_relation);

            setAuthenticated(true);
          }
        } catch (error) {
        } finally {
          setLoader(false);
        }
        //
      });
    });
  };
  console.log('loader >>', loader);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    setRefreshing(false);
  };

  const getMeetingId = async (meetingNumber, id) => {
    try {
      let token = await AsyncStorage.getItem('tokenStudent');
      setToken(token);
      console.log('token--', token);
      console.log('id >>>>>>>>>>>>>.', id, meetingNumber);

      const joinClassRes = await axios.get(
        `https://lmscodenew.chahalacademy.com/api/student-liveclass-join/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      );
      console.log('joinClassRes >>', JSON.stringify(joinClassRes.data));
      let ids = joinClassRes?.data?.meeting_id;
      let pass = joinClassRes?.data?.password;
      startMeeting(ids, pass);
      // await fetch(
      //   'https://lmscode.chahalacademy.com/api/student-liveclass-join/' + id,
      //   {
      //     method: 'GET',
      //     body: formBody,
      //     headers: {
      //       'Content-Type': 'application/json',
      //       accept: 'application/json',
      //       Authorization: 'Bearer ' + token,
      //     },
      //   },
      // )
      //   .then(async result => {
      //     let text =  result.status;
      //     console.log('text >>', text);
      //     // result.json().then(response => {
      //     //   console.log('response >>', response);
      //     //   let ids = response.meeting_id;
      //     //   let pass = response.password;
      //     //   startMeeting(ids, pass);
      //     //   // catch (error) {
      //     //   //   console.log('error', error);
      //     //   // }
      //     //   //
      //     // });
      //   })
      //   .catch(err => {
      //   });
    } catch (err) {
      console.log('err >>', err);
    }
  };

  const generateJWTToken = async (meetingNumber, id) => {
    try {
      setLoader(true);
      // let dataToSend = {
      //   meetingNumber: id,
      // };
      // let formBody = [];
      // for (let key in dataToSend) {
      //   let encodedKey = encodeURIComponent(key);
      //   let encodedValue = encodeURIComponent(dataToSend[key]);
      //   formBody.push(encodedKey + '=' + encodedValue);
      // }
      // formBody = formBody.join('&');
      // console.log('formBody >>', formBody);
      const payload = {
        meetingNumber: meetingNumber,
      };
      console.log('payload >>', payload);
      // const result = await fetch('http://school.studiorinternational.in/jwt', {
      //   method: 'POST',
      //   body: payload,
      // });
      const resultAxios = await axios.post(
        'http://school.studiorinternational.in/jwt',
        payload,
      );
      console.log('resultAxios >>', resultAxios.data);
      if (resultAxios.status === 200) {
        initializeZoom(resultAxios.data.signature, meetingNumber, id);
      }
      // const result = await fetch(
      //   `https://zoomservice.chahalacademy.com/api/zoom/get/sdk/${meetingNumber}`,
      // );
      // console.log('responseText >>>>>>>>>>>', JSON.parse(responseText));
      // const data = await result.json();
      // console.log('data >>', JSON.stringify(data));
      // console.log('token >>', token);
      // initializeZoom(id, data);
      // .then(result => {
      //   console.log('result >>', result);
      //   result
      //     .json()
      //     .then(response => {
      //       console.log('response------', response);
      //       try {
      //         let token = response.signature;
      //         initializeZoom(token, id);
      //       } catch (error) {
      //         console.log('error to genertae');
      //       }
      //     })
      //     .catch(err => {
      //       console.log('errrrrrr >>>', err);
      //     });
      // })
      // .catch(err => {
      //   console.log('err >>>>>>>>', err);
      // });
    } catch (err) {
      console.log('err >>', err);
      setLoader(false);
    }
  };
  function onPressJoin(meeting_url) {
    Linking.openURL(meeting_url);
  }

  return (
    <CSafeAreaView style={styles.flex}>
      <FullScreenLoading isLoading={loader} />

      {authenticated ? (
        <View style={{flex: 1}}>
          {/* {loader && <CLoader />} */}

          <Header title={'Live Classes'} hideBack showMenu />
          <View style={{flex: 1}}>
            {list?.length == 0 ? (
              <Image
                source={{uri: noDataImage}}
                style={{
                  width: deviceWidth,
                  height: deviceHeight / 2,
                  alignSelf: 'center',
                  marginTop: '35.5%',
                  marginHorizontal: 10,
                }}
              />
            ) : (
              <FlatList
                data={list}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                keyExtractor={(index, item) => String(index)}
                renderItem={({item: mainItem, index}) => {
                  return (
                    <View
                      key={`${index}${mainItem.id}`}
                      style={{
                        // width: '100%',
                        backgroundColor: 'white',
                        //backgroundColor: colors.inputBg,
                        elevation: 2,
                        marginTop: index === 0 ? 10 : 0,
                        borderRadius: 10,
                        padding: 10,
                        flexDirection: 'row',
                        marginHorizontal: 10,
                        marginBottom: 12,
                      }}>
                      <View>
                        <Image
                          source={{
                            uri: 'https://img.freepik.com/premium-vector/group-video-call-showing-several-users-connected-time-illustration_670326-32.jpg?w=740',
                          }}
                          style={{
                            width: 110,
                            height: 90,
                            borderRadius: 5,
                          }}
                        />
                      </View>

                      <View
                        style={{
                          marginLeft: 7,
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontFamily: Montserrat_Medium,
                            color: 'black',
                            flex: 1,
                          }}>
                          Class - {mainItem.title}
                          {/* <Text
                            style={{
                              fontSize: 15,
                              fontFamily: Montserrat_Medium,
                              color: 'black',
                            }}>
                            {' '}
                            {mainItem.title}
                          </Text> */}
                        </Text>
                        <Text
                          type={'r14'}
                          style={{
                            fontFamily: Montserrat_Medium,
                            letterSpacing: 0.5,
                            fontSize: 12,
                            color: '#454545',
                          }}>
                          Time :
                          <Text
                            style={{
                              fontFamily: Montserrat_Medium,
                              letterSpacing: 1,
                              color: '#454545',
                            }}>
                            {''} {mainItem?.start.split(' ')[1]}
                          </Text>
                        </Text>
                        <Text
                          type={'r14'}
                          style={{
                            fontFamily: Montserrat_Medium,
                            letterSpacing: 0.5,
                            fontSize: 12,
                            color: '#454545',
                          }}>
                          Date :
                          <Text
                            style={{
                              fontFamily: Montserrat_Medium,
                              letterSpacing: 0.5,
                              fontSize: 12,
                              color: '#454545',
                            }}>
                            {''}{' '}
                            {moment(mainItem?.start.split(' ')[0]).format(
                              'DD-MM-YYYY',
                            )}
                          </Text>
                        </Text>
                        <TouchableOpacity
                          onPress={
                            () => onPressJoin(mainItem.meeting_url)
                            // generateJWTToken(mainItem.meeting_id, mainItem.id)
                          }
                          style={{
                            marginTop: 10,
                            backgroundColor: '#4b51e8',
                            paddingHorizontal: 0,
                            width: 100,
                            borderRadius: 8,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}>
                          <Image
                            style={{width: 15, height: 15, tintColor: 'white'}}
                            source={IMAGE.JOIN}
                          />
                          <Text
                            style={{
                              color: 'white',
                              fontFamily: Montserrat_Medium,
                              top: 2,
                              paddingVertical: 3,
                              textAlign: 'center',
                              fontSize: 13,
                            }}>
                            Join
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  );
                }}
              />
              // <ScrollView
              //   showsVerticalScrollIndicator={false}
              //   style={{}}
              //   refreshControl={
              //     <RefreshControl
              //       refreshing={refreshing}
              //       onRefresh={onRefresh}
              //     />
              //   }>
              //   {list?.map((mainItem, index) => {
              //     return (
              //       <View
              //         key={index}
              //         style={{
              //           width: '100%',
              //           backgroundColor: 'white',
              //           //backgroundColor: colors.inputBg,
              //           elevation: 10,
              //           marginTop: 10,
              //           borderRadius: 10,
              //           padding: 10,
              //           flexDirection: 'row',
              //           marginHorizontal: 10,
              //         }}>
              //         <View>
              //           <Image
              //             source={{
              //               uri: 'https://img.freepik.com/premium-vector/group-video-call-showing-several-users-connected-time-illustration_670326-32.jpg?w=740',
              //             }}
              //             style={{
              //               width: 110,
              //               height: 90,
              //               borderRadius: 5,
              //             }}
              //           />
              //         </View>

              //         <View
              //           style={{
              //             marginLeft: 7,
              //           }}>
              //           <Text
              //             style={{
              //               fontSize: 15,
              //               fontFamily: Montserrat_Medium,
              //               color: 'black',
              //             }}>
              //             Class -
              //             <Text
              //               style={{
              //                 fontSize: 15,
              //                 fontFamily: Montserrat_Medium,
              //                 color: 'black',
              //               }}>
              //               {' '}
              //               {mainItem.title}
              //             </Text>
              //           </Text>
              //           <Text
              //             type={'r14'}
              //             style={{
              //               fontFamily: Montserrat_Medium,
              //               letterSpacing: 0.5,
              //               fontSize: 12,
              //               color: '#454545',
              //             }}>
              //             Time :
              //             <Text
              //               style={{
              //                 fontFamily: Montserrat_Medium,
              //                 letterSpacing: 1,
              //                 color: '#454545',
              //               }}>
              //               {''} {mainItem?.start.split(' ')[1]}
              //             </Text>
              //           </Text>
              //           <Text
              //             type={'r14'}
              //             style={{
              //               fontFamily: Montserrat_Medium,
              //               letterSpacing: 0.5,
              //               fontSize: 12,
              //               color: '#454545',
              //             }}>
              //             Date :
              //             <Text
              //               style={{
              //                 fontFamily: Montserrat_Medium,
              //                 letterSpacing: 0.5,
              //                 fontSize: 12,
              //                 color: '#454545',
              //               }}>
              //               {''}{' '}
              //               {moment(mainItem?.start.split(' ')[0]).format(
              //                 'DD-MM-YYYY',
              //               )}
              //             </Text>
              //           </Text>
              //           <TouchableOpacity
              //             onPress={() => {
              //               setLoader(true);
              //               let id = mainItem.id;
              //               console.log('iss--->', id);
              //               generateJWTToken(id);
              //             }}
              //             style={{
              //               marginTop: 10,
              //               backgroundColor: '#4b51e8',
              //               paddingHorizontal: 0,
              //               width: 100,
              //               borderRadius: 8,
              //               justifyContent: 'center',
              //               alignItems: 'center',
              //               flexDirection: 'row',
              //             }}>
              //             <Image
              //               style={{width: 15, height: 15, tintColor: 'white'}}
              //               source={IMAGE.JOIN}
              //             />
              //             <Text
              //               style={{
              //                 color: 'white',
              //                 fontFamily: Montserrat_Medium,
              //                 top: 2,
              //                 paddingVertical: 3,
              //                 textAlign: 'center',
              //                 fontSize: 13,
              //               }}>
              //               Join
              //             </Text>
              //           </TouchableOpacity>
              //         </View>
              //       </View>
              //     );
              //   })}
              // </ScrollView>
            )}
          </View>
        </View>
      ) : (
        <View>
          <Header title={'Live Classes'} hideBack showMenu showLogin />
          <LottieView
            source={require('../../../assets/lottie/login.json')}
            autoPlay
            loop
            style={{
              width: getWidth(350),
              height: getWidth(350),
              alignSelf: 'center',
              marginTop: '40%',
            }}
          />
        </View>
      )}
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customViewer: {
    width: '100%',
    flex: 1,
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
