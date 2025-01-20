import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import {spacing} from '../../styles/spacing';
import CommonModal from '../common/modal/CommonModal';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import padding from '../../themes/padding';

const CurrentAffairsModal = ({
  visible,
  onRequestClose,
  onPressShowWebView,
  data,
}) => {
  return (
    <CommonModal
      visible={visible}
      onRequestClose={onRequestClose}
      transparentContainer={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      visibleViewStyle={[boxShadow(), {}]}>
      <Text style={styles.title}>Current Affairs</Text>
      <ScrollView>
        {data?.map((item, index) => (
          <TouchableOpacity
            onPress={() => onPressShowWebView(item)}
            key={'CURRENTAFFAIRS_DATA' + index}
            style={[styles.block]}>
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </CommonModal>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: textScale(18),
    fontFamily: fontNames.FONT_PRIMARY_BOLD,
    textAlign: 'center',
    color: colors.theme,
    paddingVertical: spacing.PADDING_12,
    marginBottom: spacing.PADDING_10,
    borderBottomWidth: 0.6,
    borderColor: colors.grey300,
  },
  block: {
    marginBottom: spacing.MARGIN_10,
  },
  name: {
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    textAlign: 'center',
    color: colors.grey900,
  },
});

export default CurrentAffairsModal;
