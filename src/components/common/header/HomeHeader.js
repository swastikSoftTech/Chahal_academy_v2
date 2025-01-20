import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {customRequest} from '../../../api/customRequest';
import {StackNav} from '../../../navigation/NavigationKeys';
import colors from '../../../styles/colors';
import commonStyle from '../../../styles/commonStyles';
import {boxShadow} from '../../../styles/Mixins';
import {spacing} from '../../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../../themes/commonStyle';
import {logoutUser} from '../../../utils/commonFunction';
import {ImagePaths} from '../../../utils/imagePaths';
import Button from '../button/Button';
import Image from '../Image';

const HomeHeader = ({toggleDrawer, hideMenu}) => {
  const navigation = useNavigation();
  const userDetails = useSelector(state => state.USER_SLICE);

  // const [authenticated, setAuthenticated] = useState();

  useEffect(() => {
    tokenCheck();
  }, []);

  function onPressLogin() {
    navigation.navigate(StackNav.Auth);
  }
  console.log('userDetails >>', userDetails);

  const tokenCheck = async () => {
    const response = await customRequest('verify_token', 'GET');
    // console.log('tokenCheck', response);
    if (response?.message == 'authenticated') {
      const user = await AsyncStorage.getItem('user');
      // setAuthenticated(true);
    } else if (response?.message == 'Unauthenticated.') {
      logoutUser();
      await AsyncStorage.removeItem('tokenStudent');
    }
  };

  return (
    <View style={styles.mainContainer}>
      <StatusBar backgroundColor={colors.theme} barStyle={'light-content'} />
      <Image source={ImagePaths.CHAHAL_ACADEMY_LOGO} style={styles.logo} />
      <View style={{flex: 1}} />
      {!userDetails?.isUserLoggedIn && (
        <Button
          backgroundColor={colors.white}
          title={'Login'}
          textStyle={styles.loginBtnText}
          buttonStyle={styles.loginBtn}
          onPressButton={onPressLogin}
        />
      )}
      {!hideMenu && (
        <TouchableOpacity
          style={{marginLeft: spacing.MARGIN_12}}
          onPress={toggleDrawer}>
          <Image
            source={ImagePaths.MENU_ICON}
            style={{width: spacing.WIDTH_40, height: spacing.WIDTH_40}}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: colors.appBackgroundColor,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.PADDING_8,
    borderBottomRightRadius: spacing.RADIUS_24,
    borderBottomLeftRadius: spacing.RADIUS_24,
    ...commonStyle.flexDirectionRow,
    // justifyContent: 'space-between',
    ...boxShadow(),
  },
  logo: {
    width: spacing.WIDTH_124,
    height: spacing.HEIGHT_64,
  },
  loginBtn: {
    height: undefined,
    borderRadius: spacing.RADIUS_8,
  },
  loginBtnText: {
    color: colors.theme,
    fontWeight: '800',
    paddingVertical: spacing.PADDING_8,
  },
});

export default HomeHeader;
