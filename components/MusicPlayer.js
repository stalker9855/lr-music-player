import { Dimensions, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player'
import { playListData } from '../constants'
import SongInfo from './SongInfo'
import SongSlider from './SongSlider'
import ControlCenter from './ControlCenter'


const { width } = Dimensions.get('window')


const MusicPlayer = () => {
    const [track, setTrack] = useState()
    const renderArtWork = () => {
        return (
            <View>
                <View>
                </View>
            </View>
        )
    }
        useTrackPlayerEvents([Event.PlaybackTrackChanged], async (event) => {
          if (event.type === Event.PlaybackTrackChanged) {
            const playingTrack = await TrackPlayer.getTrack(event.nextTrack);
            setTrack(playingTrack);
          }
        });
  return (
    <View style={styles.container}>
        <SongInfo track={track} />
        <SongSlider />
        <ControlCenter />
    </View>
  )
}

export default MusicPlayer


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2030',
    alignItems: 'center',
    justifyContent: 'center',
  },
});