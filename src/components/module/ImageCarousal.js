import React, {useEffect, useRef, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import colors from '../../styles/colors';
import {spacing} from '../../styles/spacing';
import {APP_PADDING_HORIZONTAL} from '../../themes/commonStyle';
import Image from '../common/Image';

let currentIndex = 0;

const ImageCarousal = ({
  dotStyle,
  autoScroll,
  scrollDuration,
  dataArray,
  mainViewStyle,
  onPressCarousel,
  isLoading,
  isLocalImg,
  imgStyle,
  resizeMode,
  imgContainerstyle,
}) => {
  let carousalRef = useRef();
  let intervalId;

  const [currentViewItem, setCurrentViewItem] = useState(undefined);

  const onViewRef = React.useRef(viewableItems => {
    setCurrentViewItem(viewableItems.viewableItems);
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  useEffect(() => {
    if (autoScroll == true && dataArray.length > 0) {
      let timeoutId = setTimeout(() => {
        moveScroll();
      }, 2000);
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, []);

  function moveScroll() {
    intervalId = setInterval(
      () => {
        if (currentIndex < dataArray.length - 1) {
          scrollCarousal(currentIndex + 1);
        } else {
          scrollCarousal(0);
        }
      },
      scrollDuration ? scrollDuration : 2000,
    );
  }

  function scrollCarousal(index) {
    carousalRef?.current?.scrollToIndex({animated: true, index: index});
    currentIndex = index;
  }

  return (
    <View
      style={[
        {
          alignItems: 'center',
          borderRadius: spacing.RADIUS_12,
        },
        mainViewStyle,
      ]}>
      <FlatList
        ref={carousalRef}
        data={dataArray.length ? dataArray : isLoading != undefined ? [1] : []}
        snapToAlignment="start"
        initialNumToRender={5}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled={true}
        decelerationRate={'fast'}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
        style={{borderRadius: spacing.RADIUS_12}}
        renderItem={({item: image, index}) => {
          return (
            <Image
              source={isLocalImg ? image : {uri: image}}
              style={{
                width: spacing.FULL_WIDTH - APP_PADDING_HORIZONTAL * 2,
                height: spacing.HEIGHT_216,
                borderRadius: spacing.RADIUS_12,
                ...imgStyle,
              }}
              viewStyle={{
                borderRadius: spacing.RADIUS_12,
                ...imgContainerstyle,
              }}
              resizeMode={resizeMode}
              isLoading={isLoading}
            />
          );
        }}
      />
      {currentViewItem && currentViewItem[0] && dataArray?.length > 1 && (
        <FlatList
          data={dataArray}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[
            {flexDirection: 'row', marginTop: spacing.MARGIN_8},
            dotStyle,
          ]}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  // borderColor: currentViewItem[0].index == index ? colors.white : colors.white,
                  // borderWidth: currentViewItem[0].index == index ? 1 : 1,
                  backgroundColor:
                    currentViewItem[0].index == index
                      ? colors.grey900
                      : colors.grey400,
                  height: spacing.HEIGHT_9,
                  width:
                    currentViewItem[0].index == index
                      ? spacing.HEIGHT_14
                      : spacing.HEIGHT_9,
                  borderRadius: spacing.RADIUS_90,
                  marginHorizontal: spacing.MARGIN_2,
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
};

export default ImageCarousal;
