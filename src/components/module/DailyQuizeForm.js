import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Title from '../common/text/Title';
import RegularText from '../common/text/RegularText';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {useCallback, useState} from 'react';
import ItemPicker from '../common/input/ItemPicker';
import TextInput from '../common/input/TextInput';
import Button from '../common/button/Button';
import DocumentPicker from 'react-native-document-picker';
import colors from '../../styles/colors';
import {isInputEmpty} from '../../utils/validators';

const DailyQuizeForm = ({handelFormData}) => {
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [medium, setMedium] = useState('');
  const [nameError, setNameError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  const STUDENT_MEDIUM_DATA = [
    {label: 'English', value: 'english'},
    {label: 'Hindi', value: 'hindi'},
  ];

  function onSelectPdfMedium(data) {
    setMedium(data);
  }

  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.pdf],
      });
      setFileResponse(response[0]);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  function onPressSubmit() {
    const nameValidation = isInputEmpty(name);
    const mobileNumberValidation = isInputEmpty(mobileNumber);

    if (!nameValidation.success) {
      setNameError('Please enter your name');
    } else {
      setNameError('');
    }
    if (!mobileNumberValidation.success) {
      setMobileNumberError('Please enter your mobile number');
    } else {
      setMobileNumberError('');
    }
    if (!nameValidation.success || !mobileNumberValidation.success) return;
    const payload = {
      name: name,
      phone: mobileNumber,
      language: medium.value,
      uploadfile: fileResponse,
    };
    console.log('fileResponse >>', fileResponse);

    handelFormData(payload);
  }

  return (
    <View style={styles.mainContainer}>
      <TextInput
        label={'Name'}
        value={name}
        onChangeText={setName}
        placeHolder={'Enter your name'}
        error={nameError}
      />
      <TextInput
        keyboardType={'number-pad'}
        label={'Phone Number'}
        value={mobileNumber}
        onChangeText={setMobileNumber}
        placeHolder={'Enter your mobile number'}
        error={mobileNumberError}
        maxChar={10}
      />
      <ItemPicker
        data={STUDENT_MEDIUM_DATA}
        onSelectItem={onSelectPdfMedium}
        displayKey={'label'}
        label={'Medium'}
        value={medium}
        title={'Select Medium'}
      />
      <TouchableOpacity onPress={handleDocumentSelection}>
        <TextInput
          value={fileResponse?.name}
          editable={false}
          label={'Select pdf'}
          placeHolder={'Select pdf'}
        />
      </TouchableOpacity>
      <Button
        title={'Submit'}
        buttonStyle={styles.submitButtonStyle}
        onPressButton={onPressSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: spacing.MARGIN_10,
    marginHorizontal: APP_PADDING_HORIZONTAL,
  },
  title: {
    fontSize: textScale(16),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
  },
  addButtonStyle: {
    borderRadius: spacing.RADIUS_8,
    height: spacing.HEIGHT_30,
  },
  addButtonTextStyle: {
    color: colors.blue400,
    fontSize: textScale(11),
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
  submitButtonStyle: {
    borderRadius: spacing.RADIUS_12,
    marginBottom: spacing.MARGIN_20,
  },
});

export default DailyQuizeForm;
