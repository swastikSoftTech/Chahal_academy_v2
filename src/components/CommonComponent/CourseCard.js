import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from '../../themes';
import { useSelector } from 'react-redux';
import {
  Montserrat_Medium,
  deviceWidth,
  getHeight,
  getWidth,
  moderateScale,
  noDataImage,
} from '../../common/constants';
import CText from '../common/CText';
import { Right_Arrow_Icon, Star_Icon_Filled, User_Icon } from '../../assets/svgs';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNav } from '../../navigation/NavigationKeys';
const CourseCard = ({ item, courseSlug, index }) => {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  console.log('preItem-----', item, courseSlug);
  return (
    <View >
      {item.subModuleName == undefined || item.subModuleName == null ?
        <View>
          <Image
            source={{ uri: noDataImage }}
            style={{
              width: getWidth(375),
              height: getWidth(375),
              justifyContent: 'center',
              alignItems: 'center',
            }}

          />
          <CText>No Data Available</CText>
        </View>

        :
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(StackNav.SubjectVideos, {
              item: item,
              courseSlug: courseSlug,
            })
          }
          style={[
            localStyles.courseContainer,
            {
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              flexDirection: "row", justifyContent: "space-between",marginTop:5
            },
          ]}>
          <View style={{ width: '25%', }}>
            <Image
              source={{
                uri: 'https://img.freepik.com/free-vector/e-sport-game-streaming-abstract-concept-illustration_335657-3855.jpg?w=1480&t=st=1714807290~exp=1714807890~hmac=9280f992c3a172334586c184273bd81acad2073a527cd92c7996046d2536d2d1',
              }}
              style={localStyles.cardImage}
            />
          </View>
          <View
            style={[
              styles.ml10, { justifyContent: "center", width: "60%"}]}>
            {
              item.title !== undefined && (
                <Text
                  onPress={() => { console.log('helo', item.title) }}
                  style={{ fontFamily: Montserrat_Medium, color: 'black', fontSize: 17, width: 150 }}
                  numberOfLines={2}>
                  {item.title}
                </Text>
              )
            }

            <View style={{ flexDirection: "row", }}>
              <Text style={{ fontFamily: Montserrat_Medium, color: 'black', fontSize: 17 }} numberOfLines={2} >
                {item?.subModuleName}
              </Text>
            </View>

          </View>


          <Right_Arrow_Icon />
        </TouchableOpacity>
      }
    </View>
  );
};

export default CourseCard;

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
    borderRadius: 5,
    width: 90,
    resizeMode: 'cover',
  },
  ratingDetail: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
});
