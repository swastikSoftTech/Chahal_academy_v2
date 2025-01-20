import {Picker} from '@react-native-picker/picker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import {customRequest} from '../../../api/customRequest';
import * as IMAGE from '../../../assets/images/indexnew';
import {
  Montserrat_Medium,
  getHeight,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CText from '../../../components/common/CText';
import LoginButton from '../../../components/common/LoginButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import {styles} from '../../../themes';
import {logoutUser} from '../../../utils/commonFunction';
const TargetTab = () => {
  const pickerRef = useRef(null);
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.USER_SLICE);

  const [targetCourse, setTargetCourse] = useState('');
  const [examPdf, setExamPdf] = useState('');
  const [targetCourseWOL, setTargetCourseWOL] = useState('');
  const [courseNameWOL, setCourseNameWOL] = useState('');
  const [targetAlert, setTargetAlert] = useState([]);
  const [targetData, setTargetData] = useState([]);
  const [index, setIndex] = useState(null);
  const [date, setDate] = useState(new Date());
  const [maxDate, setMaxDate] = useState(moment().add(2, 'years')._d);
  const [newDate, setNewDate] = useState('');
  const [formated, setFormated] = useState('');
  // const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [open, setOpen] = useState(false);
  const [reset, setReset] = useState(false);
  const [showC, setShowC] = useState(false);
  // const [showPdfDownload, setShowPdfDownload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);
  const [checkLogin, setCheckLogin] = useState('');
  const colors = useSelector(state => state.theme.theme);
  const today = moment(new Date()).format('YYYY-MM-DD');
  console.log('index', index);

  useEffect(() => {
    let cDate = moment(date).format('YYYY-MM-DD');
    setNewDate(cDate);
    // console.log('new Date', newDate);
  }, [date, newDate]);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response.message == 'authenticated') {
      // setAuthenticated(true);
    } else if (response.message == 'Unauthenticated.') {
      logoutUser();
    }
  };

  const alertData = async () => {
    const response = await customRequest(
      'student/notification/exam-alert',
      'GET',
    );
    console.log('ResponseData', response);
    setTargetData(response);
    setShowC(true);
    setShowC(false);
    setReset(false);
  };

  const alertRequest = async () => {
    const response = await customRequest(
      'student/list-student/exam-alert',
      'GET',
    );
    console.log('Alert:::', response);
    if (response?.length > 0) {
      // console.log('Get Response', response);
      setTargetAlert(response);
    } else {
      setCheckLogin(response.message);
    }
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      alertData();
      alertRequest();
    }
  }, [isFocused, checkLogin]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    alertData();
    alertRequest();
    setTargetCourse('');
    setCourseNameWOL('');
    setRefreshing(false);
  };

  // console.log('targetAlertbefore api', targetAlert[index]);

  // Api call To customise alert date
  const creatAlert = async id => {
    console.log(
      'TargetDate',
      targetAlert[index]?.date,
      'newDate',
      newDate,
      'today',
      today,
    );
    if (newDate == today) {
      const response = await customRequest(
        'student/notification/exam-alert/create',
        'POST',
        {
          courseId: id,
          date: '',
        },
      );
      // console.log('Alert Create response12345566', response);
      alertData();
      setFormated('');
      setShowC(false);
      setReset(false);
      setTargetCourse('');
      setDate(new Date());
      setIndex(null);
    } else if (newDate < today || newDate > targetAlert[index]?.date) {
      Alert.alert('Correct your customise Date');
      return;
    } else {
      console.log(
        'formatedBefore',
        formated,
        'newDate',
        newDate,
        'today',
        today,
      );

      const response = await customRequest(
        'student/notification/exam-alert/create',
        'POST',
        {
          courseId: id,
          date: newDate,
        },
      );
      // console.log('Alert Create response12345566', response);
      alertData();
      setFormated('');
      setShowC(false);
      setReset(false);
      setTargetCourse('');
      setDate(new Date());
      setIndex(null);
    }
  };

  // Api call To reset customise alert date
  const resetApi = async () => {
    const response = await customRequest(
      'student/notification/exam-alert/reset',
      'PUT',
    );
    // console.log('Alert Create response12345566', response);
    alertData();
    setFormated('');
  };

  const PdfList = async () => {
    await customRequest(
      `student/exam-alert-student/pdf/${examPdf}`,
      'GET',
    ).then(res => {
      // console.log('invoicepsf', res);
      setModalData(res);
    });
  };

  const getExtention = filename => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  const downloadPdf = (link, name) => {
    let pdf_URL = link;
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
        description: 'pdf',
      },
    };
    config(options)
      .fetch('GET', pdf_URL)
      .then(res => {
        console.log('res -> ', res);
        ToastAndroid.show('File downloaded', ToastAndroid.LONG);
      });
  };

  return (
    <CSafeAreaView style={{flex: 1}}>
      {userDetails?.isUserLoggedIn ? (
        <View>
          <CHeader
            title={'Exam Alert'}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {/* <TouchableOpacity
              style={{
                padding: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              onPress={() => setShowPdfDownload(!showPdfDownload)}>
              <CText
                type={'B14'}
                align={'center'}
                style={[localStyles.button, { width: getWidth(357) }]}
                color={colors.textSpecial}>
                {showPdfDownload ? 'minimize' : 'Download Exam PDF'}
              </CText>
            </TouchableOpacity>
            {showPdfDownload && (
              <View
                style={{
                  marginHorizontal: 10,
                  flexDirection: 'row',
                  marginTop: -15,
                }}>
                <View
                  style={{
                    overflow: 'hidden',
                    alignItems: 'center',
                    marginTop: 20,
                    height: 50,
                    borderRadius: 40,
                    elevation: 4,
                    width: getWidth(250),
                  }}>
                  <Picker
                    type={'S16'}
                    color={colors.primary}
                    style={[
                      localStyles.btnContainerStyle,
                      {
                        backgroundColor: '#F8F9FA',
                        width: getWidth(250),
                        height: 40,
                      },
                    ]}
                    selectedValue={examPdf}
                    onValueChange={(itemValue, itemIndex) => {
                      setExamPdf(itemValue);
                      setIndex(itemIndex - 1);
                    }}>
                    <Picker.Item
                      label="Select Exam"
                      value=""
                      style={{ color: 'black' }}
                    />
                    {targetAlert.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={item.name}
                          value={item.id}
                        />
                      );
                    })}
                  </Picker>
                </View>
                <TouchableOpacity
                  style={{
                    padding: 10,
                  }}
                  onPress={() => {
                    PdfList(), setOpenModal(true);
                  }}>
                  <CText
                    type={'B14'}
                    align={'center'}
                    style={[localStyles.button, { width: getWidth(100) }]}
                    color={colors.textSpecial}>
                    Get PDF
                  </CText>
                </TouchableOpacity>
              </View>
            )}
            <View style={localStyles.centeredView}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={openModal}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setOpenModal(!openModal);
                }}>
                <View style={localStyles.centeredView}>
                  <View style={localStyles.modalView}>
                    {modalData.length > 0 ? (
                      modalData?.map((item, index) => {
                        return (
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              width: '70%',
                              marginBottom: 10,
                            }}>
                            <CText type={'r16'}>{item.name}</CText>
                            <TouchableOpacity
                              onPress={() =>
                                downloadPdf(item?.file, item?.name)
                              }>
                              <Download width={25} height={25} />
                            </TouchableOpacity>
                          </View>
                        );
                      })
                    ) : (
                      <CText type={'r18'}>No pdf Available</CText>
                    )}
                    <CButton
                      title={'close'}
                      containerStyle={localStyles.submitButton}
                      type={'M18'}
                      color={colors.white}
                      onPress={() => {
                        setOpenModal(false), setExamPdf('');
                        setShowPdfDownload(false);
                      }}
                    />
                  </View>
                </View>
              </Modal>
            </View> */}

            <View style={{padding: 10, paddingBottom: 80}}>
              <View
                style={{
                  width: '100%',
                  elevation: 5,
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 5,
                }}>
                {targetData?.userDate ? (
                  <View style={{width: '100%', alignItems: 'center'}}>
                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Image
                        style={{width: 18, height: 18, tintColor: 'black'}}
                        source={IMAGE.EXAM}
                      />
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 19,
                          marginLeft: 0,
                          fontFamily: Montserrat_Medium,
                          letterSpacing: 0.5,
                        }}>
                        {' '}
                        {targetData?.examDate?.name || ''}
                      </Text>
                    </View>

                    <View
                      style={{
                        width: '100%',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginTop: 10,
                      }}>
                      <Image
                        style={{width: 18, height: 18, tintColor: 'black'}}
                        source={IMAGE.CALENDER}
                      />
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 15,
                          marginLeft: 5,
                          fontFamily: Montserrat_Medium,
                          letterSpacing: 0.5,
                        }}>
                        {' '}
                        Exam-Date :{' '}
                        <Text style={{color: 'black'}}>
                          {targetData?.examDate?.date}
                        </Text>
                      </Text>
                    </View>
                  </View>
                ) : null}

                {targetData?.userDate ? (
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: 20,
                        marginLeft: -20,
                      }}>
                      {targetData?.userDate && (
                        <LottieView
                          source={require('../../../assets/lottie/clock.json')}
                          autoPlay // Start playing automatically
                          loop // Repeat the animation
                          style={{width: 60, height: 60, alignSelf: 'center'}} // Adjust dimensions as needed
                        />
                      )}

                      <Text
                        style={{
                          fontFamily: Montserrat_Medium,
                          fontSize: 40,
                          color: '#5F5CF0',
                          letterSpacing: 1,
                          top: 4,
                          marginLeft: 3,
                        }}>
                        {targetData?.userDate?.exam_date == null ||
                        reset == true ||
                        targetData?.userDate?.exam_date >
                          targetData?.examDate?.date ||
                        targetData?.userDate?.exam_date < today
                          ? moment(
                              targetData?.examDate?.date,
                              'YYYY-MM-DD',
                            ).diff(moment(today, 'YYYY-MM-DD'), 'days')
                          : moment(
                              targetData?.userDate?.exam_date,
                              'YYYY-MM-DD',
                            ).diff(moment(today, 'YYYY-MM-DD'), 'days')}
                      </Text>
                      <Text
                        style={{
                          color: '#fa826a',
                          position: 'absolute',
                          bottom: 6,
                          right: 32,
                          marginLeft: 5,
                          fontFamily: Montserrat_Medium,
                        }}>
                        Days Left
                      </Text>
                    </View>
                  </View>
                ) : null}

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginHorizontal: 10,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: 10,
                    }}
                    onPress={() => setShowC(!showC)}>
                    <CText
                      type={'B14'}
                      align={'center'}
                      style={localStyles.button}
                      color={colors.textSpecial}>
                      Create Alert
                    </CText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{padding: 10}}
                    onPress={() => {
                      resetApi();
                      setReset(true);
                      setTargetCourse('');
                    }}>
                    <CText
                      type={'B14'}
                      align={'center'}
                      style={localStyles.button}
                      color={colors.textSpecial}>
                      Reset Alert
                    </CText>
                  </TouchableOpacity>
                </View>

                {showC && (
                  <View style={{flex: 1, paddingHorizontal: 10}}>
                    <View
                      style={{
                        overflow: 'hidden',
                        alignItems: 'center',
                        marginTop: 20,
                        height: 50,
                        borderRadius: 8,
                        elevation: 4,
                        width: '100%',
                      }}>
                      <Picker
                        ref={pickerRef}
                        type={'S16'}
                        color={colors.primary}
                        style={[
                          localStyles.btnContainerStyle,
                          {
                            backgroundColor: '#F8F9FA',
                            width: '100%',
                            height: 40,
                          },
                        ]}
                        selectedValue={targetCourse}
                        onValueChange={(itemValue, itemIndex) => {
                          setTargetCourse(itemValue);
                          setIndex(itemIndex - 1);
                        }}>
                        <Picker.Item
                          label="Select an option"
                          value=""
                          style={{color: 'black'}}
                        />
                        {targetAlert.map((item, index) => {
                          return (
                            <Picker.Item
                              key={index}
                              label={item.name}
                              value={item.id}
                            />
                          );
                        })}
                      </Picker>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#F8F9FA',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        borderRadius: 8,
                        padding: 10,
                        height: 50,
                        marginTop: 20,
                        elevation: 4,
                      }}>
                      <View style={{width: '90%'}}>
                        <Text
                          style={[
                            {marginTop: 5, fontSize: 16, color: 'black'},
                          ]}>
                          {moment(date).format('YYYY-MM-DD')}
                        </Text>
                      </View>

                      <View>
                        <TouchableOpacity onPress={() => setOpen(true)}>
                          <Image
                            style={{
                              resizeMode: 'contain',
                              height: 30,
                              width: 30,
                              justifyContent: 'flex-end',
                              //marginLeft: Dimensions.get('window').width - 250,
                              //marginTop: -10,
                            }}
                            source={require('../../../assets/images/calendar.png')}
                          />
                        </TouchableOpacity>
                      </View>

                      {/* <Button title="Open" /> */}
                      <DatePicker
                        style={{color: colors.primary}}
                        textColor={colors.primary}
                        modal
                        minimumDate={new Date()}
                        maximumDate={maxDate}
                        mode="date"
                        open={open}
                        date={date}
                        theme="light"
                        onConfirm={date => {
                          setDate(date);
                          setOpen(false);
                        }}
                        onCancel={() => {
                          setOpen(false);
                        }}
                      />
                    </View>
                    <TouchableOpacity
                      style={{
                        marginTop: 20,
                        width: 150,
                        alignSelf: 'center',
                        padding: 10,
                      }}
                      onPress={() => {
                        if (checkLogin === 'Unauthenticated.') {
                          tokenCheck();
                        } else {
                          setShowC(false);
                          creatAlert(targetCourse);
                        }
                      }}>
                      <CText
                        type={'B14'}
                        align={'center'}
                        style={localStyles.button}
                        color={colors.textSpecial}>
                        {checkLogin === 'Unauthenticated.'
                          ? 'Login First'
                          : 'Create alert'}
                      </CText>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
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
              title={'Exam Alerts'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>

          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <View style={{padding: 10}}>
              <View
                style={{
                  width: '100%',
                  elevation: 5,
                  backgroundColor: 'white',
                  borderRadius: 5,
                  padding: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  {/* <View style={{ width: "30%", flexDirection: 'row', alignItems: 'center' }}>
                    <Image
                      style={{ width: 18, height: 18 }}
                      source={IMAGE.EXAM}
                    />

                    <Text
                      style={{
                        fontFamily: Montserrat_Medium,
                        fontSize: 17, color: "#454545", marginLeft: 8
                      }}>
                      Exam  :
                    </Text>
                  </View> */}
                  <View
                    style={{
                      width: '100%',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    {courseNameWOL != '' && (
                      <Image
                        style={{width: 18, height: 18}}
                        source={IMAGE.EXAM}
                      />
                    )}

                    <Text
                      style={{
                        color: 'black',
                        fontSize: 19,
                        marginLeft: 5,
                        fontFamily: Montserrat_Medium,
                        letterSpacing: 0.5,
                      }}>
                      {courseNameWOL ? courseNameWOL : null}
                    </Text>
                  </View>
                </View>

                {courseNameWOL ? (
                  <View>
                    <View
                      style={{
                        alignItems: 'center',
                        marginTop: 20,
                        justifyContent: 'center',
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        {courseNameWOL && (
                          <LottieView
                            source={require('../../../assets/lottie/clock.json')}
                            autoPlay // Start playing automatically
                            loop // Repeat the animation
                            style={{width: 60, height: 60, alignSelf: 'center'}} // Adjust dimensions as needed
                          />
                        )}
                        <View style={{flexDirection: 'row', marginLeft: 10}}>
                          <Text
                            style={{
                              fontFamily: Montserrat_Medium,
                              fontSize: 40,
                              color: '#5F5CF0',
                              letterSpacing: 1,
                              top: 4,
                            }}>
                            {courseNameWOL
                              ? moment(targetCourseWOL, 'YYYY-MM-DD').diff(
                                  moment(today, 'YYYY-MM-DD'),
                                  'days',
                                )
                              : null}
                          </Text>
                          <Text
                            style={{
                              color: '#fa826a',
                              position: 'absolute',
                              bottom: 6,
                              left: 50,
                              marginLeft: 5,
                              fontFamily: Montserrat_Medium,
                            }}>
                            {courseNameWOL ? 'Days Left' : null}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ) : null}

                <View
                  style={{
                    overflow: 'hidden',
                    marginTop: 20,
                    alignSelf: 'center',
                    width: getWidth(310),
                    elevation: 4,
                    height: 50,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Picker
                    type={'S16'}
                    color={colors.primary}
                    style={[
                      localStyles.btnContainerStyle,
                      {
                        backgroundColor: '#F8F9FA',
                        width: getWidth(310),
                      },
                    ]}
                    selectedValue={targetCourse}
                    onValueChange={(itemValue, itemIndex) => {
                      console.log('index' + itemIndex);
                      // Access both label and value
                      const selectedLabel = targetAlert[itemIndex - 1]?.name;
                      const selectedValue = targetAlert[itemIndex - 1]?.date;

                      // Set state or perform other actions
                      setTargetCourseWOL(selectedValue);
                      setCourseNameWOL(selectedLabel);
                    }}>
                    <Picker.Item
                      label="Select Exam"
                      value=""
                      style={{color: 'black', fontFamily: Montserrat_Medium}}
                    />
                    {targetAlert?.map((item, index) => {
                      return (
                        <Picker.Item
                          key={index}
                          label={item?.name}
                          value={item?.date}
                        />
                      );
                    })}
                  </Picker>
                </View>

                <TouchableOpacity
                  style={{
                    marginTop: 20,
                    width: 150,
                    alignSelf: 'center',
                    padding: 10,
                  }}
                  onPress={() => navigation.navigate(StackNav.Auth)}>
                  <CText
                    type={'B14'}
                    align={'center'}
                    style={localStyles.button}
                    color={colors.textSpecial}>
                    {checkLogin === 'Unauthenticated.'
                      ? 'Login First'
                      : 'Customise Alert'}
                  </CText>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </CSafeAreaView>
  );
};

export default TargetTab;
const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    ...styles.ph10,
  },
  headerStyle: {
    ...styles.ph10,
    ...styles.mv20,
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
  btnContainerStyle: {
    ...styles.mh15,
    width: '100%',
    height: getHeight(48),
    ...styles.rowSpaceBetween,
    ...styles.ph25,
  },
  cardContainer: {
    ...styles.p15,
    ...styles.mr18,
    ...styles.ml18,
    borderRadius: moderateScale(24),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    width: moderateScale(335),
  },
  button: {
    padding: 10,
    backgroundColor: '#5F5CF0',
    borderRadius: 20,
    color: 'white',
    fontFamily: Montserrat_Medium,
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    width: getWidth(355),
    height: 'auto',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
