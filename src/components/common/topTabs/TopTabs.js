import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {spacing} from '../../../styles/spacing';
import {textScale} from '../../../styles/responsiveStyles';
import {fontNames} from '../../../styles/typography';
import colors from '../../../styles/colors';
import {APP_PADDING_HORIZONTAL} from '../../../themes/commonStyle';
// import {textScale} from '../../../styles/responsiveStyles';
// import {spacing} from '../../../styles/spacing';
// import {fontNames} from '../../../styles/typography';
// import colors from '../../../utility/colors';

const Tab = createMaterialTopTabNavigator();

const tabActiveColor = colors.theme;
const tabLabelActiveColor = colors.theme;
const tabLabelInActiveColor = colors.grey600;

export const TopTabContext = React.createContext();

const TopTab = ({
  tabsData,
  scrollEnabled,
  activeColor,
  sharedDataToTabs,
  tabBarContainerHeight,
  inActiveColor,
  initialRouteName,
  backgroundColor,
}) => {
  return (
    <TopTabContext.Provider value={sharedDataToTabs}>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: activeColor
            ? activeColor
            : tabLabelActiveColor,
          tabBarInactiveTintColor: inActiveColor
            ? inActiveColor
            : tabLabelInActiveColor,
          tabBarAllowFontScaling: scrollEnabled == true ? false : true,
          tabBarScrollEnabled: scrollEnabled ? scrollEnabled : false,
          // lazy: true,
          tabBarPressColor: colors.transparent,
          tabBarLabelStyle: {
            fontSize: textScale(12),
            textTransform: 'none',
            fontFamily: fontNames.FONT_PRIMARY_BOLD,
          },
          tabBarStyle: {
            backgroundColor: backgroundColor ? backgroundColor : colors.white,
            // ...boxShadowLess(),
            elevation: 0,
            width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2,
            alignSelf: 'center',
            // height: spacing.HEIGHT_50,
            marginTop: spacing.MARGIN_20,
            borderRadius: spacing.RADIUS_12,
          },
          tabBarContentContainerStyle: {},
          tabBarItemStyle: {},
          tabBarIndicatorContainerStyle: {
            height: tabBarContainerHeight ? tabBarContainerHeight : undefined,
            // height: undefined,
            top: '100%',
            // bottom: spacing.HEIGHT_6,
            backgroundColor: tabBarContainerHeight
              ? colors.grey200
              : 'transparent',
            borderRadius: spacing.RADIUS_90,
          },
          tabBarIndicatorStyle: {
            backgroundColor: activeColor ? activeColor : tabActiveColor,
            height: spacing.HEIGHT_4,
            // borderColor: backgroundColor ? backgroundColor : colors.white,
            borderRadius: tabBarContainerHeight ? spacing.RADIUS_90 : 0,
          },
        }}
        backBehavior="initialRoute"
        initialRouteName={initialRouteName}>
        {tabsData.map((item, index) => {
          return (
            <Tab.Screen
              name={item.tabName}
              listeners={e => {}}
              options={{
                title: item.label,
              }}
              component={item.component}
              key={index.toString() + '_' + item.tabName}
            />
          );
        })}
      </Tab.Navigator>
    </TopTabContext.Provider>
  );
};

export default React.memo(TopTab);
