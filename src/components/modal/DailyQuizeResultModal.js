import {StyleSheet, View} from 'react-native';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import {boxShadow} from '../../styles/Mixins';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {convertDateTime} from '../../utils/commonFunction';
import CommonPopupModal from '../common/modal/CommonPopupModal';
import RegularText from '../common/text/RegularText';

const DailyQuizeResultModal = ({
  visible,
  onRequestClose,
  resultData,
  title,
}) => {
  return (
    <CommonPopupModal
      visible={visible}
      onRequestClose={onRequestClose}
      visibleViewStyle={[boxShadow(), {}]}>
      {/* <View style={[commonStyle.flexDirectionRow, {justifyContent: 'center'}]}> */}
      {/* <RegularText style={styles.heading}>{`Daily Quize `} </RegularText> */}
      <RegularText style={styles.heading}>
        {convertDateTime(title, 'DD MMMM YYYY')}
      </RegularText>
      {/* </View> */}
      <RenderTitleValue title={'Total Points'} value={resultData?.totalMarks} />
      <RenderTitleValue
        title={'Your Points'}
        value={parseFloat(resultData?.obtainedMarks).toFixed(2)}
      />
      <RenderTitleValue
        title={'Percentage'}
        value={`${parseFloat(resultData?.percentage).toFixed(2)}%`}
      />
    </CommonPopupModal>
  );
};

const RenderTitleValue = ({title, value}) => {
  return (
    <View
      style={[commonStyle.flexDirectionRow, {marginTop: spacing.MARGIN_10}]}>
      <RegularText style={styles.title}>{title}</RegularText>
      <RegularText style={styles.value}>{value}</RegularText>
    </View>
  );
};
const styles = StyleSheet.create({
  heading: {
    fontSize: textScale(18),
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    textAlign: 'center',
    color: colors.theme,
  },
  title: {
    fontSize: textScale(16),
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    flex: 1,
  },
  value: {
    fontSize: textScale(16),
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
});

export default DailyQuizeResultModal;
