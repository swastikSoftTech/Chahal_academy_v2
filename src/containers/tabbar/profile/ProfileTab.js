import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {customRequest} from '../../../api/customRequest';
import * as IMAGE from '../../../assets/images/indexnew';
import {BookFill, Right_Arrow_Icon, ZoomFill} from '../../../assets/svgs';

import {
  Montserrat_Medium,
  getWidth,
  moderateScale,
} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import LoginButton from '../../../components/common/LoginButton';
import {StackNav, TabNav} from '../../../navigation/NavigationKeys';
import {colors, styles} from '../../../themes';
import {ImagePaths} from '../../../utils/imagePaths';
import commonStyle from '../../../styles/commonStyles';
import {APP_PADDING_HORIZONTAL} from '../../../themes/commonStyle';
import {spacing} from '../../../styles/spacing';
import {boxShadow} from '../../../styles/Mixins';
import Title from '../../../components/common/text/Title';
import {showDrawer} from '../../../redux/slices/drawerSlice';
import Image from '../../../components/common/Image';
import RegularText from '../../../components/common/text/RegularText';
import {textScale} from '../../../styles/responsiveStyles';
import {logoutUser} from '../../../utils/commonFunction';
import Button from '../../../components/common/button/Button';

const ProfileTab = ({navigation}) => {
  const dispatch = useDispatch();
  const colors = useSelector(state => state.theme.theme);
  const userDetails = useSelector(state => state.USER_SLICE);
  const isFocused = useIsFocused();
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  // const [authenticated, setAuthenticated] = useState(false);
  // const [modalVisible, setModalVisible] = useState(false);
  console.log('userdetails >>', userDetails);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      // setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      logoutUser();
    }
  };

  const MenuItem = ({onPress, title, icon, svg}) => {
    return (
      <TouchableOpacity style={localStyles.menuItemContainer} onPress={onPress}>
        {icon ? <Image style={localStyles.menuItem_icon} source={icon} /> : svg}
        <Text style={localStyles.menuItem_title}>{title}</Text>
        <Right_Arrow_Icon />
      </TouchableOpacity>
    );
  };

  const Profile = async () => {
    const user = await AsyncStorage.getItem('user');
    const userPic = await AsyncStorage.getItem('userPic');
    const userMail = await AsyncStorage.getItem('userMail');
    setMail(JSON.parse(userMail));
    setImage(JSON.parse(userPic));
    setName(JSON.parse(user));
  };

  useFocusEffect(() => {
    StatusBar.setBackgroundColor(colors?.primary);
    StatusBar.setBarStyle('dark-content');
  });

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      Profile();
    }
  }, [isFocused]);

  function onPressToggleBtn() {
    dispatch(showDrawer());
  }
  return (
    <CSafeAreaView style={styles.flex}>
      {/* <StatusBar backgroundColor={colors.primary} barStyle={'light-content'} /> */}
      {/* {authenticated ? ( */}
      <View>
        {/* <CHeader
            title={'Profile'}
            isHideBack={true``}
            customTextStyle={localStyles.headerText}
            containerStyle={{backgroundColor: colors?.primary}}
          /> */}

        <ScrollView>
          <View
            style={
              {
                // width: '100%',
                // justifyContent: 'center',
                // alignItems: 'center',
                // marginTop: 15,
              }
            }>
            <View style={localStyles.headerContainer}>
              <Title title={'Profile'} style={localStyles.title} />
              {!userDetails?.isUserLoggedIn && (
                <LoginButton bgColor={'#fff'} color={'#5F5CF0'} />
              )}
              <TouchableOpacity
                onPress={onPressToggleBtn}
                style={{marginLeft: 'auto'}}>
                <Image
                  source={ImagePaths.MENU_ICON}
                  style={localStyles.toggleIcon}
                />
              </TouchableOpacity>
            </View>
            {/* <View
              style={{
                backgroundColor: colors.primary,
                height: moderateScale(120),
                width: '100%',
              }}>
              {authenticated ? null : (
                <LoginButton
                  bgColor={colors?.white}
                  containerStyle={{
                    alignSelf: 'flex-end',
                    marginHorizontal: moderateScale(16),
                    marginTop: moderateScale(8),
                  }}
                  titleStyle={{color: colors?.primary}}
                />
              )}
            </View> */}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={
                  image == '' || image == null
                    ? require('../../../assets/images/male.jpg')
                    : {uri: image}
                }
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 60,
                  borderWidth: 2,
                  borderColor: '#5F5CF0',
                  alignSelf: 'center',
                  marginTop: spacing.MARGIN_16,
                }}
              />
              {userDetails?.isUserLoggedIn ? (
                <>
                  <Text
                    style={{
                      fontSize: 15,
                      fontFamily: Montserrat_Medium,
                      letterSpacing: 1,
                      marginTop: 5,
                      color: 'black',
                    }}>
                    {name}
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontSize: 12,
                        fontFamily: Montserrat_Medium,
                        color: '#a9a9a9',
                      }}>
                      {mail}
                    </Text>

                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate(StackNav.EditProfile);
                      }}
                      style={{
                        marginTop: spacing.MARGIN_4,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <LinearGradient
                        colors={['#d418a0', '#ec3a7c', '#ff942d']}
                        style={{
                          height: 23,
                          width: 50,
                          position: 'absolute',
                          borderRadius: 25,
                        }}
                        start={{x: 0.5, y: 0}}
                        end={{x: 0, y: 0.5}}
                      />
                      <Image
                        style={{width: 12, height: 12, tintColor: 'white'}}
                        source={IMAGE.EDIT}
                      />
                      <Text
                        style={{
                          fontSize: 11,
                          fontFamily: Montserrat_Medium,
                          letterSpacing: 1,
                          marginTop: 5,
                          color: 'white',
                          top: -1,
                        }}>
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <></>
              )}
            </View>

            {/* <View style={{ padding: 15,width:'100%' }}>
                <View
                  style={{ width: "100%", borderWidth: 0.5, borderColor: "#5F5CF0", }}
                />
              </View> */}
            <View
              style={{
                marginVertical: moderateScale(30),
                paddingHorizontal: APP_PADDING_HORIZONTAL,
              }}>
              <MenuItem
                icon={IMAGE.STUDENT_COURCES}
                title={'My Courses'}
                onPress={() => {
                  navigation.navigate(StackNav.MySubscription);
                }}
              />

              {/* <MenuItem
                icon={IMAGE.JOIN}
                title={'My InVoice'}
                onPress={() => {
                  navigation.navigate(StackNav.MyInvoice);
                }}
              /> */}
              {/* <MenuItem
                icon={IMAGE.VIDEO}
                title={'My Learning'}
                onPress={() => {
                  navigation.navigate(StackNav.MyLearning);
                }}
              /> */}
              <MenuItem
                icon={IMAGE.VIDEO}
                title={'My Videos'}
                onPress={() => {
                  navigation.navigate(TabNav.CourseList);
                }}
              />
              <MenuItem
                svg={<ZoomFill height={15} width={15} />}
                title={'Live Classes'}
                onPress={() => {
                  navigation.navigate(TabNav.ZoomTab);
                }}
              />
              <MenuItem
                svg={<BookFill height={15} width={15} />}
                title={'Test Series'}
                onPress={() => {
                  navigation.navigate(TabNav.TestSeriesCategory);
                }}
              />
              {/* <MenuItem
                icon={IMAGE.EXAM}
                title={'My Target'}
                onPress={() => {
                  navigation.navigate(StackNav.TargetTab);
                }}
              /> */}
              {/* <MenuItem
                icon={IMAGE.QUESTIONS}
                title={'My Chat'}
                onPress={() => {
                  navigation.navigate(StackNav.Chat);
                }}
              /> */}
              {userDetails?.isUserLoggedIn && (
                <Button
                  title={'Logout'}
                  onPressButton={() => {
                    logoutUser();
                    ToastAndroid.show('Logout Successully.', ToastAndroid.LONG);
                  }}
                  buttonStyle={{
                    alignSelf: 'center',
                    marginTop: spacing.MARGIN_12,
                    borderRadius: spacing.RADIUS_10,
                  }}
                />
                // <TouchableOpacity
                //   onPress={() => {
                //     logoutUser();
                //     ToastAndroid.show('Logout Successully.', ToastAndroid.LONG);
                //   }}
                //   style={{alignSelf: 'center', marginTop: spacing.MARGIN_12}}>

                //   <RegularText
                //     style={{
                //       color: 'red',
                //       fontSize: textScale(14),
                //     }}>Logout</RegularText>
                // </TouchableOpacity>
              )}
            </View>
            {/* <View
                style={{
                  justifyContent: 'flex-start',
                  width: '100%',
                  padding: 20,
                }}>
                  
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.MySubscription);
                  }}
                  style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.STUDENT_COURCES}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My Courses
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.MyInvoice);
                  }}
                  style={{flexDirection: 'row', marginTop: 20}}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.JOIN}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My InVoice
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.MyLearning);
                  }}
                  style={{flexDirection: 'row', marginTop: 20}}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.VIDEO}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My Learning
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.TargetTab);
                  }}
                  style={{flexDirection: 'row', marginTop: 20}}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.EXAM}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My Target
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.Chat);
                  }}
                  style={{flexDirection: 'row', marginTop: 20}}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.QUESTIONS}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My Chat
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View> */}

            {/* <View
              style={{
                width: getWidth(190),
                height: getWidth(190),
                backgroundColor: '#5F5CF0',
                alignSelf: 'center',
                justifyContent: 'center',
                borderRadius: getWidth(190),
              }}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Image
                  resizeMode="contain"
                  source={
                    image == '' || image == null
                      ? require('../../../assets/images/male.jpg')
                      : { uri: image }
                  }
                  style={[
                    localStyles.profileImage,
                    { borderColor: colors.white },
                  ]}
                />
              </TouchableOpacity>
              <CText
                type="l16"
                align="center"
                style={{ fontWeight: '600', color: 'white' }}>
                {name}
              </CText>
            </View> */}

            {/* <View>
              <Modal
                animationType="slide"
                // transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View>
                    <TouchableOpacity
                      style={{ alignSelf: 'flex-end' }}
                      onPress={() => setModalVisible(!modalVisible)}>
                      {colors.dark == 'dark' ? (
                        <Cross_Close_Dark_Icon
                          width={moderateScale(25)}
                          height={moderateScale(25)}
                        />
                      ) : (
                        <Cross_Close_Icon
                          width={moderateScale(25)}
                          height={moderateScale(25)}
                        />
                      )}
                    </TouchableOpacity>
                    <Image
                      source={
                        image == '' || image == null
                          ? require('../../../assets/images/male.jpg')
                          : { uri: image }
                      }
                      resizeMode="cover"
                      style={{ width: getWidth(375), height: getWidth(375) }}
                    />
                  </View>
                </View>
              </Modal>
            </View> */}
            {/* <View style={{ marginHorizontal: 10 }}>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.EditProfile)}>
                <View style={localStyles.icon}>
                  <EditProfile height={23} width={23} />
                  <CText
                    type={'m16'}
                    style={{ alignSelf: 'center', color: 'white' }}>
                    Edit Profile
                  </CText>
                </View>
              </TouchableOpacity>

              <CText type={'m16'} style={{ alignSelf: 'center', marginTop: 20 }}>
                -----MyLearning-----
              </CText>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                }}>
                <TouchableOpacity
                  style={localStyles.Buttons}
                  onPress={() => navigation.navigate(StackNav.MySubscription)}>
                  <View style={localStyles.icon}>
                    <Course height={25} width={25} style={localStyles.svgs} />
                    <CText
                      type={'m16'}
                      style={{ alignSelf: 'center', color: 'white' }}>
                      My Courses
                    </CText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={localStyles.Buttons}
                  onPress={() => navigation.navigate(StackNav.MyInvoice)}>
                  <CText
                    type={'m16'}
                    style={{ alignSelf: 'center', color: 'white' }}>
                    My Invoices
                  </CText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={localStyles.Buttons}
                  onPress={() => navigation.navigate(StackNav.MyLearning)}>
                  <View style={localStyles.icon}>
                    <Correct height={25} width={25} style={localStyles.svgs} />
                    <CText
                      type={'m16'}
                      style={{ alignSelf: 'center', color: 'white' }}>
                      My Learning
                    </CText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={localStyles.Buttons}
                  onPress={() => navigation.navigate(StackNav.Chat)}>
                  <View style={localStyles.icon}>
                    <Chat height={25} width={25} />
                    <CText
                      type={'m16'}
                      style={{ alignSelf: 'center', color: 'white' }}>
                      My Chat
                    </CText>
                  </View>
                </TouchableOpacity>
              </View>
            </View> */}
          </View>
        </ScrollView>
      </View>
      {/* ) : (
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
              title={'Profile Detail'}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  source={require('../../../assets/images/male.jpg')}
                  style={{
                    width: 110,
                    height: 110,
                    borderRadius: 60,
                    borderWidth: 2,
                    borderColor: '#5F5CF0',
                    alignSelf: 'center',
                  }}
                />
              </View>

              <View
                style={{
                  justifyContent: 'flex-start',
                  width: '100%',
                  padding: 20,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.MySubscription);
                  }}
                  style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 15,
                      height: 15,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.STUDENT_COURCES}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My Course{' '}
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.MyInvoice);
                  }}
                  style={{flexDirection: 'row', marginTop: 20}}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.JOIN}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My InVoice
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.MyLearning);
                  }}
                  style={{flexDirection: 'row', marginTop: 20}}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.VIDEO}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My Learning
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.TargetTab);
                  }}
                  style={{flexDirection: 'row', marginTop: 20}}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.EXAM}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My Target
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(StackNav.Chat);
                  }}
                  style={{flexDirection: 'row', marginTop: 20}}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      top: 2,
                      tintColor: '#454545',
                    }}
                    source={IMAGE.QUESTIONS}
                  />
                  <Text
                    style={{
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                      fontSize: 15,
                      marginLeft: 10,
                    }}>
                    My Chat
                  </Text>
                  <TouchableOpacity
                    style={{position: 'absolute', right: 10, top: 5}}>
                    <Right_Arrow_Icon />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          {/* <View
            style={{
              width: getWidth(190),
              height: getWidth(190),
              backgroundColor: '#5F5CF0',
              alignSelf: 'center',
              justifyContent: 'center',
              borderRadius: getWidth(190),
            }}>
            <Image
              resizeMode="contain"
              source={require('../../../assets/images/male.jpg')}
              style={[
                localStyles.profileImage,
                { borderColor: colors.white, marginTop: 0 },
              ]}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
              }}>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.MySubscription)}>
                <View style={localStyles.icon}>
                  <Course height={25} width={25} style={localStyles.svgs} />
                  <CText
                    type={'m16'}
                    style={{ alignSelf: 'center' }}
                    color={'white'}>
                    My Courses
                  </CText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.MyInvoice)}>
                <CText
                  type={'m16'}
                  style={{ alignSelf: 'center' }}
                  color={'white'}>
                  My Invoices
                </CText>
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.MyLearning)}>
                <View style={localStyles.icon}>
                  <Correct height={25} width={25} style={localStyles.svgs} />
                  <CText
                    type={'m16'}
                    style={{ alignSelf: 'center' }}
                    color={'white'}>
                    My learning
                  </CText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={localStyles.Buttons}
                onPress={() => navigation.navigate(StackNav.Chat)}>
                <View style={localStyles.icon}>
                  <Chat height={25} width={25} />
                  <CText
                    type={'m16'}
                    style={{ alignSelf: 'center' }}
                    color={'white'}>
                    My Chat
                  </CText>
                </View>
              </TouchableOpacity>
            </View>
          </View> */}
      {/* </View>
      )}  */}
    </CSafeAreaView>
  );
};

