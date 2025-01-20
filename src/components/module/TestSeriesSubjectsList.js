import {FlatList, View} from 'react-native';
import EmptyComponenet from './EmptyComponenet';
import TestSeriesSubjectCard from '../row/TestSeriesSubjectCard';
import {noDataImage} from '../../common/constants';

const TestSeriesCategoryList = ({
  testSeriesCategoryData,
  onPressTestSeriesSubject,
}) => {
  return (
    <View>
      <FlatList
        data={testSeriesCategoryData}
        renderItem={({item, index}) => (
          <TestSeriesSubjectCard
            key={'TestSeriesSubjectCard' + index}
            index={index}
            course={item}
            onPressTestSeriesSubject={onPressTestSeriesSubject}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyComponenet />}
      />
    </View>
  );
};

export default TestSeriesCategoryList;
