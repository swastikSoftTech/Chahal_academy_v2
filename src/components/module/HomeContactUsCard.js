import LottieView from 'lottie-react-native';
import React from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {boxShadow} from '../../styles/Mixins';
import colors from '../../styles/colors';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {ImagePaths} from '../../utils/imagePaths';
import Button from '../common/button/Button';
import RegularText from '../common/text/RegularText';
import Title from '../common/text/Title';

const HomeContactUsCard = () => {
  const contactOnWhatsapp = () => {
    Linking.openURL('whatsapp://send?text=Hello&phone=+918810655021');
  };
  const contactOnPhone = () => {
    let mobile = '8810655021';
    Linking.openURL(`tel:${mobile}`);
  };
  return (
    <View style={styles.mainContainer}>
      {/* <Image source={ImagePaths.HELP_VECTOR} style={styles.helpVector} /> */}
      <LottieView
        source={require('../../assets/lottie/support.json')}
        style={{height: 240, width: 240}}
        autoPlay
        loop
      />
      <RegularText style={{textAlign: 'center', ...styles.desc}}>
        {
          'Prepare for Civil Services,\nLead & Serve the Nation 🇮🇳\nBecome an IAS, IPS or PCS Officer.'
        }
      </RegularText>

      <Title
        title={'For Free Guidance/Admission'}
        style={{textAlign: 'center'}}
      />
      <Button
        title={'Chat on Whatsapp'}
        backgroundColor={colors.green600}
        buttonStyle={{...styles.btnStyle, borderColor: colors.green600}}
        leftImage={ImagePaths.WHATSAPP}
        leftImageStyle={styles.btnLeftImg}
        onPressButton={contactOnWhatsapp}
      />
      <Button
        title={'Call +91 8810655021'}
        // backgroundColor={colors.green600}
        isSecondary={true}
        buttonStyle={styles.btnStyle}
        leftImage={ImagePaths.CALL}
        leftImageStyle={{
          ...styles.btnLeftImg,
          tintColor: colors.theme,
        }}
        onPressButton={contactOnPhone}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    marginVertical: spacing.MARGIN_16,
    ...boxShadow(colors.theme),
    backgroundColor: colors.white,
    borderRadius: spacing.RADIUS_12,
    padding: spacing.PADDING_16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: spacing.WIDTH_2,
    borderColor: colors.theme,
  },
  desc: {
    textAlign: 'center',
    fontSize: textScale(14),
  },
  btnStyle: {
    width: '100%',
    marginTop: spacing.MARGIN_12,
  },
  btnLeftImg: {
    width: spacing.WIDTH_24,
    height: spacing.WIDTH_24,
    marginRight: spacing.MARGIN_6,
  },
});

export default HomeContactUsCard;
