import React from 'react';
import {Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {APP_PADDING_HORIZONTAL} from '../../../themes/commonStyle';
import colors from '../../../styles/colors';
import {spacing} from '../../../styles/spacing';
import {ImagePaths} from '../../../utils/imagePaths';
import Image from '../Image';
import {ANIMATION_TYPES, EASING_TYPE} from '../../../utils/constants';

const CommonModal = props => {
  return (
    <>
      {/* {
                props.visible &&
                <>
                    <Animatable.View
                        onPress={() => { props.onRequestClose }}
                        style={[styles.transparentBlackView, props.visible && { backgroundColor: colors.transparentBlack }]}
                        animation={ANIMATION_TYPES.FADE_IN}
                        duration={400}
                        easing={EASING_TYPE.EASE_IN_OUT}
                    >
                    </Animatable.View>

                </>
            } */}
      <Modal
        animationType="slide"
        visible={props.visible}
        onRequestClose={props.onRequestClose}
        transparent={true}
        // {...props}
        >
        <View style={styles.mainContainer}>
          <TouchableOpacity
            activeOpacity={1}
            style={[
              styles.modalTransparentTopContainer,
              props.transparentContainer,
            ]}
            onPress={props.onRequestClose}></TouchableOpacity>
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

CommonModal.prototype = {
  style: 'Object',
};

CommonModal.defaultProps = {
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
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalTransparentTopContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: spacing.FULL_WIDTH,
    position: 'absolute',
    height: spacing.FULL_HEIGHT,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  visibleViewStyle: {
    width: spacing.FULL_WIDTH,
    backgroundColor: colors.white,
    padding: APP_PADDING_HORIZONTAL,
    borderTopLeftRadius: spacing.RADIUS_20,
    borderTopRightRadius: spacing.RADIUS_20,
  },
  closeIconViewStyle: {
    backgroundColor: colors.white,
    padding: spacing.PADDING_8,
    borderRadius: spacing.RADIUS_90,
    marginBottom: spacing.MARGIN_12,
  },
});

export default CommonModal;
