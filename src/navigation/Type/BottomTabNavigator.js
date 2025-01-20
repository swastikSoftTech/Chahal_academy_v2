import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet, View} from 'react-native';
// import RegularText from '../components/common/RegularText';
import HomeScreen from '../components/screens/appScreens/home';
import MyTradesScreen from '../components/screens/appScreens/myTrades';
import RewardsScreen from '../components/screens/appScreens/rewards';
// import {textScale} from '../styles/responsiveStyles';
// import {spacing} from '../styles/spacing';
// import {fontNames} from '../styles/typography';
import * as Utils from '../utility';
import colors from '../../styles/colors';
import RegularText from '../../components/common/text/RegularText';
import {spacing} from '../../styles/spacing';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
// import colors from '../utility/colors';
// import { Images } from '../utility/imagePaths';

const Tab = createBottomTabNavigator();
const tabBarColor = colors.white;

let tabData = [
  {
    label: Strings.home,
    name: Utils.Constants.SCREEN_HOME,
    active_icon: Images.IMG_HOME_ACTIVE,
    inactive_icon: Images.IMG_HOME_INACTIVE,
    component: HomeScreen,
  },
  // {
  //   label: Strings.local_events,
  //   name: Utils.Constants.SCREEN_LOCAL_QUESTIONS,
  //   active_icon: Images.IMG_LOCAL_QUESTION_ACTIVE,
  //   inactive_icon: Images.IMG_LOCAL_QUESTION_INACTIVE,
  //   component: LocalQuestionsScreen,
  // },
  // {
  //   label: Strings.search,
  //   name: Utils.Constants.SCREEN_SEARCH,
  //   active_icon: Images.IMG_SEARCH_ACTIVE,
  //   inactive_icon: Images.IMG_SEARCH_INACTIVE,
  //   component: SearchScreen,
  // },
  // {
  //   label: Strings.head_to_head,
  //   name: Utils.Constants.SCREEN_HEAD_TO_HEAD,
  //   active_icon: Images.IMG_MY_TRADES_ACTIVE,
  //   inactive_icon: Images.IMG_MY_TRADES_INACTIVE,
  //   component: HeadToHead,
  // },
  {
    label: Strings.my_trades,
    name: Utils.Constants.SCREEN_MY_TRADES,
    active_icon: Images.IMG_MY_TRADES_ACTIVE,
    inactive_icon: Images.IMG_MY_TRADES_INACTIVE,
    component: MyTradesScreen,
  },
  {
    label: Strings.rewards,
    name: Utils.Constants.SCREEN_REWARDS,
    active_icon: Images.IMG_REWARDS_ACTIVE,
    inactive_icon: Images.IMG_REWARDS_INACTIVE,
    component: RewardsScreen,
  },
];

function BottomTabs({}) {
  function handleTabState(state) {}

  function onTabPress(e, navigation, rte) {}

  return (
    <View
      style={{flex: 1, backgroundColor: colors.transparent, borderWidth: 1}}>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'red',
            paddingBottom: 0,
            height: spacing.HEIGHT_64,
          },
          tabBarAllowFontScaling: true,
          headerShown: false,
        }}
        sceneContainerStyle={{borderWidth: 1}}>
        {tabData.map((item, index) => {
          return (
            <Tab.Screen
              key={`bottomTabMain_${index.toString() + bottomTabKeyName}`}
              name={item.name}
              component={item.component}
              listeners={({navigation, route}) => ({
                tabPress: e => {
                  onTabPress(e, navigation, route);
                },
                state: e => {
                  handleTabState(e);
                },
              })}
              options={{
                tabBarLabel: item.label,
                tabBarIcon: ({focused}) => {
                  return (
                    <View style={styles.mainContainer}>
                      <Image
                        source={focused ? item.active_icon : item.inactive_icon}
                        style={{
                          tintColor: focused ? colors.theme : colors.grey600,
                          width: spacing.WIDTH_20,
                          height: spacing.WIDTH_20,
                        }}
                        resizeMode="contain"
                      />
                      <RegularText
                        style={[
                          styles.label,
                          {color: focused ? colors.theme : colors.grey600},
                        ]}>
                        {item.label}
                      </RegularText>
                    </View>
                  );
                },
              }}
            />
          );
        })}
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: spacing.FULL_WIDTH / tabData.length,
  },
  label: {
    fontSize: textScale(11),
    fontFamily: fontNames.OPEN_SANS_MEDIUM,
    marginTop: spacing.MARGIN_6,
  },
});

export default React.memo(BottomTabs);
