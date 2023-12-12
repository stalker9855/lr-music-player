import { Text, View } from "react-native";
import TrackPlayer, { Event, RepeatMode } from "react-native-track-player";
import { playListData } from "../constants";
export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getCurrentTrack()
        isSetup = true;
    } catch (error) {
        await TrackPlayer.setupPlayer()
        isSetup = true;
    } finally {
        return isSetup;
    }
}
export async function addTrack() {
    const urlPlayListData = playListData.map(
        obj => ({ url: obj.url})
    )
    await TrackPlayer.add(playListData)
    await TrackPlayer.setRepeatMode(RepeatMode.Queue)
}
export async function musicService() {
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause()
    })

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play()
    })

    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext()
    })

    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious()
    })
}