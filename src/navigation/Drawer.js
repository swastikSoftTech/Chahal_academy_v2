import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Drawer} from 'react-native-drawer-layout';
import DrawerLayout from '../components/module/DrawerLayout';
import colors from '../styles/colors';
import {closeDrawer, showDrawer} from '../redux/slices/drawerSlice';

const DrawerScreen = ({children}) => {
  const dispatch = useDispatch();
  const {isDrawerVisible: visible} = useSelector(state => state.DRAWER_SLICE);

  return (
    <Drawer
      drawerStyle={{
        backgroundColor: colors.appBackgroundColor,
      }}
      open={visible}
      onOpen={() => dispatch(showDrawer())}
      onClose={() => dispatch(closeDrawer())}
      drawerType="front"
      renderDrawerContent={() => (
        <DrawerLayout onClose={() => dispatch(closeDrawer())} />
      )}>
      {children}
    </Drawer>
  );
};

export default DrawerScreen;
