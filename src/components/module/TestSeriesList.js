import {FlatList, View} from 'react-native';
import TestSeriesCard from '../row/TestSeriesCard';
import EmptyComponenet from './EmptyComponenet';

const TestSeriesList = ({
  testSeriesData,
  navigateToTestFolder,
  onPressStartTest,
  course,
  onPressResult,
}) => {
  return (
    <View>
      <FlatList
        data={testSeriesData}
        renderItem={({item, index}) => (
          <TestSeriesCard
            key={'TestSeriesCard' + index}
            index={index}
            course={course}
            testSeries={item}
            navigateToTestFolder={navigateToTestFolder}
            onPressStartTest={onPressStartTest}
            onPressResult={onPressResult}
          />
        )}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyComponenet />}
      />
    </View>
  );
};

export default TestSeriesList;
