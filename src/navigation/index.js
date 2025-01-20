import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import StackNavigation from './Type/StackNavigation';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      {/* <StatusBar backgroundColor={colors.light.backgroundColor} /> */}
      <StackNavigation />
    </NavigationContainer>
  );
}
