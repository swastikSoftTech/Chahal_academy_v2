import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import CommonPopupModal from '../common/modal/CommonPopupModal';
import RegularText from '../common/text/RegularText';
import DailyQuizeForm from '../module/DailyQuizeForm';

const AnswerWritingReplyModal = ({visible, onRequestClose, submitComment}) => {
  //   const navigation = useNavigation();
  function handelFormData(payload) {
    //     console.log(payload);
    //     onRequestClose();
    //     navigation.navigate(StackNav.WebViewScreen);
  }
  return (
    <CommonPopupModal
      visible={visible}
      onRequestClose={onRequestClose}
      transparentContainer={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      visibleViewStyle={[boxShadow(), {}]}>
      <RegularText style={styles.title}>Submit Your Detail</RegularText>
      <DailyQuizeForm handelFormData={submitComment} />
    </CommonPopupModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: textScale(18),
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    textAlign: 'center',
    color: colors.theme,
    // paddingVertical: spacing.PADDING_12,
    // marginBottom: spacing.PADDING_10,
  },
});

export default AnswerWritingReplyModal;
