import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import BackButton from '../button/BackButton';
import Title from '../text/Title';
import commonStyle from '../../../styles/commonStyles';
import {APP_PADDING_HORIZONTAL} from '../../../themes/commonStyle';
import {spacing} from '../../../styles/spacing';
import {boxShadow} from '../../../styles/Mixins';
import colors from '../../../styles/colors';
import Image from '../Image';
import {ImagePaths} from '../../../utils/imagePaths';
import {useDispatch} from 'react-redux';
import {showDrawer} from '../../../redux/slices/drawerSlice';
import LoginButton from '../LoginButton';

const Header = ({title, showMenu, hideBack, showLogin}) => {
  const dispatch = useDispatch();
  function onPressToggleBtn() {
    dispatch(showDrawer());
  }
  return (
    <View style={styles.mainContainer}>
      <Title title={title} style={styles.title} />
      {hideBack === true ? <></> : <BackButton />}
      {showLogin ? <LoginButton /> : null}
      {showMenu && (
        <TouchableOpacity
          onPress={onPressToggleBtn}
          style={{marginLeft: 'auto'}}>
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
    ...commonStyle.flexDirectionRow,
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    paddingVertical: spacing.PADDING_12,
    borderBottomLeftRadius: spacing.RADIUS_16,
    borderBottomRightRadius: spacing.RADIUS_16,
    backgroundColor: colors.white,
    ...boxShadow(),
  },
  title: {
    position: 'absolute',
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 8,
    textAlign: 'center',
    left: APP_PADDING_HORIZONTAL * 4,
    right: APP_PADDING_HORIZONTAL * 4,
  },
});

export default Header;
