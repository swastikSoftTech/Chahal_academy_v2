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
import RegularText from '../common/text/RegularText';
import Image from '../common/Image';
import {ImagePaths} from '../../utils/imagePaths';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import commonStyle from '../../styles/commonStyles';
import {StackNav} from '../../navigation/NavigationKeys';
import {useNavigation} from '@react-navigation/native';

const CourseCategoryListModal = ({
  visible,
  courseCategories,
  onRequestClose = () => {},
}) => {
  const {navigate} = useNavigation();
  const onSelectCategory = category => {
    navigate(StackNav.CourseCategory, {
      id: category?.id,
    });
    onRequestClose();
  };
  return (
    <CommonModal
      visible={visible}
      onRequestClose={onRequestClose}
      // transparentContainer={{backgroundColor: 'rgba(0,0,0,0.5)'}}
      visibleViewStyle={[boxShadow(), {maxHeight: spacing.FULL_HEIGHT / 2}]}>
      {/* <View style={[commonStyle.flexDirectionRow, {justifyContent: 'center'}]}> */}
      <Text style={styles.title}> Select Course category</Text>
      {/* </View> */}
      <TouchableOpacity
        style={styles.closeIconContainer}
        onPress={onRequestClose}>
        <Image source={ImagePaths.CLOSE_ICON} style={styles.closeIcon} />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        {courseCategories?.map(category => {
          return (
            <TouchableOpacity
              key={category.name}
              style={styles.categoryCard_container}
              onPress={() => onSelectCategory(category)}>
              <RegularText>{category.name}</RegularText>
            </TouchableOpacity>
          );
        })}
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
  closeIconContainer: {
    position: 'absolute',
    right: APP_PADDING_HORIZONTAL,
    top: spacing.HEIGHT_26,
  },
  closeIcon: {
    width: spacing.WIDTH_28,
    height: spacing.WIDTH_28,
  },
  categoryCard_container: {
    backgroundColor: colors.grey200,
    marginBottom: spacing.MARGIN_12,
    paddingHorizontal: spacing.PADDING_12,
    paddingVertical: spacing.MARGIN_8,
    borderRadius: spacing.RADIUS_4,
  },
  name: {
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    textAlign: 'center',
    color: colors.grey900,
  },
});

export default CourseCategoryListModal;
