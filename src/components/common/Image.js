import React from 'react';
import {Image as RNImage, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Image = ({source, style, resizeMode, viewStyle, isLoading}) => {
  return (
    <>
      {isLoading ? (
        <SkeletonPlaceholder
        // backgroundColor={colors.skeletonBackgroundColor}
        // highlightColor={colors.skeletonHighlightColor}
        >
          <View style={style} />
        </SkeletonPlaceholder>
      ) : (
        <View style={viewStyle}>
          {source?.uri == undefined ? (
            <RNImage
              source={source}
              resizeMode={resizeMode ? resizeMode : 'contain'}
              style={[style, {}]}
              key={source}
            />
          ) : (
            <FastImage
              source={source}
              resizeMode={resizeMode ? resizeMode : 'contain'}
              style={[style, {}]}
              key={source.uri}
            />
          )}
        </View>
      )}
    </>
  );
};

export default Image;
