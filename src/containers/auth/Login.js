import React, {useState} from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {CloseEye_Icon, Logo_Icon, OpenEye_Icon} from '../../assets/svgs';
import {
  Montserrat_Bold,
  Montserrat_Medium,
  Montserrat_Regular,
  getHeight,
  moderateScale,
} from '../../common/constants';
import CButton from '../../components/common/CButton';
import CKeyBoardAvoidWrapper from '../../components/common/CKeyBoardAvoidWrapper';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CText from '../../components/common/CText';
import strings from '../../i18n/strings';
import {styles} from '../../themes';
// import {useNavigation} from '@react-navigation/native';
// import CheckBox from '@react-native-community/checkbox';
import {Login_URL} from '../../api/Url';
import axios from '../../api/axios';
import {StackNav} from '../../navigation/NavigationKeys';
import {userDetails} from '../../redux/slices/userSlice';
import MultipleLoginWarningModal from '../../components/modal/MultipleLoginWarningModal';
import DeviceInfo from 'react-native-device-info';
const Login = ({navigation}) => {
  const dispatch = useDispatch();
  const colors = useSelector(state => state.theme.theme);
  // const navigation = useNavigation();
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [isSelected, setSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showMultiLoginModal, setShowMultiLoginModal] = useState(false);

  //validation
  const [nullEmail, setNullEmail] = useState(false);
  const [formateEmail, setFormateEmail] = useState(false);
  const [nullPassword, setNullPassword] = useState(false);

  const formValidation = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    let valid = 0;
    if (contact == '') {
      valid = 1;
      setNullEmail(true);
      setFormateEmail(false);
    } else if (reg.test(contact.trim()) === false) {
      valid = 1;
      setFormateEmail(true);
      setNullEmail(false);
    }
    if (password == '') {
      valid = 1;
      setNullPassword(true);
    } else {
      setNullPassword(false);
    }
    if (valid == 0) {
      console.log('hello daer');
      onPressGetStarted();
    }
  };
  console.log(DeviceInfo.getModel());

  // const onChangedPhoneNo = text => setContact(text);
  const onPressGetStarted = async () => {
    console.log('data', contact, password);
    try {
      setIsLoading(true);
      const request = {
        email: contact.trim(),
        password: password,
      };

      // setIsLoading(true);
      const response = await axios.post(Login_URL, request, {
        headers: {
          'Content-Type': 'application/json',
          browser: DeviceInfo.getModel(),
          os: Platform.OS,
          device: 'Mobile',
        },
        withCredentials: true,
      });
      console.log('response >>', response.data);
      console.log('response status >>', response.status);

      if (response.status == 409) {
        return setShowMultiLoginModal(true);
      }
      // setIsLoading(false);
      console.log('response:::::', response.data);
      if (response && response.data) {
        const user = response.data.user;
        const token = response?.data?.token;
        const passwordReset = response.data.password_reset;
        console.log('passwordReset >>', passwordReset);

        if (user) {
          console.log('UserID & UserName', response.data.user.id, user?.name);
          await AsyncStorage.setItem(
            'userid',
            JSON.stringify(response?.data?.user?.id),
          );
          await AsyncStorage.setItem(
            'user',
            JSON.stringify(response?.data?.user?.name),
          );
          await AsyncStorage.setItem(
            'userPic',
            JSON.stringify(response?.data?.profile_img),
          );
          await AsyncStorage.setItem(
            'userDOB',
            JSON.stringify(response?.data?.user?.dob),
          );
          await AsyncStorage.setItem(
            'userMail',
            JSON.stringify(response?.data?.user?.email),
          );
          await AsyncStorage.setItem(
            'gender',
            JSON.stringify(response?.data?.user?.gender),
          );
          await AsyncStorage.setItem(
            'phone',
            JSON.stringify(response?.data?.user?.phone),
          );
        }

        if (passwordReset == 0) {
          navigation.navigate('PasswordReset');
        } else {
          if (token) {
            console.log('userToken:::::::::::::::::', token);
            await AsyncStorage.setItem('tokenStudent', token);
            dispatch(userDetails({token: token, isUserLoggedIn: true}));
            ToastAndroid.show('Signed In Successully.', ToastAndroid.LONG);
            // navigation.navigate(StackNav.TabBar);
            navigation.goBack();
          }
        }
      }
    } catch (error) {
      // setIsLoading(false);
      if (error.response?.status == 409) {
        return setShowMultiLoginModal(true);
      }
      console.error('Error while logging in:', error.response?.data?.message);
      Alert.alert('Error while logging in:', error.response?.data?.message);
      if (error.response?.status == 401) {
        Alert.alert('Error', error.response?.data?.message);
      } else if (error.response?.status == 422) {
        Alert.alert('Error', error.response?.data?.message);
      } else if (error.response?.status == 403) {
        Alert.alert('Error 403', error.response?.data?.errors);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CSafeAreaView style={localStyles.mainContainer}>
      <CKeyBoardAvoidWrapper containerStyle={styles.ph20}>
        <View
          style={[
            localStyles.titleContainer,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <Logo_Icon
            style={localStyles.logo}
            // width={moderateScale(250)}
            // height={moderateScale(100)}
            // width={'80%'}
            // height={moderateScale}
          />
          {/* <CText type={'B24'} align={'center'} style={styles.mt30}>
            {strings.signinTitle}
          </CText> */}

          <Text
            style={{
              fontSize: 22,
              fontFamily: Montserrat_Bold,
              color: 'black',
              marginTop: 15,
            }}>
            {strings.signinTitle}
          </Text>

          <Text
            style={{
              color: colors.textColor2,
              marginTop: 8,
              fontFamily: Montserrat_Regular,
              textAlign: 'center',
              letterSpacing: 0.5,
            }}>
            {strings.signinSubtitle}
          </Text>
        </View>
        <View style={styles.mt30}>
          {/* <CInput
            required
            label={'Email or Phone Number'}
            placeHolder={strings.contact}
            _value={contact}
            toGetTextFieldValue={text => setContact(text)}
            inputContainerStyle={[{ backgroundColor: colors.inputBg }]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          /> */}

          <Text
            style={{
              fontSize: 14,
              color: '#454545',
              fontFamily: Montserrat_Medium,
              marginTop: 5,
            }}>
            Email or Phone Number{' '}
            <Text style={{color: colors.error}}>{' *'}</Text>
          </Text>
          <TextInput
            placeholder="Enter First Name"
            placeholderTextColor="#a9a9a9"
            style={
              contact !== ''
                ? localStyles.fillField
                : nullEmail || formateEmail
                ? localStyles.errorField
                : localStyles.nullField
            }
            onChangeText={text => {
              setNullEmail(false);
              setFormateEmail(false);
              setContact(text);
            }}
            value={contact}
          />
          {nullEmail && (
            <Text style={localStyles.errorMessage}>Field is required</Text>
          )}
          {formateEmail && (
            <Text style={localStyles.errorMessage}>Enter Valid Email</Text>
          )}
        </View>

        <View
          style={[
            styles.mt0,
            {
              marginTop: 10,
              marginBottom: 0,
            },
          ]}>
          <Text
            style={{
              fontSize: 14,
              color: '#454545',
              fontFamily: Montserrat_Medium,
              marginTop: 5,
            }}>
            Password <Text style={{color: colors.error}}>{' *'}</Text>
          </Text>
          <TextInput
            secureTextEntry={passwordVisible}
            value={password}
            placeholder={strings.enterYourPassword}
            placeholderTextColor="#a9a9a9"
            style={
              password !== ''
                ? localStyles.fillField
                : nullPassword
                ? localStyles.errorField
                : localStyles.nullField
            }
            onChangeText={text => {
              setNullPassword(false);
              setPassword(text);
            }}
          />
          {nullPassword && (
            <Text style={localStyles.errorMessage}>Field is required</Text>
          )}
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 7,
              zIndex: 1000,
              padding: 10,
            }}
            activeOpacity={1}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? (
              <CloseEye_Icon
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'flex-end',
                  marginTop: 30,
                  marginLeft: 30,
                }}
              />
            ) : (
              <OpenEye_Icon
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'flex-end',
                  marginTop: 30,
                  marginLeft: 30,
                }}
              />
            )}
          </TouchableOpacity>

          {/* <CInput
            required
            label={'Password'}
            placeHolder={strings.enterYourPassword}
            _value={password}
            maxLength={30}
            toGetTextFieldValue={text => setPassword(text)}
            secureTextEntry={passwordVisible}
            inputContainerStyle={[{ backgroundColor: colors.inputBg }]}
            labelStyle={styles.ml20}
            inputBoxStyle={styles.ml15}
          />
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            {passwordVisible ? (
              <CloseEye_Icon
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'flex-end',
                  marginTop: getHeight(40),
                  marginLeft: -getWidth(40),
                }}
              />
            ) : (
              <OpenEye_Icon
                style={{
                  width: 25,
                  height: 25,
                  alignSelf: 'flex-end',
                  marginTop: getHeight(40),
                  marginLeft: -getWidth(40),
                }}
              />
            )}
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',

            marginTop: 10,
          }}>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CheckBox
              style={{marginRight: 1}}
              tintColors={{true: "'#368098'", false: '#505050'}}
              onCheckColor="#000"
              value={isSelected}
              onValueChange={setSelection}
            />
            <Text
              style={{
                color: colors.labelText,
                fontSize: 13,
                fontFamily: Montserrat_Regular,
              }}>
              Remember Me
            </Text>
          </View> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <View>
              <Text
                style={{
                  color: colors.labelText,
                  fontSize: 13,
                  fontFamily: Montserrat_Regular,
                }}>
                Forgot Password?
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <CButton
          title={strings.loginNow}
          containerStyle={{marginTop: 15}}
          type={'M18'}
          color={colors.white}
          onPress={formValidation}
          isLoading={isLoading}
          //onPress={onPressGetStarted}
        />
        <View style={styles.rowCenter}>
          <CText
            type={'R14'}
            align={'center'}
            style={styles.mt15}
            color={colors.textColor2}>
            {strings.noAccount}
          </CText>
          <TouchableOpacity
            onPress={() => navigation.navigate(StackNav.SignUp)}>
            <CText
              type={'B14'}
              align={'center'}
              style={[styles.mt15]}
              color={colors.textSpecial}>
              Sign Up
            </CText>
          </TouchableOpacity>
        </View>
        {/* <View style={localStyles.socialContainer}>
          <CButton
            title={strings.facebook}
            type={'M16'}
            color={colors.textColor}
            frontIcon={
              <Facebook_Icon
                width={moderateScale(24)}
                height={moderateScale(24)}
              />
            }
            containerStyle={localStyles.socialButton}
            bgColor={colors.socialButtonBackground}
            style={styles.ml10}
            // onPress={onPressRightArrow}
          />
          <CButton
            title={strings.google}
            type={'M16'}
            color={colors.textColor}
            frontIcon={
              <Google_Icon
                width={moderateScale(24)}
                height={moderateScale(24)}
              />
            }
            containerStyle={localStyles.socialButton}
            bgColor={colors.socialButtonBackground}
            style={styles.ml10}
            // onPress={onPressRightArrow}
          />
        </View> */}
      </CKeyBoardAvoidWrapper>
      <MultipleLoginWarningModal
        visible={showMultiLoginModal}
        onClose={() => setShowMultiLoginModal(false)}
        loginPayload={{
          email: contact.trim(),
          password: password,
        }}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.flex,
  },
  titleContainer: {
    marginTop: getHeight(50),
  },
  logo: {
    ...styles.selfCenter,
  },
  submitButton: {
    ...styles.mt50,
  },
  socialContainer: {
    ...styles.mt40,
    ...styles.rowSpaceBetween,
  },
  socialButton: {
    width: moderateScale(156),
    //shadow
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 0.5,
  },
  fillField: {
    width: '100%',
    height: 55,
    borderRadius: 5,
    borderColor: '#4b46d3',
    borderWidth: 1,
    marginTop: 5,
    fontSize: 15,
    paddingHorizontal: 10,
    backgroundColor: '#f1f1f1',
    fontFamily: Montserrat_Regular,
    color: 'black',
    paddingEnd: 60,
  },
  nullField: {
    width: '100%',
    height: 55,
    borderRadius: 5,
    marginTop: 5,
    fontSize: 15,
    paddingHorizontal: 10,
    borderColor: '#4b46d3',
    fontFamily: Montserrat_Regular,
    color: 'black',
    paddingEnd: 60,
    borderWidth: 1,
    backgroundColor: '#f1f1f1',
  },
  errorField: {
    width: '100%',
    height: 55,
    borderRadius: 5,
    borderColor: '#e34b2c',
    borderWidth: 1,
    marginTop: 5,
    fontSize: 15,
    paddingHorizontal: 10,
    backgroundColor:
      '#f1f1f1", fontFamily: Montserrat_Regular, color: "black", paddingEnd: 60',
  },
  errorMessage: {
    color: '#e34b2c',
    top: 6,
    left: 2,
    fontFamily: Montserrat_Medium,
    fontSize: 12,
  },
});

export default Login;
