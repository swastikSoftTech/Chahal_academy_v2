import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {spacing} from '../../styles/spacing';
import colors from '../../styles/colors';
import {boxShadow} from '../../styles/Mixins';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import commonStyle from '../../styles/commonStyles';
import RegularText from '../common/text/RegularText';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import Image from '../common/Image';

const TestSeriesSubjectCard = ({course, index, onPressTestSeriesSubject}) => {
  const progress = (course?.count?.attempt / course?.count?.testSeries) * 100;
  return (
    <TouchableOpacity
      onPress={() => onPressTestSeriesSubject(course.id, course.courseName)}
      activeOpacity={0.7}
      style={[
        styles.mainContainer,
        index === 0 && {marginTop: spacing.MARGIN_16},
      ]}>
      <Image source={{uri: course.image}} style={styles.thumbnail} />
      <View style={styles.rightContainer}>
        <View style={styles.rightContainerHeader}>
          <RegularText style={[styles.title, {flex: 1}]}>
            {course.courseName}
          </RegularText>
          <RegularText
            style={
              styles.testSeriesText
            }>{`${course.count?.testSeries} Test Series`}</RegularText>
        </View>
        <View>
          <RegularText style={styles.progressText}>{`${parseInt(
            progress,
          )}% Complete`}</RegularText>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progress, {width: `${progress}%`}]} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: APP_PADDING_HORIZONTAL,
    marginBottom: spacing.MARGIN_16,
    backgroundColor: colors.white,
    ...boxShadow(colors.theme),
    borderRadius: spacing.RADIUS_8,
    padding: spacing.PADDING_12,
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_14,
  },
  thumbnail: {
    width: spacing.WIDTH_90,
    height: spacing.WIDTH_90,
    backgroundColor: colors.grey300,
    borderRadius: spacing.RADIUS_8,
  },
  rightContainer: {
    flex: 1,
  },
  rightContainerHeader: {
    flexDirection: 'row',
    flex: 1,
    gap: spacing.MARGIN_4,
  },
  title: {
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
  },
  series_icon: {
    width: spacing.WIDTH_16,
    height: spacing.WIDTH_16,
  },
  testSeriesText: {
    fontSize: textScale(12),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
  },
  progressText: {
    color: colors.grey600,
    fontSize: textScale(12),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
  },
  progressBarContainer: {
    width: '100%',
    height: spacing.HEIGHT_8,
    borderWidth: spacing.RADIUS_1,
    borderRadius: spacing.RADIUS_6,
    borderColor: colors.green400,
    overflow: 'hidden',
    marginTop: spacing.MARGIN_6,
  },
  progress: {
    backgroundColor: colors.green400,
    height: spacing.HEIGHT_12,
  },
});

export default TestSeriesSubjectCard;
