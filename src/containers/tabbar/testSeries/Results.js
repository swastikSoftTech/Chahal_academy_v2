import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {styles} from '../../../themes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {customRequest} from '../../../api/customRequest';
import {moderateScale} from '../../../common/constants';
import CHeader from '../../../components/common/CHeader';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {StackNav} from '../../../navigation/NavigationKeys';
import MultiSubjectResult from './MultiSubjectResult';
import SingleResult from './SingleResult';
import FullScreenLoading from '../../../components/common/FullScreenLoading';

const Results = () => {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const route = useRoute();
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(
    'TestCard',
    route?.params?.qId,
    route?.params?.type,
    route?.params?.attempt,
  );
  const getTests = async () => {
    let token = await AsyncStorage.getItem('tokenStudent');
    console.log('token:::', token);
    if (token === null) {
      setIsLoading(false);
      setIsLoggedIn(false);
      navigation.navigate(StackNav.Auth);
    } else {
      setIsLoggedIn(true);
      {
        route?.params?.type == '1'
          ? customRequest(
              `student/test-result-analytics/${route.params.qId}/${route.params.attempt}`,
              'GET',
            )
              .then(res => {
                console.log(JSON.stringify(res));
                console.log('response', res);
                setList(res);
                return res;
              })
              .finally(() => {
                setIsLoading(false);
              })
          : customRequest(
              `student/test-result-analytics_single/${route.params.qId}/${route.params.attempt}`,
              'GET',
            )
              .then(res => {
                console.log(JSON.stringify(res));
                console.log('response', res);
                setList(res);
                return res;
              })
              .finally(() => {
                setIsLoading(false);
              });
      }
    }
  };

  useEffect(() => {
    if (isFocused) {
      getTests();
    }
  }, [isFocused]);

  return (
    <CSafeAreaView style={localStyles.root}>
      <CHeader
        title={'Results'}
        isHideBack={false}
        customTextStyle={localStyles.headerText}
      />
      <FullScreenLoading isLoading={isLoading} />
      {route.params.type == '1' ? (
        <MultiSubjectResult data={list} />
      ) : (
        <SingleResult data={list} />
      )}
    </CSafeAreaView>
  );
};

export default Results;
const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  headerStyle: {
    ...styles.ph10,
    ...styles.mv20,
  },
  iconStyle: {
    width: moderateScale(48),
    height: moderateScale(48),
  },
  categoryContainer: {
    ...styles.rowSpaceBetween,
    ...styles.p15,
    ...styles.mh25,
    ...styles.mb25,
    borderRadius: moderateScale(16),
  },
  headerText: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
  },
  collection: {
    ...styles.flex,
    marginHorizontal: '2%',
    marginVertical: '4%',
    borderRadius: moderateScale(15),
  },
  imageBackground: {
    width: moderateScale(155),
    height: moderateScale(128),
    ...styles.justifyEnd,
  },
});
