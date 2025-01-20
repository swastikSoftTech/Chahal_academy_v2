import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import StoreProductCard from '../row/StoreProductCard';
import {spacing} from '../../styles/spacing';
import {useNavigation} from '@react-navigation/native';
import BlogCard from '../row/BlogCard';

const BlogsList = () => {
  const {navigate} = useNavigation();
  const onPressBlog = () => {
    navigate('BlogDetail');
  };
  return (
    <View>
      <FlatList
        data={[1, 1, 1, 1, 1]}
        renderItem={({item, index}) => (
          <BlogCard BlogsList={item} index={index} onPressBlog={onPressBlog} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default BlogsList;
