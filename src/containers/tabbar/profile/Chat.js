import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {encode} from 'base-64';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import {useSelector} from 'react-redux';
import {customRequest} from '../../../api/customRequest';
import {getWidth, moderateScale} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import LoginButton from '../../../components/common/LoginButton';
import {styles} from '../../../themes';
import {logoutUser} from '../../../utils/commonFunction';

const Chat = ({navigation}) => {
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const userDetails = useSelector(state => state.USER_SLICE);
  const [teacherListData, setTeacherListData] = useState([]);
  // const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const base64String = encode(token);
  const [isLoading, setIsLoading] = useState(true);

  const tokenCheck = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    console.log('token', token);
    setToken(token);
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      // setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      logoutUser();
    }
    setIsLoading(false);
  };

  // const teacherListApi = () => {
  //   customRequest('student/teacher/list', 'GET').then(res => {
  //     console.log('teacherListApi', res);
  //     setTeacherListData(res);
  //   });
  // };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, [isFocused]);

  return (
    <CSafeAreaView style={styles.flex}>
      <FullScreenLoading isLoading={isLoading} />
      {userDetails?.isUserLoggedIn ? (
        <WebView
          source={{
            uri: `https://aspirantvideo.chahalacademy.com/student/teacher_list?data=${base64String}`,
          }}
        />
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
              title={'My Chat'}
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

export default Chat;

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
