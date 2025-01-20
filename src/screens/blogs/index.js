import React from 'react';
import {StyleSheet, View} from 'react-native';
import Header from '../../components/common/header/Header';
import colors from '../../styles/colors';
import BlogsList from '../../components/module/BlogsList';

const Blogs = () => {
  return (
    <View style={styles.mainContainer}>
      <Header title={'Blogs'} />
      <BlogsList />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.appBackgroundColor,
  },
});

export default Blogs;
