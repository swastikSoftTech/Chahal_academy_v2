import {StyleSheet, TouchableOpacity, View} from 'react-native';
import CommonPopupModal from '../common/modal/CommonPopupModal';
import {boxShadow} from '../../styles/Mixins';
import AttributeKeyValue from '../common/text/AttributeKeyValue';
import Image from '../common/Image';
import {ImagePaths} from '../../utils/imagePaths';
import {spacing} from '../../styles/spacing';
import {textScale} from '../../styles/responsiveStyles';
import colors from '../../styles/colors';
import Title from '../common/text/Title';
import commonStyle from '../../styles/commonStyles';
import {fontNames} from '../../styles/typography';
import LinearGradient from 'react-native-linear-gradient';
import RegularText from '../common/text/RegularText';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';

const TestSeriesAnalyticsModal = ({
  visible,
  onRequestClose,
  average,
  message,
}) => {
  function onPressDone() {
    onRequestClose();
  }
  return (
    <CommonPopupModal
      visible={visible}
      onRequestClose={onRequestClose}
      visibleViewStyle={[boxShadow(), {}]}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Image source={ImagePaths.ANALYST} style={styles.analystImg} />
          <Title title={'Analytics'} style={styles.title} />
        </View>
        <TouchableOpacity onPress={onRequestClose}>
          <Image source={ImagePaths.CLOSE} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>
      <View style={[commonStyle.seprator]} />
      <View style={{gap: spacing.MARGIN_10}}>
        <AttributeKeyValue
          title={'Average'}
          value={parseFloat(average).toFixed(2)}
          titleStyle={styles.titleStyle}
          valueStyle={styles.valueStyle}
        />
        {/* <AttributeKeyValue
          title={'Total Attends'}
          value={'31'}
          titleStyle={styles.titleStyle}
          valueStyle={styles.valueStyle}
        />
        <AttributeKeyValue
          title={'Total Incorrect'}
          value={'313'}
          titleStyle={styles.titleStyle}
          valueStyle={styles.valueStyle}
        /> */}
        <AttributeKeyValue
          title={'Messsage'}
          value={message}
          titleStyle={styles.titleStyle}
          valueStyle={[styles.valueStyle, {color: colors.green400}]}
        />
      </View>
      <TouchableOpacity onPress={onPressDone}>
        <LinearGradient
          colors={['#ec3a7c', '#ff942d']}
          start={{x: 0.5, y: 0}}
          end={{x: 0, y: 0.5}}
          style={styles.testCategoryContainer}>
          <RegularText style={styles.doneText}>Done</RegularText>
        </LinearGradient>
      </TouchableOpacity>
    </CommonPopupModal>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    ...commonStyle.flexDirectionRow,
    justifyContent: 'flex-end',
  },
  headerSubContainer: {
    ...commonStyle.flexDirectionRow,
    position: 'absolute',
    gap: spacing.MARGIN_10,
    width: '100%',
    justifyContent: 'center',
  },
  analystImg: {
    width: spacing.WIDTH_28,
    height: spacing.WIDTH_28,
  },
  closeIcon: {
    width: spacing.WIDTH_24,
    height: spacing.WIDTH_24,
  },
  title: {
    fontSize: textScale(20),
  },
  titleStyle: {
    fontSize: textScale(16),
  },
  valueStyle: {
    fontSize: textScale(16),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
  },
  testCategoryContainer: {
    marginTop: spacing.MARGIN_16,
    padding: spacing.PADDING_6,
    gap: spacing.MARGIN_10,
    alignSelf: 'center',
    borderRadius: spacing.RADIUS_8,
    paddingHorizontal: spacing.PADDING_36,
    alignItems: 'center',
  },
  doneText: {
    color: colors.white,
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    fontSize: textScale(16),
  },
});

export default TestSeriesAnalyticsModal;
