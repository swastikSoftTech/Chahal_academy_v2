import React, {useEffect, useRef, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import TestimonialCard from '../row/TestimonialCard';

let currentIndex = 0;

const testimonials = [
  {id: '1', title: 'Card 1'},
  {id: '2', title: 'Card 2'},
  {id: '3', title: 'Card 3'},
  {id: '4', title: 'Card 4'},
  {id: '5', title: 'Card 5'},
];
const TestimonialList = ({}) => {
  let carousalRef = useRef();
  let intervalId;

  const [currentViewItem, setCurrentViewItem] = useState(undefined);

  const onViewRef = useRef(viewableItems => {
    setCurrentViewItem(viewableItems.viewableItems);
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});
  // useEffect(() => {
  //   let timeoutId = setTimeout(() => {
  //     moveScroll();
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timeoutId);
  //     clearInterval(intervalId);
  //   };
  // }, []);

  function moveScroll() {
    intervalId = setInterval(() => {
      if (currentIndex < testimonials.length - 1) {
        scrollCarousal(currentIndex + 1);
      } else {
        scrollCarousal(0);
      }
    }, 2000);
  }

  function scrollCarousal(index) {
    carousalRef?.current?.scrollToIndex({animated: true, index: index});
    currentIndex = index;
  }
  return (
    <View style={styles.mainContainer}>
      <FlatList
        ref={carousalRef}
        data={testimonials}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => (
          <TestimonialCard
            key={'carousalRef' + index}
            testimonial={item}
            containerStyle={{
              marginLeft:
                index === 0 ? APP_PADDING_HORIZONTAL : APP_PADDING_HORIZONTAL,
              marginRight:
                index === testimonials.length - 1 ? APP_PADDING_HORIZONTAL : 0,
            }}
          />
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TestimonialList;
