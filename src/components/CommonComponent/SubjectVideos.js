import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import {customRequest} from '../../api/customRequest';
import * as IMAGE from '../../assets/images/indexnew';
import {Right_Arrow_Icon} from '../../assets/svgs';
import {
  Montserrat_Medium,
  deviceWidth,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import {styles} from '../../themes';
import {logoutUser} from '../../utils/commonFunction';
import CHeader from '../common/CHeader';
import FullScreenLoading from '../common/FullScreenLoading';
import LoginButton from '../common/LoginButton';
import Header from '../common/header/Header';

const SubjectVideos = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const colors = useSelector(state => state.theme.theme);
  const userDetails = useSelector(state => state.USER_SLICE);
  // console.log(
  //   'preItemsubjectVideo',
  //   route.params.item,
  //   route.params.courseSlug,
  // );
  const [subjectVideos, setSubjectVideos] = useState([]);
  const [openData, setOpenData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [authenticated, setAuthenticated] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      // setAuthenticated(true);
      subjectVideoList(true);
    } else if (response?.message == 'Unauthenticated.') {
      logoutUser();
      subjectVideoList(false);
    }
  };

  const subjectVideoList = async authenticated => {
    if (authenticated) {
      customRequest(
        `student/videos/submodule/${route?.params?.courseSlug}/${route?.params?.item?.subModuleSlug}`,
        'GET',
      ).then(res => {
        console.log('AuthresponseModule', res.data.length);
        setSubjectVideos(res);
        setIsLoading(false);
      });
    } else {
      customRequest(
        `student/universalviewVideo/${route?.params?.courseSlug}/${route?.params?.item?.subModuleSlug}`,
        'GET',
      ).then(res => {
        console.log('UnAuthresponseModule', res);
        setOpenData(res);
        setIsLoading(false);
      });
    }
    return;
  };
  const onRefresh = () => {
    setRefreshing(true);
    tokenCheck();
    setRefreshing(false);
  };

  useEffect(() => {
    if (isFocused) {
      tokenCheck();
    }
  }, [isFocused, userDetails?.isUserLoggedIn]);

  const renderCategoryItem = (item, index) => {
    //console.log('itemVideo---', JSON.stringify(item));
    const originalDate = new Date(item.videos[0].created_at);
    const date = originalDate.toLocaleDateString('en-US');
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(StackNav.CourseDetail, {
            linkC: item?.videos[0].link,
            link: item?.recorded_video_id,
            description: item?.videos[0]?.description,
            title: item?.videos[0]?.title,
            pdfs: item?.videos[0]?.video_pdfs,
          })
        }
        style={[
          localStyles.courseContainer,
          {
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {width: 3, height: 3},
            shadowOpacity: 0.5,
            shadowRadius: 2,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            marginTop: index === 0 ? 15 : 0,
          },
        ]}>
        <View style={{width: '25%'}}>
          <Image
            source={{
              uri: 'https://img.freepik.com/free-vector/internet-lessons-searching-remote-university-educational-programs-online-classes-website-high-school-student-with-magnifying-glass-cartoon-character_335657-3269.jpg?w=1480&t=st=1714807064~exp=1714807664~hmac=46e43924260e23c72571a8dc8fb11807734e630e47948e44eb99f594cee034a4',
            }}
            style={localStyles.cardImage}
          />
        </View>
        <View style={[styles.ml10, {justifyContent: 'center', width: '60%'}]}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: Montserrat_Medium,
              color: 'black',
              fontSize: 16,
            }}>
            {item.videos[0].title}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 14, height: 14, tintColor: '#454545', top: -2}}
              source={IMAGE.WATCH}
            />
            <Text
              numberOfLines={1}
              style={{
                color: '#454545',
                fontFamily: Montserrat_Medium,
                marginLeft: 5,
                fontSize: 13,
              }}>
              {date}
            </Text>
          </View>
        </View>
        <Right_Arrow_Icon />
      </TouchableOpacity>
    );
  };
  return (
    <CSafeAreaView>
      <FullScreenLoading isLoading={isLoading} />
      {userDetails?.isUserLoggedIn ? (
        <View style={{flex: 1}}>
          {/* <CHeader
            title={route.params.courseSlug}
            isHideBack={false}
            customTextStyle={localStyles.headerText}
          /> */}
          <Header title={'Live Classes'}  />
          {/* <View style={{padding: 10}}> */}
          <FlatList
            data={subjectVideos?.data}
            showsVerticalScrollIndicator={false}
            renderItem={({item, index}) => renderCategoryItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            // contentContainerStyle={{
            //   gap: moderateScale(25),
            //   ...styles.pv25,
            // }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          {/* </View> */}
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
              title={route.params.courseSlug}
              isHideBack={false}
              customTextStyle={localStyles.headerText}
            />
            <View>
              <LoginButton />
            </View>
          </View>
          {openData?.data?.length > 0 ? (
            <FlatList
              data={openData?.data}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => renderCategoryItem(item, index)}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                gap: moderateScale(25),
                ...styles.pv25,
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          ) : (
            <Image
              source={{uri: noDataImage}}
              style={{width: getWidth(355), aspectRatio: 1, marginTop: '40%'}}
            />
          )}
        </View>
      )}
    </CSafeAreaView>
  );
};

export default SubjectVideos;

const localStyles = StyleSheet.create({
  courseContainer: {
    ...styles.rowSpaceBetween,
    width: deviceWidth - moderateScale(30),
    ...styles.p10,
    ...styles.selfCenter,
    borderRadius: 8,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 10,
  },
  cardImage: {
    height: 70,
    borderRadius: 8,
    width: 90,
    resizeMode: 'cover',
  },
  ratingDetail: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});
