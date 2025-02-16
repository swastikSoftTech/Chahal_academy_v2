import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from '../../../../themes';
// import * as Progress from 'react-native-progress';
import CText from '../../../../components/common/CText';
import {
  Montserrat_Bold,
  Montserrat_Medium,
  deviceWidth,
  moderateScale,
} from '../../../../common/constants';
import { Right_Arrow_Icon } from '../../../../assets/svgs';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { StackNav } from '../../../../navigation/NavigationKeys';
import Book from '../../../../assets/svgs/book.svg';
import TestSVG from '../../../../assets/svgs/testSeries.svg';
import Timer from '../../../../assets/svgs/time_icon.svg';
import * as IMAGE from '../../../../assets/images/indexnew';
import LinearGradient from 'react-native-linear-gradient';
const Categories = ({ data }) => {
  const [refreshing, setRefreshing] = useState(false);
  // console.log('data', data);
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const onPressCategory = (title = '', data = []) => {
    navigation.navigate(StackNav.Courses, {
      title: title,
      data: data,
    });
  };

  const duration = time => {
    var hour = Math.floor(time / 3600);
    var min = Math.round((time - hour * 3600) / 60);
    return `${hour} hr ${min} mins`;
  };

  const renderCategoryItem = (item, index) => {
    // console.log('item', item.image);
    return (
      <TouchableOpacity
        onPress={() => onPressCategory(item.courseName, { id: item.id })}
        style={{ padding: 10 }}>
        <View
          style={{
            width: '100%',
            padding: 15,
            borderRadius: 10,
            elevation: 5,
            backgroundColor: 'white',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  tintColor: '#0a121a',
                  alignSelf: 'flex-start',
                  top: 5,
                }}
                source={IMAGE.STUDENT_COURCES}
              />
              <Text
                numberOfLines={2}
                style={{
                  color: '#0a121a',
                  fontFamily: Montserrat_Bold,
                  letterSpacing: 1,
                  fontSize: 18,
                  marginLeft: 5,
                }}>
                {item.courseName}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: 12, flex: 1, alignItems: 'center' }} >
            <View>
              <Image
                style={{
                  width: 150,
                  height: 75,
                  borderRadius: 5,
                  marginTop: 10,
                }}
                source={{ uri: item.image }}
              />
              {/* <View
                style={{
                  width: 40,
                  height: 40,
                  position: 'absolute',
                  zIndex: 1000,
                  right: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  top: 10,
                }}>
                <LinearGradient
                  colors={['#d418a0', '#ec3a7c', '#ff942d', '#ffcc00']}
                  style={{
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    borderBottomLeftRadius: 22,
                  }}
                  start={{ x: 0.5, y: 0 }}
                  end={{ x: 0, y: 0.5 }}
                />
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    fontFamily: Montserrat_Medium,
                  }}>
                  New
                </Text>
              </View> */}
            </View>
            <View style={{ flex: 1 }} >
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                  }}>
                  <Image
                    style={{ width: 16, height: 16, top: 1 }}
                    source={IMAGE.VIDEO}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: 'black',
                      fontFamily: Montserrat_Medium,
                    }}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    Total Videos : {item.count.totalVideos} Videos
                  </Text>
                </View>
              </View>

              <View style={{ marginTop: 10 }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                  <Image
                    style={{ width: 16, height: 16, top: 1 }}
                    source={IMAGE.WATCH}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: 'black',
                      fontFamily: Montserrat_Medium,
                    }}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    Duration : {duration(item.count.durantion)}
                  </Text>
                </View>
              </View>
              <View style={{ marginTop: 10 }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                  <Image
                    style={{ width: 16, height: 16, top: 1, tintColor: 'black' }}
                    source={IMAGE.PLAY}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      color: '#454545',
                      fontFamily: Montserrat_Medium,
                    }}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                  >
                    Total Watched Videos{' '}
                  </Text>
                </View>
              </View>
              <View
                style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                {/* <Progress.Bar
              style={{alignSelf: 'flex-start'}}
              width={deviceWidth / 1.5}
              progress={item.count.watchCount / item.count.totalVideos}
              color="#38AD62"
            /> */}
                <Text
                  style={{
                    color: '#454545',
                    top: -7.5,
                    marginLeft: 2,
                    fontFamily: Montserrat_Medium,
                    letterSpacing: 0.5,
                  }}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {' '}
                  {item.count.watchCount} Videos
                </Text>
              </View>
            </View>
          </View>

        </View>
      </TouchableOpacity>
      // <TouchableOpacity
      //   key={index}
      //   onPress={() => onPressCategory(item.courseName, { id: item.id })}
      //   style={[
      //     localStyles.categoryContainer,
      //     {
      //       backgroundColor: colors.inputBg,
      //       shadowColor: '#000',
      //       elevation: 5,
      //       shadowOffset: {width: 3, height: 3},
      //       shadowOpacity: 0.5,
      //       shadowRadius: 2,
      //       height: 110,
      //     },
      //   ]}>
      //   <View style={styles.rowStart}>
      //     <View style={localStyles.iconStyle}>
      //       <Image
      //         resizeMode="contain"
      //         style={{ height: 55, width: 55 }}
      //         source={
      //           item?.image == null || item?.image == undefined
      //             ? {
      //                 uri: 'https://images.pexels.com/photos/5940721/pexels-photo-5940721.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1/',
      //               }
      //             : {
      //                 uri: `${item.image}`,
      //               }
      //         }
      //       />
      //     </View>
      //     <View style={{ rowGap: 10, marginLeft: 30, maxWidth: '70%' }}>
      //       <CText
      //         type={'m16'}
      //         numberOfLines={1}
      //         style={[styles.ml10, { fontWeight: 'bold' }]}>
      //         {item.courseName}
      //       </CText>
      //       <View style={{ flexDirection: 'row', columnGap: 15 }}>
      //         <View style={{ flexDirection: 'row' }}>
      //           <TestSVG height={20} width={20} />
      //           <CText type={'m12'} style={styles.ml5}>
      //             {item.count.totalVideos} Videos
      //           </CText>
      //         </View>
      //         <View style={{ flexDirection: 'row' }}>
      //           <Timer height={20} width={20} />
      //           <CText type={'m12'} style={styles.ml5}>
      //             {duration(item.count.durantion)}
      //           </CText>
      //         </View>
      //       </View>
      //       <Progress.Bar
      //         style={{ alignSelf: 'flex-end' }}
      //         width={deviceWidth / 2}
      //         progress={item.count.watchCount / item.count.totalVideos}
      //         color="#38AD62"
      //       />
      //     </View>
      //   </View>
      //   <Right_Arrow_Icon />
      // </TouchableOpacity>
    );
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => renderCategoryItem(item, index)}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 150 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={() => { }} />
        }
      />
    </View>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  iconStyle: {
    width: moderateScale(48),
    height: moderateScale(48),
  },
  categoryContainer: {
    ...styles.rowSpaceBetween,
    ...styles.p15,
    ...styles.mh25,
    ...styles.mb25,
    borderRadius: moderateScale(16),
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
});

export default Categories;
