import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {commonColor} from '../../themes';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

const FullScreenLoading = ({isLoading}) => {
  return (
    <>
      {isLoading ? (
        <View style={styles.mainContainer}>
          <ActivityIndicator size={164} color={commonColor.primary} />
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo1-no-bg.png')}
              style={styles.appLogo}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    width: viewportWidth,
    height: viewportHeight,
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99999,
    // opacity: 0.5,
  },
  logoContainer: {
    width: 125,
    height: 125,
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appLogo: {
    width: 120,
    height: 50,
  },
});

export default FullScreenLoading;
