import {FlatList, View} from 'react-native';
import CurrentAffairCategoryCard from '../row/CurrentAffairCategoryCard';

const CurrentAffairCategoryList = ({
  data,
  onPressCurrentAffairCategoryCard,
}) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item, index}) => (
          <CurrentAffairCategoryCard
            item={item}
            index={index}
            key={'CurrentAffairCategoryList' + index}
            onPressCurrentAffairCategoryCard={onPressCurrentAffairCategoryCard}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CurrentAffairCategoryList;
