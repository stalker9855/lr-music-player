import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TrackPlayer, { TrackType, useProgress } from 'react-native-track-player'
import Slider from '@react-native-community/slider'

const SongSlider = () => {

    const {position, duration} = useProgress()
    const [isSeeking, setIsSeeking] = useState(false)
    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60)
        const seconds = Math.floor(timeInSeconds % 60)
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
    }
     const handleSliderValueChange = async (value) => {
        if (!isSeeking) {
            setIsSeeking(true)
        }
        await TrackPlayer.seekTo(value)
    }

    const handleSliderSlidingComplete = async (value) => {
        setIsSeeking(false)
        await TrackPlayer.seekTo(value)
    }


  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          value={position}
          onValueChange={handleSliderValueChange}
          onSlidingComplete={handleSliderSlidingComplete}
          minimumValue={0}
          maximumValue={duration}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
    </View>
  );
}

export default SongSlider

const styles = StyleSheet.create({
    container: {
    paddingHorizontal: 20,
  },
  sliderContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    width: 250, 
  },
  slider: {
    height: 40,
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    fontSize: 16,
    color: '#cad3f5',
  },
})