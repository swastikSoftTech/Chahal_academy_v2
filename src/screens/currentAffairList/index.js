import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import axios from '../../api/axios';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import Header from '../../components/common/header/Header';
import CurrentAffairCardList from '../../components/module/CurrentAffairsDetailList';
import {StackNav} from '../../navigation/NavigationKeys';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {getCurrentAffairApiUrl} from '../../utils/commonFunction';
import {CURRENT_AFFAIR_CATEGORY_TYPE} from '../../utils/constants';

const CurrentAffairListing = ({route}) => {
  const {params} = route;
  const {currentAffairCategory} = params;

  const navigation = useNavigation();

  const [currentAffairs, setCurrentAffairs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCurrentAffairsDetailData();
  }, []);

  async function getCurrentAffairsDetailData(value) {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${getCurrentAffairApiUrl(currentAffairCategory.type)}?page=${value}`,
      );
      if (response?.data?.data?.data) {
        setCurrentAffairs(response?.data?.data);
      }
    } catch (error) {
      console.log('Something went wrong', error);
    } finally {
      setIsLoading(false);
    }
  }

  function fetchNewData(value) {
    getCurrentAffairsDetailData(value);
  }

  function onClickCurrentAffair(currentAffair) {
    console.log('currentAffair>>', currentAffair);
    if (
      currentAffairCategory.type === CURRENT_AFFAIR_CATEGORY_TYPE.ANSWER_WRITING
    ) {
      navigation.navigate(StackNav.AnswerWriting, {
        type: currentAffairCategory.type,
        date: currentAffair.created_at,
        id: currentAffair.id,
      });
    } else if (
      currentAffairCategory.type ===
      CURRENT_AFFAIR_CATEGORY_TYPE.CURRENT_AFFAIR_QUIZE
    ) {
      navigation.navigate(StackNav.QuizeParticiaption, {
        type: currentAffairCategory.type,
        date: currentAffair.created_at,
        id: currentAffair.quiz_title_id,
      });
    } else {
      navigation.navigate(StackNav.CurrentAffairDetail, {
        type: currentAffairCategory.type,
        date: currentAffair.created_at,
        id: currentAffair.id,
      });
    }
  }

  return (
    <CSafeAreaView style={styles.mainContainer}>
      <Header title={currentAffairCategory?.name} showMenu />
      {isLoading ? (
        <ActivityIndicator
          size={'large'}
          style={{marginTop: spacing.MARGIN_16}}
          color={colors.theme}
        />
      ) : (
        <View style={{flex: 1}}>
          <CurrentAffairCardList
            currentAffairs={currentAffairs}
            fetchNewData={fetchNewData}
            onClickCurrentAffair={onClickCurrentAffair}
          />
        </View>
      )}
    </CSafeAreaView>
  );
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
});
export default CurrentAffairListing;
