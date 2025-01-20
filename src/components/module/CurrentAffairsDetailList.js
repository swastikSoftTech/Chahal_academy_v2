import {useNavigation} from '@react-navigation/native';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import {boxShadow} from '../../styles/Mixins';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import {ImagePaths} from '../../utils/imagePaths';
import Image from '../common/Image';
import RegularText from '../common/text/RegularText';
import CurrentAffairCard from '../row/CurrentAffairCard';

const ARROW_DATA = {RIGHT: 'RIGHT', LEFT: 'LEFT'};

const CurrentAffairCardList = ({
  currentAffairs,
  fetchNewData,
  onClickCurrentAffair,
}) => {
  const navigation = useNavigation();
  function onPressArrow(pressArrow, value, last_value) {
    if (pressArrow === ARROW_DATA.LEFT) {
      fetchNewData(value - 1 <= 1 ? 1 : value - 1);
    }

    if (pressArrow === ARROW_DATA.RIGHT) {
      fetchNewData(value + 1 <= last_value ? value + 1 : last_value);
    }
  }
  return (
    <View>
      <FlatList
        data={currentAffairs?.data}
        renderItem={({item, index}) => (
          <CurrentAffairCard
            index={index}
            item={item}
            onClickCurrentAffair={onClickCurrentAffair}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          currentAffairs ? (
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                onPress={() =>
                  onPressArrow(ARROW_DATA.LEFT, currentAffairs?.current_page)
                }
                activeOpacity={0.4}
                style={[
                  styles.arrowContainer,
                  {transform: [{rotate: '180deg'}]},
                ]}>
                <Image source={ImagePaths.ARROW} />
              </TouchableOpacity>
              <RegularText
                style={
                  styles.piginationText
                }>{`${currentAffairs?.current_page}/${currentAffairs?.last_page}`}</RegularText>
              <TouchableOpacity
                style={styles.arrowContainer}
                activeOpacity={0.4}
                onPress={() =>
                  onPressArrow(
                    ARROW_DATA.RIGHT,
                    currentAffairs?.current_page,
                    currentAffairs?.last_page,
                  )
                }>
                <Image source={ImagePaths.ARROW} />
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    ...commonStyle.flexDirectionRow,
    justifyContent: 'space-between',
    paddingHorizontal: APP_PADDING_HORIZONTAL,
    backgroundColor: colors.white,
    paddingVertical: spacing.PADDING_10,
    marginHorizontal: APP_PADDING_HORIZONTAL,
    borderRadius: spacing.RADIUS_6,
    marginBottom: spacing.MARGIN_16,
    ...boxShadow(colors.black, undefined, spacing.RADIUS_2, 0.4),
  },
  arrowContainer: {
    borderWidth: spacing.RADIUS_1,
    borderColor: colors.grey400,
    borderRadius: spacing.RADIUS_4,
    paddingHorizontal: spacing.PADDING_10,
    paddingVertical: spacing.PADDING_8,
  },
  piginationText: {
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    color: colors.grey600,
  },
});

export default CurrentAffairCardList;
