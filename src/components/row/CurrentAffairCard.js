import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {convertDateTime} from '../../utils/commonFunction';
import RegularText from '../common/text/RegularText';

const CurrentAffairCard = ({item, index, onClickCurrentAffair}) => {
  return (
    <TouchableOpacity
      onPress={() => onClickCurrentAffair(item)}
      activeOpacity={0.8}
      style={[
        styles.mainContainer,
        index === 0 && {marginTop: spacing.MARGIN_16},
      ]}>
      <View style={styles.dateContainer}>
        <View style={{}}>
          <RegularText style={styles.DayText}>
            {convertDateTime(item.created_at, 'DD')}
          </RegularText>
          <RegularText style={styles.title}>
            {' '}
            {convertDateTime(item.created_at, 'MMM')}
          </RegularText>
        </View>
        <RegularText style={[styles.title, styles.yearText]}>
          {' '}
          {convertDateTime(item.created_at, 'YYYY')}
        </RegularText>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <RegularText style={styles.paragraphText}>
          {item?.title || item?.quiz_title}
        </RegularText>
        <RegularText style={styles.researchTeamText}>Research Team</RegularText>
        {item?.short_desc ? (
          <>
            <View style={[styles.seprator]} />
            <RegularText
              style={[styles.paragraphText, {color: colors.grey600}]}>
              {item?.short_desc}
            </RegularText>
          </>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    marginBottom: spacing.MARGIN_16,
    padding: spacing.PADDING_10,
    backgroundColor: colors.white,
    ...boxShadow(colors.black, undefined, spacing.RADIUS_2, 0.4),
    flexDirection: 'row',
    gap: spacing.MARGIN_10,
    borderRadius: spacing.RADIUS_6,
  },
  dateContainer: {
    borderWidth: 0.6,
    borderColor: colors.grey300,
    alignSelf: 'flex-start',
    borderRadius: spacing.RADIUS_6,
    overflow: 'hidden',
  },
  DayText: {
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    fontSize: textScale(16),
    textAlign: 'center',
    lineHeight: spacing.MARGIN_24,
    paddingVertical: spacing.PADDING_2,
  },
  title: {
    fontSize: textScale(12),
    textAlign: 'center',
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    lineHeight: spacing.MARGIN_20,
    paddingHorizontal: spacing.PADDING_16,
  },
  yearText: {
    backgroundColor: colors.theme,
    color: colors.white,
    paddingVertical: spacing.PADDING_2,
  },
  paragraphText: {
    fontSize: textScale(14),
    color: colors.black,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
  researchTeamText: {
    fontSize: textScale(15),
    color: colors.blue800,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
  seprator: {
    borderWidth: 0.6,
    borderColor: colors.grey300,
    marginVertical: spacing.MARGIN_6,
  },
});

export default CurrentAffairCard;
