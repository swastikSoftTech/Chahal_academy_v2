const {FlatList} = require('react-native');
const {default: EmptyComponenet} = require('./EmptyComponenet');
const {default: CommentCard} = require('../row/commentCard');

const CommentList = ({data, onPressReply, onPressView, from}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <CommentCard
          comment={item}
          index={index}
          onPressReply={onPressReply}
          onPressView={onPressView}
          from={from}
        />
      )}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyComponenet />}
    />
  );
};

export default CommentList;
