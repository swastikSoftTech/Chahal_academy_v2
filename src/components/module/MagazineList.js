import {FlatList} from 'react-native';
import MagazineCard from '../row/MagazineCard';
import EmptyComponenet from './EmptyComponenet';

const MagazineList = ({data, onPressMazine}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <MagazineCard
          magazine={item}
          index={index}
          key={'MagazineList' + index}
          onPressMazine={onPressMazine}
        />
      )}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyComponenet />}
    />
  );
};

export default MagazineList;
