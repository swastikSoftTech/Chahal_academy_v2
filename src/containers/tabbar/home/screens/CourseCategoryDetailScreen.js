import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
// import Icons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {customRequest} from '../../../../api/customRequest';
import * as IMAGE from '../../../../assets/images/indexnew';
import {Montserrat_Medium, moderateScale} from '../../../../common/constants';
import CButton from '../../../../components/common/CButton';
import CSafeAreaView from '../../../../components/common/CSafeAreaView';
import CText from '../../../../components/common/CText';
import FullScreenLoading from '../../../../components/common/FullScreenLoading';
import {StackNav} from '../../../../navigation/NavigationKeys';
import {styles} from '../../../../themes';
import About from '../../search/courses/About';
import Reviews from '../../search/courses/Reviews';
import {logoutUser} from '../../../../utils/commonFunction';

export default function CourseCategoryDetailScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const colors = useSelector(state => state.theme.theme);
  const userDetails = useSelector(state => state.USER_SLICE);
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const [courseDetail, setCourseDetail] = useState(null);
  const [courseContent, setCourseContent] = useState(null);
  const [contents, setContents] = useState({});
  const [subModule, setSubModule] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('About');
  const [contact, setContact] = useState(0);
  const [subscription, setSubscription] = useState('');
  // const [authenticated, setAuthenticated] = useState(false);
  const id = route.params.id;
  const slug = route.params.slug;
  // console.log('userID', slug, id, contact, colors.backgroundColor);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message === 'authenticated') {
      // setAuthenticated(true);
    } else if (response?.message === 'Unauthenticated.') {
      logoutUser();
    }
  };
  const getCourseDetail = async () => {
    let userID = await AsyncStorage.getItem('userid');
    await customRequest(`student/course/${slug}/${userID}`, 'GET').then(res => {
      // console.log('slugReturn', res);
      setContact(res?.contact?.detail);
      setSubscription(res.subscription);
      setCourseDetail(res?.data);
      setIsLoading(false);
    });
  };
  const subscriptionApi = async (id, duration) => {
    let userID = await AsyncStorage.getItem('userid');
    let body = {user_id: userID, course_id: id, expiry_date: duration};
    await customRequest('free-course-subcription', 'POST', body).then(res => {
      // console.log(res);
      if (res?.message == 'course subscription successfully.') {
        ToastAndroid.show('Course Subscribed', ToastAndroid.SHORT);
        navigation.navigate(StackNav.CourseCategory);
      }
    });
  };

  const getCourseContent = async () => {
    let testSeries = [];
    let videos = [];

    await customRequest(`student/course/detail/${id}`, 'GET').then(res => {
      // console.log('id:::', res);
      setCourseContent(res);
      const subModule = res[0].relation?.sub_module;
      // console.log('subModule:::', subModule);
      subModule?.forEach(item => {
        if (item.type === 'Test Series') {
          testSeries.push(item);
        } else if (item.type === 'Recorded Videos') {
          videos.push(item);
        }
      });

      let data = {
        testseries: testSeries,
        video: videos,
      };

      // console.log('DATA;;;;;;;;;;;;;;;;;;;;' + JSON.stringify(data));

      setContents(data);
      //   setIsLoading(false);
    });
  };

  useEffect(() => {
    console.log('contents::::::::::::', contents);
    console.log('courseDetail:::::::', courseDetail);
  }, [contents]);

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
      getCourseDetail();
      getCourseContent();
    }
  }, [isFocused]);

  const CourseDetailInfo = ({icon, data}) => {
    return (
      <View style={localStyles.detailInfo}>
        {icon}
        <CText type={'r14'}>{data}</CText>
      </View>
    );
  };

  const TabTitle = ({title}) => {
    return (
      <TouchableOpacity
        onPress={() => setCurrentTab(title)}
        style={[
          localStyles.tabTitle,
          {
            backgroundColor:
              currentTab == title ? colors.primary : colors.tranparent,
          },
        ]}>
        <CText
          type={'m14'}
          color={
            currentTab == title ? colors.white : colors.notSelectedTextColor
          }>
          {title}
        </CText>
      </TouchableOpacity>
    );
  };
  return (
    <CSafeAreaView style={localStyles.root}>
      <FullScreenLoading isLoading={isLoading} />
      {/* <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          backgroundColor: 'white',
          padding: 6,
          borderRadius: 50,
          zIndex: 1,
          elevation: 10,
        }}>
        <Icons name="arrow-back" color="black" size={28} />
      </TouchableOpacity> */}
      <View style={{height: 220}}>
        <Image
          resizeMode="cover"
          source={
            courseDetail?.mage == undefined || courseDetail?.image == null
              ? require('../../../../assets/images/detail.png')
              : {uri: courseDetail?.image}
          }
          style={{height: 260, width: width}}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            // localStyles.container2,
            {
              backgroundColor: colors.backgroundColor,
            },
          ]}>
          <View style={[localStyles.titleContainer, {marginTop: 15}]}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  tintColor: 'black',
                  top: 6,
                  marginRight: 5,
                }}
                source={IMAGE.STUDENT_COURCES}
              />
              <Text
                numberOfLines={1}
                style={{
                  color: 'black',
                  fontFamily: Montserrat_Medium,
                  letterSpacing: 1,
                  fontSize: 20,
                }}>
                {courseDetail?.name}
              </Text>
            </View>

            <View style={styles.rowSpaceBetween}>
              <View style={styles.rowSpaceBetween}>
                <Image
                  source={
                    colors.backgroundColor == '#171F2C'
                      ? require('../../../../assets/chahalDark.png')
                      : require('../../../../assets/chahalWhite.png')
                  }
                  resizeMode="contain"
                  style={localStyles.avatar}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    width: 15,
                    height: 15,
                    marginRight: 5,
                    tintColor: '#454545',
                    top: 3,
                  }}
                  source={IMAGE.WATCH}
                />
                <Text
                  style={{
                    marginRight: 20,
                    fontFamily: Montserrat_Medium,
                    color: '#454545',
                  }}>
                  {courseDetail?.duration} Days
                </Text>
              </View>
              <View>
                <View>
                  <Text style={{color: 'black', fontFamily: Montserrat_Medium}}>
                    {'\u20B9'}{' '}
                    {courseDetail?.amount == 0.0
                      ? 'Free'
                      : courseDetail?.amount}
                  </Text>
                  {/* <CText
                    type={'r14'}
                    color={colors.gray}
                    align="right"
                    style={{
                      textDecorationLine: 'line-through',
                      textDecorationColor: colors.gray,
                      textDecorationStyle: 'solid',
                    }}>
                    ₹ 999.00
                  </CText> */}
                </View>
              </View>
            </View>
          </View>
          <View style={localStyles.tabContainer}>
            <View
              style={[localStyles.tabBar, {backgroundColor: colors.inputBg}]}>
              <TabTitle title="About" />
              <TabTitle title="Content" />
            </View>
            {currentTab == 'About' ? (
              <About
                description={
                  courseDetail?.description?.replace(/<p>|<\/p>/g, '') == null
                    ? 'No Description'
                    : courseDetail?.description?.replace(/<p>|<\/p>/g, '')
                }
              />
            ) : null}
            {currentTab == 'Content' ? (
              <Reviews
                contents1={contents.testseries}
                contents2={contents.video}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View
        style={[
          localStyles.bottomContainer,
          {backgroundColor: colors.backgroundColor},
        ]}>
        <CButton
          onPress={() =>
            userDetails?.isUserLoggedIn
              ? subscription == null
                ? courseDetail?.amount == 0.0
                  ? subscriptionApi(courseDetail?.id, courseDetail?.duration)
                  : navigation.navigate(StackNav.Payment, {
                      detail: courseDetail,
                      id: route.params.id,
                    })
                : null
              : navigation.navigate(StackNav.Auth)
          }
          title={subscription == null ? 'Subscribe' : 'Subscribed'}
          type="s16"
          containerStyle={localStyles.enrollBtn}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  courseVideo: {
    width: '100%',
    height: '100%',
  },
  videoContainer: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
  },
  videoControl: {
    position: 'absolute',
    ...styles.p20,
    ...styles.pb30,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    ...styles.justifyBetween,
  },
  videoControlContainer: {
    ...styles.rowSpaceBetween,
  },
  playButtonContainer: {
    ...styles.selfCenter,
  },
  slider: {
    flex: 1,
  },
  videoControlContainer2: {
    ...styles.rowSpaceBetween,
  },
  controlStyle: {
    ...styles.rowSpaceBetween,
    gap: moderateScale(10),
  },
  container2: {
    ...styles.flex,
    top: -moderateScale(20),
    borderTopEndRadius: moderateScale(20),
    borderTopStartRadius: moderateScale(20),
    ...styles.pb60,
    ...styles.pv20,
    marginTop: -20,
    marginTop: -20,
  },
  titleContainer: {
    ...styles.mh20,
  },
  avatar: {
    width: moderateScale(80),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
  },
  detailContainer: {
    ...styles.flexRow,
    gap: moderateScale(10),
    ...styles.mh20,
  },
  detailInfo: {
    gap: moderateScale(5),
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  tabBar: {
    borderRadius: moderateScale(50),
    ...styles.rowSpaceBetween,
    padding: moderateScale(8),
    ...styles.mt25,
    ...styles.mh20,
  },
  tabTitle: {
    ...styles.p10,
    ...styles.center,
    ...styles.flex,
    borderRadius: moderateScale(50),
  },
  bottomContainer: {
    ...styles.rowSpaceBetween,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    ...styles.p10,
    ...styles.ph20,
  },
  saveBtn: {
    borderWidth: moderateScale(1),
    width: moderateScale(48),
    borderRadius: moderateScale(18),
    height: moderateScale(48),
  },
  enrollBtn: {
    width: '100%',
    height: moderateScale(48),
  },
});
