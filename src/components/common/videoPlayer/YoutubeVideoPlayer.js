import React, {useCallback, useState} from 'react';
import {View} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {spacing} from '../../../styles/spacing';

const YoutubeVideoPlayer = ({autoPlay, videoId, containerStyle}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <View style={containerStyle}>
      <YoutubePlayer
        height={spacing.HEIGHT_216}
        play={playing}
        videoId={videoId}
        onChangeState={onStateChange}
      />
    </View>
  );
};

export default YoutubeVideoPlayer;
