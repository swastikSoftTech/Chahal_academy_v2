import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CText from '../../components/common/CText';

const StartTest = ({route}) => {
  const [countdown, setCountDown] = useState(0);
  const [duration, setDuration] = useState(60);

  function toTime(second) {
    const istTime = second;
    const minutes = Math.floor(istTime / 60);
    const seconds = (istTime % (60 * 60)) % 60;
    const istTimeString = `${minutes}:${seconds}`;

    return istTimeString;
  }
  return (
    <View>
      <View style={styles.headerContainer}>
        <CountdownCircleTimer
          isPlaying
          duration={duration}
          size={46}
          strokeWidth={4}
          colors={['green', '#FF0000']}
          colorsTime={[160, 30]}
          onUpdate={remainingTime => {
            setCountDown(Math.ceil(remainingTime));
          }}
          onComplete={() => {
            Alert.alert('Timeout');
          }}>
          {({remainingTime, animatedColor}) => (
            <Text style={[styles.countDownNumber, {color: animatedColor}]}>
              {toTime(countdown)}
            </Text>
          )}
          {countdown ? (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <CText type={'R20'} numberOfLines={1} color="black">
                {route?.params?.name}
              </CText>
            </View>
          ) : null}
        </CountdownCircleTimer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {},
  countDownNumber: {
    color: 'black',
    fontSize: 14,
  },
});

export default StartTest;
