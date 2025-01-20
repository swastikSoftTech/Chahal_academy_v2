import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {spacing} from '../../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../../themes/commonStyle';
import colors from '../../../styles/colors';
import {boxShadow} from '../../../styles/Mixins';
import * as Animatable from 'react-native-animatable';
import {ANIMATION_TYPES, EASING_TYPE} from '../../../utils/constants';

const CommonPopupModal = props => {
  return (
    <>
      {props.visible && (
        <>
          <Animatable.View
            onPress={() => {
              props.onRequestClose;
            }}
            style={[
              styles.transparentBlackView,
              props.visible && {backgroundColor: colors.transparentBlack},
            ]}
            animation={ANIMATION_TYPES.FADE_IN}
            duration={400}
            easing={EASING_TYPE.EASE_IN_OUT}></Animatable.View>
        </>
      )}
      <Modal
        animationType={props?.animationType || 'fade'}
        visible={props.visible}
        onRequestClose={props.onRequestClose}
        transparent={true}
        {...props}>
        <View style={styles.mainContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.modalTransparentTopContainer}
            onPress={props.onRequestClose}
          />
          <View
            activeOpacity={1}
            style={[styles.visibleViewStyle, props.visibleViewStyle]}>
            {props.children}
          </View>
        </View>
      </Modal>
    </>
  );
};

CommonPopupModal.prototype = {
  style: 'Object',
};

CommonPopupModal.defaultProps = {
  children: '',
};

const styles = StyleSheet.create({
  transparentBlackView: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.transparent,
    position: 'absolute',
    paddingHorizontal: -APP_PADDING_HORIZONTAL,
    zIndex: 99999999,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTransparentTopContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  visibleViewStyle: {
    // flex: 1,
    width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL,
    backgroundColor: colors.white,
    padding: APP_PADDING_HORIZONTAL,
    borderRadius: spacing.RADIUS_16,
    position: 'absolute',
    marginHorizontal: APP_PADDING_HORIZONTAL,
    zIndex: 999999,
    ...boxShadow(),
  },
  closeIconViewStyle: {
    backgroundColor: colors.white,
    padding: spacing.PADDING_8,
    borderRadius: spacing.RADIUS_90,
    marginBottom: spacing.MARGIN_12,
  },
});

export default CommonPopupModal;
