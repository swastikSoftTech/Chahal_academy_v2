import {useState} from 'react';
import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {isInputEmpty} from '../../utils/validators';
import Button from '../common/button/Button';
import TextInput from '../common/input/TextInput';
import CommonPopupModal from '../common/modal/CommonPopupModal';
import RegularText from '../common/text/RegularText';

const AnswerWritingViewModal = ({visible, onRequestClose, data}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  function onPressSubmit() {
    const mobileNumberValidation = isInputEmpty(mobileNumber);

    if (!mobileNumberValidation.success) {
      setMobileNumberError('Please enter your mobile number');
    } else {
      setMobileNumberError('');
    }
    if (!mobileNumberValidation.success) return;

    const payload = {
      mobileNumber: mobileNumber,
    };
    console.log('payload', payload);
  }
  return (
    <CommonPopupModal
      visible={visible}
      onRequestClose={onRequestClose}
      visibleViewStyle={[boxShadow(), {}]}>
      <RegularText style={styles.title}>Submit Your Number</RegularText>
      <TextInput
        keyboardType={'number-pad'}
        label={'Phone Number'}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeHolder={'Enter your mobile number'}
        maxChar={10}
        error={mobileNumberError}
      />
      <Button
        title={'Download'}
        buttonStyle={styles.submitButtonStyle}
        onPressButton={onPressSubmit}
      />
    </CommonPopupModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: textScale(18),
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    textAlign: 'center',
    color: colors.theme,
    marginBottom: spacing.PADDING_10,
  },
  submitButtonStyle: {
    borderRadius: spacing.RADIUS_12,
  },
});

export default AnswerWritingViewModal;
