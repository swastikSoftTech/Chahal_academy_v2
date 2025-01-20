import {Platform, StyleSheet, View} from 'react-native';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import CommonPopupModal from '../common/modal/CommonPopupModal';
import RegularText from '../common/text/RegularText';
import Image from '../common/Image';
import {ImagePaths} from '../../utils/imagePaths';
import Title from '../common/text/Title';
import Button from '../common/button/Button';
import commonStyle from '../../styles/commonStyles';
import axios from '../../api/axios';
import {Logout_devices} from '../../api/Url';
import flashMessage from '../common/CustomFlashAlert';
import {useState} from 'react';
import DeviceInfo from 'react-native-device-info';

const MultipleLoginWarningModal = ({
  visible,
  onClose = () => {},
  loginPayload,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const LogoutFromAllDevices = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(Logout_devices, loginPayload, {
        headers: {
          'Content-Type': 'application/json',
          browser: DeviceInfo.getModel(),
          os: Platform.OS,
          device: 'Mobile',
        },
        withCredentials: true,
      });
      if (response.data) {
        onClose();
        return flashMessage(response.data.message, 'success');
      }
    } catch (err) {
      console.log('err >>', err);

      flashMessage('Something went wrong', 'danger');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommonPopupModal
      visible={visible}
      onRequestClose={onClose}
      visibleViewStyle={[boxShadow(), {alignItems: 'center'}]}>
      <Image source={ImagePaths.WARNING} style={styles.warningIcon} />
      <Title title={'Warning!'} style={{fontSize: textScale(24)}} />
      <RegularText style={styles.message}>
        You are already logged in another device, Logout first to continue...
      </RegularText>
      <View style={styles.btnContainer}>
        <Button
          title={'Cancel'}
          backgroundColor={colors.blue500}
          buttonStyle={{borderColor: colors.blue500, flex: 0.5}}
          onPressButton={onClose}
        />
        <Button
          title={'Logout from other device'}
          onPressButton={LogoutFromAllDevices}
          buttonStyle={styles.btn}
          fetching={isLoading}
        />
      </View>
    </CommonPopupModal>
  );
};

const styles = StyleSheet.create({
  warningIcon: {
    width: spacing.WIDTH_164,
    height: spacing.WIDTH_164,
  },
  message: {
    fontSize: textScale(18),
    textAlign: 'center',
  },
  btnContainer: {
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_12,
    marginTop: spacing.MARGIN_16,
  },
  btn: {
    flex: 1,

    backgroundColor: colors.green600,
    borderColor: colors.green600,
  },
});

export default MultipleLoginWarningModal;
