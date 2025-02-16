// Libraries import
import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {customRequest} from '../../../api/customRequest';
import {
  deviceHeight,
  deviceWidth,
  getWidth,
  noDataImage,
} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import LoginButton from '../../../components/common/LoginButton';
import {styles} from '../../../themes';
import Categories from '../home/screens/Categories';
import FullScreenLoading from '../../../components/common/FullScreenLoading';
import Header from '../../../components/common/header/Header';
import {useSelector} from 'react-redux';
import {logoutUser} from '../../../utils/commonFunction';

export default function CourseList() {
  const userDetails = useSelector(state => state.USER_SLICE);
  const isFocused = useIsFocused();
  const [videoCourseList, setVideoCourseList] = useState([]);
  const [openDataList, setOpenDataList] = useState([]);
  // const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      // setAuthenticated(true);
      getVideoList(true);
      openData(true);
    } else if (response?.message === 'Unauthenticated.') {
      logoutUser();
      setIsLoading(false);
    }
  };

  const openData = async () => {
    customRequest('student/universalcoursevideolist', 'GET').then(res => {
      console.log('universalcoursevideolist >>', res);
      setOpenDataList(res);
    });
  };
  
  const getVideoList = async () => {
    customRequest('student/coursevideolist', 'GET').then(res => {
      console.log('coursevideolist >>', res);
      setVideoCourseList(res);
      setIsLoading(false);
      return;
    });
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, [isFocused]);
  return (
    <CSafeAreaView style={styles.flex}>
      <FullScreenLoading isLoading={isLoading} />
      {userDetails?.isUserLoggedIn ? (
        videoCourseList?.length == 0 ? (
          <Image
            source={{uri: noDataImage}}
            style={{
              width: deviceWidth,
              height: deviceHeight / 2,
              alignSelf: 'center',
              marginTop: '50%',
            }}
          />
        ) : (
          <View>
            <Header title={'Videos'} hideBack showMenu />
            <Categories data={videoCourseList} />
          </View>
        )
      ) : (
        <View>
          <Header title={'Videos'} hideBack showMenu showLogin />
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
}
const localStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    margin: 10,
    justifyContent: 'center',
  },
  cardImage: {
    height: deviceWidth / 2,
    borderRadius: 10,
  },
  text: {fontWeight: '500', fontSize: 16, color: 'black'},
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
