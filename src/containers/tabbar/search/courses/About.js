import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { useSelector } from 'react-redux';
import { Montserrat_Medium, moderateScale } from '../../../../common/constants';
import { styles } from '../../../../themes';


const About = ({ description }) => {
  const height = Dimensions.get('screen').height;
  const width = Dimensions.get('screen').width;
  const colors = useSelector(state => state.theme.theme);

  return (
    <View style={[localStyles.root]}>
      <Text style={{ color: "#454545", fontFamily: Montserrat_Medium }}>Introduction : </Text>
      <Text style={{ color: "#454545", fontFamily: Montserrat_Medium,lineHeight:22, }}>{description}</Text>
    </View>

  );
};

export default About;

const localStyles = StyleSheet.create({
  root: {
    ...styles.mt15,
    gap: moderateScale(5),
    ...styles.ph10,
    ...styles.mh10,
    ...styles.mb30,
    ...styles.flex,
    marginBottom: 100
  },
  section: {
    gap: moderateScale(8),
  },
  detailContainer: {
    ...styles.flexRow,
    ...styles.flex,
    gap: moderateScale(30),
  },
  detailSection: {
    ...styles.flex,
    gap: moderateScale(8),
  },
  detailsContainer: {
    ...styles.flexRow,
    ...styles.flex,
    ...styles.itemsCenter,
    gap: moderateScale(8),
  },
  toolContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    gap: moderateScale(8),
  },
});
