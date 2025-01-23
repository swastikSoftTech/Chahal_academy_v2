import {useIsFocused} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {MyLearningCourse} from '../../../../api/constant';
import {customRequest} from '../../../../api/customRequest';
import {getWidth, noDataImage} from '../../../../common/constants';
import CHeader from '../../../../components/common/CHeader';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import FullScreenLoading from '../../../../components/common/FullScreenLoading';
import LoginButton from '../../../../components/common/LoginButton';
import CourseCard from '../../../../components/homeComponent/CourseCard';
import {colors, styles} from '../../../../themes';
import {logoutUser} from '../../../../utils/commonFunction';
import Header from '../../../../components/common/header/Header';

const MyLearning = () => {
  const userDetails = useSelector(state => state.USER_SLICE);
  const isFocused = useIsFocused();
  // const [myAchievements, setMyAchievements] = useState(
  //   Achievements.slice(0, 2),
  // );
  // const [myDownload, setMyDownload] = useState(MyLearningCourse.slice(0, 2));
  // const [authenticated, setAuthenticated] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState([]);
  // const [data, setData] = useState([]);
  // const [courseData, setCourseData] = useState(0);
  const [videoData, setVideoData] = useState([]);
  const [testData, setTestData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    if (response?.message === 'authenticated') {
      // setAuthenticated(true);
      subscriptionApi();
    } else if (response?.message === 'Unauthenticated.') {
      logoutUser();
      setIsLoading(false);
    }
  };
  const subscriptionApi = () => {
    customRequest('student/my-subscriptions', 'GET').then(res => {
      setSubscriptionData(res);
      setIsLoading(false);
    });
  };

  const courseDataApi = () => {
    customRequest('user-course-complete', 'GET').then(res => {
      setVideoData(res?.videos);
      setTestData(res?.tests);
    });
  };

  const average = index => {
    if (testData == undefined || videoData == undefined) {
      Alert.alert('Data is not coming');
      return 0;
    } else {
      let test = 0;
      let video = 0;
      test = testData[index]?.attempt / testData[index]?.total;
      video = videoData[index]?.attempt / videoData[index]?.total;
      console.log('Average', (test + video) / 2);
      return (test + video) / 2;
    }
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      courseDataApi();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    courseDataApi();
    setRefreshing(false);
  };

  return (
    <CSafeAreaView style={localStyles.root}>
      <FullScreenLoading isLoading={isLoading} />
      {userDetails?.isUserLoggedIn ? (
        <View>
          <Header title={'My Learning'} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={{
              marginBottom: 70,
              flexDirection: 'row',
              flexWrap: 'wrap',
              backgroundColor: colors.backgroundColor,
            }}>
            {subscriptionData.length > 0 ? (
              subscriptionData?.map((item, index) => {
                console.log('itemSub', item);
                return (
                  <CourseCard
                    key={index}
                    item={item}
                    title={item?.Course?.name}
                    showProgress={average(index).toFixed(2)}
                  />
                );
              })
            ) : (
              <Image
                style={{
                  width: getWidth(355),
                  aspectRatio: 1,
                  marginTop: getWidth(100),
                }}
                source={{uri: noDataImage}}
              />
            )}
          </ScrollView>
        </View>
      ) : (
        <View>
            <Header title={'My Learning'} />
          <LottieView
            source={require('../../../../assets/lottie/login.json')}
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

export default MyLearning;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
    // ...styles.ph10,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
