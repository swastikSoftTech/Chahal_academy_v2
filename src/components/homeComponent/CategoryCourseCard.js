import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import React from 'react';
import {styles} from '../../themes';
import {
  Montserrat_Medium,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../../common/constants';
import {useSelector} from 'react-redux';
import CText from '../common/CText';
import {Star_Icon_Filled, User_Icon} from '../../assets/svgs';
import * as IMAGE from '../../assets/images/indexnew';
const CategoryCourseCard = ({
  item,
  name,
  onPressCard = () => {},
  cardStyle,
}) => {
  const colors = useSelector(state => state.theme.theme);
  //console.log('custom', item);
  // console.log('CategoryCourseCard', name, item);
  return (
    <TouchableOpacity
      onPress={onPressCard}
      style={[
        {
          width: '48%',
          borderRadius: 8,
          elevation: 5,
          backgroundColor: 'white',
          marginTop: 5,
        },
        cardStyle,
      ]}>
      <Image
        resizeMode="center"
        style={{
          width: '100%',
          height: 100,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
        }}
        source={
          item?.image == null
            ? {
                uri: 'https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
              }
            : {uri: String(item?.image)}
        }
      />
      <View style={{paddingHorizontal: 5, marginTop: 8, marginBottom: 8}}>
        {/* {item?.course_count_count ? (
          <View
            style={{flexDirection: 'row', width: '100%', alignItems: 'center'}}>
            <Image
              style={{width: 12, height: 12, tintColor: '#454545'}}
              source={IMAGE.STUDENT_COURCES}
            />
            <Text
              style={{
                marginRight: 10,
                marginLeft: 3,
                fontFamily: Montserrat_Medium,
                color: 'black',
              }}
              numberOfLines={1}>
              Number of courses : {item?.course_count_count}
            </Text>
          </View>
        ) : null} */}

        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 18, height: 18, tintColor: '#454545'}}
            source={IMAGE.BOOK}
          />
          <Text
            style={{
              marginRight: 10,
              marginLeft: 3,
              fontFamily: Montserrat_Medium,
              color: '#454545',
              fontSize: 15,
              width: 120,
              // textTransform: 'capitalize',
            }}>
            {item.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    // <TouchableOpacity
    //   onPress={onPressCard}
    //   style={[
    //     localStyles.cardContainer,
    //     {
    //       backgroundColor: colors.socialButtonBackground,
    //       width: deviceWidth / 2 - 18,
    //       height: deviceWidth / 2.5,
    //       marginRight: 10,
    //       marginBottom: 10,
    //     },
    //   ]}>
    //   <Image
    //     source={
    //       item?.image == null
    //         ? {
    //             uri: 'https://images.pexels.com/photos/373465/pexels-photo-373465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    //           }
    //         : {uri: String(item?.image)}
    //     }
    //     style={localStyles.cardImage}
    //   />
    //   <View
    //     style={[styles.mt5, {alignItems: 'center', justifyContent: 'center'}]}>
    //     {item?.course_count_count ? (
    //       <View
    //         style={{
    //           height: getHeight(20),
    //         }}>
    //         <CText type={'s14'} numberOfLines={1}>
    //           Number of courses : {item?.course_count_count}
    //         </CText>
    //       </View>
    //     ) : null}

    //     <CText type={'r14'}>{item?.name}</CText>
    //   </View>
    // </TouchableOpacity>
  );
};

const localStyles = StyleSheet.create({
  cardContainer: {
    ...styles.p10,
    ...styles.mr18,
    ...styles.ml18,
    borderRadius: moderateScale(20),
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 10,
    width: moderateScale(335),
  },
  cardImage: {
    width: '100%',
    height: deviceWidth / 4,
    borderRadius: moderateScale(10),
    resizeMode: 'contain',
  },
  ratingDetail: {
    ...styles.rowSpaceBetween,
    ...styles.mt5,
  },
  progressBar: {
    height: moderateScale(4),
    width: '85%',
    borderRadius: moderateScale(4),
  },
});

export default CategoryCourseCard;
