import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Cross_Close_Icon, Right_Arrow_Icon} from '../../assets/svgs';
import {StackNav} from '../../navigation/NavigationKeys';
import {closeDrawer} from '../../redux/slices/drawerSlice';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {
  CURRENT_AFFAIR_CATEGORY_TYPE,
  SCREEN_MATERIAL_STORE,
} from '../../utils/constants';
import {ImagePaths} from '../../utils/imagePaths';
import Image from '../common/Image';
import RegularText from '../common/text/RegularText';

const Menu = ({icon, title, onPress}) => {
  return (
    <TouchableOpacity style={styles.menuContainer} onPress={onPress}>
      <Image
        source={icon}
        style={{height: spacing.WIDTH_24, width: spacing.WIDTH_24}}
      />
      {/* <View style={{height: spacing.WIDTH_24, width: spacing.WIDTH_24}}>
        {icon ? icon : null}
      </View> */}
      <RegularText style={styles.menuTitle}>{title}</RegularText>
      <Right_Arrow_Icon />
    </TouchableOpacity>
  );
};

const DrawerLayout = ({onClose}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const currentAffairesMenuData = [
    {
      title: 'Answer Writing',
      icon: ImagePaths.ANSWER_WRITING,
      type: CURRENT_AFFAIR_CATEGORY_TYPE.ANSWER_WRITING,
    },
    {
      title: 'Daily Quiz',
      icon: ImagePaths.QUESTION_ANSWER,
      type: CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_QUIZE,
    },
  ];

  function onPressDashboard() {
    navigation.navigate(StackNav.Dashboard);
    dispatch(closeDrawer());
  }

  function onPressMaterialStore() {
    navigation.navigate(SCREEN_MATERIAL_STORE);
    dispatch(closeDrawer());
  }

  function onPressCurrentAffairs() {
    navigation.navigate(StackNav.CurrentAffairCategory);
    dispatch(closeDrawer());
  }

  const onSelectCurrentAffair = (type, title) => {
    if (type === CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_MAGAZINE) {
      return navigation.navigate(StackNav.CurrentAffairDetail, {
        type: type,
        name: title,
      });
    }
    navigation.navigate(StackNav.CurrentAffairListing, {
      currentAffairCategory: {
        type: type,
        name: title,
      },
    });
    dispatch(closeDrawer());
  };
  function onPressMagazine() {
    navigation.navigate(StackNav.MagazinesCategory);
    dispatch(closeDrawer());
  }
  function onPressAboutUs() {
    navigation.navigate('AboutUs');
    dispatch(closeDrawer());
  }
  function onPressTermAndCondition() {
    navigation.navigate('TermsAndCondition');
    dispatch(closeDrawer());
  }

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity style={styles.close} onPress={onClose}>
        <Cross_Close_Icon width={spacing.WIDTH_24} height={spacing.WIDTH_24} />
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image source={ImagePaths.MALE_ICON} style={styles.profileIcon} />
        <RegularText style={styles.username}>Chahal Academy</RegularText>
      </View>
      <View style={styles.seprator} />
      {/* <Menu
        title={'Dashboard'}
        icon={ImagePaths.DASHBOARD}
        onPress={onPressDashboard}
      /> */}
      <Menu
        title={'Books Store'}
        icon={ImagePaths.STORE}
        onPress={onPressMaterialStore}
      />
      {/* <Menu
        title={'UPSC-CSE'}
        //         icon={ImagePaths.STORE}
{<Course />}
        onPress={() => navigation.navigate(StackNav.UPSC_CSE)}
      /> */}
      <Menu
        title={'Current Affairs'}
        icon={ImagePaths.NEWS}
        onPress={onPressCurrentAffairs}
      />
      {currentAffairesMenuData.map(menu => (
        <Menu
          title={menu.title}
          icon={menu.icon}
          onPress={() => onSelectCurrentAffair(menu.type, menu.title)}
        />
      ))}
      <Menu
        title={'Free Magazines'}
        icon={ImagePaths.MAGAZINE}
        onPress={onPressMagazine}
      />
      {/* <Menu
        title={'Selections'}
        icon={<Selections />}
        onPress={() => navigation.navigate(StackNav.SelectionScreen)}
      /> */}
      {/* <Menu
        title={'Admission'}
        icon={<Admission />}
        onPress={() => navigation.navigate(StackNav.Admission)}
      /> */}
      {/* <Menu
        title={'Blogs'}
        icon={<Admission />}
        onPress={() => navigation.navigate('Blogs')}
      /> */}
      <Menu
        title={'About Us'}
        icon={ImagePaths.ABOUT}
        onPress={onPressAboutUs}
      />
      {/* <Menu
        title={'Terms and condition'}
        icon={ImagePaths.TERMS_AND_CONDITION}
        onPress={onPressTermAndCondition}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
  },
  close: {
    alignSelf: 'flex-end',
    marginTop: spacing.MARGIN_12,
  },
  profileContainer: {
    // alignSelf: 'center',
    alignItems: 'center',
  },
  profileIcon: {
    width: spacing.WIDTH_80,
    height: spacing.WIDTH_80,
    borderRadius: spacing.RADIUS_50,
  },
  username: {
    fontSize: textScale(15),
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
  seprator: {
    height: spacing.HEIGHT_2,
    backgroundColor: colors.grey300,
    marginVertical: spacing.MARGIN_16,
  },
  menuContainer: {
    ...commonStyle.flexDirectionRow,
    marginBottom: spacing.MARGIN_20,
    gap: spacing.MARGIN_12,
  },
  menuTitle: {
    flex: 1,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    fontSize: textScale(15),
  },
});

export default DrawerLayout;