export default ProfileTab;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  profileCover: {
    width: '100%',
    height: moderateScale(170),
  },

  profileImage: {
    width: moderateScale(130),
    height: moderateScale(130),
    borderRadius: moderateScale(70),
    borderWidth: moderateScale(2),
    ...styles.selfCenter,
    marginTop: -20,
  },
  innerContainer: {
    ...styles.pl10,
    ...styles.pr10,
  },
  Buttons: {
    width: getWidth(155),
    marginTop: 20,
    padding: 10,
    backgroundColor: '#5F5CF0',
    borderRadius: 6,
    elevation: 4,
  },
  headerText: {
    // alignSelf: 'center',
    // flex: 1,
    // textAlign: 'center',
    color: colors?.white,
  },
  icon: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#5F5CF0',
  },
  svgs: {
    viewBox: '0 0 24 24',
    fill: '#5F5CF0',
    stroke: 'white',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  /////////////////////////
  menuItemContainer: {
    // borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // width: '92%',
    // marginHorizontal: moderateScale(16),
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    gap: moderateScale(12),
    backgroundColor: colors.light.white,
    shadowColor: 'black',
    shadowOffset: {height: 1, width: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 4,
    marginBottom: moderateScale(12),
  },
  menuItem_title: {
    color: colors.light.black,
    fontFamily: Montserrat_Medium,
    flex: 1,
  },
  menuItem_icon: {
    width: moderateScale(15),
    height: moderateScale(15),
    // top: 2,
    tintColor: '#454545',
  },
  headerContainer: {
    ...commonStyle.flexDirectionRow,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.PADDING_12,
    borderBottomLeftRadius: spacing.RADIUS_16,
    borderBottomRightRadius: spacing.RADIUS_16,
    backgroundColor: colors.dark.primary,
    justifyContent: 'space-between',
    ...boxShadow(),
  },
  title: {
    position: 'absolute',
    width: '100%',
    marginHorizontal: APP_PADDING_HORIZONTAL,
    textAlign: 'center',
    color: colors.dark.white,
  },
  toggleIcon: {
    width: spacing.WIDTH_40,
    height: spacing.WIDTH_40,
    tintColor: colors.dark.white,
    alignSelf: 'flex-end',
  },
});
