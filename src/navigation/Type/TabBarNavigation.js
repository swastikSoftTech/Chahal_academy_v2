import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AllCourses from '../../assets/svgs/allCourses.svg';
import Book from '../../assets/svgs/book.svg';
import Zoom from '../../assets/svgs/zoom.svg';
import {moderateScale} from '../../common/constants';
import {colors, styles} from '../../themes';
import {TabNav} from '../NavigationKeys';
import {TabRoute} from '../NavigationRoutes';

import {useSelector} from 'react-redux';
import {
  AllCoursesDarkUnFill,
  AllCoursesFill,
  BookDarkUnFill,
  BookFill,
  Home_Dark_Fill_Icon,
  Home_Dark_UnFill_Icon,
  Home_Light_Fill_Icon,
  Home_Light_UnFill_Icon,
  Profile_Dark_Fill_Icon,
  Profile_Dark_UnFill_Icon,
  Profile_Light_Fill_Icon,
  Profile_Light_UnFill_Icon,
  Reel_Icon,
  Reel_IconDarkUnFill,
  ReelIconFill,
  ZoomDarkUnFill,
  ZoomFill,
} from '../../assets/svgs';
import Home from '../../screens/home';
import {spacing} from '../../styles/spacing';
import {SCREEN_COURSE_CATEGORY} from '../../utils/constants';
import CourseCategory from '../../screens/courseCategory';

export default function TabBarNavigation() {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);
  const Tab = createBottomTabNavigator();

  return (
    // <View style={{flex: 1, backgroundColor: 'transparent'}}>
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgroundColor,
          // backgroundColor: '#6439FF',
          // backgroundColor: '#F5F5F5',
          // backgroundColor: '#161D6F',
          // backgroundColor: 'rgba(95, 92, 240, 1)',
          height: spacing.HEIGHT_64,
          borderTopLeftRadius: spacing.RADIUS_24,
          borderTopRightRadius: spacing.RADIUS_24,
          paddingTop: spacing.PADDING_8,

          // minHeight: spacing.HEIGHT_64,

          // overflow: 'hidden',
          // shadowColor: '#000000',
          // shadowOffset: {height: -14, width: 1},
          // shadowOpacity: 0.8,
          // shadowRadius: 5,
          // elevation: -14,
          // borderWidth: 1,
          // zIndex: 9999,
        },
        tabBarShowLabel: false,
      }}
      initialRouteName={TabNav.HomeTab}>
      <Tab.Screen
        name={TabNav.HomeTab}
        component={Home}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={[styles.itemsCenter]}>
                {colors.dark == 'dark' ? (
                  <Home_Dark_Fill_Icon />
                ) : (
                  <Home_Light_Fill_Icon />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Home_Dark_UnFill_Icon />
                ) : (
                  <Home_Light_UnFill_Icon />
                )}
              </View>
            ),
        }}
      />
      {/* <Tab.Screen
        name={TabNav.TargetTab}
        component={TabRoute.TargetTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? <Target /> : <TargetFill />}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? <TargetDarkUnFill /> : <Target />}
              </View>
            ),
        }}
      /> */}
      <Tab.Screen
        // name={TabNav.AllCourses}
        // component={TabRoute.AllCourses}
        name={SCREEN_COURSE_CATEGORY}
        component={CourseCategory}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <AllCourses height={30} width={30} />
                ) : (
                  <AllCoursesFill height={30} width={30} />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <AllCoursesDarkUnFill height={30} width={30} />
                ) : (
                  <AllCourses height={30} width={30} />
                )}
              </View>
            ),
        }}
      />
      <Tab.Screen
        name={TabNav.CourseList}
        component={TabRoute.CourseList}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Reel_Icon height={30} width={30} />
                ) : (
                  <ReelIconFill height={30} width={30} />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Reel_IconDarkUnFill height={30} width={30} />
                ) : (
                  <Reel_Icon height={30} width={30} />
                )}
              </View>
            ),
        }}
      />
      <Tab.Screen
        name={TabNav.TestSeriesCategory}
        component={TabRoute.TestSeriesSubjects}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Book height={30} width={30} />
                ) : (
                  <BookFill height={30} width={30} />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <BookDarkUnFill height={30} width={30} />
                ) : (
                  <Book height={30} width={30} />
                )}
              </View>
            ),
        }}
      />

      <Tab.Screen
        name={TabNav.ZoomTab}
        component={TabRoute.ZoomTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Zoom height={25} width={25} />
                ) : (
                  <ZoomFill height={25} width={25} />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <ZoomDarkUnFill height={25} width={25} />
                ) : (
                  <Zoom height={25} width={25} />
                )}
              </View>
            ),
        }}
      />
      {/* <Tab.Screen
        name={TabNav.SearchTab}
        component={TabRoute.SearchTab}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Search_Dark_Fill_Icon />
                ) : (
                  <Search_Light_Fill_Icon />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Search_Dark_UnFill_Icon />
                ) : (
                  <Search_Light_UnFill_Icon />
                )}
              </View>
            ),
        }}
      /> */}
      <Tab.Screen
        name={TabNav.ProfileTab}
        component={TabRoute.ProfileTab}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Profile_Dark_Fill_Icon />
                ) : (
                  <Profile_Light_Fill_Icon />
                )}
              </View>
            ) : (
              <View style={styles.itemsCenter}>
                {colors.dark == 'dark' ? (
                  <Profile_Dark_UnFill_Icon />
                ) : (
                  <Profile_Light_UnFill_Icon />
                )}
              </View>
            ),
        }}
      />
    </Tab.Navigator>
    // </View>
  );
}

const localStyle = StyleSheet.create({
  tabBarScanIconStyle: {
    top: 0,
  },
  iconContainer: {
    position: 'absolute',
    // top: -moderateScale(20),
    borderColor: colors.white,
  },
});
