import { StyleSheet, View } from 'react-native';
import { spacing } from '../../styles/spacing';
import Image from '../common/Image';
import { ImagePaths } from '../../utils/imagePaths';
import { APP_PADDING_HORIZONTAL } from '../../themes/commonStyle';
import colors from '../../styles/colors';
import { boxShadow } from '../../styles/Mixins';
import commonStyle from '../../styles/commonStyles';
import { textScale } from '../../styles/responsiveStyles';
import Title from '../common/text/Title';
import { fontNames } from '../../styles/typography';
import AttributeKeyValue from '../common/text/AttributeKeyValue';
import flex from '../../themes/flex';
import Button from '../common/button/Button';

const TestSeriesCard = ({
  testSeries,
  index,
  navigateToTestFolder,
  onPressStartTest,
  course,
  onPressResult,
}) => {
  console.log("course >>",course);
  console.log("testSeries >>",JSON.stringify(testSeries));
  
  return (
    <View
      style={[
        styles.mainContainer,
        index === 0 && { marginTop: spacing.MARGIN_16 },
      ]}>
      <View style={styles.headerContainer}>
        <Image source={ImagePaths.STUDENT_COURCE} style={styles.studentIcon} />
        <Title title={testSeries?.name} style={styles.title} />
      </View>
      <Image
        source={
          testSeries?.image && testSeries?.image != ''
            ? { uri: testSeries?.image }
            : ImagePaths.STUDENT_COURCE
        }
        style={styles.thumbnail}
        resizeMode={'cover'}
      />
      <View style={styles.seconderyContainer}>
        <RenderKeyValue
          img={ImagePaths.BOOK}
          title={'Total Marks'}
          value={course?.total_marks || testSeries?.module1?.total_marks || 0}
        />

        {course?.qst_count || testSeries?.qst_count ? (
          <RenderKeyValue
            img={ImagePaths.QUESTION}
            title={'Questions'}
            value={course?.qst_count || testSeries?.qst_count || 0}
          />
        ) : null}
        <RenderKeyValue
          img={ImagePaths.TEST_SERIES}
          title={'Max Attempt'}
          // value={course?.attempts || testSeries?.attempts || 0}
          value={testSeries?.module1?.attempts || 0}
        />
        <RenderKeyValue
          img={ImagePaths.TEST_SERIES}
          title={'Attempt'}
          // value={`${testSeries.attempts || testSeries?.module1?.attempts}`}
          value={`${testSeries.attempts }`}
        />
        <RenderKeyValue
          img={ImagePaths.QUESTION}
          title={'Negative Marking'}
          value={
            course?.negative_marks || testSeries?.module1?.negative_marks || 0
          }
        />
        {course?.duration || testSeries?.module1?.duration ? (
          <RenderKeyValue
            img={ImagePaths.CLOCK}
            title={'Duration'}
            value={`${course?.duration || testSeries?.module1?.duration} mins`}
          />
        ) : null}
      </View>
      {/* { testSeries.test_structure.name === 'Folder' || (testSeries.attempts || testSeries?.module1?.attempts) &&  */}
      {testSeries.test_structure.name === 'Folder' ?
        <Button
          title={`Show Test`}
          onPressButton={() => navigateToTestFolder(testSeries)}
        /> :
        <>
          {testSeries.attempts <testSeries?.module1?.attempts?
            <Button
              title={`Start Test`}
              onPressButton={() =>
                testSeries.test_structure.name === 'Folder'
                  ? navigateToTestFolder(testSeries)
                  : onPressStartTest(testSeries)
              }
            /> 
            : null}
        </>
      }
      {/* } */}
      {testSeries.test_structure.name !== 'Folder' &&
        (testSeries?.test_results?.attempts > 0 ||
          testSeries?.test_result?.attempt > 0) && (
          <Button
            title={'Result'}
            isSecondary={true}
            onPressButton={() =>
              onPressResult(
                testSeries?.test_result?.fk_sub_module_id,
                testSeries?.test_result?.attempt,
                testSeries?.fk_test_type_id,
              )
            }
          />
        )}
    </View>
  );
};

const RenderKeyValue = ({ img, title, value, isDarkColor }) => {
  return (
    <View style={[commonStyle.flexDirectionRow, { gap: spacing.MARGIN_6 }]}>
      <Image
        source={img}
        style={[
          styles.studentIcon,
          isDarkColor && { tintColor: colors.deepOrange300 },
        ]}
      />
      <AttributeKeyValue
        title={title}
        value={value}
        titleStyle={[
          styles.titleStyle,
          isDarkColor && { color: colors.deepOrange300 },
        ]}
        valueStyle={[
          { flex: 0, fontSize: textScale(12) },
          isDarkColor && { color: colors.deepOrange300 },
        ]}
      />
    </View>
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
    gap: spacing.MARGIN_14,
  },
  headerContainer: {
    ...commonStyle.flexDirectionRow,
    gap: spacing.MARGIN_10,
  },
  studentIcon: {
    width: spacing.WIDTH_18,
    height: spacing.WIDTH_18,
  },
  title: {
    fontSize: textScale(20),
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
  },
  thumbnail: {
    width: '100%',
    height: spacing.HEIGHT_180,
    backgroundColor: colors.grey400,
    borderRadius: spacing.RADIUS_10,
  },
  seconderyContainer: {
    gap: spacing.MARGIN_14,
    width:
      spacing.FULL_WIDTH -
      (APP_PADDING_HORIZONTAL * 2 + spacing.PADDING_12 * 2),
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleStyle: {
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    fontSize: textScale(12),
  },
});

export default TestSeriesCard;
