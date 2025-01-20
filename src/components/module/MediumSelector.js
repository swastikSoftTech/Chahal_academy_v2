import {StyleSheet, View} from 'react-native';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import RegularText from '../common/text/RegularText';

const MediumSelector = ({activeTab, handelSelection}) => {
  return (
    <View style={styles.tabParentContainer}>
      <View style={styles.topTabContainer}>
        <RegularText
          onPress={() => {
            handelSelection(true);
          }}
          style={[
            styles.tabText,
            activeTab && {
              color: colors.white,
              backgroundColor: colors.theme,
            },
            {
              borderTopRightRadius: spacing.RADIUS_8,
              borderBottomRightRadius: spacing.RADIUS_8,
            },
          ]}>
          English
        </RegularText>
        <RegularText
          onPress={() => {
            handelSelection(false);
          }}
          style={[
            styles.tabText,
            !activeTab && {
              color: colors.white,
              backgroundColor: colors.theme,
            },
            {
              borderTopLeftRadius: spacing.RADIUS_8,
              borderBottomLeftRadius: spacing.RADIUS_8,
            },
          ]}>
          Hindi
        </RegularText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabParentContainer: {
    marginTop: spacing.MARGIN_16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topTabContainer: {
    ...commonStyle.flexDirectionRow,
    backgroundColor: colors.white,
    borderRadius: spacing.RADIUS_8,
    borderColor: colors.white,
    overflow: 'hidden',
  },
  tabText: {
    fontSize: textScale(13),
    textAlign: 'center',
    paddingVertical: spacing.PADDING_8,
    minWidth: spacing.WIDTH_94,
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
    color: colors.black,
    backgroundColor: colors.white,
  },
});
export default MediumSelector;
