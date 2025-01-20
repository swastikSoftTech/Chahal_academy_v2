import {StyleSheet} from 'react-native';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {textScale} from '../../styles/responsiveStyles';
import RegularText from '../common/text/RegularText';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';

const EmptyComponenet = ({message}) => {
  return <RegularText style={styles.text}>{message || 'No Data'}</RegularText>;
};
const styles = StyleSheet.create({
  text: {
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    textAlign: 'center',
    fontSize: textScale(16),
    marginTop: APP_PADDING_HORIZONTAL,
  },
});
export default EmptyComponenet;
