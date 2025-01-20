import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {spacing} from '../../styles/spacing';
import RegularText from '../common/text/RegularText';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import Image from '../common/Image';

const CurrentAffairCategoryCard = ({
  item,
  index,
  onPressCurrentAffairCategoryCard,
}) => {
  return (
    <TouchableOpacity
      onPress={() => onPressCurrentAffairCategoryCard(item)}
      activeOpacity={0.8}
      style={[
        styles.mainContainer,
        index === 0 && {marginTop: spacing.MARGIN_16},
      ]}>
      <Image
        source={{uri: item.imageUrl}}
        style={styles.thumbnail}
        resizeMode={'cover'}
      />
      <RegularText style={styles.name}>{item.name}</RegularText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    marginBottom: spacing.MARGIN_16,
    backgroundColor: colors.white,
    borderRadius: spacing.RADIUS_12,
    ...boxShadow(),
    overflow: 'hidden',
  },
  thumbnail: {
    width: '100%',
    height: spacing.HEIGHT_240,
    backgroundColor: colors.grey400,
  },
  name: {
    paddingHorizontal: spacing.PADDING_10,
    paddingVertical: spacing.PADDING_12,
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
});

export default CurrentAffairCategoryCard;
