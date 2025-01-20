import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import commonStyle from '../../styles/commonStyles';
import {textScale} from '../../styles/responsiveStyles';
import {spacing} from '../../styles/spacing';
import {fontNames} from '../../styles/typography';
import RegularText from '../common/text/RegularText';
import {convertDateTime} from '../../utils/commonFunction';
import Image from '../common/Image';
import images from '../../assets/images';

const Comment = ({
  comment,
  index,
  onPressReply,
  onPressView,
  containerStyle,
}) => {
  return (
    <View
      style={[
        styles.mainContainer,
        index === 0 && {marginTop: spacing.MARGIN_16},
        containerStyle,
      ]}>
      {/* <View style={styles.userImg} /> */}
      <Image source={images.profile1} style={styles.userImg} />
      <View style={{flex: 1}}>
        <View style={styles.rightMainContainer}>
          <View style={styles.detailContainer}>
            <RegularText style={styles.name}>{comment.name}</RegularText>
            <RegularText style={styles.medium}>
              Medium : {comment.language}
            </RegularText>
            <RegularText style={styles.date}>
              {convertDateTime(comment.created_at, 'DD-MM-YYYY')}
            </RegularText>
          </View>
          <View style={[commonStyle.flexDirectionRow]}>
            {onPressView ? (
              <TouchableOpacity onPress={() => onPressView(comment)}>
                <RegularText style={[styles.button, {color: colors.orange900}]}>
                  View
                </RegularText>
              </TouchableOpacity>
            ) : null}
            {onPressReply ? (
              <TouchableOpacity onPress={() => onPressReply(comment)}>
                <RegularText
                  style={[styles.button, {marginLeft: spacing.MARGIN_20}]}>
                  Reply
                </RegularText>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        {/* {<CommentList data={[1]} from={'REPLY'} />} */}
      </View>
    </View>
  );
};

const CommentCard = ({comment, index, onPressReply, onPressView}) => {
  return (
    <>
      <Comment
        comment={comment}
        index={index}
        onPressReply={onPressReply}
        onPressView={onPressView}
      />
      {comment.reply ? (
        <Comment
          comment={comment.reply}
          onPressView={onPressView}
          containerStyle={{marginLeft: spacing.WIDTH_50}}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    marginBottom: spacing.MARGIN_10,
    borderTopWidth: spacing.WIDTH_1,
    borderColor: colors.grey300,
    paddingTop: spacing.MARGIN_10,
  },
  userImg: {
    width: spacing.WIDTH_50,
    height: spacing.WIDTH_50,
    backgroundColor: colors.grey400,
    borderRadius: spacing.RADIUS_90,
  },
  rightMainContainer: {
    flexDirection: 'row',
    // flex: 1,
  },
  detailContainer: {
    marginHorizontal: spacing.MARGIN_10,
    flex: 1,
  },
  name: {
    fontSize: textScale(14),
    fontFamily: fontNames.FONT_PRIMARY_SEMI_BOLD,
  },
  medium: {
    fontSize: textScale(13),
    fontFamily: fontNames.FONT_PRIMARY_REGULAR,
    color: colors.grey500,
    lineHeight: spacing.MARGIN_16,
  },
  date: {
    fontSize: textScale(12),
    fontFamily: fontNames.FONT_PRIMARY_REGULAR,
    color: colors.grey600,
  },
  button: {
    color: colors.grey600,
    fontFamily: fontNames.FONT_PRIMARY_MEDIUM,
    color: colors.theme,
  },
});

export default CommentCard;
