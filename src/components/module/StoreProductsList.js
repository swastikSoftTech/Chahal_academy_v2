import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import StoreProductCard from '../row/StoreProductCard';
import {spacing} from '../../styles/spacing';
import {useNavigation} from '@react-navigation/native';

const StoreProductsList = ({products, onPressProduct}) => {
  return (
    <View>
      <FlatList
        data={products || []}
        renderItem={({item, index}) => (
          <StoreProductCard
            product={item}
            index={index}
            onPressProduct={onPressProduct}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{gap: spacing.MARGIN_12}}
        // contentContainerStyle={{
        //   gap: spacing.MARGIN_12,
        // }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default StoreProductsList;
