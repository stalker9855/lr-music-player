import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'
import  Icon  from 'react-native-vector-icons/MaterialIcons'

function ControlCenter() {

    const playBackState = usePlaybackState()

    const skipToNext = async () => {
        await TrackPlayer.skipToNext()
    }
    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious()
    }

    const togglePlayback = async (playback) => {
        const currentTrack = await TrackPlayer.getCurrentTrack()

        if (currentTrack !== null) {
            if(playback.state === State.Paused || playback.state === State.Ready) {
                await TrackPlayer.play()
            } else {
                await TrackPlayer.pause()
            }
        }
    }


  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={skipToPrevious}>
            <Icon name='skip-previous' color="white" size={40} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={() => togglePlayback(playBackState)}>
            <Icon  color="white" name={playBackState.state == State.Playing ? "pause" : "play-arrow" } size={75} />
        </TouchableOpacity>
        <TouchableOpacity  color="white" style={styles.button} onPress={skipToNext}>
            <Icon name='skip-next'  color="white"  size={40} />
        </TouchableOpacity>
    </View>
  )
}

export default ControlCenter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
    padding: 10,
  },
  playButton: {
    backgroundColor: '#ed8796', 
    borderRadius: 50,
    padding: 0,
  },
})